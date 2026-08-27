"use client";

import { useState } from "react";
import { diferenciais } from "@/lib/site";
import { Btn } from "./ui";
import { ArrowIcon, ChevronIcon } from "./icons";
import { Reveal } from "./reveal";

/**
 * Lista de motivos pra escolher o Jura, um por item, com setinha que
 * expande mais informação. O último item (quem é o Jura) expande um
 * mini resumo com link pra história completa, igual pede o dono.
 */
export function Diferenciais() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <ul className="mt-8 lg:mt-10">
      {diferenciais.map((d, i) => {
        const ativo = aberto === i;
        return (
          <Reveal
            as="li"
            key={d.slug}
            delay={i * 0.06}
            className="group border-t border-line last:border-b"
          >
            <button
              type="button"
              onClick={() => setAberto(ativo ? null : i)}
              aria-expanded={ativo}
              aria-controls={`dif-${d.slug}`}
              className="grid w-full items-start gap-4 py-5 text-left sm:grid-cols-[5.5rem_1fr_auto] sm:gap-10 lg:py-6"
            >
              <span
                aria-hidden="true"
                className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-[0.8] text-transparent transition-colors duration-300 ease-jura [-webkit-text-stroke:1.5px_#4a4a4a] group-hover:[-webkit-text-stroke-color:var(--color-jura-title)]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="mb-2.5 font-ui text-[1.4rem] leading-tight font-bold text-cream">
                  {d.titulo}
                </h3>
                <p className="max-w-[58ch] text-[1rem] leading-relaxed text-[#dcdcdc]">
                  {d.texto}
                </p>
              </div>
              <ChevronIcon
                className={`mt-2 size-6 shrink-0 self-start text-jura-title transition-transform duration-300 ease-jura sm:mt-1 ${
                  ativo ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              id={`dif-${d.slug}`}
              className={`grid transition-[grid-template-rows] duration-350 ease-jura sm:pl-[7.5rem] ${
                ativo ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="max-w-[58ch] pb-8">
                  <p className="text-[0.975rem] leading-relaxed text-[#dcdcdc]">
                    {d.textoExpandido}
                  </p>
                  {d.ctaHref && d.ctaLabel && (
                    <Btn href={d.ctaHref} variant="ghost" className="mt-5">
                      {d.ctaLabel}
                      <ArrowIcon className="size-5" />
                    </Btn>
                  )}
                </div>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
