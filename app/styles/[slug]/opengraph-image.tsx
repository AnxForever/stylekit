import { ImageResponse } from "next/og";
import { getStyleBySlug, styles } from "@/lib/styles";

export const runtime = "edge";
export const alt = "StyleKit style preview";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return styles.map((style) => ({ slug: style.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const style = getStyleBySlug(slug);

  if (!style) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            color: "#fff",
            fontSize: 48,
            fontWeight: 700,
          }}
        >
          Style Not Found
        </div>
      ),
      { ...size }
    );
  }

  const primary = style.colors?.primary || "#000000";
  const secondary = style.colors?.secondary || "#ffffff";
  const accents = style.colors?.accent || [];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          backgroundColor: "#0a0a0a",
          padding: 60,
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top bar with color swatches */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: primary,
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 8,
              backgroundColor: secondary,
              border: "2px solid rgba(255,255,255,0.2)",
            }}
          />
          {accents.slice(0, 3).map((color, i) => (
            <div
              key={i}
              style={{
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: color,
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Style name */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 12,
            }}
          >
            {style.nameEn}
          </div>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "rgba(255,255,255,0.6)",
              marginBottom: 24,
            }}
          >
            {style.name}
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(255,255,255,0.4)",
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {style.description.slice(0, 120)}
            {style.description.length > 120 ? "..." : ""}
          </div>
        </div>

        {/* Footer branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              }}
            />
            <span style={{ fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
              StyleKit
            </span>
          </div>
          <span style={{ fontSize: 20, color: "rgba(255,255,255,0.3)" }}>
            stylekit.top
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
