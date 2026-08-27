"use client";

import { useState, useSyncExternalStore } from "react";
import Link from "next/link";

const CHAVE = "jura-cookies-ok";

function semInscricao() {
  return () => {};
}

/** Lido só no client (useSyncExternalStore evita mismatch de hidratação:
 *  no servidor sempre "aceito", no client lê o valor real do localStorage). */
function jaAceitou() {
  try {
    return localStorage.getItem(CHAVE) === "1";
  } catch {
    // Sem acesso ao storage: melhor não mostrar aviso que não persiste.
    return true;
  }
}

function jaAceitouNoServidor() {
  return true;
}

/**
 * Aviso de cookies (LGPD): o site carrega um mapa embutido do Google
 * já na primeira visita, que pode gravar cookie próprio do Google.
 * Isso não é rastreamento nem publicidade — é só o mapa funcionando —
 * mas o aviso garante transparência sobre o que roda na página.
 * Não bloqueia nada: só informa e some depois que a pessoa confirma.
 */
export function CookieBanner() {
  const aceitouAntes = useSyncExternalStore(semInscricao, jaAceitou, jaAceitouNoServidor);
  const [aceitouAgora, setAceitouAgora] = useState(false);

  if (aceitouAntes || aceitouAgora) return null;

  function aceitar() {
    setAceitouAgora(true);
    try {
      localStorage.setItem(CHAVE, "1");
    } catch {
      // sem persistência, o aviso só volta a aparecer na próxima visita
    }
  }

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-ink-deep/95 py-4 pr-24 pl-5 backdrop-blur-sm sm:pr-28 sm:pl-8"
    >
      {/* z-60 (abaixo do botão flutuante do WhatsApp) e padding à direita
          reservando o canto onde ele fica: o aviso nunca cobre o CTA
          principal do site nem some atrás dele. */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-muted">
          Este site usa um mapa incorporado do Google pra mostrar onde fica a loja, que pode
          gravar cookie próprio do Google. Detalhes na{" "}
          <Link href="/privacidade" className="text-jura-title underline underline-offset-4">
            Política de Privacidade
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={aceitar}
          className="h-10 shrink-0 rounded-sm bg-jura px-5 font-ui text-[0.8125rem] font-bold uppercase tracking-[0.05em] text-white transition-colors duration-200 hover:bg-jura-strong"
        >
          Entendi
        </button>
      </div>
    </div>
  );
}
