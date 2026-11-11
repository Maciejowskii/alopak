import { SmartImage } from "@/components/ui/SmartImage";
import { Button } from "@/components/ui/Button";
import { stockMedia } from "@/data/media";

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
    <section className="relative overflow-hidden bg-primary text-white">
      <SmartImage
        src={stockMedia.metal.src}
        alt=""
        fill
        className="object-cover opacity-25"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-primary/80" />
      <div className="container-wide relative grid items-center gap-8 py-20 lg:grid-cols-[1fr_auto] lg:py-24">
        <div>
          <h2 className="font-display max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75">
            {description}
          </p>
        </div>
        <Button href={href} variant="light" size="lg">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
