import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * Shared OG image utilities
 *
 * Common styles, colors, layout helpers, and branding for
 * all per-page Open Graph images across the site.
 */

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_BG = "#0a0a0a";
const OG_HORIZONTAL_PADDING = 60;
const OG_TITLE_LINE_BUDGET = 3;
const OG_TITLE_MIN_FONT_SIZE = 32;

let brandLogoDataUriPromise: Promise<string> | undefined;

/** Load the approved local wordmark once and embed it without a network fetch. */
export function getOgBrandLogoDataUri(): Promise<string> {
  if (!brandLogoDataUriPromise) {
    const logoPath = join(
      process.cwd(),
      "public",
      "brand",
      "stylekit-horizontal-white.svg",
    );
    brandLogoDataUriPromise = readFile(logoPath, "utf8").then(
      (svg) => "data:image/svg+xml;base64," + Buffer.from(svg).toString("base64"),
    );
  }

  return brandLogoDataUriPromise;
}

/** Fixed dimensions keep the horizontal mark crisp and predictable in Satori. */
export function brandLogoStyle(): React.CSSProperties {
  return {
    display: "flex",
    width: 168,
    height: 56,
    flexShrink: 0,
    objectFit: "contain",
  };
}

/** Estimate a safe title size for a three-line social-card title block. */
export function fitTitleFontSize(title: string, preferredSize = 64): number {
  const estimatedWidth = Array.from(title.trim()).reduce((width, character) => {
    if (/\s/u.test(character)) return width + 0.32;
    if (/[\u2e80-\u9fff\uf900-\ufaff]/u.test(character)) return width + 1;
    if (/[MW@#%&]/u.test(character)) return width + 0.82;
    return width + 0.56;
  }, 0);

  if (estimatedWidth === 0) return preferredSize;

  const availableWidth = OG_SIZE.width - OG_HORIZONTAL_PADDING * 2;
  const sizeForThreeLines = Math.floor(
    (availableWidth * OG_TITLE_LINE_BUDGET) / estimatedWidth,
  );

  return Math.max(
    OG_TITLE_MIN_FONT_SIZE,
    Math.min(preferredSize, sizeForThreeLines),
  );
}

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
    width: "100%",
    maxWidth: OG_SIZE.width - OG_HORIZONTAL_PADDING * 2,
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

/** Footer row color dot styles */
export function footerColors(colors: string[]): React.CSSProperties[] {
  return colors.map((c) => ({
    display: "flex" as const,
    width: 32,
    height: 32,
    borderRadius: 6,
    backgroundColor: c,
  }));
}
