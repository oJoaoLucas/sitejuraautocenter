import { whats } from "./site";

/**
 * Dados das páginas de serviço (/freios, /suspensao). O molde visual é um só
 * (components/servico-pagina.tsx); o que muda de uma página pra outra está aqui.
 * Só entra o que o site já afirma sobre o serviço (ver `servicos` em site.ts):
 * sem preço, prazo, marca ou garantia que ninguém confirmou.
 */

export type PaginaServico = {
  rota: string;
  titulo: string;
  descricao: string;
  /** Três linhas do H1: a do meio vai em vermelho. */
  h1: readonly [string, string, string];
  lead: string;
  /** Texto do botão e mensagem já escrita do WhatsApp. */
  whatsHref: string;
  fotoHero: string;
  fotoPasso: string;
  altPasso: string;
  sinais: readonly string[];
  sinaisNota: string;
  faz: readonly { icone: string; titulo: string; texto: string }[];
  /** Nomes de `avaliacoesGoogle`, na ordem em que aparecem. */
  depoimentos: readonly string[];
  duvidasTitulo: readonly [string, string];
  faq: readonly { q: string; a: string }[];
  ctaFinal: readonly [string, string];
};

/** Os passos valem pros dois serviços: são o jeito de atender da oficina. */
export const passosServico = [
  {
    titulo: "Chama ou passa na loja",
    texto:
      "Pelo WhatsApp ou direto na Avenida Loreto, 889. Atendimento por ordem de chegada, com estacionamento ao lado.",
  },
  {
    titulo: "Recebe o diagnóstico e o preço",
    texto: "A gente avalia, explica o que precisa e combina o valor antes de começar.",
  },
  {
    titulo: "Aprova e a gente faz",
    texto:
      "O serviço só começa com o seu ok. Se aparecer algo extra no caminho, a gente avisa e pergunta antes.",
  },
] as const;

const duvidasComuns = {
  extra: {
    q: "E se aparecer outro problema no meio do serviço?",
    a: "A gente avisa e pergunta antes de fazer. Nada de serviço extra que só aparece na hora de pagar.",
  },
  agendar: {
    q: "Precisa agendar horário?",
    a: "Não. O atendimento é por ordem de chegada, de segunda a sexta das 7h30 às 17h30 e no sábado das 7h30 às 12h. Em dia de movimento, quanto mais cedo melhor.",
  },
  parcelar: {
    q: "Dá pra parcelar?",
    a: "Dá. Parcelamos em até 10x no cartão.",
  },
  estacionar: {
    q: "Posso deixar o carro estacionado?",
    a: "Sim, temos estacionamento próprio ao lado da loja, sem precisar disputar vaga na avenida.",
  },
} as const;

export const freios: PaginaServico = {
  rota: "/freios",
  titulo: "Freios em Araras: pastilhas e discos",
  descricao:
    "Freios em Araras/SP: pastilhas, discos, tambor e fluido, com diagnóstico antes de qualquer serviço. Atendimento por ordem de chegada. Nota 4,9 no Google.",
  h1: ["Freios em Araras", "com diagnóstico", "antes de trocar"],
  lead: "Pastilha, disco, tambor e fluido. A gente avalia o sistema, explica o que precisa de verdade e só faz o serviço depois de combinado com você.",
  whatsHref: whats("Olá! Vim pelo site e queria uma avaliação dos freios do meu carro."),
  fotoHero: "/img/oficina-elevadores.webp",
  fotoPasso: "/img/servico-freios.webp",
  altPasso: "Freio a tambor aberto, em manutenção no elevador da oficina do Jura Auto Center",
  sinais: [
    "Chiado ou rangido ao frear",
    "Pedal baixo, mole ou que afunda",
    "Carro puxando para um lado na frenagem",
    "Vibração no pedal ou no volante ao frear",
    "Luz de freio acesa no painel",
    "Carro demorando mais para parar",
  ],
  sinaisNota: "Freio é segurança. Qualquer um desses sinais merece uma avaliação.",
  faz: [
    {
      icone: "/icons/freios.png",
      titulo: "Pastilhas e lonas",
      texto: "Avaliação do desgaste e troca quando precisa, sem trocar por trocar.",
    },
    {
      icone: "/icons/freios.png",
      titulo: "Discos e tambores",
      texto: "Verificação do estado de discos e tambores junto com as pastilhas.",
    },
    {
      icone: "/icons/freios.png",
      titulo: "Fluido de freio",
      texto: "Conferência e troca do fluido do sistema.",
    },
    {
      icone: "/icons/revisao.png",
      titulo: "Diagnóstico antes do serviço",
      texto: "Você sabe o que tem e o que precisa antes de aprovar qualquer coisa.",
    },
  ],
  depoimentos: ["Renato Curtolo", "Gabriela Chinalia de Sena", "Geraldo César Bergamin"],
  duvidasTitulo: ["Dúvidas sobre", "freios"],
  faq: [
    {
      q: "Como sei se preciso trocar pastilha ou disco?",
      a: "Barulho e pedal diferente são sinais, mas a troca depende do desgaste real, que só aparece olhando as peças. Por isso o diagnóstico vem antes de qualquer serviço.",
    },
    {
      q: "Quanto custa o serviço de freios?",
      a: "Depende do modelo do carro e do estado das peças. Chama no WhatsApp com o modelo e o que você está sentindo: a gente orienta e combina o valor antes de fazer.",
    },
    duvidasComuns.extra,
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
    duvidasComuns.estacionar,
  ],
  ctaFinal: ["Freio com problema?", "Vem pro Jura."],
};

export const suspensao: PaginaServico = {
  rota: "/suspensao",
  titulo: "Suspensão e amortecedores em Araras",
  descricao:
    "Suspensão e amortecedores em Araras/SP: diagnóstico e reparo com avaliação honesta de cada peça. Atendimento por ordem de chegada. Nota 4,9 no Google.",
  h1: ["Suspensão e", "amortecedores", "em Araras"],
  lead: "Diagnóstico e reparo de suspensão com avaliação honesta: a gente explica, peça por peça, o que precisa mesmo de troca antes de fazer o serviço.",
  whatsHref: whats("Olá! Vim pelo site e queria uma avaliação da suspensão do meu carro."),
  fotoHero: "/img/oficina-interior.webp",
  fotoPasso: "/img/servico-suspensao.webp",
  altPasso: "Mecânico do Jura Auto Center segurando caixas de amortecedores, com a parede de pneus ao fundo",
  sinais: [
    "Batidas ou estalos em buracos e lombadas",
    "Carro balançando demais depois de um buraco",
    "Carro instável ou inclinando em curvas",
    "Pneus gastando de forma desigual",
    "Carro mais baixo de um lado",
    "Vazamento de óleo no amortecedor",
  ],
  sinaisNota: "Suspensão gasta também compromete a frenagem e o pneu. Vale olhar cedo.",
  faz: [
    {
      icone: "/icons/suspensao.png",
      titulo: "Diagnóstico da suspensão",
      texto: "Olhamos o conjunto e explicamos o que está gasto e o que ainda está bom.",
    },
    {
      icone: "/icons/amortecedores.png",
      titulo: "Amortecedores",
      texto:
        "Substituição conforme recomendação técnica, preservando a frenagem e o desgaste uniforme dos pneus.",
    },
    {
      icone: "/icons/suspensao.png",
      titulo: "Peças da suspensão",
      texto: "Peça por peça: só indicamos a troca do que realmente precisa.",
    },
    {
      icone: "/icons/alinhamento.png",
      titulo: "Alinhamento e balanceamento",
      texto: "Depois de mexer na suspensão, vale alinhar o carro. Fazemos aqui mesmo, com equipamento digital.",
    },
  ],
  depoimentos: ["Gedaias Oliveira", "Renato Curtolo", "Alex Carciragui"],
  duvidasTitulo: ["Dúvidas sobre", "suspensão"],
  faq: [
    {
      q: "Como sei se preciso trocar os amortecedores?",
      a: "Batidas, balanço excessivo, pneus gastando torto e carro instável em curvas são sinais. A confirmação vem do diagnóstico: a gente avalia e recomenda a troca só quando a peça precisa.",
    },
    {
      q: "Quanto custa o serviço de suspensão?",
      a: "Depende do modelo do carro e das peças que o diagnóstico mostrar. Chama no WhatsApp com o modelo e o que você está sentindo: a gente orienta e combina o valor antes de fazer.",
    },
    {
      q: "Preciso trocar todas as peças de uma vez?",
      a: "A avaliação é peça por peça. A gente explica o que precisa de troca e o que ainda está em bom estado, e você decide com a informação na mão.",
    },
    {
      q: "Depois de mexer na suspensão precisa alinhar?",
      a: "Quando se mexe na suspensão, vale alinhar o carro. A gente faz o alinhamento aqui mesmo, com equipamento digital.",
    },
    duvidasComuns.extra,
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
  ],
  ctaFinal: ["Suspensão fazendo barulho?", "Vem pro Jura."],
};

export const paginasServico = [freios, suspensao] as const;
