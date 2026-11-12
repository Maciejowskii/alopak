"use client";

import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";

export type RevealVariant = "up" | "fade" | "scale" | "left" | "right" | "blur";

const hiddenStyles: Record<RevealVariant, string> = {
  up: "translate-y-5 opacity-0",
  fade: "opacity-0",
  scale: "translate-y-3 scale-[0.97] opacity-0",
  left: "-translate-x-5 opacity-0",
  right: "translate-x-5 opacity-0",
  blur: "translate-y-3 opacity-0 blur-[4px]",
};

const visibleStyles: Record<RevealVariant, string> = {
  up: "translate-y-0 opacity-100",
  fade: "opacity-100",
  scale: "translate-y-0 scale-100 opacity-100",
  left: "translate-x-0 opacity-100",
  right: "translate-x-0 opacity-100",
  blur: "translate-y-0 opacity-100 blur-0",
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 700,
  variant = "up",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  as?: "div" | "section" | "article" | "li" | "span";
}) {
  const { ref, inView } = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref as React.RefObject<HTMLDivElement & HTMLLIElement & HTMLElement>}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
      className={cn(
        "motion-safe:transition-[opacity,transform,filter] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
        "motion-reduce:!translate-x-0 motion-reduce:!translate-y-0 motion-reduce:!scale-100 motion-reduce:!opacity-100 motion-reduce:!blur-0 motion-reduce:!transition-none",
        inView ? visibleStyles[variant] : hiddenStyles[variant],
        className,
      )}
    >
      {children}
    </Tag>
  );
}
