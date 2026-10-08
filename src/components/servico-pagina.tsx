import Image from "next/image";
import { Faq } from "@/components/faq";
import { FaqSchema } from "@/components/faq-schema";
import { Foto } from "@/components/foto";
import { PhoneIcon, PinIcon, Stars } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { Btn, BtnWhats, SpeedBars, Wrap } from "@/components/ui";
import { avaliacoesGoogle, celularLink, cta, site } from "@/lib/site";
import { passosServico, type PaginaServico } from "@/lib/servicos-paginas";

/**
 * Molde das páginas de serviço (freios, suspensão). Mesma ordem da /pneus,
 * trocando o formulário pelos sinais que a pessoa reconhece no carro:
 * 1. primeira tela (título, WhatsApp, Ligar agora, nota) 2. o que fazemos
 * 3. como funciona 4. avaliações 5. dúvidas 6. chamada final + endereço.
 */
export function ServicoPagina({ d }: { d: PaginaServico }) {
  const depoimentos = d.depoimentos
    .map((nome) => avaliacoesGoogle.find((a) => a.nome === nome))
    .filter((a) => a !== undefined);

  return (
    <>
      <FaqSchema itens={d.faq} />

      {/* ============================================================
          1. PRIMEIRA TELA
          Quem veio do anúncio reconhece o problema (sinais) e já tem
          os dois caminhos de contato sem rolar.
          ============================================================ */}
      <section id="inicio" className="relative overflow-hidden pt-[92px] pb-12 sm:pt-[110px] lg:pb-20">
        <div className="absolute inset-0">
          <Foto src={d.fotoHero} alt="" fill priority sizes="100vw" className="object-cover object-[50%_60%]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgb(20_20_20/0.82)_0%,rgb(20_20_20/0.66)_45%,rgb(20_20_20/0.96)_100%),linear-gradient(92deg,rgb(20_20_20/0.9)_0%,rgb(20_20_20/0.35)_75%)]"
          />
        </div>

        <Wrap className="relative">
          <div className="grid items-start gap-7 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="lg:pt-6">
              <h1 className="text-[clamp(2.25rem,7vw,4.25rem)] [text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
                <span className="block">{d.h1[0]}</span>
                <span className="block text-jura-title">{d.h1[1]}</span>
                <span className="block">{d.h1[2]}</span>
              </h1>

              <p className="mt-4 max-w-lg text-[1.025rem] leading-relaxed text-[#e4e4e4] lg:mt-5 lg:text-[1.075rem]">
                {d.lead}
              </p>

              <div className="mt-7 flex flex-wrap gap-3.5">
                <BtnWhats href={d.whatsHref} className="max-sm:w-full" local="hero">
                  Pedir no WhatsApp
                </BtnWhats>
                <Btn href={celularLink} variant="red" className="max-sm:w-full" evento="ligar_agora_click" local="hero">
                  <PhoneIcon className="size-5 shrink-0" />
                  Ligar agora
                </Btn>
              </div>

              <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.875rem] text-muted">
                <span className="flex items-center gap-2">
                  <Stars className="size-4" />
                  <b className="font-ui font-bold text-cream">{site.prova.nota}</b> no Google
                </span>
                <span>
                  Pagamento em até <b className="font-ui font-bold text-cream">10x no cartão</b>
                </span>
              </p>
            </div>

            <div className="rounded-md border border-line bg-surface/95 p-5 shadow-[0_24px_60px_rgb(0_0_0/0.45)] backdrop-blur-sm sm:p-7">
              <h2 className="text-[1.75rem] leading-none sm:text-[2rem]">
                Reconhece algum <span className="text-jura-title">desses sinais?</span>
              </h2>
              <ul className="mt-5 grid gap-3">
                {d.sinais.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-[0.95rem] text-muted">
                    <i className="mt-2 block h-2 w-5 shrink-0 skew-jura rounded-[2px] bg-jura" aria-hidden="true" />
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-line pt-4 text-[0.875rem] leading-relaxed text-soft">
                {d.sinaisNota}
              </p>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          2. O QUE FAZEMOS
          ============================================================ */}
      <section id="servico" className="scroll-mt-20 py-14 lg:py-20">
        <Wrap>
          <Reveal className="mb-10 max-w-2xl lg:mb-12">
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              O que a gente <span className="text-jura-title">faz</span>
            </h2>
            <SpeedBars className="mt-6" />
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {d.faz.map((f, i) => (
              <Reveal key={f.titulo} delay={i * 0.05} className="rounded-md border border-line bg-surface px-5 pt-5 pb-6">
                <div className="mb-3.5 grid size-11 place-items-center rounded-md border border-line bg-[#171717]">
                  <Image src={f.icone} alt="" width={512} height={512} className="size-6" />
                </div>
                <h3 className="mb-1.5 font-ui text-[1.1rem] leading-tight font-bold">{f.titulo}</h3>
                <p className="text-[0.875rem] leading-relaxed text-soft">{f.texto}</p>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          3. COMO FUNCIONA + FOTO DA OFICINA
          ============================================================ */}
      <section id="como-funciona" className="scroll-mt-20 border-y border-line bg-ink-deep py-14 lg:py-20">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <Reveal>
              <figure className="overflow-hidden rounded-md border border-line">
                <Foto
                  src={d.fotoPasso}
                  alt={d.altPasso}
                  width={1000}
                  height={1000}
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="aspect-square w-full object-cover"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
                Do diagnóstico ao serviço, <span className="text-jura-title">sem surpresa</span>
              </h2>
              <ol className="mt-8 grid gap-6">
                {passosServico.map((p, i) => (
                  <li key={p.titulo} className="flex gap-4">
                    <span className="grid size-10 shrink-0 skew-jura place-items-center rounded-sm bg-jura">
                      <b className="unskew-jura font-ui text-[0.95rem] font-extrabold text-white">{i + 1}</b>
                    </span>
                    <div>
                      <h3 className="font-ui text-[1.05rem] font-bold">{p.titulo}</h3>
                      <p className="mt-1 text-[0.925rem] leading-relaxed text-muted">{p.texto}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <BtnWhats href={d.whatsHref} className="mt-9 max-sm:w-full" local="como-funciona">
                Pedir no WhatsApp
              </BtnWhats>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          4. AVALIAÇÕES
          Depoimentos reais do Google (os mesmos da home).
          ============================================================ */}
      <section id="avaliacoes" className="scroll-mt-20 py-14 lg:py-20">
        <Wrap>
          <Reveal className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <h2 className="text-[clamp(2rem,5vw,2.75rem)]">O que dizem no Google</h2>
              <p className="mt-4 leading-relaxed text-muted">
                Mais de trezentas pessoas de Araras e região já avaliaram o Jura. A nota é essa, e ela é pública.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-md border border-line bg-surface px-5 py-4">
              <span className="font-display text-5xl leading-[0.85] text-offer">{site.prova.nota}</span>
              <span className="text-[0.8125rem] text-soft">
                <Stars className="mb-1 size-4" />
                <br />
                mais de {site.prova.avaliacoes} avaliações
              </span>
            </div>
          </Reveal>

          <div className="grid gap-3.5 md:grid-cols-3">
            {depoimentos.map((a) => (
              <figure key={a.nome} className="flex flex-col gap-3.5 rounded-md border border-line bg-surface p-6">
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
          5. DÚVIDAS
          ============================================================ */}
      <section id="duvidas" className="scroll-mt-20 border-t border-line py-14 lg:py-20">
        <Wrap>
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2rem,5vw,2.75rem)]">
              {d.duvidasTitulo[0]} <span className="text-jura-title">{d.duvidasTitulo[1]}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <Faq itens={d.faq} />
          </Reveal>
        </Wrap>
      </section>

      {/* ============================================================
          6. CHAMADA FINAL + ONDE ESTAMOS
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
                {d.ctaFinal[0]}
                <br />
                <span className="text-jura-title">{d.ctaFinal[1]}</span>
              </h2>
              <div className="mt-8 flex flex-wrap gap-3.5">
                <BtnWhats href={d.whatsHref} className="max-sm:w-full" local="cta-final">
                  Falar no WhatsApp
                </BtnWhats>
                <Btn href={celularLink} variant="red" className="max-sm:w-full" evento="ligar_agora_click" local="cta-final">
                  <PhoneIcon className="size-5 shrink-0" />
                  Ligar agora
                </Btn>
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
                <Btn href={site.mapsUrl} variant="red" external evento="tracar_rota_click" local={d.rota.slice(1)}>
                  <PinIcon className="size-5" />
                  Traçar rota
                </Btn>
                <Btn href={cta.whatsFila} variant="quiet" external evento="fila_click" local={d.rota.slice(1)}>
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
