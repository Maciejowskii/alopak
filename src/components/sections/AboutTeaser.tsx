import Link from "next/link";
import { contact, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function AboutTeaser() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="grid gap-12 border-t border-border pt-12 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Polski producent opakowań aluminiowych
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              Od {siteConfig.foundedYear} roku ALOPAK oferuje opakowania
              aluminiowe do zastosowań biznesowych oraz inne wyroby z folii
              aluminiowej. Siedziba firmy: {contact.city}, {contact.street}.
            </p>
            <div className="mt-8">
              <Button href="/o-firmie" variant="secondary">
                Poznaj ALOPAK
              </Button>
            </div>
          </div>
          <dl className="grid gap-6 self-end sm:grid-cols-2 lg:grid-cols-1">
            <Fact label="Działalność od" value={String(siteConfig.foundedYear)} />
            <Fact label="Lokalizacja" value={`${contact.city}, Polska`} />
            <Fact
              label="Kontakt"
              value={
                <Link href={`mailto:${contact.email}`} className="hover:text-primary">
                  {contact.email}
                </Link>
              }
            />
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
