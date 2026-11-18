import Image from "next/image";
import { servicos } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

/**
 * Grade de serviços. No celular, 2 colunas só com ícone e nome (18/11/2026:
 * os 8 cards com descrição davam quase 3 telas de rolagem; a descrição em
 * 2 colunas ficava com ~15 letras por linha, então ela some no celular e
 * continua nas páginas de cada serviço); a partir de sm volta pra cards
 * completos em grade.
 *
 * Cada card é um link pro WhatsApp com a mensagem já falando desse
 * serviço específico — facilita o atendimento e mostra de onde veio
 * o contato.
 */
export function Servicos() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4">
      {servicos.map((s, i) => (
        <Reveal
          key={s.slug}
          as="a"
          href={s.whatsHref}
          target="_blank"
          rel="noopener noreferrer"
          delay={i * 0.05}
          className="group relative isolate flex min-h-[60px] flex-row items-center gap-2 overflow-hidden rounded-md border border-line bg-surface px-2.5 py-2.5 sm:min-h-0 sm:flex-col sm:items-start sm:gap-0 transition-[transform,border-color,background-color] duration-300 ease-jura hover:border-jura-title hover:bg-[#232323] sm:px-5 sm:pt-5 sm:pb-6"
        >
          <div className="grid size-7 shrink-0 place-items-center rounded-md border-line sm:mb-3.5 sm:border sm:bg-[#171717] transition-[transform,border-color] duration-300 ease-jura group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-jura-title sm:size-11">
            <Image src={s.icone} alt="" width={96} height={96} className="size-5 sm:size-6" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <h3 className="font-ui text-[0.78rem] leading-tight font-bold [overflow-wrap:anywhere] sm:mb-1.5 sm:text-[1.1rem]">
            {s.titulo}
          </h3>
          <p className="hidden text-[0.84rem] leading-relaxed text-soft sm:block">{s.texto}</p>
          <span className="mt-auto flex items-center gap-1.5 pt-1 font-ui text-[0.72rem] font-bold tracking-[0.06em] text-jura-text uppercase sm:pt-2.5">
            <WhatsAppIcon className="size-3.5 shrink-0" />
            <span className="max-sm:sr-only">Pedir no WhatsApp</span>
            <span aria-hidden="true" className="sm:hidden">Pedir</span>
          </span>
          </div>
          <span
            aria-hidden="true"
            className="absolute inset-x-[-14%] bottom-0 h-[5px] origin-left skew-jura scale-x-0 bg-jura transition-transform duration-400 ease-jura group-hover:scale-x-100"
          />
        </Reveal>
      ))}
    </div>
  );
}
