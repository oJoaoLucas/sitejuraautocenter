/**
 * Substitui o next/image nas fotos de conteúdo (não nos ícones/logos).
 *
 * Motivo: com `output: "export"` (Cloudflare Pages) o next/image não
 * otimiza nada em runtime — sem um `loader` próprio ele só devolve o
 * arquivo original, do mesmo jeito pro celular e pro monitor 4K. Este
 * componente gera o `srcset` manualmente a partir de variantes já
 * pré-geradas (script de build, ver public/img/*-800.webp etc.), que
 * é exatamente o que o next/image faria em modo servidor.
 *
 * Convenção de nome: pra `src="/img/nome.webp"`, as variantes menores
 * são "/img/nome-800.webp" e "/img/nome-1200.webp" (nem toda foto tem
 * as duas — só existem as que cabem sem esticar o original).
 */

type FotoBase = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type FotoFill = FotoBase & { fill: true; width?: never; height?: never };
type FotoFixa = FotoBase & { fill?: false; width: number; height: number };

// As variantes que existem de fato ficam listadas aqui (geradas no
// build das imagens). Evita apontar srcset pra arquivo inexistente.
const VARIANTES: Record<string, number[]> = {
  "/img/fachada-hero.webp": [800, 1200, 1800],
  "/img/fachada.webp": [800, 1200],
  "/img/pneus-estoque.webp": [800, 1200],
  "/img/pneus-prateleira.webp": [800, 1200, 1800],
  "/img/oficina-elevadores.webp": [800, 1200, 1800],
  "/img/oficina-interior.webp": [800, 1200, 1800],
  "/img/estacionamento.webp": [800, 1200, 1800],
  "/img/oficina-galpao-alto.webp": [800, 1200, 1800],
  "/img/oficina-galpao-amplo.webp": [800, 1200],
  "/img/loja-antiga-2019.webp": [800, 1200, 1800],
  "/img/jura-mecanico.webp": [800],
};

function srcSetDe(src: string, larguraOriginal: number): string {
  const variantes = VARIANTES[src] ?? [];
  const semExtensao = src.replace(/\.webp$/, "");
  const partes = variantes.map((w) => `${semExtensao}-${w}.webp ${w}w`);
  partes.push(`${src} ${larguraOriginal}w`);
  return partes.join(", ");
}

// Largura "cheia" de cada foto original — usada como maior descritor
// do srcset (o arquivo em /img/*.webp já está nesse tamanho).
const LARGURA_ORIGINAL: Record<string, number> = {
  "/img/fachada-hero.webp": 2000,
  "/img/fachada.webp": 1600,
  "/img/pneus-estoque.webp": 1800,
  "/img/pneus-prateleira.webp": 2000,
  "/img/oficina-elevadores.webp": 2000,
  "/img/oficina-interior.webp": 2000,
  "/img/estacionamento.webp": 2000,
  "/img/oficina-galpao-alto.webp": 2000,
  "/img/oficina-galpao-amplo.webp": 1600,
  "/img/loja-antiga-2019.webp": 2000,
  "/img/jura-mecanico.webp": 1200,
};

export function Foto(props: FotoFill | FotoFixa) {
  const { src, alt, className, sizes, priority } = props;
  const larguraOriginal = LARGURA_ORIGINAL[src] ?? 2000;
  const srcSet = srcSetDe(src, larguraOriginal);
  const comum = {
    src,
    alt,
    srcSet,
    sizes: sizes ?? "100vw",
    loading: priority ? undefined : ("lazy" as const),
    fetchPriority: priority ? ("high" as const) : undefined,
    decoding: "async" as const,
  };

  if (props.fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...comum} className={`absolute inset-0 size-full ${className ?? ""}`} alt={alt} />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...comum} width={props.width} height={props.height} className={className} alt={alt} />
  );
}
