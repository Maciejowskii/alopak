import { z } from "zod";

export const quoteCategoryValues = [
  "puszki-aluminiowe",
  "opakowania-swiecowe",
  "folia-spozywcza",
  "folia-fryzjerska",
  "inne",
] as const;

export const quoteSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Podaj imię i nazwisko (min. 2 znaki).")
    .max(120, "Imię i nazwisko jest zbyt długie."),
  company: z
    .string()
    .trim()
    .min(2, "Podaj nazwę firmy.")
    .max(160, "Nazwa firmy jest zbyt długa."),
  email: z
    .string()
    .trim()
    .email("Podaj prawidłowy służbowy adres e-mail.")
    .max(160),
  phone: z
    .string()
    .trim()
    .max(40, "Numer telefonu jest zbyt długi.")
    .optional()
    .or(z.literal("")),
  category: z.enum(quoteCategoryValues, {
    message: "Wybierz kategorię produktu.",
  }),
  product: z.string().trim().max(160).optional().or(z.literal("")),
  quantity: z.string().trim().max(120).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(20, "Opisz zapytanie dokładniej (min. 20 znaków).")
    .max(4000, "Treść zapytania jest zbyt długa."),
  consent: z.literal(true, {
    message: "Wymagane jest potwierdzenie informacji o przetwarzaniu danych.",
  }),
  website: z.string().max(0).optional().or(z.literal("")),
});

export type QuoteInput = z.infer<typeof quoteSchema>;

export const ALLOWED_ATTACHMENT_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
] as const;

export const ALLOWED_ATTACHMENT_EXTENSIONS = [
  ".pdf",
  ".jpg",
  ".jpeg",
  ".png",
  ".doc",
  ".docx",
] as const;

/** Client/server UX limit — stays under Vercel ~4.5 MB body limit. */
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024;
export const MAX_ATTACHMENT_LABEL = "4 MB";

export function attachmentExtensionOk(filename: string) {
  const lower = filename.toLowerCase();
  return ALLOWED_ATTACHMENT_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/** Magic-byte sniff for common attachment types. */
export function sniffAttachmentMime(buffer: Buffer): string | null {
  if (buffer.length < 4) return null;
  if (buffer[0] === 0x25 && buffer[1] === 0x50 && buffer[2] === 0x44 && buffer[3] === 0x46) {
    return "application/pdf";
  }
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return "image/png";
  }
  // ZIP container (DOCX) or OLE (DOC)
  if (buffer[0] === 0x50 && buffer[1] === 0x4b) {
    return "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  }
  if (buffer[0] === 0xd0 && buffer[1] === 0xcf && buffer[2] === 0x11 && buffer[3] === 0xe0) {
    return "application/msword";
  }
  return null;
}
