import fs from "node:fs";

const path = "src/data/products.ts";
let s = fs.readFileSync(path, "utf8");

const map = [
  ["puszka-aluminiowa-54", "puszka-54.jpg", "Puszka aluminiowa 54 ml"],
  ["puszka-aluminiowa-117", "puszka-117.jpg", "Puszka aluminiowa 117 ml"],
  ["puszka-aluminiowa-100", "puszka-100.jpg", "Puszka aluminiowa 100 ml"],
  ["puszka-aluminiowa-100-s", "puszka-100-s.jpg", "Puszka aluminiowa 100 ml, wariant S"],
  ["puszka-aluminiowa-110", "puszka-110.jpg", "Puszka aluminiowa 110 ml"],
  ["puszka-aluminiowa-125", "puszka-125.jpg", "Puszka aluminiowa 125 ml"],
  ["puszka-aluminiowa-135", "puszka-135.jpg", "Puszka aluminiowa 135 ml"],
  ["puszka-aluminiowa-140", "puszka-140.jpg", "Puszka aluminiowa 140 ml"],
  ["puszka-aluminiowa-250", "puszka-250.jpg", "Puszka aluminiowa 250 ml"],
  ["puszka-aluminiowa-337", "puszka-337.jpg", "Puszka aluminiowa 337 ml"],
];

for (const [slug, file, name] of map) {
  const re = new RegExp(
    `(slug: "${slug}"[\\s\\S]*?images: \\[\\s*\\{[\\s\\S]*?src: ")[^"]+(",[\\s\\S]*?alt: ")[^"]+`,
  );
  if (!re.test(s)) {
    console.log("NO MATCH", slug);
    continue;
  }
  s = s.replace(
    re,
    `$1/images/products/${file}$2${name} — zdjęcie katalogowe ALOPAK`,
  );
  console.log("OK", slug, "->", file);
}

s = s.replace(
  /(slug: "folia-fryzjerska-aluminiowa"[\s\S]*?images: \[\s*\{[\s\S]*?src: ")[^"]+(",[\s\S]*?alt: ")[^"]+/,
  `$1/images/products/folia-fryzjerska.jpg$2Folia fryzjerska aluminiowa — zdjęcie katalogowe ALOPAK`,
);

fs.writeFileSync(path, s);
console.log("written", path);
