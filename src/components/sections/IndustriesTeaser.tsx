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
          <h2 className="max-w-2xl text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
            Oferta dopasowana do branży
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Każda branża ma własną stronę z zastosowaniami i powiązanymi
            produktami.
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
                className={`relative min-h-[280px] overflow-hidden lg:min-h-[420px] ${reverse ? "lg:order-2" : ""}`}
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
                className={`flex items-center bg-white px-6 py-12 sm:px-10 lg:px-16 ${reverse ? "lg:order-1" : ""}`}
              >
                <div className="max-w-md">
                  <h3 className="text-3xl font-bold text-navy">
                    {industry.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {industry.description}
                  </p>
                  <Link
                    href={`/branze/${industry.slug}`}
                    className="link-underline mt-6 inline-flex text-sm font-semibold text-primary"
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
