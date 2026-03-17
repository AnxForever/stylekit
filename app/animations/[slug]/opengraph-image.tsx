import { ImageResponse } from "next/og";
import { animations, getAnimationBySlug } from "@/lib/animations";
import {
  OG_SIZE,
  containerStyle,
  badgeStyle,
  titleStyle,
  subtitleStyle,
  getAnimationAccent,
} from "@/lib/og/shared";

export const alt = "StyleKit Animation";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return animations.map((a) => ({ slug: a.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const animation = getAnimationBySlug(slug);
  const name = animation?.nameEn ?? slug;
  const description = animation?.descriptionEn ?? "CSS Animation Pattern";
  const category = animation?.category ?? "entrance";
  const accent = getAnimationAccent(category);

  return new ImageResponse(
    (
      <div style={containerStyle()}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
          }}
        >
          <div style={badgeStyle(accent)}>
            {category.charAt(0).toUpperCase() + category.slice(1)} Animation
          </div>
          <div style={titleStyle()}>{name}</div>
          <div style={subtitleStyle()}>{description}</div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {[accent, "#6366f1", "#00d4ff"].map((color, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  backgroundColor: color,
                }}
              />
            ))}
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
