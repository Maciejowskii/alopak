import { Handshake, Layers3, MessageSquareText, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const items = [
  {
    icon: Layers3,
    title: "Kilka kategorii w jednym miejscu",
    text: "Puszki aluminiowe, folia spożywcza i folia fryzjerska — czytelny podział oferty dla odbiorców biznesowych.",
  },
  {
    icon: Handshake,
    title: "Partner B2B",
    text: "Komunikacja skierowana do firm: zakupów, produkcji, hurtowni i dystrybucji.",
  },
  {
    icon: MessageSquareText,
    title: "Bezpośredni kontakt",
    text: "Formularz zapytania pozwala opisać potrzeby i dołączyć specyfikację.",
  },
  {
    icon: ShieldCheck,
    title: "Podejście do jakości",
    text: "Od 2004 roku firma wdraża system zarządzania jakością; aktualnie deklaruje zgodność z ISO 9001:2015.",
  },
];

export function WhyAlopak() {
  return (
    <section className="section-pad surface-grid">
      <Container>
        <SectionHeading
          eyebrow="Dlaczego ALOPAK"
          title="Przejrzysta oferta i kontakt z producentem"
          description="Skupiamy się na faktach i praktycznej współpracy — bez pustych sloganów."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <Reveal key={item.title} delay={index * 70}>
              <div className="h-full rounded-lg border border-border/80 bg-white/80 p-6">
                <item.icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
