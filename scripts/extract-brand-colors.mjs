/**
 * Extract dominant non-near-white/near-black colors from brand assets.
 * Usage: node scripts/extract-brand-colors.mjs
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const ASSETS = [
  "public/images/brand/logo2.gif",
  "public/images/brand/alpak.gif",
  "public/images/brand/12.jpg",
];

function rgbToHex(r, g, b) {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

function luminance(r, g, b) {
  const srgb = [r, g, b].map((c) => {
    const v = c / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(a, b) {
  const L1 = luminance(...a);
  const L2 = luminance(...b);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function quantize(r, g, b, step = 16) {
  return [
    Math.round(r / step) * step,
    Math.round(g / step) * step,
    Math.round(b / step) * step,
  ];
}

function isNearWhite(r, g, b) {
  return r > 235 && g > 235 && b > 235;
}

function isNearBlack(r, g, b) {
  return r < 25 && g < 25 && b < 25;
}

function isNearGray(r, g, b) {
  return Math.abs(r - g) < 18 && Math.abs(g - b) < 18 && Math.abs(r - b) < 18;
}

async function sampleFile(filePath) {
  const abs = path.join(ROOT, filePath);
  if (!fs.existsSync(abs)) return [];
  const { data, info } = await sharp(abs)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const counts = new Map();
  for (let i = 0; i < data.length; i += info.channels) {
    const a = info.channels === 4 ? data[i + 3] : 255;
    if (a < 200) continue;
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (isNearWhite(r, g, b) || isNearBlack(r, g, b)) continue;
    const [qr, qg, qb] = quantize(r, g, b, 12);
    const key = `${qr},${qg},${qb}`;
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([key, count]) => {
      const [r, g, b] = key.split(",").map(Number);
      return { r, g, b, count, hex: rgbToHex(r, g, b), gray: isNearGray(r, g, b) };
    })
    .sort((a, b) => b.count - a.count);
}

function darken([r, g, b], factor = 0.72) {
  return [
    Math.round(r * factor),
    Math.round(g * factor),
    Math.round(b * factor),
  ];
}

async function main() {
  const byFile = {};
  const merged = new Map();

  for (const file of ASSETS) {
    const colors = await sampleFile(file);
    byFile[file] = colors.slice(0, 12);
    for (const c of colors) {
      const prev = merged.get(c.hex) || { ...c, count: 0 };
      prev.count += c.count;
      merged.set(c.hex, prev);
    }
  }

  const ranked = [...merged.values()].sort((a, b) => b.count - a.count);
  const chromatic = ranked.filter((c) => !c.gray);
  const neutrals = ranked.filter((c) => c.gray);

  const brand =
    chromatic[0] ||
    neutrals.find((c) => luminance(c.r, c.g, c.b) < 0.45) ||
    ranked[0];

  let brandRgb = [brand.r, brand.g, brand.b];
  let brandStrong = darken(brandRgb, 0.7);
  // Ensure white text contrast >= 4.5
  while (contrastRatio(brandStrong, [255, 255, 255]) < 4.5 && brandStrong[0] + brandStrong[1] + brandStrong[2] > 30) {
    brandStrong = darken(brandStrong, 0.9);
  }

  const navyCandidate =
    chromatic.find((c) => c.b > c.r && c.b > c.g && luminance(c.r, c.g, c.b) < 0.35) ||
    { r: 11, g: 31, b: 75, hex: "#0B1F4B" };

  const aluminium =
    neutrals.find((c) => luminance(c.r, c.g, c.b) > 0.7) ||
    { r: 238, g: 241, b: 244, hex: "#EEF1F4" };

  const whiteOnBrand = contrastRatio(brandStrong, [255, 255, 255]);
  const navyOnBrand = contrastRatio(brandRgb, [11, 31, 75]);
  const ctaText =
    whiteOnBrand >= 4.5 ? "white" : navyOnBrand >= 4.5 ? "navy" : "white";

  const report = `# ALOPAK — kolory z grafik starej strony

Źródła: \`logo2.gif\`, \`alpak.gif\`, \`12.jpg\` z http://www.alopak.com.pl/
Wygenerowano: ${new Date().toISOString().slice(0, 10)}
Skrypt: \`node scripts/extract-brand-colors.mjs\`

## Tokeny (propozycja)

| Token | HEX | Uwagi |
| --- | --- | --- |
| \`--color-brand\` | ${rgbToHex(...brandRgb)} | Dominujący kolor chromatyki z logo/grafik |
| \`--color-brand-strong\` | ${rgbToHex(...brandStrong)} | Ciemniejszy wariant CTA; kontrast z białym tekstem ≈ ${whiteOnBrand.toFixed(2)}:1 |
| \`--color-navy\` | ${navyCandidate.hex || rgbToHex(navyCandidate.r, navyCandidate.g, navyCandidate.b)} | Granat / baza tekstu i bloków |
| \`--color-aluminium\` | ${aluminium.hex || rgbToHex(aluminium.r, aluminium.g, aluminium.b)} | Jasne tło |

**Tekst na przycisku brand:** ${ctaText}

## Top kolory (łącznie)

${ranked
  .slice(0, 15)
  .map(
    (c, i) =>
      `${i + 1}. \`${c.hex}\` — count ${c.count}${c.gray ? " (neutralny)" : ""}`,
  )
  .join("\n")}

## Per plik (top 8)

${Object.entries(byFile)
  .map(
    ([file, colors]) =>
      `### ${file}\n` +
      colors
        .slice(0, 8)
        .map((c) => `- \`${c.hex}\` (${c.count})`)
        .join("\n"),
  )
  .join("\n\n")}

## Uwaga

Jeśli wynik jest niepewny (np. logo to głównie czerń/biel), właściciel powinien podać HEX pipetą z logo.
Do czasu decyzji nie zmieniaj akcentu na nowy kolor bez potwierdzenia — tokeny powyżej to wynik automatyczny.
`;

  const out = path.join(ROOT, "docs/brand-colors.md");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, report, "utf8");
  console.log(report);
  console.log(`\nWrote ${out}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
