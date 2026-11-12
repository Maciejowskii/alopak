import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

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
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 motion-reduce:hidden max-md:hidden"
      >
        <div className="aluminium-sheen absolute inset-0 opacity-30 mix-blend-soft-light" />
      </div>
      <div className="container-wide relative grid items-center gap-8 py-20 lg:grid-cols-[1fr_auto] lg:py-24">
        <div>
          <Reveal variant="up">
            <h2 className="max-w-2xl text-3xl font-extrabold uppercase tracking-tight sm:text-4xl lg:text-5xl">
              {title}
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
              {description}
            </p>
          </Reveal>
        </div>
        <Reveal delay={180} variant="scale">
          <Button
            href={href}
            variant="accent"
            size="lg"
            className="btn-premium rounded-sm"
          >
            {ctaLabel}
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
