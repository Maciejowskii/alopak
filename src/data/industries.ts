import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "przemysl-spozywczy",
    name: "Przemysł spożywczy",
    description:
      "Puszki aluminiowe dla zakładów przetwórczych: do przetworów mięsnych, rybnych, mleczarskich i owocowo-warzywnych.",
    relatedCategories: ["puszki-aluminiowe", "folia-spozywcza"],
    seoTitle: "Opakowania dla przemysłu spożywczego | ALOPAK",
    seoDescription:
      "Puszki aluminiowe dla przetwórstwa spożywczego. Sprawdź ofertę i wyślij zapytanie.",
    image: {
      src: "/images/industries/przemysl-spozywczy.jpg",
      alt: "Puszki aluminiowe do przetwórstwa spożywczego",
    },
  },
  {
    slug: "gastronomia",
    name: "Gastronomia",
    description:
      "Folia spożywcza dla gastronomii i firm zaopatrujących obiekty profesjonalne. Opisz, czego potrzebujesz – przygotujemy ofertę.",
    relatedCategories: ["folia-spozywcza"],
    seoTitle: "Folia spożywcza dla gastronomii | ALOPAK",
    seoDescription:
      "Folia spożywcza dla gastronomii i zastosowań profesjonalnych. Zapytaj o ofertę.",
    image: {
      src: "/images/industries/gastronomia.jpg",
      alt: "Żywność w folii aluminiowej — zastosowania gastronomiczne",
    },
  },
  {
    slug: "branza-fryzjerska",
    name: "Branża fryzjerska",
    description:
      "Folia do koloryzacji włosów dla salonów, hurtowni i dystrybutorów. Grubość 14 µm, szerokość 12 cm.",
    relatedCategories: ["folia-fryzjerska"],
    seoTitle: "Folia fryzjerska dla salonów i hurtowni | ALOPAK",
    seoDescription:
      "Folia fryzjerska aluminiowa dla branży beauty. Wyślij zapytanie o współpracę.",
    image: {
      src: "/images/industries/branza-fryzjerska.jpg",
      alt: "Koloryzacja włosów z użyciem folii fryzjerskiej",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
