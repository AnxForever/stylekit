"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n/context";
import type { CustomStyleDefinition } from "@/lib/style-creator/types";

interface PreviewPanelProps {
  definition: CustomStyleDefinition;
}

export function PreviewPanel({ definition }: PreviewPanelProps) {
  const { t } = useI18n();
  const { colors, typography, borders } = definition;

  // Generate inline styles
  const styles = useMemo(
    () => ({
      container: {
        backgroundColor: colors.background,
        color: colors.foreground,
        fontFamily: typography.bodyFont,
        padding: "2rem",
        borderRadius: borders.radius,
      },
      heading: {
        fontFamily: typography.headingFont,
        color: colors.foreground,
        marginBottom: "0.5rem",
      },
      text: {
        color: colors.muted,
        marginBottom: "1.5rem",
      },
      button: {
        backgroundColor: colors.primary,
        color: colors.background,
        padding: "0.75rem 1.5rem",
        borderRadius: borders.radius,
        border: "none",
        fontWeight: 500,
        cursor: "pointer",
      },
      buttonOutline: {
        backgroundColor: "transparent",
        color: colors.primary,
        padding: "0.75rem 1.5rem",
        borderRadius: borders.radius,
        border: `${borders.width} solid ${colors.primary}`,
        fontWeight: 500,
        cursor: "pointer",
      },
      card: {
        backgroundColor: colors.secondary,
        padding: "1.5rem",
        borderRadius: borders.radius,
        border: `${borders.width} solid ${colors.muted}`,
        marginTop: "1.5rem",
      },
      badge: {
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        borderRadius: borders.radius,
        fontSize: "0.75rem",
        fontWeight: 500,
      },
    }),
    [colors, typography, borders]
  );

  return (
    <div>
      <p className="text-xs tracking-widest uppercase text-muted mb-4">
        {t("styleCreator.preview")}
      </p>

      <div className="border border-border overflow-hidden">
        {/* Preview content */}
        <div style={styles.container}>
          {/* Title */}
          <h2 style={{ ...styles.heading, fontSize: typography.fontSize["2xl"] }}>
            Preview Title
          </h2>
          <p style={styles.text}>
            This is how your text will look with the selected colors and fonts.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem" }}>
            <button style={styles.button}>Primary Button</button>
            <button style={styles.buttonOutline}>Outline Button</button>
          </div>

          {/* Color swatches */}
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: colors.primary,
                borderRadius: borders.radius,
              }}
            />
            <div
              style={{
                width: "2rem",
                height: "2rem",
                backgroundColor: colors.secondary,
                borderRadius: borders.radius,
                border: `1px solid ${colors.muted}`,
              }}
            />
            {colors.accent.map((color, i) => (
              <div
                key={i}
                style={{
                  width: "2rem",
                  height: "2rem",
                  backgroundColor: color,
                  borderRadius: borders.radius,
                }}
              />
            ))}
          </div>

          {/* Card */}
          <div style={styles.card}>
            <h3 style={{ ...styles.heading, fontSize: typography.fontSize.lg }}>
              Card Component
            </h3>
            <p style={{ ...styles.text, marginBottom: "1rem" }}>
              Cards use the secondary background color.
            </p>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: colors.accent[0],
                  color: colors.background,
                }}
              >
                Tag 1
              </span>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor: colors.accent[1],
                  color: colors.background,
                }}
              >
                Tag 2
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
