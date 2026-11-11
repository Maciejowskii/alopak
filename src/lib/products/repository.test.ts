import { describe, expect, it } from "vitest";
import {
  getProductBySlug,
  getProductsByCategory,
  getPublishedProducts,
} from "@/lib/products/repository";

describe("products repository", () => {
  it("returns only published products", () => {
    const products = getPublishedProducts();
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.isPublished)).toBe(true);
  });

  it("filters by category", () => {
    const cans = getProductsByCategory("puszki-aluminiowe");
    expect(cans.length).toBeGreaterThan(0);
    expect(cans.every((product) => product.category === "puszki-aluminiowe")).toBe(
      true,
    );
  });

  it("finds product by slug", () => {
    const product = getProductBySlug("puszka-aluminiowa-100");
    expect(product?.name).toContain("100");
  });
});
