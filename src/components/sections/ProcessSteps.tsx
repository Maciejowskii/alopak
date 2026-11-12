"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { useInView } from "@/hooks/useInView";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Wybierz produkt",
    text: "Kategorię albo konkretny produkt z katalogu.",
  },
  {
    title: "Wyślij zapytanie",
    text: "Opisz potrzeby i ilość. W razie potrzeby dołącz specyfikację.",
  },
  {
    title: "Ustalamy szczegóły",
    text: "Skontaktujemy się, żeby doprecyzować zamówienie.",
  },
  {
    title: "Dostajesz ofertę",
    text: "Warunki ustalamy indywidualnie, na podstawie Twojego zapytania.",
  },
];

export function ProcessSteps() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduced = usePrefersReducedMotion();
  const { ref: sectionRef, inView } = useInView<HTMLElement>({ threshold: 0.2 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const lineProgress = reduced ? 1 : scrollProgress;

  useEffect(() => {
    if (reduced) return;

    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const update = () => {
      const rect = track.getBoundingClientRect();
      const view = window.innerHeight || 1;
      const start = view * 0.75;
      const end = view * 0.25;
      const raw = (start - rect.top) / (start - end + rect.height * 0.35);
      setScrollProgress(Math.min(Math.max(raw, 0), 1));
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  return (
    <section ref={sectionRef} className="section-pad bg-white">
      <Container>
        <div className="max-w-2xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold tracking-tight text-navy sm:text-5xl">
              Jak zamówić
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <p className="mt-4 text-[15px] leading-relaxed text-muted sm:mt-5 sm:text-lg">
              Cztery kroki od wyboru produktu do oferty.
            </p>
          </Reveal>
        </div>

        <div className="mt-14">
          {/* Static track — absolute dots at 0/25/50/75% so they stay perfectly level */}
          <div aria-hidden className="relative mb-8 hidden h-3 md:block">
            <div className="absolute top-1/2 right-[calc(25%-5px)] left-[5px] h-px -translate-y-1/2 bg-border">
              <div
                className="h-full origin-left bg-gradient-to-r from-brand via-navy to-brand/40 transition-transform duration-150 ease-out"
                style={{
                  transform: `scaleX(${inView || reduced ? lineProgress : 0})`,
                }}
              />
            </div>
            {steps.map((step, index) => {
              const threshold = index / (steps.length - 1 || 1);
              const active = reduced || lineProgress >= threshold - 0.02;
              return (
                <span
                  key={step.title}
                  className="absolute top-1/2 z-[1] flex size-3 -translate-y-1/2 items-center justify-center"
                  style={{ left: `${(index / steps.length) * 100}%` }}
                >
                  <span className="absolute inset-0 rounded-full bg-white" />
                  <span
                    className={cn(
                      "relative size-2.5 rounded-full transition-colors duration-500",
                      active ? "bg-brand" : "bg-[#c5c0d8]",
                    )}
                  />
                </span>
              );
            })}
          </div>

          <ol
            ref={trackRef}
            className="grid gap-0 border-t border-border md:grid-cols-4 md:border-t-0"
          >
            {steps.map((step, index) => {
              const threshold = index / (steps.length - 1 || 1);
              const active = reduced || lineProgress >= threshold - 0.02;

              return (
                <Reveal
                  key={step.title}
                  as="li"
                  delay={index * 110}
                  variant="up"
                  className="border-b border-border py-8 md:border-b-0 md:pr-5 md:pt-0 md:pb-0 md:last:pr-0"
                >
                  <p
                    className={cn(
                      "text-sm font-bold tracking-[0.16em] transition-all duration-500",
                      active
                        ? "translate-y-0 text-brand opacity-100"
                        : "translate-y-1 text-brand/40 opacity-70",
                    )}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-bold text-navy">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </section>
  );
}
