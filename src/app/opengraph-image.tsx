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
        backgroundColor: "#0f2438",
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
          color: "#ffffff",
          letterSpacing: "0.06em",
        }}
      >
        ALOPAK
      </div>
      <div
        style={{
          marginTop: 28,
          fontSize: 36,
          fontWeight: 400,
          color: "rgba(255,255,255,0.85)",
          lineHeight: 1.35,
          maxWidth: 900,
        }}
      >
        Puszki aluminiowe i folie — opakowania dla profesjonalnych zastosowań B2B
      </div>
    </div>
  ),
    { ...size },
  );
}
