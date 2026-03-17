import { ImageResponse } from "next/og";
import { styles } from "@/lib/styles";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { OG_SIZE, containerStyle, titleStyle, subtitleStyle } from "@/lib/og/shared";

export const alt = "StyleKit style preview";
export const size = OG_SIZE;
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
  const resolved = await resolveStyleBySlug(slug);
  const style = resolved?.style;

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

  const primary = style.colors?.primary || "#6366f1";
  const secondary = style.colors?.secondary || "#a855f7";
  const accents = style.colors?.accent || [];
  const allColors = [primary, secondary, ...accents.slice(0, 3)];
  const asciiKeywords = style.keywords
    ?.filter((keyword) => /^[\x20-\x7E]+$/.test(keyword))
    .slice(0, 4) || [];
  const subtitle =
    asciiKeywords.length > 0
      ? `Design style with ${asciiKeywords.join(", ")}`
      : `${style.nameEn} design style in the StyleKit catalog`;

  return new ImageResponse(
    (
      <div style={containerStyle()}>
        {/* Color swatches row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          {allColors.map((color, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                width: 48,
                height: 48,
                borderRadius: 8,
                backgroundColor: color,
                border: "2px solid rgba(255,255,255,0.15)",
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
          <div style={titleStyle(72)}>{style.nameEn}</div>
          <div style={subtitleStyle()}>{subtitle}</div>
        </div>

        {/* Footer branding */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                display: "flex",
                width: 40,
                height: 40,
                borderRadius: 8,
                background: `linear-gradient(135deg, ${primary}, ${secondary})`,
              }}
            />
            <div style={{ display: "flex", fontSize: 28, fontWeight: 700, color: "#ffffff" }}>
              StyleKit
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 20, color: "rgba(255,255,255,0.3)" }}>
            stylekit.top
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
