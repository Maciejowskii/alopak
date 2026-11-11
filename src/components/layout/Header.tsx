"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { cn } from "@/lib/utils";

type MegaKey = "oferta" | "branze" | null;

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setMega(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setMega(null);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/80 bg-white/95 backdrop-blur-md"
    >
      <div className="container-wide flex h-[4.25rem] items-center justify-between gap-4 lg:h-[4.75rem]">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-[0.06em] text-primary sm:text-[1.35rem]"
          aria-label="ALOPAK — strona główna"
          onClick={() => {
            setMega(null);
            setMobileOpen(false);
          }}
        >
          ALOPAK
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Główna nawigacja">
          <MegaTrigger
            label="Oferta"
            active={mega === "oferta"}
            onOpen={() => setMega("oferta")}
            onToggle={() => setMega((v) => (v === "oferta" ? null : "oferta"))}
          />
          <MegaTrigger
            label="Branże"
            active={mega === "branze"}
            onOpen={() => setMega("branze")}
            onToggle={() => setMega((v) => (v === "branze" ? null : "branze"))}
          />
          <NavLink href="/o-firmie" onNavigate={() => setMega(null)}>
            O firmie
          </NavLink>
          <NavLink href="/blog" onNavigate={() => setMega(null)}>
            Blog
          </NavLink>
          <NavLink href="/kontakt" onNavigate={() => setMega(null)}>
            Kontakt
          </NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/kontakt" size="sm" className="hidden sm:inline-flex">
            Zapytaj o ofertę
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-primary lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setMobileOpen((value) => !value)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div className="relative hidden lg:block">
        <MegaMenu open={mega} onClose={() => setMega(null)} />
      </div>

      <div
        id={menuId}
        className={cn("border-t border-border bg-white lg:hidden", mobileOpen ? "block" : "hidden")}
      >
        <div className="container-site max-h-[calc(100vh-4.25rem)] space-y-1 overflow-y-auto py-4">
          <MobileGroup title="Oferta" href="/oferta" onNavigate={() => setMobileOpen(false)}>
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/oferta/${category.slug}`}
                className="block py-2 text-sm text-muted"
                onClick={() => setMobileOpen(false)}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/produkty"
              className="block py-2 text-sm text-muted"
              onClick={() => setMobileOpen(false)}
            >
              Katalog produktów
            </Link>
          </MobileGroup>

          <MobileGroup title="Branże" href="/branze" onNavigate={() => setMobileOpen(false)}>
            {industries.map((industry) => (
              <Link
                key={industry.slug}
                href={`/branze/${industry.slug}`}
                className="block py-2 text-sm text-muted"
                onClick={() => setMobileOpen(false)}
              >
                {industry.name}
              </Link>
            ))}
          </MobileGroup>

          <Link
            href="/o-firmie"
            className="block border-b border-border/70 py-3 font-semibold text-ink"
            onClick={() => setMobileOpen(false)}
          >
            O firmie
          </Link>
          <Link
            href="/blog"
            className="block border-b border-border/70 py-3 font-semibold text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Blog
          </Link>
          <Link
            href="/kontakt"
            className="block border-b border-border/70 py-3 font-semibold text-ink"
            onClick={() => setMobileOpen(false)}
          >
            Kontakt
          </Link>

          <div className="pt-3">
            <Button href="/kontakt" className="w-full" onClick={() => setMobileOpen(false)}>
              Zapytaj o ofertę
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MegaTrigger({
  label,
  active,
  onOpen,
  onToggle,
}: {
  label: string;
  active: boolean;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-surface text-primary" : "text-ink/90 hover:bg-surface hover:text-primary",
      )}
      aria-expanded={active}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onOpen}
    >
      {label}
      <ChevronDown className={cn("size-4 opacity-70 transition-transform", active && "rotate-180")} />
    </button>
  );
}

function NavLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className="rounded-md px-3 py-2 text-sm font-medium text-ink/90 transition-colors hover:bg-surface hover:text-primary"
    >
      {children}
    </Link>
  );
}

function MobileGroup({
  title,
  href,
  children,
  onNavigate,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <div className="border-b border-border/70 py-2">
      <Link href={href} className="block py-2 font-semibold text-ink" onClick={onNavigate}>
        {title}
      </Link>
      <div className="mb-2 space-y-1 pl-3">{children}</div>
    </div>
  );
}
