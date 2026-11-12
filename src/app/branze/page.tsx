import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { industries } from "@/data/industries";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { CtaBand } from "@/components/sections/CtaBand";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Branże i zastosowania",
  description:
    "Zastosowania oferty ALOPAK: przemysł spożywczy, gastronomia, branża fryzjerska.",
  path: "/branze",
  image: industries[0]?.image.src,
});

export default function IndustriesPage() {
  return (
    <>
      <section className="section-pad bg-white pt-12">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Branże" },
            ]}
          />
          <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Branże i zastosowania
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Każda branża ma własną stronę z zastosowaniami i powiązanymi
            produktami.
          </p>
        </Container>
      </section>

      <div>
        {industries.map((industry, index) => {
          const reverse = index % 2 === 1;
          return (
            <div key={industry.slug} className="grid border-t border-border lg:grid-cols-2">
              <div className={`relative min-h-[280px] ${reverse ? "lg:order-2" : ""}`}>
                <SmartImage
                  src={industry.image.src}
                  alt={industry.image.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className={`flex items-center bg-white px-6 py-12 sm:px-10 lg:px-16 ${reverse ? "lg:order-1" : ""}`}
              >
                <div>
                  <h2 className="font-display text-3xl font-semibold text-ink">
                    {industry.name}
                  </h2>
                  <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
                    {industry.description}
                  </p>
                  <Link
                    href={`/branze/${industry.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Zobacz szczegóły
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <CtaBand />
    </>
  );
}
