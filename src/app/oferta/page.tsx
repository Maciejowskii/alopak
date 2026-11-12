import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { categories } from "@/data/categories";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Oferta",
  description:
    "Oferta ALOPAK: puszki aluminiowe, folia spożywcza i folia fryzjerska dla klientów B2B.",
  path: "/oferta",
  image: categories[0]?.image.src,
});

export default function OfferPage() {
  return (
    <>
      <section className="section-pad bg-white pt-12">
        <Container>
          <Breadcrumbs items={[{ label: "Strona główna", href: "/" }, { label: "Oferta" }]} />
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Oferta produktowa ALOPAK
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Trzy główne obszary oferty dla odbiorców biznesowych. Wybierz
            kategorię, aby zobaczyć szczegóły, warianty i formularz zapytania.
          </p>

          <div className="mt-14 divide-y divide-border border-y border-border">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/oferta/${category.slug}`}
                className="group grid gap-6 py-10 lg:grid-cols-[280px_1fr]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                  <SmartImage
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="280px"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h2 className="font-display text-3xl font-semibold text-ink group-hover:text-primary">
                    {category.name}
                  </h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
                    {category.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-primary">
                    Przejdź do kategorii
                  </span>
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
