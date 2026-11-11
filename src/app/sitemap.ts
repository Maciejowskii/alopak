import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { getPublishedPosts } from "@/lib/blog/repository";
import { getPublishedProducts } from "@/lib/products/repository";
import { absoluteUrl } from "@/lib/utils";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/oferta",
    "/produkty",
    "/branze",
    "/o-firmie",
    "/blog",
    "/kontakt",
    "/polityka-prywatnosci",
    "/polityka-cookies",
  ].map((path) => ({
    url: absoluteUrl(path || "/"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: absoluteUrl(`/oferta/${category.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productRoutes = getPublishedProducts().map((product) => ({
    url: absoluteUrl(`/produkty/${product.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: absoluteUrl(`/branze/${industry.slug}`),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = getPublishedPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt || post.publishedAt,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...industryRoutes,
    ...blogRoutes,
  ];
}
