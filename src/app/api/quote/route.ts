import { NextResponse } from "next/server";
import { submitQuote, type QuoteActionState } from "@/app/actions/quote";

export async function POST(request: Request) {
  const formData = await request.formData();
  const result: QuoteActionState = await submitQuote(
    { ok: false, message: "" },
    formData,
  );

  return NextResponse.json(result, {
    status: result.ok ? 200 : 400,
  });
}
