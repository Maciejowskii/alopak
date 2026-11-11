import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function CtaBand({
  title = "Porozmawiajmy o potrzebach Twojej firmy",
  description = "Opisz kategorię produktu i wymagania — przygotujemy informacje ofertowe dopasowane do zapytania.",
  ctaLabel = "Wyślij zapytanie",
  href = "/kontakt",
}: {
  title?: string;
  description?: string;
  ctaLabel?: string;
  href?: string;
}) {
  return (
    <section className="section-pad bg-primary text-white">
      <Container className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {description}
          </p>
        </div>
        <Button href={href} variant="light" size="lg">
          {ctaLabel}
        </Button>
      </Container>
    </section>
  );
}
