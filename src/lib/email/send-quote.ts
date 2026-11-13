import type { QuoteInput } from "@/lib/validation/quote";

export type SendQuoteResult =
  | { ok: true; provider: "resend" | "smtp" | "log" }
  | { ok: false; code: "NOT_CONFIGURED" | "SEND_FAILED"; message: string };

function isEmailConfigured() {
  if (process.env.RESEND_API_KEY && process.env.QUOTE_TO_EMAIL) return true;
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS &&
    process.env.QUOTE_TO_EMAIL
  ) {
    return true;
  }
  return false;
}

export async function sendQuoteEmail({
  data,
}: {
  data: QuoteInput;
}): Promise<SendQuoteResult> {
  if (!isEmailConfigured()) {
    return {
      ok: false,
      code: "NOT_CONFIGURED",
      message:
        "Wysyłka e-mail nie jest skonfigurowana. Ustaw QUOTE_TO_EMAIL oraz Resend lub SMTP (patrz .env.example).",
    };
  }

  const to = process.env.QUOTE_TO_EMAIL!;
  const subject = `[ALOPAK] Zapytanie ofertowe — ${data.category}`;
  const body = [
    `Imię i nazwisko: ${data.name}`,
    `Firma: ${data.company}`,
    `E-mail: ${data.email}`,
    `Telefon: ${data.phone || "—"}`,
    `Kategoria: ${data.category}`,
    "",
    "Wiadomość:",
    data.message,
  ].join("\n");

  try {
    if (process.env.RESEND_API_KEY) {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.QUOTE_FROM_EMAIL || "onboarding@resend.dev",
          to: [to],
          reply_to: data.email,
          subject,
          text: body,
        }),
      });

      if (!response.ok) {
        console.error("Resend error", response.status);
        return {
          ok: false,
          code: "SEND_FAILED",
          message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
        };
      }

      return { ok: true, provider: "resend" };
    }

    // SMTP adapter placeholder — requires additional transport package when configured
    console.error("SMTP configured but transport adapter is not fully enabled.");
    return {
      ok: false,
      code: "SEND_FAILED",
      message:
        "Konfiguracja SMTP wykryta, ale wymaga dokończenia adaptera. Użyj Resend lub skontaktuj się z administratorem.",
    };
  } catch (error) {
    console.error("Quote email failed", error instanceof Error ? error.message : "unknown");
    return {
      ok: false,
      code: "SEND_FAILED",
      message: "Nie udało się wysłać wiadomości. Spróbuj ponownie później.",
    };
  }
}
