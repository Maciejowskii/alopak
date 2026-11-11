import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const steps = [
  {
    step: "01",
    title: "Wybierasz kategorię",
    text: "Puszki aluminiowe, folia spożywcza lub folia fryzjerska — albo katalog produktów.",
  },
  {
    step: "02",
    title: "Przesyłasz zapytanie",
    text: "Opisujesz potrzeby, ilość i wymagania. Możesz dołączyć plik ze specyfikacją.",
  },
  {
    step: "03",
    title: "Rozmawiamy o szczegółach",
    text: "ALOPAK kontaktuje się w sprawie doprecyzowania oferty.",
  },
  {
    step: "04",
    title: "Otrzymujesz informacje ofertowe",
    text: "Dalsze informacje i warunki współpracy omawiane są indywidualnie.",
  },
];

export function ProcessSteps() {
  return (
    <section className="section-pad surface-grid">
      <Container>
        <SectionHeading
          eyebrow="Współpraca"
          title="Prosty proces zapytania ofertowego"
          description="Bez deklarowania terminów odpowiedzi, których firma nie potwierdziła publicznie."
        />
        <ol className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((item, index) => (
            <Reveal key={item.step} delay={index * 70}>
              <li className="h-full rounded-lg border border-border bg-white p-6">
                <p className="text-sm font-semibold tracking-[0.16em] text-accent-dark">
                  {item.step}
                </p>
                <h3 className="mt-4 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
