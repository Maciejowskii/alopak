import type { FaqItem } from "@/types";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo/schema";

export function FaqSection({
  items,
  title = "Najczęstsze pytania",
  description = "Szczegóły handlowe omawiamy indywidualnie.",
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
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted">{description}</p>
        </div>
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
