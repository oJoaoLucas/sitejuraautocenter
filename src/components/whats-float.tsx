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
  // O export pode ser aberto com barra final; mantém a mesma rota na hidratação.
  const pathname = usePathname().replace(/\/+$/, "") || "/";
  const deIPneu = pathname === "/" || pathname === "/pneus";
  // Guarda de qual página é a última leitura: ao trocar de página o valor
  // antigo deixa de valer sozinho, sem precisar zerar o estado no efeito.
  // Em /pneus o formulário já está na primeira tela: começa escondido pra o
  // botão não piscar por um instante antes do observador confirmar.
  const [leitura, setLeitura] = useState({ caminho: pathname, sobre: pathname === "/pneus" });
  const sobreFormulario = leitura.caminho === pathname && leitura.sobre;
  const [leituraRodape, setLeituraRodape] = useState({ caminho: pathname, sobre: false });
  const escondido = sobreFormulario || (leituraRodape.caminho === pathname && leituraRodape.sobre);

  // No rodapé já há contatos; o flutuante cobriria a política e as preferências.
  useEffect(() => {
    const rodape = document.querySelector("footer");
    if (!rodape) return;
    const io = new IntersectionObserver(([e]) => setLeituraRodape({ caminho: pathname, sobre: e.isIntersecting }));
    io.observe(rodape);
    return () => io.disconnect();
  }, [pathname]);

  /* Enquanto o formulário de orçamento está na tela, o botão só atrapalha:
     cobriria justamente o campo e o botão de envio. Some e volta depois. */
  useEffect(() => {
    const form = document.querySelector("#orcamento form");
    if (!form) return;
    const io = new IntersectionObserver(
      ([e]) => setLeitura({ caminho: pathname, sobre: e.isIntersecting }),
      { threshold: 0, rootMargin: "0px 0px 80px 0px" },
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
      tabIndex={escondido ? -1 : undefined}
      aria-hidden={escondido ? true : undefined}
      className={`js-only whats-float group fixed right-4 bottom-[calc(1rem+var(--cookie-h,0px))] z-70 flex h-12 items-center gap-2 rounded-full bg-whats pr-4 pl-3 font-ui text-[0.75rem] font-extrabold tracking-[0.04em] text-whats-ink uppercase shadow-[0_10px_30px_rgb(0_0_0/0.45)] transition-[transform,opacity] duration-200 ease-jura hover:scale-105 sm:right-6 sm:bottom-[calc(1.5rem+var(--cookie-h,0px))] sm:h-[54px] sm:gap-2.5 sm:pr-5 sm:pl-4 sm:text-[0.8125rem] ${
        escondido ? "pointer-events-none translate-y-4 opacity-0" : ""
      }`}
    >
      <WhatsAppIcon className="size-[26px] shrink-0" />
      {deIPneu ? "Pedir preço do pneu" : "Chamar no WhatsApp"}
    </a>
  );
}
