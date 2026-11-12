/**
 * Single source of truth for the public site origin.
 * Production canonical: NEXT_PUBLIC_SITE_URL (also set on Vercel).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://alopak-nine.vercel.app")
).replace(/\/$/, "");

export function isProductionIndexable() {
  if (process.env.VERCEL_ENV === "preview") return false;
  if (process.env.NODE_ENV !== "production") return false;
  return true;
}
