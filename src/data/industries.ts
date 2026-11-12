import type { Industry } from "@/types";

export const industries: Industry[] = [
  {
    slug: "przemysl-spozywczy",
    name: "Przemysł spożywczy",
    description:
      "Dla zakładów przetwórczych i producentów żywności poszukujących opakowań aluminiowych. Oferta puszek ALOPAK obejmuje zastosowania do przetworów mięsnych, rybnych, mleczarskich oraz owocowo-warzywnych.",
    relatedCategories: ["puszki-aluminiowe", "folia-spozywcza"],
    seoTitle: "Opakowania dla przemysłu spożywczego | ALOPAK",
    seoDescription:
      "Puszki aluminiowe ALOPAK dla przetwórstwa spożywczego. Sprawdź ofertę i wyślij zapytanie.",
    image: {
      src: "/images/industries/przemysl-spozywczy.jpg",
      alt: "Puszki aluminiowe do przetwórstwa spożywczego",
    },
  },
  {
    slug: "gastronomia",
    name: "Gastronomia",
    description:
      "Dla gastronomii i profesjonalnych zastosowań spożywczych — w szczególności w obszarze folii spożywczej. Opisz potrzeby obiektu lub sieci, aby omówić warunki współpracy.",
    relatedCategories: ["folia-spozywcza"],
    seoTitle: "Folia spożywcza dla gastronomii | ALOPAK",
    seoDescription:
      "Folia spożywcza ALOPAK dla gastronomii i zastosowań profesjonalnych. Zapytaj o ofertę.",
    image: {
      src: "/images/industries/gastronomia.jpg",
      alt: "Żywność w folii aluminiowej — zastosowania gastronomiczne",
    },
  },
  {
    slug: "branza-fryzjerska",
    name: "Branża fryzjerska",
    description:
      "Dla salonów, hurtowni i dystrybutorów poszukujących profesjonalnej folii fryzjerskiej do koloryzacji włosów. Dostępne dane katalogowe: grubość 14 µm, szerokość 12 cm.",
    relatedCategories: ["folia-fryzjerska"],
    seoTitle: "Folia fryzjerska dla salonów i hurtowni | ALOPAK",
    seoDescription:
      "Folia fryzjerska aluminiowa ALOPAK dla branży beauty. Zapytanie o współpracę B2B.",
    image: {
      src: "/images/industries/branza-fryzjerska.jpg",
      alt: "Koloryzacja włosów z użyciem folii fryzjerskiej",
    },
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
