/**
 * Medição das ações que importam, cada uma separada das outras.
 *
 * Todo evento sai como `gtag('event', nome)`. Pra o Google Ads *aprender* com
 * uma ação (e não só contar visita), ela precisa virar uma "ação de conversão"
 * lá dentro. Cada evento tem o seu rótulo (`AW-18451927105/xxxx`) em CONVERSOES.
 * Evento novo: crie a conversão no Google Ads e acrescente o rótulo aqui.
 */

export const ADS_ID = "AW-18451927105";

export type Evento =
  | "orcamento_pneus" // enviou o formulário de orçamento de pneus
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
  }
}

export function rastrear(evento: Evento, params: Record<string, string | number | boolean> = {}) {
  const gtag = window.gtag;
  if (!gtag) return;

  gtag("event", evento, { ...params, pagina: window.location.pathname });

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
