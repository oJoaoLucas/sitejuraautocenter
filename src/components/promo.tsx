"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { blackNovember, promoAtiva } from "@/lib/promo";
import { whats } from "@/lib/site";
import { ArrowIcon } from "./icons";

function semInscricao() { return () => {}; }
/* O site é estático: o HTML guarda o que valia no dia do build (`data-promo` no <html>).
   Na hidratação repete esse valor; logo depois vale a data de hoje no aparelho do cliente. */
function noBuild() {
  return typeof document === "undefined" ? promoAtiva() : "promo" in document.documentElement.dataset;
}
function agora() { return promoAtiva(); }

export function usePromoAtiva(): boolean {
  return useSyncExternalStore(semInscricao, agora, noBuild);
}

/** Mostra `children` enquanto a promoção vale; depois, o `fallback` (o site de sempre). */
export function SoNaPromo({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return usePromoAtiva() ? children : fallback;
}

/** Tarja fixa acima do menu, em todas as páginas. A altura vem de `--faixa` (globals.css). */
export function FaixaPromo() {
  const ativa = usePromoAtiva();

  // Acabou a promoção: solta o espaço que a tarja ocupava.
  useEffect(() => {
    if (!ativa) delete document.documentElement.dataset.promo;
  }, [ativa]);

  if (!ativa) return null;
  return (
    <a
      href={whats(blackNovember.mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      data-local="faixa-black"
      className="faixa-promo fixed inset-x-0 top-0 z-61 flex h-(--faixa) items-center justify-center gap-x-2.5 bg-jura px-3 text-[0.8125rem] text-white transition-colors duration-200 hover:bg-jura-strong sm:gap-x-3.5"
    >
      <span className="font-display text-[1.2rem] leading-none tracking-[0.03em] uppercase">
        {blackNovember.nome}
      </span>
      <span className="hidden sm:inline">Pneu com preço de Black até {blackNovember.ate}</span>
      <span className="sm:hidden">em pneus</span>
      <span className="inline-flex items-center gap-1 font-ui font-extrabold tracking-[0.04em] whitespace-nowrap uppercase underline underline-offset-4">
        Pedir preço
        <ArrowIcon className="size-4" />
      </span>
    </a>
  );
}
