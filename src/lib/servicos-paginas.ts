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
  /** Foto do serviço acontecendo, ao lado de `fotoPasso` no "como funciona". */
  fotoServico: string;
  altServico: string;
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
  fotoServico: "/img/servico-freios-mecanico.webp",
  altServico: "Mecânico do Jura Auto Center trabalhando no disco de freio de um carro",
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
  fotoServico: "/img/servico-suspensao-mecanico.webp",
  altServico: "Mecânico do Jura Auto Center, de costas, montando um conjunto de suspensão",
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
      texto: "Depois de mexer na suspensão, vale alinhar o carro. Fazemos aqui mesmo.",
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
      a: "Quando se mexe na suspensão, vale alinhar o carro. A gente faz o alinhamento aqui mesmo.",
    },
    duvidasComuns.extra,
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
  ],
  ctaFinal: ["Suspensão fazendo barulho?", "Vem pro Jura."],
};

/** Alinhamento e balanceamento (dono, 05/11/2026: o serviço mais procurado no Google não tinha página). */
export const alinhamento: PaginaServico = {
  rota: "/alinhamento-e-balanceamento",
  titulo: "Alinhamento e balanceamento em Araras",
  descricao:
    "Alinhamento e balanceamento em Araras/SP. Carro puxando, volante torto ou tremendo? Atendimento por ordem de chegada, sem hora marcada. Nota 4,9 no Google.",
  h1: ["Alinhamento e", "balanceamento", "em Araras"],
  lead: "Carro puxando, volante torto ou tremendo na estrada? A gente alinha e balanceia por ordem de chegada, e você sai com o carro andando reto.",
  whatsHref: whats("Olá! Vim pelo site e queria fazer alinhamento e balanceamento no meu carro."),
  fotoHero: "/img/oficina-elevadores.webp",
  fotoServico: "/img/servico-alinhamento.webp",
  altServico: "Aparelho de alinhamento preso na roda de um carro na oficina do Jura Auto Center",
  fotoPasso: "/img/alinhamento-fusca.webp",
  altPasso: "Fusca verde na rampa de alinhamento da oficina do Jura Auto Center",
  sinais: [
    "Carro puxando para um lado em reta",
    "Volante torto com o carro andando reto",
    "Volante tremendo em velocidade",
    "Pneu gastando só por dentro ou só por fora",
    "Depois de bater forte em buraco ou guia",
    "Depois de trocar pneu ou mexer na suspensão",
  ],
  sinaisNota: "Carro desalinhado gasta pneu mais rápido. Alinhar sai bem mais barato que trocar pneu antes da hora.",
  faz: [
    {
      icone: "/icons/alinhamento.png",
      titulo: "Alinhamento",
      texto: "Acertamos a geometria das rodas pra o carro andar reto e o pneu gastar por igual.",
    },
    {
      icone: "/icons/balanceamento.png",
      titulo: "Balanceamento das rodas",
      texto: "Roda balanceada acaba com a tremedeira no volante e poupa a suspensão.",
    },
    {
      icone: "/icons/pneus.png",
      titulo: "Olhada nos pneus",
      texto: "Com o carro no elevador, a gente olha o desgaste dos pneus e te avisa se tiver algo.",
    },
    {
      icone: "/icons/suspensao.png",
      titulo: "Suspensão em dia",
      texto: "Peça da suspensão folgada não deixa o alinhamento segurar. Se tiver, a gente mostra antes de fazer.",
    },
  ],
  depoimentos: ["Renato Curtolo", "Gedaias Oliveira", "Gabriela Chinalia de Sena"],
  duvidasTitulo: ["Dúvidas sobre", "alinhamento"],
  faq: [
    {
      q: "Qual a diferença entre alinhamento e balanceamento?",
      a: "O alinhamento acerta o ângulo das rodas: é o que resolve carro puxando e volante torto. O balanceamento acerta o peso de cada roda: é o que resolve volante tremendo. Os dois juntos deixam o carro firme e o pneu durando mais.",
    },
    {
      q: "De quanto em quanto tempo alinhar o carro?",
      a: "Sempre que trocar pneu, mexer na suspensão ou bater forte em buraco, e também quando sentir o carro puxando ou o volante torto. Fora isso, vale conferir a cada 10 mil km.",
    },
    {
      q: "Quanto tempo demora?",
      a: "É um serviço rápido. Como o atendimento é por ordem de chegada, a espera depende do movimento: chama no WhatsApp antes que a gente te fala como está a fila.",
    },
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
    duvidasComuns.estacionar,
  ],
  ctaFinal: ["Carro puxando?", "Vem pro Jura."],
};

/** Troca de óleo (dono, 24/11/2026: página simples, é pouco procurado; marcas grandes; flex, gasolina e etanol). */
export const oleo: PaginaServico = {
  rota: "/troca-de-oleo",
  titulo: "Troca de óleo em Araras: Mobil e Petronas",
  descricao:
    "Troca de óleo e filtro em Araras/SP com óleo Mobil, Petronas e outras marcas grandes, pra carro flex, gasolina e etanol. Sem hora marcada. Nota 4,9 no Google.",
  h1: ["Troca de óleo", "e filtro", "em Araras"],
  lead: "Óleo de marca grande, como Mobil e Petronas, no tipo certo pro seu carro flex, a gasolina ou a etanol. Troca do filtro junto e a próxima troca anotada pra você não esquecer.",
  whatsHref: whats("Olá! Vim pelo site e queria fazer troca de óleo no meu carro."),
  fotoHero: "/img/oficina-interior.webp",
  fotoServico: "/img/servico-oleo.webp",
  altServico: "Mecânico do Jura Auto Center colocando óleo Mobil no motor de um carro",
  fotoPasso: "/img/oficina-galpao-amplo.webp",
  altPasso: "Oficina do Jura Auto Center, onde é feita a troca de óleo",
  sinais: [
    "Passou a quilometragem da última troca",
    "Passou o tempo indicado no manual",
    "Luz do óleo acesa no painel",
    "Óleo escuro ou baixo na vareta",
    "Motor mais barulhento que o normal",
    "Não lembra quando foi a última troca",
  ],
  sinaisNota: "Óleo vencido gasta o motor por dentro. Trocar no prazo sai muito mais barato que consertar.",
  faz: [
    {
      icone: "/icons/oleo.png",
      titulo: "Óleo de marca grande",
      texto: "Mobil, Petronas e outras marcas conhecidas, na especificação que o seu carro pede.",
    },
    {
      icone: "/icons/oleo.png",
      titulo: "Filtro de óleo",
      texto: "Troca do filtro junto com o óleo, pra o óleo novo não trabalhar com sujeira velha.",
    },
    {
      icone: "/icons/revisao.png",
      titulo: "Próxima troca anotada",
      texto: "A gente registra a data e a quilometragem da próxima troca pra você ter o controle certo.",
    },
    {
      icone: "/icons/pneus.png",
      titulo: "Olhada geral",
      texto: "Com o carro no elevador, a gente olha pneus e suspensão e te avisa se tiver algo.",
    },
  ],
  depoimentos: ["Renato Curtolo", "Geraldo César Bergamin", "Gabriela Chinalia de Sena"],
  duvidasTitulo: ["Dúvidas sobre", "troca de óleo"],
  faq: [
    {
      q: "Vocês trocam óleo de carro flex?",
      a: "Sim. Trocamos óleo de carro flex, a gasolina e a etanol, sempre com o óleo na especificação que o fabricante pede.",
    },
    {
      q: "Qual óleo vocês usam?",
      a: "Trabalhamos com marcas grandes, como Mobil e Petronas. O tipo do óleo segue o manual do seu carro.",
    },
    {
      q: "De quanto em quanto tempo trocar o óleo?",
      a: "O prazo certo está no manual do carro, em quilometragem ou em tempo, o que vencer primeiro. Na troca, a gente anota a próxima pra você.",
    },
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
    duvidasComuns.estacionar,
  ],
  ctaFinal: ["Óleo vencendo?", "Vem pro Jura."],
};

/** Revisão (dono, 24/11/2026: checar suspensão, freios, pneus e o resto que a oficina já faz). */
export const revisao: PaginaServico = {
  rota: "/revisao",
  titulo: "Revisão do carro em Araras",
  descricao:
    "Revisão do carro em Araras/SP: suspensão, freios, pneus, alinhamento e óleo conferidos item por item, com o preço combinado antes. Nota 4,9 no Google.",
  h1: ["Revisão do carro", "item por item", "em Araras"],
  lead: "Antes de viajar ou quando o carro está pedindo atenção: a gente confere suspensão, freios, pneus e óleo, mostra o que está bom e o que precisa de cuidado, e só faz o serviço com o seu ok.",
  whatsHref: whats("Olá! Vim pelo site e queria fazer uma revisão no meu carro."),
  fotoHero: "/img/oficina-elevadores.webp",
  fotoServico: "/img/servico-suspensao-mecanico.webp",
  altServico: "Mecânico do Jura Auto Center conferindo a suspensão de um carro",
  fotoPasso: "/img/servico-freios-mecanico.webp",
  altPasso: "Mecânico do Jura Auto Center trabalhando no disco de freio de um carro",
  sinais: [
    "Vai pegar estrada ou viajar",
    "Comprou um carro usado",
    "Faz tempo que ninguém olha o carro",
    "Barulho novo na suspensão ou no freio",
    "Pneu gastando estranho",
    "Quer saber o que vai precisar trocar logo",
  ],
  sinaisNota: "Revisão em dia evita surpresa na estrada e deixa você planejar os gastos com calma.",
  faz: [
    {
      icone: "/icons/suspensao.png",
      titulo: "Suspensão e amortecedores",
      texto: "Conferimos peça por peça e falamos com sinceridade o que precisa de troca.",
    },
    {
      icone: "/icons/freios.png",
      titulo: "Freios",
      texto: "Pastilhas, discos, tambor e fluido: o estado real de cada um.",
    },
    {
      icone: "/icons/pneus.png",
      titulo: "Pneus, alinhamento e balanceamento",
      texto: "Desgaste, calibragem e se o carro está puxando ou tremendo.",
    },
    {
      icone: "/icons/oleo.png",
      titulo: "Óleo e filtro",
      texto: "Nível, prazo da troca e o filtro. Se estiver vencendo, já dá pra trocar.",
    },
  ],
  depoimentos: ["Alex Carciragui", "Gedaias Oliveira", "Renato Curtolo"],
  duvidasTitulo: ["Dúvidas sobre", "revisão"],
  faq: [
    {
      q: "O que vocês olham na revisão?",
      a: "Suspensão e amortecedores, freios, pneus, alinhamento, balanceamento, óleo e filtro. No fim você sabe o que está bom, o que precisa de troca agora e o que pode esperar.",
    },
    {
      q: "Sou obrigado a fazer tudo que aparecer?",
      a: "Não. A gente mostra o que encontrou e o preço de cada coisa, e você escolhe o que fazer. Nada é feito sem o seu ok.",
    },
    {
      q: "Quanto custa a revisão?",
      a: "Depende do carro e do que a revisão mostrar. Chama no WhatsApp com o modelo: a gente orienta e combina o valor antes de fazer.",
    },
    duvidasComuns.extra,
    duvidasComuns.agendar,
    duvidasComuns.parcelar,
  ],
  ctaFinal: ["Vai viajar?", "Revisa no Jura."],
};

export const paginasServico = [freios, suspensao, alinhamento, oleo, revisao] as const;
