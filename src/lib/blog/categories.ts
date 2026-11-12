import type { BlogCategorySlug } from "@/types";

export const blogCategoryLabels: Record<BlogCategorySlug, string> = {
  "puszki-aluminiowe": "Puszki aluminiowe",
  "opakowania-spozywcze": "Opakowania i przemysł spożywczy",
  "folia-spozywcza": "Folia spożywcza",
  "folia-fryzjerska": "Folia fryzjerska",
  "poradniki-b2b": "Poradniki",
};

export const blogCategories = Object.entries(blogCategoryLabels).map(
  ([slug, name]) => ({
    slug: slug as BlogCategorySlug,
    name,
  }),
);
