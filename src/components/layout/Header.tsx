"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, Search, X } from "lucide-react";
import { categories } from "@/data/categories";
import { industries } from "@/data/industries";
import { Button } from "@/components/ui/Button";
import { MegaMenu } from "@/components/navigation/MegaMenu";
import { cn } from "@/lib/utils";

type MegaKey = "oferta" | "branze" | null;

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mega, setMega] = useState<MegaKey>(null);
  const [menuPath, setMenuPath] = useState(pathname);
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);

  if (pathname !== menuPath) {
    setMenuPath(pathname);
    setMobileOpen(false);
    setMega(null);
  }

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
    <header ref={headerRef} className="sticky top-0 z-50 border-b border-border/70 bg-white">
      <div className="container-wide flex h-[4.75rem] items-center justify-between gap-6 lg:h-[5.25rem]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-3"
          aria-label="ALOPAK — strona główna"
          onClick={() => {
            setMega(null);
            setMobileOpen(false);
          }}
        >
          <span className="relative inline-flex size-10 items-center justify-center" aria-hidden>
            <span className="absolute left-0 top-1 size-7 rotate-[-18deg] bg-navy" />
            <span className="absolute left-2.5 top-0.5 size-7 rotate-[8deg] bg-brand" />
            <span className="absolute left-5 top-1.5 size-6 rotate-[28deg] bg-brand-strong/90" />
          </span>
          <span className="leading-none">
            <span className="block text-[1.35rem] font-extrabold tracking-[0.04em] text-navy sm:text-[1.5rem]">
              ALOPAK
            </span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
              Opakowania aluminiowe
            </span>
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 xl:gap-2 lg:flex"
          aria-label="Główna nawigacja"
        >
          <NavLink href="/" active={pathname === "/"} onNavigate={() => setMega(null)}>
            Strona główna
          </NavLink>
          <MegaTrigger
            label="Oferta"
            active={
              mega === "oferta" ||
              pathname.startsWith("/oferta") ||
              pathname.startsWith("/produkty")
            }
            expanded={mega === "oferta"}
            controlsId="mega-oferta"
            onOpen={() => setMega("oferta")}
            onToggle={() => setMega((v) => (v === "oferta" ? null : "oferta"))}
          />
          <MegaTrigger
            label="Branże"
            active={mega === "branze" || pathname.startsWith("/branze")}
            expanded={mega === "branze"}
            controlsId="mega-branze"
            onOpen={() => setMega("branze")}
            onToggle={() => setMega((v) => (v === "branze" ? null : "branze"))}
          />
          <NavLink
            href="/o-firmie"
            active={pathname.startsWith("/o-firmie")}
            onNavigate={() => setMega(null)}
          >
            O firmie
          </NavLink>
          <NavLink
            href="/blog"
            active={pathname.startsWith("/blog")}
            onNavigate={() => setMega(null)}
          >
            Blog
          </NavLink>
          <NavLink
            href="/kontakt"
            active={pathname.startsWith("/kontakt")}
            onNavigate={() => setMega(null)}
          >
            Kontakt
          </NavLink>
        </nav>

        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/produkty"
            className="inline-flex size-11 items-center justify-center text-navy transition-colors hover:text-brand"
            aria-label="Katalog produktów"
            onClick={() => setMega(null)}
          >
            <Search className="size-5" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center text-navy transition-colors hover:text-brand lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => {
              setMega(null);
              setMobileOpen((value) => !value);
            }}
          >
            {mobileOpen ? <X className="size-6" strokeWidth={1.75} /> : <Menu className="size-6" strokeWidth={1.75} />}
          </button>
        </div>
      </div>

      <div
        id={mega === "oferta" ? "mega-oferta" : mega === "branze" ? "mega-branze" : undefined}
        className="relative hidden lg:block"
      >
        <MegaMenu open={mega} onClose={() => setMega(null)} />
      </div>

      <div
        id={menuId}
        className={cn(
          "border-t border-border bg-white lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div className="container-wide max-h-[calc(100vh-5.25rem)] space-y-1 overflow-y-auto py-5">
          <div className="mb-4 grid gap-2 lg:hidden">
            <Link
              href="/"
              className="block py-2.5 text-base font-semibold text-navy"
              onClick={() => setMobileOpen(false)}
            >
              Strona główna
            </Link>
          </div>

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

          <div className="pt-4">
            <Button
              href="/kontakt"
              variant="accent"
              className="w-full rounded-none"
              onClick={() => setMobileOpen(false)}
            >
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
  expanded,
  controlsId,
  onOpen,
  onToggle,
}: {
  label: string;
  active: boolean;
  expanded: boolean;
  controlsId: string;
  onOpen: () => void;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className={cn(
        "inline-flex min-h-11 items-center gap-1.5 px-3 text-[15px] font-semibold transition-colors xl:px-4",
        active ? "text-brand" : "text-navy hover:text-brand",
      )}
      aria-expanded={expanded}
      aria-controls={controlsId}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onToggle}
    >
      {label}
      <ChevronDown
        className={cn("size-3.5 opacity-60 transition-transform", expanded && "rotate-180")}
        strokeWidth={2.25}
      />
    </button>
  );
}

function NavLink({
  href,
  children,
  onNavigate,
  active,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "inline-flex min-h-11 items-center px-3 text-[15px] font-semibold transition-colors xl:px-4",
        active ? "text-brand" : "text-navy hover:text-brand",
      )}
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
