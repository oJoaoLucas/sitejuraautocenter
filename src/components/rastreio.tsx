"use client";

import { useEffect } from "react";
import { eventoValido, rastrear, type Evento } from "@/lib/rastreio";

/**
 * Um único ouvinte de clique pro site inteiro, em vez de onClick espalhado
 * por cada botão. Descobre o evento pelo próprio link:
 *   - `data-evento="..."` no link manda (usado em "Traçar rota" e na fila);
 *   - senão, wa.me vira whatsapp_click e tel: vira telefone_click.
 * `data-local` diz de onde veio o clique; sem ele, usa a seção em que o link está.
 */
export function Rastreio() {
  useEffect(() => {
    function aoClicar(e: MouseEvent) {
      const alvo = e.target;
      if (!(alvo instanceof Element)) return;
      const link = alvo.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const evento = eventoDoLink(link);
      if (evento) rastrear(evento, { local: localDoLink(link) });
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
