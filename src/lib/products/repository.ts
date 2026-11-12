import { categories, getCategory } from "@/data/categories";
import { products } from "@/data/products";
import type { CategorySlug, Product } from "@/types";

export function getPublishedProducts(): Product[] {
  return products
    .filter((product) => product.isPublished)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getPublishedProducts().find((product) => product.slug === slug);
}

export function getProductsByCategory(category: CategorySlug): Product[] {
  return getPublishedProducts().filter((product) => product.category === category);
}

export function getFeaturedProducts(limit = 6): Product[] {
  return getPublishedProducts()
    .filter((product) => product.isFeatured)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .slice(0, limit);
}

export function getRelatedProducts(product: Product, limit = 3): Product[] {
  const related = (product.relatedSlugs || [])
    .map((slug) => getProductBySlug(slug))
    .filter((item): item is Product => Boolean(item));

  if (related.length >= limit) {
    return related.slice(0, limit);
  }

  const fallback = getProductsByCategory(product.category).filter(
    (item) => item.slug !== product.slug && !related.some((r) => r.slug === item.slug),
  );

  return [...related, ...fallback].slice(0, limit);
}

export function getAllProductSlugs(): string[] {
  return getPublishedProducts().map((product) => product.slug);
}

export function getCategoryWithProducts(slug: string) {
  const category = getCategory(slug);
  if (!category) return undefined;
  return {
    category,
    products: getProductsByCategory(category.slug),
  };
}

export function getCatalogSummary() {
  return categories.map((category) => ({
    category,
    count: getProductsByCategory(category.slug).length,
  }));
}
