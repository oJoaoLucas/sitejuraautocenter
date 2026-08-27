import { cta } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/** Botão flutuante em todas as telas: o objetivo único do site (brand book p.11). */
export function WhatsFloat() {
  return (
    <a
      href={cta.whatsPrincipal}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com o Jura no WhatsApp"
      className="group fixed right-4 bottom-4 z-70 grid size-[58px] place-items-center rounded-full bg-whats shadow-[0_10px_30px_rgb(0_0_0/0.45)] transition-transform duration-200 ease-jura hover:scale-110 sm:right-6 sm:bottom-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-whats opacity-40 [animation-duration:2.8s] motion-reduce:hidden"
      />
      <WhatsAppIcon className="size-[30px] text-whats-ink" />
    </a>
  );
}
