import assert from "node:assert/strict";
import { afterEach, test } from "node:test";
import { normalizarMedidaPneu, quantidadePneusValida } from "../src/lib/medida-pneu.ts";
import { eventoValido, hostLocal, iniciarRastreio, rastrear } from "../src/lib/rastreio.ts";

const consentimentoAceito = () => JSON.stringify({ versao: 1, anuncios: true, mapa: false, atualizadoEm: Date.now() });
const windowAnterior = globalThis.window;
const infoAnterior = console.info;
afterEach(() => {
  globalThis.window = windowAnterior;
  console.info = infoAnterior;
});

test("normaliza medidas com separadores e preserva marcações úteis", () => {
  for (const [entrada, esperado] of [
    [" 185/65r15 ", "185/65 R15"],
    ["205 55 16", "205/55 R16"],
    ["185-65-15", "185/65 R15"],
    ["205/55 ZR16 91V XL", "205/55 ZR16 91V XL"],
    ["LT225/75 R16 C", "LT225/75 R16C"],
    ["185 R14C", "185 R14C"],
    ["7,50 R16", "7.50 R16"],
    ["31 x 10,50 r15", "31x10.50 R15"],
    ["31×10.5R15LT", "31x10.5 R15LT"],
    ["235/75 R17.5 132/130M", "235/75 R17.5 132/130M"],
  ]) assert.equal(normalizarMedidaPneu(entrada), esperado, entrada);
});

test("rejeita texto, medidas incompletas, zeros e conteúdo extra", () => {
  for (const valor of ["", " ", "abcdef", "123456", "185/65", "185/65 R", "185//65 R15", "000/00 R00", "185/65 R00", "185/65 R15 promoção", "<script>", "1".repeat(41)]) {
    assert.equal(normalizarMedidaPneu(valor), null, valor);
  }
});

test("aceita somente as quantidades previstas no formulário", () => {
  for (const valor of ["1", "2", "3", "4"]) assert.equal(quantidadePneusValida(valor), true);
  for (const valor of ["", "0", "5", "-1", "2.0", "2 pneus"]) assert.equal(quantidadePneusValida(valor), false);
});

test("identifica loopback sem confundir com domínio público", () => {
  for (const host of ["localhost", "localhost.", "preview.localhost", "127.0.0.1", "127.0.0.2", "[::1]", "::1"]) assert.equal(hostLocal(host), true, host);
  for (const host of ["www.juraautocenter.com.br", "juraautocenter.com.br", "localhost.example.com", "127.example.com"]) assert.equal(hostLocal(host), false, host);
});

test("teste local registra uma intenção e não chama a tag nem cria fila", () => {
  const logs = [];
  let chamadas = 0;
  globalThis.window = { location: { hostname: "localhost", pathname: "/pneus" }, gtag: () => { chamadas++; } };
  console.info = (mensagem) => logs.push(mensagem);
  rastrear("orcamento_pneus", { local: "pneus", sem_medida: true });
  assert.equal(chamadas, 0);
  assert.equal(window.dataLayer, undefined);
  assert.equal(logs.length, 1);
  const evento = JSON.parse(logs[0].replace("[Jura local] ", ""));
  assert.equal(evento.evento, "orcamento_pneus");
  assert.equal(evento.pagina, "/pneus");
  assert.equal(evento.tipo, "intencao_contato");
  assert.equal(evento.sem_medida, true);
});

test("cada ação pública gera um evento descritivo e uma conversão distinta", () => {
  const chamadas = [];
  globalThis.window = { location: { hostname: "www.juraautocenter.com.br", pathname: "/pneus" }, localStorage: { getItem: consentimentoAceito }, gtag: (...args) => chamadas.push(args) };
  iniciarRastreio();
  chamadas.length = 0;
  const eventos = ["orcamento_pneus", "whatsapp_click", "telefone_click", "tracar_rota_click", "fila_click"];
  for (const evento of eventos) rastrear(evento, { local: "teste" });
  assert.equal(chamadas.length, 10);
  assert.equal(new Set(chamadas.filter((c) => c[1] === "conversion").map((c) => c[2].send_to)).size, 5);
  eventos.forEach((evento, i) => {
    assert.equal(chamadas[i * 2][1], evento);
    assert.equal(chamadas[i * 2][2].pagina, "/pneus");
    assert.equal(chamadas[i * 2 + 1][1], "conversion");
  });
});

test("um clique antes do carregamento da tag fica na fila", () => {
  globalThis.window = { location: { hostname: "juraautocenter.com.br", pathname: "/" }, localStorage: { getItem: consentimentoAceito } };
  rastrear("whatsapp_click", { local: "hero" });
  assert.equal(window.dataLayer.length, 6);
  // O gtag.js ignora comandos enviados como array: a fila precisa guardar `arguments`.
  for (const comando of window.dataLayer) assert.equal(Object.prototype.toString.call(comando), "[object Arguments]");
  assert.equal(window.dataLayer[0][0], "consent");
  assert.equal(window.dataLayer[0][1], "default");
  assert.equal(window.dataLayer[4][1], "whatsapp_click");
  assert.equal(window.dataLayer[5][1], "conversion");
});

test("ignora identificadores de evento desconhecidos", () => {
  for (const valor of [undefined, "", "purchase", "qualquer_evento"]) assert.equal(eventoValido(valor), false);
  assert.equal(eventoValido("fila_click"), true);
});
