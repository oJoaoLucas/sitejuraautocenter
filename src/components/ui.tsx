import Link from "next/link";
import type { ReactNode } from "react";
import { WhatsAppIcon } from "./icons";

/* ---------------------------------------------------------------- */
/* Botão                                                             */
/* ---------------------------------------------------------------- */

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-sm " +
  "font-ui text-[0.9375rem] font-bold uppercase tracking-[0.05em] " +
  "border-2 border-transparent transition-[transform,background-color,border-color,color] " +
  "duration-200 ease-jura hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.985] " +
  "h-[52px] px-6";

const variants = {
  // Verde: o CTA número 1, só WhatsApp. Contraste 7:1 sobre o verde.
  whats: "bg-whats text-whats-ink hover:bg-[#2ee878]",
  // Vermelho sempre como FUNDO, nunca como texto sobre preto (brand book p.12).
  red: "bg-jura text-white hover:bg-jura-strong",
  // Borda no vermelho-titulo (#E5304C) e nao no #C8102E: sobre foto escura
  // o vermelho puro some. O scrim garante que o botao leia como botao
  // mesmo por cima de uma area clara da imagem.
  ghost:
    "border-jura-title bg-ink/45 text-cream backdrop-blur-[2px] " +
    "hover:border-jura hover:bg-jura hover:text-white",
  quiet: "bg-surface-2 text-cream hover:bg-[#3d3d3d]",
} as const;

type BtnProps = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  external?: boolean;
};

export function Btn({ href, children, variant = "red", className = "", external }: BtnProps) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (external || href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function BtnWhats({ href, children, className = "" }: Omit<BtnProps, "variant">) {
  return (
    <Btn href={href} variant="whats" className={className} external>
      <WhatsAppIcon className="size-5 shrink-0" />
      {children}
    </Btn>
  );
}

/* ---------------------------------------------------------------- */
/* Faixas de velocidade: o divisor da marca, skew -18deg (p.06)      */
/* ---------------------------------------------------------------- */

export function SpeedBars({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden="true">
      <i className="block h-2 w-[52px] skew-jura rounded-[2px] bg-jura" />
      <i className="block h-2 w-[26px] skew-jura rounded-[2px] bg-jura-strong" />
      <i className="block h-2 w-[13px] skew-jura rounded-[2px] bg-offer" />
    </div>
  );
}

/* ---------------------------------------------------------------- */
/* Container e casca de seção                                        */
/* ---------------------------------------------------------------- */

export function Wrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-3.5 block font-ui text-[0.7rem] font-bold uppercase tracking-[0.22em] text-jura-title">
      {children}
    </span>
  );
}
