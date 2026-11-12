"use server";

import { headers } from "next/headers";
import { contact } from "@/data/site";
import { sendQuoteEmail } from "@/lib/email/send-quote";
import { rateLimit } from "@/lib/rate-limit";
import {
  ALLOWED_ATTACHMENT_TYPES,
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENT_LABEL,
  attachmentExtensionOk,
  quoteSchema,
  sniffAttachmentMime,
} from "@/lib/validation/quote";

export type QuoteActionState = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
};

function sanitizeFilename(name: string) {
  return name
    .normalize("NFKD")
    .replace(/[^\w.\-]+/g, "_")
    .slice(0, 120);
}

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
    product: String(formData.get("product") || ""),
    quantity: String(formData.get("quantity") || ""),
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

  const file = formData.get("attachment");
  let attachment:
    | { filename: string; contentType: string; content: Buffer }
    | undefined;

  if (file && file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      const msg = `Załącznik może mieć maksymalnie ${MAX_ATTACHMENT_LABEL}.`;
      return {
        ok: false,
        message: msg,
        fieldErrors: { attachment: [msg] },
      };
    }

    if (!attachmentExtensionOk(file.name)) {
      return {
        ok: false,
        message: "Niedozwolony typ załącznika.",
        fieldErrors: {
          attachment: ["Dozwolone: PDF, JPG, PNG, DOC, DOCX."],
        },
      };
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const sniffed = sniffAttachmentMime(buffer);

    if (!sniffed) {
      return {
        ok: false,
        message: "Nie rozpoznano typu załącznika.",
        fieldErrors: {
          attachment: ["Plik wygląda na uszkodzony lub ma niedozwolony format."],
        },
      };
    }

    const declaredOk = ALLOWED_ATTACHMENT_TYPES.includes(
      file.type as (typeof ALLOWED_ATTACHMENT_TYPES)[number],
    );
    // Allow empty browser MIME if magic bytes match; reject MIME/magic mismatch when both present
    if (file.type && declaredOk && file.type !== sniffed) {
      // DOC vs DOCX both accepted via sniff; JPEG aliases
      const compatible =
        (file.type === "image/jpeg" && sniffed === "image/jpeg") ||
        (file.type === "image/png" && sniffed === "image/png") ||
        (file.type === "application/pdf" && sniffed === "application/pdf") ||
        (file.type.includes("word") && sniffed.includes("word"));
      if (!compatible) {
        return {
          ok: false,
          message: "Typ załącznika nie zgadza się z zawartością pliku.",
          fieldErrors: {
            attachment: ["Dozwolone: PDF, JPG, PNG, DOC, DOCX."],
          },
        };
      }
    }

    if (file.type && !declaredOk && !sniffed) {
      return {
        ok: false,
        message: "Niedozwolony typ załącznika.",
        fieldErrors: {
          attachment: ["Dozwolone: PDF, JPG, PNG, DOC, DOCX."],
        },
      };
    }

    attachment = {
      filename: sanitizeFilename(file.name || "zalacznik"),
      contentType: sniffed,
      content: buffer,
    };
  }

  const result = await sendQuoteEmail({ data: parsed.data, attachment });

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
      "Dziękujemy. Zapytanie zostało wysłane. Skontaktujemy się w sprawie szczegółów.",
  };
}
