import { Button } from "@/components/ui/Button";

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
    <section className="bg-navy text-white">
      <div className="container-wide grid items-center gap-8 py-20 lg:grid-cols-[1fr_auto] lg:py-24">
        <div>
          <h2 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            {description}
          </p>
        </div>
        <Button href={href} variant="accent" size="lg" className="rounded-sm">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
