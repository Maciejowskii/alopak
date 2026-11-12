import type { MetadataRoute } from "next";
import { isProductionIndexable, SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  if (!isProductionIndexable()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
