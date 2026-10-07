"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { salvarConsentimento } from "@/lib/consentimento";
import { revogarRastreio } from "@/lib/rastreio";
import { useConsentimento } from "./use-consentimento";

const ABRIR = "jura-abrir-privacidade";
const botao = "min-h-11 flex-1 rounded-sm border border-cream/50 px-5 py-2 font-ui text-sm font-semibold text-cream transition-colors hover:bg-cream/10 lg:flex-none";

/** Reabre o mesmo aviso de duas opções para mudar a decisão. */
export function PreferenciasCookies({ className = "" }: { className?: string }) {
  return <button type="button" onClick={() => window.dispatchEvent(new Event(ABRIR))} className={`js-only min-h-11 text-left underline underline-offset-4 ${className}`}>Cookies</button>;
}

export function CookieBanner() {
  const escolha = useConsentimento();
  const [aberto, setAberto] = useState(false);
  const [aviso, setAviso] = useState("");
  const faixa = useRef<HTMLDivElement>(null);
  const primeiroBotao = useRef<HTMLButtonElement>(null);
  const origem = useRef<HTMLElement | null>(null);
  // O aviso fica na tela até a pessoa escolher. undefined = ainda lendo a escolha (não pisca no HTML).
  const visivel = escolha === null || aberto;

  useEffect(() => {
    function abrir() {
      origem.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setAberto(true);
    }
    window.addEventListener(ABRIR, abrir);
    return () => window.removeEventListener(ABRIR, abrir);
  }, []);

  useEffect(() => {
    if (aberto) primeiroBotao.current?.focus();
  }, [aberto]);

  useEffect(() => {
    const el = faixa.current;
    if (!visivel || !el) return;
    const raiz = document.documentElement;
    raiz.dataset.avisoCookies = "true";
    const publicar = () => raiz.style.setProperty("--cookie-h", `${el.offsetHeight}px`);
    publicar();
    const ro = new ResizeObserver(publicar);
    ro.observe(el);
    return () => {
      ro.disconnect();
      raiz.style.removeProperty("--cookie-h");
      delete raiz.dataset.avisoCookies;
    };
  }, [visivel]);

  function salvar(aceitar: boolean) {
    const persistiu = salvarConsentimento({ anuncios: aceitar, mapa: aceitar });
    setAviso(persistiu ? "Escolha salva." : "Escolha aplicada nesta visita. Seu navegador não permitiu salvar para a próxima.");
    setAberto(false);
    if (aberto && origem.current?.isConnected) origem.current.focus();
    // Negar e recarregar interrompe a medição que já tenha sido carregada.
    if (!aceitar) revogarRastreio();
  }

  return (
    <>
      {visivel && <div ref={faixa} role="region" aria-label="Aviso de cookies" className="js-only fixed inset-x-0 bottom-0 z-60 max-h-[70dvh] overflow-y-auto border-t border-line bg-ink-deep/95 px-4 py-2.5 backdrop-blur-sm sm:px-8 sm:py-4">
        <div className="mx-auto grid w-full max-w-[1280px] gap-2 sm:gap-3 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-6">
          <p className="max-w-2xl text-xs leading-snug text-muted sm:text-sm sm:leading-relaxed">
            <span className="sm:hidden">Medimos os cliques dos anúncios; o mapa só com seu aceite. Recusar desativa os dois. </span>
            <span className="hidden sm:inline">Medimos os cliques de contato dos anúncios com o Google Ads e só mostramos o mapa se você aceitar. Recusar desativa a medição e o mapa. </span><Link href="/privacidade" className="text-cream underline underline-offset-4">Política de Privacidade</Link>.
          </p>
          <div className="flex gap-2">
            <button ref={primeiroBotao} type="button" onClick={() => salvar(true)} className={botao}>Aceitar</button>
            <button type="button" onClick={() => salvar(false)} className={botao}>Recusar</button>
          </div>
        </div>

      </div>}
      <noscript><p className="border-t border-line px-5 py-4 text-sm text-muted">Sem JavaScript, mapa e medição permanecem desativados. Você pode usar os links de contato. <a href="/privacidade" className="text-cream underline underline-offset-4">Política de Privacidade</a>.</p></noscript>
      <p role="status" className="sr-only">{aviso}</p>
    </>
  );
}
