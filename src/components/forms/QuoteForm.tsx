"use client";

import {
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
} from "react";
import { submitQuote, type QuoteActionState } from "@/app/actions/quote";
import { trackEvent } from "@/lib/analytics/events";
import { quoteCategoryValues } from "@/lib/validation/quote";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: QuoteActionState = {
  ok: false,
  message: "",
};

const categoryLabels: Record<(typeof quoteCategoryValues)[number], string> = {
  "puszki-aluminiowe": "Puszki aluminiowe",
  "opakowania-swiecowe": "Opakowania świecowe",
  "folia-spozywcza": "Folia spożywcza",
  "folia-fryzjerska": "Folia fryzjerska",
  inne: "Inne / nie wiem",
};

export function QuoteForm({
  defaultCategory,
  defaultProduct,
  variant = "full",
}: {
  defaultCategory?: string;
  defaultProduct?: string;
  variant?: "full" | "compact";
}) {
  const compact = variant === "compact";
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [started, setStarted] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const uid = useId();
  const statusId = `${uid}-status`;
  const hintId = `${uid}-hint`;
  const categoryId = `${uid}-category`;
  const messageId = `${uid}-message`;
  const websiteId = `${uid}-website`;

  const messageDefault = defaultProduct
    ? `Produkt / wariant: ${defaultProduct}.\n`
    : undefined;

  useEffect(() => {
    trackEvent("quote_form_view", { variant });
  }, [variant]);

  useEffect(() => {
    if (state.ok) {
      trackEvent("quote_form_success", { variant });
      formRef.current?.reset();
    } else if (state.message && !state.ok) {
      trackEvent("quote_form_error", { message: state.message, variant });
    }
  }, [state, variant]);

  function markStart() {
    if (!started) {
      setStarted(true);
      trackEvent("quote_form_start", { variant });
    }
  }

  const showFormAlert =
    state.message &&
    !state.ok &&
    (!state.fieldErrors || Object.keys(state.fieldErrors).length === 0);

  if (state.ok) {
    return (
      <div
        className={cn(
          "border border-success/30 bg-success/5",
          compact ? "p-5" : "rounded-lg p-6 sm:p-8",
        )}
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-ink">
          Dziękujemy. Zapytanie przyjęte
        </p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{state.message}</p>
        <p className="mt-4 text-sm text-muted">
          Odpowiemy na podany adres e-mail. Jeśli sprawa jest pilna, zadzwoń lub
          napisz bezpośrednio.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        trackEvent("quote_form_submit", { variant });
        formAction(formData);
      }}
      className={cn("relative", compact ? "space-y-3" : "space-y-3.5")}
      noValidate
      onFocus={markStart}
      aria-describedby={`${hintId} ${statusId}`}
    >
      <div id={statusId} className="sr-only" aria-live="polite">
        {!state.ok && state.message ? state.message : ""}
      </div>

      <div
        className={cn(
          "grid gap-3",
          compact ? "sm:grid-cols-2" : "gap-3.5 sm:grid-cols-2",
        )}
      >
        <Field
          id={`${uid}-name`}
          label="Imię i nazwisko"
          name="name"
          required
          autoComplete="name"
          errors={state.fieldErrors?.name}
        />
        <Field
          id={`${uid}-company`}
          label="Nazwa firmy"
          name="company"
          required
          autoComplete="organization"
          errors={state.fieldErrors?.company}
        />
      </div>

      <div className={cn("grid gap-3", compact && "sm:grid-cols-2")}>
        <Field
          id={`${uid}-email`}
          label={compact ? "E-mail" : "Adres e-mail"}
          name="email"
          type="email"
          required
          autoComplete="email"
          errors={state.fieldErrors?.email}
        />
        <Field
          id={`${uid}-phone`}
          label="Telefon"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          errors={state.fieldErrors?.phone}
        />
      </div>

      <div>
        <label htmlFor={categoryId} className={labelClass}>
          {compact ? "Kategoria" : "Czego dotyczy zapytanie?"}
          <RequiredMark />
        </label>
        <select
          id={categoryId}
          name="category"
          required
          aria-required="true"
          defaultValue={defaultCategory || ""}
          className={inputClass(Boolean(state.fieldErrors?.category))}
        >
          <option value="" disabled>
            Wybierz kategorię
          </option>
          {quoteCategoryValues.map((value) => (
            <option key={value} value={value}>
              {categoryLabels[value]}
            </option>
          ))}
        </select>
        <FieldError errors={state.fieldErrors?.category} />
      </div>

      <div>
        <label htmlFor={messageId} className={labelClass}>
          Wiadomość
          <RequiredMark />
        </label>
        <textarea
          id={messageId}
          name="message"
          required
          aria-required="true"
          rows={compact ? 3 : 4}
          defaultValue={messageDefault}
          className={cn(
            inputClass(Boolean(state.fieldErrors?.message), { multiline: true }),
            compact && "min-h-[5.5rem]",
          )}
          placeholder={
            compact
              ? "Czego potrzebujesz? Produkt, ilość, termin..."
              : "Napisz, czego potrzebujesz: produkt lub wariant, ilość oraz dodatkowe wymagania"
          }
        />
        <FieldError errors={state.fieldErrors?.message} />
      </div>

      <label className="flex items-start gap-3 pt-0.5 text-sm text-muted">
        <input
          type="checkbox"
          name="consent"
          required
          aria-required="true"
          className="mt-1 size-4 rounded border-border"
        />
        <span>
          Potwierdzam zapoznanie się z{" "}
          <a
            href="/polityka-prywatnosci"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline-offset-2 hover:underline"
          >
            informacją o przetwarzaniu danych
          </a>
          . <RequiredMark />
        </span>
      </label>
      <FieldError errors={state.fieldErrors?.consent} />

      {/* Honeypot: off-screen, hidden from AT */}
      <div
        className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden opacity-0"
        aria-hidden="true"
      >
        <input
          id={websiteId}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>

      {showFormAlert ? (
        <p
          className="rounded-md border border-error/30 bg-error/5 px-4 py-3 text-sm text-error"
          role="alert"
        >
          {state.message}
        </p>
      ) : null}

      {!compact ? (
        <p id={hintId} className="text-xs text-muted">
          Pola oznaczone <span aria-hidden="true">*</span> są wymagane. Telefon
          jest opcjonalny.
        </p>
      ) : (
        <p id={hintId} className="sr-only">
          Pola oznaczone gwiazdką są wymagane. Telefon jest opcjonalny.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        disabled={pending}
        className={cn(
          "btn-premium bg-navy hover:bg-navy-hover",
          compact
            ? "mt-1 h-12 w-full rounded-none text-sm font-semibold sm:w-auto sm:px-8"
            : "w-full rounded-none font-bold uppercase tracking-[0.04em] sm:w-auto",
        )}
      >
        {pending ? "Wysyłanie..." : "Wyślij zapytanie"}
      </Button>
    </form>
  );
}

function RequiredMark() {
  return (
    <>
      {" "}
      <span className="text-error" aria-hidden="true">
        *
      </span>
    </>
  );
}

const labelClass = "mb-1.5 block text-sm font-medium text-ink";

function Field({
  id,
  label,
  name,
  type = "text",
  inputMode,
  required,
  autoComplete,
  defaultValue,
  errors,
}: {
  id?: string;
  label: string;
  name: string;
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  errors?: string[];
}) {
  const fieldId = id || name;
  return (
    <div>
      <label htmlFor={fieldId} className={labelClass}>
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <input
        id={fieldId}
        name={name}
        type={type}
        inputMode={inputMode}
        required={required}
        aria-required={required || undefined}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className={inputClass(Boolean(errors?.length))}
      />
      <FieldError errors={errors} />
    </div>
  );
}

function FieldError({ errors }: { errors?: string[] }) {
  if (!errors?.length) return null;
  return (
    <p className="mt-1 text-sm text-error" role="alert">
      {errors[0]}
    </p>
  );
}

function inputClass(hasError: boolean, options?: { multiline?: boolean }) {
  return cn(
    "field-focus w-full rounded-md border bg-white px-3.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-out placeholder:text-muted/70 focus:border-primary focus:bg-aluminium/40",
    options?.multiline ? "min-h-[6.5rem] py-2.5" : "h-11",
    hasError ? "border-error" : "border-border",
  );
}
