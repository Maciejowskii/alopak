import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export function OfferSplit() {
  return (
    <section className="bg-white pb-[clamp(2.75rem,5.5vw,7rem)] pt-10 sm:pt-14">
      <Container className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Nasza oferta
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
              Wybierz kategorię, sprawdź szczegóły i wyślij zapytanie.
            </p>
          </Reveal>
          <Reveal delay={180}>
            <Link
              href="/produkty"
              className="link-underline mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary sm:mt-8"
            >
              Pełny katalog produktów
              <ArrowUpRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>

        <ul className="divide-y divide-border border-y border-border">
          {categories.map((category, index) => (
            <li key={category.slug}>
              <Reveal delay={index * 100}>
                <Link
                  href={`/oferta/${category.slug}`}
                  className="group grid grid-cols-[88px_1fr] items-center gap-4 py-5 sm:grid-cols-[140px_1fr] sm:gap-7 sm:py-7 lg:grid-cols-[180px_1fr]"
                >
                  <div className="relative aspect-square overflow-hidden bg-aluminium">
                    <SmartImage
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                      sizes="(max-width: 640px) 88px, (max-width: 1024px) 140px, 180px"
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="text-[11px] font-bold tracking-[0.16em] text-brand">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <h3 className="mt-1 text-lg font-bold text-navy transition-colors duration-300 group-hover:text-brand sm:text-2xl">
                          {category.name}
                        </h3>
                      </div>
                      <ArrowUpRight
                        className="mt-1 size-4 shrink-0 text-accent-dark transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand sm:mt-2 sm:size-5"
                        aria-hidden
                      />
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted sm:mt-2.5 sm:line-clamp-none sm:text-base">
                      {category.description}
                    </p>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
