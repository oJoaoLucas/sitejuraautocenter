import Image from "next/image";
import type { Metadata } from "next";
import { Timeline } from "@/components/timeline";
import { Reveal } from "@/components/reveal";
import { Btn, BtnWhats, SpeedBars, Wrap } from "@/components/ui";
import { cta, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nossa história",
  description:
    "Da loja pequena no 829 da Avenida Loreto, em 2019, ao auto center no 889 hoje: a trajetória do Jura Auto Center em Araras, contada em datas reais.",
  alternates: { canonical: "/historia" },
};

export default function Historia() {
  return (
    <>
      {/* Hero da página: a loja antiga, que é literalmente de onde a história vem */}
      <section className="relative flex min-h-[72vh] items-end overflow-hidden pt-[76px]">
        <div className="absolute inset-0">
          <Image
            src="/img/loja-antiga.jpg"
            alt="A primeira sede do Jura Auto Center em Araras"
            fill
            priority
            sizes="100vw"
            quality={78}
            className="object-cover object-[50%_55%]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(178deg,rgb(20_20_20/0.85)_0%,rgb(20_20_20/0.55)_38%,rgb(20_20_20/0.97)_94%)]"
          />
        </div>

        <Wrap className="relative pb-12 lg:pb-18">
          <div className="max-w-3xl">
            <SpeedBars className="mb-6" />
            <h1 className="mb-4 text-[clamp(2.5rem,7vw,4.25rem)] [text-shadow:0_2px_24px_rgb(0_0_0/0.6)]">
              <span className="block">Duas lojas,</span>
              <span className="block text-jura-title">uma história só.</span>
            </h1>
          </div>
        </Wrap>
      </section>

      {/* Narrativa */}
      <section className="py-12 lg:py-16">
        <Wrap>
          <Reveal className="mb-12 max-w-2xl border-l-[3px] border-jura py-1.5 pl-6 lg:mb-16">
            <p className="font-display text-[clamp(1.5rem,3.4vw,2.1rem)] leading-tight tracking-[0.01em] uppercase">
              Cuidou do carro, cuidou de quem você leva nele.
            </p>
          </Reveal>

          <Timeline />
        </Wrap>
      </section>

      {/* Galeria da loja de hoje */}
      <section className="border-y border-line bg-ink-deep py-12 lg:py-16">
        <Wrap>
          <Reveal className="mb-8 max-w-2xl">
            <h2 className="text-[clamp(1.75rem,4.5vw,2.5rem)]">A oficina hoje</h2>
            <p className="mt-3.5 leading-relaxed text-muted">
              Quatro elevadores, alinhamento digital e o paredão de pneus que virou cenário
              de quase toda foto do Instagram.
            </p>
          </Reveal>

          <div className="grid grid-cols-2 gap-3.5 lg:grid-cols-3">
            {[
              { src: "/img/box-elevadores.jpg", alt: "Box com elevadores do Jura Auto Center" },
              { src: "/img/prateleira.jpg", alt: "Prateleira com o estoque de pneus" },
              { src: "/img/box-pneus.jpg", alt: "Vista interna do auto center com elevadores e pneus" },
              { src: "/img/galpao-alto.jpg", alt: "Vista ampla do Jura Auto Center" },
              { src: "/img/galpao-wide.jpg", alt: "Área de serviço do Jura Auto Center" },
              { src: "/img/fachada.jpg", alt: "Fachada do Jura Auto Center na Avenida Loreto, 889" },
            ].map((img, i) => (
              <Reveal key={img.src} delay={i * 0.05}>
                <figure className="group overflow-hidden rounded-md border border-line">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={900}
                    height={900}
                    sizes="(max-width: 1024px) 50vw, 33vw"
                    className="aspect-square w-full object-cover transition-transform duration-600 ease-jura group-hover:scale-105"
                  />
                </figure>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* ============================================================
          QUEM É O JURA
          A pessoa antes da placa. O brand book manda mostrar gente de
          verdade, e é o que dá alma ao resto da página.
          ============================================================ */}
      <section className="py-12 lg:py-16">
        <Wrap>
          <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <Reveal>
              <figure className="relative overflow-hidden rounded-md border border-line">
                <Image
                  src="/img/jura.jpg"
                  alt="Jura, mecânico e dono do Jura Auto Center"
                  width={1200}
                  height={1500}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="aspect-4/5 w-full object-cover"
                />
              </figure>
            </Reveal>

            <Reveal delay={0.12}>
              <span className="mb-3.5 block font-ui text-[0.7rem] font-bold tracking-[0.22em] text-jura-title uppercase">
                Quem é o Jura
              </span>
              <h2 className="mb-5 text-[clamp(2rem,5vw,2.75rem)]">
                Antes da placa na fachada,
                <br />
                <span className="text-jura-title">tem uma pessoa</span>
              </h2>
              <p className="leading-relaxed text-muted">
                Nascido em Minas Gerais, em <strong>15 de junho de 1977</strong>, Jura é mecânico
                por profissão e por vocação. Antes de colocar o nome dele num auto center, passou
                mais de vinte anos trabalhando com mecânica: embaixo do carro dos outros, ouvindo
                cliente e aprendendo a identificar problema que começa só com um barulho diferente.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Em <strong>15 de junho de 2019</strong>, exatamente no dia em que completou 42
                anos, abriu o Jura Auto Center. A data não foi sorteada: se era pra começar uma
                história nova, que começasse no dia dele.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                Jura é mineiro, pai, marido e mecânico. Mesmo com o crescimento da equipe e a
                mudança pra uma loja maior, ele nunca saiu da oficina. Quem chega ainda encontra o
                próprio Jura de boné, no meio dos elevadores, ouvindo o carro, conversando com o
                cliente e acompanhando o diagnóstico de perto.
              </p>
              <p className="mt-4 leading-relaxed text-muted">
                O nome na fachada não representa só o dono. Representa mais de duas décadas de
                experiência, trabalho sério e compromisso com quem confia o carro à equipe. Antes
                da placa, existe uma pessoa. E por trás do Jura Auto Center, existe o Jura.
              </p>
            </Reveal>
          </div>
        </Wrap>
      </section>

      {/* Números da trajetória */}
      <section className="border-y border-line bg-ink-deep py-12 lg:py-16">
        <Wrap>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {[
              { valor: `${site.prova.carros}+`, label: "carros atendidos" },
              { valor: "2019", label: "chegada em Araras" },
              { valor: "2", label: "estruturas nessa história" },
              { valor: `${site.prova.nota}`, label: "de nota no Google" },
            ].map((n, i) => (
              <Reveal key={n.label} delay={i * 0.05}>
                <span className="block font-display text-[clamp(2.25rem,5vw,3.25rem)] text-jura-title">
                  {n.valor}
                </span>
                <span className="mt-1 block text-[0.9rem] text-muted">{n.label}</span>
              </Reveal>
            ))}
          </div>
        </Wrap>
      </section>

      {/* CTA final */}
      <section className="relative overflow-hidden bg-[linear-gradient(120deg,#1a0d11_0%,var(--color-ink)_55%)] py-14 lg:py-18">
        <Wrap>
          <Reveal className="max-w-2xl">
            <h2 className="text-[clamp(2rem,5.5vw,3rem)]">
              Faça parte da nossa história.
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Todo carro que entra aqui vira um pedaço dessa história. O seu pode ser o próximo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3.5">
              <BtnWhats href={cta.whatsPrincipal} className="max-sm:w-full">
                Fale pelo WhatsApp
              </BtnWhats>
              <Btn href="/#servicos" variant="ghost" className="max-sm:w-full">
                Conheça nossos serviços
              </Btn>
            </div>
            <p className="mt-6 text-[0.875rem] text-soft">
              {site.endereco.rua}, {site.endereco.bairro}, {site.endereco.cidade}/{site.endereco.uf}
            </p>
          </Reveal>
        </Wrap>
      </section>
    </>
  );
}
