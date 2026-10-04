import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const raiz = new URL('../', import.meta.url);
const fotos = [
  'fachada-hero', 'fachada', 'pneus-estoque', 'pneus-prateleira',
  'oficina-elevadores', 'oficina-interior', 'estacionamento',
  'oficina-galpao-alto', 'oficina-galpao-amplo', 'loja-antiga-2019', 'jura-mecanico',
];
const fontes = [
  ...fotos.map(nome => ({ src: `/img/${nome}.webp`, prefixo: `/img/otimizadas/${nome}`, tamanhos: [400, 800, 1200, 1800] })),
  { src: '/logo/jura-branco.png', prefixo: '/logo/otimizadas/jura-branco', tamanhos: [160, 320, 480], logo: true },
];
const manifest = {};
const resumo = [];
const hash = buffer => createHash('sha256').update(buffer).digest('hex');

// Deriva arquivos novos; nunca sobrescreve os originais ou as variantes antigas.
for (const fonte of fontes) {
  const originalUrl = new URL(`public${fonte.src}`, raiz);
  const original = await readFile(originalUrl);
  const meta = await sharp(original).metadata();
  assert.ok(meta.width && meta.height, `Dimensões inválidas: ${fonte.src}`);
  const larguras = [...new Set(fonte.logo
    ? fonte.tamanhos.filter(w => w <= meta.width)
    : [...fonte.tamanhos.filter(w => w < meta.width), meta.width])].sort((a, b) => a - b);
  const variantes = [];
  for (const largura of larguras) {
    const src = `${fonte.prefixo}-${largura}.webp`;
    const destino = new URL(`public${src}`, raiz);
    await mkdir(new URL('./', destino), { recursive: true });
    const buffer = await sharp(original)
      .resize({ width: largura, withoutEnlargement: true })
      .webp(fonte.logo ? { lossless: true, effort: 6 } : { quality: 72, effort: 6 })
      .toBuffer();
    await writeFile(destino, buffer);
    variantes.push({ src, largura, bytes: buffer.length });
  }
  assert.equal(hash(await readFile(originalUrl)), hash(original), `Original mudou durante a geração: ${fonte.src}`);
  manifest[fonte.src] = { largura: meta.width, altura: meta.height, prefixo: fonte.prefixo, larguras };
  resumo.push({ fonte: fonte.src, bytesOriginal: original.length, sha256Original: hash(original), variantes });
}
await mkdir(new URL('src/lib/', raiz), { recursive: true });
await writeFile(new URL('src/lib/imagens-otimizadas.json', raiz), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ geradoEm: fileURLToPath(raiz), fontes: resumo }, null, 2));
