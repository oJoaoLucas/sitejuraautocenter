"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
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
    src: "/img/box-elevadores.webp",
    alt: "Box com elevadores do Jura Auto Center",
    pos: "object-center",
  },
  {
    src: "/img/prateleira.webp",
    alt: "Prateleira com o estoque de pneus do Jura Auto Center",
    pos: "object-center",
  },
  {
    src: "/img/box-pneus.webp",
    alt: "Vista interna do auto center com elevadores e pneus",
    pos: "object-center",
  },
] as const;

/** Carrossel simples de fotos da loja, usado na seção "Como chegar". */
export function OndeEstamosCarrossel() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  function ir(delta: number) {
    setI((v) => (v + delta + fotos.length) % fotos.length);
  }

  return (
    <div className="group relative overflow-hidden rounded-md border border-line">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-surface">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={fotos[i].src}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={fotos[i].src}
              alt={fotos[i].alt}
              fill
              sizes="(max-width: 1024px) 100vw, 35vw"
              className={`object-cover ${fotos[i].pos}`}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={() => ir(-1)}
        aria-label="Foto anterior"
        className="absolute top-1/2 left-2.5 grid size-9 -translate-y-1/2 place-items-center rounded-sm bg-ink/60 text-cream opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 hover:bg-ink/85"
      >
        <ChevronIcon className="size-5 rotate-90" />
      </button>
      <button
        type="button"
        onClick={() => ir(1)}
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
            onClick={() => setI(idx)}
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
