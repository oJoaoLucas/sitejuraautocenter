import assert from "node:assert/strict";
import { test } from "node:test";
import { comMarca, fonteDaUrl, marcaRef, paginaDoCaminho } from "../src/lib/origem.ts";

// O mesmo padrão que o Jurinha usa para separar a marca (n8n/nos/normalizar.ts, REF_SITE).
const REF_SITE = /\s*\[ref: ([a-z0-9-]{1,24}(?:\/[a-z0-9-]{1,24}){0,2})\]\s*$/;

test("descobre a fonte pelo endereço de entrada", () => {
  assert.equal(fonteDaUrl("?gclid=abc"), "ads");
  assert.equal(fonteDaUrl("?gbraid=x"), "ads");
  assert.equal(fonteDaUrl("?utm_source=google&utm_medium=cpc"), "ads");
  assert.equal(fonteDaUrl("?fbclid=1"), "meta");
  assert.equal(fonteDaUrl("?utm_source=instagram"), "meta");
  assert.equal(fonteDaUrl(""), null);
  assert.equal(fonteDaUrl("?utm_source=google&utm_medium=organic"), null);
});

test("página vira um nome curto que o Jurinha aceita", () => {
  assert.equal(paginaDoCaminho("/"), "home");
  assert.equal(paginaDoCaminho("/troca-de-oleo"), "troca-de-oleo");
  assert.equal(paginaDoCaminho("/alinhamento-e-balanceamento/"), "alinhamento-e-balanceame");
  assert.equal(paginaDoCaminho("/Pneus"), "pneus");
});

test("a marca vai no fim do texto do WhatsApp e o Jurinha consegue ler", () => {
  const href = "https://wa.me/5519997818371?text=Ol%C3%A1!%20Vim%20pelo%20site";
  const marcado = comMarca(href, marcaRef("ads", "/pneus"));
  const texto = new URL(marcado).searchParams.get("text");
  assert.equal(texto, "Olá! Vim pelo site [ref: pneus/ads]");
  assert.equal(REF_SITE.exec(texto)[1], "pneus/ads");
  // Não marca duas vezes.
  assert.equal(comMarca(marcado, marcaRef("ads", "/pneus")), marcado);
});

test("visita orgânica e links que não são WhatsApp ficam iguais", () => {
  const href = "https://wa.me/5519997818371?text=Oi";
  assert.equal(comMarca(href, marcaRef(null, "/pneus")), href);
  assert.equal(comMarca("tel:+551933513004", marcaRef("ads", "/")), "tel:+551933513004");
});
