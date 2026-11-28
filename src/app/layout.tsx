import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Montserrat, Poppins } from "next/font/google";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsFloat } from "@/components/whats-float";
import { CookieBanner } from "@/components/cookie-banner";
import { Rastreio } from "@/components/rastreio";
import { FaixaPromo } from "@/components/promo";
import { campanhaDoDia } from "@/lib/epoca";
import { servicos, site } from "@/lib/site";
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
    default: "Jura Auto Center Araras: Pneus, Alinhamento e Freios",
    template: "%s | Jura Auto Center",
  },
  description:
    "Pneus, alinhamento, balanceamento, suspensão e freios em Araras/SP há 7 anos. Mais de 10 mil carros atendidos e nota 4,9 no Google. Orçamento pelo WhatsApp.",
  keywords: [
    "pneus araras", "borracharia araras", "alinhamento araras",
    "balanceamento araras", "oficina araras", "suspensão araras",
    "freios araras", "troca de oleo araras", "auto center araras",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: site.nome,
    url: "/",
    title: "Jura Auto Center Araras: Pneus, Alinhamento e Freios",
    description:
      "Em Araras desde 2019, cuidando de quem depende do carro todo dia. Nota 4,9 no Google. Vem pro Jura!",
    images: [{ url: "/img/og.jpg", width: 1200, height: 630, alt: "Fachada do Jura Auto Center" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jura Auto Center Araras: Pneus, Alinhamento e Freios",
    description:
      "Em Araras desde 2019, cuidando de quem depende do carro todo dia. Nota 4,9 no Google. Vem pro Jura!",
    images: ["/img/og.jpg"],
  },
  robots: { index: true, follow: true },
  /* Bing Webmaster Tools (dono, 24/11/2026). Não tirar: o Bing confere de tempos em tempos. */
  verification: { other: { "msvalidate.01": "60A7691D7175A448C045578304D6DD9E" } },
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
    streetAddress: `${site.endereco.rua} - ${site.endereco.bairro}`,
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
  /* Ponto do perfil do Google Maps (24/11/2026). */
  geo: { "@type": "GeoCoordinates", latitude: -22.3605031, longitude: -47.3671551 },
  hasMap: site.perfilGoogleUrl,
  areaServed: { "@type": "City", name: "Araras" },
  sameAs: [site.instagramUrl, "https://www.facebook.com/juraautocenter", site.perfilGoogleUrl],
  /* O que as IAs (ChatGPT, Claude, Gemini) leem pra saber o que a oficina faz.
     Só o que o site já afirma: sem preço, marca ou garantia. */
  description:
    "Auto center em Araras/SP especializado em pneus, alinhamento, balanceamento, suspensão e freios, com troca de óleo e revisão. Atendimento por ordem de chegada, estacionamento próprio e parcelamento em até 10x no cartão.",
  logo: "https://juraautocenter.com.br/logo/jura-vermelho.png",
  foundingDate: "2019-06-15",
  founder: { "@type": "Person", name: "Jura" },
  contactPoint: [
    { "@type": "ContactPoint", telephone: "+5519997818371", contactType: "customer service", availableLanguage: "pt-BR" },
    { "@type": "ContactPoint", telephone: "+551933513004", contactType: "customer service", availableLanguage: "pt-BR" },
  ],
  paymentAccepted: "Cartão de crédito, Cartão de débito",
  currenciesAccepted: "BRL",
  knowsAbout: servicos.map((s) => s.titulo),
  makesOffer: servicos.map((s) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name: s.titulo, description: s.texto, areaServed: "Araras/SP" },
  })),
  amenityFeature: [{ "@type": "LocationFeatureSpecification", name: "Estacionamento próprio", value: true }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="pt-BR"
      className={`${bebas.variable} ${poppins.variable} ${montserrat.variable}`}
      /* Promoção valendo no dia do build: reserva o espaço da tarja (--faixa). O FaixaPromo
         tira o atributo no aparelho do cliente quando a data passa. */
      data-promo={campanhaDoDia() ? "" : undefined}
      data-campanha={campanhaDoDia()?.id}
      suppressHydrationWarning
    >
      <body className="relative">
        <noscript><style>{".js-only { display: none !important; }"}</style></noscript>
        {/* Rastreio inicializa a tag somente fora da prévia local. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-sm focus:bg-jura focus:px-4 focus:py-3 focus:font-ui focus:text-sm focus:font-bold focus:text-white"
        >
          Pular para o conteúdo
        </a>
        <FaixaPromo />
        <Header />
        <main id="conteudo" tabIndex={-1} className="pt-(--faixa)">{children}</main>
        <Footer />
        <WhatsFloat />
        <CookieBanner />
        <Rastreio />
      </body>
    </html>
  );
}
