import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { homeFaq } from "@/data/site";
import { createMetadata } from "@/lib/seo/metadata";

/** Ensure homepage rebuilds with content (Z1: avoid stale edge cache of old copy). */
export const revalidate = 60;

export const metadata = createMetadata({
  title: "ALOPAK - puszki aluminiowe i folie, producent z Ostrzeszowa",
  description:
    "Producent puszek aluminiowych, folii spożywczej i folii fryzjerskiej z Ostrzeszowa. Działamy od 1997 roku. Opisz potrzeby - przygotujemy ofertę.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <FeaturedProducts />
      <ProcessSteps />
      <CtaBand />
      <BlogTeaser />
      <FaqSection items={homeFaq} />
    </>
  );
}
