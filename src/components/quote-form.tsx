"use client";

import { useState } from "react";
import { whats } from "@/lib/site";
import { WhatsAppIcon } from "./icons";

/**
 * Form de 2 campos que monta a mensagem pronta do WhatsApp (brand book p.11).
 * Não envia nada pra lugar nenhum: só abre a conversa com o texto escrito.
 */
export function QuoteForm() {
  const [medida, setMedida] = useState("");
  const [qtd, setQtd] = useState("4");
  const [erro, setErro] = useState<string | null>(null);

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const limpa = medida.trim();

    if (!limpa) {
      setErro("Escreve a medida que está escrita na lateral do pneu.");
      return;
    }
    if (limpa.length < 6) {
      setErro("Faltou parte da medida. Ela tem 3 números, tipo 185/65 R15.");
      return;
    }

    setErro(null);
    const plural = qtd === "1" ? "1 pneu" : `${qtd} pneus`;
    window.open(
      whats(`Olá! Vim pelo site e queria orçamento de ${plural} na medida ${limpa}.`),
      "_blank",
      "noopener,noreferrer",
    );
  }

  const campo =
    "h-[52px] w-full rounded-sm border border-[#444] bg-surface-2 px-4 text-cream " +
    "transition-colors duration-200 placeholder:text-[#9a9a9a] " +
    "focus:border-jura-title focus:bg-[#383838] focus:outline-none";

  return (
    <form onSubmit={enviar} noValidate className="mt-8 grid max-w-md gap-4.5">
      <div className="grid gap-2">
        <label htmlFor="medida" className="font-ui text-[0.78rem] font-semibold uppercase tracking-[0.09em] text-muted">
          Medida do pneu
        </label>
        <input
          id="medida"
          name="medida"
          value={medida}
          onChange={(e) => {
            setMedida(e.target.value);
            if (erro) setErro(null);
          }}
          placeholder="185/65 R15"
          autoComplete="off"
          aria-invalid={erro ? true : undefined}
          aria-describedby={erro ? "medida-erro" : "medida-dica"}
          className={`${campo} ${erro ? "border-jura-title" : ""}`}
        />
        {erro ? (
          <p id="medida-erro" role="alert" className="text-[0.78rem] font-semibold text-jura-title">
            {erro}
          </p>
        ) : (
          <p id="medida-dica" className="text-[0.78rem] text-soft">
            Está escrita na lateral do pneu, em relevo. Se não achar, manda uma foto no WhatsApp.
          </p>
        )}
      </div>

      <div className="grid gap-2">
        <label htmlFor="qtd" className="font-ui text-[0.78rem] font-semibold uppercase tracking-[0.09em] text-muted">
          Quantos pneus
        </label>
        <select
          id="qtd"
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
        className="mt-1 inline-flex h-[52px] items-center justify-center gap-2.5 rounded-sm bg-whats px-6 font-ui text-[0.9375rem] font-bold uppercase tracking-[0.05em] text-whats-ink transition-[transform,background-color] duration-200 ease-jura hover:-translate-y-0.5 hover:bg-[#2ee878] active:translate-y-0 active:scale-[0.985]"
      >
        <WhatsAppIcon className="size-5" />
        Pedir o preço
      </button>

      <p className="text-[0.8125rem] text-soft">
        Abre o WhatsApp com a mensagem já escrita. Você só aperta enviar.
      </p>
    </form>
  );
}
