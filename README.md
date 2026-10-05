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

## Imagens responsivas

As fotos e o logo usados pela interface têm variantes em WebP nas pastas
`public/img/otimizadas/` e `public/logo/otimizadas/`. Os originais e as variantes
anteriores permanecem intactos. `Foto` usa o manifest gerado e `srcset`,
inclusive para o logo do cabeçalho e do rodapé. As fotos recebem compressão
com qualidade 72; o logo usa codificação sem perdas após o redimensionamento.

Para regenerar as variantes a partir dos arquivos originais atuais:

```bash
npm run imagens:otimizar
npm run build
```

O script usa Sharp, já instalado como dependência do Next e presente no lockfile;
nenhuma dependência nova foi adicionada. Ele atualiza apenas os arquivos nas
pastas de variantes e `src/lib/imagens-otimizadas.json`, verificando que cada
original conserva seu hash. Não muda enquadramento, cores ou conteúdo das fotos.

## Estrutura

- `src/lib/site.ts` — fonte única de verdade do conteúdo (telefone, endereço,
  horário, serviços, avaliações, FAQ). Mudou aqui, mudou no site inteiro.
- `src/components/` — um componente por bloco visual da página.
- `src/app/` — quatro rotas: `/` (home), `/pneus`, `/historia`, `/privacidade`.

## Privacidade e validação local

A medição do Google Ads vale desde a primeira visita; o mapa começa desativado.
O aviso tem somente Aceitar e Recusar: aceitar libera o mapa e mantém a medição;
recusar bloqueia os dois. O aviso fica visível em toda visita e só some
depois de recusar; Aceitar não o fecha. O link Cookies no rodapé reabre
o mesmo aviso, sem painel de personalização. Escolhas antigas são preservadas
até a pessoa decidir novamente.
A preferência `jura-privacidade-v1` expira após 180 dias. O aviso antigo não autoriza
os recursos novos. Se o armazenamento falhar, a escolha vale só na visita.

O Ads mede desde a primeira visita, com personalização sempre negada. Quem
recusa não carrega o script nem tem eventos medidos ou guardados para depois.
Recusar com a tag já carregada nega os usos, tenta remover cookies `_gcl_`
acessíveis no domínio e recarrega a página. Cookies de outros domínios não
podem ser apagados pelo site. Configuração real e recebimento no Ads ainda
precisam ser conferidos após uma publicação autorizada.

Em localhost/loopback ou modo development, a tag continua bloqueada mesmo
com autorização. Contatos/rotas são simulados no console `[Jura local]`.
O formulário prepara a mensagem sem abrir conversa na prévia. Mapa pode
carregar no teste após aceitar os cookies opcionais.

Testes de regras e medição no Node com suporte à importação de TypeScript:

```bash
npm run build
node --test tests/*.test.mjs
npm run lint
npx tsc --noEmit --incremental false
```

Os testes do export leem o HTML de `out/`; gere o build antes de executá-los.
Sem JavaScript, os controles do formulário ficam desativados no HTML e ocultos
na interface; um link direto de contato aparece no lugar. A navegação tem links
visíveis, as respostas de FAQ e diferenciais ficam disponíveis e controles que
dependem de scripts são ocultados. Mapa e medição permanecem desativados.

O domínio já está registrado conforme a nota do projeto. As mudanças desta
rodada ainda são locais. Quatro páginas: `/`, `/pneus`, `/historia` e `/privacidade`.
A política descreve a implementação, sem afirmar ausência de dados técnicos
na hospedagem nem anonimato completo dos identificadores de publicidade.
Prazos internos de conservação dos atendimentos e configurações das contas
continuam dependentes da operação da oficina.
