import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import { categories } from "@/data/categories";
import { stockMedia } from "@/data/media";
import { siteConfig } from "@/data/site";

const HERO_PHOTO = "/images/photos/hero.jpg";

function heroPhotoSrc() {
  try {
    if (
      fs.existsSync(path.join(process.cwd(), "public", "images", "photos", "hero.jpg"))
    ) {
      return HERO_PHOTO;
    }
  } catch {
    /* fall through */
  }
  // Foil / aluminium material until client delivers photos/hero.jpg
  return stockMedia.hero.src;
}

export function Hero() {
  const photoSrc = heroPhotoSrc();

  return (
    <>
      <section className="relative isolate min-h-[min(88svh,760px)] overflow-hidden bg-navy text-white sm:min-h-[600px] lg:min-h-[640px]">
        <div className="absolute inset-0" aria-hidden>
          <SmartImage
            src={photoSrc}
            alt=""
            fill
            priority
            className="object-cover object-[70%_45%]"
            sizes="100vw"
          />
          {/* Stronger veil — foil photo is bright; keep white type readable */}
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
        </div>

        <div className="container-wide relative z-10 flex min-h-[min(88svh,760px)] items-center pb-28 pt-20 sm:min-h-[600px] sm:pb-36 sm:pt-24 lg:min-h-[640px] lg:pb-40">
          <div className="animate-fade-up w-full max-w-[36rem] lg:max-w-[40rem]">
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-white/90">
              Producent opakowań aluminiowych · od {siteConfig.foundedYear}
            </p>

            <h1 className="mt-5 text-[clamp(2.85rem,6.4vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.035em] text-white">
              Puszki aluminiowe
              <br />
              i folie dla firm
            </h1>

            <p className="mt-6 max-w-[30rem] text-[17px] leading-relaxed text-white/80 sm:text-[18px]">
              Folia spożywcza, folia fryzjerska i opakowania aluminiowe dla
              przemysłu, gastronomii i salonów. Opisz potrzeby — przygotujemy
              ofertę.
            </p>

            <div className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href="/kontakt"
                size="lg"
                variant="accent"
                className="h-14 w-full rounded-none px-9 text-[15px] font-bold uppercase tracking-[0.04em] sm:w-auto"
              >
                Zapytaj o ofertę
              </Button>
              <Button
                href="/oferta"
                size="lg"
                variant="primary"
                className="h-14 w-full rounded-none bg-navy px-9 text-[15px] font-bold uppercase tracking-[0.04em] hover:bg-navy-hover sm:w-auto"
              >
                Poznaj produkty
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cards overlap hero — no white slab in the gap */}
      <div className="relative z-20 -mt-20 bg-transparent pb-8 sm:-mt-28 sm:pb-12 lg:-mt-32">
        <div className="container-wide grid gap-4 sm:grid-cols-3 sm:gap-5">
          {categories.map((category, index) => (
            <Link
              key={category.slug}
              href={`/oferta/${category.slug}`}
              className="group grid grid-cols-[96px_1fr] gap-4 border border-border border-t-[3px] border-t-brand bg-white shadow-[0_18px_40px_rgba(11,31,75,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(11,31,75,0.2)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:grid-cols-1 sm:gap-0"
            >
              <div className="relative aspect-square overflow-hidden bg-aluminium sm:aspect-[4/3]">
                <SmartImage
                  src={category.image.src}
                  alt={category.image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  sizes="(max-width: 640px) 96px, 33vw"
                />
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
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-transform group-hover:translate-x-0.5">
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
