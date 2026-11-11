import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCategory } from "@/data/categories";
import { getIndustry, industries } from "@/data/industries";
import { createMetadata } from "@/lib/seo/metadata";
import { breadcrumbSchema } from "@/lib/seo/schema";
import type { SlugPageProps } from "@/types/next";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return createMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/branze/${industry.slug}`,
  });
}

export default async function IndustryPage({
  params,
}: SlugPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const related = industry.relatedCategories
    .map((categorySlug) => getCategory(categorySlug))
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Strona główna", path: "/" },
          { name: "Branże", path: "/branze" },
          { name: industry.name, path: `/branze/${industry.slug}` },
        ])}
      />
      <section className="section-pad bg-white">
        <Container className="max-w-3xl">
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Branże", href: "/branze" },
              { label: industry.name },
            ]}
          />
          <h1 className="text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {industry.name}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            {industry.description}
          </p>
          <div className="mt-8">
            <Button href="/kontakt">Zapytaj o ofertę</Button>
          </div>
        </Container>
      </section>

      <section className="section-pad surface-grid">
        <Container>
          <h2 className="text-2xl font-semibold text-ink">Powiązane kategorie</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {related.map((category) =>
              category ? (
                <Link
                  key={category.slug}
                  href={`/oferta/${category.slug}`}
                  className="rounded-lg border border-border bg-white p-6 transition-colors hover:border-primary/30"
                >
                  <h3 className="text-xl font-semibold text-ink">{category.name}</h3>
                  <p className="mt-3 text-sm text-muted">{category.tagline}</p>
                </Link>
              ) : null,
            )}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
