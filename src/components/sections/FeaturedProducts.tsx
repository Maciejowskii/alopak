import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
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
        <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Wybrane produkty
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
                Przykładowe pozycje z oferty. Pełne parametry są na kartach
                produktów.
              </p>
            </Reveal>
          </div>
          <Reveal delay={140}>
            <Button href="/produkty" variant="secondary" className="btn-premium">
              Pełny katalog
            </Button>
          </Reveal>
        </div>

        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 90} variant="scale">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <p className="mt-8 text-sm text-muted">
            Szukasz innego wariantu?{" "}
            <Link href="/oferta" className="font-semibold text-navy hover:underline">
              Przejdź do oferty
            </Link>
            .
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
