"use client";

import { SmartImage } from "@/components/ui/SmartImage";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";

type MegaMenuProps = {
  open: "oferta" | "branze" | null;
  onClose: () => void;
};

export function MegaMenu({ open, onClose }: MegaMenuProps) {
  if (!open) return null;

  return (
    <div
      className="absolute inset-x-0 top-full z-40 border-b border-border bg-white shadow-[var(--shadow-nav)]"
      onMouseLeave={onClose}
    >
      <div className="container-wide py-8">
        {open === "oferta" ? (
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
            <div className="grid gap-4 sm:grid-cols-3">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/oferta/${category.slug}`}
                  onClick={onClose}
                  className="group block"
                >
                  <div className="relative mb-4 aspect-[4/3] overflow-hidden bg-surface">
                    <SmartImage
                      src={category.image.src}
                      alt={category.image.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      sizes="280px"
                    />
                  </div>
                  <p className="font-display text-lg font-semibold text-ink group-hover:text-primary">
                    {category.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {category.tagline}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    Zobacz kategorię
                    <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <p className="font-display text-xl font-semibold text-ink">
                Katalog produktów
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Przejrzyj opublikowane warianty z danymi katalogowymi i wyślij
                zapytanie z konkretnym produktem.
              </p>
              <Link
                href="/produkty"
                onClick={onClose}
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary"
              >
                Otwórz katalog
                <ArrowRight className="size-3.5" />
              </Link>
              <div className="mt-8 space-y-2 border-t border-border pt-6">
                {categories.map((category) => (
                  <Link
                    key={`cta-${category.slug}`}
                    href={`/kontakt?kategoria=${category.slug}`}
                    onClick={onClose}
                    className="block text-sm text-muted transition-colors hover:text-primary"
                  >
                    Zapytaj o: {category.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branze/${industry.slug}`}
                onClick={onClose}
                className={cn(
                  "group border-t border-border pt-5 transition-colors hover:border-primary",
                )}
              >
                <p className="font-display text-xl font-semibold text-ink group-hover:text-primary">
                  {industry.name}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {industry.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                  Przejdź do branży
                  <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
