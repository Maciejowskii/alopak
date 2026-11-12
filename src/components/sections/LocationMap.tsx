import { contact } from "@/data/site";

export function LocationMap() {
  const lat = Number(contact.coordinates?.lat);
  const lng = Number(contact.coordinates?.lng);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;

  const addressLine = `${contact.street}, ${contact.postalCode} ${contact.city}`;
  const query = encodeURIComponent(`${contact.legalName}, ${addressLine}`);
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://www.google.com/maps?q=${lat},${lng}&z=16&hl=pl&output=embed`;

  return (
    <section id="mapa" className="border-t border-border bg-surface scroll-mt-24">
      <div className="container-wide section-pad !pb-12 !pt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Jak do nas trafić
            </h2>
            <p className="mt-3 text-base text-muted">
              {contact.legalName}
              <br />
              {addressLine}
            </p>
          </div>
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary underline-offset-4 hover:underline"
          >
            Otwórz w Google Maps
          </a>
        </div>

        <div className="mt-8 overflow-hidden border border-border bg-white">
          <iframe
            title={`Mapa Google — ${contact.legalName}, ${addressLine}`}
            src={embedUrl}
            className="h-[360px] w-full sm:h-[440px] lg:h-[520px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
