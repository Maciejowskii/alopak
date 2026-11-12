"use client";

import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";

export function CountUp({
  value,
  duration = 2000,
  className,
}: {
  value: number;
  duration?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLSpanElement>({ threshold: 0.4 });
  const current = useCountUp(value, { active: inView, duration });

  return (
    <span ref={ref} className={className}>
      {current}
    </span>
  );
}
