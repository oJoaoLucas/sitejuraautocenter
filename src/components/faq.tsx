"use client";

import { useState } from "react";
import { faq } from "@/lib/site";
import { ChevronIcon } from "./icons";

export function Faq() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <div className="mt-8 max-w-3xl">
      {faq.map((item, i) => {
        const ativo = aberto === i;
        return (
          <div key={item.q} className="border-t border-line last:border-b">
            <h3>
              <button
                type="button"
                onClick={() => setAberto(ativo ? null : i)}
                aria-expanded={ativo}
                aria-controls={`faq-${i}`}
                className="flex w-full items-center justify-between gap-5 py-5.5 text-left font-ui text-[1.05rem] font-bold transition-colors duration-200 hover:text-jura-title"
              >
                {item.q}
                <ChevronIcon
                  className={`size-[22px] shrink-0 text-jura-title transition-transform duration-300 ease-jura ${
                    ativo ? "rotate-180" : ""
                  }`}
                />
              </button>
            </h3>
            <div
              id={`faq-${i}`}
              className={`grid transition-[grid-template-rows] duration-350 ease-jura ${
                ativo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-[62ch] pb-6 text-[0.975rem] leading-relaxed text-muted">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
