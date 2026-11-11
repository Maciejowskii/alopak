import type { FaqItem } from "@/types";
import { Container } from "@/components/ui/Container";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function FaqSection({
  items,
  title = "Najczęstsze pytania",
  description = "Odpowiedzi oparte na dostępnych informacjach. Szczegóły handlowe omawiamy indywidualnie.",
}: {
  items: FaqItem[];
  title?: string;
  description?: string;
}) {
  return (
    <section className="section-pad bg-white">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading title={title} description={description} />
        <FaqAccordion items={items} />
      </Container>
    </section>
  );
}
