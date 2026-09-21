"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
  const faixa = useRef<HTMLDivElement>(null);
  const visivel = !(aceitouAntes || aceitouAgora);

  /* Publica a altura do aviso em --cookie-h: o botão flutuante do WhatsApp
     (que agora é uma pílula larga, não um círculo no canto) sobe por cima
     dele em vez de ficar escondido atrás. */
  useEffect(() => {
    const el = faixa.current;
    if (!visivel || !el) return;
    const raiz = document.documentElement;
    const publicar = () => raiz.style.setProperty("--cookie-h", `${el.offsetHeight}px`);
    publicar();
    const ro = new ResizeObserver(publicar);
    ro.observe(el);
    return () => {
      ro.disconnect();
      raiz.style.removeProperty("--cookie-h");
    };
  }, [visivel]);

  if (!visivel) return null;

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
      ref={faixa}
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-60 border-t border-line bg-ink-deep/95 px-5 py-4 backdrop-blur-sm sm:px-8"
    >
      {/* z-60, abaixo do botão flutuante do WhatsApp (z-70), que sobe pela
          altura do aviso via --cookie-h. */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-[0.8125rem] leading-relaxed text-muted">
          Este site usa um mapa incorporado do Google e a medição de anúncios do Google Ads, que
          podem gravar cookies próprios do Google. Detalhes na{" "}
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
