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
  const reduce = useReducedMotion();

  const irPara = useCallback((idx: number) => {
    const trilha = trilhaRef.current;
    if (!trilha) return;
    const alvo = (idx + fotos.length) % fotos.length;
    trilha.scrollTo({ left: alvo * trilha.clientWidth, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => {
      if (!pausado.current) irPara(i + 1);
    }, INTERVALO_AUTOPLAY);
    return () => clearInterval(id);
  }, [i, irPara, reduce]);

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
      onPointerEnter={() => (pausado.current = true)}
      onPointerLeave={() => (pausado.current = false)}
      onTouchStart={() => (pausado.current = true)}
      onTouchEnd={() => {
        window.setTimeout(() => (pausado.current = false), 1500);
      }}
    >
      <div
        ref={trilhaRef}
        className="no-scrollbar flex aspect-[16/11] w-full snap-x snap-mandatory overflow-x-auto bg-surface"
      >
        {fotos.map((f) => (
          <div key={f.src} className="relative h-full w-full shrink-0 snap-center">
            <Foto
              src={f.src}
              alt={f.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className={`object-cover ${f.pos}`}
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => irPara(i - 1)}
        aria-label="Foto anterior"
        className="absolute top-1/2 left-2.5 grid size-9 -translate-y-1/2 place-items-center rounded-sm bg-ink/60 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-ink/85"
      >
        <ChevronIcon className="size-5 rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => irPara(i + 1)}
        aria-label="Próxima foto"
        className="absolute top-1/2 right-2.5 grid size-9 -translate-y-1/2 place-items-center rounded-sm bg-ink/60 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-ink/85"
      >
        <ChevronIcon className="size-5 -rotate-90" />
      </button>

      <div className="absolute inset-x-0 bottom-0 flex justify-center gap-1.5 bg-[linear-gradient(0deg,rgb(16_16_16/0.75),transparent)] pt-6 pb-3">
        {fotos.map((f, idx) => (
          <button
            key={f.src}
            type="button"
            onClick={() => irPara(idx)}
            aria-label={`Ver foto ${idx + 1}`}
            aria-current={idx === i}
            className={`h-1.5 rounded-full transition-all duration-300 ease-jura ${
              idx === i ? "w-5 bg-jura-title" : "w-1.5 bg-cream/40 hover:bg-cream/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
