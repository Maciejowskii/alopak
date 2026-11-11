import { QuoteForm } from "@/components/forms/QuoteForm";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { contact } from "@/data/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Kontakt / Zapytanie ofertowe",
  description:
    "Skontaktuj się z ALOPAK: formularz zapytania ofertowego, telefon i e-mail. Ostrzeszów, ul. Składowa 3.",
  path: "/kontakt",
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

  return (
    <section className="section-pad bg-white">
      <Container>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Kontakt" },
          ]}
        />
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
              Kontakt
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
              Zapytaj o ofertę
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              Opisz potrzeby swojej firmy. Po wysłaniu formularza skontaktujemy
              się w sprawie szczegółów. Możesz też napisać lub zadzwonić.
            </p>

            <div className="mt-10 space-y-6 text-sm">
              <div>
                <p className="font-semibold text-ink">{contact.legalName}</p>
                <p className="mt-2 text-muted">
                  {contact.street}
                  <br />
                  {contact.postalCode} {contact.city}
                </p>
              </div>
              <div>
                <p className="text-muted">E-mail</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-block font-medium text-primary"
                  data-analytics="email_click"
                >
                  {contact.email}
                </a>
              </div>
              <div>
                <p className="text-muted">Telefon / fax</p>
                <ul className="mt-1 space-y-1">
                  {contact.phones.map((phone) => (
                    <li key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s/g, "")}`}
                        className="font-medium text-primary"
                        data-analytics="phone_click"
                      >
                        {phone}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface/40 p-6 sm:p-8">
            <QuoteForm
              defaultCategory={params.kategoria}
              defaultProduct={params.produkt}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
