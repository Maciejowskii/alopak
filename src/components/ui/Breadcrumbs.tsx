import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type Crumb = {
  label: string;
  href?: string;
};

export function Breadcrumbs({
  items,
  tone = "dark",
}: {
  items: Crumb[];
  tone?: "dark" | "light";
}) {
  const light = tone === "light";

  return (
    <nav aria-label="Okruszki nawigacyjne" className="mb-6">
      <ol
        className={cn(
          "flex flex-wrap items-center gap-1 text-sm",
          light ? "text-white/65" : "text-muted",
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <ChevronRight className="size-3.5 opacity-60" aria-hidden />
              ) : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={cn(
                    "transition-colors",
                    light ? "hover:text-white" : "hover:text-primary",
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && (light ? "font-medium text-white" : "font-medium text-ink"))}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
