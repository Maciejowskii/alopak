import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { industries } from "@/data/industries";
import { stockMedia } from "@/data/media";
import { Container } from "@/components/ui/Container";

const images = [
  stockMedia.packaging.src,
  stockMedia.foilRoll.src,
  stockMedia.metal.src,
];

export function IndustriesTeaser() {
  return (
    <section className="bg-surface">
      <Container className="section-pad">
        <h2 className="font-display max-w-2xl text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          Oferta dopasowana do branży
        </h2>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
          Każda strona branżowa łączy się z konkretnymi kategoriami produktów —
          bez powielania cienkiej treści.
        </p>
      </Container>

      <div className="space-y-0">
        {industries.map((industry, index) => {
          const reverse = index % 2 === 1;
          return (
            <div
              key={industry.slug}
              className="grid border-t border-border lg:grid-cols-2"
            >
              <div
                className={`relative min-h-[280px] lg:min-h-[420px] ${reverse ? "lg:order-2" : ""}`}
              >
                <SmartImage
                  src={images[index]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className={`flex items-center bg-white px-6 py-12 sm:px-10 lg:px-16 ${reverse ? "lg:order-1" : ""}`}
              >
                <div className="max-w-md">
                  <h3 className="font-display text-3xl font-semibold text-ink">
                    {industry.name}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-muted">
                    {industry.description}
                  </p>
                  <Link
                    href={`/branze/${industry.slug}`}
                    className="mt-6 inline-flex text-sm font-semibold text-primary underline-offset-4 hover:underline"
                  >
                    Zobacz zastosowania
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
