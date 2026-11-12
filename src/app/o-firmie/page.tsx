import { SmartImage } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { contact, siteConfig } from "@/data/site";
import { stockMedia } from "@/data/media";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "O firmie",
  description:
    "ALOPAK Sp. z o.o. — polski producent opakowań aluminiowych z Ostrzeszowa. Oferta B2B i kontakt.",
  path: "/o-firmie",
  image: stockMedia.workshop.src,
});

export default function AboutPage() {
  return (
    <>
      <section className="relative isolate min-h-[480px] overflow-hidden bg-primary text-white">
        <SmartImage
          src={stockMedia.workshop.src}
          alt={stockMedia.workshop.alt}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a29]/92 to-[#0f2438]/55" />
        <Container className="relative flex min-h-[480px] flex-col justify-end pb-14 pt-28">
          <Breadcrumbs
            tone="light"
            items={[
              { label: "Strona główna", href: "/" },
              { label: "O firmie" },
            ]}
          />
          <h1 className="display-hero mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.5rem)]">
            ALOPAK — producent opakowań aluminiowych
          </h1>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Jesteśmy polskim producentem opakowań od {siteConfig.foundedYear}{" "}
              roku. Oferujemy opakowania aluminiowe do pakowania przetworów
              podlegających sterylizacji lub pasteryzacji, pojemniki aluminiowe
              do zastosowań spożywczych lub technicznych oraz inne wyroby z
              folii aluminiowej.
            </p>
            <p>
              Oferta obejmuje m.in. puszki aluminiowe dla przemysłu spożywczego,
              folię spożywczą oraz folię fryzjerską. Działania firmy koncentrują
              się na poszerzaniu oferty zgodnie z potrzebami klientów
              biznesowych.
            </p>
            <p>
              Od początku działalności przywiązujemy wagę do jakości produkcji
              i współpracy z odbiorcami B2B. W 2004 roku wdrożyliśmy System
              Zarządzania Jakością zgodny z normą ISO 9001:2000.
            </p>
            <p>
              Realizujemy też projekty z wykorzystaniem innych materiałów
              (tworzywa sztuczne, papier, tektura, inne metale) — po
              indywidualnym kontakcie.
            </p>
          </div>
          <aside className="border border-border bg-surface p-8">
            <h2 className="font-display text-2xl font-semibold text-ink">
              Dane rejestrowe
            </h2>
            <dl className="mt-6 space-y-4 text-sm">
              <Item label="Nazwa" value={contact.legalName} />
              <Item
                label="Adres"
                value={`${contact.street}, ${contact.postalCode} ${contact.city}`}
              />
              <Item label="KRS" value={contact.krs || "—"} />
              <Item label="NIP" value={contact.nip || "—"} />
              <Item label="REGON" value={contact.regon || "—"} />
              <Item label="Kapitał zakładowy" value={contact.shareCapital || "—"} />
              <Item label="E-mail" value={contact.email} />
              <Item label="Telefon" value={contact.phones[0]} />
            </dl>
            <Button href="/kontakt" className="mt-8 w-full">
              Napisz do nas
            </Button>
          </aside>
        </Container>
      </section>

      <section className="section-pad bg-surface">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
            Zakres oferty
          </h2>
          <div className="mt-10 grid gap-0 border-t border-border md:grid-cols-2">
            {[
              "Opakowania aluminiowe do przetworów (w tym pasteryzacja / sterylizacja — zgodnie z informacjami firmy)",
              "Pojemniki aluminiowe do zastosowań spożywczych lub technicznych",
              "Folia spożywcza i inne wyroby z folii aluminiowej",
              "Folia fryzjerska aluminiowa do koloryzacji włosów",
            ].map((item) => (
              <div
                key={item}
                className="border-b border-border px-0 py-6 text-muted md:px-6 md:odd:border-r"
              >
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}

function Item({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.14em] text-accent-dark">{label}</dt>
      <dd className="mt-1 font-medium text-ink">{value}</dd>
    </div>
  );
}
