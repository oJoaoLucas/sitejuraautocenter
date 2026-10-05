"use client";

import { useEffect } from "react";
import { ADS_ID, eventoValido, iniciarRastreio, previaLocal, rastrear, revogarRastreio, type Evento } from "@/lib/rastreio";

import { useConsentimento } from "./use-consentimento";

/**
 * Um único ouvinte de clique pro site inteiro, em vez de onClick espalhado
 * por cada botão. Descobre o evento pelo próprio link:
 *   - `data-evento="..."` no link manda (usado em "Traçar rota" e na fila);
 *   - senão, wa.me vira whatsapp_click e tel: vira telefone_click.
 * `data-local` diz de onde veio o clique; sem ele, usa a seção em que o link está.
 */
export function Rastreio() {
  const escolha = useConsentimento();
  // undefined = o navegador ainda não leu a escolha; null = sem escolha (mede); false = recusou.
  const estado = escolha === undefined ? "lendo" : escolha === null || escolha.anuncios ? "medir" : "recusado";
  useEffect(() => {
    if (estado === "lendo") return;
    if (estado === "recusado") { revogarRastreio(); return; }
    if (!iniciarRastreio()) return;
    // Quem recusou nunca chega aqui: o script externo nem é solicitado.
    const script = document.createElement("script");
    script.id = "google-ads-gtag";
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ADS_ID}`;
    script.async = true;
    document.head.appendChild(script);
    return () => { script.remove(); };
  }, [estado]);
  useEffect(() => {
    function aoClicar(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const alvo = e.target;
      if (!(alvo instanceof Element)) return;
      const link = alvo.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const evento = eventoDoLink(link);
      if (evento) {
        // Exercita o clique no teste local sem abrir contatos/rotas externas.
        if (previaLocal()) e.preventDefault();
        rastrear(evento, { local: localDoLink(link) });
      }
    }

    document.addEventListener("click", aoClicar);
    return () => document.removeEventListener("click", aoClicar);
  }, []);

  return null;
}

function eventoDoLink(link: HTMLAnchorElement): Evento | null {
  const explicito = link.dataset.evento;
  if (eventoValido(explicito)) return explicito;

  const href = link.getAttribute("href") ?? "";
  if (href.startsWith("https://wa.me/")) return "whatsapp_click";
  if (href.startsWith("tel:")) return "telefone_click";
  return null;
}

function localDoLink(link: HTMLAnchorElement): string {
  if (link.dataset.local) return link.dataset.local;
  if (link.closest("header")) return "header";
  if (link.closest("footer")) return "rodape";
  return link.closest("section[id]")?.id ?? "pagina";
}
