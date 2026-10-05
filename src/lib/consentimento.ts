/** Preferências opcionais: ausência, aviso antigo ou valor inválido nunca autorizam. */
export const CHAVE_CONSENTIMENTO = "jura-privacidade-v1";
export const EVENTO_CONSENTIMENTO = "jura-consentimento";
export const VALIDADE_CONSENTIMENTO = 180 * 24 * 60 * 60 * 1000;

export type Consentimento = {
  versao: 1;
  anuncios: boolean;
  mapa: boolean;
  atualizadoEm: number;
};

let rawAnterior: string | null | undefined;
let cache: Consentimento | null = null;
let escolhaDaVisita: Consentimento | null = null;

export function interpretarConsentimento(raw: string | null, agora = Date.now()): Consentimento | null {
  if (!raw) return null;
  try {
    const valor = JSON.parse(raw);
    if (valor?.versao !== 1 || typeof valor.anuncios !== "boolean" || typeof valor.mapa !== "boolean" ||
        !Number.isFinite(valor.atualizadoEm) || valor.atualizadoEm > agora ||
        agora - valor.atualizadoEm >= VALIDADE_CONSENTIMENTO) return null;
    return { versao: 1, anuncios: valor.anuncios, mapa: valor.mapa, atualizadoEm: valor.atualizadoEm };
  } catch { return null; }
}

export function lerConsentimento(): Consentimento | null {
  if (typeof window === "undefined") return null;
  let raw: string | null;
  try { raw = window.localStorage.getItem(CHAVE_CONSENTIMENTO); }
  catch { return escolhaDaVisita; }
  if (raw !== rawAnterior) {
    rawAnterior = raw;
    cache = interpretarConsentimento(raw);
  }
  if (cache && (cache.atualizadoEm > Date.now() || Date.now() - cache.atualizadoEm >= VALIDADE_CONSENTIMENTO)) cache = null;
  return cache;
}

/** Medição de anúncios vale desde a primeira visita; só uma recusa explícita a desliga. */
export function medicaoPermitida(): boolean {
  const escolha = lerConsentimento();
  return escolha === null || escolha.anuncios;
}

/** Retorna se foi possível guardar a escolha entre visitas. */
export function salvarConsentimento(opcoes: Pick<Consentimento, "anuncios" | "mapa">): boolean {
  escolhaDaVisita = { versao: 1, anuncios: opcoes.anuncios, mapa: opcoes.mapa, atualizadoEm: Date.now() };
  const raw = JSON.stringify(escolhaDaVisita);
  let persistiu = true;
  try { window.localStorage.setItem(CHAVE_CONSENTIMENTO, raw); }
  catch { persistiu = false; }
  rawAnterior = raw;
  cache = escolhaDaVisita;
  window.dispatchEvent(new Event(EVENTO_CONSENTIMENTO));
  return persistiu;
}

export function acompanharConsentimento(notificar: () => void): () => void {
  const aoMudarStorage = (e: StorageEvent) => {
    if (e.key === CHAVE_CONSENTIMENTO || e.key === null) notificar();
  };
  window.addEventListener(EVENTO_CONSENTIMENTO, notificar);
  window.addEventListener("storage", aoMudarStorage);
  return () => {
    window.removeEventListener(EVENTO_CONSENTIMENTO, notificar);
    window.removeEventListener("storage", aoMudarStorage);
  };
}

/** No HTML estático a escolha é desconhecida (`undefined`), diferente de "sem escolha" (`null`):
 *  assim o aviso não nasce no HTML e não pisca para quem já decidiu. */
export function consentimentoNoServidor(): undefined { return undefined; }
