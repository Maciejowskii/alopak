import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { categories } from "@/data/categories";
import { contact, siteConfig } from "@/data/site";

const HERO_PHOTO = "/images/photos/hero.jpg";

function heroPhotoExists() {
  try {
    return fs.existsSync(path.join(process.cwd(), "public", "images", "photos", "hero.jpg"));
  } catch {
    return false;
  }
}

export function Hero() {
  const hasPhoto = heroPhotoExists();

  return (
    <>
      <section className="relative bg-primary text-white">
        {/* Tło osobno — overflow tylko tu, żeby nie ucinać kart kategorii */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden>
          {hasPhoto ? (
            <SmartImage
              src={HERO_PHOTO}
              alt=""
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <div
              className="absolute inset-0"
              style={{
                backgroundColor: "#0a1628",
                backgroundImage: [
                  "radial-gradient(ellipse 70% 55% at 88% 12%, rgba(154,168,180,0.22), transparent 55%)",
                  "repeating-linear-gradient(90deg, rgba(255,255,255,0.028) 0 1px, transparent 1px 3px)",
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0 1px, transparent 1px 4px)",
                  "linear-gradient(135deg, #0a1628 0%, #0f2438 48%, #1a3148 100%)",
                ].join(", "),
              }}
            />
          )}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, rgba(10,22,40,.92) 0%, rgba(10,22,40,.72) 45%, rgba(10,22,40,.25) 100%)",
            }}
          />
        </div>

        <div className="container-wide relative flex min-h-[min(100svh,900px)] flex-col justify-center pb-16 pt-28 sm:min-h-[88vh] sm:pb-20 lg:pb-28 lg:pt-32">
          <div className="max-w-3xl animate-fade-up lg:max-w-[58%]">
            <p className="text-[12px] font-medium uppercase tracking-[0.22em] text-[#c5ced6] sm:text-[13px]">
              Producent opakowań aluminiowych · Ostrzeszów · od {siteConfig.foundedYear}
            </p>
            <h1 className="display-hero mt-5 max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)] font-semibold text-white">
              Puszki aluminiowe i folie dla przemysłu, gastronomii i salonów
            </h1>
            <p className="mt-6 max-w-xl text-[18px] leading-relaxed text-white/[0.78] sm:text-[20px]">
              Puszki aluminiowe, folia spożywcza i folia fryzjerska dla firm. Opisz
              potrzeby – przygotujemy ofertę.
            </p>
            <div className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href="/kontakt"
                size="lg"
                variant="accent"
                className="h-[52px] w-full rounded-sm sm:w-auto"
              >
                Zapytaj o ofertę
              </Button>
              <Button
                href="/oferta"
                size="lg"
                className="h-[52px] w-full rounded-sm border border-white/40 bg-transparent text-white hover:bg-white/10 sm:w-auto"
              >
                Poznaj produkty
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Karty wychodzą poza hero — ujemny margin zamiast absolute+overflow */}
      <div className="relative z-10 -mt-10 px-0 sm:-mt-14 lg:-mt-20">
        <div className="container-wide grid gap-3 sm:grid-cols-3 sm:gap-4">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/oferta/${category.slug}`}
              className="group flex flex-col rounded-sm border border-border bg-white p-5 text-ink shadow-[0_12px_40px_rgba(10,22,40,0.18)] transition-colors hover:border-accent-cta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-cta"
            >
              <span className="text-[12px] font-semibold tracking-[0.18em] text-accent-cta">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mt-3 font-display text-xl font-semibold tracking-tight">
                {category.name}
              </span>
              <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                {category.tagline}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform group-hover:translate-x-0.5">
                Zobacz kategorię
                <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <section className="border-b border-border bg-surface">
        <dl className="container-wide grid gap-6 py-10 sm:grid-cols-2 sm:py-12">
          <Fact label="Działalność od" value={String(siteConfig.foundedYear)} />
          <Fact label="Siedziba" value={contact.city} />
        </dl>
      </section>
    </>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-border pt-4 sm:border-t-0 sm:border-l sm:pl-6 sm:first:border-l-0 sm:first:pl-0">
      <dt className="text-xs uppercase tracking-[0.16em] text-accent-dark">{label}</dt>
      <dd className="mt-2 font-display text-2xl font-semibold text-ink">{value}</dd>
    </div>
  );
}
