"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useRef } from "react";

/**
 * Linha do tempo com a linha vermelha se desenhando conforme a leitura.
 * Motivo: o traço avançando é a própria metáfora da passagem do tempo.
 * Usa useScroll do Motion, não listener de scroll: sem trabalho por frame.
 */

const marcos = [
  {
    data: "15 de junho de 2019",
    titulo: "O começo de um sonho",
    texto:
      "No dia do próprio aniversário do Jura, nascia também o Jura Auto Center. A primeira loja abriu na Avenida Loreto, 829, com estrutura simples e o objetivo de conquistar a confiança de Araras, um carro de cada vez.",
    foto: {
      src: "/img/loja-antiga.webp",
      alt: "A primeira loja do Jura Auto Center",
    },
  },
  {
    data: "2020",
    titulo: "Superação durante a pandemia",
    texto:
      "Ainda nos primeiros passos, veio um dos períodos mais difíceis dos últimos tempos. Com responsabilidade e os cuidados necessários, o Jura manteve as portas abertas pra atender quem dependia do carro pra trabalhar e cuidar da família.",
  },
  {
    data: "2021 a 2023",
    titulo: "Crescimento e especialização",
    texto:
      "A confiança dos clientes aumentou e a equipe cresceu junto, com gente nova se especializando em alinhamento e balanceamento, suspensão, freios, pneus nacionais e importados, troca de óleo e manutenção geral.",
  },
  {
    data: "14 de fevereiro de 2024",
    titulo: "Uma nova loja",
    texto:
      "O crescimento pediu uma estrutura maior. O Jura ficou na mesma avenida, mudando só do número 829 para o 889: mais espaço, mais elevador, mais organização, pra atender com o mesmo cuidado de sempre.",
    foto: {
      src: "/img/fachada.webp",
      alt: "Fachada da loja nova do Jura Auto Center, na Avenida Loreto, 889",
    },
  },
  {
    data: "Hoje",
    titulo: "Mais de dez mil carros atendidos",
    texto:
      "Com uma equipe maior e mais preparada, o Jura Auto Center segue atendendo com qualidade, honestidade e segurança, sem abandonar os valores que deram início a essa história.",
  },
];

export function Timeline() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 65%"],
  });
  const altura = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative mt-8 pl-10 lg:mt-12 lg:pl-13">
      {/* Trilho apagado */}
      <span
        aria-hidden="true"
        className="absolute top-2 bottom-2 left-[9px] w-0.5 bg-line lg:left-[13px]"
      />
      {/* Trilho vermelho que se desenha */}
      <motion.span
        aria-hidden="true"
        style={{ scaleY: reduce ? 1 : altura }}
        className="absolute top-2 bottom-2 left-[9px] w-0.5 origin-top bg-[linear-gradient(180deg,var(--color-jura),var(--color-jura-strong))] lg:left-[13px]"
      />

      {marcos.map((m, i) => (
        <li key={m.data} className="relative pb-9 last:pb-0 lg:pb-13">
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { backgroundColor: "#141414", borderColor: "#333333" }}
            whileInView={{ backgroundColor: "#c8102e", borderColor: "#c8102e" }}
            viewport={{ once: true, amount: 1, margin: "0px 0px -25% 0px" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-1.5 -left-10 size-5 rounded-full border-2 lg:-left-13 lg:size-7"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="mb-2 block font-ui text-[0.78rem] font-extrabold tracking-[0.12em] text-jura-title uppercase">
              {m.data}
            </span>
            <h3 className="mb-2.5 font-display text-[1.75rem] tracking-[0.02em] uppercase">
              {m.titulo}
            </h3>
            <p className="max-w-[62ch] leading-relaxed text-muted">{m.texto}</p>

            {m.foto && (
              <figure className="mt-5 max-w-xl overflow-hidden rounded-md border border-line">
                <Image
                  src={m.foto.src}
                  alt={m.foto.alt}
                  width={1000}
                  height={563}
                  sizes="(max-width: 768px) 100vw, 34rem"
                  className="aspect-video w-full object-cover"
                />
              </figure>
            )}
          </motion.div>
        </li>
      ))}
    </ol>
  );
}
