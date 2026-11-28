/**
 * Calendário de fim de ano do site (dono, 28/11/2026): a faixa do topo, a primeira tela, o logo com gorro
 * e o checklist de viagem trocam sozinhos pela data, como a Black November. Passou da última data, o site
 * volta ao normal sem publicar de novo. Sem preço; "parcela no cartão" pode, "sem juros" nunca.
 * Plano: cofre, "Jura — Site no Natal 2026 (plano de estilo)".
 */

/** Texto pronto do WhatsApp em dezembro. "Vim pelo site" mantém a origem; o Jurinha deve reconhecer "REVISÃO DE FIM DE ANO" (trilho de serviço). */
export const MENSAGEM_REVISAO = "Olá! Vim pelo site e quero fazer a REVISÃO DE FIM DE ANO do meu carro antes de viajar.";
export const MENSAGEM_VOLTA = "Olá! Vim pelo site. Voltei de viagem e quero conferir o alinhamento e os pneus do carro.";

export type IdCampanha = "black" | "viagem" | "ultima-semana" | "natal" | "festas" | "ano-novo" | "volta";

export type Campanha = {
  id: IdCampanha;
  /** Primeiro instante em que vale (horário de Brasília). */
  inicio: string;
  /** Primeiro instante em que NÃO vale mais. */
  fim: string;
  /** Destaque da faixa (Bebas, caixa alta). */
  titulo: string;
  /** Frase da faixa no computador. */
  texto: string;
  /** Frase da faixa no celular (curta). */
  textoCurto: string;
  /** Texto do botão da faixa; sem botão, a faixa é só aviso. */
  botao: string | null;
  /** Mensagem pronta do WhatsApp do botão. */
  mensagem: string | null;
  /** Clima de Natal (floco na faixa, gorro no logo). */
  natal: boolean;
};

export const campanhas: readonly Campanha[] = [
  {
    id: "black",
    inicio: "2026-11-01T00:00:00-03:00",
    fim: "2026-12-01T00:00:00-03:00",
    titulo: "Black November",
    texto: "Pneu com preço de Black até 30/11",
    textoCurto: "em pneus",
    botao: "Pedir preço",
    mensagem: "Quero o preço do pneu da Black November",
    natal: false,
  },
  {
    id: "viagem",
    inicio: "2026-12-01T00:00:00-03:00",
    fim: "2026-12-18T00:00:00-03:00",
    titulo: "Vai viajar?",
    texto: "Revisão de fim de ano: pneu, freio e suspensão",
    textoCurto: "revisa antes",
    botao: "Pedir revisão",
    mensagem: MENSAGEM_REVISAO,
    natal: true,
  },
  {
    id: "ultima-semana",
    inicio: "2026-12-18T00:00:00-03:00",
    fim: "2026-12-25T00:00:00-03:00",
    titulo: "Última semana",
    texto: "Ainda dá tempo de revisar antes do Natal",
    textoCurto: "antes do Natal",
    botao: "Pedir revisão",
    mensagem: MENSAGEM_REVISAO,
    natal: true,
  },
  {
    id: "natal",
    inicio: "2026-12-25T00:00:00-03:00",
    fim: "2026-12-26T00:00:00-03:00",
    titulo: "Feliz Natal",
    texto: "do Jura pra você e sua família",
    textoCurto: "do Jura pra você",
    botao: null,
    mensagem: null,
    natal: true,
  },
  {
    id: "festas",
    inicio: "2026-12-26T00:00:00-03:00",
    fim: "2027-01-01T00:00:00-03:00",
    titulo: "Boas festas",
    texto: "Vai pegar estrada no Ano Novo? Revisa antes",
    textoCurto: "revisa antes",
    botao: "Pedir revisão",
    mensagem: MENSAGEM_REVISAO,
    natal: true,
  },
  {
    id: "ano-novo",
    inicio: "2027-01-01T00:00:00-03:00",
    fim: "2027-01-07T00:00:00-03:00",
    titulo: "Feliz 2027",
    texto: "Obrigado por confiar o seu carro no Jura",
    textoCurto: "do Jura pra você",
    botao: null,
    mensagem: null,
    natal: true,
  },
  {
    id: "volta",
    inicio: "2027-01-07T00:00:00-03:00",
    fim: "2027-01-21T00:00:00-03:00",
    titulo: "Voltou de viagem?",
    texto: "Confere alinhamento e pneus depois da estrada",
    textoCurto: "confere o carro",
    botao: "Pedir revisão",
    mensagem: MENSAGEM_VOLTA,
    natal: false,
  },
];

export function campanhaDoDia(agora: Date = new Date()): Campanha | null {
  const t = agora.getTime();
  return campanhas.find((c) => t >= new Date(c.inicio).getTime() && t < new Date(c.fim).getTime()) ?? null;
}

/** Dezembro de viagem: primeira tela, checklist e orçamento "pra viagem". */
export function ehViagem(id: IdCampanha | null): boolean {
  return id === "viagem" || id === "ultima-semana" || id === "festas";
}

/** Logo com gorro: de 01/12 até 06/01. */
export function ehNatal(id: IdCampanha | null): boolean {
  return id !== null && (campanhas.find((c) => c.id === id)?.natal ?? false);
}

function hostLocal(host: string): boolean {
  return host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".localhost");
}

/**
 * A data que vale na página. Só na prévia local dá pra simular outro dia com `?data=2026-12-01`
 * (no site de verdade o parâmetro é ignorado).
 */
export function agoraDaPagina(): Date {
  if (typeof window !== "undefined" && hostLocal(window.location.hostname)) {
    const d = new URLSearchParams(window.location.search).get("data");
    if (d && /^\d{4}-\d{2}-\d{2}$/.test(d)) return new Date(`${d}T12:00:00-03:00`);
  }
  return new Date();
}
