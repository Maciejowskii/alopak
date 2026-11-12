import Link from "next/link";
import { industries } from "@/data/industries";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";

export function IndustriesTeaser() {
  return (
    <section className="bg-surface">
      <Container className="section-pad">
        <Reveal>
          <h2 className="max-w-2xl text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Dla kogo produkujemy
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
            Każda branża ma osobną stronę z zastosowaniami i produktami.
          </p>
        </Reveal>
      </Container>

      <div className="space-y-0">
        {industries.map((industry, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={industry.slug}
              className="grid border-t border-border lg:grid-cols-2"
            >
              <Reveal
                variant="fade"
                delay={40}
                duration={800}
                className={`relative min-h-[200px] overflow-hidden sm:min-h-[280px] lg:min-h-[420px] ${reverse ? "lg:order-2" : ""}`}
              >
                <div className="group absolute inset-0">
                  <SmartImage
                    src={industry.image.src}
                    alt={industry.image.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04] motion-reduce:transition-none"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-navy/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:hidden"
                  />
                </div>
              </Reveal>
              <Reveal
                delay={120}
                variant={reverse ? "left" : "right"}
                className={`flex items-center bg-white px-5 py-8 sm:px-10 sm:py-12 lg:px-16 ${reverse ? "lg:order-1" : ""}`}
              >
                <div className="max-w-md">
                  <h3 className="text-2xl font-bold text-navy sm:text-3xl">
                    {industry.name}
                  </h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted sm:mt-4 sm:text-base">
                    {industry.description}
                  </p>
                  <Link
                    href={`/branze/${industry.slug}`}
                    className="link-underline mt-4 inline-flex text-sm font-semibold text-primary sm:mt-6"
                  >
                    Zobacz zastosowania
                  </Link>
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
