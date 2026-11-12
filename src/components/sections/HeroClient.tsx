"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AluminiumSheen } from "@/components/motion/AluminiumSheen";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { categories } from "@/data/categories";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

export function HeroClient({ photoSrc }: { photoSrc: string }) {
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const mediaRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const media = mediaRef.current;
    const section = sectionRef.current;
    if (!media || !section) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const viewH = window.innerHeight || 1;
        if (rect.bottom > 0 && rect.top < viewH) {
          const offset = Math.min(Math.max(-rect.top * 0.12, -36), 48);
          media.style.transform = `translate3d(0, ${offset}px, 0) scale(1.04)`;
        }
        ticking = false;
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative isolate min-h-[min(88svh,760px)] overflow-hidden bg-navy text-white sm:min-h-[600px] lg:min-h-[640px]"
      >
        <div
          ref={mediaRef}
          className="absolute inset-[-4%] will-change-transform"
          aria-hidden
          style={
            reduced
              ? undefined
              : { transform: "translate3d(0, 0, 0) scale(1.04)" }
          }
        >
          <SmartImage
            src={photoSrc}
            alt=""
            fill
            priority
            className={cn(
              "object-cover object-[70%_45%] transition-opacity duration-700",
              ready ? "opacity-100" : "opacity-0",
            )}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(11,31,75,0.92) 0%, rgba(11,31,75,0.78) 36%, rgba(11,31,75,0.45) 58%, rgba(11,31,75,0.22) 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,31,75,0.35) 0%, transparent 30%, transparent 65%, rgba(11,31,75,0.4) 100%)",
            }}
          />
          <AluminiumSheen className="opacity-40 mix-blend-soft-light" />
        </div>

        <div className="container-wide relative z-10 flex min-h-[min(88svh,760px)] items-center pb-28 pt-20 sm:min-h-[600px] sm:pb-36 sm:pt-24 lg:min-h-[640px] lg:pb-40">
          <div className="w-full max-w-[36rem] lg:max-w-[40rem]">
            <p
              className={cn(
                "text-[13px] font-bold uppercase tracking-[0.18em] text-white/90 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "60ms" }}
            >
              Producent opakowań aluminiowych · od {siteConfig.foundedYear}
            </p>

            <h1
              className={cn(
                "mt-5 text-[clamp(2.85rem,6.4vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-white motion-safe:transition-all motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "160ms" }}
            >
              <span className="block">Puszki aluminiowe</span>
              <span
                className={cn(
                  "block motion-safe:transition-all motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                  ready || reduced
                    ? "translate-y-0 opacity-100"
                    : "translate-y-6 opacity-0",
                )}
                style={reduced ? undefined : { transitionDelay: "280ms" }}
              >
                i folie dla firm
              </span>
            </h1>

            <p
              className={cn(
                "mt-6 max-w-[30rem] text-[17px] leading-relaxed text-white/80 sm:text-[18px] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "420ms" }}
            >
              Folia spożywcza, folia fryzjerska i opakowania aluminiowe dla
              przemysłu, gastronomii i salonów. Opisz potrzeby — przygotujemy
              ofertę.
            </p>

            <div
              className={cn(
                "mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "560ms" }}
            >
              <Button
                href="/kontakt"
                size="lg"
                variant="accent"
                className="btn-premium h-14 w-full rounded-none px-9 text-[15px] font-bold uppercase tracking-[0.04em] sm:w-auto"
              >
                Zapytaj o ofertę
              </Button>
              <Button
                href="/oferta"
                size="lg"
                variant="primary"
                className="btn-premium h-14 w-full rounded-none bg-navy px-9 text-[15px] font-bold uppercase tracking-[0.04em] hover:bg-navy-hover sm:w-auto"
              >
                Poznaj produkty
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-20 bg-transparent pb-8 sm:-mt-28 sm:pb-12 lg:-mt-32">
        <div className="container-wide grid gap-4 sm:grid-cols-3 sm:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/oferta/${category.slug}`}
              className={cn(
                "group card-lift grid grid-cols-[96px_1fr] gap-4 border border-border border-t-[3px] border-t-brand bg-white shadow-[0_18px_40px_rgba(11,31,75,0.16)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:grid-cols-1 sm:gap-0",
                "motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-8 scale-[0.98] opacity-0",
              )}
              style={
                reduced
                  ? undefined
                  : { transitionDelay: `${680 + index * 120}ms` }
              }
            >
              <div className="relative aspect-square overflow-hidden bg-aluminium sm:aspect-[4/3]">
                <SmartImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 96px, 33vw"
                />
                <AluminiumSheen className="opacity-25" />
              </div>
              <div className="flex flex-col justify-center py-3 pr-3 sm:p-5">
                <span className="text-[12px] font-bold tracking-[0.16em] text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1.5 text-lg font-bold tracking-tight text-navy sm:text-xl">
                  {category.name}
                </span>
                <span className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-muted">
                  {category.tagline}
                </span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-transform duration-300 group-hover:translate-x-0.5">
                  Zobacz kategorię
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
