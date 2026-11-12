"use client";

import { cn } from "@/lib/utils";

/** Subtle metallic light sweep — desktop only, respects reduced motion via CSS. */
export function AluminiumSheen({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        "max-md:hidden motion-reduce:hidden",
        className,
      )}
    >
      <div className="aluminium-sheen absolute inset-0" />
    </div>
  );
}
