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
  const [mobileSection, setMobileSection] = useState<"oferta" | "branze" | null>(
    null,
  );
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

  function closeMobile() {
    setMobileOpen(false);
  }

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-b border-border/70 bg-white"
    >
      <div className="container-wide flex h-16 items-center justify-between gap-4 sm:h-[4.75rem] sm:gap-6 lg:h-[5.25rem]">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 sm:gap-3"
          aria-label="ALOPAK — strona główna"
          onClick={() => {
            setMega(null);
            closeMobile();
          }}
        >
          <span
            className="relative inline-flex size-9 items-center justify-center sm:size-10"
            aria-hidden
          >
            <span className="absolute left-0 top-1 size-6 rotate-[-18deg] bg-navy sm:size-7" />
            <span className="absolute left-2 top-0.5 size-6 rotate-[8deg] bg-brand sm:left-2.5 sm:size-7" />
            <span className="absolute left-4 top-1.5 size-5 rotate-[28deg] bg-brand-strong/90 sm:left-5 sm:size-6" />
          </span>
          <span className="leading-none">
            <span className="block text-[1.2rem] font-extrabold tracking-[0.04em] text-navy sm:text-[1.5rem]">
              ALOPAK
            </span>
            <span className="mt-0.5 block text-[9px] font-semibold uppercase tracking-[0.14em] text-muted sm:mt-1 sm:text-[10px] sm:tracking-[0.16em]">
              Opakowania aluminiowe
            </span>
          </span>
        </Link>

        <nav
          className="hidden flex-1 items-center justify-center gap-1 lg:flex xl:gap-2"
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

        <div className="flex shrink-0 items-center gap-0.5 sm:gap-2">
          <Link
            href="/produkty"
            className="inline-flex size-10 items-center justify-center text-navy transition-colors hover:text-brand sm:size-11"
            aria-label="Katalog produktów"
            onClick={() => setMega(null)}
          >
            <Search className="size-5" strokeWidth={1.75} />
          </Link>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center text-navy transition-colors hover:text-brand sm:size-11 lg:hidden"
            aria-expanded={mobileOpen}
            aria-controls={menuId}
            aria-label={mobileOpen ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => {
              setMega(null);
              setMobileOpen((value) => !value);
            }}
          >
            {mobileOpen ? (
              <X className="size-6" strokeWidth={1.75} />
            ) : (
              <Menu className="size-6" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </div>

      <div
        id={mega === "oferta" ? "mega-oferta" : mega === "branze" ? "mega-branze" : undefined}
        className="relative hidden lg:block"
      >
        <MegaMenu open={mega} onClose={() => setMega(null)} />
      </div>

      {/* Mobile drawer: fixed panel, scrollable list, pinned CTA */}
      <div
        id={menuId}
        className={cn(
          "fixed inset-x-0 bottom-0 top-16 z-40 bg-white sm:top-[4.75rem] lg:hidden",
          mobileOpen ? "block" : "hidden",
        )}
      >
        <div className="absolute inset-x-0 top-0 bottom-[4.75rem] overflow-y-auto overscroll-contain px-4 pt-2 [-webkit-overflow-scrolling:touch] sm:px-6">
          <nav aria-label="Menu mobilne" className="w-full space-y-0">
            <Link
              href="/"
              className={cn(
                "flex min-h-11 items-center border-b border-border/80 text-[15px] font-semibold",
                pathname === "/" ? "text-brand" : "text-navy",
              )}
              onClick={closeMobile}
            >
              Strona główna
            </Link>

            <MobileAccordion
              title="Oferta"
              href="/oferta"
              open={mobileSection === "oferta"}
              onToggle={() =>
                setMobileSection((v) => (v === "oferta" ? null : "oferta"))
              }
              onNavigate={closeMobile}
            >
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/oferta/${category.slug}`}
                  className="flex min-h-10 items-center rounded-md px-2 text-sm text-muted transition-colors hover:bg-[#eef2f7] hover:text-brand"
                  onClick={closeMobile}
                >
                  {category.name}
                </Link>
              ))}
              <Link
                href="/produkty"
                className="mt-1 flex min-h-10 items-center rounded-md px-2 text-sm font-semibold text-brand transition-colors hover:bg-[#eef2f7]"
                onClick={closeMobile}
              >
                Katalog produktów
              </Link>
            </MobileAccordion>

            <MobileAccordion
              title="Branże"
              href="/branze"
              open={mobileSection === "branze"}
              onToggle={() =>
                setMobileSection((v) => (v === "branze" ? null : "branze"))
              }
              onNavigate={closeMobile}
            >
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  href={`/branze/${industry.slug}`}
                  className="flex min-h-10 items-center text-sm text-muted"
                  onClick={closeMobile}
                >
                  {industry.name}
                </Link>
              ))}
            </MobileAccordion>

            <Link
              href="/o-firmie"
              className={cn(
                "flex min-h-11 items-center border-b border-border/80 text-[15px] font-semibold",
                pathname.startsWith("/o-firmie") ? "text-brand" : "text-navy",
              )}
              onClick={closeMobile}
            >
              O firmie
            </Link>
            <Link
              href="/blog"
              className={cn(
                "flex min-h-11 items-center border-b border-border/80 text-[15px] font-semibold",
                pathname.startsWith("/blog") ? "text-brand" : "text-navy",
              )}
              onClick={closeMobile}
            >
              Blog
            </Link>
            <Link
              href="/kontakt"
              className={cn(
                "flex min-h-11 items-center border-b border-border/80 text-[15px] font-semibold",
                pathname.startsWith("/kontakt") ? "text-brand" : "text-navy",
              )}
              onClick={closeMobile}
            >
              Kontakt
            </Link>
          </nav>
        </div>

        <div className="absolute inset-x-0 bottom-0 border-t border-border bg-white px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <div className="flex w-full gap-2">
            <Button
              href="/produkty"
              variant="secondary"
              className="h-11 flex-1 rounded-none text-sm"
              onClick={closeMobile}
            >
              Katalog
            </Button>
            <Button
              href="/kontakt"
              variant="accent"
              className="h-11 flex-[1.35] rounded-none text-sm"
              onClick={closeMobile}
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
        "relative inline-flex min-h-11 items-center gap-1.5 px-3 text-[15px] font-semibold transition-colors xl:px-4",
        "after:absolute after:inset-x-3 after:bottom-1.5 after:h-[2px] after:origin-center after:rounded-full after:bg-brand after:transition-transform after:duration-300 after:ease-out",
        expanded || active
          ? "text-brand after:scale-x-100"
          : "text-navy after:scale-x-0 hover:text-brand",
      )}
      aria-expanded={expanded}
      aria-controls={controlsId}
      onMouseEnter={onOpen}
      onFocus={onOpen}
      onClick={onToggle}
    >
      {label}
      <ChevronDown
        className={cn(
          "size-3.5 opacity-60 transition-transform duration-300 ease-out",
          expanded && "rotate-180",
        )}
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

function MobileAccordion({
  title,
  href,
  open,
  onToggle,
  onNavigate,
  children,
}: {
  title: string;
  href: string;
  open: boolean;
  onToggle: () => void;
  onNavigate: () => void;
  children: React.ReactNode;
}) {
  const panelId = `mobile-${title.toLowerCase()}`;

  return (
    <div className="border-b border-border/80">
      <div className="flex min-h-12 items-center gap-2">
        <Link
          href={href}
          className="flex-1 text-[15px] font-semibold text-navy"
          onClick={onNavigate}
        >
          {title}
        </Link>
        <button
          type="button"
          className="inline-flex size-11 shrink-0 items-center justify-center text-navy"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? `Zwiń ${title}` : `Rozwiń ${title}`}
          onClick={onToggle}
        >
          <ChevronDown
            className={cn(
              "size-4 transition-transform duration-300",
              open && "rotate-180",
            )}
            strokeWidth={2}
          />
        </button>
      </div>
      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-300 ease-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        inert={!open ? true : undefined}
      >
        <div className="overflow-hidden">
          <div className="space-y-0.5 border-l border-brand/25 pb-3 pl-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
