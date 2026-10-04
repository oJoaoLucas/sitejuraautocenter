"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Foto } from "./foto";
import { ChevronIcon } from "./icons";

const fotos = [
  {
    src: "/img/fachada.webp",
    alt: "Fachada do Jura Auto Center na Avenida Loreto, 889",
    pos: "object-[52%_46%]",
  },
  {
    src: "/img/estacionamento.webp",
    alt: "Estacionamento próprio do Jura Auto Center, ao lado da loja",
    pos: "object-[50%_62%]",
  },
  {
    src: "/img/oficina-elevadores.webp",
    alt: "Box com elevadores do Jura Auto Center",
    pos: "object-center",
  },
  {
    src: "/img/pneus-prateleira.webp",
    alt: "Prateleira com o estoque de pneus do Jura Auto Center",
    pos: "object-center",
  },
  {
    src: "/img/oficina-interior.webp",
    alt: "Vista interna do auto center com elevadores e pneus",
    pos: "object-center",
  },
] as const;

const INTERVALO_AUTOPLAY = 4500;

/**
 * Carrossel de fotos da loja, usado na seção "Como chegar".
 * No touch, o dedo rola a trilha de verdade (scroll nativo com snap,
 * não uma imitação em JS) — os botões e os pontinhos só levam pro
 * mesmo lugar. Avança sozinho a cada poucos segundos, pausando
 * enquanto a pessoa toca ou passa o mouse, e nunca se move sozinho
 * pra quem pediu menos movimento no sistema.
 */
export function OndeEstamosCarrossel() {
  const [i, setI] = useState(0);
  const trilhaRef = useRef<HTMLDivElement>(null);
  const pausado = useRef(false);
  const comFoco = useRef(false);
  const [pausaManual, setPausaManual] = useState(false);
  const reduce = useReducedMotion();

  const irPara = useCallback((idx: number) => {
    const trilha = trilhaRef.current;
    if (!trilha) return;
    const alvo = (idx + fotos.length) % fotos.length;
    trilha.scrollTo({ left: alvo * trilha.clientWidth, behavior: reduce ? "instant" : "smooth" });
  }, [reduce]);

  function navegar(idx: number) {
    setPausaManual(true);
    irPara(idx);
  }

  useEffect(() => {
    if (reduce !== false || pausaManual) return;
    const id = setInterval(() => {
      if (!pausado.current && !comFoco.current && !document.hidden) irPara(i + 1);
    }, INTERVALO_AUTOPLAY);
    return () => clearInterval(id);
  }, [i, irPara, reduce, pausaManual]);

  /* Mantém pontinhos e botões sincronizados com o scroll de verdade,
     inclusive quando a pessoa arrasta com o dedo. */
  useEffect(() => {
    const trilha = trilhaRef.current;
    if (!trilha) return;
    let frame = 0;
    function aoRolar() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!trilha) return;
        setI(Math.round(trilha.scrollLeft / trilha.clientWidth));
      });
    }
    trilha.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      trilha.removeEventListener("scroll", aoRolar);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="group relative overflow-hidden rounded-md border border-line"
      role="region"
      aria-label="Fotos da oficina"
      aria-roledescription="carrossel"
      onFocusCapture={() => { comFoco.current = true; }}
      onBlurCapture={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) comFoco.current = false; }}
      onPointerEnter={() => (pausado.current = true)}
      onPointerLeave={() => (pausado.current = false)}
      onTouchStart={() => setPausaManual(true)}
    >
      <div
        ref={trilhaRef}
        className="no-scrollbar flex aspect-[16/11] w-full snap-x snap-mandatory overflow-x-auto bg-surface"
      >
        {fotos.map((f) => (
          <div key={f.src} className="relative h-full w-full shrink-0 snap-center" role="group" aria-roledescription="slide" aria-label={`${fotos.indexOf(f) + 1} de ${fotos.length}`}>
            <Foto
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 1023px) calc(100vw - 40px), (max-width: 1280px) 52vw, 640px"
              className={`object-cover ${f.pos}`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => navegar(i - 1)}
        aria-label="Foto anterior"
        className="js-only absolute top-1/2 left-2.5 grid size-11 -translate-y-1/2 place-items-center rounded-sm border border-white/15 bg-ink/80 text-cream backdrop-blur-sm transition-colors duration-200 hover:bg-ink"
      >
        <ChevronIcon className="size-5 rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => navegar(i + 1)}
        aria-label="Próxima foto"
        className="js-only absolute top-1/2 right-2.5 grid size-11 -translate-y-1/2 place-items-center rounded-sm border border-white/15 bg-ink/80 text-cream backdrop-blur-sm transition-colors duration-200 hover:bg-ink"
      >
        <ChevronIcon className="size-5 -rotate-90" />
      </button>

      <div className="js-only absolute inset-x-0 bottom-0 flex flex-wrap items-center justify-center gap-x-1 bg-[linear-gradient(0deg,rgb(16_16_16/0.9),transparent)] px-2 pt-6 pb-1">
        {fotos.map((f, idx) => (
          <button
            key={f.src}
            type="button"
            onClick={() => navegar(idx)}
            aria-label={`Ver foto ${idx + 1}`}
            aria-current={idx === i}
            className="grid size-11 place-items-center rounded-sm"
          >
            <span aria-hidden="true" className={`h-1.5 rounded-full transition-all duration-300 ease-jura ${
              idx === i ? "w-5 bg-jura-title" : "w-1.5 bg-cream/40 hover:bg-cream/70"
            }`} />
          </button>
        ))}
        <button
            type="button"
            onClick={() => setPausaManual((v) => !v)}
            aria-label={pausaManual ? "Retomar apresentação automática" : "Pausar apresentação automática"}
            className="controle-autoplay min-h-11 rounded-sm px-3 font-ui text-xs font-bold text-cream transition-colors hover:text-jura-text"
          >
            {pausaManual ? "Retomar" : "Pausar"}
        </button>
      </div>
    </div>
  );
}
