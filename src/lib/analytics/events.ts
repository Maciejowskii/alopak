export type AnalyticsEventName =
  | "quote_form_view"
  | "quote_form_start"
  | "quote_form_submit"
  | "quote_form_success"
  | "quote_form_error"
  | "phone_click"
  | "email_click"
  | "product_view"
  | "document_download"
  | "cta_click";

export type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem("alopak-consent");
    if (!raw) return false;
    const parsed = JSON.parse(raw) as ConsentState;
    return Boolean(parsed.analytics);
  } catch {
    return false;
  }
}

export function trackEvent(
  name: AnalyticsEventName,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: name,
    ...payload,
  });

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload);
  }
}
