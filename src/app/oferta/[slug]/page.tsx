import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCategorySlugs, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return createMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/oferta/${category.slug}`,
    image: category.image.src,
  });
}

export default async function CategoryPage({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Oferta", path: "/oferta" },
          { name: category.name, path: `/oferta/${category.slug}` },
        ])}
      />
      <section className="section-pad bg-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Oferta", href: "/oferta" },
              { label: category.name },
            ]}
          />
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
                Kategoria produktu
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
                {category.name}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-muted">
                {category.heroDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="#zapytanie">{category.ctaLabel}</Button>
                <Button href="/produkty" variant="secondary">
                  Katalog produktów
                </Button>
              </div>
            </div>
            <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-border bg-surface">
              <SmartImage
                src={category.image.src}
                alt={category.image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="section-pad surface-grid">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Zastosowania</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {category.applications.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-ink">Dla kogo</h2>
            <ul className="mt-4 space-y-2 text-muted">
              {category.audience.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <h2 className="text-2xl font-semibold text-ink">Na co warto zwrócić uwagę</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {category.highlights.map((item) => (
              <div key={item} className="rounded-lg border border-border bg-surface/50 p-5 text-sm text-muted">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-2xl font-semibold text-ink">Dostępne warianty</h2>
            <Link href="/produkty" className="text-sm font-semibold text-primary">
              Pełny katalog
            </Link>
          </div>
          {products.length ? (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-muted">
              Szczegółowe warianty tej kategorii uzupełnimy po dostarczeniu
              katalogu. Możesz już teraz wysłać zapytanie.
            </p>
          )}
        </Container>
      </section>

      <FaqSection items={category.faq} title={`FAQ — ${category.name}`} />

      <section id="zapytanie" className="section-pad surface-grid">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight text-ink">
              {category.ctaLabel}
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Opisz wymagania, ilość i ewentualne parametry. Możesz dołączyć
              plik ze specyfikacją.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-white p-6 sm:p-8">
            <QuoteForm defaultCategory={category.slug} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Potrzebujesz innej kategorii?"
        description="Zobacz pełną ofertę ALOPAK lub skontaktuj się bezpośrednio."
        href="/oferta"
        ctaLabel="Wróć do oferty"
      />
    </>
  );
}
