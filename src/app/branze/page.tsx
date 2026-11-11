import Link from "next/link";
import { industries } from "@/data/industries";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaBand } from "@/components/sections/CtaBand";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "Branże i zastosowania",
  description:
    "Zastosowania oferty ALOPAK: przemysł spożywczy, gastronomia, branża fryzjerska.",
  path: "/branze",
});

export default function IndustriesPage() {
  return (
    <>
      <section className="section-pad bg-white">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Strona główna", href: "/" },
              { label: "Branże" },
            ]}
          />
          <SectionHeading
            eyebrow="Branże"
            title="Zastosowania oferty ALOPAK"
            description="Każda strona branżowa łączy się z konkretnymi kategoriami produktów — bez powielania pustych treści."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branze/${industry.slug}`}
                className="rounded-lg border border-border p-6 transition-all hover:border-primary/30 hover:shadow-soft"
              >
                <h2 className="text-xl font-semibold text-ink">{industry.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
