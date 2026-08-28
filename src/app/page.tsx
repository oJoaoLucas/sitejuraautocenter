import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Diferenciais } from "@/components/diferenciais";
import { Faq } from "@/components/faq";
import { OndeEstamosCarrossel } from "@/components/carrossel";
import { ArrowIcon, InstagramIcon, PinIcon, StarIcon, Stars, WhatsAppIcon } from "@/components/icons";
import { QuoteForm } from "@/components/quote-form";
import { Reveal } from "@/components/reveal";
import { Servicos } from "@/components/servicos";
import { Btn, BtnWhats, Eyebrow, SpeedBars, Wrap } from "@/components/ui";
import { avaliacoesGoogle, cta, site } from "@/lib/site";

export const metadata: Metadata = {
  description:
    "Pneus, alinhamento, balanceamento, freios, suspensão, troca de óleo e revisão em Araras/SP. Sete anos, mais de 10 mil carros atendidos e nota 4,9 no Google.",
};

export default function Home() {
  return (
    <>
      {/* ============================================================
          1. HERO
          Foto real do galpão com overlay. Conteúdo à esquerda, não
          centralizado: o olho brasileiro lê da esquerda e a foto
          respira à direita.
          ============================================================ */}
      <section className="relative flex min-h-[90dvh] items-end overflow-hidden pt-[76px]">
        <div className="absolute inset-0">
          <Image
            src="/img/fachada-hero.webp"
            alt="Fachada do Jura Auto Center aberta na Avenida Loreto, 889, em Araras"
            fill
            priority
            sizes="100vw"
            quality={80}
            className="object-cover object-[58%_42%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(178deg,rgb(20_20_20/0.82)_0%,rgb(20_20_20/0.5)_34%,rgb(20_20_20/0.97)_92%),linear-gradient(92deg,rgb(20_20_20/0.92)_0%,rgb(20_20_20/0.28)_62%)]"
          />
        </div>

        <Wrap className="relative pb-14 sm:pb-20 lg:pb-24">
          <div className="max-w-3xl">
            {/* Único elemento pequeno do hero: a prova social que o brand book pede acima da dobra */}
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-sm border border-line bg-surface/80 px-3.5 py-2 text-[0.8125rem] text-muted backdrop-blur-sm">
              <Stars className="size-[15px]" />
              <span>
                <b className="font-ui font-extrabold text-cream">{site.prova.nota}</b> no Google,
                mais de {site.prova.avaliacoes} avaliações
              </span>
            </div>

            <h1 className="mb-4 text-[clamp(2.75rem,7.5vw,4.5rem)] [text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
              <span className="block">Pneu, freio e suspensão</span>
              <span className="block text-jura-title">é no Jura.</span>
            </h1>

            <p className="mb-8 max-w-lg text-[1.075rem] leading-relaxed text-[#e4e4e4]">
              Sete anos em Araras cuidando de quem depende do carro todo dia.
              Orçamento na hora, pelo WhatsApp.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <BtnWhats href={cta.whatsPrincipal} className="max-sm:w-full">
                Chamar no WhatsApp
              </BtnWhats>
              <Btn href="#servicos" variant="ghost" className="max-sm:w-full">
                Ver serviços
              </Btn>
            </div>

            {/* Números discretos logo abaixo do CTA: o cliente já lê de cara,
                sem precisar descer a página. */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line/60 pt-5 text-[0.8125rem] text-soft">
              <span>
                <b className="font-ui font-bold text-cream">{site.prova.anos}</b> anos em Araras
              </span>
              <span>
                <b className="font-ui font-bold text-cream">{site.prova.carros}+</b> carros
                atendidos
              </span>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          3. SERVIÇOS
          Grid bento: pneus ocupa 2x2 porque é a especialidade que
          traz cliente. Os ícones são os oficiais do brand book.
          ============================================================ */}
      <section id="servicos" className="scroll-mt-20 py-14 lg:py-20">
        <Wrap>
          <Reveal className="mb-10 max-w-2xl lg:mb-12">
            <Eyebrow>O que fazemos</Eyebrow>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              Especialistas em <span className="text-jura-title">suspensão, freios e pneus</span>
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Pneu, alinhamento, balanceamento, freios, suspensão, amortecedores, óleo e revisão —
              o que a maior parte dos carros de Araras precisa, feito bem feito.
            </p>
            <SpeedBars className="mt-6" />
          </Reveal>

          <Servicos />
        </Wrap>
      </section>

      {/* ============================================================
          4. ORÇAMENTO DE PNEU
          Dois campos que abrem o WhatsApp com a mensagem pronta.
          O menor atrito possível entre dúvida e conversa.
          ============================================================ */}
      <section
        id="orcamento"
        className="relative scroll-mt-20 overflow-hidden border-y border-line py-14 lg:bg-ink-deep lg:py-20"
      >
        {/* Fundo só no mobile: a foto do pneu com degradê escuro por
            trás do formulário, em vez de uma figura separada grande.
            No desktop ela some daqui e volta como a foto ao lado. */}
        <div className="absolute inset-0 lg:hidden">
          <Image src="/img/pneus-close.webp" alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(16_16_16/0.8)_0%,rgb(16_16_16/0.92)_40%,rgb(16_16_16/0.98)_100%)]" />
        </div>

        <Wrap className="relative">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
                Orçamento de pneu em <span className="text-jura-title">trinta segundos</span>
              </h2>
              <p className="mt-4 leading-relaxed text-muted">
                Diz a medida que está escrita no seu pneu e quantos você precisa. A gente responde
                com o preço à vista e o parcelado, já com alinhamento e balanceamento inclusos.
              </p>
              <QuoteForm />
            </Reveal>

            <Reveal delay={0.12} className="hidden lg:block">
              <figure className="overflow-hidden rounded-md border border-line">
                <Image
                  src="/img/pneus-close.webp"
                  alt="Pneus novos no estoque do Jura Auto Center"
                  width={1000}
                  height={850}
                  sizes="45vw"
                  className="aspect-[4/3.4] w-full object-cover"
                />
              </figure>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          5. POR QUE O JURA
          Pilha numerada sem cards, sobre a textura de pneu da marca.
          ============================================================ */}
      <section id="por-que" className="tread-bg relative scroll-mt-20 overflow-hidden py-14 lg:py-20">
        <Wrap className="relative">
          <Reveal className="max-w-2xl">
            <Eyebrow>Por que escolher o Jura</Eyebrow>
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              Por que o povo volta <span className="text-jura-title">pro Jura</span>
            </h2>
          </Reveal>

          <Diferenciais />
        </Wrap>
      </section>

      {/* ============================================================
          6. AVALIAÇÕES DO GOOGLE
          Depoimentos reais, copiados do perfil do Jura no Google
          (prints em /avaliacoes). Nunca inventar depoimento.
          ============================================================ */}
      <section id="avaliacoes" className="scroll-mt-20 border-y border-line bg-ink-deep py-14 lg:py-20">
        <Wrap>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <Eyebrow>Quem já passou por aqui</Eyebrow>
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

          <div className="no-scrollbar -mx-5 grid snap-x snap-mandatory grid-flow-col auto-cols-[minmax(292px,1fr)] gap-3.5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
            {avaliacoesGoogle.map((a) => (
              <figure
                key={a.nome}
                className="flex snap-start flex-col gap-3.5 rounded-md border border-line bg-surface p-6"
              >
                <Stars className="size-[17px]" />
                <p className="line-clamp-6 text-[0.9rem] leading-relaxed text-soft">{a.texto}</p>
                <figcaption className="mt-auto border-t border-line pt-3.5">
                  <b className="block font-ui text-[0.9rem] font-bold text-cream">{a.nome}</b>
                </figcaption>
              </figure>
            ))}
          </div>

          <Reveal delay={0.1} className="mt-8 flex justify-center">
            <Btn href={site.avaliarUrl} variant="ghost" external>
              <Stars className="size-4" />
              Deixar uma avaliação
            </Btn>
          </Reveal>
        </Wrap>
      </section>

      {/* ============================================================
          7. PRÉVIA DA HISTÓRIA
          ============================================================ */}
      <section className="py-14 lg:py-20">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-18">
            <Reveal>
              <figure className="relative overflow-hidden rounded-md border border-line">
                <Image
                  src="/img/loja-antiga.webp"
                  alt="A primeira loja do Jura Auto Center em Araras, antes da mudança"
                  width={1200}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-[16/10] w-full object-cover saturate-[0.85] contrast-[1.05]"
                />
                <span className="absolute top-4 left-4 skew-jura rounded-sm bg-jura px-3 py-1.5">
                  <span className="unskew-jura block font-ui text-[0.72rem] font-extrabold tracking-[0.08em] text-white uppercase">
                    A loja de 2019
                  </span>
                </span>
              </figure>
            </Reveal>

            <Reveal delay={0.12}>
              <Eyebrow>De onde a gente veio</Eyebrow>
              <h2 className="mb-4 text-[clamp(2rem,5vw,2.75rem)]">
                Tudo começou em <span className="text-jura-title">um lugar bem menor</span>
              </h2>
              <p className="leading-relaxed text-muted">
                Em 15 de junho de 2019 o Jura abriu a porta pela primeira vez, num ponto pequeno,
                com muito menos ferramenta e nenhum cliente na agenda. Cinco anos depois veio o
                auto center novo, os elevadores e o paredão de pneus que você vê hoje.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Quem mudou de endereço foi a loja. O jeito de atender continuou igual.
              </p>
              <Btn href="/historia" variant="ghost" className="mt-7">
                Conheça a história
                <ArrowIcon className="size-5" />
              </Btn>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          8. ONDE ESTAMOS
          Mapa + endereço + a fachada, pra pessoa reconhecer o lugar
          quando chegar na rua.
          ============================================================ */}
      <section
        id="onde-estamos"
        className="scroll-mt-20 border-t border-line bg-ink-deep py-14 lg:py-20"
      >
        <Wrap>
          <Reveal className="mb-10 max-w-2xl">
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">Como chegar no Jura</h2>
            <p className="mt-4 leading-relaxed text-muted">
              Avenida Loreto, 889, no Jardim das Flores, com estacionamento próprio ao lado da loja.
            </p>
          </Reveal>

          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal className="grid content-start gap-6">
              <div className="h-[220px] overflow-hidden rounded-md border border-line bg-surface">
                <iframe
                  src={site.mapsEmbed}
                  title={`Mapa com a localização do ${site.nome}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="h-full w-full border-0 grayscale-[0.35] contrast-[1.05]"
                />
              </div>

              <div className="border-l-[3px] border-jura pl-4.5">
                <h3 className="mb-1.5 font-ui text-[1.05rem] font-bold">Endereço</h3>
                <address className="text-[0.95rem] leading-relaxed text-muted not-italic">
                  {site.endereco.rua}
                  <br />
                  {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.uf}
                  <br />
                  CEP {site.endereco.cep}
                </address>
              </div>

              <div className="border-l-[3px] border-jura pl-4.5">
                <h3 className="mb-1.5 font-ui text-[1.05rem] font-bold">Horário</h3>
                <ul className="grid gap-1.5 text-[0.95rem]">
                  {site.horario.map((h) => (
                    <li key={h.dia} className="flex max-w-80 justify-between gap-4 text-muted">
                      <span>{h.dia}</span>
                      <b className="font-semibold text-cream">{h.hora}</b>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 text-[0.85rem] text-soft">
                  Por ordem de chegada. Em dia cheio, quanto mais cedo melhor.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Btn href={site.mapsUrl} variant="red" external>
                  <PinIcon className="size-5" />
                  Traçar rota
                </Btn>
                <Btn href={cta.whatsFila} variant="quiet" external>
                  Ver como está a fila
                </Btn>
              </div>
            </Reveal>

            <Reveal delay={0.1} className="grid content-start gap-6">
              <OndeEstamosCarrossel />

              {/* Contato direto: número que se lê e se disca, sem esconder atrás
                  de só um botão de WhatsApp. Quatro contatos, bem encaixados em 2x2. */}
              <div className="grid gap-3 rounded-md border border-line bg-surface px-5 py-5 sm:grid-cols-2">
                <a
                  href={cta.whatsPrincipal}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-jura-title"
                >
                  <WhatsAppIcon className="size-5 shrink-0 text-whats" />
                  <span>
                    <span className="block text-[0.72rem] tracking-[0.08em] text-soft uppercase">
                      WhatsApp
                    </span>
                    <b className="font-ui text-[0.975rem] font-bold">{site.whatsappExibicao}</b>
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <PinIcon className="size-5 shrink-0 text-jura-title" />
                  <span>
                    <span className="block text-[0.72rem] tracking-[0.08em] text-soft uppercase">
                      Telefone fixo
                    </span>
                    <b className="font-ui text-[0.975rem] font-bold">{site.telefoneFixo}</b>
                  </span>
                </div>
                <a
                  href={site.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-jura-title"
                >
                  <InstagramIcon className="size-5 shrink-0" />
                  <span>
                    <span className="block text-[0.72rem] tracking-[0.08em] text-soft uppercase">
                      Instagram
                    </span>
                    <b className="font-ui text-[0.975rem] font-bold">@{site.instagram}</b>
                  </span>
                </a>
                <a
                  href={site.avaliarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-jura-title"
                >
                  <StarIcon className="size-5 shrink-0 text-offer" />
                  <span>
                    <span className="block text-[0.72rem] tracking-[0.08em] text-soft uppercase">
                      Google
                    </span>
                    <b className="font-ui text-[0.975rem] font-bold">Ver perfil</b>
                  </span>
                </a>
              </div>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          9. DÚVIDAS
          ============================================================ */}
      <section id="duvidas" className="scroll-mt-20 py-14 lg:py-20">
        <Wrap>
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              Perguntas que a gente <span className="text-jura-title">ouve todo dia</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq />
          </Reveal>
        </Wrap>
      </section>

      {/* ============================================================
          10. CTA FINAL
          ============================================================ */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#1a0d11_0%,var(--color-ink)_55%)] py-14 lg:py-20">
        <Wrap className="relative">
          <Reveal className="max-w-2xl">
            <SpeedBars className="mb-6" />
            <h2 className="text-[clamp(2.25rem,6vw,3.5rem)]">
              Seu carro pediu cuidado?
              <br />
              <span className="text-jura-title">Vem pro Jura.</span>
            </h2>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <BtnWhats href={cta.whatsPrincipal} className="max-sm:w-full">
                Chamar no WhatsApp
              </BtnWhats>
              <Btn href={site.mapsUrl} variant="ghost" className="max-sm:w-full" external>
                Traçar rota
              </Btn>
            </div>
            <p className="mt-6 text-[0.875rem] text-soft">
              Ou passa na{" "}
              <Link href="#onde-estamos" className="text-muted underline underline-offset-4 transition-colors hover:text-jura-title">
                Avenida Loreto, 889
              </Link>
              , de segunda a sábado.
            </p>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
