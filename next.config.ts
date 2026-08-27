import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// A pasta do projeto fica fora de um repo git e o lockfile do usuário está
// acima dela; sem fixar a raiz, o Turbopack sobe demais e escolhe a errada.
const raiz = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: raiz },

  // Cloudflare Pages serve arquivo estático, não o servidor do Next: sem
  // isso o `next/image` esperaria um otimizador em runtime que não existe
  // lá. As imagens já saem pré-otimizadas (ver public/img), então isso só
  // desliga um recurso que o host não teria como oferecer mesmo.
  output: "export",
  images: { unoptimized: true },

  poweredByHeader: false,
};

export default nextConfig;
