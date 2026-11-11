import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { stockMedia } from "@/data/media";

export function Hero() {
  return (
    <section className="relative isolate min-h-[min(92vh,900px)] overflow-hidden bg-primary text-white">
      <SmartImage
        src={stockMedia.hero.src}
        alt={stockMedia.hero.alt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b1a29]/90 via-[#0f2438]/72 to-[#0f2438]/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a29]/50 via-transparent to-transparent" />

      <div className="container-wide relative flex min-h-[min(92vh,900px)] flex-col justify-end pb-16 pt-28 sm:pb-20 lg:justify-center lg:pb-24 lg:pt-28">
        <div className="max-w-3xl animate-fade-up">
          <p className="font-display text-sm font-semibold tracking-[0.28em] text-white/70 sm:text-base">
            ALOPAK
          </p>
          <h1 className="display-hero mt-5 max-w-[14ch] text-[clamp(2.6rem,7vw,5.4rem)] text-white">
            Opakowania i folie dla profesjonalnych zastosowań
          </h1>
          <div className="mt-7 h-px w-24 bg-white/35" />
          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            Puszki aluminiowe, folia spożywcza i folia fryzjerska dla firm.
            Skontaktuj się, aby omówić potrzeby zakupowe Twojej organizacji.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt" size="lg" variant="light">
              Zapytaj o ofertę
            </Button>
            <Button
              href="/oferta"
              size="lg"
              className="border border-white/35 bg-transparent text-white hover:bg-white/10"
            >
              Poznaj produkty
            </Button>
          </div>
        </div>

        <p className="mt-10 text-[11px] tracking-wide text-white/45">
          Wizualizacja materiałowa (grafika projektowa) — oczekujemy na zdjęcia produktowe ALOPAK.
        </p>
      </div>
    </section>
  );
}
