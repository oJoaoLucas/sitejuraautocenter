import path from "node:path";
import { fileURLToPath } from "node:url";
import type { NextConfig } from "next";

// A pasta do projeto fica fora de um repo git e o lockfile do usuário está
// acima dela; sem fixar a raiz, o Turbopack sobe demais e escolhe a errada.
const raiz = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: { root: raiz },

  images: {
    // AVIF primeiro, WebP como queda: resolve o que o sips local não fazia.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
