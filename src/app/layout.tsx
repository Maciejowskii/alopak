import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import { SiteShell } from "@/components/layout/SiteShell";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnalyticsLoader } from "@/components/seo/AnalyticsLoader";
import { siteConfig } from "@/data/site";
import { SITE_URL } from "@/lib/site";
import { organizationSchema, websiteSchema } from "@/lib/seo/schema";
import "./globals.css";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
    <html lang="pl" className={`${barlow.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <JsonLd data={[organizationSchema(), websiteSchema()]} />
        <SiteShell>{children}</SiteShell>
        <AnalyticsLoader />
      </body>
    </html>
  );
}
