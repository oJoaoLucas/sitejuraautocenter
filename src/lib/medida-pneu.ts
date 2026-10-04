/** Valida a escrita da medida, não a compatibilidade com o carro ou o estoque. */
export function normalizarMedidaPneu(valor: string): string | null {
  const texto = valor.trim().toUpperCase().replace(/,/g, ".");
  if (!texto || texto.length > 40) return null;

  // Passeio/utilitário: 185/65 R15, 205 55 16, LT225/75 R16 C, 205/55 ZR16 91V.
  const metrica = texto.match(/^(P|LT)?\s*(\d{3})\s*(?:\/|-|\s)\s*(\d{2,3})\s*(?:(ZR|R)|\/|-|\s)\s*(\d{2}(?:\.\d)?)\s*(C|LT)?(?:\s+(\d{2,3}(?:\/\d{2,3})?[A-Z]{1,2}))?(?:\s+(XL))?$/);
  if (metrica) {
    const [, prefixo = "", largura, perfil, construcao, aro, tipo = "", indice, extra] = metrica;
    if ([largura, perfil, aro].some((n) => Number(n) <= 0)) return null;
    const sufixo = [indice, extra].filter(Boolean).join(" ");
    return `${prefixo}${largura}/${perfil} ${construcao ?? "R"}${aro}${tipo}${sufixo ? ` ${sufixo}` : ""}`;
  }

  // Medidas que não trazem perfil: 185 R14 C, 7.50 R16.
  const semPerfil = texto.match(/^(P|LT)?\s*(\d{3}|\d{1,2}(?:\.\d{1,2})?)\s*R\s*(\d{2}(?:\.\d)?)\s*(C|LT)?$/);
  if (semPerfil) {
    const [, prefixo = "", largura, aro, tipo = ""] = semPerfil;
    if ([largura, aro].some((n) => Number(n) <= 0)) return null;
    return `${prefixo}${largura} R${aro}${tipo}`;
  }

  // Caminhonete em polegadas: 31x10.50 R15, também com vírgula ou símbolo ×.
  const polegadas = texto.match(/^(LT)?\s*(\d{2}(?:\.\d{1,2})?)\s*[X×]\s*(\d{1,2}(?:\.\d{1,2})?)\s*R\s*(\d{2}(?:\.\d)?)\s*(LT|C)?$/);
  if (polegadas) {
    const [, prefixo = "", diametro, largura, aro, tipo = ""] = polegadas;
    if ([diametro, largura, aro].some((n) => Number(n) <= 0)) return null;
    return `${prefixo}${diametro}x${largura} R${aro}${tipo}`;
  }
  return null;
}

/** Máscara do campo: a pessoa digita só os sete números e o campo monta "185/65 R15". */
export function mascararMedidaPneu(valor: string): string {
  const d = valor.replace(/\D/g, "").slice(0, 7);
  return d.slice(0, 3) + (d.length > 3 ? `/${d.slice(3, 5)}` : "") + (d.length > 5 ? ` R${d.slice(5)}` : "");
}

export function quantidadePneusValida(valor: string): boolean {
  return ["1", "2", "3", "4"].includes(valor);
}
