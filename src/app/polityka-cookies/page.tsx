import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Polityka cookies",
  description: "Informacje o plikach cookies używanych na stronie ALOPAK.",
  path: "/polityka-cookies",
});

export default function CookiesPolicyPage() {
  return (
    <section className="section-pad bg-white">
      <Container narrow>
        <Breadcrumbs
          items={[
            { label: "Strona główna", href: "/" },
            { label: "Polityka cookies" },
          ]}
        />
        <h1 className="text-4xl font-semibold tracking-tight text-ink">
          Polityka cookies
        </h1>
        <p className="mt-4 text-sm text-muted">
          Wersja robocza do weryfikacji prawnej. Nie stanowi porady prawnej.
        </p>
        <div className="mt-8 space-y-6 text-muted leading-relaxed">
          <p>
            Strona wykorzystuje niezbędne pliki cookies wymagane do poprawnego
            działania serwisu (np. zapamiętanie decyzji o zgodach).
          </p>
          <p>
            Cookies analityczne i marketingowe są uruchamiane dopiero po
            wyrażeniu zgody w banerze cookies. Zgodę można zmienić, usuwając
            zapis decyzji w przeglądarce i odświeżając stronę.
          </p>
          <p>
            Identyfikatory narzędzi analitycznych (GA4 / GTM) konfiguruje się
            przez zmienne środowiskowe i nie są one aktywne bez zgody
            użytkownika.
          </p>
        </div>
      </Container>
    </section>
  );
}
