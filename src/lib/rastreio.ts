import { medicaoPermitida } from "./consentimento.ts";

/**
 * Medição das ações que importam, cada uma separada das outras.
 *
 * Os eventos medem intenção de contato, não mensagem recebida ou venda.
 * Cada acionamento emite um evento descritivo e uma conversão Ads, com
 * rótulos já existentes. O evento descritivo não cria sozinho um relatório.
 * Na prévia local, apenas registra no console; nenhuma conversão é enviada.
 *
 * A medição vale desde a primeira visita, sem esperar o aceite, com
 * personalização de anúncios sempre negada. Recusar no aviso a desliga e
 * descarta os eventos; eventos feitos após recusar nunca são reenviados.
 */

export const ADS_ID = "AW-18451927105";

export type Evento =
  | "orcamento_pneus" // preparou um pedido para iniciar contato no WhatsApp
  | "whatsapp_click" // clicou em qualquer botão/link de WhatsApp
  | "telefone_click" // clicou no telefone fixo
  | "tracar_rota_click" // clicou em "Traçar rota"
  | "fila_click"; // clicou em "Ver como está a fila"

/** Rótulo de conversão do Google Ads por evento (só o trecho depois do "AW-…/"). */
const CONVERSOES: Record<Evento, string> = {
  orcamento_pneus: `${ADS_ID}/EPo2COjbkfkcEMGgyN5E`,
  whatsapp_click: `${ADS_ID}/-sxgCNm3uf8cEMGgyN5E`,
  telefone_click: `${ADS_ID}/N3UeCNy3uf8cEMGgyN5E`,
  tracar_rota_click: `${ADS_ID}/D3ZSCN-3uf8cEMGgyN5E`,
  fila_click: `${ADS_ID}/XH8VCOK3uf8cEMGgyN5E`,
};

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    juraAdsIniciado?: boolean;
  }
}

export function hostLocal(hostname: string): boolean {
  const host = hostname.toLowerCase().replace(/^\[|\]$/g, "").replace(/\.$/, "");
  return host === "localhost" || host.endsWith(".localhost") || host === "::1" || /^127(?:\.\d{1,3}){3}$/.test(host);
}

export function previaLocal(): boolean {
  return process.env.NODE_ENV === "development" || hostLocal(window.location.hostname);
}

/** O gtag.js só processa o objeto `arguments`; comandos enviados como array são ignorados. */
function enfileirar() {
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer?.push(arguments);
}

const NEGADO = { ad_storage: "denied", ad_user_data: "denied", ad_personalization: "denied", analytics_storage: "denied" };

export function iniciarRastreio(): boolean {
  if (previaLocal() || !medicaoPermitida()) return false;
  if (window.juraAdsIniciado) return true;
  window.dataLayer ??= [];
  window.gtag ??= enfileirar;
  window.gtag("consent", "default", NEGADO);
  window.gtag("consent", "update", { ...NEGADO, ad_storage: "granted", ad_user_data: "granted" });
  window.gtag("js", new Date());
  window.gtag("config", ADS_ID, { allow_google_signals: false, allow_ad_personalization_signals: false });
  window.juraAdsIniciado = true;
  return true;
}

/** Remove cookies Ads acessíveis neste domínio; cookies do Google não são acessíveis. */
function limparCookiesAds() {
  const nomes = document.cookie.split(";").map((item) => item.trim().split("=")[0]).filter((nome) => /^_gcl_/.test(nome));
  const partes = window.location.hostname.split(".");
  const dominios = ["", ...partes.map((_, i) => partes.slice(i).join("."))];
  for (const nome of nomes) for (const dominio of dominios) {
    document.cookie = `${nome}=; Max-Age=0; Path=/;${dominio ? ` Domain=${dominio};` : ""} SameSite=Lax`;
  }
}

export function revogarRastreio() {
  if (!window.juraAdsIniciado) return;
  window.gtag?.("consent", "update", NEGADO);
  window.juraAdsIniciado = false;
  limparCookiesAds();
  window.location.reload();
}

export function rastrear(evento: Evento, params: Record<string, string | number | boolean> = {}) {
  const contexto = { ...params, pagina: window.location.pathname, tipo: "intencao_contato" };
  if (previaLocal()) {
    console.info(`[Jura local] ${JSON.stringify({ evento, ...contexto, conversao: CONVERSOES[evento] })}`);
    return;
  }

  // Quem recusou não é medido, e nada é guardado para enviar depois.
  if (!medicaoPermitida()) return;
  iniciarRastreio();

  // Mantém eventos autorizados na fila se o script externo ainda estiver carregando.
  // Não sobrescreve um gtag/dataLayer já inicializado pela tag do Google.
  window.dataLayer ??= [];
  window.gtag ??= enfileirar;
  const gtag = window.gtag;

  gtag("event", evento, contexto);

  gtag("event", "conversion", { send_to: CONVERSOES[evento] });
}

export function eventoValido(valor: string | undefined): valor is Evento {
  return (
    valor === "orcamento_pneus" ||
    valor === "whatsapp_click" ||
    valor === "telefone_click" ||
    valor === "tracar_rota_click" ||
    valor === "fila_click"
  );
}
