import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsLoader } from "@/components/seo/AnalyticsLoader";
import { siteConfig } from "@/data/site";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import { absoluteUrl } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(absoluteUrl("/")),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${manrope.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteShell>{children}</SiteShell>
        <AnalyticsLoader />
      </body>
    </html>
  );
}
