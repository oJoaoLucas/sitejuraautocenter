"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cta } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Botão flutuante em todas as telas: o objetivo único do site (brand book p.11).
 * Com texto, porque "pedir preço do pneu" explica a ação melhor que só o ícone.
 * Nas páginas de pneu (e na home, onde o anúncio pode cair) fala de pneu; nas
 * demais, continua genérico.
 */
export function WhatsFloat() {
  const pathname = usePathname();
  const deIPneu = pathname === "/" || pathname === "/pneus";
  // Guarda de qual página é a última leitura: ao trocar de página o valor
  // antigo deixa de valer sozinho, sem precisar zerar o estado no efeito.
  // Em /pneus o formulário já está na primeira tela: começa escondido pra o
  // botão não piscar por um instante antes do observador confirmar.
  const [leitura, setLeitura] = useState({ caminho: pathname, sobre: pathname === "/pneus" });
  const sobreFormulario = leitura.caminho === pathname && leitura.sobre;

  /* Enquanto o formulário de orçamento está na tela, o botão só atrapalha:
     cobriria justamente o campo e o botão de envio. Some e volta depois. */
  useEffect(() => {
    const form = document.getElementById("orcamento");
    if (!form) return;
    const io = new IntersectionObserver(
      ([e]) => setLeitura({ caminho: pathname, sobre: e.isIntersecting }),
      { threshold: 0.15 },
    );
    io.observe(form);
    return () => io.disconnect();
  }, [pathname]);

  return (
    <a
      href={deIPneu ? cta.whatsPneus : cta.whatsPrincipal}
      target="_blank"
      rel="noopener noreferrer"
      data-local="flutuante"
      tabIndex={sobreFormulario ? -1 : undefined}
      aria-hidden={sobreFormulario ? true : undefined}
      className={`group fixed right-4 bottom-[calc(1rem+var(--cookie-h,0px))] z-70 flex h-[54px] items-center gap-2.5 rounded-full bg-whats pr-5 pl-4 font-ui text-[0.8125rem] font-extrabold tracking-[0.04em] text-whats-ink uppercase shadow-[0_10px_30px_rgb(0_0_0/0.45)] transition-[transform,bottom,opacity] duration-200 ease-jura hover:scale-105 sm:right-6 sm:bottom-[calc(1.5rem+var(--cookie-h,0px))] ${
        sobreFormulario ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-whats opacity-40 [animation-duration:2.8s] motion-reduce:hidden"
      />
      <WhatsAppIcon className="size-[26px] shrink-0" />
      {deIPneu ? "Pedir preço do pneu" : "Chamar no WhatsApp"}
    </a>
  );
}
