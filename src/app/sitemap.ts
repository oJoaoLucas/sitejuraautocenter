import type { MetadataRoute } from "next";

// Export estático (Cloudflare Pages) exige rota estática explícita aqui.
export const dynamic = "force-static";

const base = "https://juraautocenter.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base, priority: 1 },
    { url: `${base}/historia`, priority: 0.7 },
    { url: `${base}/privacidade`, priority: 0.3 },
  ];
}
