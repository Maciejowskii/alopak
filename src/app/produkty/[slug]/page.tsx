import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductCard } from "@/components/products/ProductCard";
import { SpecTable } from "@/components/products/SpecTable";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategory } from "@/data/categories";
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

export async function generateMetadata({
  params,
}: SlugPageProps) {
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

export default async function ProductPage({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = getRelatedProducts(product);

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
            brand: {
              "@type": "Brand",
              name: "ALOPAK",
            },
          },
        ]}
      />

      <section className="section-pad bg-white">
        <Container>
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

          <div className="grid gap-10 lg:grid-cols-2">
            <div className="relative aspect-square overflow-hidden rounded-lg border border-border bg-surface">
              <SmartImage
                src={product.images[0]?.src || "/images/products/puszka-placeholder.svg"}
                alt={product.images[0]?.alt || product.name}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div>
              {category ? (
                <Link
                  href={`/oferta/${category.slug}`}
                  className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark"
                >
                  {category.name}
                </Link>
              ) : null}
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink">
                {product.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {product.description}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#zapytanie">Zapytaj o ten produkt</Button>
                {category ? (
                  <Button href={`/oferta/${category.slug}`} variant="secondary">
                    Wróć do kategorii
                  </Button>
                ) : null}
              </div>
              <p className="mt-4 text-xs text-muted">
                Wizualizacja zastępcza — oczekujemy na zdjęcia produktowe.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {product.specifications.length ? (
        <section className="section-pad surface-grid">
          <Container>
            <h2 className="text-2xl font-semibold text-ink">Parametry techniczne</h2>
            <p className="mt-2 text-sm text-muted">
              Dane na podstawie publicznej oferty katalogowej ALOPAK. Potwierdź
              aktualność w zapytaniu.
            </p>
            <div className="mt-6">
              <SpecTable specs={product.specifications} />
            </div>
          </Container>
        </section>
      ) : null}

      {product.applications.length ? (
        <section className="section-pad bg-white">
          <Container>
            <h2 className="text-2xl font-semibold text-ink">Zastosowania</h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {product.applications.map((item) => (
                <li key={item} className="rounded-lg border border-border px-4 py-3 text-sm text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <section id="zapytanie" className="section-pad surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Zapytaj o ofertę</h2>
            <p className="mt-4 text-muted">
              Formularz jest wstępnie uzupełniony o ten produkt. Dodaj ilość i
              wymagania.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
            <QuoteForm
              defaultCategory={product.category}
              defaultProduct={product.name}
            />
          </div>
        </Container>
      </section>

      {related.length ? (
        <section className="section-pad bg-white">
          <Container>
            <h2 className="text-2xl font-semibold text-ink">Powiązane produkty</h2>
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
