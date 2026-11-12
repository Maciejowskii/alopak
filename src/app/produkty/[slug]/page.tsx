import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductImage } from "@/components/products/ProductImage";
import { SpecTable } from "@/components/products/SpecTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategory } from "@/data/categories";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Omit<SlugPageProps, never>) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  const image = product.images[0]?.src;
  return createMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/produkty/${product.slug}`,
    ...(image && !image.endsWith(".svg") ? { image } : {}),
  });
}

export default async function ProductPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product, 3);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Strona główna", path: "/" },
            { name: "Produkty", path: "/produkty" },
            { name: product.name, path: `/produkty/${product.slug}` },
          ]),
          productSchema(product),
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
            <div className="relative aspect-square overflow-hidden border border-border bg-surface">
              <ProductImage
                product={product}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
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
                {product.catalogNumber ? (
                  <div>
                    <dt className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                      Nr katalogowy
                    </dt>
                    <dd className="mt-1 font-semibold text-ink">
                      {product.catalogNumber}
                    </dd>
                  </div>
                ) : null}
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
                Parametry katalogowe. Aktualność i warianty potwierdzamy w
                odpowiedzi na zapytanie.
              </p>
            </div>
            <SpecTable specs={product.specifications} />
          </Container>
        </section>
      ) : (
        <section className="section-pad bg-surface">
          <Container className="max-w-3xl">
            <h2 className="font-display text-3xl font-semibold text-ink">
              Parametry dostępne na zapytanie
            </h2>
            <p className="mt-4 leading-relaxed text-muted">
              Dla tej pozycji nie publikujemy tabeli parametrów. Opisz wymagania
              w formularzu — przygotujemy kartę produktu w odpowiedzi.
            </p>
            <div className="mt-8">
              <Button href="#zapytanie" size="lg">
                Poproś o kartę produktu
              </Button>
            </div>
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
