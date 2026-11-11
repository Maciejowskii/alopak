"use client";

import Link from "next/link";
import { useCallback, useState, useSyncExternalStore } from "react";
import type { ConsentState } from "@/lib/analytics/events";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "alopak-consent";

function saveConsent(consent: ConsentState) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new Event("alopak:consent"));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("alopak:consent", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("alopak:consent", onStoreChange);
  };
}

function getConsentSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return "error";
  }
}

function getServerSnapshot() {
  return "pending";
}

export function CookieBanner() {
  const stored = useSyncExternalStore(subscribe, getConsentSnapshot, getServerSnapshot);
  const [manage, setManage] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  const visible = stored !== "pending" && !stored;

  const close = useCallback((consent: ConsentState) => {
    saveConsent(consent);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Ustawienia plików cookies"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-white/95 p-4 shadow-[0_-12px_40px_rgba(20,43,69,0.12)] backdrop-blur-md sm:p-5"
    >
      <div className="container-site grid gap-4 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-base font-semibold text-ink">Pliki cookies</p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
            Używamy niezbędnych plików cookies do działania strony. Opcjonalne
            cookies analityczne i marketingowe uruchamiamy dopiero po Twojej
            zgodzie. Szczegóły:{" "}
            <Link href="/polityka-cookies" className="font-medium text-primary underline-offset-2 hover:underline">
              polityka cookies
            </Link>{" "}
            i{" "}
            <Link href="/polityka-prywatnosci" className="font-medium text-primary underline-offset-2 hover:underline">
              polityka prywatności
            </Link>
            .
          </p>

          {manage ? (
            <div className="mt-4 space-y-2 text-sm text-ink">
              <label className="flex items-center gap-2">
                <input type="checkbox" checked disabled />
                Niezbędne (zawsze aktywne)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={analytics}
                  onChange={(event) => setAnalytics(event.target.checked)}
                />
                Analityczne
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={marketing}
                  onChange={(event) => setMarketing(event.target.checked)}
                />
                Marketingowe
              </label>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            onClick={() => close({ necessary: true, analytics: false, marketing: false })}
          >
            Odrzuć opcjonalne
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setManage((value) => !value)}
          >
            {manage ? "Ukryj ustawienia" : "Ustawienia"}
          </Button>
          {manage ? (
            <Button
              type="button"
              size="sm"
              onClick={() => close({ necessary: true, analytics, marketing })}
            >
              Zapisz wybór
            </Button>
          ) : (
            <Button
              type="button"
              size="sm"
              onClick={() => close({ necessary: true, analytics: true, marketing: true })}
            >
              Akceptuj wszystkie
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
