"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";

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
      <div className="container-wide py-4">
        {open === "oferta" ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-10">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-dark">
                Kategorie
              </p>
              <ul className="mt-2 grid gap-0 sm:grid-cols-2">
                {categories.map((category) => (
                  <li key={category.slug}>
                    <Link
                      href={`/oferta/${category.slug}`}
                      onClick={onClose}
                      className="group flex items-baseline justify-between gap-3 border-b border-border py-2.5 pr-2 transition-colors hover:border-brand"
                    >
                      <span>
                        <span className="block text-sm font-semibold text-navy group-hover:text-brand">
                          {category.name}
                        </span>
                        <span className="mt-0.5 block text-xs text-muted">
                          {category.tagline}
                        </span>
                      </span>
                      <ArrowRight
                        className="size-3.5 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-2 border-t border-border pt-3 lg:min-w-[200px] lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <Link
                href="/oferta"
                onClick={onClose}
                className="text-sm font-semibold text-navy hover:text-brand"
              >
                Cała oferta
              </Link>
              <Link
                href="/produkty"
                onClick={onClose}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Katalog produktów
                <ArrowRight className="size-3.5" aria-hidden />
              </Link>
              <Link
                href="/kontakt"
                onClick={onClose}
                className="text-sm text-muted hover:text-brand"
              >
                Zapytaj o ofertę
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-dark">
              Branże
            </p>
            <ul className="mt-2 grid gap-0 sm:grid-cols-3">
              {industries.map((industry) => (
                <li key={industry.slug}>
                  <Link
                    href={`/branze/${industry.slug}`}
                    onClick={onClose}
                    className="group flex items-baseline justify-between gap-3 border-b border-border py-2.5 pr-2 transition-colors hover:border-brand sm:border-b-0 sm:border-l sm:border-border sm:pl-4 sm:first:border-l-0 sm:first:pl-0"
                  >
                    <span className="text-sm font-semibold text-navy group-hover:text-brand">
                      {industry.name}
                    </span>
                    <ArrowRight
                      className="size-3.5 shrink-0 text-brand opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/branze"
              onClick={onClose}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
            >
              Wszystkie branże
              <ArrowRight className="size-3.5" aria-hidden />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
