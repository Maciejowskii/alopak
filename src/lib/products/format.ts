import type { Product, SpecValue } from "@/types";

function spec(product: Product, labels: string[]): SpecValue | undefined {
  for (const label of labels) {
    const found = product.specifications.find((item) => item.label === label);
    if (found) return found;
  }
  return undefined;
}

function formatSpecValue(item: SpecValue | undefined): string | null {
  if (!item) return null;
  return item.unit ? `${item.value} ${item.unit}` : item.value;
}

/** Outer dimension with Ø only for round cans. */
export function formatOuterDimension(product: Product): string | null {
  const outer = spec(product, ["Średnica zewnętrzna", "Wymiar zewnętrzny"]);
  if (!outer) return null;
  const value = outer.value.replace(/x/gi, "×");
  if (product.shape === "round") {
    return `Ø ${value} ${outer.unit || "mm"}`.trim();
  }
  return `${value} ${outer.unit || "mm"}`.trim();
}

/** Card line: capacity · dimension · height · catalog no. */
export function formatProductCardLine(product: Product): string {
  if (
    product.category !== "puszki-aluminiowe" &&
    product.category !== "opakowania-swiecowe"
  ) {
    return product.shortDescription;
  }

  if (product.category === "opakowania-swiecowe") {
    return product.shortDescription;
  }

  const parts: string[] = [];
  const capacity = formatSpecValue(spec(product, ["Pojemność"]));
  if (capacity) parts.push(capacity);

  const outer = formatOuterDimension(product);
  if (outer) parts.push(outer);
  else if (product.shape === "rectangular") parts.push("przekrój prostokątny");
  else if (product.shape === "square") parts.push("przekrój kwadratowy");

  const height = formatSpecValue(spec(product, ["Wysokość"]));
  if (height) parts.push(`wys. ${height}`);

  if (product.catalogNumber) parts.push(`nr kat. ${product.catalogNumber}`);

  return parts.join(" · ") || product.shortDescription;
}

export function getSpecValue(product: Product, labels: string[]): string {
  return formatSpecValue(spec(product, labels)) ?? "—";
}
