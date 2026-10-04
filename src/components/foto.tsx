import manifest from "@/lib/imagens-otimizadas.json";

/** Variantes geradas antes da publicação: o export não tem otimizador de imagens. */
type FotoBase = {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

type FotoFill = FotoBase & { fill: true; width?: never; height?: never };
type FotoFixa = FotoBase & { fill?: false; width: number; height: number };
type Imagem = { largura: number; altura: number; prefixo: string; larguras: number[] };

export function Foto(props: FotoFill | FotoFixa) {
  const { src, alt, className, sizes, priority } = props;
  const imagem: Imagem | undefined = (manifest as Record<string, Imagem>)[src];
  const padrao = imagem?.larguras.find(w => w >= 800) ?? imagem?.larguras.at(-1);
  const comum = {
    src: imagem ? `${imagem.prefixo}-${padrao}.webp` : src,
    alt,
    srcSet: imagem?.larguras.map(w => `${imagem.prefixo}-${w}.webp ${w}w`).join(", "),
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
