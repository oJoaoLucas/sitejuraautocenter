/**
 * De onde veio a visita (28/11/2026). O clique no wa.me não leva o gclid até o WhatsApp, então o site põe
 * "[ref: pagina/fonte]" no fim do texto pronto. O Jurinha (n8n/nos/normalizar.ts, REF_SITE) tira a marca do
 * texto e grava a origem "Site · pagina/fonte". Só marca quando a fonte é conhecida (anúncio do Google ou do
 * Meta); visita orgânica segue sem marca, como antes.
 *
 * Guarda só a fonte ("ads" ou "meta") na sessão do navegador: nada pessoal, some ao fechar a aba.
 */

const CHAVE = "jura-origem";
const SEGMENTO = /^[a-z0-9-]{1,24}$/;

export type Fonte = "ads" | "meta";

/** Lê a fonte nos parâmetros do endereço de entrada. */
export function fonteDaUrl(busca: string): Fonte | null {
  const p = new URLSearchParams(busca);
  if (p.get("gclid") || p.get("gbraid") || p.get("wbraid")) return "ads";
  const utm = (p.get("utm_source") ?? "").toLowerCase();
  if (p.get("fbclid") || /^(facebook|instagram|fb|ig|meta)$/.test(utm)) return "meta";
  if (/^(google|adwords|googleads)$/.test(utm) && (p.get("utm_medium") ?? "").toLowerCase() === "cpc") return "ads";
  return null;
}

/** Nome curto da página pra marca: "/" vira "home", "/troca-de-oleo" vira "troca-de-oleo". */
export function paginaDoCaminho(caminho: string): string {
  const primeiro = caminho.split("/").filter(Boolean)[0]?.toLowerCase() ?? "home";
  const limpo = primeiro.replace(/[^a-z0-9-]/g, "").slice(0, 24);
  return SEGMENTO.test(limpo) ? limpo : "home";
}

/** A marca que vai no fim do texto, ou "" se não há fonte conhecida. */
export function marcaRef(fonte: Fonte | null, caminho: string): string {
  if (!fonte) return "";
  return ` [ref: ${paginaDoCaminho(caminho)}/${fonte}]`;
}

/** Acrescenta a marca ao texto de um link wa.me (uma vez só). Outros links voltam iguais. */
export function comMarca(href: string, marca: string): string {
  if (!marca || !href.startsWith("https://wa.me/")) return href;
  try {
    const url = new URL(href);
    const texto = url.searchParams.get("text") ?? "";
    if (/\[ref: [^\]]+\]\s*$/.test(texto)) return href;
    url.searchParams.set("text", `${texto}${marca}`);
    return url.toString();
  } catch {
    return href;
  }
}

function sessao(): Storage | null {
  try {
    return typeof window === "undefined" ? null : window.sessionStorage;
  } catch {
    return null;
  }
}

/** Na entrada da visita: se o endereço diz de onde veio, guarda na sessão. */
export function guardarOrigem(): void {
  const fonte = fonteDaUrl(window.location.search);
  if (!fonte) return;
  try {
    sessao()?.setItem(CHAVE, fonte);
  } catch {
    /* sessão bloqueada: segue sem marca */
  }
}

function fonteGuardada(): Fonte | null {
  try {
    const v = sessao()?.getItem(CHAVE);
    return v === "ads" || v === "meta" ? v : null;
  } catch {
    return null;
  }
}

/** Marca de origem pra visita atual ("" se orgânica). */
export function marcaDaVisita(): string {
  if (typeof window === "undefined") return "";
  return marcaRef(fonteGuardada() ?? fonteDaUrl(window.location.search), window.location.pathname);
}
