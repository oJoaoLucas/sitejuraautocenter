import type { Metadata } from "next";
import { ServicoPagina } from "@/components/servico-pagina";
import { alinhamento } from "@/lib/servicos-paginas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: alinhamento.titulo,
  description: alinhamento.descricao,
  alternates: { canonical: alinhamento.rota },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${alinhamento.titulo} | ${site.nome}`,
    description: alinhamento.descricao,
    url: alinhamento.rota,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

export default function Pagina() {
  return <ServicoPagina d={alinhamento} />;
}
