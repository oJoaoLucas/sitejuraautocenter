/**
 * Medição das ações que importam, cada uma separada das outras.
 *
 * Todo evento sai como `gtag('event', nome)`. Pra o Google Ads *aprender* com
 * uma ação (e não só contar visita), ela precisa virar uma "ação de conversão"
 * lá dentro: crie a conversão no Google Ads, copie o rótulo
 * (`AW-18451927105/xxxx`) e cole abaixo em CONVERSOES. Evento sem rótulo
 * continua sendo enviado, só não entra como conversão.
 */

export const ADS_ID = "AW-18451927105";

export type Evento =
  | "orcamento_pneus" // enviou o formulário de orçamento de pneus
  | "whatsapp_click" // clicou em qualquer botão/link de WhatsApp
  | "telefone_click" // clicou no telefone fixo
  | "tracar_rota_click" // clicou em "Traçar rota"
  | "fila_click"; // clicou em "Ver como está a fila"

/** Rótulo de conversão do Google Ads por evento. Só o orçamento está criado. */
const CONVERSOES: Partial<Record<Evento, string>> = {
  orcamento_pneus: `${ADS_ID}/EPo2COjbkfkcEMGgyN5E`,
  // whatsapp_click: `${ADS_ID}/COLE_O_ROTULO_AQUI`,
  // telefone_click: `${ADS_ID}/COLE_O_ROTULO_AQUI`,
  // tracar_rota_click: `${ADS_ID}/COLE_O_ROTULO_AQUI`,
  // fila_click: `${ADS_ID}/COLE_O_ROTULO_AQUI`,
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

  const rotulo = CONVERSOES[evento];
  if (rotulo) gtag("event", "conversion", { send_to: rotulo });
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
