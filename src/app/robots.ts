import type { MetadataRoute } from "next";

// Export estático (Cloudflare Pages) exige rota estática explícita aqui.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://juraautocenter.com.br/sitemap.xml",
  };
}
