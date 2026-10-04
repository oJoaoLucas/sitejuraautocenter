import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { CHAVE_CONSENTIMENTO, VALIDADE_CONSENTIMENTO, interpretarConsentimento, lerConsentimento, salvarConsentimento, acompanharConsentimento } from "../src/lib/consentimento.ts";
import { iniciarRastreio, rastrear, revogarRastreio } from "../src/lib/rastreio.ts";

const anterior = { window: globalThis.window, document: globalThis.document };
afterEach(() => { globalThis.window = anterior.window; globalThis.document = anterior.document; });
const criarRegistro = (opcoes = {}) => JSON.stringify({ versao: 1, anuncios: false, mapa: false, atualizadoEm: Date.now(), ...opcoes });
function navegador(raw = null) {
  const storage = new Map(raw ? [[CHAVE_CONSENTIMENTO, raw]] : []);
  const alvo = new EventTarget();
  let recargas = 0;
  const win = {
    location: { hostname: "juraautocenter.com.br", pathname: "/pneus", reload: () => { recargas++; } },
    localStorage: { getItem: (key) => storage.get(key) ?? null, setItem: (key, val) => storage.set(key, val) },
    addEventListener: (...args) => alvo.addEventListener(...args), removeEventListener: (...args) => alvo.removeEventListener(...args), dispatchEvent: (event) => alvo.dispatchEvent(event),
  };
  globalThis.window = win;
  return { win, storage, recargas: () => recargas };
}

test("storage bloqueado não autoriza sozinho e permite escolha só nesta visita", () => {
  navegador();
  window.localStorage.getItem = () => { throw new Error("bloqueado"); };
  window.localStorage.setItem = () => { throw new Error("bloqueado"); };
  assert.equal(lerConsentimento(), null);
  assert.equal(iniciarRastreio(), false);
  assert.equal(salvarConsentimento({ anuncios: false, mapa: true }), false);
  assert.equal(lerConsentimento().mapa, true);
  assert.equal(lerConsentimento().anuncios, false);
});

test("ausente, corrompido, aviso antigo ou formato incorreto nunca autoriza", () => {
  for (const raw of [null, "1", "{}", "{", "null", criarRegistro({ versao: 2 }), criarRegistro({ anuncios: "true" }), criarRegistro({ atualizadoEm: null })]) assert.equal(interpretarConsentimento(raw), null, raw);
});

test("escolhas são independentes e expiram após 180 dias", () => {
  const agora = 100000000000;
  const raw = criarRegistro({ atualizadoEm: agora, mapa: true });
  assert.equal(interpretarConsentimento(raw, agora).mapa, true);
  assert.equal(interpretarConsentimento(raw, agora).anuncios, false);
  assert.equal(interpretarConsentimento(raw, agora + VALIDADE_CONSENTIMENTO - 1).mapa, true);
  assert.equal(interpretarConsentimento(raw, agora + VALIDADE_CONSENTIMENTO), null);
  assert.equal(interpretarConsentimento(raw, agora - 1), null);
});

test("aceitar e recusar persistem e notificam sem precisar reload", () => {
  const { storage } = navegador();
  let notificacoes = 0;
  const sair = acompanharConsentimento(() => { notificacoes++; });
  assert.equal(salvarConsentimento({ anuncios: true, mapa: false }), true);
  assert.equal(lerConsentimento().anuncios, true);
  assert.equal(interpretarConsentimento(storage.get(CHAVE_CONSENTIMENTO)).mapa, false);
  salvarConsentimento({ anuncios: false, mapa: false });
  assert.equal(lerConsentimento().anuncios, false);
  assert.equal(notificacoes, 2);
  sair();
  salvarConsentimento({ anuncios: false, mapa: true });
  assert.equal(notificacoes, 2);
});

test("mudança de preferência em outra aba é notificada, outras chaves são ignoradas", () => {
  navegador();
  let notificacoes = 0;
  const sair = acompanharConsentimento(() => { notificacoes++; });
  for (const key of ["outra-chave", CHAVE_CONSENTIMENTO, null]) {
    const event = new Event("storage");
    Object.defineProperty(event, "key", { value: key });
    window.dispatchEvent(event);
  }
  assert.equal(notificacoes, 2);
  sair();
});

test("sem escolha, recusado, expirado ou somente mapa não inicia Ads nem fila", () => {
  for (const raw of [null, "1", criarRegistro(), criarRegistro({ mapa: true }), criarRegistro({ anuncios: true, atualizadoEm: Date.now() - VALIDADE_CONSENTIMENTO })]) {
    navegador(raw);
    assert.equal(iniciarRastreio(), false);
    rastrear("orcamento_pneus");
    assert.equal(window.dataLayer, undefined);
    assert.equal(window.gtag, undefined);
  }
});

test("consentimento negado precede config; personalização permanece negada", () => {
  navegador(criarRegistro({ anuncios: true }));
  assert.equal(iniciarRastreio(), true);
  assert.equal(window.dataLayer[0][1], "default");
  assert.equal(window.dataLayer[0][2].ad_storage, "denied");
  assert.equal(window.dataLayer[1][1], "update");
  assert.equal(window.dataLayer[1][2].ad_storage, "granted");
  assert.equal(window.dataLayer[1][2].ad_personalization, "denied");
  assert.equal(window.dataLayer[1][2].analytics_storage, "denied");
  assert.equal(window.dataLayer[3][0], "config");
  assert.equal(window.dataLayer[3][2].allow_ad_personalization_signals, false);
  assert.equal(iniciarRastreio(), true);
  assert.equal(window.dataLayer.length, 4);
});

test("eventos antes de aceitar são descartados, não recuperados depois", () => {
  navegador();
  rastrear("whatsapp_click");
  salvarConsentimento({ anuncios: true, mapa: false });
  iniciarRastreio();
  assert.equal(window.dataLayer.length, 4);
  assert.equal(window.dataLayer.some((c) => c[0] === "event"), false);
  rastrear("telefone_click");
  assert.equal(window.dataLayer.length, 6);
  assert.equal(window.dataLayer[4][1], "telefone_click");
});

test("revogar bloqueia novos eventos, nega uso e recarrega; cookies necessários preservados", () => {
  const { recargas } = navegador(criarRegistro({ anuncios: true }));
  iniciarRastreio();
  const removidos = [];
  globalThis.document = {};
  Object.defineProperty(document, "cookie", { get: () => "_gcl_aw=ads; preferencia=ok", set: (val) => removidos.push(val) });
  salvarConsentimento({ anuncios: false, mapa: false });
  const quantidade = window.dataLayer.length;
  rastrear("whatsapp_click");
  assert.equal(window.dataLayer.length, quantidade);
  revogarRastreio();
  assert.equal(window.dataLayer.at(-1)[1], "update");
  assert.equal(window.dataLayer.at(-1)[2].ad_storage, "denied");
  assert.equal(recargas(), 1);
  revogarRastreio();
  assert.equal(recargas(), 1);
  assert.ok(removidos.length > 0);
  assert.ok(removidos.every((item) => item.startsWith("_gcl_aw=;") && item.includes("Max-Age=0")));
});

test("mesmo com consentimento, prévia local nunca inicializa tag", () => {
  navegador(criarRegistro({ anuncios: true, mapa: true }));
  window.location.hostname = "localhost";
  assert.equal(iniciarRastreio(), false);
  assert.equal(window.gtag, undefined);
});
