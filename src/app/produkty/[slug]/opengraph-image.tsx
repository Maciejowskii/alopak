import { ImageResponse } from "next/og";
import { getAllProductSlugs, getProductBySlug } from "@/lib/products/repository";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — produkt`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export default async function ProductOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  const title = product?.name ?? "Produkt ALOPAK";
  const catalog = product?.catalogNumber
    ? `Nr kat. ${product.catalogNumber}`
    : "Oferta B2B";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0f2438",
          padding: 72,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          ALOPAK
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              maxWidth: 980,
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.78)",
            }}
          >
            {catalog}
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
