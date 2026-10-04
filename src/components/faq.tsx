"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { faq } from "@/lib/site";
import { ChevronIcon } from "./icons";

export function Faq({ itens = faq }: { itens?: readonly { q: string; a: string }[] }) {
  const [aberto, setAberto] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <>
    <noscript>
      <div className="mt-8 max-w-3xl">
        {itens.map((item) => (
          <div key={item.q} className="border-t border-line py-5 last:border-b">
            <h3 className="font-ui text-[1.05rem] font-bold">{item.q}</h3>
            <p className="mt-3 text-[0.975rem] leading-relaxed text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </noscript>
    <div className="js-only mt-8 max-w-3xl">
      {itens.map((item, i) => {
        const ativo = aberto === i;
        return (
          <div key={item.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                onClick={() => setAberto(ativo ? null : i)}
                aria-expanded={ativo}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-5 py-5.5 text-left font-ui text-[1.05rem] font-bold transition-colors duration-200 hover:text-jura-text"
              >
                {item.q}
                <ChevronIcon
                  className={`size-[22px] shrink-0 text-jura-title transition-transform duration-300 ease-jura ${
                    ativo ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <motion.div
              id={`faq-${i}`}
              initial={false}
              animate={{ height: ativo ? "auto" : 0, opacity: ativo ? 1 : 0 }}
              transition={{ duration: reduce ? 0 : 0.28, ease: [0.16, 1, 0.3, 1] }}
              inert={!ativo}
              aria-hidden={!ativo}
              className="overflow-hidden"
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-[0.975rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </motion.div>
          </div>
        );
      })}
    </div>
    </>
  );
}
