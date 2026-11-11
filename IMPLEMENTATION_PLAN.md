# ALOPAK — Plan implementacji

## Audyt repozytorium (Etap 1)

**Stan początkowy:**
- Repozytorium prawie puste: `alopak_cursor_master_prompt.md`, pusty `README.md`, `.gitignore`.
- Brak kodu aplikacji, assetów firmowych, logo.

**Decyzje:**
- Next.js 16 App Router + TypeScript strict + Tailwind 4 + Zod + Markdown blog.
- Dane lokalne + warstwa repozytorium (łatwa podmiana na CMS).
- Formularz: Server Action + `/api/quote` + Resend adapter (bez fikcyjnej wysyłki).
- Kontakt i fakty firmowe ze strony alopak.com.pl.

## Status etapów

| Etap | Zakres | Status |
|------|--------|--------|
| 1 | Audyt, plan, CONTENT_TODO | ukończony |
| 2 | Fundament Next.js, design system, layout | ukończony |
| 3 | Strona główna (sekcje 1–10) | ukończony |
| 4 | Oferta, kategorie, katalog, produkt | ukończony |
| 5 | Formularze + API + antyspam | ukończony |
| 6 | O firmie, branże, kontakt, polityki | ukończony |
| 7 | Blog Markdown (listing, artykuły, kategorie) | ukończony |
| 8 | SEO, sitemap, robots, schema, cookies | ukończony |
| 9 | QA, testy, build, weryfikacja wizualna | ukończony |
| 10 | Dokumentacja | ukończony |

## Routing wdrożony

`/`, `/oferta`, `/oferta/[slug]`, `/produkty`, `/produkty/[slug]`, `/branze`, `/branze/[slug]`, `/o-firmie`, `/blog`, `/blog/[slug]`, `/blog/kategoria/[slug]`, `/kontakt`, `/polityka-prywatnosci`, `/polityka-cookies`, `/sitemap.xml`, `/robots.txt`, `/api/quote`

## Pozostałe / kolejne kroki

1. Podmienić placeholdery SVG na zdjęcia produktowe od ALOPAK.
2. Skonfigurować `RESEND_API_KEY` + `QUOTE_TO_EMAIL`.
3. Podłączyć GA4/GTM po akceptacji cookies.
4. Weryfikacja prawna polityk prywatności/cookies.
5. Uzupełnić pozostałe artykuły z `src/content/blog/BLOG_BRIEFS.md`.
6. Opcjonalnie: Playwright E2E, pełny adapter SMTP, CMS headless.
