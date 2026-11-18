import { blackNovember } from "@/lib/promo";
import { MedidaBlack } from "./medida-black";

/** Selo pequeno acima do título do bloco. Amarelo só em selo e preço (brand book). */
export function SeloBlack() {
  return (
    <span className="mb-3.5 inline-block skew-jura rounded-sm bg-offer px-3 py-1.5">
      <span className="unskew-jura block font-ui text-[0.72rem] font-extrabold tracking-[0.08em] text-ink uppercase">
        {blackNovember.nome} · até {blackNovember.ate}
      </span>
    </span>
  );
}

/** Medidas completas dentro do texto da promoção ("175/65 R14 e 175/70 R13" → as duas). "Aro 15" não é medida completa. */
export function medidasCompletas(texto: string): string[] {
  return texto.match(/\d{3}\/\d{2} R\d{2}/g) ?? [];
}

/**
 * Os pneus da promoção, do jeito que estão na arte do anúncio. Linha simples com um friso (não um quadro com
 * borda, que parecia botão): só a medida completa vira botão, e ele preenche o campo do orçamento.
 */
export function ListaBlack({ className = "" }: { className?: string }) {
  return (
    <ul className={`grid max-w-md gap-4 ${className}`}>
      {blackNovember.pneus.map((p) => {
        const medidas = medidasCompletas(p.medidas);
        return (
          <li key={p.tipo} className="border-l-[3px] border-offer pl-4">
            <span className="flex items-baseline justify-between gap-3 font-ui text-[0.7rem] font-bold tracking-[0.1em] uppercase">
              <span className="text-muted">{p.tipo}</span>
              <span className="text-offer">Preço de Black</span>
            </span>
            {medidas.length ? (
              <>
                <span className="js-only mt-2 flex flex-wrap gap-2">
                  {medidas.map((m) => (
                    <MedidaBlack key={m} medida={m} />
                  ))}
                </span>
                <noscript>
                  <b className="mt-1 block font-display text-[1.65rem] leading-none font-normal tracking-[0.01em] text-cream uppercase">
                    {p.medidas}
                  </b>
                </noscript>
              </>
            ) : (
              <b className="mt-1 block font-display text-[1.65rem] leading-none font-normal tracking-[0.01em] text-cream uppercase">
                {p.medidas}
              </b>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/** Versão de uma linha, pra página de pneus não empurrar o formulário pra baixo. */
export function ResumoBlack({ className = "" }: { className?: string }) {
  return (
    <p className={`text-[0.875rem] leading-relaxed text-muted ${className}`}>
      {blackNovember.pneus.map((p, i) => (
        <span key={p.tipo}>
          {i > 0 && " · "}
          {p.tipo} <b className="font-semibold text-cream">{p.medidas}</b>
        </span>
      ))}
      . Outra medida? Pede também.
    </p>
  );
}
