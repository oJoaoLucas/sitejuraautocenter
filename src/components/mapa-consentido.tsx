"use client";

import { site } from "@/lib/site";
import { PreferenciasCookies } from "./cookie-banner";
import { Foto } from "./foto";
import { useConsentimento } from "./use-consentimento";

export function MapaConsentido() {
  const escolha = useConsentimento();
  if (escolha?.mapa) {
    return <iframe src={site.mapsEmbed} title={`Mapa com a localização do ${site.nome}`} loading="lazy" referrerPolicy="no-referrer" className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]" />;
  }
  // Sem o aceite, nada do Google carrega: no lugar do mapa fica a foto da fachada (18/11/2026: antes era só um
  // aviso de texto num quadro vazio) com o endereço e o link da rota, que abre o Google Maps só se a pessoa tocar.
  return (
    <div className="relative isolate grid h-full content-end p-4">
      <Foto src="/img/fachada.webp" alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="-z-10 object-cover" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/10" />
      <p className="font-ui text-[1.05rem] leading-tight font-bold text-cream">{site.endereco.rua}</p>
      <p className="text-sm text-muted">
        {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.uf}
      </p>
      <p className="mt-1 flex flex-wrap items-center gap-x-4 text-sm">
        <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" data-evento="tracar_rota_click" data-local="mapa" className="inline-flex min-h-11 items-center font-semibold text-cream underline underline-offset-4">
          Abrir no Google Maps
        </a>
        <span className="inline-flex items-center gap-1.5 text-muted">
          Mapa desligado:
          <PreferenciasCookies className="font-semibold text-cream" />
        </span>
      </p>
    </div>
  );
}
