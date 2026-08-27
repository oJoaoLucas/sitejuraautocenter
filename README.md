# Jura Auto Center

Site institucional do Jura Auto Center (Araras/SP) — Next.js 16 (App Router),
React 19, Tailwind v4. Estático: sem backend, sem banco, sem autenticação.
O único "formulário" do site (orçamento de pneu) não envia nada a nenhum
servidor — só monta uma mensagem e abre o WhatsApp com ela pronta.

## Rodando localmente

O `next dev` com Turbopack quebra nesse projeto por causa do `next/font`
(veja comentário no topo de `next.config.ts`). Use sempre o build de
produção pra conferir o site:

```bash
npm run build
npx serve out -p 3000
```

O `.claude/launch.json` na raiz do projeto já tem essa configuração pronta
(`jura`, porta 3000).

## Deploy

Hospedagem: **Cloudflare Pages**. `next.config.ts` usa `output: "export"`
(gera `out/`) porque o Pages serve arquivo estático, sem o servidor do Next.
Isso também desliga a otimização do `next/image` — por isso as fotos em
`public/img/` já saem pré-otimizadas (reamostradas e em WebP) do próprio
repo, em vez de depender de otimização em runtime.

Security headers e CSP (em `Report-Only`) ficam em `public/_headers`, que o
Cloudflare Pages lê automaticamente — não em `next.config.ts`, que o export
estático ignora.

Configuração do projeto no Pages: build `npm run build`, diretório de saída
`web/out`.

## Estrutura

- `src/lib/site.ts` — fonte única de verdade do conteúdo (telefone, endereço,
  horário, serviços, avaliações, FAQ). Mudou aqui, mudou no site inteiro.
- `src/components/` — um componente por bloco visual da página.
- `src/app/` — três rotas: `/` (home), `/historia`, `/privacidade`.

## Auditoria

Este projeto passou por uma auditoria de segurança/produção completa
(dependências, LGPD, SEO, headers, performance, acessibilidade). Sem
backend e sem dados sensíveis armazenados, a maior parte dos riscos comuns
não se aplica — o que sobrou foi corrigido: export estático + imagens
otimizadas, `_headers` com CSP, robots/sitemap, aviso de cookies (o mapa do
Google carrega na primeira visita), favicon e OG image próprios.

Pendente: domínio (`juraautocenter.com.br`) ainda não registrado — o
canonical, o `metadataBase` e o JSON-LD em `layout.tsx` já apontam pra ele.
