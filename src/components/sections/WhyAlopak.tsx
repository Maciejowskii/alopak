import { SmartImage } from "@/components/ui/SmartImage";
import { stockMedia } from "@/data/media";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";

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
        <div className="relative min-h-[360px] lg:min-h-full">
          <SmartImage
            src={stockMedia.partnership.src}
            alt={stockMedia.partnership.alt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
        <div className="section-pad">
          <Container className="lg:pl-10 xl:pl-16">
            <h2 className="font-display max-w-lg text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
              Partner dla zakupów opakowań i folii
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted">
              ALOPAK od {siteConfig.foundedYear} roku produkuje opakowania
              aluminiowe w Ostrzeszowie.
            </p>
            <div className="mt-10 space-y-8">
              {points.map((point) => (
                <div key={point.title} className="border-l border-primary/30 pl-5">
                  <h3 className="font-display text-xl font-semibold text-ink">
                    {point.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-relaxed text-muted">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </div>
      </div>
    </section>
  );
}
