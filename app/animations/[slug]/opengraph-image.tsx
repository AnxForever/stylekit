import { ImageResponse } from "next/og";
import { animations, getAnimationBySlug } from "@/lib/animations";

export const alt = "StyleKit Animation";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "space-between",
        }}
      >
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
              display: "flex",
              padding: "6px 16px",
              borderRadius: 6,
              backgroundColor: "rgba(168,85,247,0.15)",
              border: "1px solid rgba(168,85,247,0.3)",
              fontSize: 16,
              color: "#a855f7",
              marginBottom: 24,
              alignSelf: "flex-start",
            }}
          >
            CSS Animation
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
              maxWidth: 800,
            }}
          >
            {description}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 12 }}>
            {["#a855f7", "#6366f1", "#00d4ff"].map((color, i) => (
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
          <div
            style={{
              display: "flex",
              fontSize: 20,
              color: "rgba(255,255,255,0.3)",
            }}
          >
            stylekit.top
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
