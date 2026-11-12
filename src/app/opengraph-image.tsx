import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";

export const alt = `${siteConfig.name} — opakowania aluminiowe dla firm`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#0B1F4B",
          padding: 80,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#24186C",
            color: "#ffffff",
            fontSize: 42,
            fontWeight: 800,
            letterSpacing: "0.14em",
            padding: "16px 28px",
          }}
        >
          ALOPAK
        </div>
        <div
          style={{
            marginTop: 36,
            fontSize: 52,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 920,
            textTransform: "uppercase",
          }}
        >
          Puszki aluminiowe i folie dla firm
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 28,
            fontWeight: 400,
            color: "rgba(255,255,255,0.78)",
            lineHeight: 1.35,
            maxWidth: 820,
          }}
        >
          Producent opakowań aluminiowych · Ostrzeszów · od 1997
        </div>
      </div>
    ),
    { ...size },
  );
}
