import type { FaqItem } from "@/types";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Reveal } from "@/components/ui/Reveal";
import { faqSchema } from "@/lib/seo/schema";

export function FaqSection({
  items,
  title = "Najczęstsze pytania",
  description,
}: {
  items: FaqItem[];
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-pad bg-surface">
      <JsonLd data={faqSchema(items)} />
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
              {title}
            </h2>
          </Reveal>
          {description ? (
            <Reveal delay={100}>
              <p className="mt-5 text-base leading-relaxed text-muted">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>
        <Reveal delay={80} variant="up">
          <FaqAccordion items={items} />
        </Reveal>
      </Container>
    </section>
  );
}
