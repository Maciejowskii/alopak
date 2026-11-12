/**
 * Atmosphere / material photos. Prefer JPG/PNG for OG and social.
 * Category photos: free Pexels stock (not ALOPAK product photography).
 * Product photos: set `images` on each product in data/products.ts when ready.
 */
export const stockMedia = {
  hero: {
    src: "/images/stock/cans-atmosphere.jpg",
    alt: "Opakowania aluminiowe — atmosfera materiałowa",
  },
  cans: {
    src: "/images/categories/puszki-aluminiowe.jpg",
    alt: "Puszki aluminiowe spożywcze — widok z góry",
  },
  foodFoil: {
    src: "/images/categories/folia-spozywcza.jpg",
    alt: "Rolka folii aluminiowej spożywczej",
  },
  hairFoil: {
    src: "/images/industries/branza-fryzjerska.jpg",
    alt: "Koloryzacja z użyciem folii fryzjerskiej w salonie",
  },
  metal: {
    src: "/images/stock/metal-brushed.jpg",
    alt: "Szczotkowane aluminium",
  },
  industrial: {
    src: "/images/industries/przemysl-spozywczy.jpg",
    alt: "Puszki aluminiowe",
  },
  foilRoll: {
    src: "/images/categories/folia-spozywcza.jpg",
    alt: "Folia aluminiowa",
  },
  packaging: {
    src: "/images/industries/przemysl-spozywczy.jpg",
    alt: "Opakowania aluminiowe",
  },
  workshop: {
    src: "/images/stock/metal-brushed.jpg",
    alt: "Szczotkowane aluminium",
  },
  partnership: {
    src: "/images/stock/partnership-office.jpg",
    alt: "Spotkanie biznesowe i partnerstwo B2B",
  },
  foilCloseup: {
    src: "/images/industries/gastronomia.jpg",
    alt: "Żywność w folii aluminiowej",
  },
  metalSheet: {
    src: "/images/stock/metal-brushed.jpg",
    alt: "Blacha aluminiowa",
  },
} as const;
