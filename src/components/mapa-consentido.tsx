"use client";

import { site } from "@/lib/site";
import { PreferenciasCookies } from "./cookie-banner";
import { useConsentimento } from "./use-consentimento";

export function MapaConsentido() {
  const escolha = useConsentimento();
  if (escolha?.mapa) {
    return <iframe src={site.mapsEmbed} title={`Mapa com a localização do ${site.nome}`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]" />;
  }
  return <div className="grid h-full content-center gap-3 p-5 text-sm leading-relaxed text-muted"><p>O mapa do Google está desativado. O endereço e o botão “Traçar rota” continuam disponíveis abaixo.</p><PreferenciasCookies className="font-semibold text-cream" /></div>;
}
