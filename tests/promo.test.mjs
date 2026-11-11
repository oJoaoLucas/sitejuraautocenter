import assert from "node:assert/strict";
import { test } from "node:test";
import { blackNovember, promoAtiva } from "../src/lib/promo.ts";

test("Black November vale até o fim de 30/11 (horário de Brasília) e some sozinha em 01/12", () => {
  assert.equal(promoAtiva(new Date("2026-11-11T12:00:00-03:00")), true);
  assert.equal(promoAtiva(new Date("2026-11-30T23:59:59-03:00")), true);
  assert.equal(promoAtiva(new Date("2026-12-01T00:00:00-03:00")), false);
  assert.equal(promoAtiva(new Date("2027-01-10T12:00:00-03:00")), false);
});

test("a mensagem da faixa é a mesma do anúncio (o Jurinha reconhece por ela)", () => {
  assert.equal(blackNovember.mensagem, "Quero o preço do pneu da Black November");
});
