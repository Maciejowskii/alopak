import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QuoteForm } from "@/components/forms/QuoteForm";
import { ProductCard } from "@/components/products/ProductCard";
import { SpecTable } from "@/components/products/SpecTable";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllCategorySlugs, getCategory } from "@/data/categories";
import { industries } from "@/data/industries";
import { stockMedia } from "@/data/media";
import { getProductsByCategory } from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { SlugPageProps } from "@/types/next";

const categoryHero: Record<string, string> = {
  "puszki-aluminiowe": stockMedia.industrial.src,
  "folia-spozywcza": stockMedia.foilRoll.src,
  "folia-fryzjerska": stockMedia.metal.src,
};

export function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Omit<SlugPageProps, never>) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return createMetadata({
    title: category.seoTitle,
    description: category.seoDescription,
    path: `/oferta/${category.slug}`,
    image: categoryHero[category.slug] || stockMedia.hero.src,
  });
}

export default async function CategoryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const products = getProductsByCategory(category.slug);
  const relatedIndustries = industries.filter((industry) =>
    industry.relatedCategories.includes(category.slug),
  );
  const heroSrc = categoryHero[category.slug] || stockMedia.hero.src;
  const sampleSpecs = products[0]?.specifications.slice(0, 6) || [];

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Oferta", path: "/oferta" },
          { name: category.name, path: `/oferta/${category.slug}` },
        ])}
      />

      <section className="relative isolate min-h-[520px] overflow-hidden bg-primary text-white">
        <SmartImage src={heroSrc} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a29]/92 via-[#0f2438]/75 to-[#0f2438]/40" />
        <Container className="relative flex min-h-[520px] flex-col justify-end pb-14 pt-28">
          <Breadcrumbs
            tone="light"
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Oferta", href: "/oferta" },
              { label: category.name },
            ]}
          />
          <h1 className="display-hero mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] text-white">
            {category.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {category.heroDescription}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="#zapytanie" variant="light" size="lg">
              {category.ctaLabel}
            </Button>
            <Button
              href="/produkty"
              size="lg"
              className="border border-white/35 bg-transparent text-white hover:bg-white/10"
            >
              Katalog produktów
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Dla kogo jest ta kategoria
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {category.description}
            </p>
            <ul className="mt-8 space-y-3">
              {category.audience.map((item) => (
                <li key={item} className="border-l border-primary/25 pl-4 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-surface p-8">
            <h3 className="font-display text-2xl font-semibold text-ink">
              Zastosowania
            </h3>
            <ul className="mt-6 space-y-4">
              {category.applications.map((item) => (
                <li key={item} className="border-b border-border pb-4 text-sm text-muted last:border-b-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-surface">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Co warto przygotować przed zapytaniem
            </h2>
            <p className="text-muted leading-relaxed">
              Im precyzyjniejszy brief, tym sprawniejsza rozmowa o ofercie. Poniżej
              przykładowe punkty, które pomagają doprecyzować potrzeby.
            </p>
          </div>
          <div className="mt-10 grid gap-px bg-border md:grid-cols-2">
            {category.highlights.map((item) => (
              <div key={item} className="bg-white p-6 text-sm leading-relaxed text-muted md:p-8">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {sampleSpecs.length ? (
        <section className="section-pad bg-white">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                Przykładowe dane katalogowe
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                Fragment parametrów z publicznego katalogu ALOPAK. Pełne tabele
                znajdują się na kartach produktów. Potwierdź aktualność w zapytaniu.
              </p>
            </div>
            <SpecTable specs={sampleSpecs} />
          </Container>
        </section>
      ) : null}

      <section className="section-pad bg-white">
        <Container>
          <div className="flex flex-col gap-4 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Warianty w katalogu
            </h2>
            <Link href={`/produkty?kategoria=${category.slug}`} className="text-sm font-semibold text-primary">
              Filtruj katalog
            </Link>
          </div>
          {products.length ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="mt-8 text-muted">
              Szczegółowe warianty uzupełnimy po dostarczeniu katalogu. Możesz już
              teraz wysłać zapytanie.
            </p>
          )}
        </Container>
      </section>

      {relatedIndustries.length ? (
        <section className="section-pad bg-surface">
          <Container>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Powiązane branże
            </h2>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {relatedIndustries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/branze/${industry.slug}`}
                  className="border-t border-border pt-5 transition-colors hover:border-primary"
                >
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted">{industry.description}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <FaqSection items={category.faq} title={`Pytania o ${category.name.toLowerCase()}`} />

      <section id="zapytanie" className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {category.ctaLabel}
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Formularz jest wstępnie ustawiony na tę kategorię. Dodaj ilość,
              wymagania i opcjonalny załącznik.
            </p>
            <ul className="mt-8 space-y-3 text-sm text-muted">
              <li>Imię i nazwisko + firma</li>
              <li>Służbowy e-mail</li>
              <li>Opis zapotrzebowania</li>
              <li>Załącznik PDF / DOC / JPG (max 5 MB)</li>
            </ul>
          </div>
          <div className="border border-border bg-surface/40 p-6 sm:p-8">
            <QuoteForm defaultCategory={category.slug} />
          </div>
        </Container>
      </section>

      <CtaBand
        title="Szukasz innej kategorii?"
        description="Wróć do pełnej oferty albo przejdź od razu do katalogu produktów."
        href="/oferta"
        ctaLabel="Zobacz ofertę"
      />
    </>
  );
}
