/**
 * Peças de dezembro (28/11/2026): selo da primeira tela, checklist antes de viajar e a árvore de Natal
 * feita de pneus empilhados. Aparecem só nas datas de viagem (ver lib/epoca.ts) pelo `SoNaViagem`.
 */
import { MENSAGEM_REVISAO } from "@/lib/epoca";
import { whats } from "@/lib/site";
import { FlocoIcon } from "./icons";
import { Reveal } from "./reveal";
import { BtnWhats, Wrap } from "./ui";

export const whatsRevisaoFimDeAno = whats(MENSAGEM_REVISAO);

/** Fio de luzinhas de Natal (pisca-pisca) logo abaixo da faixa do topo. Só enfeite: não recebe clique. */
export function PiscaPisca() {
  const cores = ["#e5304c", "#ffc400", "#2eaa5a", "#4696ff"];
  return (
    <div aria-hidden="true" className="pisca-pisca pointer-events-none fixed inset-x-0 top-(--faixa) z-61 h-[22px] overflow-hidden">
      <svg width="100%" height="22">
        <defs>
          <pattern id="fio-luzes" width="160" height="22" patternUnits="userSpaceOnUse">
            <path d="M0 3 Q20 11 40 3 T80 3 T120 3 T160 3" fill="none" stroke="#2c3a2c" strokeWidth="1.5" />
            {[20, 60, 100, 140].map((x, i) => (
              <g key={x} className={`luz luz-${i}`}>
                <rect x={x - 2.5} y="6" width="5" height="4" rx="1" fill="#555" />
                <ellipse cx={x} cy="14" rx="4" ry="5.5" fill={cores[i]} />
                <ellipse cx={x - 1.3} cy="12" rx="1" ry="1.8" fill="#fff" opacity="0.7" />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height="22" fill="url(#fio-luzes)" />
      </svg>
    </div>
  );
}

/** Selo pequeno acima do título da primeira tela. */
export function SeloViagem() {
  return (
    <span className="mb-5 flex w-fit items-center gap-2 rounded-full bg-jura px-3.5 py-1.5 font-ui text-[0.75rem] font-extrabold tracking-[0.08em] text-white uppercase">
      <FlocoIcon className="size-4" />
      Revisão de fim de ano
    </span>
  );
}

const itens = [
  { titulo: "Pneus e estepe", texto: "Calibragem, desgaste e data de fabricação." },
  { titulo: "Freio", texto: "Pastilha, disco e fluido de freio." },
  { titulo: "Alinhamento", texto: "Volante reto e pneu gastando por igual." },
  { titulo: "Suspensão", texto: "Amortecedor, bieleta e bucha." },
];

/** Árvore de Natal de pneus empilhados, com bolinhas e estrela. Só ilustração (aria-hidden). */
export function ArvoreDePneus({ className = "" }: { className?: string }) {
  // Camadas de baixo pra cima: [quantos pneus, y].
  const camadas: [number, number][] = [[4, 300], [3, 240], [2, 180], [1, 120]];
  const larguraPneu = 74;
  const bolas = ["#c8102e", "#ffc400", "#f5f5f5"];
  let n = 0;
  return (
    <svg viewBox="0 0 320 380" aria-hidden="true" className={className}>
      <defs>
        <radialGradient id="brilho" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffc400" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#ffc400" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="78" r="70" fill="url(#brilho)" />
      {camadas.map(([qtd, y]) => {
        const inicio = 160 - (qtd * larguraPneu) / 2 + larguraPneu / 2;
        return Array.from({ length: qtd }, (_, i) => {
          const cx = inicio + i * larguraPneu;
          const cor = bolas[n++ % bolas.length];
          return (
            <g key={`${y}-${i}`}>
              {/* Pneu deitado: banda de rodagem com sulcos e o aro. */}
              <ellipse cx={cx} cy={y} rx="35" ry="30" fill="#1b1b1b" stroke="#3a3a3a" strokeWidth="3" />
              <ellipse cx={cx} cy={y} rx="35" ry="30" fill="none" stroke="#2a2a2a" strokeWidth="9" strokeDasharray="5 6" />
              <ellipse cx={cx} cy={y} rx="16" ry="13" fill="#0f0f0f" stroke="#c9c9c9" strokeWidth="3" />
              {/* Enfeite: festão vermelho e uma bolinha. */}
              <path d={`M${cx - 33} ${y + 8} Q${cx} ${y + 24} ${cx + 33} ${y + 8}`} fill="none" stroke="#c8102e" strokeWidth="3" strokeLinecap="round" />
              <circle cx={cx + 18} cy={y + 18} r="6" fill={cor} />
            </g>
          );
        });
      })}
      {/* Estrela no topo. */}
      <path
        d="M160 52 l9 19 21 3 -15 14 4 21 -19 -10 -19 10 4 -21 -15 -14 21 -3z"
        fill="#ffc400"
        stroke="#8e6a00"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Base (estrado). */}
      <rect x="40" y="334" width="240" height="14" rx="4" fill="#c8102e" />
      <rect x="60" y="348" width="200" height="10" rx="3" fill="#8e1120" />
    </svg>
  );
}

/** Seção "Checklist antes de viajar", logo abaixo da primeira tela. */
export function ChecklistViagem() {
  return (
    <section id="revisao-fim-de-ano" className="relative scroll-mt-20 overflow-hidden border-y-4 border-jura bg-ink-deep py-10 lg:py-20">
      {/* Celular: a árvore fica atrás do texto, apagadinha, pra seção não ficar comprida (dono, 28/11). */}
      <ArvoreDePneus className="pointer-events-none absolute -right-6 top-8 h-auto w-[190px] opacity-[0.22] lg:hidden" />
      <Wrap className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14">
          <Reveal>
            <p className="mb-1.5 font-ui text-[0.75rem] font-extrabold tracking-[0.12em] text-jura-text uppercase">
              Dezembro no Jura
            </p>
            <h2 className="text-[clamp(2rem,6vw,3.4rem)]">
              Checklist <span className="text-jura-title">antes de viajar</span>
            </h2>
            <p className="mt-3 max-w-xl text-[0.95rem] leading-relaxed text-muted lg:mt-4 lg:text-base">
              <span className="lg:hidden">Pneu careca na estrada dá multa e 5 pontos. A gente confere e te fala na hora.</span>
              <span className="hidden lg:inline">
                Pneu careca na estrada dá multa de R$ 195,23 e 5 pontos na carteira (Detran-SP), e o carro freia
                pior na chuva. A gente confere tudo e te fala na hora o que precisa.
              </span>
            </p>
            <ul className="mt-5 grid grid-cols-2 gap-2 lg:mt-7 lg:gap-3">
              {itens.map((i) => (
                <li key={i.titulo} className="rounded-md border border-line border-l-4 border-l-jura bg-surface/90 px-3 py-2.5 lg:px-4 lg:py-3.5">
                  <b className="block font-ui text-[0.875rem] leading-snug font-extrabold text-cream lg:text-base">✔ {i.titulo}</b>
                  <span className="hidden text-[0.9rem] text-muted lg:block">{i.texto}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 lg:mt-7 lg:gap-y-3">
              <BtnWhats href={whatsRevisaoFimDeAno} className="max-sm:w-full" local="checklist-viagem">
                Pedir revisão
              </BtnWhats>
              <span className="text-[0.875rem] text-soft">Atendimento por ordem de chegada · Av. Loreto, 889</span>
            </div>
          </Reveal>
          <Reveal delay={0.12} className="mx-auto hidden w-full max-w-[340px] lg:block">
            <ArvoreDePneus className="h-auto w-full" />
            <p className="mt-3 text-center font-display text-[1.6rem] tracking-[0.03em] text-cream uppercase">
              Boas festas <span className="text-jura-title">do Jura</span>
            </p>
          </Reveal>
        </div>
      </Wrap>
    </section>
  );
}
