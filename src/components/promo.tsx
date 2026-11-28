"use client";

import { useEffect, useSyncExternalStore, type ReactNode } from "react";
import { agoraDaPagina, campanhaDoDia, campanhas, ehNatal, ehViagem, type IdCampanha } from "@/lib/epoca";
import { whats } from "@/lib/site";
import { ArrowIcon, FlocoIcon } from "./icons";

function semInscricao() { return () => {}; }
/* O site é estático: o HTML guarda a campanha que valia no dia do build (`data-campanha` no <html>).
   Na hidratação repete esse valor; logo depois vale a data de hoje no aparelho do cliente. */
function noBuild(): IdCampanha | null {
  if (typeof document === "undefined") return campanhaDoDia()?.id ?? null;
  return (document.documentElement.dataset.campanha as IdCampanha | undefined) ?? null;
}
function hoje(): IdCampanha | null { return campanhaDoDia(agoraDaPagina())?.id ?? null; }

/** A campanha do dia ("black", "viagem"...) ou null fora das datas. */
export function useCampanha(): IdCampanha | null {
  return useSyncExternalStore(semInscricao, hoje, noBuild);
}

/** Black November valendo (componentes antigos da Black continuam usando). */
export function usePromoAtiva(): boolean {
  return useCampanha() === "black";
}

/** Mostra `children` enquanto a Black vale; depois, o `fallback`. */
export function SoNaPromo({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return usePromoAtiva() ? children : fallback;
}

/** Mostra `children` em dezembro de viagem (01 a 24/12 e 26 a 31/12); fora disso, o `fallback`. */
export function SoNaViagem({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  return ehViagem(useCampanha()) ? children : fallback;
}

/** Logo com gorro e enfeites de Natal (01/12 a 06/01). */
export function useNatal(): boolean {
  return ehNatal(useCampanha());
}

/** Tarja fixa acima do menu, em todas as páginas. A altura vem de `--faixa` (globals.css). */
export function FaixaPromo() {
  const id = useCampanha();
  const c = id ? campanhas.find((x) => x.id === id) ?? null : null;

  // Sem campanha: solta o espaço que a tarja ocupava.
  useEffect(() => {
    if (!c) delete document.documentElement.dataset.promo;
    else document.documentElement.dataset.promo = "";
  }, [c]);

  if (!c) return null;
  const conteudo = (
    <>
      <span className="inline-flex items-center gap-1.5 font-display text-[1.2rem] leading-none tracking-[0.03em] uppercase">
        {c.natal && <FlocoIcon className="size-4" />}
        {c.titulo}
      </span>
      <span className="hidden sm:inline">{c.texto}</span>
      <span className="sm:hidden">{c.textoCurto}</span>
      {c.botao && (
        <span className="inline-flex items-center gap-1 font-ui font-extrabold tracking-[0.04em] whitespace-nowrap uppercase underline underline-offset-4">
          {c.botao}
          <ArrowIcon className="size-4" />
        </span>
      )}
    </>
  );
  const classe =
    "faixa-promo fixed inset-x-0 top-0 z-61 flex h-(--faixa) items-center justify-center gap-x-2.5 bg-jura px-3 text-[0.8125rem] text-white sm:gap-x-3.5";
  if (!c.mensagem) return <div className={classe}>{conteudo}</div>;
  return (
    <a
      href={whats(c.mensagem)}
      target="_blank"
      rel="noopener noreferrer"
      data-local={`faixa-${c.id}`}
      className={`${classe} transition-colors duration-200 hover:bg-jura-strong`}
    >
      {conteudo}
    </a>
  );
}
