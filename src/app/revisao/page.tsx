import type { Metadata } from "next";
import { ServicoPagina } from "@/components/servico-pagina";
import { revisao } from "@/lib/servicos-paginas";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: revisao.titulo,
  description: revisao.descricao,
  alternates: { canonical: revisao.rota },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: `${revisao.titulo} | ${site.nome}`,
    description: revisao.descricao,
    url: revisao.rota,
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
};

export default function Pagina() {
  return <ServicoPagina d={revisao} />;
}
