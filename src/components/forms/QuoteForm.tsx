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
import {
  MAX_ATTACHMENT_BYTES,
  MAX_ATTACHMENT_LABEL,
} from "@/lib/validation/quote";
import { quoteCategoryValues } from "@/lib/validation/quote";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const initialState: QuoteActionState = {
  ok: false,
  message: "",
};

const categoryLabels: Record<(typeof quoteCategoryValues)[number], string> = {
  "puszki-aluminiowe": "Puszki aluminiowe",
  "folia-spozywcza": "Folia spożywcza",
  "folia-fryzjerska": "Folia fryzjerska",
  inne: "Inne / nie wiem",
};

export function QuoteForm({
  defaultCategory,
  defaultProduct,
}: {
  defaultCategory?: string;
  defaultProduct?: string;
}) {
  const [state, formAction, pending] = useActionState(submitQuote, initialState);
  const [started, setStarted] = useState(false);
  const [localAttachmentError, setLocalAttachmentError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusId = useId();
  const hintId = useId();
  const attachmentHelpId = useId();

  const attachmentErrors = state.fieldErrors?.attachment?.length
    ? state.fieldErrors.attachment
    : localAttachmentError
      ? [localAttachmentError]
      : [];

  useEffect(() => {
    trackEvent("quote_form_view");
  }, []);

  useEffect(() => {
    if (state.ok) {
      trackEvent("quote_form_success");
      formRef.current?.reset();
    } else if (state.message && !state.ok) {
      trackEvent("quote_form_error", { message: state.message });
    }
  }, [state]);

  function markStart() {
    if (!started) {
      setStarted(true);
      trackEvent("quote_form_start");
    }
  }

  function validateAttachmentSize(file: File | null) {
    if (!file) {
      setLocalAttachmentError(null);
      return;
    }
    if (file.size > MAX_ATTACHMENT_BYTES) {
      setLocalAttachmentError(`Załącznik może mieć maksymalnie ${MAX_ATTACHMENT_LABEL}.`);
      return;
    }
    setLocalAttachmentError(null);
  }

  const showFormAlert =
    state.message &&
    !state.ok &&
    (!state.fieldErrors || Object.keys(state.fieldErrors).length === 0);

  if (state.ok) {
    return (
      <div
        className="rounded-lg border border-success/30 bg-success/5 p-6"
        role="status"
        aria-live="polite"
      >
        <p className="text-lg font-semibold text-ink">Zapytanie wysłane</p>
        <p className="mt-2 text-sm leading-relaxed text-muted">{state.message}</p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        if (localAttachmentError) {
          return;
        }
        trackEvent("quote_form_submit");
        formAction(formData);
      }}
      className="relative space-y-5"
      noValidate
      onFocus={markStart}
      aria-describedby={`${hintId} ${statusId}`}
    >
      <div id={statusId} className="sr-only" aria-live="polite">
        {!state.ok && state.message ? state.message : ""}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Imię i nazwisko"
          name="name"
          required
          autoComplete="name"
          errors={state.fieldErrors?.name}
        />
        <Field
          label="Nazwa firmy"
          name="company"
          required
          autoComplete="organization"
          errors={state.fieldErrors?.company}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Służbowy e-mail"
          name="email"
          type="email"
          required
          autoComplete="email"
          errors={state.fieldErrors?.email}
        />
        <Field
          label="Telefon"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          errors={state.fieldErrors?.phone}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="category" className="mb-2 block text-sm font-medium text-ink">
            Kategoria produktu
            <RequiredMark />
          </label>
          <select
            id="category"
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
        <Field
          label="Produkt / wariant"
          name="product"
          defaultValue={defaultProduct}
          errors={state.fieldErrors?.product}
        />
      </div>

      <Field
        label="Szacowana ilość / zapotrzebowanie"
        name="quantity"
        errors={state.fieldErrors?.quantity}
      />

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-ink">
          Treść zapytania
          <RequiredMark />
        </label>
        <textarea
          id="message"
          name="message"
          required
          aria-required="true"
          rows={6}
          className={inputClass(Boolean(state.fieldErrors?.message))}
          placeholder="Opisz potrzeby, zastosowania, wymagania techniczne lub pytania."
        />
        <FieldError errors={state.fieldErrors?.message} />
      </div>

      <div>
        <label htmlFor="attachment" className="mb-2 block text-sm font-medium text-ink">
          Załącznik (opcjonalnie)
        </label>
        <input
          id="attachment"
          name="attachment"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,application/pdf,image/jpeg,image/png"
          className="block w-full text-sm text-muted file:mr-4 file:rounded-md file:border-0 file:bg-surface file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary"
          aria-describedby={attachmentHelpId}
          aria-invalid={attachmentErrors.length > 0 || undefined}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null;
            validateAttachmentSize(file);
          }}
        />
        <p id={attachmentHelpId} className="mt-2 text-xs text-muted">
          PDF, JPG, PNG, DOC, DOCX — max {MAX_ATTACHMENT_LABEL}.
        </p>
        <FieldError errors={attachmentErrors} />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
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

      {/* Honeypot — visually off-screen, hidden from AT */}
      <div
        className="pointer-events-none absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
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

      <p id={hintId} className="text-xs text-muted">
        Po wysłaniu zapytania skontaktujemy się w sprawie szczegółów. Pola oznaczone{" "}
        <span aria-hidden="true">*</span> są wymagane.
      </p>

      <Button type="submit" size="lg" disabled={pending || Boolean(localAttachmentError)} className="w-full sm:w-auto">
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

function Field({
  label,
  name,
  type = "text",
  inputMode,
  required,
  autoComplete,
  defaultValue,
  errors,
}: {
  label: string;
  name: string;
  type?: string;
  inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
  required?: boolean;
  autoComplete?: string;
  defaultValue?: string;
  errors?: string[];
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-sm font-medium text-ink">
        {label}
        {required ? <RequiredMark /> : null}
      </label>
      <input
        id={name}
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
    <p className="mt-1.5 text-sm text-error" role="alert">
      {errors[0]}
    </p>
  );
}

function inputClass(hasError: boolean) {
  return cn(
    "field-focus w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-ink outline-none transition-[border-color,box-shadow,background-color] duration-300 ease-out placeholder:text-muted/70 focus:border-primary focus:bg-aluminium/40",
    hasError ? "border-error" : "border-border",
  );
}
