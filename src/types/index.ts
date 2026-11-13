export type CategorySlug =
  | "puszki-aluminiowe"
  | "opakowania-swiecowe"
  | "folia-spozywcza"
  | "folia-fryzjerska";

export type IndustrySlug =
  | "przemysl-spozywczy"
  | "gastronomia"
  | "branza-fryzjerska";

export type SpecValue = {
  label: string;
  value: string;
  unit?: string;
};

export type ProductDocument = {
  title: string;
  href: string;
  type?: string;
};

export type ProductImage = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  catalogNumber?: string;
  shape?: "round" | "rectangular" | "square";
  category: CategorySlug;
  shortDescription: string;
  description: string;
  images: ProductImage[];
  applications: string[];
  specifications: SpecValue[];
  documents: ProductDocument[];
  seoTitle: string;
  seoDescription: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
  relatedSlugs?: string[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroDescription: string;
  applications: string[];
  audience: string[];
  highlights: string[];
  /** What to include in a quote request — shown as a separate block from highlights. */
  inquiryTips: string[];
  faq: FaqItem[];
  ctaLabel: string;
  seoTitle: string;
  seoDescription: string;
  image: ProductImage;
};

export type Industry = {
  slug: IndustrySlug;
  name: string;
  description: string;
  relatedCategories: CategorySlug[];
  seoTitle: string;
  seoDescription: string;
  image: ProductImage;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

export type BlogCategorySlug =
  | "puszki-aluminiowe"
  | "opakowania-spozywcze"
  | "folia-spozywcza"
  | "folia-fryzjerska"
  | "poradniki-b2b";

export type BlogPostMeta = {
  slug: string;
  title: string;
  description: string;
  category: BlogCategorySlug;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  draft?: boolean;
  featured?: boolean;
  readingTimeMinutes?: number;
  relatedProductCategory?: CategorySlug;
  seoTitle?: string;
  seoDescription?: string;
};

export type SiteContact = {
  companyName: string;
  legalName: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  phones: string[];
  email: string;
  krs?: string;
  nip?: string;
  regon?: string;
  shareCapital?: string;
  coordinates?: {
    lat: string;
    lng: string;
  };
};

export type QuoteCategory = CategorySlug | "inne";
