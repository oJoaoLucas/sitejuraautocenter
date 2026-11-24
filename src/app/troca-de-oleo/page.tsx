import type { Metadata } from "next";
import { ServicoPagina } from "@/components/servico-pagina";
import { oleo } from "@/lib/servicos-paginas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: oleo.titulo,
  description: oleo.descricao,
  alternates: { canonical: oleo.rota },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${oleo.titulo} | ${site.nome}`,
    description: oleo.descricao,
    url: oleo.rota,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

export default function Pagina() {
  return <ServicoPagina d={oleo} />;
}
