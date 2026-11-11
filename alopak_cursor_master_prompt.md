# ALOPAK --- MASTER PROMPT DLA CURSORA

## Kompletny projekt i implementacja strony B2B w Next.js

> **Cel:** zbudować od podstaw nowoczesną, szybką, skalowalną i
> nastawioną na konwersję stronę internetową ALOPAK. To ma być
> rzeczywiste, działające wdrożenie w Next.js --- nie sama makieta,
> landing page ani opis koncepcji.
>
> **Kierunek wizualny:** 70% inspiracji estetyką Wilmër (elegancja,
> typografia, uporządkowany układ, profesjonalny charakter) + 30%
> inspiracji funkcjonalnością BuildGo (nowoczesne komponenty,
> formularze, moduł produktowy, elastyczne sekcje). Nie kopiuj kodu,
> układów 1:1, grafik, tekstów, ikon ani innych chronionych elementów
> tych motywów. Nie kupujemy ani nie instalujemy żadnego płatnego
> motywu. Projekt ma być autorski.
>
> **Technologia:** Next.js (App Router), React, TypeScript. Cała strona
> ma być wykonana jako aplikacja Next.js.

------------------------------------------------------------------------

# 1. Twoja rola i sposób pracy

Działaj jako zespół złożony z: - Senior Next.js / React Engineer, -
Senior UX/UI Designera specjalizującego się w B2B, - eksperta CRO
(Conversion Rate Optimization), - specjalisty SEO technicznego i content
SEO, - architekta rozwiązań e-commerce, - copywritera B2B, - specjalisty
dostępności cyfrowej i wydajności.

Nie ograniczaj się do generowania kodu na podstawie pojedynczego
polecenia. Najpierw rozpoznaj istniejący projekt i środowisko, następnie
zaplanuj architekturę, a potem konsekwentnie implementuj kompletną
stronę.

## Zasady pracy w Cursorze

1.  Na początku przeanalizuj cały istniejący projekt: strukturę
    katalogów, `package.json`, zależności, konfigurację, istniejące
    komponenty, style, routing i dostępne zasoby.
2.  Nie usuwaj ani nie nadpisuj istniejących elementów bez sprawdzenia,
    czy są potrzebne.
3.  Jeżeli repozytorium jest puste, utwórz kompletny projekt Next.js z
    TypeScript.
4.  Używaj aktualnych, stabilnych wersji bibliotek kompatybilnych ze
    sobą. Nie instaluj bibliotek tylko dla jednej drobnej funkcji.
5.  Nie twórz atrap funkcjonalności. Każdy widoczny przycisk, link,
    formularz, filtr i element nawigacji ma działać zgodnie z opisem.
6.  Nie pozostawiaj pustych sekcji, niedziałających CTA, przypadkowych
    placeholderów ani tekstów typu „Lorem ipsum".
7.  Jeżeli brakuje danych firmowych lub produktowych, stosuj jawnie
    oznaczone pola do uzupełnienia i neutralne, uczciwe komunikaty. Nie
    wymyślaj faktów.
8.  Nie twierdź, że integracja działa, jeśli nie ma skonfigurowanych
    kluczy, usług lub danych dostępowych.
9.  Po każdej większej części uruchom dostępne kontrole: lint,
    typecheck, testy i build. Napraw błędy przed przejściem dalej.
10. Nie kończ na stronie głównej. Zaimplementuj wszystkie wymagane
    podstrony, szablony, nawigację, formularze, blog, SEO i wersję
    mobilną.
11. Jeżeli jakaś decyzja wymaga danych, których nie ma w repozytorium,
    podejmij bezpieczną decyzję projektową, oznacz brakujące dane w
    `CONTENT_TODO.md` i kontynuuj.
12. Nie zadawaj pytań o rzeczy, które można rozsądnie rozwiązać przez
    elastyczną architekturę lub konfigurację.

## Priorytet biznesowy

Najważniejszym celem strony jest pozyskiwanie wartościowych klientów B2B
i zapytań ofertowych. Estetyka ma wspierać wiarygodność i konwersję, a
nie być celem samym w sobie.

Priorytety: 1. Wartościowe zapytania ofertowe. 2. Jasna prezentacja
trzech głównych kategorii oferty. 3. Wiarygodność producenta / dostawcy
i profesjonalnego partnera biznesowego. 4. Widoczność w Google i
wyszukiwarkach AI. 5. Łatwe zarządzanie produktami, treściami i blogiem.
6. Możliwość przyszłego rozszerzenia o e-commerce B2B, CRM, ERP i wersje
językowe.

------------------------------------------------------------------------

# 2. Informacje o firmie i ograniczenia faktograficzne

Firma: **ALOPAK**\
Obecna strona referencyjna: http://www.alopak.com.pl/kontakt_r.html

Główne obszary oferty, które mają być wyraźnie widoczne: 1. Puszki
aluminiowe. 2. Folia spożywcza. 3. Folia fryzjerska.

Przed pisaniem finalnych treści: - sprawdź, czy w repozytorium znajdują
się materiały firmowe, zdjęcia, katalogi, logo, dokumenty, dane
kontaktowe i opisy produktów; - jeżeli środowisko pozwala na
przeglądanie strony, przeanalizuj obecną witrynę ALOPAK oraz publicznie
dostępne informacje; - zachowaj wyłącznie informacje, które można
potwierdzić; - nie zakładaj, że firma ma określone certyfikaty, moce
produkcyjne, lata doświadczenia, klientów, referencje, technologie,
stany magazynowe lub zasięg eksportowy, jeśli nie ma na to dowodów.

**Nie wymyślaj:** - wymiarów, pojemności, grubości, szerokości, długości
ani innych parametrów produktów; - minimalnych wielkości zamówień
(MOQ); - cen, rabatów, terminów realizacji i dostępności; -
certyfikatów, norm, atestów, deklaracji zgodności; - możliwości
sterylizacji lub pasteryzacji; - informacji o recyklingu lub wpływie
środowiskowym; - danych o klientach, partnerach i referencjach; -
historii firmy, liczby pracowników, wielkości zakładu ani skali
produkcji.

Jeśli dana informacja jest nieznana, nie publikuj jej jako faktu.
Zamiast tego: - użyj neutralnego sformułowania, - ukryj pole, jeśli nie
ma wartości, - dodaj zadanie do `CONTENT_TODO.md`, - przygotuj miejsce w
CMS / danych na późniejsze uzupełnienie.

Używaj nazwy „ALOPAK" konsekwentnie. Nie dopisuj formy prawnej ani
danych rejestrowych, dopóki nie zostaną potwierdzone.

------------------------------------------------------------------------

# 3. Strategia marki i pozycjonowanie

Przedstaw ALOPAK jako profesjonalnego partnera biznesowego w obszarze
produktów opakowaniowych i aluminiowych. Komunikacja ma być konkretna,
rzeczowa i wiarygodna.

Marka powinna kojarzyć się z: - profesjonalizmem, - jakością, - sprawną
obsługą, - przewidywalną współpracą, - praktycznym podejściem do potrzeb
odbiorców biznesowych, - czytelną ofertą, - łatwym kontaktem.

Nie używaj pustych sloganów typu: - „najwyższa jakość w najlepszej
cenie", - „lider na rynku", - „innowacyjne rozwiązania dla każdego", -
„gwarancja satysfakcji", jeśli nie ma potwierdzenia.

## Główna propozycja wartości

Opracuj nagłówek strony głównej wokół produktów i korzyści dla odbiorcy
B2B. Kierunek komunikacyjny (do dopracowania, nie traktować jako
potwierdzonego sloganu):

**„Opakowania i folie dla profesjonalnych zastosowań"**

Podtytuł powinien jasno informować, że ALOPAK oferuje puszki aluminiowe,
folię spożywczą i folię fryzjerską oraz zachęcać firmy do kontaktu w
sprawie oferty.

Główne CTA: - „Zapytaj o ofertę" - „Poznaj produkty"

Dodatkowe CTA: - „Porozmawiaj z nami" - „Zobacz szczegóły" - „Wyślij
zapytanie"

Nie obiecuj odpowiedzi w konkretnym czasie, jeśli firma tego nie
potwierdziła.

------------------------------------------------------------------------

# 4. Kierunek artystyczny i system wizualny

## 4.1. Proporcje inspiracji

### 70% --- Wilmër: elegancja i profesjonalizm

Przenieś do projektu: - elegancką, uporządkowaną kompozycję; - duże,
wyraziste nagłówki; - czytelną hierarchię typograficzną; - dużo
przestrzeni i spokojny rytm sekcji; - profesjonalny, korporacyjny
charakter; - wyważone proporcje zdjęć i tekstu; - dopracowane detale,
cienkie separatory i subtelne akcenty; - estetykę marki, która obsługuje
klientów biznesowych.

### 30% --- BuildGo: funkcjonalność i nowoczesne komponenty

Przenieś do projektu: - elastyczne moduły sekcji; - karty produktowe; -
rozbudowane formularze zapytań; - logiczne CTA; - modułowe bloki
treści; - praktyczne układy katalogowe; - nowoczesne interakcje; -
łatwość rozbudowy o nowe kategorie, landing pages i funkcje.

**Ważne:** finalna strona nie może wyglądać jak strona firmy budowlanej.
Nie używaj zdjęć budynków, kasków, koparek, betonu ani motywów
budowlanych. To tylko inspiracje układem i jakością wykonania.

## 4.2. Ogólny styl

-   Premium B2B.
-   Minimalistyczny, nowoczesny design przemysłowy.
-   Dużo jasnej przestrzeni.
-   Mocna typografia.
-   Wyraziste, ale oszczędne CTA.
-   Zdjęcia produktów i zastosowań.
-   Subtelne animacje.
-   Równowaga między wizerunkiem a użytecznością.
-   Projekt mobile-first.
-   Brak przypadkowych ozdobników i przesadnych efektów.

## 4.3. Kolory

Zbuduj system kolorystyczny wokół aluminium, bieli, grafitu i granatu.

Proponowana paleta startowa (można skorygować po analizie logo i
materiałów firmy):

``` css
:root {
  --color-primary: #142B45;       /* głęboki granat */
  --color-primary-hover: #203F60;
  --color-ink: #18232E;            /* główny tekst */
  --color-muted: #65717D;          /* tekst pomocniczy */
  --color-background: #FFFFFF;
  --color-surface: #F4F6F8;        /* jasna szarość */
  --color-surface-alt: #E9EDF1;
  --color-border: #DCE2E8;
  --color-accent: #A9B4BE;         /* aluminium */
  --color-accent-dark: #778692;
  --color-success: #287A55;
  --color-error: #B83A3A;
}
```

Zasady: - granat wykorzystuj do nagłówków, nawigacji i kluczowych CTA; -
biel i jasne szarości mają dominować; - metaliczne/srebrne akcenty
stosuj oszczędnie; - unikaj jaskrawych gradientów; - nie używaj zbyt
wielu kolorów akcentowych; - sprawdź kontrast tekstu względem tła.

## 4.4. Typografia

Dobierz nowoczesną, czytelną rodzinę sans-serif, np.: - Manrope, -
Inter, - Geist Sans.

Preferuj lokalne / optymalizowane ładowanie fontów przez `next/font`.
Nie ładuj fontów z zewnętrznych serwerów, jeśli nie ma takiej potrzeby.

Typografia: - mocne, duże nagłówki hero; - wyraźne nagłówki sekcji; -
wygodne do czytania akapity; - umiarkowana długość linii; - odpowiednia
interlinia; - czytelne etykiety formularzy.

## 4.5. Zdjęcia i grafiki

Wizualnie strona musi opierać się na realnych produktach i branży
ALOPAK.

Priorytet źródeł: 1. Oryginalne zdjęcia i pliki dostarczone przez firmę.
2. Zdjęcia produktów z firmowych katalogów, jeśli można ich użyć. 3.
Własne, legalnie pozyskane zdjęcia stockowe. 4. Tymczasowe grafiki
zastępcze wyraźnie oznaczone w dokumentacji.

Nie używaj zdjęć z podglądów motywów Wilmër i BuildGo ani nie kopiuj ich
zasobów.

Nie generuj fikcyjnych opakowań, które mogą wyglądać jak rzeczywiste
produkty ALOPAK. Jeśli zdjęcie jest koncepcyjne, nie przedstawiaj go
jako fotografii konkretnego produktu.

Dla obrazów: - używaj `next/image`; - ustawiaj odpowiednie rozmiary i
`sizes`; - stosuj nowoczesne formaty, jeśli pipeline je obsługuje; -
dodawaj opisowe ALT; - nie leniuchuj obrazu LCP / hero --- ustaw
odpowiedni priorytet ładowania; - poniżej pierwszego ekranu stosuj lazy
loading.

Jeżeli brak zdjęć, przygotuj estetyczne, neutralne placeholdery
produktowe i listę brakujących zdjęć w `CONTENT_TODO.md`.

------------------------------------------------------------------------

# 5. Architektura informacji i routing

Zaprojektuj i wdroż następującą strukturę. Nazwy URL mają być krótkie,
logiczne i bez polskich znaków.

## Główne ścieżki

``` text
/
├── /oferta
│   ├── /oferta/puszki-aluminiowe
│   ├── /oferta/folia-spozywcza
│   └── /oferta/folia-fryzjerska
├── /produkty
│   └── /produkty/[slug]
├── /branze
│   ├── /branze/przemysl-spozywczy
│   ├── /branze/gastronomia
│   └── /branze/branza-fryzjerska
├── /o-firmie
├── /blog
│   ├── /blog/[slug]
│   └── /blog/kategoria/[slug]
├── /kontakt
├── /polityka-prywatnosci
└── /polityka-cookies
```

Nie twórz podstron branżowych z cienką, powtarzalną treścią. Jeśli nie
ma wystarczających danych, przygotuj tylko sensowne strony, które można
wypełnić wartościową treścią.

## Nawigacja główna

Desktop: - logo ALOPAK; - Oferta (menu rozwijane); - Branże /
Zastosowania; - O firmie; - Blog; - Kontakt; - wyróżnione CTA „Zapytaj o
ofertę".

Mobile: - czytelny przycisk menu; - pełna obsługa klawiatury; - duże
pola dotykowe; - CTA „Zapytaj o ofertę" widoczne w menu; - brak
poziomego przewijania; - możliwość zamknięcia menu klawiszem Escape i
kliknięciem poza menu.

Header może być sticky, ale nie może zasłaniać treści ani zajmować
nadmiernej wysokości.

Footer: - logo; - krótki opis działalności; - linki do kategorii; -
linki do najważniejszych podstron; - dane kontaktowe wyłącznie z
potwierdzonego źródła; - linki do polityk; - informacja o prawach
autorskich; - opcjonalne CTA.

------------------------------------------------------------------------

# 6. Strona główna --- szczegółowy układ

Strona główna jest najważniejszym wejściem do serwisu. Ma w kilka sekund
wyjaśnić, czym zajmuje się ALOPAK, do kogo kieruje ofertę i co
użytkownik ma zrobić dalej.

## Sekcja 1: Hero

Układ: - duży nagłówek po lewej lub w osi kompozycji; - krótki
podtytuł; - główne CTA „Zapytaj o ofertę"; - drugie CTA „Poznaj
produkty"; - po prawej lub w tle wysokiej jakości fotografia produktu /
materiału / procesu, jeśli dostępna; - subtelny detal graficzny
nawiązujący do aluminium.

Treść kierunkowa:

**H1: „Opakowania i folie dla profesjonalnych zastosowań"**

Opis: „Poznaj ofertę ALOPAK obejmującą puszki aluminiowe, folię
spożywczą i folię fryzjerską. Skontaktuj się z nami, aby porozmawiać o
rozwiązaniu dopasowanym do potrzeb Twojej firmy."

CTA: - „Zapytaj o ofertę" - „Zobacz produkty"

Nie stosuj automatycznego slidera w hero. Jeden mocny, czytelny przekaz
jest lepszy niż kilka rotujących komunikatów.

## Sekcja 2: Trzy główne kategorie

Trzy duże karty: 1. Puszki aluminiowe. 2. Folia spożywcza. 3. Folia
fryzjerska.

Każda karta: - zdjęcie lub placeholder; - nazwa kategorii; - krótki opis
korzyści / zastosowania; - link „Poznaj produkt"; - opcjonalne CTA
„Zapytaj o ofertę".

Karty muszą być równe, estetyczne i czytelne na mobile. Cała karta może
być klikalna, ale nie zagnieżdżaj linków w linkach.

## Sekcja 3: Dlaczego ALOPAK

Przygotuj moduł 3--4 korzyści. Nie wymyślaj dowodów. Użyj neutralnych,
możliwych do potwierdzenia komunikatów, np.: - oferta dla odbiorców
biznesowych; - kilka kategorii produktów w jednym miejscu; - możliwość
kontaktu w sprawie dopasowania oferty; - bezpośredni kontakt z firmą.

Jeśli firma dostarczy fakty, można dodać: - doświadczenie; - park
maszynowy; - kontrolę jakości; - certyfikaty; - terminy; - zasięg
obsługi; - referencje.

## Sekcja 4: O ALOPAK

Krótki, wiarygodny opis firmy. Nie pisz fikcyjnej historii. Pokaż, czym
firma się zajmuje i dlaczego klient biznesowy powinien poznać jej
ofertę.

CTA: „Poznaj ALOPAK".

## Sekcja 5: Oferta dopasowana do branży

Pokaż zastosowania produktów w trzech grupach: - przemysł / przetwórstwo
spożywcze --- tylko tam, gdzie oferta puszek i jej przeznaczenie są
potwierdzone; - gastronomia i profesjonalne zastosowania spożywcze ---
dla folii spożywczej; - salony i dystrybucja fryzjerska --- dla folii
fryzjerskiej.

Nie sugeruj dopuszczeń do kontaktu z żywnością ani specyficznych
zastosowań, jeśli nie ma dokumentacji.

## Sekcja 6: Proces współpracy

Przedstaw prosty proces: 1. Wybierasz kategorię produktu. 2. Przesyłasz
zapytanie i opisujesz potrzeby. 3. ALOPAK kontaktuje się w sprawie
szczegółów. 4. Otrzymujesz ofertę / dalsze informacje.

Nie deklaruj czasu odpowiedzi ani warunków handlowych bez potwierdzenia.

## Sekcja 7: Sekcja konwersji

Wyraźna sekcja z nagłówkiem w rodzaju: „Porozmawiajmy o potrzebach
Twojej firmy"

Krótki opis i CTA do formularza. Zastosuj kontrastowe, ale eleganckie
tło.

## Sekcja 8: Blog

Pokaż 3 najnowsze / wyróżnione artykuły: - miniatura; - kategoria; -
tytuł; - krótki lead; - data publikacji; - link „Czytaj artykuł".

Nie pokazuj przykładowych dat ani autorów jako prawdziwych, jeśli są
nieznane.

## Sekcja 9: FAQ

Dodaj 4--6 pytań, które można odpowiedzieć bez wymyślania danych.
Pytania o MOQ, cennik, dostawę czy certyfikaty powinny prowadzić do
kontaktu, jeżeli odpowiedzi nie są znane.

## Sekcja 10: Footer

Kompletny footer z nawigacją, kategoriami i kontaktem.

------------------------------------------------------------------------

# 7. Podstrony kategorii produktowych

Każda z trzech kategorii ma być osobną, rozbudowaną stroną docelową. Nie
stosuj identycznej treści z podmienioną nazwą produktu.

Wspólny szablon: 1. Breadcrumbs. 2. Hero z H1 i konkretnym opisem
kategorii. 3. Zdjęcie produktu. 4. Zastosowanie i grupa docelowa. 5.
Dostępne warianty / produkty (tylko potwierdzone). 6. Parametry
techniczne (tylko dostępne dane). 7. Dokumenty do pobrania (jeśli
istnieją). 8. FAQ specyficzne dla kategorii. 9. Powiązane produkty /
kategorie. 10. Mocne CTA i formularz zapytania.

## 7.1. Puszki aluminiowe

To ważna kategoria dla pozyskiwania klientów B2B.

Komunikacja powinna być kierowana do osób odpowiedzialnych za zakupy,
produkcję, opakowania i zaopatrzenie w zakładach przemysłowych.

Podkreśl: - zastosowanie opakowań w działalności biznesowej, jeśli
potwierdzone; - możliwość uzyskania informacji o wariantach; - możliwość
przesłania zapytania z wymaganiami; - możliwość dołączenia specyfikacji
lub pliku.

Nie twórz tabeli fikcyjnych wymiarów. Przygotuj komponent tabeli
parametrów, który pokaże tylko uzupełnione pola.

CTA: „Zapytaj o puszki aluminiowe".

## 7.2. Folia spożywcza

Komunikacja dla hurtowni, gastronomii, dystrybutorów i innych odbiorców
biznesowych.

Prezentuj: - warianty produktu, jeśli znane; - parametry techniczne,
jeśli znane; - możliwe zastosowania, jeśli potwierdzone; - możliwość
zapytania o ofertę hurtową.

Nie deklaruj właściwości materiałowych, dopuszczeń i certyfikatów bez
dokumentacji.

CTA: „Zapytaj o folię spożywczą".

## 7.3. Folia fryzjerska

Komunikacja dla hurtowni fryzjerskich, dystrybutorów, sklepów i
profesjonalnych odbiorców.

Prezentuj: - warianty produktu, jeśli znane; - parametry, jeśli znane; -
zastosowania, jeśli potwierdzone; - możliwość zapytania o warunki
współpracy.

CTA: „Zapytaj o folię fryzjerską".

------------------------------------------------------------------------

# 8. Katalog produktów i strony pojedynczych produktów

Zbuduj katalog oparty na danych, a nie ręcznie zakodowanych kartach.

Każdy produkt powinien móc zawierać: - `name`; - `slug`; - `category`; -
`shortDescription`; - `description`; - `images`; - `applications`; -
`specifications`; - `documents`; - `seoTitle`; - `seoDescription`; -
`isFeatured`; - `isPublished`; - `sortOrder`.

Wartości parametrów przechowuj jako dane strukturalne (np. tablica
etykieta--wartość--jednostka), a nie jeden blok tekstu.

Strona produktu: - galeria zdjęć; - nazwa i opis; - parametry, jeśli
dostępne; - zastosowania; - dokumenty; - produkty powiązane; - CTA do
zapytania; - breadcrumbs; - SEO metadata.

Jeżeli firma nie ma jeszcze pełnego katalogu, przygotuj przykładowe
rekordy wyłącznie jako dane robocze, oznacz je `draft` /
`isPublished: false` i nie publikuj ich w publicznym serwisie.

Nie wyświetlaj ceny „0 zł", fikcyjnej dostępności ani przycisku „Kup
teraz", jeśli nie ma uruchomionego sklepu.

------------------------------------------------------------------------

# 9. Formularze i konwersja B2B

Formularze są jednym z najważniejszych elementów całej witryny.

## 9.1. Formularz zapytania ofertowego

Przygotuj formularz globalny oraz warianty prekonfigurowane dla każdej
kategorii.

Pola: - imię i nazwisko; - nazwa firmy; - służbowy adres e-mail; -
telefon (opcjonalny, jeśli nie jest konieczny); - interesująca kategoria
produktu; - produkt / wariant (opcjonalnie); - szacowana ilość lub
zapotrzebowanie (opcjonalnie); - treść zapytania; - załącznik
(opcjonalnie); - wymagane potwierdzenie zapoznania się z informacją o
przetwarzaniu danych / odpowiednia zgoda, zgodnie z konsultacją prawną.

Nie dodawaj niepotrzebnych pól, takich jak NIP, adres firmy czy
stanowisko, jeśli nie są potrzebne do pierwszego kontaktu.

## 9.2. UX formularza

-   jasne etykiety;
-   komunikaty błędów przy polach;
-   walidacja po stronie klienta i serwera;
-   zachowanie wpisanych danych po błędzie;
-   stan wysyłania;
-   stan sukcesu;
-   stan błędu;
-   dostępność klawiaturowa;
-   prawidłowe `autocomplete`;
-   mobile-first;
-   wyraźne oznaczenie pól wymaganych;
-   informacja, co stanie się po wysłaniu.

Po sukcesie pokaż potwierdzenie i nie wysyłaj formularza ponownie przy
przypadkowym podwójnym kliknięciu.

## 9.3. Backend formularza

Zaimplementuj bezpieczny endpoint lub Server Action. Wybierz rozwiązanie
zgodne z wersją Next.js używaną w projekcie.

Wymagania: - walidacja serwerowa, np. Zod; - ochrona przed spamem; -
limit rozmiaru i typów plików; - bezpieczna nazwa pliku; - brak
publicznego dostępu do prywatnych załączników; - ograniczenie
częstotliwości wysyłania (rate limiting); - honeypot lub inne
zabezpieczenie antyspamowe; - bezpieczne logowanie bez danych
osobowych; - konfiguracja adresu odbiorcy przez zmienne środowiskowe; -
czytelny komunikat, gdy usługa pocztowa nie jest skonfigurowana.

Przygotuj adapter do wysyłki e-mail (np. Resend lub SMTP), ale nie
wpisuj fikcyjnych kluczy. Jeśli brak konfiguracji, formularz nie może
udawać skutecznej wysyłki. Zwróć kontrolowany błąd i opisz wymagane
zmienne w `.env.example`.

Zapis zgłoszeń w bazie może być przygotowany jako opcjonalny adapter,
ale nie twórz pozornej integracji z CRM.

## 9.4. Śledzenie konwersji

Dodaj możliwość rejestrowania zdarzeń: - `quote_form_view`; -
`quote_form_start`; - `quote_form_submit`; - `quote_form_success`; -
`quote_form_error`; - `phone_click`; - `email_click`; -
`product_view`; - `document_download`; - `cta_click`.

Analityka musi respektować zgodę użytkownika. Nie uruchamiaj
niekoniecznych skryptów śledzących przed uzyskaniem wymaganej zgody.

------------------------------------------------------------------------

# 10. Blog i SEO content

Blog jest długoterminowym kanałem pozyskiwania klientów.

## 10.1. Funkcjonalności bloga

-   strona listy artykułów;
-   kategorie;
-   wyszukiwarka artykułów;
-   filtrowanie po kategorii;
-   paginacja lub „załaduj więcej";
-   strona pojedynczego artykułu;
-   spis treści generowany z nagłówków;
-   czas czytania;
-   data publikacji i aktualizacji;
-   autor, jeżeli jest znany;
-   powiązane artykuły;
-   CTA do właściwej kategorii produktowej;
-   linkowanie wewnętrzne;
-   meta title i description;
-   Open Graph;
-   schema `Article` / `BlogPosting`.

## 10.2. Technologie treści

Na start wybierz proste, bezpieczne rozwiązanie: - MDX w repozytorium
albo - lekki CMS headless, jeśli jest już skonfigurowany w projekcie.

Nie dodawaj ciężkiego CMS bez potrzeby. Architektura powinna jednak
pozwalać na późniejsze podłączenie CMS.

Jeżeli wybierasz MDX: - trzymaj artykuły w czytelnej strukturze
katalogów; - przygotuj typowane metadane; - waliduj wymagane pola; -
generuj statyczne strony; - zapewnij poprawne linkowanie i SEO; -
umożliwiaj redaktorowi edycję treści bez zmian w komponentach.

## 10.3. Kategorie bloga

-   Puszki aluminiowe.
-   Opakowania i przemysł spożywczy.
-   Folia spożywcza.
-   Folia fryzjerska.
-   Poradniki dla firm / B2B.

## 10.4. Pierwsze tematy artykułów

Przygotuj strukturę i redakcyjne briefy dla pierwszych 20 artykułów. Nie
publikuj ich jako rzekomo eksperckich, gotowych materiałów, jeśli nie ma
danych i weryfikacji merytorycznej. Możesz przygotować drafty do
zatwierdzenia.

Proponowane tematy: 1. Puszki aluminiowe --- na co zwrócić uwagę przy
wyborze dostawcy? 2. Jak dobrać opakowanie do produktu spożywczego? 3.
Puszki aluminiowe w branży spożywczej --- zastosowania i kryteria
wyboru. 4. Jak przygotować zapytanie ofertowe na opakowania aluminiowe?
5. Jakie informacje powinien zawierać brief opakowaniowy? 6. Opakowania
dla producentów żywności --- lista pytań przed zakupem. 7. Jak
porównywać oferty dostawców opakowań? 8. Jak zaplanować zaopatrzenie w
opakowania w firmie produkcyjnej? 9. Folia spożywcza --- jak wybrać
produkt do zastosowań profesjonalnych? 10. Folia spożywcza w gastronomii
--- kryteria wyboru. 11. Jak przechowywać i organizować materiały
opakowaniowe w firmie? 12. Zakupy hurtowe folii spożywczej --- o co
zapytać dostawcę? 13. Folia fryzjerska --- jak dobrać produkt do potrzeb
salonu? 14. Folia fryzjerska dla hurtowni --- jakie parametry
porównywać? 15. Jak planować zakupy materiałów fryzjerskich w salonie?
16. Jak przygotować hurtownię do sezonowych zmian popytu? 17. Jak
napisać skuteczne zapytanie ofertowe B2B? 18. Jak oceniać dostawcę
produktów opakowaniowych? 19. Dlaczego czytelna specyfikacja produktu
ułatwia zakupy B2B? 20. Jak zbudować długofalową współpracę z dostawcą
opakowań?

Dla każdego tematu przygotuj: - intencję wyszukiwania; - docelową
grupę; - główne zapytanie / temat słowa kluczowego do weryfikacji; -
propozycję H1; - strukturę H2/H3; - linki do odpowiednich kategorii; -
CTA; - meta title i meta description; - listę danych wymagających
weryfikacji.

Nie wymyślaj wolumenów wyszukiwania ani trudności słów kluczowych bez
danych z narzędzi SEO.

## 10.5. SEO techniczne

Zaimplementuj: - unikalne metadata dla każdej podstrony; - canonical
URL; - sitemap.xml; - robots.txt; - Open Graph; - Twitter metadata; -
breadcrumbs; - poprawną hierarchię H1--H3; - przyjazne URL; - linki
wewnętrzne; - poprawne przekierowania; - schema.org; - obrazy z ALT; -
obsługę 404; - stronę 500 / error boundary, gdzie właściwe; - kontrolę
indeksowania stron draft / wyszukiwania / filtrów; - `metadataBase` z
adresem produkcyjnym pobieranym z konfiguracji.

Dodaj schema: - `Organization` lub `LocalBusiness` tylko z prawdziwymi
danymi; - `WebSite`; - `BreadcrumbList`; - `Article` / `BlogPosting`; -
`Product` wyłącznie dla rzeczywistych kart produktów z potwierdzonymi
danymi.

Nie dodawaj fikcyjnych ocen, recenzji, cen ani dostępności do danych
strukturalnych.

Przygotuj strukturę pod wielojęzyczność i hreflang, ale nie twórz
pustych tłumaczeń.

------------------------------------------------------------------------

# 11. Przygotowanie pod e-commerce i rozwój B2B

W pierwszej wersji **nie wdrażaj pełnego sklepu internetowego, płatności
ani koszyka**, jeśli nie ma potwierdzonego modelu sprzedaży, cenników i
procesów logistycznych.

Zaprojektuj jednak dane i komponenty tak, aby w kolejnych etapach można
było dodać:

-   sklep internetowy;
-   katalog z filtrowaniem;
-   konta klientów B2B;
-   indywidualne cenniki;
-   rabaty i progi ilościowe;
-   ponowne zamówienia;
-   historię zamówień;
-   statusy realizacji;
-   płatności;
-   integrację ERP;
-   integrację CRM;
-   integrację magazynową;
-   integrację z systemem fakturowym;
-   wielojęzyczność;
-   różne rynki i waluty.

## Architektura danych

Nie koduj produktów bezpośrednio w JSX. Stwórz typowane modele danych i
warstwę dostępu do danych.

Oddziel: - dane produktu; - kategorię; - treść marketingową; - parametry
techniczne; - dokumenty; - dane SEO; - status publikacji.

Zaprojektuj interfejs repozytorium / adapter, aby później można było
podmienić źródło danych z lokalnych plików na CMS lub bazę danych.

------------------------------------------------------------------------

# 12. Technologia i architektura Next.js

## 12.1. Wymagany stack

Wykorzystaj: - Next.js --- App Router; - React; - TypeScript w trybie
strict; - Tailwind CSS; - komponenty własne; - opcjonalnie shadcn/ui
jako baza dostępnych komponentów, ale mocno dostosowane do design
systemu; - Zod do walidacji; - React Hook Form, jeśli uzasadniony; -
`next/image`; - `next/font`; - MDX dla treści blogowych lub istniejący
CMS; - bibliotekę ikon (np. Lucide), używaną konsekwentnie.

Nie używaj WordPressa ani gotowego motywu WordPress. Nie twórz osobnego
backendu, jeśli Next.js może bezpiecznie obsłużyć wymagane funkcje.

## 12.2. Server Components i Client Components

-   Domyślnie używaj React Server Components.
-   Dodawaj `"use client"` tylko tam, gdzie potrzebna jest interakcja.
-   Nie przenoś całych stron do Client Components bez potrzeby.
-   Ogranicz JavaScript wysyłany do przeglądarki.
-   Dane i sekretne operacje trzymaj po stronie serwera.
-   Nie ujawniaj sekretów w zmiennych `NEXT_PUBLIC_*`.

## 12.3. Proponowana struktura katalogów

Dostosuj do istniejącego repozytorium, ale utrzymaj czytelny podział:

``` text
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── oferta/
│   │   ├── produkty/
│   │   ├── branze/
│   │   ├── o-firmie/
│   │   ├── blog/
│   │   └── kontakt/
│   ├── api/
│   │   └── quote/
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── error.tsx
├── components/
│   ├── layout/
│   ├── navigation/
│   ├── sections/
│   ├── products/
│   ├── forms/
│   ├── blog/
│   ├── seo/
│   └── ui/
├── content/
│   └── blog/
├── data/
│   ├── products/
│   ├── categories/
│   └── site.ts
├── lib/
│   ├── seo/
│   ├── validation/
│   ├── email/
│   ├── analytics/
│   └── utils/
├── types/
└── styles/
```

Nie musisz kopiować tej struktury dokładnie, ale zachowaj logiczny
podział.

## 12.4. Kod

-   TypeScript strict.
-   Unikaj `any`.
-   Unikaj duplikowania komponentów.
-   Nie buduj jednego ogromnego komponentu strony.
-   Komponenty mają mieć jasną odpowiedzialność.
-   Dane treści trzymaj poza komponentami.
-   Stosuj semantyczny HTML.
-   Dbaj o czytelne nazwy i małe moduły.
-   Dodaj obsługę błędów.
-   Nie ignoruj błędów TypeScript przez `@ts-ignore`, jeśli można je
    naprawić.
-   Nie używaj niepotrzebnych zależności.
-   Zachowaj spójne formatowanie i linting.

------------------------------------------------------------------------

# 13. Responsywność i dostępność

Strona musi być dopracowana w co najmniej następujących zakresach: -
małe telefony: 320--375 px; - standardowe telefony: 390--430 px; -
tablety: 768--1024 px; - laptopy: 1280--1440 px; - duże ekrany: 1600 px
i więcej.

Wymagania: - brak poziomego scrolla; - czytelne nagłówki; - wygodne pola
formularzy; - poprawne menu mobilne; - sensowna kolejność sekcji; -
obrazy bez rozciągania; - odpowiednie marginesy; - odpowiednie obszary
dotykowe; - CTA dostępne na mobile.

Dostępność: - WCAG 2.2 AA jako cel projektowy; - kontrast tekstu; -
obsługa klawiatury; - widoczne focus states; - semantyczne nagłówki; -
etykiety pól; - komunikaty błędów czytelne dla czytników ekranu; -
`aria-*` tylko tam, gdzie są potrzebne; - możliwość ograniczenia
animacji przez `prefers-reduced-motion`; - nie przekazuj informacji
wyłącznie kolorem.

------------------------------------------------------------------------

# 14. Wydajność i Core Web Vitals

Priorytet: szybka strona na urządzeniach mobilnych.

Wymagania: - minimalizacja JavaScript; - Server Components; -
optymalizacja obrazów; - lazy loading poniżej pierwszego ekranu; - brak
ciężkich bibliotek animacji bez potrzeby; - unikanie layout shift; -
poprawne wymiary obrazów; - ograniczenie zewnętrznych skryptów; - fonty
przez `next/font`; - dynamic import dla ciężkich komponentów, jeśli
uzasadniony; - caching tam, gdzie bezpieczny; - brak niepotrzebnych
zapytań sieciowych.

Cele jakościowe: - dobre wyniki Lighthouse; - LCP, CLS i INP zgodne z
aktualnymi zaleceniami Core Web Vitals; - szybkie wyświetlenie hero; -
płynne działanie na telefonach ze średniej półki.

Nie optymalizuj wyłącznie wyniku laboratoryjnego kosztem UX. Priorytetem
jest realna szybkość.

------------------------------------------------------------------------

# 15. Analityka, cookies i prywatność

Przygotuj warstwę integracyjną dla: - Google Analytics 4; - Google Tag
Manager; - Google Search Console (weryfikacja przez konfigurację); -
Meta Pixel, jeśli firma będzie go używać; - narzędzia do analizy
zachowania użytkowników.

Nie dodawaj identyfikatorów testowych ani fikcyjnych. Użyj zmiennych
środowiskowych.

Przygotuj baner cookies / mechanizm zgód: - odrzucenie opcjonalnych
cookies równie łatwe jak akceptacja; - osobne kategorie zgód, jeśli
wymagane; - możliwość późniejszej zmiany decyzji; - brak uruchamiania
opcjonalnych trackerów przed zgodą; - zapamiętanie wyboru zgodnie z
przyjętym rozwiązaniem; - link do polityki prywatności i cookies.

Treści prawne powinny zostać zweryfikowane przez firmę / prawnika. Nie
przedstawiaj wygenerowanego tekstu jako porady prawnej.

------------------------------------------------------------------------

# 16. Wielojęzyczność

Przygotuj architekturę, którą będzie można rozszerzyć o: - polski (PL)
--- wersja podstawowa; - angielski (EN); - niemiecki (DE) ---
opcjonalnie.

Nie twórz pustych stron w innych językach. Na start może działać tylko
polska wersja, ale: - nie koduj tekstów na sztywno w każdym
komponencie; - oddziel treści od prezentacji; - przygotuj routing /
konfigurację, którą można rozbudować; - zaplanuj osobne metadata i URL
dla języków; - przewidź hreflang po uruchomieniu tłumaczeń.

------------------------------------------------------------------------

# 17. Mikrointerakcje i animacje

Używaj subtelnych, profesjonalnych animacji: - delikatne wejście
elementów podczas scrollowania; - hover na kartach; - przejścia w
menu; - animacje przycisków; - rozwijane FAQ; - subtelne zmiany stanu
formularza.

Zasady: - animacje nie mogą opóźniać dostępu do treści; - nie animuj
wszystkiego; - nie używaj ciężkich efektów parallax; - respektuj
`prefers-reduced-motion`; - zachowaj wysoką wydajność na mobile.

------------------------------------------------------------------------

# 18. Bezpieczeństwo i jakość

Zaimplementuj: - walidację wszystkich danych wejściowych; - bezpieczne
przetwarzanie załączników; - ochronę formularzy przed spamem; -
ograniczenie requestów; - bezpieczne nagłówki tam, gdzie właściwe; -
brak sekretów w repozytorium; - `.env.example`; - walidację konfiguracji
środowiska; - brak niebezpiecznego renderowania HTML; - aktualne
zależności; - czytelne logowanie błędów bez ujawniania danych osobowych.

Nie dodawaj własnych mechanizmów kryptograficznych ani nie twórz
niestandardowych rozwiązań bezpieczeństwa, jeśli istnieją sprawdzone
biblioteki.

------------------------------------------------------------------------

# 19. Testy i kryteria odbioru

Strona jest gotowa dopiero wtedy, gdy przejdzie kontrolę funkcjonalną.

## 19.1. Testy techniczne

Uruchom dostępne komendy: - lint; - typecheck; - testy jednostkowe; -
testy komponentów, jeśli są skonfigurowane; - build produkcyjny.

Dodaj testy dla: - walidacji formularza; - endpointu formularza; -
pobierania danych produktów; - generowania sitemap; - generowania
metadata; - routingu bloga; - komponentów nawigacji.

Jeśli możliwe, przygotuj podstawowe testy E2E Playwright dla: - wejścia
na stronę główną; - nawigacji do każdej kategorii; - otwarcia
artykułu; - walidacji i wysłania formularza (z mockiem / testowym
adapterem); - działania menu mobilnego.

## 19.2. Kryteria wizualne

-   strona nie wygląda jak szablon budowlany;
-   stylistyka jest spójna z proporcją 70% Wilmër / 30% BuildGo;
-   pierwsza sekcja jasno wyjaśnia ofertę;
-   trzy główne kategorie są widoczne bez szukania;
-   CTA są łatwe do znalezienia;
-   design jest dopracowany na mobile;
-   nie ma pustych bloków ani przypadkowych placeholderów;
-   zdjęcia są tematycznie zgodne z ALOPAK;
-   każda podstrona ma spójną hierarchię.

## 19.3. Kryteria biznesowe

-   użytkownik rozumie, co oferuje ALOPAK;
-   może szybko przejść do właściwej kategorii;
-   może wysłać zapytanie ofertowe;
-   formularz zbiera wystarczające informacje bez nadmiernego obciążania
    użytkownika;
-   blog prowadzi do kategorii produktowych;
-   każda kluczowa podstrona ma odpowiednie CTA;
-   strona jest gotowa do podłączenia analityki i CRM.

------------------------------------------------------------------------

# 20. Plan realizacji --- wykonuj etapami

Nie próbuj tworzyć wszystkiego w jednym chaotycznym kroku. Pracuj w
kolejności:

## Etap 1 --- Audyt i plan

-   sprawdź repozytorium;
-   przeanalizuj istniejące zasoby;
-   określ braki;
-   zaproponuj architekturę;
-   utwórz `IMPLEMENTATION_PLAN.md`;
-   utwórz `CONTENT_TODO.md`;
-   nie blokuj pracy z powodu brakujących danych.

## Etap 2 --- Fundament projektu

-   skonfiguruj Next.js App Router;
-   TypeScript strict;
-   Tailwind;
-   fonty;
-   global styles;
-   design tokens;
-   layout;
-   nawigację;
-   footer;
-   podstawowe komponenty UI.

## Etap 3 --- Strona główna

Zbuduj kompletną stronę główną zgodnie z rozdziałem 6. Dopracuj desktop
i mobile przed przejściem dalej.

## Etap 4 --- Oferta i produkty

-   trzy kategorie produktowe;
-   katalog;
-   szablon produktu;
-   breadcrumbs;
-   powiązane produkty;
-   CTA.

## Etap 5 --- Formularze

-   komponenty formularzy;
-   walidacja;
-   endpoint / Server Action;
-   obsługa wysyłki;
-   ochrona antyspamowa;
-   komunikaty sukcesu i błędu;
-   dokumentacja konfiguracji.

## Etap 6 --- O firmie, branże i kontakt

Zbuduj komplet podstron z treściami opartymi na potwierdzonych danych.

## Etap 7 --- Blog

-   listing;
-   kategorie;
-   wyszukiwarka;
-   artykuł;
-   spis treści;
-   powiązane wpisy;
-   CTA;
-   SEO.

## Etap 8 --- SEO i analityka

-   metadata;
-   sitemap;
-   robots;
-   schema;
-   Open Graph;
-   consent;
-   eventy analityczne;
-   przekierowania.

## Etap 9 --- QA i optymalizacja

-   responsywność;
-   dostępność;
-   performance;
-   testy;
-   build;
-   naprawa błędów;
-   kontrola linków;
-   kontrola formularzy.

## Etap 10 --- Dokumentacja

Utwórz: - `README.md` --- instalacja, uruchamianie, build, deployment; -
`.env.example` --- wymagane zmienne; - `CONTENT_TODO.md` --- dane i
materiały do uzupełnienia; - `IMPLEMENTATION_PLAN.md` --- wykonane etapy
i pozostałe zadania; - instrukcję dodawania produktów; - instrukcję
dodawania artykułów; - instrukcję konfiguracji poczty i analityki.

------------------------------------------------------------------------

# 21. Zasady dotyczące treści i placeholderów

Wszystkie treści mają brzmieć naturalnie po polsku. Nie używaj
automatycznych, sztucznie brzmiących fraz SEO.

Jeśli brakuje informacji: - nie wpisuj fikcyjnych danych; - nie
wyświetlaj pustych etykiet; - nie publikuj draftów; - przygotuj czytelne
pole do uzupełnienia; - opisz brak w `CONTENT_TODO.md`.

Dla danych kontaktowych: - używaj wyłącznie danych potwierdzonych w
materiałach firmy; - jeśli nie ma ich w repozytorium ani w wiarygodnym
źródle, utwórz konfigurację z pustymi wartościami i oznacz ją jako
wymagającą uzupełnienia; - nie twórz fikcyjnego numeru telefonu, adresu
ani e-maila.

Dla opinii i referencji: - nie twórz fikcyjnych cytatów; - nie dodawaj
fikcyjnych logotypów klientów; - przygotuj komponent, który można
włączyć po dostarczeniu materiałów.

------------------------------------------------------------------------

# 22. Oczekiwany efekt końcowy

Zbuduj kompletną, nowoczesną stronę ALOPAK, która: - wygląda jak
profesjonalna marka B2B; - łączy elegancję Wilmër z funkcjonalnością
BuildGo; - prezentuje puszki aluminiowe, folię spożywczą i folię
fryzjerską; - prowadzi użytkownika do zapytania ofertowego; - posiada
rozbudowany blog; - ma poprawne SEO techniczne; - działa na telefonach i
komputerach; - jest szybka i dostępna; - ma bezpieczne formularze; -
pozwala rozwijać katalog produktów; - jest przygotowana do przyszłego
e-commerce B2B; - umożliwia późniejszą integrację z CMS, CRM i ERP; -
nie zawiera zmyślonych danych.

**Nie twórz jedynie projektu graficznego. Zaimplementuj działającą
aplikację Next.js.**

## Końcowa instrukcja dla Cursora

Rozpocznij od audytu repozytorium i przygotowania planu. Następnie
realizuj kolejne etapy, faktycznie edytując i tworząc pliki projektu. Po
każdym etapie sprawdzaj działanie aplikacji. Jeżeli masz dostęp do
przeglądarki lub narzędzia podglądu, uruchom stronę i sprawdź ją
wizualnie na desktopie i mobile.

Nie kończ po wygenerowaniu strony głównej. Kontynuuj, aż wszystkie
kluczowe podstrony, formularze, blog, SEO, nawigacja i dokumentacja będą
gotowe.

Na koniec przedstaw: 1. listę zrealizowanych funkcji; 2. strukturę
najważniejszych plików; 3. komendy uruchomienia i builda; 4. wymagane
zmienne środowiskowe; 5. listę danych, zdjęć i dokumentów, które ALOPAK
musi dostarczyć; 6. listę elementów, które wymagają konfiguracji
zewnętrznej; 7. wyniki testów i builda; 8. znane ograniczenia i następne
rekomendowane kroki.
