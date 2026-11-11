import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";

export function CategoryCards() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <SectionHeading
          title="Trzy kategorie produktów"
          description="Wybierz obszar oferty i przejdź do szczegółów lub od razu wyślij zapytanie."
        />

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 80}>
              <Link
                href={`/oferta/${category.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface/40 transition-all duration-300 hover:-translate-y-1 hover:border-primary/25 hover:shadow-soft"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface-alt">
                  <SmartImage
                    src={category.image.src}
                    alt={category.image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold tracking-tight text-ink">
                    {category.name}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {category.tagline}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Poznaj produkt
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
