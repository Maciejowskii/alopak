import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { contact } from "@/data/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Polityka prywatności",
  description: "Informacje o przetwarzaniu danych osobowych na stronie ALOPAK.",
  path: "/polityka-prywatnosci",
});

export default function PrivacyPage() {
  return (
    <section className="section-pad bg-white">
      <Container narrow>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Polityka prywatności" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-ink">
          Polityka prywatności
        </h1>
        <p className="mt-4 text-sm text-muted">
          Wersja robocza do weryfikacji prawnej. Nie stanowi porady prawnej.
        </p>
        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            Administratorem danych osobowych przekazywanych przez formularze na
            stronie jest {contact.legalName}, {contact.street}, {contact.postalCode}{" "}
            {contact.city}, e-mail: {contact.email}.
          </p>
          <p>
            Dane z formularza zapytania ofertowego przetwarzamy w celu obsługi
            zapytania i kontaktu zwrotnego. Podanie danych jest dobrowolne, lecz
            niezbędne do obsługi formularza.
          </p>
          <p>
            Odbiorcami danych mogą być dostawcy usług IT i poczty elektronicznej
            działający na nasze zlecenie. Dane nie są wykorzystywane do
            automatycznego profilowania w celach marketingowych bez odrębnej
            zgody.
          </p>
          <p>
            Przysługuje Państwu prawo dostępu do danych, ich sprostowania,
            usunięcia, ograniczenia przetwarzania, przenoszenia oraz wniesienia
            skargi do organu nadzorczego.
          </p>
          <p>
            W sprawach związanych z ochroną danych prosimy o kontakt:
            {" "}
            <a href={`mailto:${contact.email}`} className="text-primary">
              {contact.email}
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
