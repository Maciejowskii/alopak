"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="section-pad">
      <Container className="max-w-2xl text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-ink">
          Coś poszło nie tak
        </h1>
        <p className="mt-4 text-muted">
          Wystąpił błąd podczas ładowania strony. Spróbuj ponownie.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button type="button" onClick={reset}>
            Spróbuj ponownie
          </Button>
          <Button href="/" variant="secondary">
            Strona główna
          </Button>
        </div>
      </Container>
    </section>
  );
}
