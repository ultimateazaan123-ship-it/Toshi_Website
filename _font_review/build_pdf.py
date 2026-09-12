# -*- coding: utf-8 -*-
"""Builds the Toshi headline-font showcase PDF."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.utils import ImageReader

HERE = os.path.dirname(os.path.abspath(__file__))
SUBSET = os.path.join(HERE, 'subset')
OUT = os.path.abspath(os.path.join(HERE, '..', 'Toshi-Headline-Fonts.pdf'))

INK = HexColor('#14110d')
INK_SOFT = HexColor('#3a332a')
GOLD = HexColor('#a1854f')
GOLD_LINE = HexColor('#c9a876')
CREAM = HexColor('#f3ead9')
STAMP = HexColor('#8c2a26')

W, H = A4  # 595.27 x 841.89 pt

# ---- Register fonts ----
pdfmetrics.registerFont(TTFont('ShipporiMincho', os.path.join(SUBSET, 'ShipporiMincho-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('ZenOldMincho', os.path.join(SUBSET, 'ZenOldMincho-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('NotoSerifJP', os.path.join(SUBSET, 'NotoSerifJP-Bold.ttf')))
pdfmetrics.registerFont(TTFont('CormorantGaramond', os.path.join(SUBSET, 'CormorantGaramond-SemiBold.ttf')))
pdfmetrics.registerFont(TTFont('Marcellus', os.path.join(SUBSET, 'Marcellus-Regular.ttf')))

FONTS = [
    {
        'family': 'ShipporiMincho',
        'name': 'Shippori Mincho',
        'weight': 'SemiBold · 600',
        'note': 'Der aktuell auf der Website verwendete Font. Ruhige, japanische Mincho-Anmutung — '
                'elegant und zurückhaltend edel. Guter Grundton, wirkt bei sehr großen Größen aber '
                'vergleichsweise zart.',
    },
    {
        'family': 'ZenOldMincho',
        'name': 'Zen Old Mincho',
        'weight': 'SemiBold · 600',
        'note': 'Traditioneller und kalligrafischer als Shippori Mincho. Wirkt handwerklich, warm und '
                'noch hochwertiger — passt zu einem Washi-Papier-Gefühl und feiner Gastronomie.',
    },
    {
        'family': 'NotoSerifJP',
        'name': 'Noto Serif JP',
        'weight': 'Bold · 700',
        'note': 'Kräftiger, moderner japanischer Serif mit deutlich mehr Präsenz in großen Formaten. '
                'Gute Wahl, wenn die Headline mehr Gewicht und Kontrast zu den hellen Fotos haben soll.',
    },
    {
        'family': 'CormorantGaramond',
        'name': 'Cormorant Garamond',
        'weight': 'SemiBold · 600',
        'note': 'Elegante, westliche Garamond-Variante mit hohem Strichkontrast. Sehr „Fine Dining“ '
                'und editorial, aber ohne japanischen Bezug — bereits als Akzentschrift im Einsatz.',
    },
    {
        'family': 'Marcellus',
        'name': 'Marcellus',
        'weight': 'Regular · 400 (einzige Schnittstärke)',
        'note': 'Klare, ruhige Antiqua mit Luxus-Anmutung, wie bei westlichen Editorial-Marken. '
                'Zeitlos und zurückhaltend, aber ohne jeden japanischen Bezug.',
    },
]

TAGLINE = 'Asiatisch · Authentisch · Anders'
HEADLINE = 'Toshi'
SUBLINE = 'Wenn Sushi, dann Toshi.'
SMALLLINE = 'Sushi & Asia Küche — Freital'


def tracked_text(c, x, y, text, font, size, color, tracking, center_on=None):
    """Draw text with real letter-spacing via a PDF text object, optionally centered.
    charSpace is part of the PDF graphics state and otherwise leaks into later
    drawString() calls, so this scopes it with save/restoreState."""
    width = pdfmetrics.stringWidth(text, font, size) + tracking * max(0, len(text) - 1)
    if center_on is not None:
        x = center_on - width / 2
    c.saveState()
    t = c.beginText(x, y)
    t.setFont(font, size)
    t.setFillColor(color)
    t.setCharSpace(tracking)
    t.textOut(text)
    c.drawText(t)
    c.restoreState()


def centered(c, y, text, font, size, color):
    width = pdfmetrics.stringWidth(text, font, size)
    c.setFont(font, size)
    c.setFillColor(color)
    c.drawString((W - width) / 2, y, text)


def hairline(c, y, x0=56, x1=None, color=GOLD_LINE, width=0.6):
    x1 = x1 if x1 is not None else W - 56
    c.setStrokeColor(color)
    c.setLineWidth(width)
    c.line(x0, y, x1, y)


def diamond(c, x, y, size=2.6, color=GOLD):
    c.saveState()
    c.translate(x, y)
    c.rotate(45)
    c.setFillColor(color)
    c.rect(-size / 2, -size / 2, size, size, fill=1, stroke=0)
    c.restoreState()


def ornament(c, cx, y):
    diamond(c, cx, y)
    hairline(c, y, x0=cx - 90, x1=cx - 12)
    hairline(c, y, x0=cx + 12, x1=cx + 90)


def footer(c, page_label):
    tracked_text(c, 56, 34, 'TOSHI SUSHI & ASIA KÜCHE · SCHRIFTAUSWAHL HEADLINE', 'Helvetica', 7.6, INK_SOFT, 1.6)
    c.setFont('Helvetica', 7.6)
    c.setFillColor(INK_SOFT)
    c.drawRightString(W - 56, 34, page_label)


# ==================================================================
c = canvas.Canvas(OUT, pagesize=A4)

# ---------------- COVER PAGE ----------------
c.setFillColor(CREAM)
c.rect(0, 0, W, H, fill=1, stroke=0)

logo = ImageReader(os.path.join(SUBSET, 'toshi_logo.png'))
logo_w, logo_h = 96, 96 * (297 / 320)
c.drawImage(logo, (W - logo_w) / 2, H - 200, width=logo_w, height=logo_h, mask='auto')

tracked_text(c, 0, H - 250, 'SCHRIFTAUSWAHL FÜR DIE HEADLINE', 'Helvetica', 8.6, GOLD, 2.6, center_on=W / 2)

centered(c, H - 400, HEADLINE, 'ShipporiMincho', 92, INK)

ornament(c, W / 2, H - 440)

tracked_text(c, 0, H - 468, TAGLINE.upper(), 'Helvetica', 9.5, INK_SOFT, 2.4, center_on=W / 2)

c.setFont('Helvetica', 10.5)
c.setFillColor(INK_SOFT)
intro = [
    'Fünf Vorschläge für die große Überschrift-Schrift der Website — jede auf einer',
    'eigenen Seite in echter Einsatzgröße, mit Beispieltexten aus dem aktuellen Auftritt.',
]
ty = H - 520
for line in intro:
    lw = pdfmetrics.stringWidth(line, 'Helvetica', 10.5)
    c.drawString((W - lw) / 2, ty, line)
    ty -= 16

hairline(c, 150, x0=W / 2 - 70, x1=W / 2 + 70)
label = 'Dresdner Str. 106 · 01705 Freital'
tracked_text(c, 0, 128, label, 'Helvetica', 8.5, STAMP, 1.2, center_on=W / 2)

footer(c, 'COVER')
c.showPage()

# ---------------- ONE PAGE PER FONT ----------------
for i, f in enumerate(FONTS, start=1):
    fam = f['family']
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, fill=1, stroke=0)

    # Header meta row
    tag = f'SCHRIFTART {i} VON {len(FONTS)}'
    tracked_text(c, 56, H - 84, tag, 'Helvetica', 8, GOLD, 2.4)
    wtext = f['weight'].upper()
    wwidth = pdfmetrics.stringWidth(wtext, 'Helvetica', 8.6) + 1 * (len(wtext) - 1)
    tracked_text(c, W - 56 - wwidth, H - 84, wtext, 'Helvetica', 8.6, INK_SOFT, 1)

    hairline(c, H - 96)

    # Font display name (set in itself)
    c.setFont(fam, 26)
    c.setFillColor(INK)
    c.drawString(56, H - 140, f['name'])

    # Big headline example
    c.setFont(fam, 118)
    c.setFillColor(INK)
    c.drawString(52, H - 300, HEADLINE)

    # Subline
    c.setFont(fam, 30)
    c.setFillColor(INK)
    c.drawString(56, H - 350, SUBLINE)

    # Tagline (tracked, gold)
    tracked_text(c, 56, H - 392, TAGLINE, fam, 15, GOLD, 1.4)

    # Small line
    c.setFont(fam, 12.5)
    c.setFillColor(INK_SOFT)
    c.drawString(56, H - 420, SMALLLINE)

    hairline(c, H - 460)

    # Curatorial note
    tracked_text(c, 56, H - 486, 'EINSCHÄTZUNG', 'Helvetica', 7.6, GOLD, 2.2)
    c.setFont('Helvetica', 10.3)
    c.setFillColor(INK_SOFT)

    # simple word-wrap for the note within the text column width
    max_width = W - 112
    words = f['note'].split(' ')
    line = ''
    ny = H - 506
    for word in words:
        trial = (line + ' ' + word).strip()
        if pdfmetrics.stringWidth(trial, 'Helvetica', 10.3) > max_width:
            c.drawString(56, ny, line)
            ny -= 15.5
            line = word
        else:
            line = trial
    if line:
        c.drawString(56, ny, line)

    footer(c, f'{i:02d} / {len(FONTS):02d}')
    c.showPage()

# ---------------- SUMMARY / COMPARISON PAGE ----------------
c.setFillColor(INK)
c.rect(0, 0, W, H, fill=1, stroke=0)

tracked_text(c, 0, H - 100, 'ÜBERSICHT', 'Helvetica', 9, GOLD_LINE, 3, center_on=W / 2)
centered(c, H - 150, 'Auf einen Blick', 'ShipporiMincho', 34, CREAM)
hairline(c, H - 176, color=HexColor('#3a332a'))

rows_y = H - 230
row_h = 92
for i, f in enumerate(FONTS):
    y = rows_y - i * row_h
    c.setFont(f['family'], 30)
    c.setFillColor(CREAM)
    c.drawString(56, y, HEADLINE)

    c.setFont('Helvetica-Bold', 11.5)
    c.setFillColor(GOLD_LINE)
    c.drawString(220, y + 9, f['name'])

    c.setFont('Helvetica', 8.6)
    c.setFillColor(HexColor('#a89a83'))
    c.drawString(220, y - 6, f['weight'])

    # short one-line character tag
    c.setFont('Helvetica-Oblique', 9)
    c.setFillColor(HexColor('#cfc4ab'))
    tags = {
        'ShipporiMincho': 'aktuell im Einsatz · ruhig, zart',
        'ZenOldMincho': 'kalligrafisch · handwerklich, warm',
        'NotoSerifJP': 'kräftig · mehr Präsenz & Kontrast',
        'CormorantGaramond': 'westlich · editorial, Fine-Dining',
        'Marcellus': 'westlich · klar, zeitlos, Luxus-Antiqua',
    }
    c.drawString(220, y - 20, tags.get(f['family'], ''))

    if i < len(FONTS) - 1:
        hairline(c, y - 38, color=HexColor('#26211a'))

footer(c, 'ÜBERSICHT')
c.showPage()

c.save()
print('Saved:', OUT)
