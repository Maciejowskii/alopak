import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export function OfferSplit() {
  return (
    <section className="bg-white pb-[clamp(2.75rem,5.5vw,7rem)] pt-4 sm:pt-8">
      <Container className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Trzy kategorie oferty B2B
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
              Czytelny podział produktów dla działów zakupów, produkcji i
              dystrybucji. Każda kategoria prowadzi do szczegółów i formularza
              zapytania.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Link
              href="/produkty"
              className="link-underline mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:mt-8"
            >
              Pełny katalog produktów
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <div className="space-y-0 divide-y divide-border border-y border-border">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 120} variant="scale">
              <Link
                href={`/oferta/${category.slug}`}
                className="group grid grid-cols-[96px_1fr] items-center gap-4 py-5 transition-colors duration-300 sm:grid-cols-[160px_1fr] sm:gap-6 sm:py-8"
              >
              <div className="relative aspect-square overflow-hidden bg-surface">
                <SmartImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 96px, 160px"
                />
              </div>
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold text-navy transition-colors duration-300 group-hover:text-brand sm:text-2xl">
                    {category.name}
                  </h3>
                  <ArrowUpRight className="mt-0.5 size-4 shrink-0 text-accent-dark transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary sm:mt-1 sm:size-5" />
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted sm:mt-3 sm:line-clamp-none sm:text-base">
                  {category.description}
                </p>
              </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
