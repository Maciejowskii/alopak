import type { MetadataRoute } from "next";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { SITE_URL } from "@/lib/site";
import { getPublishedPosts } from "@/lib/blog/repository";
import { getPublishedProducts } from "@/lib/products/repository";

function url(path: string) {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUpdated = new Date("2026-11-12");

  const staticRoutes = [
    { path: "/", priority: 1 },
    { path: "/oferta", priority: 0.9 },
    { path: "/produkty", priority: 0.85 },
    { path: "/branze", priority: 0.7 },
    { path: "/o-firmie", priority: 0.6 },
    { path: "/blog", priority: 0.7 },
    { path: "/kontakt", priority: 0.9 },
    { path: "/polityka-prywatnosci", priority: 0.3 },
    { path: "/polityka-cookies", priority: 0.3 },
  ].map((route) => ({
    url: url(route.path),
    lastModified: siteUpdated,
    changeFrequency: "weekly" as const,
    priority: route.priority,
  }));

  const categoryRoutes = categories.map((category) => ({
    url: url(`/oferta/${category.slug}`),
    lastModified: siteUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const productRoutes = getPublishedProducts().map((product) => ({
    url: url(`/produkty/${product.slug}`),
    lastModified: siteUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: url(`/branze/${industry.slug}`),
    lastModified: siteUpdated,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = getPublishedPosts().map((post) => ({
    url: url(`/blog/${post.slug}`),
    lastModified: new Date(post.updatedAt || post.publishedAt),
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
