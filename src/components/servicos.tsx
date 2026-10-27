import Image from "next/image";
import { servicos } from "@/lib/site";
import { WhatsAppIcon } from "./icons";
import { Reveal } from "./reveal";

/**
 * Grade de serviços. No celular, 1 coluna com o ícone ao lado do texto
 * (em 2 colunas as linhas ficavam com ~15 letras e cansavam a leitura);
 * a partir de sm volta pra cards em grade.
 *
 * Cada card é um link pro WhatsApp com a mensagem já falando desse
 * serviço específico — facilita o atendimento e mostra de onde veio
 * o contato.
 */
export function Servicos() {
  return (
    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3 lg:grid-cols-4">
      {servicos.map((s, i) => (
        <Reveal
          key={s.slug}
          as="a"
          href={s.whatsHref}
          target="_blank"
          rel="noopener noreferrer"
          delay={i * 0.05}
          className="group relative isolate flex flex-row items-start gap-3.5 overflow-hidden rounded-md border border-line bg-surface px-4 pt-4 pb-4 sm:flex-col sm:gap-0 transition-[transform,border-color,background-color] duration-300 ease-jura hover:border-jura-title hover:bg-[#232323] sm:px-5 sm:pt-5 sm:pb-6"
        >
          <div className="grid size-10 shrink-0 place-items-center sm:mb-3.5 rounded-md border border-line bg-[#171717] transition-[transform,border-color] duration-300 ease-jura group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-jura-title sm:size-11">
            <Image src={s.icone} alt="" width={96} height={96} className="size-5 sm:size-6" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col self-stretch">
          <h3 className="mb-1.5 font-ui text-[0.95rem] leading-tight font-bold sm:text-[1.1rem]">
            {s.titulo}
          </h3>
          <p className="text-[0.875rem] leading-relaxed text-soft sm:text-[0.84rem]">{s.texto}</p>
          <span className="mt-auto flex items-center gap-1.5 pt-2.5 font-ui text-[0.68rem] font-bold tracking-[0.06em] text-jura-text uppercase sm:text-[0.72rem]">
            <WhatsAppIcon className="size-3.5 shrink-0" />
            Pedir no WhatsApp
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
