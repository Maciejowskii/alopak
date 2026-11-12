import { contact, siteConfig } from "@/data/site";
import { getCategory } from "@/data/categories";
import type { Product } from "@/types";
import { absoluteUrl } from "@/lib/utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name: contact.legalName,
    alternateName: siteConfig.name,
    url: absoluteUrl("/"),
    email: contact.email,
    telephone: contact.phones[0],
    foundingDate: String(siteConfig.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "PL",
    },
    taxID: contact.nip,
    identifier: [
      { "@type": "PropertyValue", name: "KRS", value: contact.krs },
      { "@type": "PropertyValue", name: "REGON", value: contact.regon },
    ],
  };
}

export function localBusinessSchema() {
  return {
    ...organizationSchema(),
    "@type": "LocalBusiness",
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "pl-PL",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function productSchema(product: Product) {
  const category = getCategory(product.category);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription,
    sku: product.catalogNumber ?? product.id,
    category: category?.name,
    image: product.images.map((image) => absoluteUrl(image.src)),
    brand: { "@type": "Brand", name: "ALOPAK" },
    url: absoluteUrl(`/produkty/${product.slug}`),
  };
}

export function articleSchema(post: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
}) {
  const authorName =
    post.author === "ALOPAK" || !post.author ? "ALOPAK" : post.author;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    author: {
      "@type": "Organization",
      name: authorName,
    },
    publisher: {
      "@type": "Organization",
      name: contact.legalName,
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    image: absoluteUrl("/opengraph-image"),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
