import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
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
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Wybrane produkty
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              Przykładowe pozycje z katalogu — sprawdź parametry i wyślij
              zapytanie o ofertę.
            </p>
          </div>
          <Button href="/produkty" variant="secondary">
            Pełny katalog
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Szukasz innego wariantu?{" "}
          <Link href="/oferta" className="font-semibold text-navy hover:underline">
            Przejdź do oferty
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
