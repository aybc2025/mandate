"""Mandate app icons.

Concept: the Knesset hemicycle — the same seating chart that anchors the app.
White seat dots in a half-circle on flag blue; the left half (a majority) is
solid, the rest faint, and a red tick marks the 61-seat line at the top.
Small sizes (<=48px) use a simplified mark: a thick white half-ring + red tick.

Run:  python3 icon-design/make_icons.py   (writes into public/icons/)
"""
import math
from pathlib import Path
from PIL import Image, ImageDraw

BLUE = (0, 56, 184, 255)
WHITE = (255, 255, 255, 255)
FAINT = (255, 255, 255, 90)
RED = (255, 92, 84, 255)   # brighter than UI signal-red so it reads on blue
OUT = Path(__file__).resolve().parent.parent / "public" / "icons"
S = 4096  # draw at 8x the largest target, then downsample


def hemicycle(draw, cx, cy, R, rows=4, lit_fraction=0.53, dot_scale=0.07):
    inner = 0.5
    radii = [inner + (1 - inner) * i / (rows - 1) for i in range(rows)]
    total = 48
    counts = [round(total * r / sum(radii)) for r in radii]
    pts = []
    for r, n in zip(radii, counts):
        for k in range(n):
            a = math.pi - math.pi * k / (n - 1)
            pts.append((a, r))
    pts.sort(key=lambda p: (-p[0], p[1]))
    lit = round(len(pts) * lit_fraction)
    d = R * dot_scale
    for i, (a, r) in enumerate(pts):
        x, y = cx + math.cos(a) * r * R, cy - math.sin(a) * r * R
        draw.ellipse([x - d, y - d, x + d, y + d], fill=WHITE if i < lit else FAINT)
    # 61 line: red tick just above the outer row at the top centre
    w = R * 0.045
    draw.rounded_rectangle([cx - w, cy - R * 1.34, cx + w, cy - R * 1.12], radius=w, fill=RED)


def full_icon(content_scale):
    img = Image.new("RGBA", (S, S), BLUE)
    layer = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    R = S * 0.36 * content_scale
    hemicycle(d, S / 2, S / 2 + R * 0.6, R)
    return Image.alpha_composite(img, layer)


def small_icon():
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=S * 0.2, fill=BLUE,
                        outline=(255, 255, 255, 70), width=int(S * 0.02))
    cx, cy, R, t = S / 2, S * 0.74, S * 0.36, S * 0.13
    d.pieslice([cx - R, cy - R, cx + R, cy + R], 180, 360, fill=WHITE)
    r2 = R - t
    d.pieslice([cx - r2, cy - r2, cx + r2, cy + r2], 180, 360, fill=BLUE)
    w = S * 0.045
    d.rounded_rectangle([cx - w, cy - R - S * 0.1, cx + w, cy - r2 + S * 0.02], radius=w, fill=RED)
    return img


def save(img, size, name):
    img.resize((size, size), Image.LANCZOS).save(OUT / name, optimize=True)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    regular = full_icon(1.0)
    maskable = full_icon(0.72)  # keep everything inside the ~72% safe circle
    save(regular, 512, "icon-512.png")
    save(regular, 192, "icon-192.png")
    save(regular, 180, "apple-touch-icon.png")
    save(maskable, 512, "icon-512-maskable.png")
    save(small_icon(), 32, "favicon-32.png")
    print("icons written to", OUT)
