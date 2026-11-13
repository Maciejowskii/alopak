"use server";

import { headers } from "next/headers";
import { contact } from "@/data/site";
import { sendQuoteEmail } from "@/lib/email/send-quote";
import { rateLimit } from "@/lib/rate-limit";
import { quoteSchema } from "@/lib/validation/quote";

export type QuoteActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

function contactFallbackMessage(prefix: string) {
  return `${prefix} Napisz na ${contact.email} lub zadzwoń pod ${contact.phones[0]}.`;
}

export async function submitQuote(
  _prev: QuoteActionState,
  formData: FormData,
): Promise<QuoteActionState> {
  const headerStore = await headers();
  const ip =
    headerStore.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    headerStore.get("x-real-ip") ||
    "unknown";

  const limited = rateLimit({ key: `quote:${ip}`, limit: 5, windowMs: 60_000 });
  if (!limited.ok) {
    return {
      ok: false,
      message: "Zbyt wiele prób. Odczekaj minutę i spróbuj ponownie.",
    };
  }

  const raw = {
    name: String(formData.get("name") || ""),
    company: String(formData.get("company") || ""),
    email: String(formData.get("email") || ""),
    phone: String(formData.get("phone") || ""),
    category: String(formData.get("category") || ""),
    message: String(formData.get("message") || ""),
    consent: formData.get("consent") === "on" || formData.get("consent") === "true",
    website: String(formData.get("website") || ""),
  };

  if (raw.website) {
    return {
      ok: false,
      message: "Nie udało się wysłać formularza.",
    };
  }

  const parsed = quoteSchema.safeParse({
    ...raw,
    consent: raw.consent ? true : false,
  });

  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] || "form");
      fieldErrors[key] = fieldErrors[key] || [];
      fieldErrors[key].push(issue.message);
    }
    return {
      ok: false,
      message: "Sprawdź poprawność pól formularza.",
      fieldErrors,
    };
  }

  const result = await sendQuoteEmail({ data: parsed.data });

  if (!result.ok) {
    return {
      ok: false,
      message: contactFallbackMessage(
        result.code === "NOT_CONFIGURED"
          ? "Nie udało się wysłać zapytania przez formularz."
          : "Wystąpił błąd podczas wysyłki.",
      ),
    };
  }

  return {
    ok: true,
    message:
      "Twoje zapytanie zostało przyjęte. Skontaktujemy się wkrótce i przygotujemy odpowiednią ofertę.",
  };
}
