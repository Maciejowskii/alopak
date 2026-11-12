import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SmartImage } from "@/components/ui/SmartImage";
import { stockMedia } from "@/data/media";
import { siteConfig } from "@/data/site";

const points = [
  {
    title: "Oferta zebrana w jednym miejscu",
    text: "Puszki aluminiowe, folia spożywcza i folia fryzjerska — z jasnym podziałem kategorii dla odbiorców biznesowych.",
  },
  {
    title: "Bezpośredni kontakt z firmą",
    text: "Formularz zapytania pozwala opisać wymagania i dołączyć specyfikację przed rozmową ofertową.",
  },
];

export function WhyAlopak() {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="grid lg:grid-cols-2">
        <Reveal variant="fade" className="relative min-h-[360px] lg:min-h-full" duration={900}>
          <div className="absolute inset-0">
            <SmartImage
              src={stockMedia.partnership.src}
              alt={stockMedia.partnership.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              aria-hidden
              className="absolute inset-y-0 right-0 hidden w-px bg-gradient-to-b from-transparent via-brand/40 to-transparent lg:block"
            />
          </div>
        </Reveal>
        <div className="section-pad">
          <Container className="lg:pl-10 xl:pl-16">
            <Reveal>
              <h2 className="max-w-lg text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Partner dla zakupów opakowań i folii
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-base">
                ALOPAK od {siteConfig.foundedYear} roku produkuje opakowania
                aluminiowe w Ostrzeszowie.
              </p>
            </Reveal>
            <div className="mt-8 space-y-6 sm:mt-10 sm:space-y-8">
              {points.map((point, index) => (
                <Reveal key={point.title} delay={180 + index * 140} variant="left">
                  <div className="group relative border-l border-primary/30 pl-5 transition-colors duration-500 hover:border-brand">
                    <span
                      aria-hidden
                      className="absolute -left-[3px] top-1.5 h-6 w-[5px] origin-top scale-y-0 bg-brand transition-transform duration-500 ease-out group-hover:scale-y-100 motion-reduce:scale-y-100"
                    />
                    <h3 className="text-xl font-bold text-navy">{point.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                      {point.text}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
