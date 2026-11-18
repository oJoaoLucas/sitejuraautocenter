"use client";

/** Evento que o formulário de orçamento escuta pra receber a medida escolhida num quadro da promoção. */
export const EVENTO_MEDIDA = "jura:medida";

/**
 * Medida da promoção que dá pra tocar (18/11/2026): os quadros "Preço de Black" pareciam botões e não
 * faziam nada. Tocou, a medida vai pro campo do orçamento logo abaixo. Só existe pra medida completa
 * ("175/65 R14"); "Aro 15" continua texto, porque não preenche o campo.
 */
export function MedidaBlack({ medida }: { medida: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new CustomEvent<string>(EVENTO_MEDIDA, { detail: medida }))}
      aria-label={`Usar a medida ${medida} no orçamento`}
      className="inline-flex min-h-11 items-center rounded-sm border border-[#555] bg-surface-2 px-3 font-display text-[1.5rem] leading-none tracking-[0.01em] text-cream uppercase transition-colors duration-200 hover:border-jura-title active:bg-[#383838]"
    >
      {medida}
    </button>
  );
}
