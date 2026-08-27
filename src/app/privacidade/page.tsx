import type { Metadata } from "next";
import { Wrap } from "@/components/ui";
import { site, whats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Como o Jura Auto Center trata os dados de quem visita o site: o que é coletado, para quê, e como falar com a gente sobre isso.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};

const secao = "mb-1.5 font-ui text-[1.05rem] font-bold text-cream";
const paragrafo = "leading-relaxed text-muted";

export default function Privacidade() {
  return (
    <section className="py-14 lg:py-20">
      <Wrap>
        <div className="max-w-2xl">
          <h1 className="mb-4 text-[clamp(2rem,5vw,2.75rem)]">Política de Privacidade</h1>
          <p className={paragrafo}>
            Esta página explica, em português simples, quais dados o site do{" "}
            {site.nome} coleta, para que servem e como você pode falar com a gente sobre isso.
          </p>

          <div className="mt-10 grid gap-8">
            <div>
              <h2 className={secao}>Quem é o responsável pelos dados</h2>
              <p className={paragrafo}>
                {site.nome}, com endereço em {site.endereco.completo}. Qualquer dúvida ou pedido
                sobre seus dados pode ser feito diretamente pelo WhatsApp{" "}
                {site.whatsappExibicao} ou pelo telefone fixo {site.telefoneFixo}.
              </p>
            </div>

            <div>
              <h2 className={secao}>O que este site coleta</h2>
              <p className={paragrafo}>
                O formulário de orçamento de pneu não envia nenhum dado para nenhum servidor: ele
                só monta uma mensagem de texto e abre o seu WhatsApp com ela já escrita. Nada do
                que você digita ali fica armazenado pelo site. A conversa que acontece depois, no
                seu WhatsApp com o {site.nome}, segue a política de privacidade do próprio
                WhatsApp e o bom senso da conversa comercial.
              </p>
              <p className={`mt-3 ${paragrafo}`}>
                A página usa um mapa incorporado do Google pra mostrar onde fica a loja, que
                carrega já na primeira visita. Por causa dele, o Google pode registrar cookies
                próprios de acordo com a política de privacidade dele — o site não tem acesso a
                esses dados. Por isso o aviso de cookies aparece na primeira vez que você visita.
              </p>
            </div>

            <div>
              <h2 className={secao}>Avaliações publicadas no site</h2>
              <p className={paragrafo}>
                Os depoimentos exibidos na seção &quot;O que dizem no Google&quot; são cópias
                literais de avaliações públicas, feitas voluntariamente por clientes no perfil do{" "}
                {site.nome} no Google — não foram coletadas por este site. Se você deixou uma
                avaliação e prefere que ela não apareça aqui, é só chamar no WhatsApp que a gente
                remove.
              </p>
            </div>

            <div>
              <h2 className={secao}>O que este site não faz</h2>
              <p className={paragrafo}>
                Não usa Google Analytics, Meta Pixel, nem qualquer ferramenta de rastreamento ou
                remarketing. Não pede login, não usa cookie de sessão, e não guarda histórico de
                quem visita.
              </p>
            </div>

            <div>
              <h2 className={secao}>Seus direitos</h2>
              <p className={paragrafo}>
                Como o site não guarda dados seus, normalmente não há nada a corrigir ou excluir.
                Se em algum momento você achar que isso mudou, ou tiver qualquer dúvida sobre
                tratamento de dados pessoais, fale com a gente pelo{" "}
                <a
                  href={whats("Olá! Tenho uma dúvida sobre a Política de Privacidade do site.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-jura-title underline underline-offset-4"
                >
                  WhatsApp
                </a>
                .
              </p>
            </div>

            <p className="text-[0.8125rem] text-soft">
              Última atualização: agosto de 2026.
            </p>
          </div>
        </div>
      </Wrap>
    </section>
  );
}
