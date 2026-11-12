"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/types";
import { cn } from "@/lib/utils";

/**
 * Accordion keeps every answer in the DOM (visible or sr-only) for SEO + a11y.
 */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;

        return (
          <div key={item.question}>
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left text-base font-semibold text-navy transition-colors hover:text-brand"
                onClick={() => setOpenIndex(open ? null : index)}
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "size-5 shrink-0 text-accent-dark transition-transform duration-200",
                    open && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={cn(
                "leading-relaxed text-muted",
                open ? "pb-5" : "sr-only",
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
