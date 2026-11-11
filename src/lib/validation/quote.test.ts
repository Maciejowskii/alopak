import { describe, expect, it } from "vitest";
import { quoteSchema } from "@/lib/validation/quote";

describe("quoteSchema", () => {
  it("accepts a valid payload", () => {
    const result = quoteSchema.safeParse({
      name: "Jan Kowalski",
      company: "Przykład Sp. z o.o.",
      email: "jan@firma.pl",
      phone: "+48 500 000 000",
      category: "puszki-aluminiowe",
      product: "Puszka 100",
      quantity: "10 000 szt.",
      message: "Proszę o informację ofertową dotyczącą puszek 100 ml.",
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
