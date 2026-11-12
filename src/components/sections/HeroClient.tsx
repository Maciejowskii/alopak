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
        className="relative isolate min-h-[min(78svh,640px)] overflow-hidden bg-navy text-white sm:min-h-[560px] lg:min-h-[640px]"
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
            className="object-cover object-[70%_45%]"
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(11,31,75,0.92) 0%, rgba(11,31,75,0.78) 36%, rgba(11,31,75,0.45) 58%, rgba(11,31,75,0.22) 100%)",
            }}
          />
          {/* Stronger bottom veil on mobile so overlapping cards sit on richer navy */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(11,31,75,0.4) 0%, transparent 28%, transparent 55%, rgba(11,31,75,0.55) 100%)",
            }}
          />
          <AluminiumSheen className="opacity-40 mix-blend-soft-light" />
        </div>

        <div className="container-wide relative z-10 flex min-h-[min(78svh,640px)] items-end pb-24 pt-16 sm:min-h-[560px] sm:items-center sm:pb-36 sm:pt-24 lg:min-h-[640px] lg:pb-40">
          <div className="w-full max-w-[36rem] lg:max-w-[40rem]">
            <p
              className={cn(
                "text-[11px] font-bold uppercase tracking-[0.16em] text-white/90 sm:text-[13px] sm:tracking-[0.18em] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "60ms" }}
            >
              Ostrzeszów · producent opakowań aluminiowych · od{" "}
              {siteConfig.foundedYear}
            </p>

            <h1
              className={cn(
                "mt-3 max-w-[18ch] text-[clamp(2.35rem,9vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.01em] text-white text-balance sm:mt-5 motion-safe:transition-all motion-safe:duration-[850ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-6 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "160ms" }}
            >
              Puszki i folie aluminiowe od polskiego producenta
            </h1>

            <p
              className={cn(
                "mt-4 max-w-[30rem] text-[15px] leading-relaxed text-white/80 sm:mt-6 sm:text-[18px] motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
                ready || reduced
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0",
              )}
              style={reduced ? undefined : { transitionDelay: "420ms" }}
            >
              Puszki do przetworów spożywczych, folia spożywcza i folia
              fryzjerska. Opisz, czego potrzebujesz – przygotujemy ofertę.
            </p>

            <div
              className={cn(
                "mt-7 flex w-full flex-col gap-2.5 sm:mt-10 sm:w-auto sm:flex-row sm:gap-3 motion-safe:transition-all motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
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
                className="btn-premium h-12 w-full rounded-none px-7 text-[13px] font-bold uppercase tracking-[0.04em] sm:h-14 sm:w-auto sm:px-9 sm:text-[15px]"
              >
                Zapytaj o ofertę
              </Button>
              <Button
                href="/oferta"
                size="lg"
                variant="primary"
                className="btn-premium h-12 w-full rounded-none bg-navy px-7 text-[13px] font-bold uppercase tracking-[0.04em] hover:bg-navy-hover sm:h-14 sm:w-auto sm:px-9 sm:text-[15px]"
              >
                Poznaj produkty
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 -mt-14 bg-transparent pb-6 sm:-mt-28 sm:pb-12 lg:-mt-32">
        <div className="container-wide grid gap-3 sm:grid-cols-3 sm:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/oferta/${category.slug}`}
              className={cn(
                "group card-lift grid grid-cols-[84px_1fr] gap-3 border border-border border-t-[3px] border-t-brand bg-white shadow-[0_14px_32px_rgba(11,31,75,0.14)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:grid-cols-1 sm:gap-0 sm:shadow-[0_18px_40px_rgba(11,31,75,0.16)]",
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
                  priority={index < 2}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:transition-none"
                  sizes="(max-width: 640px) 84px, 33vw"
                />
                <AluminiumSheen className="opacity-25" />
              </div>
              <div className="flex flex-col justify-center py-2.5 pr-3 sm:p-5">
                <span className="text-[11px] font-bold tracking-[0.16em] text-brand sm:text-[12px]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 text-base font-bold tracking-tight text-navy sm:mt-1.5 sm:text-xl">
                  {category.name}
                </span>
                <span className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted sm:mt-1.5 sm:text-sm">
                  {category.tagline}
                </span>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-navy transition-transform duration-300 group-hover:translate-x-0.5 sm:mt-3 sm:gap-2 sm:text-sm">
                  Zobacz kategorię
                  <ArrowRight className="size-3.5 sm:size-4" aria-hidden />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
