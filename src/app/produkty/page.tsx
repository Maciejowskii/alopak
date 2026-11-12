import { ProductCard } from "@/components/products/ProductCard";
import { CtaBand } from "@/components/sections/CtaBand";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/data/categories";
import { getCatalogSummary, getPublishedProducts } from "@/lib/products/repository";
import { createMetadata } from "@/lib/seo/metadata";
import Link from "next/link";

export const metadata = createMetadata({
  title: "Katalog produktów",
  description:
    "Katalog produktów ALOPAK: puszki aluminiowe, folia spożywcza i folia fryzjerska.",
  path: "/produkty",
});

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: Promise<{ kategoria?: string }>;
}) {
  return <ProductsPageContent searchParams={searchParams} />;
}

async function ProductsPageContent({
  searchParams,
}: {
  searchParams?: Promise<{ kategoria?: string }>;
}) {
  const params = searchParams ? await searchParams : {};
  const selected = params.kategoria;
  const all = getPublishedProducts();
  const products = selected
    ? all.filter((product) => product.category === selected)
    : all;
  const summary = getCatalogSummary();

  return (
    <>
      <section className="section-pad bg-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Produkty" },
            ]}
          />
          <SectionHeading
            title="Produkty ALOPAK"
            description="Parametry produktów. Warunki ustalamy indywidualnie po zapytaniu."
          />

          <div className="mt-8 flex flex-wrap gap-2">
            <FilterChip href="/produkty" active={!selected} label="Wszystkie" />
            {categories.map((category) => (
              <FilterChip
                key={category.slug}
                href={`/produkty?kategoria=${category.slug}`}
                active={selected === category.slug}
                label={`${category.shortName} (${summary.find((s) => s.category.slug === category.slug)?.count || 0})`}
              />
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}

function FilterChip({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        active
          ? "rounded-md bg-primary px-3.5 py-2 text-sm font-semibold text-white"
          : "rounded-md border border-border bg-white px-3.5 py-2 text-sm font-medium text-ink hover:border-primary/30"
      }
    >
      {label}
    </Link>
  );
}
