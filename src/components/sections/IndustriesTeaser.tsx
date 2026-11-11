import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function IndustriesTeaser() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <SectionHeading
          eyebrow="Branże"
          title="Oferta dopasowana do branży"
          description="Wybierz obszar zastosowania, aby zobaczyć powiązane kategorie produktów."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <Reveal key={industry.slug} delay={index * 70}>
              <Link
                href={`/branze/${industry.slug}`}
                className="group block border-t border-border pt-6 transition-colors hover:border-primary"
              >
                <h3 className="text-xl font-semibold text-ink group-hover:text-primary">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Zobacz szczegóły
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
