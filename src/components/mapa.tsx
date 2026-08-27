"use client";

import { useState } from "react";
import { PinIcon } from "./icons";

/**
 * O iframe do Google Maps grava cookie do Google assim que carrega,
 * antes de qualquer escolha do visitante (LGPD). Por isso ele só entra
 * no DOM depois de um clique — até lá é só uma prévia estática, sem
 * request nenhum pro Google.
 */
export function MapaClicavel({ src, titulo }: { src: string; titulo: string }) {
  const [aberto, setAberto] = useState(false);

  if (aberto) {
    return (
      <iframe
        src={src}
        title={titulo}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setAberto(true)}
      className="tread-bg group relative flex h-full w-full flex-col items-center justify-center gap-2 bg-surface-2 text-center transition-colors duration-200 hover:bg-[#333]"
    >
      <PinIcon className="size-6 text-jura-title" />
      <span className="font-ui text-[0.8125rem] font-bold uppercase tracking-[0.05em] text-cream">
        Ver mapa
      </span>
      <span className="max-w-64 px-4 text-[0.75rem] text-soft">
        Carrega o Google Maps só quando você clicar
      </span>
    </button>
  );
}
