import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductCard } from "@/components/products/ProductCard";
import { SpecTable } from "@/components/products/SpecTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategory } from "@/data/categories";
import { stockMedia } from "@/data/media";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/utils";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Omit<SlugPageProps, never>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return createMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/produkty/${product.slug}`,
    image: product.images[0]?.src,
  });
}

export default async function ProductPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 3);
  const atmosphere =
    product.category === "puszki-aluminiowe"
      ? stockMedia.industrial.src
      : product.category === "folia-spozywcza"
        ? stockMedia.foilRoll.src
        : stockMedia.metal.src;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Strona główna", path: "/" },
            { name: "Produkty", path: "/produkty" },
            { name: product.name, path: `/produkty/${product.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            description: product.shortDescription,
            sku: product.id,
            category: category?.name,
            image: product.images.map((image) => absoluteUrl(image.src)),
            brand: { "@type": "Brand", name: "ALOPAK" },
          },
        ]}
      />

      <section className="border-b border-border bg-white">
        <Container className="section-pad !pb-12 !pt-10">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Produkty", href: "/produkty" },
              ...(category
                ? [{ label: category.name, href: `/oferta/${category.slug}` }]
                : []),
              { label: product.name },
            ]}
          />

          <div className="mt-6 grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden border border-border bg-surface">
                <SmartImage
                  src={product.images[0]?.src || "/images/products/puszka-placeholder.svg"}
                  alt={product.images[0]?.alt || product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              <div className="relative hidden aspect-[21/9] overflow-hidden border border-border lg:block">
                <SmartImage
                  src={atmosphere}
                  alt="Wizualizacja materiałowa aluminium — grafika projektowa"
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>
              <p className="text-xs text-muted">
                Główna wizualizacja produktu jest zastępcza. Dolna grafika to
                wizualizacja materiałowa — nie fotografia konkretnego wyrobu
                ALOPAK.
              </p>
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              {category ? (
                <Link
                  href={`/oferta/${category.slug}`}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
                >
                  {category.name}
                </Link>
              ) : null}
              <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {product.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {product.description}
              </p>

              <dl className="mt-8 grid gap-4 border-y border-border py-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    Nr katalogowy
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">{product.id}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    Status
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">Oferta B2B / zapytanie</dd>
                </div>
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#zapytanie" size="lg">
                  Zapytaj o ten produkt
                </Button>
                {category ? (
                  <Button href={`/oferta/${category.slug}`} variant="secondary" size="lg">
                    Wróć do kategorii
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {product.specifications.length ? (
        <section className="section-pad bg-surface">
          <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                Parametry techniczne
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Dane na podstawie publicznej oferty katalogowej ALOPAK. Przed
                decyzją zakupową potwierdź aktualność parametrów.
              </p>
            </div>
            <SpecTable specs={product.specifications} />
          </Container>
        </section>
      ) : (
        <section className="section-pad bg-surface">
          <Container className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Parametry do potwierdzenia
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Dla tej pozycji nie publikujemy tabeli parametrów bez
              potwierdzonych danych. Opisz wymagania w formularzu — doprecyzujemy
              dostępne informacje.
            </p>
          </Container>
        </section>
      )}

      {product.applications.length ? (
        <section className="section-pad bg-white">
          <Container>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Zastosowania
            </h2>
            <div className="mt-8 grid gap-0 border-t border-border md:grid-cols-2">
              {product.applications.map((item) => (
                <div
                  key={item}
                  className="border-b border-border px-0 py-5 text-muted md:px-6 md:odd:border-r"
                >
                  {item}
                </div>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section id="zapytanie" className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Zapytanie o {product.name}
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Formularz jest uzupełniony o kategorię i nazwę produktu. Dodaj
              szacowaną ilość oraz wymagania techniczne lub handlowe.
            </p>
          </div>
          <div className="border border-border bg-surface/40 p-6 sm:p-8">
            <QuoteForm
              defaultCategory={product.category}
              defaultProduct={product.name}
            />
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="section-pad bg-surface">
          <Container>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Powiązane produkty
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
