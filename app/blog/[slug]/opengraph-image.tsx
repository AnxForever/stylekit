import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import {
  OG_SIZE,
  containerStyle,
  badgeStyle,
  titleStyle,
  subtitleStyle,
} from "@/lib/og/shared";

export const alt = "StyleKit Blog";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const title = post?.title ?? slug;
  const date = post?.date ?? "";
  const author = post?.author ?? "StyleKit Team";
  const tags = post?.tags?.slice(0, 3) ?? [];

  const accent = "#00d4ff";

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
          <div style={badgeStyle(accent)}>Blog</div>
          <div style={titleStyle(56)}>{title}</div>
          <div
            style={{
              display: "flex",
              gap: 24,
              marginTop: 8,
            }}
          >
            {date && (
              <div style={subtitleStyle()}>{date}</div>
            )}
            <div style={{ ...subtitleStyle(), color: "rgba(255,255,255,0.4)" }}>
              {author}
            </div>
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
            {tags.map((tag, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  padding: "4px 14px",
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  fontSize: 16,
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {tag}
              </div>
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
