import assert from "node:assert/strict";
import { test } from "node:test";
import { MENSAGEM_REVISAO, campanhaDoDia, ehNatal, ehViagem } from "../src/lib/epoca.ts";

const dia = (iso) => campanhaDoDia(new Date(iso))?.id ?? null;

test("o calendário troca sozinho pela data (horário de Brasília)", () => {
  assert.equal(dia("2026-11-30T23:59:59-03:00"), "black");
  assert.equal(dia("2026-12-01T00:00:00-03:00"), "viagem");
  assert.equal(dia("2026-12-17T23:59:00-03:00"), "viagem");
  assert.equal(dia("2026-12-18T08:00:00-03:00"), "ultima-semana");
  assert.equal(dia("2026-12-25T10:00:00-03:00"), "natal");
  assert.equal(dia("2026-12-28T10:00:00-03:00"), "festas");
  assert.equal(dia("2027-01-02T10:00:00-03:00"), "ano-novo");
  assert.equal(dia("2027-01-10T10:00:00-03:00"), "volta");
  assert.equal(dia("2027-01-21T00:00:00-03:00"), null);
  assert.equal(dia("2026-10-15T10:00:00-03:00"), null);
});

test("gorro no logo de 01/12 a 06/01; checklist de viagem só em dezembro (sem o dia 25)", () => {
  assert.equal(ehNatal("black"), false);
  assert.equal(ehNatal("viagem"), true);
  assert.equal(ehNatal("ano-novo"), true);
  assert.equal(ehNatal("volta"), false);
  assert.equal(ehViagem("viagem"), true);
  assert.equal(ehViagem("natal"), false);
  assert.equal(ehViagem("festas"), true);
  assert.equal(ehViagem(null), false);
});

test("a mensagem de dezembro mantém 'Vim pelo site' e diz REVISÃO DE FIM DE ANO, sem preço", () => {
  assert.match(MENSAGEM_REVISAO, /Vim pelo site/);
  assert.match(MENSAGEM_REVISAO, /REVISÃO DE FIM DE ANO/);
  assert.doesNotMatch(MENSAGEM_REVISAO, /R\$|sem juros/i);
});
