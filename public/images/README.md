# Zdjęcia produktów i strony (ALOPAK)

Umieść pliki w katalogu `public/images/` według poniższej konwencji. Po dodaniu zdjęć zaktualizuj `src` w `src/data/products.ts` — komponent `ProductImage` automatycznie przełączy się ze schematu technicznego na fotografię (wszystko poza ścieżkami zawierającymi `placeholder`).

## Strona główna

| Plik | Opis |
|------|------|
| `photos/hero.jpg` | Hero strony głównej (produkcja / opakowania aluminiowe) |

## Puszki aluminiowe

| Plik | Produkt (slug) | Nr katalogowy |
|------|----------------|---------------|
| `products/puszka-54.jpg` | `puszka-aluminiowa-54` | 020054 |
| `products/puszka-117.jpg` | `puszka-aluminiowa-117` | 030117 |
| `products/puszka-100.jpg` | `puszka-aluminiowa-100` | 040100 |
| `products/puszka-100-s.jpg` | `puszka-aluminiowa-100-s` | 050100 |
| `products/puszka-110.jpg` | `puszka-aluminiowa-110` | 040110 |
| `products/puszka-125.jpg` | `puszka-aluminiowa-125` | 040125 |
| `products/puszka-135.jpg` | `puszka-aluminiowa-135` | 050135 |
| `products/puszka-140.jpg` | `puszka-aluminiowa-140` | 050140 |
| `products/puszka-250.jpg` | `puszka-aluminiowa-250` | 080250 |
| `products/puszka-337.jpg` | `puszka-aluminiowa-337` | 060337 |

## Folia

| Plik | Produkt (slug) |
|------|----------------|
| `products/folia-fryzjerska.jpg` | `folia-fryzjerska-aluminiowa` |
| `products/folia-spozywcza.jpg` | `folia-spozywcza-b2b` |

## Wymagania techniczne

- Format: JPEG lub WebP (zalecany WebP dla LCP).
- Proporcje kart produktów: ok. 4∶3 lub kwadrat; min. 1200 px dłuższy bok.
- Alt tekst: ustawiany w danych produktu (`images[].alt`).
