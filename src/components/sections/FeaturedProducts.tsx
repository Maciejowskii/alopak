import Link from "next/link";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getFeaturedProducts } from "@/lib/products/repository";

const FEATURED_ORDER = [
  "puszka-aluminiowa-100",
  "puszka-aluminiowa-125",
  "puszka-aluminiowa-250",
  "folia-fryzjerska-aluminiowa",
  "folia-spozywcza-b2b",
] as const;

export function FeaturedProducts() {
  const products = getFeaturedProducts(5).sort((a, b) => {
    const ai = FEATURED_ORDER.indexOf(a.slug as (typeof FEATURED_ORDER)[number]);
    const bi = FEATURED_ORDER.indexOf(b.slug as (typeof FEATURED_ORDER)[number]);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });
  if (!products.length) return null;

  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="flex flex-col gap-6 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
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

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mt-8 text-sm text-muted">
          Szukasz innego wariantu?{" "}
          <Link href="/oferta" className="font-semibold text-primary hover:underline">
            Przejdź do oferty
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
