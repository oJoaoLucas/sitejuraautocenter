import type { MetadataRoute } from "next";

// Export estático (Cloudflare Pages) exige rota estática explícita aqui.
export const dynamic = "force-static";

const base = "https://juraautocenter.com.br";

/** Data do build: avisa o Google e o Bing que vale a pena passar de novo. */
const agora = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1, lastModified: agora },
    { url: `${base}/pneus`, priority: 0.9, lastModified: agora },
    { url: `${base}/freios`, priority: 0.8, lastModified: agora },
    { url: `${base}/suspensao`, priority: 0.8, lastModified: agora },
    { url: `${base}/alinhamento-e-balanceamento`, priority: 0.9, lastModified: agora },
    { url: `${base}/troca-de-oleo`, priority: 0.7, lastModified: agora },
    { url: `${base}/revisao`, priority: 0.8, lastModified: agora },
    { url: `${base}/historia`, priority: 0.7, lastModified: agora },
    { url: `${base}/privacidade`, priority: 0.3, lastModified: agora },
  ];
}
