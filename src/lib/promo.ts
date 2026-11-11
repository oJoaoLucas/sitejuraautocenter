/**
 * Promoção do mês (dono, 11/11/2026: o anúncio fala da Black November e o site não mostrava).
 * Tudo que é da promoção sai daqui. Passou do `fim`, a faixa e os blocos somem sozinhos e o
 * site volta ao normal, mesmo sem publicar de novo. Sem preço de propósito: o cliente pede
 * pelo WhatsApp, igual ao anúncio.
 */
export const blackNovember = {
  nome: "Black November",
  ate: "30/11",
  /** Primeiro instante em que a promoção NÃO vale mais (meia-noite de 01/12, horário de Brasília). */
  fim: "2026-12-01T00:00:00-03:00",
  /** A mesma frase do anúncio do Meta: o Jurinha reconhece de onde o cliente veio. */
  mensagem: "Quero o preço do pneu da Black November",
  pneus: [
    { tipo: "Nacionais", medidas: "175/65 R14 e 175/70 R13" },
    { tipo: "Importados", medidas: "Aro 15" },
    { tipo: "Remoldados", medidas: "Aro 13, 14 e 15" },
  ],
} as const;

export function promoAtiva(agora: Date = new Date()): boolean {
  return agora.getTime() < new Date(blackNovember.fim).getTime();
}
