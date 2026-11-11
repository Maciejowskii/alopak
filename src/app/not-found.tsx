import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="section-pad">
      <Container className="max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent-dark">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
          Nie znaleziono strony
        </h1>
        <p className="mt-4 text-muted">
          Sprawdź adres lub wróć do strony głównej, oferty albo kontaktu.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/">Strona główna</Button>
          <Button href="/kontakt" variant="secondary">
            Kontakt
          </Button>
        </div>
      </Container>
    </section>
  );
}
