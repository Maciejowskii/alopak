"use client";

import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

/** Elegant reveal for the existing ISO quality-system paragraph (factual copy only). */
export function IsoRevealBlock({ children }: { children: React.ReactNode }) {
  const { ref, inView, reduced } = useInView<HTMLParagraphElement>({
    threshold: 0.45,
  });

  return (
    <p
      ref={ref}
      className={cn(
        "iso-reveal pl-4 motion-safe:transition-[opacity,transform] motion-safe:duration-700 motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
        inView || reduced
          ? "is-visible translate-y-0 opacity-100"
          : "translate-y-3 opacity-0",
      )}
    >
      {children}
    </p>
  );
}
