"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { mensagemPneus, site, whats } from "@/lib/site";
import { previaLocal, rastrear } from "@/lib/rastreio";
import { normalizarMedidaPneu, quantidadePneusValida } from "@/lib/medida-pneu";
import { Stars, WhatsAppIcon } from "./icons";

function semInscricao() { return () => {}; }
function clienteAtivo() { return true; }
function servidorInativo() { return false; }

/**
 * Form que monta a mensagem pronta do WhatsApp (brand book p.11).
 * Prepara o texto localmente; ao abrir o WhatsApp, o link leva a mensagem à plataforma.
 * Fica junto do botão o que decide a conversa: parcelamento e prova social.
 */
export function QuoteForm({
  botao = "Continuar no WhatsApp",
  local,
  className = "mt-8",
  enxuto = false,
}: {
  /** Texto do botão de envio. */
  botao?: string;
  /** Onde o formulário está, pro relatório de conversões ("home", "pneus"). */
  local: string;
  className?: string;
  /** Só o parcelamento junto do botão: sem nota, carros atendidos nem aviso do WhatsApp. */
  enxuto?: boolean;
}) {
  const interativo = useSyncExternalStore(semInscricao, clienteAtivo, servidorInativo);
  const id = useId();
  const [medida, setMedida] = useState("");
  const [qtd, setQtd] = useState("4");
  const [semMedida, setSemMedida] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [erroQtd, setErroQtd] = useState<string | null>(null);
  const [pedido, setPedido] = useState<string | null>(null);
  const campoMedida = useRef<HTMLInputElement>(null);
  const campoQtd = useRef<HTMLSelectElement>(null);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const limpa = semMedida ? "" : normalizarMedidaPneu(medida);
    setPedido(null);

    if (!semMedida) {
      if (!medida.trim()) {
        setErro("Escreve a medida que está escrita na lateral do pneu, ou marca “não sei a medida”.");
        campoMedida.current?.focus();
        return;
      }
      if (!limpa) {
        setErro("Confira a medida completa, por exemplo 185/65 R15. Se não encontrar, marque “não sei a medida” e envie uma foto.");
        campoMedida.current?.focus();
        return;
      }
    }

    if (!quantidadePneusValida(qtd)) {
      setErroQtd("Escolha uma quantidade entre 1 e 4 pneus.");
      campoQtd.current?.focus();
      return;
    }

    setErro(null);
    setErroQtd(null);
    if (!semMedida && limpa) setMedida(limpa);
    const href = whats(mensagemPneus({ quantidade: Number(qtd), medida: limpa ?? "" }));
    setPedido(href);
    // Mede a intenção de iniciar contato. Não confirma envio ou atendimento.
    rastrear("orcamento_pneus", { local, sem_medida: semMedida });
    if (!previaLocal()) window.open(href, "_blank", "noopener,noreferrer");
  }

  const campo =
    "h-[52px] w-full rounded-sm border border-[#444] bg-surface-2 px-4 text-cream " +
    "transition-colors duration-200 placeholder:text-[#9a9a9a] " +
    "focus:border-jura-title focus:bg-[#383838] focus:outline-none " +
    "disabled:cursor-not-allowed disabled:opacity-45";
  const rotulo =
    "font-ui text-[0.78rem] font-semibold uppercase tracking-[0.09em] text-muted";

  return (
    <form onSubmit={enviar} noValidate className={`grid max-w-md gap-4.5 ${className}`}>
      <div className="js-only grid gap-2">
        <label htmlFor={`${id}-medida`} className={rotulo}>
          Medida do pneu
        </label>
        <input
          ref={campoMedida}
          id={`${id}-medida`}
          name="medida"
          value={medida}
          disabled={semMedida || !interativo}
          onChange={(e) => {
            setMedida(e.target.value);
            if (erro) setErro(null);
            setPedido(null);
          }}
          placeholder="185/65 R15"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          maxLength={40}
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : `${id}-dica`}
          className={`${campo} ${erro ? "border-jura-title" : ""}`}
        />
        {erro ? (
          <p id={`${id}-erro`} role="alert" className="text-[0.78rem] font-semibold text-jura-text">
            {erro}
          </p>
        ) : (
          <p id={`${id}-dica`} className="text-[0.78rem] text-soft">
            {semMedida
              ? "Sem problema. Depois de abrir o WhatsApp, é só mandar uma foto do pneu."
              : "Procure na lateral do pneu: 185 é a largura, 65 é o perfil e R15 indica o aro."}
          </p>
        )}

        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.875rem] text-muted">
          <input
            type="checkbox"
            checked={semMedida}
            disabled={!interativo}
            onChange={(e) => {
              setSemMedida(e.target.checked);
              setErro(null);
              setPedido(null);
            }}
            className="size-5 shrink-0 cursor-pointer accent-[#c8102e]"
          />
          Não sei a medida — vou enviar uma foto
        </label>
      </div>

      <div className="js-only grid gap-2">
        <label htmlFor={`${id}-qtd`} className={rotulo}>
          Quantos pneus
        </label>
        <select
          ref={campoQtd}
          id={`${id}-qtd`}
          name="qtd"
          disabled={!interativo}
          value={qtd}
          onChange={(e) => {
            setQtd(e.target.value);
            setErroQtd(null);
            setPedido(null);
          }}
          aria-invalid={erroQtd ? true : undefined}
          aria-describedby={erroQtd ? `${id}-erro-qtd` : undefined}
          className={campo}
        >
          <option value="1">1 pneu</option>
          <option value="2">2 pneus</option>
          <option value="3">3 pneus</option>
          <option value="4">4 pneus</option>
        </select>
        {erroQtd && <p id={`${id}-erro-qtd`} role="alert" className="text-[0.78rem] font-semibold text-jura-text">{erroQtd}</p>}
      </div>

      <button
        type="submit"
        disabled={!interativo}
        className="js-only mt-1 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm bg-whats px-6 py-2 text-center font-ui text-[0.9375rem] leading-tight font-bold uppercase tracking-[0.05em] text-whats-ink transition-[transform,background-color] duration-200 ease-jura hover:-translate-y-0.5 hover:bg-[#2ee878] active:translate-y-0 active:scale-[0.985] disabled:cursor-wait disabled:opacity-60"
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        {botao}
      </button>

      <noscript><p className="text-sm text-muted">Para pedir orçamento sem este formulário, <a href={whats("Olá! Quero um orçamento de pneus e vou informar a medida pelo WhatsApp.")} target="_blank" rel="noopener noreferrer" className="text-cream underline underline-offset-4">chame a equipe no WhatsApp</a>.</p></noscript>

      {pedido && (
        <div role="status" className="rounded-sm border border-line bg-ink/50 p-4 text-[0.8125rem] leading-relaxed text-muted">
          <p>Pedido preparado. No WhatsApp, confira a mensagem e toque em Enviar para falar com a equipe.</p>
          <a
            href={pedido}
            target="_blank"
            rel="noopener noreferrer"
            data-evento="orcamento_pneus"
            data-local={local}
            className="mt-2 inline-flex min-h-11 items-center font-semibold text-jura-text underline underline-offset-4"
          >
            Abrir o WhatsApp com este pedido
          </a>
        </div>
      )}

      {/* Colado no botão: é aqui que a pessoa decide se chama. */}
      <div className="grid gap-2.5 border-t border-line pt-4 text-[0.8125rem] text-muted">
        <p>
          Pagamento em até <b className="font-ui font-extrabold text-cream">10x no cartão</b>
        </p>
        {!enxuto && (
          <>
            <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <Stars className="size-[15px]" />
              <span>
                <b className="font-ui font-extrabold text-cream">Nota {site.prova.nota}</b> no
                Google · mais de {site.prova.avaliacoes} avaliações
              </span>
            </p>
            <p>
              Mais de <b className="font-ui font-extrabold text-cream">10 mil carros</b> atendidos
            </p>
          </>
        )}
      </div>

      <p className="text-[0.8125rem] text-soft">
        O botão prepara a mensagem. O pedido só chega à equipe depois que você envia no WhatsApp.
      </p>
    </form>
  );
}
