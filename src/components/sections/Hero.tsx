import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SmartImage } from "@/components/ui/SmartImage";

export function Hero() {
  return (
    <section className="relative overflow-hidden metal-sheen">
      <div className="absolute inset-0">
        <SmartImage
          src="/images/hero-aluminium.svg"
          alt=""
          fill
          priority
          className="object-cover opacity-[0.22]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40" />
      </div>

      <Container className="relative grid min-h-[min(88vh,820px)] items-center gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
        <div className="animate-fade-up">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-dark">
            ALOPAK
          </p>
          <h1 className="mt-4 max-w-xl text-balance text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-[3.4rem] lg:leading-[1.08]">
            Opakowania i folie dla profesjonalnych zastosowań
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Poznaj ofertę ALOPAK obejmującą puszki aluminiowe, folię spożywczą i
            folię fryzjerską. Skontaktuj się z nami, aby porozmawiać o
            rozwiązaniu dopasowanym do potrzeb Twojej firmy.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/kontakt" size="lg">
              Zapytaj o ofertę
            </Button>
            <Button href="/produkty" variant="secondary" size="lg">
              Zobacz produkty
            </Button>
          </div>
        </div>

        <div className="relative animate-fade-in">
          <div className="relative aspect-[5/4] overflow-hidden rounded-lg border border-border/70 bg-[#1A3553] shadow-soft">
            <SmartImage
              src="/images/hero-aluminium.svg"
              alt="Wizualizacja materiałów aluminiowych ALOPAK"
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            Wizualizacja zastępcza — oczekujemy na zdjęcia produktowe od ALOPAK.
          </p>
        </div>
      </Container>
    </section>
  );
}
