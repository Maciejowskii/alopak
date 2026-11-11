import { cn } from "@/lib/utils";

export function Container({
  children,
  className,
  narrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}) {
  return (
    <div className={cn(narrow ? "container-narrow" : "container-site", className)}>
      {children}
    </div>
  );
}
