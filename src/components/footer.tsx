import Image from "next/image";
import Link from "next/link";
import { cta, site } from "@/lib/site";
import { InstagramIcon, WhatsAppIcon } from "./icons";
import { SpeedBars, Wrap } from "./ui";

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#0e0e0e] pt-14 pb-8">
      <Wrap>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src="/logo/jura-branco.png"
              alt={site.nome}
              width={1167}
              height={511}
              className="mb-4 h-11 w-auto"
            />
            <p className="font-display text-2xl tracking-[0.02em] text-jura-title">
              {site.assinatura}
            </p>
            <p className="mt-2 max-w-xs text-sm text-soft">
              Especialistas em suspensão, freios e pneus em Araras desde 2019.
            </p>
            <div className="mt-5 flex gap-2.5">
              <a
                href={cta.whatsPrincipal}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Falar no WhatsApp"
                className="grid size-11 place-items-center rounded-sm border border-line bg-surface text-muted transition-all duration-200 ease-jura hover:-translate-y-0.5 hover:border-[#4f4f4f] hover:bg-surface-2 hover:text-cream"
              >
                <WhatsAppIcon className="size-5" />
              </a>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Instagram do ${site.nome}`}
                className="grid size-11 place-items-center rounded-sm border border-line bg-surface text-muted transition-all duration-200 ease-jura hover:-translate-y-0.5 hover:border-[#4f4f4f] hover:bg-surface-2 hover:text-cream"
              >
                <InstagramIcon className="size-5" />
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-ui text-[0.78rem] font-bold uppercase tracking-[0.14em] text-soft">
              Contato
            </h2>
            <ul className="grid gap-2.5 text-sm text-muted">
              <li>
                <a href={cta.whatsPrincipal} target="_blank" rel="noopener noreferrer"
                   className="transition-colors hover:text-jura-title">
                  WhatsApp {site.whatsappExibicao}
                </a>
              </li>
              <li>Fixo {site.telefoneFixo}</li>
              <li>
                <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer"
                   className="transition-colors hover:text-jura-title">
                  @{site.instagram}
                </a>
              </li>
              <li className="pt-1">
                <address className="not-italic leading-relaxed">
                  {site.endereco.rua}
                  <br />
                  {site.endereco.bairro}
                  <br />
                  {site.endereco.cidade}/{site.endereco.uf} - {site.endereco.cep}
                </address>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 font-ui text-[0.78rem] font-bold uppercase tracking-[0.14em] text-soft">
              Horário
            </h2>
            <ul className="grid gap-2.5 text-sm text-muted">
              {site.horario.map((h) => (
                <li key={h.dia} className="flex max-w-64 justify-between gap-4">
                  <span>{h.dia}</span>
                  <b className="font-semibold text-cream">{h.hora}</b>
                </li>
              ))}
            </ul>
            <p className="mt-4 max-w-56 text-xs leading-relaxed text-soft">
              Atendimento por ordem de chegada. Não trabalhamos com hora marcada.
            </p>

            <h2 className="mt-7 mb-4 font-ui text-[0.78rem] font-bold uppercase tracking-[0.14em] text-soft">
              Navegar
            </h2>
            <ul className="grid gap-2.5 text-sm text-muted">
              <li><Link href="/#servicos" className="transition-colors hover:text-jura-title">Serviços</Link></li>
              <li><Link href="/historia" className="transition-colors hover:text-jura-title">Nossa história</Link></li>
              <li><Link href="/#duvidas" className="transition-colors hover:text-jura-title">Dúvidas frequentes</Link></li>
            </ul>
          </div>
        </div>

        <SpeedBars className="mt-12" />

        <div className="mt-5 flex flex-wrap justify-between gap-4 border-t border-line pt-6 text-[0.8125rem] text-soft">
          <p>
            {site.nome} - {site.endereco.cidade}/{site.endereco.uf}
          </p>
          <p>
            &copy; {new Date().getFullYear()} {site.nome}. Todos os direitos reservados. -{" "}
            <Link href="/privacidade" className="underline underline-offset-4 transition-colors hover:text-jura-title">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
