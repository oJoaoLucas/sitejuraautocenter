/**
 * FAQPage em JSON-LD. Fica na página que mostra as perguntas (e não no layout),
 * porque o Google exige que o marcado bata com o que está visível ali.
 */
export function FaqSchema({ itens }: { itens: readonly { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: itens.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  );
}
