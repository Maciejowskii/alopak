import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

/** Prefer raster OG images — social networks do not render SVG. */
const DEFAULT_OG_IMAGE = "/opengraph-image";

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  image,
}: {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  /** Relative path to PNG/JPG, or omit to use app/opengraph-image */
  image?: string;
}): Metadata {
  const fullTitle = /ALOPAK/i.test(title) ? title : `${title} | ALOPAK`;
  const ogImage = image && !image.endsWith(".svg") ? image : undefined;

  return {
    title: {
      absolute: fullTitle,
    },
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export { DEFAULT_OG_IMAGE };
