import type { Metadata } from "next";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image = "/images/hero-aluminium.svg",
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  image?: string;
}): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = /ALOPAK/i.test(title) ? title : `${title} | ALOPAK`;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [{ url: absoluteUrl(image) }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl(image)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}
