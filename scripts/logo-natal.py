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


def com_gorro(logo, opacidade_sombra=0.45):
    """Põe o gorro no A de um logo 1200x521 (mesmo desenho do Brand Book)."""
    g = gorro(205, 150).rotate(-12, resample=Image.BICUBIC, expand=True)
    # Sombra suave embaixo do gorro, pra descolar do fundo.
    sombra = Image.new("RGBA", g.size, (0, 0, 0, 0))
    sombra.putalpha(g.split()[3].point(lambda a: int(a * opacidade_sombra)))
    sombra = sombra.filter(ImageFilter.GaussianBlur(6))
    # Topo do A fica em x≈955–1055, y≈100 (logo 1200x521).
    x, y = 918, -2
    logo.alpha_composite(sombra, (x + 4, y + 8))
    logo.alpha_composite(g, (x, y))
    return logo


CORES_LUZ = [(229, 48, 76), (255, 196, 0), (46, 170, 90), (70, 150, 255)]


def pisca_pisca(tela):
    """Varalzinho de luzes de Natal pendurado em cima do logo, na parte branca do círculo (dono, 28/11:
    "só um varalzinho em cima")."""
    import math
    lado = tela.size[0]
    W = lado * S
    camada = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    brilho = Image.new("RGBA", (W, W), (0, 0, 0, 0))
    d = ImageDraw.Draw(camada)
    db = ImageDraw.Draw(brilho)
    x0, x1, y0, barriga = 250, 830, 215, 55  # ponta a ponta, altura das pontas e quanto o fio desce no meio
    def fio(t):
        return (x0 + (x1 - x0) * t) * S, (y0 + barriga * math.sin(math.pi * t)) * S
    d.line([fio(i / 200) for i in range(201)], fill=(45, 70, 45, 255), width=int(4 * S), joint="curve")
    n = 8
    for k in range(n):
        x, y = fio((k + 0.5) / n)
        cor = CORES_LUZ[k % len(CORES_LUZ)]
        r = 11 * S
        bx, by = x, y + 20 * S
        db.ellipse([bx - r * 2.6, by - r * 2.6, bx + r * 2.6, by + r * 2.6], fill=cor + (90,))
        d.rectangle([x - 5 * S, y, x + 5 * S, y + 9 * S], fill=(80, 90, 80, 255))
        d.ellipse([bx - r, by - r * 1.3, bx + r, by + r * 1.3], fill=cor + (255,))
        d.ellipse([bx - r * 0.5 - 3 * S, by - r * 0.8, bx - r * 0.5 + 3 * S, by - r * 0.1], fill=(255, 255, 255, 170))
    brilho = brilho.filter(ImageFilter.GaussianBlur(14 * S))
    camada = Image.alpha_composite(brilho, camada).resize((lado, lado), Image.LANCZOS)
    tela.alpha_composite(camada)


def foto_whatsapp():
    """Foto do perfil do WhatsApp (o modelo de sempre: fundo branco, pneu e chave pretos, JURA vermelho)
    com o gorro. 1080x1080; o WhatsApp corta em círculo, então o logo fica dentro da área segura."""
    base = Image.open(RAIZ / "public/logo/jura-fachada.png").convert("RGBA")
    px = base.load()
    w, h = base.size
    vermelho = (210, 26, 20, 255)
    # O miolo das letras JURA é branco opaco (fundo é transparente): pinta de vermelho.
    for yy in range(0, 318):
        for xx in range(250, w):
            r, gg, b, a = px[xx, yy]
            if a > 200 and r > 200 and gg > 200 and b > 200:
                px[xx, yy] = vermelho
    logo = com_gorro(base, 0.3)
    lado = 1080
    tela = Image.new("RGBA", (lado, lado), (255, 255, 255, 255))
    largura = 960
    alto = round(logo.size[1] * largura / logo.size[0])
    logo = logo.resize((largura, alto), Image.LANCZOS)
    tela.alpha_composite(logo, ((lado - largura) // 2, (lado - alto) // 2 + 10))
    pisca_pisca(tela)
    destino = RAIZ / "public/logo/whatsapp-natal.png"
    tela.convert("RGB").save(destino)
    print("ok", destino)


def main():
    logo = com_gorro(Image.open(ORIGEM).convert("RGBA"))
    logo.save(DESTINO)
    print("ok", DESTINO, logo.size)
    foto_whatsapp()


if __name__ == "__main__":
    main()
