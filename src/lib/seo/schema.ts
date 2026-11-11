import { contact, siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contact.legalName,
    alternateName: siteConfig.name,
    url: absoluteUrl("/"),
    email: contact.email,
    telephone: contact.phones[0],
    foundingDate: String(siteConfig.foundedYear),
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.street,
      postalCode: contact.postalCode,
      addressLocality: contact.city,
      addressCountry: "PL",
    },
    taxID: contact.nip,
    identifier: [
      { "@type": "PropertyValue", name: "KRS", value: contact.krs },
      { "@type": "PropertyValue", name: "REGON", value: contact.regon },
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl("/"),
    inLanguage: "pl-PL",
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
