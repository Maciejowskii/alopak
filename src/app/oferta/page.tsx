import Link from "next/link";
import { categories } from "@/data/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import { CtaBand } from "@/components/sections/CtaBand";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Oferta",
  description:
    "Oferta ALOPAK: puszki aluminiowe, folia spożywcza i folia fryzjerska dla klientów B2B.",
  path: "/oferta",
});

export default function OfferPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <Container>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Oferta" }]} />
          <SectionHeading
            eyebrow="Oferta"
            title="Kategorie produktów ALOPAK"
            description="Trzy główne obszary oferty dla odbiorców biznesowych. Wybierz kategorię, aby zobaczyć szczegóły i warianty."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/oferta/${category.slug}`}
                className="group overflow-hidden rounded-lg border border-border transition-all hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] bg-surface">
                  <SmartImage
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-ink group-hover:text-primary">
                    {category.name}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
