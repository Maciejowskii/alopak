import type { FaqItem, NavItem, SiteContact } from "@/types";

export const siteConfig = {
  name: "ALOPAK",
  tagline: "Opakowania i folie dla profesjonalnych zastosowań",
  description:
    "ALOPAK oferuje puszki aluminiowe, folię spożywczą i folię fryzjerską dla odbiorców biznesowych. Skontaktuj się w sprawie oferty dopasowanej do potrzeb Twojej firmy.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  locale: "pl_PL",
  foundedYear: 1997,
  qualitySystem: "ISO 9001:2015",
} as const;

export const contact: SiteContact = {
  companyName: "ALOPAK",
  legalName: "ALOPAK Sp. z o.o.",
  street: "ul. Składowa 3",
  postalCode: "63-500",
  city: "Ostrzeszów",
  country: "Polska",
  phones: ["+48 62 730 34 48", "+48 62 730 16 72", "+48 62 586 08 88", "+48 62 586 08 86"],
  email: "alopak@alopak.com.pl",
  krs: "0000178512",
  nip: "622-19-01-667",
  regon: "250669554",
  shareCapital: "360.000 PLN",
  coordinates: {
    lat: "51.435456",
    lng: "17.939625",
  },
};

export const mainNav: NavItem[] = [
  {
    label: "Oferta",
    href: "/oferta",
    children: [
      { label: "Puszki aluminiowe", href: "/oferta/puszki-aluminiowe" },
      { label: "Folia spożywcza", href: "/oferta/folia-spozywcza" },
      { label: "Folia fryzjerska", href: "/oferta/folia-fryzjerska" },
      { label: "Katalog produktów", href: "/produkty" },
    ],
  },
  {
    label: "Branże",
    href: "/branze",
    children: [
      { label: "Przemysł spożywczy", href: "/branze/przemysl-spozywczy" },
      { label: "Gastronomia", href: "/branze/gastronomia" },
      { label: "Branża fryzjerska", href: "/branze/branza-fryzjerska" },
    ],
  },
  { label: "O firmie", href: "/o-firmie" },
  { label: "Blog", href: "/blog" },
  { label: "Kontakt", href: "/kontakt" },
];

export const footerNav = {
  oferta: [
    { label: "Puszki aluminiowe", href: "/oferta/puszki-aluminiowe" },
    { label: "Folia spożywcza", href: "/oferta/folia-spozywcza" },
    { label: "Folia fryzjerska", href: "/oferta/folia-fryzjerska" },
    { label: "Katalog produktów", href: "/produkty" },
  ],
  firma: [
    { label: "O firmie", href: "/o-firmie" },
    { label: "Branże", href: "/branze" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  legal: [
    { label: "Polityka prywatności", href: "/polityka-prywatnosci" },
    { label: "Polityka cookies", href: "/polityka-cookies" },
  ],
};

export const homeFaq: FaqItem[] = [
  {
    question: "Jakie produkty oferuje ALOPAK?",
    answer:
      "Oferta obejmuje puszki aluminiowe, folię spożywczą oraz folię fryzjerską. Szczegóły wariantów i parametrów znajdziesz na stronach kategorii produktowych.",
  },
  {
    question: "Czy obsługujecie klientów biznesowych?",
    answer:
      "Tak. ALOPAK kieruje ofertę do odbiorców B2B — producentów, hurtowni, dystrybutorów i firm korzystających z opakowań oraz folii w działalności profesjonalnej.",
  },
  {
    question: "Jak złożyć zapytanie ofertowe?",
    answer:
      "Wypełnij formularz na stronie Kontaktu lub wyślij wiadomość na adres e-mail. Opisz kategorię produktu, szacowane zapotrzebowanie i wymagania — pomoże to przygotować odpowiedź.",
  },
  {
    question: "Czy publikujecie cennik online?",
    answer:
      "Warunki handlowe ustalane są indywidualnie. Skontaktuj się z nami, aby omówić potrzeby Twojej firmy i otrzymać informacje ofertowe.",
  },
  {
    question: "Czy mogę dołączyć specyfikację do zapytania?",
    answer:
      "Tak. W formularzu zapytania możesz dodać załącznik ze specyfikacją lub opisem wymagań. Możesz też wskazać je w treści wiadomości.",
  },
  {
    question: "Gdzie znajduje się siedziba firmy?",
    answer:
      "ALOPAK Sp. z o.o. ma siedzibę w Ostrzeszowie przy ul. Składowej 3 (63-500).",
  },
];
