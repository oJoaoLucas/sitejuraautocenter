/**
 * Fonte única de verdade do conteúdo do site.
 * Dados confirmados pelo dono + Brand Book v1.1.
 * Mexeu aqui, mudou no site inteiro.
 */

export const WHATS_NUMERO = "5519997818371";

/** Monta o link do WhatsApp com a mensagem já escrita pro cliente. */
export function whats(mensagem: string): string {
  return `https://wa.me/${WHATS_NUMERO}?text=${encodeURIComponent(mensagem)}`;
}

export const site = {
  nome: "Jura Auto Center",
  assinatura: "Vem pro Jura!",
  telefoneFixo: "(19) 3351-3004",
  whatsappExibicao: "(19) 99781-8371",
  instagram: "juraautocenter",
  instagramUrl: "https://instagram.com/juraautocenter",
  endereco: {
    rua: "Avenida Loreto, 889",
    bairro: "Jardim das Flores",
    cidade: "Araras",
    uf: "SP",
    cep: "13607-200",
    completo: "Avenida Loreto, 889 - Jardim das Flores, Araras/SP, 13607-200",
  },
  mapsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=" +
    encodeURIComponent(
      "Jura Auto Center, Avenida Loreto, 889, Jardim das Flores, Araras - SP, 13607-200",
    ),
  avaliarUrl: "https://g.page/r/CQqPUmEcujAVEAE/review",
  mapsEmbed:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("Avenida Loreto, 889, Jardim das Flores, Araras - SP, 13607-200") +
    "&output=embed",
  horario: [
    { dia: "Segunda a sexta", hora: "7h30 às 17h30" },
    { dia: "Sábado", hora: "7h30 às 12h" },
    { dia: "Domingo", hora: "Fechado" },
  ],
  prova: {
    nota: "4,9",
    avaliacoes: "300",
    carros: "10.000",
    anos: 7,
    fundacao: "15/06/2019",
    mudanca: "14/02/2024",
  },
} as const;

/* ------------------------------------------------------------------ */

export const cta = {
  whatsPrincipal: whats(
    "Olá! Vim pelo site do Jura e queria falar sobre um serviço pro meu carro.",
  ),
  whatsRevisao: whats(
    "Olá! Vim pelo site e queria fazer uma revisão no meu carro. Pode me passar como funciona?",
  ),
  whatsFila: whats("Olá! Vim pelo site. Como está o movimento aí hoje?"),
} as const;

/* ------------------------------------------------------------------ */

export type Servico = {
  slug: string;
  icone: string;
  titulo: string;
  texto: string;
};

export const servicos: readonly Servico[] = [
  {
    slug: "pneus",
    icone: "/icons/pneus.png",
    titulo: "Pneus",
    texto:
      "Pneus nacionais, importados e remold, do aro 13 ao 20. Orçamento fechado antes da montagem, sem custo adicional depois.",
  },
  {
    slug: "alinhamento",
    icone: "/icons/alinhamento.png",
    titulo: "Alinhamento",
    texto:
      "Alinhamento com equipamento digital, executado no mesmo dia. Essencial para o desgaste correto do pneu e a estabilidade do veículo.",
  },
  {
    slug: "balanceamento",
    icone: "/icons/balanceamento.png",
    titulo: "Balanceamento",
    texto:
      "Balanceamento de rodas para eliminar trepidação no volante e prolongar a vida útil do pneu.",
  },
  {
    slug: "freios",
    icone: "/icons/freios.png",
    titulo: "Freios",
    texto:
      "Manutenção completa do sistema de freios — pastilhas, discos, tambor e fluido — com diagnóstico técnico antes de qualquer serviço.",
  },
  {
    slug: "suspensao",
    icone: "/icons/suspensao.png",
    titulo: "Suspensão",
    texto:
      "Diagnóstico e reparo de suspensão, com avaliação honesta sobre a real necessidade de troca de cada peça.",
  },
  {
    slug: "amortecedores",
    icone: "/icons/amortecedores.png",
    titulo: "Amortecedores",
    texto:
      "Substituição sempre em par, conforme recomendação técnica, preservando a frenagem e o desgaste uniforme dos pneus.",
  },
  {
    slug: "troca-de-oleo",
    icone: "/icons/oleo.png",
    titulo: "Troca de óleo",
    texto:
      "Troca de óleo e filtro, com registro da próxima data de manutenção para o controle correto da revisão preventiva.",
  },
  {
    slug: "revisao",
    icone: "/icons/revisao.png",
    titulo: "Revisão completa",
    texto:
      "Revisão geral do veículo, item por item, com relatório do estado real de cada componente.",
  },
];

/* ------------------------------------------------------------------ */

export type Diferencial = {
  slug: string;
  titulo: string;
  texto: string;
  /** Conteúdo de quando expande. Um dos dois: texto simples ou o bloco do Jura. */
  textoExpandido?: string;
  /** Só o item "quem é o jura" usa isso, pra linkar pra história completa. */
  ctaHref?: string;
  ctaLabel?: string;
};

export const diferenciais: readonly Diferencial[] = [
  {
    slug: "preco-justo",
    titulo: "Preço justo",
    texto:
      "Você ouve um número no começo e paga o mesmo número no fim. Sem taxa escondida, sem serviço extra que aparece só na hora de pagar.",
    textoExpandido:
      "Nada de orçamento que cresce na hora de fechar. O preço combinado no WhatsApp ou no balcão é o preço que você paga. Se algum serviço extra for necessário no meio do caminho, a gente avisa e pergunta antes de fazer — nunca depois.",
  },
  {
    slug: "atendimento",
    titulo: "Atendimento qualificado e especial",
    texto:
      "Equipe própria e fixa, treinada pra explicar o serviço em português, sem roteiro decorado e sem enrolação.",
    textoExpandido:
      "Não tem call center nem terceirização aqui. A equipe é própria, fixa e conhece o trabalho: te recebe, olha o carro e explica o problema e o preço com calma, antes de fazer qualquer coisa. Isso muda a conversa — você fala com gente que entende do que está falando, não com um roteiro de atendimento.",
  },
  {
    slug: "estacionamento",
    titulo: "Estacionamento próprio",
    texto:
      "Tem espaço nosso ao lado da loja pra você deixar o carro, sem disputar vaga na avenida.",
    textoExpandido:
      "Enquanto o carro está em serviço, ou enquanto você espera, tem vaga garantida no nosso próprio estacionamento, do lado da loja. Ninguém precisa rodar em volta do quarteirão procurando vaga nem parar em fila dupla na Avenida Loreto pra conseguir entrar.",
  },
  {
    slug: "experiencia",
    titulo: "Sete anos e mais de dez mil carros",
    texto:
      "Estamos em Araras desde junho de 2019. Boa parte de quem chega hoje veio na indicação de alguém que já passou por aqui.",
    textoExpandido:
      "Sete anos de Araras, mais de dez mil carros atendidos e nota 4,9 no Google com mais de trezentas avaliações. Esse tipo de número não se compra: ele vem de gente que voltou uma segunda vez e trouxe o vizinho, o cunhado, o colega de trabalho junto.",
  },
  {
    slug: "quem-e-o-jura",
    titulo: "Quem é o Jura",
    texto:
      "Mais de vinte anos de mecânica no corpo. Se o serviço é seu, é ele que olha.",
    textoExpandido:
      "Jura é mecânico. Passou mais de vinte anos embaixo do carro dos outros, sempre com a mão na graxa, até abrir o próprio negócio em 15 de junho de 2019 — no dia em que completou 42 anos. Hoje com 49, pai e marido, continua sendo quem você encontra no meio do auto center quando chega com o carro fazendo barulho. Tem o Jura, de boné, no meio dos elevadores.",
    ctaHref: "/historia",
    ctaLabel: "Conheça a história completa",
  },
];

/* ------------------------------------------------------------------ */

/** Avaliações reais copiadas do perfil do Google (print em /avaliacoes). */
export const avaliacoesGoogle = [
  {
    nome: "Alex Carciragui",
    texto:
      "Eu tive o privilégio de encontrar um serviço excepcional e uma grande atenção no serviço executado. Caso precise de um serviço de qualidade e diferenciado pode procurar essa equipe. Saí da minha cidade e fui até Araras e saí de lá muito satisfeito. O Jura resolveu meu problema, deu total atenção e só me entregou o carro depois de tudo resolvido. Ganhou um cliente, pode ter certeza.",
  },
  {
    nome: "Renato Curtolo",
    texto:
      "Excelente profissionais, equipe top, levo meu carro lá já faz muitos anos. Recomendo para todos! E não é só alinhamento e balanceamento, fazem de tudo: freios, amortecedores, rodas, pneus, troca de óleo e muito mais.",
  },
  {
    nome: "Gabriela Chinalia de Sena",
    texto:
      "O serviço deles é excelente e super confiável. Amo levar o meu carro lá, e os preços são justos. E o atendimento então... nota 1000.",
  },
  {
    nome: "Geraldo César Bergamin",
    texto:
      "Jura Auto Center é o que consumidor deseja e encontra: atendimento de excelência em todos os aspectos, tanto na parte técnica quanto no escritório. Parabéns a toda equipe.",
  },
  {
    nome: "Gedaias Oliveira",
    texto:
      "Troquei os pneus do carro com ótima condição e serviço realizado rapidamente. Retornarei para rodízio e revisar suspensão. Satisfeito com o atendimento cordial.",
  },
] as const;

/* ------------------------------------------------------------------ */

export const faq = [
  {
    q: "Precisa agendar horário?",
    a: "Não. O atendimento é por ordem de chegada, de segunda a sexta das 7h30 às 17h30 e no sábado das 7h30 às 12h. Em dia de movimento, quanto mais cedo melhor. Se quiser, chama no WhatsApp antes que a gente te fala como está a fila.",
  },
  {
    q: "Aceita cartão? Dá pra parcelar?",
    a: "Aceita. Parcelamos em até 10x no cartão.",
  },
  {
    q: "Vocês trabalham com pneu remold?",
    a: "Sim, além de nacionais e importados. A gente explica a diferença real entre eles pro seu tipo de uso e você escolhe com a informação na mão.",
  },
  {
    q: "Fazem mecânica geral?",
    a: "Somos especializados em suspensão, freios e pneus, e fazemos também troca de óleo e revisão. Serviço fora disso a gente olha, te fala o que é, e te orienta.",
  },
  {
    q: "Posso deixar o carro estacionado?",
    a: "Sim, temos estacionamento próprio ao lado da loja, sem precisar disputar vaga na avenida.",
  },
];
