import { ImageResponse } from "next/og";
import { promptTopics, getTopicBySlug } from "@/lib/prompts";

export const alt = "StyleKit UI Prompts";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return promptTopics.map((t) => ({ topic: t.slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic: slug } = await params;
  const topic = getTopicBySlug(slug);
  const title = topic?.titleEn ?? slug;
  const description = topic?.descriptionEn ?? "AI-Friendly UI Design Prompts";

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
              backgroundColor: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              fontSize: 16,
              color: "#6366f1",
              marginBottom: 24,
              alignSelf: "flex-start",
            }}
          >
            UI Prompts
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {title}
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
            {["#6366f1", "#00d4ff", "#ffbe0b"].map((color, i) => (
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
