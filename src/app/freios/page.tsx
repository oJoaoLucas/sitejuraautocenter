import type { Metadata } from "next";
import { ServicoPagina } from "@/components/servico-pagina";
import { freios } from "@/lib/servicos-paginas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: freios.titulo,
  description: freios.descricao,
  alternates: { canonical: freios.rota },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${freios.titulo} | ${site.nome}`,
    description: freios.descricao,
    url: freios.rota,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

export default function Pagina() {
  return <ServicoPagina d={freios} />;
}
