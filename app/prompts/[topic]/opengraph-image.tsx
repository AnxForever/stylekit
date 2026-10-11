import { ImageResponse } from "next/og";
import { promptTopics, getTopicBySlug } from "@/lib/prompts";
import {
  OG_SIZE,
  badgeStyle,
  brandLogoStyle,
  containerStyle,
  fitTitleFontSize,
  getOgBrandLogoDataUri,
  subtitleStyle,
  titleStyle,
} from "@/lib/og/shared";

export const alt = "StyleKit UI Prompts";
export const size = OG_SIZE;
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
  const brandLogo = await getOgBrandLogoDataUri();

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
          <div style={badgeStyle("#6366f1")}>UI Prompts</div>
          <div style={titleStyle(fitTitleFontSize(title, 56))}>{title}</div>
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
          <img
            src={brandLogo}
            width={168}
            height={56}
            alt="StyleKit"
            style={brandLogoStyle()}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
