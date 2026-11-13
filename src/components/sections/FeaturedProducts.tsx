import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory } from "@/data/categories";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ProductImage } from "@/components/products/ProductImage";
import { formatProductCardLine } from "@/lib/products/format";
import { getProductBySlug } from "@/lib/products/repository";

/** Brief P1-4: puszka 54, 117, 337 ml + folia fryzjerska */
const FEATURED_SLUGS = [
  "puszka-aluminiowa-54",
  "puszka-aluminiowa-117",
  "puszka-aluminiowa-337",
  "folia-fryzjerska-aluminiowa",
] as const;

export function FeaturedProducts() {
  const products = FEATURED_SLUGS.map((slug) => getProductBySlug(slug)).filter(
    (product): product is NonNullable<typeof product> => Boolean(product),
  );
  if (!products.length) return null;

  return (
    <section className="section-pad bg-aluminium">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand">
                Katalog
              </p>
            </Reveal>
            <Reveal delay={80}>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Przykładowe warianty
              </h2>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:text-lg">
                Fragment oferty z parametrami. Pełna lista jest w katalogu
                produktów.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-7">
                <Button href="/produkty" variant="secondary" className="btn-premium">
                  Pełny katalog
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="border-t border-border">
            {products.map((product, index) => {
              const category = getCategory(product.category);
              const contactHref = `/kontakt?produkt=${encodeURIComponent(product.slug)}&kategoria=${encodeURIComponent(product.category)}`;
              const line = formatProductCardLine(product);

              return (
                <Reveal key={product.id} delay={index * 80}>
                  <article className="group grid grid-cols-[72px_1fr] gap-4 border-b border-border py-5 sm:grid-cols-[96px_1fr_auto] sm:gap-6 sm:py-6">
                    <Link
                      href={`/produkty/${product.slug}`}
                      className="relative aspect-square overflow-hidden bg-white"
                    >
                      <ProductImage
                        product={product}
                        fill
                        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05] motion-reduce:transition-none"
                        sizes="96px"
                      />
                    </Link>

                    <div className="min-w-0">
                      {category ? (
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand">
                          {category.name}
                        </p>
                      ) : null}
                      <h3 className="mt-1 text-lg font-bold text-navy sm:text-xl">
                        <Link
                          href={`/produkty/${product.slug}`}
                          className="transition-colors hover:text-brand"
                        >
                          {product.name}
                        </Link>
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">
                        {line}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm font-semibold sm:hidden">
                        <Link
                          href={`/produkty/${product.slug}`}
                          className="inline-flex items-center gap-1 text-navy"
                        >
                          Zobacz
                          <ArrowRight className="size-3.5" aria-hidden />
                        </Link>
                        <Link href={contactHref} className="text-brand">
                          Zapytaj
                        </Link>
                      </div>
                    </div>

                    <div className="hidden flex-col items-end justify-center gap-2 sm:flex">
                      <Link
                        href={`/produkty/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-brand"
                      >
                        Zobacz
                        <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
                      </Link>
                      <Link
                        href={contactHref}
                        className="text-sm font-semibold text-brand hover:underline"
                      >
                        Zapytaj
                      </Link>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
