# ALOPAK — strona B2B (Next.js)

Nowoczesna witryna firmowa ALOPAK: oferta puszek aluminiowych, folii spożywczej i fryzjerskiej, katalog produktów, formularz zapytań, blog oraz SEO.

## Wymagania

- Node.js 20+
- npm 10+

## Uruchomienie

```bash
npm install
cp .env.example .env.local
npm run dev
```

Aplikacja: [http://localhost:3000](http://localhost:3000)

## Skrypty

| Komenda | Opis |
|---------|------|
| `npm run dev` | Serwer deweloperski |
| `npm run build` | Build produkcyjny |
| `npm run start` | Start builda produkcyjnego |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Testy Vitest |

## Zmienne środowiskowe

Patrz `.env.example`:

- `NEXT_PUBLIC_SITE_URL` — kanoniczny adres produkcji
- `QUOTE_TO_EMAIL` / `RESEND_API_KEY` — wysyłka zapytań
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` / `NEXT_PUBLIC_GTM_ID` — analityka (po zgodzie cookies)

Bez konfiguracji poczty formularz zwraca kontrolowany błąd i **nie udaje** wysyłki.

## Struktura

- `src/app` — routing App Router
- `src/components` — UI, layout, sekcje, formularze
- `src/data` — dane firmy, kategorie, produkty
- `src/content/blog` — artykuły Markdown
- `src/lib` — SEO, e-mail, walidacja, repozytoria

## Dodawanie produktów

1. Dodaj rekord w `src/data/products.ts`.
2. Ustaw `isPublished: true` dopiero po weryfikacji danych.
3. Parametry trzymaj jako tablicę `{ label, value, unit? }`.

## Dodawanie artykułów

1. Utwórz plik `src/content/blog/slug-artykulu.md`.
2. Uzupełnij frontmatter (`title`, `description`, `category`, `publishedAt`).
3. Napisz treść Markdown z nagłówkami `##` / `###` (spis treści generuje się automatycznie).

## Deployment

Build: `npm run build`. Hosting rekomendowany: Vercel / Node hosting z `npm run start`. Ustaw zmienne środowiskowe produkcyjne przed uruchomieniem formularza i analityki.

## Dokumentacja projektu

- `IMPLEMENTATION_PLAN.md` — etapy realizacji
- `CONTENT_TODO.md` — brakujące materiały od firmy
- `alopak_cursor_master_prompt.md` — pełna specyfikacja
