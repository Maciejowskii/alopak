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
import { getProductsByCategory } from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { formatOuterDimension, getSpecValue } from "@/lib/products/format";
import type { SlugPageProps } from "@/types/next";

const categorySampleSpecsIntro: Record<string, { title: string; caption: string }> = {
  "puszki-aluminiowe": {
    title: "Przykład: puszka 54 ml",
    caption: "Pełne parametry każdego wariantu znajdziesz na jego karcie.",
  },
};

function getCategoryFaqTitle(slug: string): string {
  const titles: Record<string, string> = {
    "folia-spozywcza": "Pytania o folię spożywczą",
    "folia-fryzjerska": "Pytania o folię fryzjerską",
    "puszki-aluminiowe": "Pytania o puszki aluminiowe",
    "opakowania-swiecowe": "Pytania o opakowania świecowe",
  };
  return titles[slug] ?? "Najczęstsze pytania";
}

function catalogHeading(slug: string) {
  if (slug === "puszki-aluminiowe" || slug === "opakowania-swiecowe") {
    return "Warianty";
  }
  if (slug === "folia-spozywcza") return "Produkt";
  return "Warianty";
}

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
    ...(category.image.src.endsWith(".svg")
      ? {}
      : { image: category.image.src }),
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
  const heroSrc = category.image.src;
  const sampleProduct =
    category.slug === "puszki-aluminiowe"
      ? products.find((product) => product.slug === "puszka-aluminiowa-54") ??
        products[0]
      : products[0];
  const sampleSpecs = sampleProduct?.specifications.slice(0, 6) || [];

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
        <Container
          className={
            category.applications.length
              ? "grid gap-12 lg:grid-cols-[1.1fr_0.9fr]"
              : undefined
          }
        >
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Dla kogo
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
          {category.applications.length ? (
            <div className="bg-surface p-8">
              <h3 className="font-display text-2xl font-semibold text-ink">
                Zastosowania
              </h3>
              <ul className="mt-6 space-y-4">
                {category.applications.map((item) => (
                  <li
                    key={item}
                    className="border-b border-border pb-4 text-sm text-muted last:border-b-0 last:pb-0"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </Container>
      </section>

      <section className="section-pad bg-surface">
        <Container
          className={
            category.highlights.length
              ? "grid gap-12 lg:grid-cols-2"
              : undefined
          }
        >
          {category.highlights.length ? (
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
                Najważniejsze cechy
              </h2>
              <ul className="mt-8 space-y-3">
                {category.highlights.map((item) => (
                  <li key={item} className="border-l border-primary/25 pl-4 text-muted">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              Co podać w zapytaniu
            </h2>
            <ul className="mt-8 space-y-3">
              {category.inquiryTips.map((item) => (
                <li key={item} className="border-l border-primary/25 pl-4 text-muted">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {sampleSpecs.length ? (
        <section className="section-pad bg-white">
          <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <h2 className="font-display text-3xl font-semibold text-ink">
                {categorySampleSpecsIntro[category.slug]?.title ??
                  "Przykładowe parametry"}
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                {categorySampleSpecsIntro[category.slug]?.caption ??
                  "Pełne parametry każdego wariantu znajdziesz na jego karcie."}
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
              {catalogHeading(category.slug)}
            </h2>
            <Link href={`/produkty?kategoria=${category.slug}`} className="text-sm font-semibold text-primary">
              Filtruj katalog
            </Link>
          </div>

          {category.slug === "puszki-aluminiowe" && products.length ? (
            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[960px] border-collapse text-left text-sm">
                <caption className="sr-only">
                  Porównanie puszek aluminiowych — wymiary i pakowanie
                </caption>
                <thead>
                  <tr className="border-b border-border text-xs uppercase tracking-[0.12em] text-accent-dark">
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Nr kat.
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Pojemność
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Wymiar zewn. (Ø lub dł.×szer.)
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Wymiar wewn.
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Wys.
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Dno
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Wieczko
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Sztuk w kartonie
                    </th>
                    <th scope="col" className="py-3 pr-3 font-semibold">
                      Kartonów na palecie
                    </th>
                    <th scope="col" className="py-3 font-semibold">
                      Sztuk na palecie
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-border">
                      <td className="py-3 pr-3">
                        <Link
                          href={`/produkty/${product.slug}`}
                          className="font-semibold text-primary hover:underline"
                        >
                          {product.catalogNumber ?? product.name}
                        </Link>
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, ["Pojemność"])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {formatOuterDimension(product) ?? "—"}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, [
                          "Średnica wewnętrzna",
                          "Wymiar wewnętrzny",
                        ])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, ["Wysokość"])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, ["Średnica dna", "Wymiar dna"])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, [
                          "Wymiar wieczka aluminiowego zgrzewanego do puszki",
                          "Wieczko",
                        ])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, [
                          "Sztuk w kartonie",
                          "Pakowanie — karton",
                        ])}
                      </td>
                      <td className="py-3 pr-3 text-muted">
                        {getSpecValue(product, ["Kartonów na palecie"])}
                      </td>
                      <td className="py-3 text-muted">
                        {getSpecValue(product, ["Sztuk na palecie"])}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-4 text-xs text-muted">
                Pełne parametry znajdziesz na kartach produktów.
              </p>
            </div>
          ) : null}

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

      <FaqSection
        items={category.faq}
        title={getCategoryFaqTitle(category.slug)}
      />

      <section id="zapytanie" className="section-pad bg-white">
        <Container className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink sm:text-4xl">
              {category.ctaLabel}
            </h2>
            <p className="mt-5 text-muted leading-relaxed">
              Kategoria jest już wybrana. Opisz w wiadomości, czego potrzebujesz
              — szczegóły doprecyzujemy przy ofercie.
            </p>
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
