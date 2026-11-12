import { Container } from "@/components/ui/Container";

const steps = [
  {
    title: "Wybierasz kategorię",
    text: "Puszki aluminiowe, folia spożywcza, folia fryzjerska — albo konkretny produkt z katalogu.",
  },
  {
    title: "Przesyłasz zapytanie",
    text: "Opisujesz potrzeby, ilość i wymagania. Możesz dołączyć plik ze specyfikacją.",
  },
  {
    title: "Doprecyzowujemy szczegóły",
    text: "ALOPAK kontaktuje się w sprawie oferty dopasowanej do zgłoszenia.",
  },
  {
    title: "Otrzymujesz informacje ofertowe",
    text: "Warunki współpracy ustalamy indywidualnie, po zapoznaniu się z Twoim zapytaniem.",
  },
];

export function ProcessSteps() {
  return (
    <section className="section-pad bg-white">
      <Container>
        <div className="max-w-2xl">
          <h2 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Jak wygląda współpraca
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Prosty przebieg od wyboru kategorii do rozmowy ofertowej.
          </p>
        </div>

        <ol className="mt-14 grid gap-0 border-t border-border md:grid-cols-4">
          {steps.map((step, index) => (
            <li
              key={step.title}
              className="border-b border-border py-8 md:border-b-0 md:border-r md:px-5 md:py-10 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
            >
              <p className="font-display text-sm font-semibold tracking-[0.18em] text-accent-dark">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-5 font-display text-xl font-semibold text-ink">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
