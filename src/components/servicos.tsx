import Image from "next/image";
import { servicos } from "@/lib/site";
import { Reveal } from "./reveal";

/**
 * Grade de serviços. 2 colunas já no mobile (em vez de empilhar os
 * 8 cards um embaixo do outro) — reduz a altura do bloco pela metade
 * sem esconder texto atrás de clique nenhum.
 */
export function Servicos() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {servicos.map((s, i) => (
        <Reveal
          key={s.slug}
          as="article"
          delay={i * 0.05}
          className="group relative isolate flex flex-col overflow-hidden rounded-md border border-line bg-surface px-3.5 pt-4 pb-5 transition-[transform,border-color,background-color] duration-300 ease-jura hover:-translate-y-1.5 hover:border-jura-title hover:bg-[#232323] sm:px-5 sm:pt-5 sm:pb-6"
        >
          <div className="mb-3 grid size-10 place-items-center rounded-md border border-line bg-[#171717] transition-[transform,border-color] duration-300 ease-jura group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-jura-title sm:mb-3.5 sm:size-11">
            <Image src={s.icone} alt="" width={512} height={512} className="size-5 sm:size-6" />
          </div>
          <h3 className="mb-1.5 font-ui text-[0.95rem] leading-tight font-bold sm:text-[1.1rem]">
            {s.titulo}
          </h3>
          <p className="text-[0.78rem] leading-relaxed text-soft sm:text-[0.84rem]">{s.texto}</p>
          <span
            aria-hidden="true"
            className="absolute inset-x-[-14%] bottom-0 h-[5px] origin-left skew-jura scale-x-0 bg-jura transition-transform duration-400 ease-jura group-hover:scale-x-100"
          />
        </Reveal>
      ))}
    </div>
  );
}
