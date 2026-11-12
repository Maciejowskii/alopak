"use client";

import Link from "next/link";
import { CountUp } from "@/components/motion/CountUp";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { contact, siteConfig } from "@/data/site";

export function AboutTeaser() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <Reveal>
              <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
                Producent z Ostrzeszowa
              </h2>
            </Reveal>
            <Reveal delay={100}>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted sm:mt-6 sm:text-lg">
                Od {siteConfig.foundedYear} roku produkujemy opakowania
                aluminiowe i wyroby z folii aluminiowej. Nasza siedziba mieści
                się w Ostrzeszowie przy ul. Składowej 3.
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
                Zapytanie z załącznikiem – w formularzu możesz dołączyć
                specyfikację lub rysunek.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 sm:mt-8">
                <Button href="/o-firmie" variant="secondary" className="btn-premium">
                  Poznaj firmę
                </Button>
              </div>
            </Reveal>
          </div>
          <dl className="grid gap-6 self-end sm:grid-cols-2 lg:grid-cols-1">
            <Reveal delay={80} variant="scale">
              <Fact
                label="Od"
                value={
                  <CountUp
                    value={siteConfig.foundedYear}
                    className="tabular-nums"
                  />
                }
              />
            </Reveal>
            <Reveal delay={160} variant="scale">
              <Fact label="Ostrzeszów" value={contact.city} />
            </Reveal>
            <Reveal delay={240} variant="scale">
              <Fact
                label="Kontakt"
                value={
                  <Link href={`mailto:${contact.email}`} className="hover:text-primary">
                    {contact.email}
                  </Link>
                }
              />
            </Reveal>
          </dl>
        </div>
      </Container>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="border-t border-border pt-4">
      <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
        {label}
      </dt>
      <dd className="mt-2 text-xl font-bold text-navy">{value}</dd>
    </div>
  );
}
