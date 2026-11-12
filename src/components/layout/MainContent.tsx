"use client";

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <main
      id="main-content"
      className={cn("flex-1", !isHome && "pt-[4.25rem] lg:pt-[4.75rem]")}
      tabIndex={-1}
    >
      {children}
    </main>
  );
}
