import { z } from "zod";

export const quoteCategoryValues = [
  "puszki-aluminiowe",
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

export const MAX_ATTACHMENT_BYTES = 5 * 1024 * 1024;
