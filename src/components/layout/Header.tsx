"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNav } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setOpenDropdown(null);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-white/90 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4 lg:h-[4.25rem]">
        <Link
          href="/"
          className="font-semibold tracking-[0.08em] text-primary"
          aria-label="ALOPAK — strona główna"
        >
          <span className="text-lg sm:text-xl">ALOPAK</span>
        </Link>

        <nav
          ref={panelRef}
          className="hidden items-center gap-1 lg:flex"
          aria-label="Główna nawigacja"
        >
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href} className="relative">
                <button
                  type="button"
                  className="inline-flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-ink/90 transition-colors hover:bg-surface hover:text-primary"
                  aria-expanded={openDropdown === item.label}
                  onClick={() =>
                    setOpenDropdown((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                >
                  {item.label}
                  <ChevronDown className="size-4 opacity-70" aria-hidden />
                </button>
                {openDropdown === item.label ? (
                  <div className="absolute left-0 top-full z-20 mt-2 min-w-56 rounded-md border border-border bg-white p-2 shadow-soft">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block rounded-md px-3 py-2 text-sm text-ink/90 transition-colors hover:bg-surface hover:text-primary"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-ink/90 transition-colors hover:bg-surface hover:text-primary"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/kontakt" size="sm" className="hidden sm:inline-flex">
            Zapytaj o ofertę
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md border border-border text-primary lg:hidden"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={open ? "Zamknij menu" : "Otwórz menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        id={menuId}
        className={cn(
          "border-t border-border bg-white lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <div className="container-site space-y-1 py-4">
          {mainNav.map((item) => (
            <div key={item.href} className="border-b border-border/70 py-2">
              <Link
                href={item.href}
                className="block py-2 text-base font-semibold text-ink"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
              {item.children ? (
                <div className="mb-2 space-y-1 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2 text-sm text-muted"
                      onClick={() => setOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
          <div className="pt-3">
            <Button href="/kontakt" className="w-full" onClick={() => setOpen(false)}>
              Zapytaj o ofertę
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
