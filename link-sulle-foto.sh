#!/bin/bash
# Permette di mettere un link su una foto dentro l'articolo: [[img2|https://...]]
set -e
python3 - <<'PY'
p = "app/(site)/blog/[slug]/page.tsx"
s = open(p, encoding="utf-8").read()
if "(?:\\|[^\\]\\s]+)?" in s:
    print("Gia' aggiornato, niente da fare.")
    raise SystemExit(0)

a = r'''  const parts = content.split(/(\[\[img\d+\]\]|\[\[video\d+\]\])/g);'''
b = r'''  const parts = content.split(/(\[\[img\d+(?:\|[^\]\s]+)?\]\]|\[\[video\d+\]\])/g);'''
assert a in s, "riga 1 non trovata"
s = s.replace(a, b)

a = r'''    const mImg = part.match(/^\[\[img(\d+)\]\]$/);
    if (mImg) {
      const idx = parseInt(mImg[1], 10) - 1;
      const src = extraImages[idx];
      if (!src) return null;
      return (
        <img
          key={i}
          src={src}'''
b = r'''    const mImg = part.match(/^\[\[img(\d+)(?:\|([^\]\s]+))?\]\]$/);
    if (mImg) {
      const idx = parseInt(mImg[1], 10) - 1;
      const src = extraImages[idx];
      if (!src) return null;
      const href = mImg[2] && /^https?:\/\//.test(mImg[2]) ? mImg[2] : null;
      const imgEl = (
        <img
          src={src}'''
assert a in s, "blocco 2 non trovato"
s = s.replace(a, b)

a = '''            margin: "20px 0",
          }}
        />
      );
    }
    const mVideo'''
b = '''            margin: href ? 0 : "20px 0",
          }}
        />
      );
      if (!href) return <span key={i}>{imgEl}</span>;
      return (
        <a
          key={i}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "block", margin: "20px 0" }}
        >
          {imgEl}
        </a>
      );
    }
    const mVideo'''
assert a in s, "blocco 3 non trovato"
s = s.replace(a, b)
open(p, "w", encoding="utf-8").write(s)
print("Fatto: ora [[img2|https://...]] mette il link sulla foto.")
PY
