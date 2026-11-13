import Link from "next/link";
import { contact, footerNav, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";

export function Footer() {
  // Static copyright year avoids non-deterministic prerender under Cache Components.
  const year = 2026;
  const primaryPhone = contact.phones[0];

  return (
    <footer className="mt-auto border-t border-border bg-navy text-white">
      <div className="container-site section-pad">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-3">
            <p className="text-xl font-extrabold tracking-[0.12em]">ALOPAK</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/75">
              Polski producent opakowań aluminiowych. Oferta dla firm: puszki,
              opakowania świecowe, folia spożywcza i folia fryzjerska.
            </p>
            <div className="mt-6">
              <Button href="/kontakt" variant="light" size="sm">
                Zapytaj o ofertę
              </Button>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-6">
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
            <address className="mt-4 space-y-3 text-sm not-italic leading-relaxed text-white/80">
              <p>{contact.legalName}</p>
              <p>
                {contact.street}
                <br />
                {contact.postalCode} {contact.city}
              </p>
              <p>
                NIP {contact.nip}
                <br />
                KRS {contact.krs}
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
              {primaryPhone ? (
                <p>
                  <a
                    href={`tel:${primaryPhone.replace(/\s/g, "")}`}
                    className="font-semibold transition-colors hover:text-white"
                    data-analytics="phone_click"
                  >
                    {primaryPhone}
                  </a>
                </p>
              ) : null}
            </address>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6 text-xs text-white/55">
          <p>
            © {year} {siteConfig.name}. Wszelkie prawa zastrzeżone.
          </p>
        </div>
      </div>
    </footer>
  );
}
