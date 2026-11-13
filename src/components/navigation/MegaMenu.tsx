"use client";

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
    <div className="absolute inset-x-0 top-full z-40 flex justify-center px-4 pt-0">
      <div
        role="region"
        aria-label={open === "oferta" ? "Menu oferty" : "Menu branż"}
        onMouseLeave={onClose}
        className={cn(
          "w-full max-w-[920px] overflow-hidden rounded-b-xl border border-t-0 border-border/80 bg-white",
          "shadow-[0_16px_40px_rgba(11,31,75,0.12)]",
          "origin-top animate-[mega-panel_180ms_ease-out]",
        )}
      >
        {open === "oferta" ? (
          <>
            <div className="px-4 pb-3 pt-4 sm:px-5 sm:pb-3.5 sm:pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Kategorie
              </p>
              <ul className="mt-2.5 grid grid-cols-2 gap-1.5">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/oferta/${category.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-[#eef2f7]"
                    >
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-navy transition-colors duration-200 group-hover:text-brand">
                          {category.name}
                        </span>
                        <span className="mt-0.5 block truncate text-xs text-muted">
                          {category.tagline}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-border/70 bg-[#f6f8fb] px-4 py-3 sm:px-5">
              <Link
                href="/oferta"
                onClick={onClose}
                className="text-sm font-semibold text-navy transition-colors hover:text-brand"
              >
                Cała oferta
              </Link>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
                <Link
                  href="/kontakt"
                  onClick={onClose}
                  className="text-sm text-muted transition-colors hover:text-brand"
                >
                  Zapytaj o ofertę
                </Link>
                <Link
                  href="/produkty"
                  onClick={onClose}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
                >
                  Katalog produktów
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="px-4 pb-3 pt-4 sm:px-5 sm:pb-3.5 sm:pt-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Branże
              </p>
              <ul className="mt-2.5 grid grid-cols-1 gap-1 sm:grid-cols-3 sm:gap-1.5">
                {industries.map((industry) => (
                  <li key={industry.slug}>
                    <Link
                      href={`/branze/${industry.slug}`}
                      onClick={onClose}
                      className="group flex items-center justify-between gap-2 rounded-md px-3 py-2.5 transition-colors duration-200 hover:bg-[#eef2f7]"
                    >
                      <span className="text-sm font-semibold text-navy transition-colors duration-200 group-hover:text-brand">
                        {industry.name}
                      </span>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-brand opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-end border-t border-border/70 bg-[#f6f8fb] px-4 py-3 sm:px-5">
              <Link
                href="/branze"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-hover"
              >
                Wszystkie branże
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
