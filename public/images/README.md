# Zdjęcia produktów i strony (ALOPAK)

Umieść pliki w katalogu `public/images/` według poniższej konwencji. Po dodaniu zdjęć zaktualizuj `src` w `src/data/products.ts` — komponent `ProductImage` automatycznie przełączy się ze schematu technicznego na fotografię (wszystko poza ścieżkami zawierającymi `placeholder`).

## Strona główna

| Plik | Opis |
|------|------|
| `photos/hero.jpg` | Hero strony głównej (produkcja / opakowania aluminiowe) |

## Puszki aluminiowe

Źródło katalogowe: http://www.alopak.com.pl/puszki.html (`foto/*.jpg`).

| Plik | Produkt (slug) | Nr katalogowy | Plik źródłowy |
|------|----------------|---------------|---------------|
| `products/puszka-54.jpg` | `puszka-aluminiowa-54` | 020054 | `foto/06.jpg` |
| `products/puszka-117.jpg` | `puszka-aluminiowa-117` | 030117 | `foto/12.jpg` |
| `products/puszka-100.jpg` | `puszka-aluminiowa-100` | 040100 | `foto/05.jpg` |
| `products/puszka-100-s.jpg` | `puszka-aluminiowa-100-s` | 050100 | `foto/01.jpg` |
| `products/puszka-110.jpg` | `puszka-aluminiowa-110` | 040110 | `foto/02.jpg` (brak 02b) |
| `products/puszka-125.jpg` | `puszka-aluminiowa-125` | 040125 | `foto/16.jpg` |
| `products/puszka-135.jpg` | `puszka-aluminiowa-135` | 050135 | `foto/02.jpg` |
| `products/puszka-140.jpg` | `puszka-aluminiowa-140` | 050140 | `foto/02.jpg` (brak 02a) |
| `products/puszka-250.jpg` | `puszka-aluminiowa-250` | 080250 | `foto/080250.jpg` |
| `products/puszka-337.jpg` | `puszka-aluminiowa-337` | 060337 | `foto/10.jpg` |
| `catalog/puszki-przyklad.jpg` | kategoria / atmosfera | — | `puszki_przyklad.jpg` |

## Folia

| Plik | Produkt (slug) | Źródło |
|------|----------------|--------|
| `products/folia-fryzjerska.jpg` | `folia-fryzjerska-aluminiowa` | katalog ALOPAK |
| `products/folia-spozywcza.jpg` | `folia-spozywcza-b2b` | Wikimedia Commons — [Aluminium foil.jpg](https://commons.wikimedia.org/wiki/File:Aluminium_foil.jpg) (GFDL) |

## Wymagania techniczne

- Format: JPEG lub WebP (zalecany WebP dla LCP).
- Proporcje kart produktów: ok. 4∶3 lub kwadrat; min. 1200 px dłuższy bok.
- Alt tekst: ustawiany w danych produktu (`images[].alt`).
