"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { cta, site } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

const links = [
  { href: "/#servicos", label: "Serviços" },
  { href: "/#orcamento", label: "Orçamento" },
  { href: "/#por-que", label: "Por que o Jura" },
  { href: "/historia", label: "Nossa história" },
  { href: "/#onde-estamos", label: "Onde estamos" },
];

export function Header() {
  const [preso, setPreso] = useState(false);
  const [aberto, setAberto] = useState(false);
  const sentinela = useRef<HTMLDivElement>(null);
  const botaoMenu = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  /* IntersectionObserver em vez de listener de scroll: sem trabalho por frame. */
  useEffect(() => {
    const alvo = sentinela.current;
    if (!alvo) return;
    const io = new IntersectionObserver(([e]) => setPreso(!e.isIntersecting), {
      rootMargin: "8px 0px 0px 0px",
    });
    io.observe(alvo);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = aberto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [aberto]);

  /* Escape fecha o menu mobile e devolve o foco pro botão que abriu. */
  useEffect(() => {
    if (!aberto) return;
    function aoTeclar(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAberto(false);
        botaoMenu.current?.focus();
      }
    }
    document.addEventListener("keydown", aoTeclar);
    return () => document.removeEventListener("keydown", aoTeclar);
  }, [aberto]);

  return (
    <>
      <div ref={sentinela} className="absolute top-0 h-px w-full" aria-hidden="true" />

      <header
        className={`fixed inset-x-0 top-0 z-60 flex items-center border-b transition-all duration-300 ease-jura ${
          preso || aberto
            ? "h-16 border-line bg-ink/95 shadow-[0_10px_30px_rgb(0_0_0/0.4)] backdrop-blur-md"
            : "h-[76px] border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1280px] items-center gap-6 px-5 sm:px-8 lg:px-12">
          <Link href="/" aria-label={`${site.nome}, ir para o início`} className="shrink-0">
            {/* Logo branco (só silhueta) o tempo todo: fica limpo tanto sobre
                a foto do hero quanto sobre o fundo sólido do header preso. */}
            <Image
              src="/logo/jura-branco.png"
              alt={site.nome}
              width={1167}
              height={511}
              priority
              className={`w-auto transition-all duration-300 ease-jura ${
                preso ? "h-9" : "h-[38px]"
              }`}
            />
          </Link>

          <nav className="ml-auto hidden items-center gap-7 lg:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="group relative py-1 text-sm font-medium text-muted transition-colors hover:text-cream aria-[current=page]:text-cream"
              >
                {l.label}
                <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left skew-jura scale-x-0 bg-jura transition-transform duration-300 ease-jura group-hover:scale-x-100 group-aria-[current=page]:scale-x-100" />
              </Link>
            ))}
          </nav>

          <a
            href={cta.whatsPrincipal}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 hidden h-11 items-center gap-2 rounded-sm bg-whats px-4 font-ui text-[0.8125rem] font-bold uppercase tracking-[0.05em] text-whats-ink transition-all duration-200 ease-jura hover:-translate-y-0.5 hover:bg-[#2ee878] lg:inline-flex"
          >
            <WhatsAppIcon className="size-[18px]" />
            WhatsApp
          </a>

          <button
            ref={botaoMenu}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls="menu-mobile"
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            className="ml-auto grid size-11 place-items-center lg:hidden"
          >
            <span
              className={`relative block h-0.5 w-6 transition-colors duration-200 ${
                aberto ? "bg-transparent" : "bg-cream"
              } before:absolute before:left-0 before:h-0.5 before:w-6 before:bg-cream before:transition-transform before:duration-300 before:ease-jura after:absolute after:left-0 after:h-0.5 after:w-6 after:bg-cream after:transition-transform after:duration-300 after:ease-jura ${
                aberto
                  ? "before:top-0 before:rotate-45 after:top-0 after:-rotate-45"
                  : "before:-top-2 after:top-2"
              }`}
            />
          </button>
        </div>
      </header>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!aberto}
        className="fixed inset-x-0 top-16 z-55 border-b border-line bg-ink px-5 pb-6 sm:px-8 lg:hidden"
      >
        <nav className="flex flex-col">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setAberto(false)}
              className="border-b border-line py-4 text-base font-medium text-muted transition-colors hover:text-cream"
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <a
          href={cta.whatsPrincipal}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setAberto(false)}
          className="mt-5 flex h-[52px] items-center justify-center gap-2.5 rounded-sm bg-whats font-ui text-[0.9375rem] font-bold uppercase tracking-[0.05em] text-whats-ink"
        >
          <WhatsAppIcon className="size-5" />
          Chamar no WhatsApp
        </a>
      </div>
    </>
  );
}
