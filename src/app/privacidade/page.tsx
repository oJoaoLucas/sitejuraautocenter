import type { Metadata } from "next";
import { Wrap } from "@/components/ui";
import { PreferenciasCookies } from "@/components/cookie-banner";
import { site, whats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Como o Jura Auto Center utiliza dados, cookies opcionais e informações de contato, e como mudar suas preferências.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
};
const secao = "mb-2 font-ui text-[1.05rem] font-bold text-cream";
const paragrafo = "leading-relaxed text-muted";
const link = "text-cream underline underline-offset-4";

export default function Privacidade() {
  return <section className="py-14 lg:py-20"><Wrap><div className="max-w-2xl">
    <h1 className="mb-4 text-[clamp(2rem,5vw,2.75rem)]">Política de Privacidade</h1>
    <p className={paragrafo}>Esta página explica o uso de informações no site do {site.nome}, as escolhas de cookies e como falar com a oficina sobre seus dados.</p>
    <div className="mt-10 grid gap-8">
      <div><h2 className={secao}>Responsável e contato</h2><p className={paragrafo}>{site.nome}, em {site.endereco.completo}. Para dúvidas ou pedidos relacionados a dados pessoais, fale pelo WhatsApp {site.whatsappExibicao} ou telefone {site.telefoneFixo}.</p></div>
      <div><h2 className={secao}>Orçamento e atendimento</h2>
        <p className={paragrafo}>O formulário prepara uma mensagem no seu navegador com a medida e a quantidade de pneus. O site não grava esses campos em um banco de dados. Ao abrir o WhatsApp, o texto preparado faz parte do link enviado à plataforma; a equipe recebe a mensagem quando você toca em Enviar.</p>
        <p className={`mt-3 ${paragrafo}`}>No atendimento, a oficina recebe as informações que você compartilha, como telefone, mensagem e fotos, para responder, preparar orçamento e prestar o serviço. O tratamento da conversa pela plataforma segue a <a href="https://www.whatsapp.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className={link}>política do WhatsApp</a>. Para consultar o uso e o prazo de conservação de informações do seu atendimento pela oficina, utilize o canal de contato acima.</p>
      </div>
      <div><h2 className={secao}>Sua escolha de cookies</h2>
        <p className={paragrafo}>A medição de anúncios funciona desde a primeira visita; o mapa começa desativado. Aceitar libera o mapa e mantém a medição; recusar desativa os dois. Pedir orçamento não depende da sua escolha.</p>
        <p className={`mt-3 ${paragrafo}`}>Guardamos no armazenamento local do navegador a escolha para esses recursos, a versão do aviso e a data da decisão por até 180 dias. Depois desse prazo, pedimos uma nova escolha. O antigo botão “Entendi” não conta como autorização para as opções atuais. Se o navegador bloquear o armazenamento, a escolha vale apenas nesta visita.</p>
        <p className={`mt-3 ${paragrafo}`}>Você pode mudar sua escolha abaixo ou pelo rodapé. Ao recusar com a medição já carregada, a página pode recarregar para interromper seu uso. Isso não desfaz informações já enviadas; cookies pertencentes ao domínio do Google devem ser gerenciados no navegador ou nos controles do Google.</p>
        <PreferenciasCookies className={`mt-3 ${link}`} />
      </div>
      <div><h2 className={secao}>Mapa do Google</h2><p className={paragrafo}>O mapa incorporado só é solicitado após aceitar os cookies opcionais. Ao carregar, o Google recebe informações da conexão, como endereço IP e dados do navegador, e pode utilizar cookies próprios. Sem autorização, mostramos o endereço e um botão para abrir a rota fora do site. Ao seguir esse link, você passa a utilizar o serviço do Google.</p></div>
      <div><h2 className={secao}>Medição de anúncios</h2>
        <p className={paragrafo}>A tag do Google Ads, ativa desde a primeira visita até você recusar, mede as ações de preparar orçamento e clicar em WhatsApp, telefone, rota ou consulta da fila. Enviamos o tipo de ação, a página e a posição do botão; não enviamos o texto digitado no formulário. O Google pode utilizar identificadores, dados da conexão, cookies e informações do clique no anúncio para atribuir resultados.</p>
        <p className={`mt-3 ${paragrafo}`}>A personalização de anúncios permanece desativada nesta tag. O site não instala Google Analytics nem Meta Pixel. Se você recusar, a tag do Ads não é carregada e as ações feitas depois disso não são medidas nem guardadas para envio posterior. Um clique ou pedido preparado não comprova mensagem recebida ou venda.</p>
        <p className={`mt-3 ${paragrafo}`}>O tratamento de dados pelo mapa e pela tag segue também a <a href="https://policies.google.com/privacy?hl=pt-BR" target="_blank" rel="noopener noreferrer" className={link}>política de privacidade do Google</a>, incluindo seus controles e regras de conservação.</p>
      </div>
      <div><h2 className={secao}>Hospedagem e links externos</h2><p className={paragrafo}>A infraestrutura da Cloudflare entrega os arquivos e protege a conexão. Ela pode processar dados técnicos, como IP, requisições e informações do navegador, conforme a <a href="https://www.cloudflare.com/privacypolicy/" target="_blank" rel="noopener noreferrer" className={link}>política da Cloudflare</a>. O site não exige cadastro nem login. Ao abrir links de WhatsApp, Instagram ou Google, passam a valer também as políticas desses serviços.</p></div>
      <div><h2 className={secao}>Avaliações no site</h2><p className={paragrafo}>Os depoimentos são reproduções de avaliações públicas do perfil da oficina no Google. Se a sua avaliação aparece aqui e você deseja solicitar sua retirada, entre em contato.</p></div>
      <div><h2 className={secao}>Pedidos sobre seus dados</h2><p className={paragrafo}>Você pode solicitar informações sobre o tratamento dos seus dados e exercer os direitos aplicáveis, como acesso, correção ou exclusão, pelo <a href={whats("Olá! Tenho um pedido sobre meus dados pessoais e a Política de Privacidade do site.")} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp da oficina</a>. A resposta considera o tipo de dado, a identificação necessária para proteger suas informações e eventuais obrigações de conservação.</p></div>
      <p className="text-sm text-soft">Última atualização: 5 de outubro de 2026.</p>
    </div>
  </div></Wrap></section>;
}
