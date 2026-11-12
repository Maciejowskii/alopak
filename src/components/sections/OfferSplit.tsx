import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";

export function OfferSplit() {
  return (
    <section className="bg-white pb-[clamp(4rem,7vw,7rem)] pt-6 sm:pt-8">
      <Container className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="lg:sticky lg:top-28">
          <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Trzy kategorie oferty B2B
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Czytelny podział produktów dla działów zakupów, produkcji i
            dystrybucji. Każda kategoria prowadzi do szczegółów i formularza
            zapytania.
          </p>
          <Link
            href="/produkty"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            Pełny katalog produktów
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <div className="space-y-0 divide-y divide-border border-y border-border">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/oferta/${category.slug}`}
              className="group grid gap-6 py-8 sm:grid-cols-[160px_1fr] sm:items-center"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface sm:aspect-square">
                <SmartImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="160px"
                />
              </div>
              <div>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-2xl font-bold text-navy group-hover:text-brand">
                    {category.name}
                  </h3>
                  <ArrowUpRight className="mt-1 size-5 shrink-0 text-accent-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                </div>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted sm:text-base">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
