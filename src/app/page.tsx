import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { CtaBand } from "@/components/sections/CtaBand";
import { FaqSection } from "@/components/sections/FaqSection";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { Hero } from "@/components/sections/Hero";
import { IndustriesTeaser } from "@/components/sections/IndustriesTeaser";
import { OfferSplit } from "@/components/sections/OfferSplit";
import { ProcessSteps } from "@/components/sections/ProcessSteps";
import { WhyAlopak } from "@/components/sections/WhyAlopak";
import { homeFaq } from "@/data/site";
import { createMetadata } from "@/lib/seo/metadata";

export const metadata = createMetadata({
  title: "ALOPAK — Opakowania i folie dla profesjonalnych zastosowań",
  description:
    "ALOPAK: puszki aluminiowe, folia spożywcza i folia fryzjerska dla odbiorców B2B. Wyślij zapytanie ofertowe.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <OfferSplit />
      <FeaturedProducts />
      <WhyAlopak />
      <AboutTeaser />
      <IndustriesTeaser />
      <ProcessSteps />
      <CtaBand />
      <BlogTeaser />
      <FaqSection items={homeFaq} />
    </>
  );
}
