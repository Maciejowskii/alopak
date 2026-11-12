import { SmartImage } from "@/components/ui/SmartImage";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { LocationMap } from "@/components/sections/LocationMap";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/data/site";
import { stockMedia } from "@/data/media";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Kontakt / Zapytanie ofertowe",
  description:
    "Skontaktuj się z ALOPAK: formularz zapytania ofertowego, telefon i e-mail. Ostrzeszów, ul. Składowa 3.",
  path: "/kontakt",
  image: stockMedia.metal.src,
});

export default function ContactPage({
  searchParams,
}: {
  searchParams?: Promise<{ kategoria?: string; produkt?: string }>;
}) {
  return <ContactContent searchParams={searchParams} />;
}

async function ContactContent({
  searchParams,
}: {
  searchParams?: Promise<{ kategoria?: string; produkt?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const [primaryPhone, ...additionalPhones] = contact.phones;

  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary text-white">
        <SmartImage
          src={stockMedia.metal.src}
          alt=""
          fill
          className="object-cover opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-primary/75" />
        <Container className="relative py-20 pt-28">
          <Breadcrumbs
            tone="light"
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Kontakt" },
            ]}
          />
          <Reveal>
            <h1 className="display-hero mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.2rem)]">
              Zapytaj o ofertę
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
              Opisz potrzeby swojej firmy. Po wysłaniu formularza skontaktujemy
              się w sprawie szczegółów. Możesz też napisać lub zadzwonić.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <h2 className="font-display text-2xl font-semibold text-ink">
                Dane kontaktowe
              </h2>
              <div className="mt-8 space-y-8 text-sm">
                <div className="border-t border-border pt-5">
                  <p className="font-semibold text-ink">{contact.legalName}</p>
                  <p className="mt-2 text-muted">
                    {contact.street}
                    <br />
                    {contact.postalCode} {contact.city}
                  </p>
                  <a
                    href="#mapa"
                    className="mt-3 inline-block text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Pokaż na mapie
                  </a>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    E-mail
                  </p>
                  <a
                    href={`mailto:${contact.email}`}
                    className="mt-2 inline-block text-lg font-semibold text-primary"
                    data-analytics="email_click"
                  >
                    {contact.email}
                  </a>
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    Telefon
                  </p>
                  {primaryPhone ? (
                    <a
                      href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                      className="mt-2 inline-block text-xl font-semibold text-primary"
                      data-analytics="phone_click"
                    >
                      {primaryPhone}
                    </a>
                  ) : null}
                  {additionalPhones.length ? (
                    <div className="mt-6">
                      <p className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                        Dodatkowe numery
                      </p>
                      <ul className="mt-3 space-y-2">
                        {additionalPhones.map((phone) => (
                          <li key={phone}>
                            <a
                              href={`tel:${phone.replace(/\s/g, "")}`}
                              className="text-lg font-semibold text-primary"
                              data-analytics="phone_click"
                            >
                              {phone}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
                <div className="border-t border-border pt-5">
                  <p className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    Rejestr
                  </p>
                  <p className="mt-2 text-muted">
                    KRS {contact.krs}
                    <br />
                    NIP {contact.nip}
                    <br />
                    REGON {contact.regon}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={120} variant="scale">
            <div className="border border-border bg-surface/40 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold text-ink">
                Formularz zapytania
              </h2>
              <p className="mt-3 text-sm text-muted">
                Pola oznaczone * są wymagane. Załącznik jest opcjonalny.
              </p>
              <div className="mt-8">
                <QuoteForm
                  defaultCategory={params.kategoria}
                  defaultProduct={params.produkt}
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <LocationMap />
    </>
  );
}
