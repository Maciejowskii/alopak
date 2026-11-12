import type { FaqItem, NavItem, SiteContact } from "@/types";

export const siteConfig = {
  name: "ALOPAK",
  tagline: "Puszki aluminiowe i folie, producent z Ostrzeszowa",
  description:
    "Producent puszek aluminiowych, folii spożywczej i folii fryzjerskiej z Ostrzeszowa. Działamy od 1997 roku. Opisz potrzeby – przygotujemy ofertę.",
  locale: "pl_PL",
  foundedYear: 1997,
  /** Publish only after client confirms a valid certificate. */
  qualitySystem: null as string | null,
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
  shareCapital: "360 000 zł",
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
  branze: [
    { label: "Przemysł spożywczy", href: "/branze/przemysl-spozywczy" },
    { label: "Gastronomia", href: "/branze/gastronomia" },
    { label: "Branża fryzjerska", href: "/branze/branza-fryzjerska" },
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
    question: "Jakie produkty oferujecie?",
    answer:
      "Puszki aluminiowe, folię spożywczą i folię fryzjerską. Warianty i parametry znajdziesz na stronach kategorii.",
  },
  {
    question: "Czy obsługujecie firmy?",
    answer:
      "Tak. Nasza oferta jest przeznaczona dla firm: producentów żywności, hurtowni, dystrybutorów, gastronomii i salonów fryzjerskich.",
  },
  {
    question: "Jak wysłać zapytanie?",
    answer:
      "Wypełnij formularz na stronie Kontakt albo napisz na alopak@alopak.com.pl. Podaj kategorię produktu, szacowaną ilość i wymagania.",
  },
  {
    question: "Czy publikujecie cennik online?",
    answer:
      "Nie. Warunki ustalamy indywidualnie – wyślij zapytanie, a przygotujemy ofertę.",
  },
  {
    question: "Czy mogę dołączyć specyfikację do zapytania?",
    answer:
      "Tak. W formularzu możesz dodać plik (PDF, JPG, PNG, DOC, DOCX, do 4 MB) albo opisać wymagania w treści wiadomości.",
  },
  {
    question: "Gdzie jest siedziba firmy?",
    answer: "ALOPAK Sp. z o.o., ul. Składowa 3, 63-500 Ostrzeszów.",
  },
];
