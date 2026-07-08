import { ImageResponse } from "next/og";

export const alt = "StyleKit - AI-Friendly Design System";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
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
        }}
      >
        {/* Color swatches row */}
        <div style={{ display: "flex", gap: 12, marginBottom: 40 }}>
          {["#ff006e", "#00d4ff", "#ffbe0b", "#6366f1", "#a855f7"].map(
            (color, i) => (
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
            )
          )}
        </div>

        {/* Main title */}
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
              fontSize: 80,
              fontWeight: 800,
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            StyleKit
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 32,
              color: "rgba(255,255,255,0.5)",
              lineHeight: 1.4,
            }}
          >
            The most comprehensive style library for AI coding
          </div>
        </div>

        {/* Feature tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            {["130+ Styles", "One-line install", "MCP · CLI · registry", "EN · 中文"].map(
              (tag, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    padding: "8px 20px",
                    borderRadius: 8,
                    border: "2px solid rgba(255,255,255,0.2)",
                    fontSize: 18,
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {tag}
                </div>
              )
            )}
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
