import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MainContent } from "@/components/layout/MainContent";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { CookieBanner } from "@/components/seo/CookieBanner";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-white"
      >
        Przejdź do treści
      </a>
      <ScrollProgress />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
      <CookieBanner />
    </>
  );
}
