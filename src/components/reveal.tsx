"use client";

import { motion, useAnimate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Revelação na entrada em viewport.
 * Motivo: dar hierarquia de leitura em uma página longa. O olho recebe uma
 * seção por vez em vez de a página inteira de uma só.
 * Colapsa para estático quando o sistema pede menos movimento.
 */
export function Reveal({
  children,
  delay = 0,
  y = 26,
  className = "",
  as = "div",
  href,
  target,
  rel,
  entrada = false,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "a";
  /** Só faz sentido com as="a" — vira um card inteiro clicável. */
  href?: string;
  target?: string;
  rel?: string;
  /** Entrada imediata para o hero; as demais seções aguardam a rolagem. */
  entrada?: boolean;
}) {
  const reduce = useReducedMotion();
  const [scope, animate] = useAnimate();
  const visivel = useInView(scope, { once: true, amount: 0.12, margin: "0px 0px -24px 0px" });
  const animado = useRef(false);
  const M = motion[as];

  // O HTML nasce visível. Sem JS ou antes da hidratação, o conteúdo continua
  // legível; a animação só começa depois que a página está interativa.
  useEffect(() => {
    if ((!entrada && !visivel) || !scope.current || reduce === null) return;
    if (reduce) {
      animate(scope.current, { opacity: 1, y: 0 }, { duration: 0 });
      return;
    }
    if (animado.current) return;
    animado.current = true;
    animate(scope.current, { opacity: [0, 1], y: [y, 0] }, {
      duration: 0.55, delay, ease: [0.16, 1, 0.3, 1],
    });
  }, [animate, delay, entrada, reduce, scope, visivel, y]);

  return (
    <M
      ref={scope}
      href={href}
      target={target}
      rel={rel}
      className={className}
      initial={false}
      whileHover={as === "a" && !reduce ? { scale: 1.015 } : undefined}
      whileTap={as === "a" && !reduce ? { scale: 0.985 } : undefined}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </M>
  );
}
