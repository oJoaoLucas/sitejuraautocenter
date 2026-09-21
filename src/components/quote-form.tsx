"use client";

import { useId, useState } from "react";
import { mensagemPneus, site, whats } from "@/lib/site";
import { rastrear } from "@/lib/rastreio";
import { Stars, WhatsAppIcon } from "./icons";

/**
 * Form que monta a mensagem pronta do WhatsApp (brand book p.11).
 * Não envia nada pra lugar nenhum: só abre a conversa com o texto escrito.
 * Fica junto do botão o que decide a conversa: parcelamento e prova social.
 */
export function QuoteForm({
  botao = "Ver preços no WhatsApp",
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
  const id = useId();
  const [medida, setMedida] = useState("");
  const [qtd, setQtd] = useState("4");
  const [semMedida, setSemMedida] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const limpa = semMedida ? "" : medida.trim();

    if (!semMedida) {
      if (!limpa) {
        setErro("Escreve a medida que está escrita na lateral do pneu, ou marca “não sei a medida”.");
        return;
      }
      if (limpa.length < 6) {
        setErro("Faltou parte da medida. Ela tem 3 números, tipo 185/65 R15.");
        return;
      }
    }

    setErro(null);
    rastrear("orcamento_pneus", { local, sem_medida: semMedida });
    window.open(
      whats(mensagemPneus({ quantidade: Number(qtd), medida: limpa })),
      "_blank",
      "noopener,noreferrer",
    );
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
      <div className="grid gap-2">
        <label htmlFor={`${id}-medida`} className={rotulo}>
          Medida do pneu
        </label>
        <input
          id={`${id}-medida`}
          name="medida"
          value={medida}
          disabled={semMedida}
          onChange={(e) => {
            setMedida(e.target.value);
            if (erro) setErro(null);
          }}
          placeholder="185/65 R15"
          autoComplete="off"
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? `${id}-erro` : `${id}-dica`}
          className={`${campo} ${erro ? "border-jura-title" : ""}`}
        />
        {erro ? (
          <p id={`${id}-erro`} role="alert" className="text-[0.78rem] font-semibold text-jura-title">
            {erro}
          </p>
        ) : (
          <p id={`${id}-dica`} className="text-[0.78rem] text-soft">
            {semMedida
              ? "Sem problema. Depois de abrir o WhatsApp, é só mandar uma foto do pneu."
              : "Está escrita na lateral do pneu, em relevo."}
          </p>
        )}

        <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[0.875rem] text-muted">
          <input
            type="checkbox"
            checked={semMedida}
            onChange={(e) => {
              setSemMedida(e.target.checked);
              setErro(null);
            }}
            className="size-5 shrink-0 cursor-pointer accent-[#c8102e]"
          />
          Não sei a medida — vou enviar uma foto
        </label>
      </div>

      <div className="grid gap-2">
        <label htmlFor={`${id}-qtd`} className={rotulo}>
          Quantos pneus
        </label>
        <select
          id={`${id}-qtd`}
          name="qtd"
          value={qtd}
          onChange={(e) => setQtd(e.target.value)}
          className={campo}
        >
          <option value="1">1 pneu</option>
          <option value="2">2 pneus</option>
          <option value="3">3 pneus</option>
          <option value="4">4 pneus</option>
        </select>
      </div>

      <button
        type="submit"
        className="mt-1 inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-sm bg-whats px-6 py-2 text-center font-ui text-[0.9375rem] leading-tight font-bold uppercase tracking-[0.05em] text-whats-ink transition-[transform,background-color] duration-200 ease-jura hover:-translate-y-0.5 hover:bg-[#2ee878] active:translate-y-0 active:scale-[0.985]"
      >
        <WhatsAppIcon className="size-5 shrink-0" />
        {botao}
      </button>

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

      {!enxuto && (
        <p className="text-[0.8125rem] text-soft">
          Abre o WhatsApp com a mensagem já escrita. Você só aperta enviar.
        </p>
      )}
    </form>
  );
}
