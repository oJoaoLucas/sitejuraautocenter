import type { Metadata } from "next";
import { ServicoPagina } from "@/components/servico-pagina";
import { suspensao } from "@/lib/servicos-paginas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: suspensao.titulo,
  description: suspensao.descricao,
  alternates: { canonical: suspensao.rota },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${suspensao.titulo} | ${site.nome}`,
    description: suspensao.descricao,
    url: suspensao.rota,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

export default function Pagina() {
  return <ServicoPagina d={suspensao} />;
}
