import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// Integração com o HTML real do build. Rodar npm run build antes desta suíte.
test("export nasce sem terceiros opcionais e com contato seguro sem JavaScript", () => {
  for (const pagina of ["index", "pneus", "historia", "privacidade"]) {
    const html = readFileSync(new URL(`../out/${pagina}.html`, import.meta.url), "utf8");
    assert.equal(/<iframe\b/i.test(html), false, `${pagina}: mapa antes de autorizar`);
    assert.equal(/<script\b[^>]*src="https?:\/\/[^\"]*(googletagmanager|googleadservices)/i.test(html), false, `${pagina}: tag antes de autorizar`);
    assert.match(html, /<main\b[^>]*id="conteudo"[^>]*tabindex="-1"/i);
    assert.match(html, />Cookies<\/button>/);
    if (pagina === "index" || pagina === "pneus") {
      const formulario = html.match(/<form\b[\s\S]*?<\/form>/)?.[0];
      assert.ok(formulario, pagina);
      assert.match(formulario, /<button\b(?=[^>]*type="submit")(?=[^>]*disabled="")[^>]*>/);
      assert.match(formulario, /<input\b(?=[^>]*name="medida")(?=[^>]*disabled="")[^>]*>/);
      assert.match(formulario, /<select\b(?=[^>]*name="qtd")(?=[^>]*disabled="")[^>]*>/);
      assert.match(formulario, /<noscript>[\s\S]*?href="https:\/\/wa\.me\//);
    }
  }
});
