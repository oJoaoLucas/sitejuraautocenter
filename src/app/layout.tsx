import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat, Poppins } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsFloat } from "@/components/whats-float";
import { CookieBanner } from "@/components/cookie-banner";
import { faq, site } from "@/lib/site";
import "./globals.css";

/* Fontes do brand book (p.05), auto-hospedadas pelo next/font: zero request externo. */
const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});
const poppins = Poppins({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});
const montserrat = Montserrat({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://juraautocenter.com.br"),
  title: {
    default: "Jura Auto Center - Pneus, Suspensão e Freios em Araras/SP",
    template: "%s | Jura Auto Center",
  },
  description:
    "Especialistas em suspensão, freios e pneus em Araras/SP há 7 anos. Mais de 10 mil carros atendidos e nota 4,9 no Google. Orçamento pelo WhatsApp.",
  keywords: [
    "pneus araras", "borracharia araras", "alinhamento araras",
    "balanceamento araras", "oficina araras", "suspensão araras",
    "freios araras", "troca de oleo araras", "auto center araras",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    title: "Jura Auto Center - Pneus, Suspensão e Freios em Araras/SP",
    description:
      "Sete anos em Araras cuidando de quem depende do carro todo dia. Nota 4,9 no Google. Vem pro Jura!",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jura Auto Center - Pneus, Suspensão e Freios em Araras/SP",
    description:
      "Sete anos em Araras cuidando de quem depende do carro todo dia. Nota 4,9 no Google. Vem pro Jura!",
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  colorScheme: "dark",
};

/* Schema LocalBusiness: o que faz o Google entender horário e endereço.
   A nota (aggregateRating) fica só visível na página: marcada aqui conta
   como "self-serving review" pra política do Google e pode gerar aviso
   no Search Console. */
const schema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  name: site.nome,
  image: "https://juraautocenter.com.br/img/fachada.webp",
  "@id": "https://juraautocenter.com.br",
  url: "https://juraautocenter.com.br",
  telephone: "+5519997818371",
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "07:30",
      closes: "17:30",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday"],
      opens: "07:30",
      closes: "12:00",
    },
  ],
  sameAs: [site.instagramUrl],
};

/* Schema FAQPage: as mesmas perguntas do bloco de dúvidas do site, pro
   Google poder mostrar como rich result. */
const schemaFaq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${bebas.variable} ${poppins.variable} ${montserrat.variable}`}>
      <body className="relative">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaFaq) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-jura focus:px-4 focus:py-3 focus:font-ui focus:text-sm focus:font-bold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <WhatsFloat />
        <CookieBanner />
      </body>
    </html>
  );
}
