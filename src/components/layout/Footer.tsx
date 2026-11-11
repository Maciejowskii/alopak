import Link from "next/link";
import { contact, footerNav, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Footer() {
  // Static copyright year avoids non-deterministic prerender under Cache Components.
  const year = 2026;

  return (
    <footer className="mt-auto border-t border-border bg-primary text-white">
      <div className="container-site section-pad">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="text-xl font-semibold tracking-[0.08em]">ALOPAK</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Polski producent opakowań aluminiowych. Oferta dla firm: puszki
              aluminiowe, folia spożywcza i folia fryzjerska.
            </p>
            <div className="mt-6">
              <Button href="/kontakt" variant="light" size="sm">
                Zapytaj o ofertę
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                Oferta
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.oferta.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                Firma
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.firma.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
                Informacje
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/80">
                {footerNav.legal.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-3">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
              Kontakt
            </p>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed text-white/80">
              <p>{contact.legalName}</p>
              <p>
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}
              </p>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="transition-colors hover:text-white"
                  data-analytics="email_click"
                >
                  {contact.email}
                </a>
              </p>
              <p>
                <a
                  href={`tel:${contact.phones[0].replace(/\s/g, "")}`}
                  className="transition-colors hover:text-white"
                  data-analytics="phone_click"
                >
                  {contact.phones[0]}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </p>
          <p>Producent opakowań aluminiowych · Ostrzeszów</p>
        </div>
      </div>
    </footer>
  );
}
