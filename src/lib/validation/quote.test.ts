import { describe, expect, it } from "vitest";
import { detectAttachmentKind } from "@/lib/validation/attachment";
import { MAX_ATTACHMENT_BYTES, quoteSchema } from "@/lib/validation/quote";

describe("attachment limits", () => {
  it("allows attachments up to 4 MB", () => {
    expect(MAX_ATTACHMENT_BYTES).toBe(4 * 1024 * 1024);
  });

  it("detects PDF magic bytes", () => {
    expect(detectAttachmentKind(Buffer.from("%PDF-1.4"))).toBe("pdf");
  });
});

describe("quoteSchema", () => {
  it("accepts a valid payload", () => {
    const result = quoteSchema.safeParse({
      name: "Jan Kowalski",
      company: "Przykład Sp. z o.o.",
      email: "jan@firma.pl",
      phone: "+48 500 000 000",
      category: "puszki-aluminiowe",
      message: "Proszę o informację ofertową dotyczącą puszek 100 ml.",
      consent: true,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("accepts payload without phone", () => {
    const result = quoteSchema.safeParse({
      name: "Jan Kowalski",
      company: "Przykład Sp. z o.o.",
      email: "jan@firma.pl",
      phone: "",
      category: "inne",
      message: "Potrzebuję oferty na opakowania aluminiowe do świec.",
      consent: true,
      website: "",
    });

    expect(result.success).toBe(true);
  });

  it("rejects missing consent and short message", () => {
    const result = quoteSchema.safeParse({
      name: "Jan",
      company: "Firma",
      email: "jan@firma.pl",
      category: "folia-fryzjerska",
      message: "Za krótko",
      consent: false,
    });

    expect(result.success).toBe(false);
  });
});
