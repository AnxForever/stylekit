/**
 * Shared OG image utilities
 *
 * Common styles, colors, layout helpers, and branding for
 * all per-page Open Graph images across the site.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_BG = "#0a0a0a";

/** Category-to-accent color mapping for animations */
const ANIMATION_CATEGORY_COLORS: Record<string, string> = {
  entrance: "#6366f1",
  exit: "#ef4444",
  hover: "#f59e0b",
  scroll: "#10b981",
  text: "#ec4899",
  loading: "#8b5cf6",
  background: "#06b6d4",
  transition: "#14b8a6",
  "micro-interaction": "#f97316",
};

export function getAnimationAccent(category: string): string {
  return ANIMATION_CATEGORY_COLORS[category] ?? "#a855f7";
}

/** Shared container style for all OG images */
export function containerStyle(): React.CSSProperties {
  return {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
    backgroundColor: OG_BG,
    padding: 60,
    justifyContent: "space-between",
  };
}

/** Category / type badge */
export function badgeStyle(color: string): React.CSSProperties {
  return {
    display: "flex",
    padding: "6px 16px",
    borderRadius: 6,
    backgroundColor: `${color}26`,
    border: `1px solid ${color}4d`,
    fontSize: 16,
    color,
    marginBottom: 24,
    alignSelf: "flex-start" as const,
  };
}

/** Large title text */
export function titleStyle(fontSize = 64): React.CSSProperties {
  return {
    display: "flex",
    fontSize,
    fontWeight: 800,
    color: "#ffffff",
    lineHeight: 1.1,
    marginBottom: 16,
  };
}

/** Subtitle / description text */
export function subtitleStyle(): React.CSSProperties {
  return {
    display: "flex",
    fontSize: 24,
    color: "rgba(255,255,255,0.5)",
    lineHeight: 1.4,
    maxWidth: 800,
  };
}

/** Footer row with color dots + "stylekit.top" branding */
export function footerColors(colors: string[]): React.CSSProperties[] {
  return colors.map((c) => ({
    display: "flex" as const,
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: c,
  }));
}
