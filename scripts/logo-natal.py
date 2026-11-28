"""Gera o logo de Natal: gorro de Papai Noel em cima do A do JURA (28/11/2026).

Uso: python scripts/logo-natal.py
Lê public/logo/jura-uniforme.png e grava public/logo/jura-uniforme-natal.png (mesmo tamanho).
Desenha em 4x e reduz, pra borda sair lisa.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

RAIZ = Path(__file__).resolve().parent.parent
ORIGEM = RAIZ / "public/logo/jura-uniforme.png"
DESTINO = RAIZ / "public/logo/jura-uniforme-natal.png"

S = 4  # supersampling
VERMELHO = (200, 16, 46, 255)
VERMELHO_ESCURO = (128, 8, 28, 255)
BRANCO = (255, 255, 255, 255)
SOMBRA_PELO = (214, 220, 228, 255)


def bezier(p0, p1, p2, p3, n=60):
    pts = []
    for i in range(n + 1):
        t = i / n
        a = (1 - t) ** 3
        b = 3 * (1 - t) ** 2 * t
        c = 3 * (1 - t) * t ** 2
        d = t ** 3
        pts.append((a * p0[0] + b * p1[0] + c * p2[0] + d * p3[0], a * p0[1] + b * p1[1] + c * p2[1] + d * p3[1]))
    return pts


def gorro(w, h):
    """Gorro num quadro w x h (coordenadas em escala 1), retorna RGBA."""
    W, H = w * S, h * S
    im = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(im)
    k = lambda x, y: (x * S, y * S)

    # Corpo vermelho: base larga embaixo, ponta caindo pra direita.
    base_esq, base_dir = (18, 112), (168, 112)
    ponta = (205, 70)
    contorno = (
        bezier(base_esq, (30, 40), (95, 2), (160, 18))
        + bezier((160, 18), (190, 26), (205, 48), ponta)
        + bezier(ponta, (178, 58), (160, 70), base_dir)
    )
    d.polygon([k(*p) for p in contorno], fill=VERMELHO)

    # Sombra do lado direito (dobra do pano).
    dobra = bezier((112, 112), (128, 70), (150, 40), (172, 28)) + bezier((172, 28), (186, 50), (165, 72), base_dir)
    camada = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    ImageDraw.Draw(camada).polygon([k(*p) for p in dobra], fill=VERMELHO_ESCURO[:3] + (120,))
    im = Image.alpha_composite(im, camada)
    d = ImageDraw.Draw(im)

    # Pelinho branco (barra fofa com bolinhas).
    d.rounded_rectangle([k(6, 98), k(180, 134)], radius=18 * S, fill=BRANCO)
    for x in range(14, 176, 16):
        d.ellipse([k(x - 9, 94), k(x + 9, 112)], fill=BRANCO)
        d.ellipse([k(x - 9, 120), k(x + 9, 138)], fill=BRANCO)
    d.rounded_rectangle([k(10, 122), k(176, 132)], radius=6 * S, fill=SOMBRA_PELO)
    for x in range(14, 176, 16):
        d.ellipse([k(x - 9, 118), k(x + 9, 134)], fill=BRANCO)

    # Pompom.
    d.ellipse([k(ponta[0] - 17, ponta[1] - 10), k(ponta[0] + 17, ponta[1] + 24)], fill=BRANCO)
    d.ellipse([k(ponta[0] - 7, ponta[1] + 8), k(ponta[0] + 15, ponta[1] + 22)], fill=SOMBRA_PELO)
    d.ellipse([k(ponta[0] - 15, ponta[1] - 8), k(ponta[0] + 11, ponta[1] + 16)], fill=BRANCO)

    im = im.resize((w, h), Image.LANCZOS)
    return im


def main():
    logo = Image.open(ORIGEM).convert("RGBA")
    g = gorro(205, 150).rotate(-12, resample=Image.BICUBIC, expand=True)
    # Sombra suave embaixo do gorro, pra descolar do fundo escuro.
    sombra = Image.new("RGBA", g.size, (0, 0, 0, 0))
    sombra.putalpha(g.split()[3].point(lambda a: int(a * 0.45)))
    sombra = sombra.filter(ImageFilter.GaussianBlur(6))
    # Topo do A fica em x≈955–1055, y≈100 (logo 1200x521).
    x, y = 918, -2
    logo.alpha_composite(sombra, (x + 4, y + 8))
    logo.alpha_composite(g, (x, y))
    logo.save(DESTINO)
    print("ok", DESTINO, logo.size)


if __name__ == "__main__":
    main()
