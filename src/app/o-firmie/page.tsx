import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { contact, siteConfig } from "@/data/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "O firmie",
  description:
    "ALOPAK Sp. z o.o. — polski producent opakowań aluminiowych z Ostrzeszowa. Oferta B2B i kontakt.",
  path: "/o-firmie",
});

export default function AboutPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "O firmie" },
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
            O firmie
          </p>
          <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            ALOPAK — producent opakowań aluminiowych
          </h1>
          <div className="mt-8 max-w-3xl space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              Jesteśmy polskim producentem opakowań od {siteConfig.foundedYear}{" "}
              roku. Oferujemy opakowania aluminiowe do pakowania przetworów
              podlegających sterylizacji lub pasteryzacji, pojemniki aluminiowe
              do zastosowań spożywczych lub technicznych oraz inne wyroby z
              folii aluminiowej.
            </p>
            <p>
              Oferta obejmuje m.in. puszki aluminiowe dla przemysłu spożywczego,
              folię spożywczą oraz folię fryzjerską. Skupiamy działania na
              poszerzaniu oferty zgodnie z potrzebami klientów biznesowych.
            </p>
            <p>
              Od początku działalności przywiązujemy wagę do jakości. W 2004
              roku wdrożyliśmy System Zarządzania Jakością zgodny z normą ISO
              9001:2000. Aktualne certyfikaty potwierdzają zgodność z wymaganiami
              normy {siteConfig.qualitySystem}.
            </p>
          </div>
        </Container>
      </section>

      <section className="section-pad surface-grid">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="text-2xl font-semibold text-ink">Dane firmy</h2>
            <dl className="mt-6 space-y-4 text-sm">
              <div>
                <dt className="text-muted">Nazwa</dt>
                <dd className="mt-1 font-medium text-ink">{contact.legalName}</dd>
              </div>
              <div>
                <dt className="text-muted">Adres</dt>
                <dd className="mt-1 font-medium text-ink">
                  {contact.street}, {contact.postalCode} {contact.city}
                </dd>
              </div>
              <div>
                <dt className="text-muted">KRS</dt>
                <dd className="mt-1 font-medium text-ink">{contact.krs}</dd>
              </div>
              <div>
                <dt className="text-muted">NIP</dt>
                <dd className="mt-1 font-medium text-ink">{contact.nip}</dd>
              </div>
              <div>
                <dt className="text-muted">REGON</dt>
                <dd className="mt-1 font-medium text-ink">{contact.regon}</dd>
              </div>
              <div>
                <dt className="text-muted">Kapitał zakładowy</dt>
                <dd className="mt-1 font-medium text-ink">{contact.shareCapital}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-lg border border-border bg-white p-8">
            <h2 className="text-2xl font-semibold text-ink">Zakres oferty</h2>
            <ul className="mt-6 space-y-3 text-muted">
              <li>Opakowania aluminiowe do przetworów (w tym pasteryzacja / sterylizacja — zgodnie z informacjami firmy)</li>
              <li>Pojemniki aluminiowe do zastosowań spożywczych lub technicznych</li>
              <li>Folia spożywcza i inne wyroby z folii aluminiowej</li>
              <li>Folia fryzjerska aluminiowa do koloryzacji włosów</li>
              <li>Realizacja projektów z wykorzystaniem także innych materiałów (tworzywa, papier, tektura, inne metale) — po kontakcie</li>
            </ul>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
