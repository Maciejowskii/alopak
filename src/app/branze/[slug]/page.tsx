import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategory } from "@/data/categories";
import { getIndustry, industries } from "@/data/industries";
import { getProductsByCategory } from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Omit<SlugPageProps, never>) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/branze/${industry.slug}`,
    image: industry.image.src,
  });
}

export default async function IndustryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const relatedCategories = industry.relatedCategories
    .map((categorySlug) => getCategory(categorySlug))
    .filter(Boolean);

  const sampleProducts = industry.relatedCategories.flatMap((categorySlug) =>
    getProductsByCategory(categorySlug).slice(0, 2),
  );

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Branże", path: "/branze" },
          { name: industry.name, path: `/branze/${industry.slug}` },
        ])}
      />

      <section className="relative isolate min-h-[460px] overflow-hidden bg-primary text-white">
        <SmartImage
          src={industry.image.src}
          alt={industry.image.alt}
          fill
          priority
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a29]/92 to-[#0f2438]/50" />
        <Container className="relative flex min-h-[460px] flex-col justify-end pb-14 pt-28">
          <Breadcrumbs
            tone="light"
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Branże", href: "/branze" },
              { label: industry.name },
            ]}
          />
          <h1 className="display-hero mt-4 max-w-3xl text-[clamp(2.3rem,5vw,4.2rem)]">
            {industry.name}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">
            {industry.description}
          </p>
          <div className="mt-8">
            <Button href="/kontakt" variant="light" size="lg">
              Zapytaj o ofertę
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-pad bg-white">
        <Container>
          <h2 className="font-display text-3xl font-semibold text-ink">
            Powiązane kategorie produktów
          </h2>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {relatedCategories.map((category) =>
              category ? (
                <Link
                  key={category.slug}
                  href={`/oferta/${category.slug}`}
                  className="group grid gap-4 py-8 md:grid-cols-[1fr_auto] md:items-center"
                >
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-ink group-hover:text-primary">
                      {category.name}
                    </h3>
                    <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
                      {category.description}
                    </p>
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    Zobacz kategorię
                  </span>
                </Link>
              ) : null,
            )}
          </div>
        </Container>
      </section>

      {sampleProducts.length ? (
        <section className="section-pad bg-surface">
          <Container>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Przykładowe produkty
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {sampleProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/produkty/${product.slug}`}
                  className="border border-border bg-white p-6 transition-colors hover:border-primary/30"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-accent-dark">
                    {product.id}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-semibold text-ink">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm text-muted">{product.shortDescription}</p>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <section className="section-pad bg-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="font-display text-3xl font-semibold text-ink">
              Przygotuj zapytanie dla tej branży
            </h2>
            <p className="mt-4 max-w-2xl text-muted leading-relaxed">
              Wskaż kategorię produktu, szacowane zapotrzebowanie i wymagania.
              Jeśli masz brief lub specyfikację — dołącz plik.
            </p>
          </div>
          <Button href="/kontakt" size="lg">
            Przejdź do formularza
          </Button>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
