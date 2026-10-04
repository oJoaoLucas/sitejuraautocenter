import type { Metadata } from "next";
import { Faq } from "@/components/faq";
import { FaqSchema } from "@/components/faq-schema";
import { Foto } from "@/components/foto";
import { PinIcon, Stars } from "@/components/icons";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { Btn, BtnWhats, SpeedBars, Wrap } from "@/components/ui";
import {
  avaliacoesGoogle,
  cta,
  faqPneus,
  pneusPassos,
  site,
} from "@/lib/site";

const titulo = "Pneus em Araras: nacionais, importados e remold";
const descricao =
  "Pneus nacionais, importados e remold em Araras/SP. Informe a medida e receba o preço pelo WhatsApp. Até 10x no cartão. Nota 4,9 no Google.";

export const metadata: Metadata = {
  title: titulo,
  description: descricao,
  alternates: { canonical: "/pneus" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${titulo} | ${site.nome}`,
    description: descricao,
    url: "/pneus",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

/** Avaliações que falam de pneu ou de atendimento, na ordem em que aparecem. */
const depoimentos = ["Gedaias Oliveira", "Renato Curtolo", "Gabriela Chinalia de Sena"]
  .map((nome) => avaliacoesGoogle.find((a) => a.nome === nome))
  .filter((a) => a !== undefined);

export default function Pneus() {
  return (
    <>
      <FaqSchema itens={faqPneus} />

      {/* ============================================================
          1. PRIMEIRA TELA
          Quem clicou no anúncio de pneu já vê o formulário aqui, sem
          rolar. No celular: título, uma frase e o formulário.
          ============================================================ */}
      <section id="orcamento" className="relative overflow-hidden pt-[92px] pb-12 sm:pt-[110px] lg:pb-20">
        <div className="absolute inset-0">
          <Foto
            src="/img/pneus-prateleira.webp"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_40%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_20_20/0.78)_0%,rgb(20_20_20/0.58)_45%,rgb(20_20_20/0.96)_100%),linear-gradient(92deg,rgb(20_20_20/0.88)_0%,rgb(20_20_20/0.3)_75%)]"
          />
        </div>

        <Wrap className="relative">
          <div className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="lg:pt-6">
              <h1 className="text-[clamp(2.25rem,7vw,4.25rem)] [text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
                <span className="block">Pneus nacionais,</span>
                <span className="block text-jura-title">importados e remold</span>
                <span className="block">em Araras</span>
              </h1>

              <p className="mt-4 max-w-md text-[1.025rem] leading-relaxed text-[#e4e4e4] lg:mt-5 lg:text-[1.075rem]">
                Informe a medida e prepare seu pedido de orçamento pelo WhatsApp.
              </p>

              {/* Só no desktop: no celular o formulário já traz isso colado no botão. */}
              <ul className="mt-8 hidden gap-3 lg:grid">
                {[
                  "Pagamento em até 10x no cartão",
                  "Orçamento fechado antes da montagem",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[0.95rem] text-muted">
                    <i className="block h-2 w-5 shrink-0 skew-jura rounded-[2px] bg-jura" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-md border border-line bg-surface/95 p-5 shadow-[0_24px_60px_rgb(0_0_0/0.45)] backdrop-blur-sm sm:p-7">
              <h2 className="text-[1.75rem] leading-none sm:text-[2rem]">
                Peça o preço <span className="text-jura-title">pelo WhatsApp</span>
              </h2>
              <QuoteForm
                local="pneus"
                botao="Continuar no WhatsApp"
                className="mt-5 max-w-none"
              />
            </div>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          2. COMO FUNCIONA + FOTO DO ESTOQUE
          ============================================================ */}
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <figure className="overflow-hidden rounded-md border border-line">
                <Foto
                  src="/img/pneus-estoque.webp"
                  alt="Pneus novos no estoque do Jura Auto Center"
                  width={1000}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-[4/3.4] w-full object-cover"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
                Do pedido à montagem, <span className="text-jura-title">sem complicação</span>
              </h2>
              <ol className="mt-8 grid gap-6">
                {pneusPassos.map((p, i) => (
                  <li key={p.titulo} className="flex gap-4">
                    <span className="grid size-10 shrink-0 skew-jura place-items-center rounded-sm bg-jura">
                      <b className="unskew-jura font-ui text-[0.95rem] font-extrabold text-white">
                        {i + 1}
                      </b>
                    </span>
                    <div>
                      <h3 className="font-ui text-[1.05rem] font-bold">{p.titulo}</h3>
                      <p className="mt-1 text-[0.925rem] leading-relaxed text-muted">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <BtnWhats href={cta.whatsPneus} className="mt-9 max-sm:w-full" local="como-funciona">
                Pedir preço do pneu
              </BtnWhats>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          3. AVALIAÇÕES
          Depoimentos reais do Google (mesmos da home).
          ============================================================ */}
      <section id="avaliacoes" className="scroll-mt-20 border-y border-line bg-ink-deep py-14 lg:py-20">
        <Wrap>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-[clamp(2rem,5vw,2.75rem)]">O que dizem no Google</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Mais de trezentas pessoas de Araras e região já avaliaram o Jura. A nota é essa,
                e ela é pública.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-line bg-surface px-5 py-4">
              <span className="font-display text-5xl leading-[0.85] text-offer">
                {site.prova.nota}
              </span>
              <span className="text-[0.8125rem] text-soft">
                <Stars className="mb-1 size-4" />
                <br />
                mais de {site.prova.avaliacoes} avaliações
              </span>
            </div>
          </Reveal>

          <div className="grid gap-3.5 md:grid-cols-3">
            {depoimentos.map((a) => (
              <figure
                key={a.nome}
                className="flex flex-col gap-3.5 rounded-md border border-line bg-surface p-6"
              >
                <Stars className="size-[17px]" />
                <p className="text-[0.9rem] leading-relaxed text-soft">{a.texto}</p>
                <figcaption className="mt-auto border-t border-line pt-3.5">
                  <b className="block font-ui text-[0.9rem] font-bold text-cream">{a.nome}</b>
                </figcaption>
              </figure>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-8 flex flex-wrap justify-center gap-3">
            <Btn href={site.perfilGoogleUrl} variant="ghost" external>
              Ver perfil no Google
            </Btn>
            <Btn href={site.avaliarUrl} variant="quiet" external>
              Deixar uma avaliação
            </Btn>
          </Reveal>
        </Wrap>
      </section>

      {/* ============================================================
          4. DÚVIDAS
          ============================================================ */}
      <section id="duvidas" className="scroll-mt-20 py-14 lg:py-20">
        <Wrap>
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              Dúvidas sobre <span className="text-jura-title">pneus</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq itens={faqPneus} />
          </Reveal>
        </Wrap>
      </section>

      {/* ============================================================
          5. ONDE ESTAMOS + CTA FINAL
          ============================================================ */}
      <section
        id="onde-estamos"
        className="relative overflow-hidden border-t border-line bg-[linear-gradient(120deg,#1a0d11_0%,var(--color-ink)_55%)] py-14 lg:py-20"
      >
        <Wrap className="relative">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <Reveal>
              <SpeedBars className="mb-6" />
              <h2 className="text-[clamp(2.25rem,6vw,3.5rem)]">
                Pneu novo pro seu carro?
                <br />
                <span className="text-jura-title">Vem pro Jura.</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <Btn href="#orcamento" variant="red" className="max-sm:w-full">
                  Pedir orçamento
                </Btn>
                <BtnWhats href={cta.whatsPneus} className="max-sm:w-full" local="cta-final">
                  Falar no WhatsApp
                </BtnWhats>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="grid gap-5 rounded-md border border-line bg-surface p-6">
              <div>
                <h3 className="mb-1.5 font-ui text-[1.05rem] font-bold">Endereço</h3>
                <address className="text-[0.95rem] leading-relaxed text-muted not-italic">
                  {site.endereco.rua}, {site.endereco.bairro}
                  <br />
                  {site.endereco.cidade}/{site.endereco.uf} · estacionamento próprio ao lado
                </address>
              </div>
              <ul className="grid gap-1.5 text-[0.95rem]">
                {site.horario.map((h) => (
                  <li key={h.dia} className="flex max-w-80 justify-between gap-4 text-muted">
                    <span>{h.dia}</span>
                    <b className="font-semibold text-cream">{h.hora}</b>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Btn href={site.mapsUrl} variant="red" external evento="tracar_rota_click" local="pneus">
                  <PinIcon className="size-5" />
                  Traçar rota
                </Btn>
                <Btn href={cta.whatsFila} variant="quiet" external evento="fila_click" local="pneus">
                  Ver como está a fila
                </Btn>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>
    </>
  );
}
