import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function AboutTeaser() {
  return (
    <section className="section-pad bg-white">
      <Container className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-dark">
            O ALOPAK
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Polski producent opakowań aluminiowych
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            ALOPAK działa od {siteConfig.foundedYear} roku jako producent
            opakowań aluminiowych z siedzibą w Ostrzeszowie. Firma oferuje
            opakowania do zastosowań biznesowych oraz inne wyroby z folii
            aluminiowej — i zaprasza do kontaktu w sprawie dopasowania oferty.
          </p>
          <div className="mt-8">
            <Button href="/o-firmie" variant="secondary">
              Poznaj ALOPAK
            </Button>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="rounded-lg border border-border bg-surface p-8 sm:p-10">
            <dl className="space-y-6">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  Rok rozpoczęcia działalności
                </dt>
                <dd className="mt-2 text-3xl font-semibold text-primary">
                  {siteConfig.foundedYear}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  System jakości
                </dt>
                <dd className="mt-2 text-lg font-medium text-ink">
                  {siteConfig.qualitySystem}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-accent-dark">
                  Lokalizacja
                </dt>
                <dd className="mt-2 text-lg font-medium text-ink">
                  Ostrzeszów, Polska
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
