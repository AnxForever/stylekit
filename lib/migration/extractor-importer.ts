// Importer for style-extractor JSON output
// Converts extracted design tokens into StyleKit StyleTokens format

import type { MigrationResult } from "./types";
import type { StyleTokens } from "@/lib/styles/tokens";
import {
  safeJsonParse,
  colorToBgClass,
  colorToTextClass,
  pxToRadiusClass,
  shadowToClass,
  pxToSpacingClass,
  fontSizeToTextClass,
} from "./utils";

// Shape of style-extractor's normalized output (tokens.json)
interface ExtractorOutput {
  id?: string;
  name?: string;
  tokens?: {
    colors?: {
      semantic?: Record<string, string>;
      palette?: Record<string, { hex?: string; usage?: string[] }>;
    };
    typography?: {
      fontFamily?: Record<string, string>;
      fontSize?: Record<string, string>;
      fontWeight?: Record<string, string>;
    };
    spacing?: Record<string, number | string>;
    motion?: {
      duration?: Record<string, string>;
      easing?: Record<string, string>;
    };
  };
  components?: Record<
    string,
    Array<{
      styles?: Record<string, string>;
      states?: Record<string, Record<string, string>>;
    }>
  >;
}

export function importExtractorTheme(json: string): MigrationResult {
  const data = safeJsonParse<ExtractorOutput>(json);
  if (!data) {
    return {
      success: false,
      tokens: {},
      warnings: ["Failed to parse style-extractor JSON output."],
      unmapped: [],
      coverage: 0,
    };
  }

  const warnings: string[] = [];
  const unmapped: string[] = [];
  let mapped = 0;
  let total = 0;

  const tokens: Partial<StyleTokens> = {};

  // -- Colors --
  const semantic = data.tokens?.colors?.semantic;
  if (semantic) {
    const bg = semantic.background;
    const bgAlt = semantic.surfaceAlt || semantic.surface;
    const text = semantic.text;
    const textMuted = semantic.textMuted;
    const primary = semantic.primary;
    const secondary = semantic.secondary;
    const accent = semantic.accent;

    tokens.colors = {
      background: {
        primary: bg ? colorToBgClass(bg) : "bg-white",
        secondary: bgAlt ? colorToBgClass(bgAlt) : "bg-gray-50",
        accent: [primary, accent, secondary]
          .filter((c): c is string => !!c)
          .map((c) => colorToBgClass(c))
          .slice(0, 4),
      },
      text: {
        primary: text ? colorToTextClass(text) : "text-gray-900",
        secondary: textMuted ? colorToTextClass(textMuted) : "text-gray-600",
        muted: "text-gray-400",
      },
      button: {
        primary: primary
          ? `${colorToBgClass(primary)} text-white`
          : "bg-blue-500 text-white",
        secondary: secondary
          ? `${colorToBgClass(secondary)} text-white`
          : "bg-gray-200 text-gray-800",
      },
    };

    if (!tokens.colors.background.accent.length) {
      tokens.colors.background.accent = ["bg-blue-500"];
    }

    const colorFields = [bg, bgAlt, text, textMuted, primary, secondary, accent];
    total += colorFields.length;
    mapped += colorFields.filter(Boolean).length;

    // Track unmapped semantic roles
    const knownRoles = new Set([
      "background",
      "surface",
      "surfaceAlt",
      "text",
      "textMuted",
      "textInverse",
      "primary",
      "secondary",
      "accent",
      "border",
      "borderMuted",
    ]);
    for (const key of Object.keys(semantic)) {
      if (!knownRoles.has(key)) {
        unmapped.push(`colors.semantic.${key}`);
        total += 1;
      }
    }
  }

  // -- Typography --
  const typo = data.tokens?.typography;
  if (typo) {
    const primaryFont = typo.fontFamily?.primary;
    const secondaryFont = typo.fontFamily?.secondary;
    const monoFont = typo.fontFamily?.mono;
    const sizes = typo.fontSize || {};
    const sortedSizes = Object.entries(sizes)
      .map(([, v]) => v)
      .filter(Boolean)
      .sort((a, b) => parseFloat(b) - parseFloat(a));

    tokens.typography = {
      heading: primaryFont
        ? `font-[${primaryFont.split(",")[0].replace(/['"]/g, "").trim()}] font-bold tracking-tight`
        : "font-bold tracking-tight",
      body: secondaryFont ? "font-sans" : "font-sans",
      mono: monoFont
        ? `font-[${monoFont.split(",")[0].replace(/['"]/g, "").trim()}]`
        : "font-mono",
      sizes: {
        hero: sortedSizes[0]
          ? `${fontSizeToTextClass(sortedSizes[0])} md:${fontSizeToTextClass(sortedSizes[0])}`
          : "text-4xl md:text-6xl lg:text-8xl",
        h1: sortedSizes[1]
          ? fontSizeToTextClass(sortedSizes[1])
          : "text-3xl md:text-5xl",
        h2: sortedSizes[2]
          ? fontSizeToTextClass(sortedSizes[2])
          : "text-2xl md:text-4xl",
        h3: sortedSizes[3]
          ? fontSizeToTextClass(sortedSizes[3])
          : "text-xl md:text-2xl",
        body: sortedSizes[4]
          ? fontSizeToTextClass(sortedSizes[4])
          : "text-sm md:text-base",
        small: sortedSizes[5]
          ? fontSizeToTextClass(sortedSizes[5])
          : "text-xs md:text-sm",
      },
    };

    const typoFields = [primaryFont, secondaryFont, monoFont];
    total += typoFields.length + Object.keys(sizes).length;
    mapped += typoFields.filter(Boolean).length + Object.keys(sizes).length;
  }

  // -- Border --
  const firstComponent = findFirstComponentWithStyles(data.components);
  if (firstComponent?.styles) {
    const s = firstComponent.styles;
    const bwPx = parseFloat(s.borderWidth || "0");
    const brPx = parseFloat(s.borderRadius || "0");

    tokens.border = {
      width: bwPx > 0 ? `border-${Math.round(bwPx)}` : "border",
      color: s.borderColor
        ? `border-[${s.borderColor}]`
        : "border-gray-200",
      radius: pxToRadiusClass(brPx),
      style: "border-solid",
    };
    total += 3;
    mapped += [s.borderWidth, s.borderRadius, s.borderColor].filter(Boolean).length;
  }

  // -- Shadow --
  if (firstComponent?.styles?.boxShadow) {
    const raw = firstComponent.styles.boxShadow;
    if (raw !== "none") {
      tokens.shadow = {
        sm: "shadow-sm",
        md: shadowToClass(raw),
        lg: "shadow-lg",
        none: "shadow-none",
        hover: "hover:shadow-lg",
        focus: "focus:shadow-md",
      };
      total += 1;
      mapped += 1;
    }
  }

  // -- Interaction --
  if (firstComponent?.styles?.transitionDuration) {
    const dur = firstComponent.styles.transitionDuration;
    const ms = parseFloat(dur) * (dur.includes("ms") ? 1 : 1000);
    const durClass = ms <= 150 ? "150" : ms <= 200 ? "200" : ms <= 300 ? "300" : "500";
    tokens.interaction = {
      transition: `transition-all duration-${durClass}`,
      active: "active:scale-95",
    };
    total += 1;
    mapped += 1;
  }

  // -- Spacing --
  const spacing = data.tokens?.spacing;
  if (spacing) {
    const values = Object.entries(spacing)
      .map(([k, v]) => ({ key: k, px: typeof v === "number" ? v : parseFloat(String(v)) }))
      .filter((e) => !Number.isNaN(e.px))
      .sort((a, b) => b.px - a.px);

    tokens.spacing = {
      section:
        values[0]
          ? `${pxToSpacingClass(values[0].px, "py")} md:${pxToSpacingClass(values[0].px * 1.5, "py")}`
          : "py-12 md:py-20 lg:py-28",
      container: "px-4 md:px-8 lg:px-12",
      card:
        values[2]
          ? `${pxToSpacingClass(values[2].px, "p")} md:${pxToSpacingClass(values[2].px * 1.3, "p")}`
          : "p-5 md:p-8",
      gap: {
        sm: "gap-3 md:gap-4",
        md: "gap-4 md:gap-6",
        lg: "gap-6 md:gap-10",
      },
    };
    total += values.length;
    mapped += values.length;
  }

  // -- Required component classes --
  tokens.required = { button: [], card: [], input: [] };
  for (const type of ["button", "card", "input"] as const) {
    const items = data.components?.[type];
    if (items?.length && items[0].styles) {
      const s = items[0].styles;
      const classes: string[] = [];

      // Border
      if (s.borderRadius) classes.push(pxToRadiusClass(parseFloat(s.borderRadius)));
      if (s.borderWidth && parseFloat(s.borderWidth) > 0) {
        classes.push(`border-${Math.round(parseFloat(s.borderWidth))}`);
        if (s.borderColor) classes.push(`border-[${s.borderColor}]`);
      }
      // Background
      if (s.backgroundColor && s.backgroundColor !== "rgba(0, 0, 0, 0)") {
        classes.push(colorToBgClass(s.backgroundColor));
      }
      // Font
      if (s.fontWeight && parseInt(s.fontWeight) >= 600) classes.push("font-bold");
      // Transition
      if (s.transitionDuration && s.transitionDuration !== "0s") {
        classes.push("transition-all");
      }

      tokens.required[type] = classes;
    }
  }

  // -- Forbidden (empty by default for extracted styles) --
  tokens.forbidden = { classes: [], patterns: [], reasons: {} };

  // -- Coverage --
  const coverage = total > 0 ? Math.round((mapped / total) * 100) : 0;

  return {
    success: mapped > 0,
    tokens,
    warnings,
    unmapped,
    coverage,
  };
}

function findFirstComponentWithStyles(
  components?: ExtractorOutput["components"]
): { styles?: Record<string, string>; states?: Record<string, Record<string, string>> } | null {
  if (!components) return null;
  for (const items of Object.values(components)) {
    if (items?.length && items[0].styles) return items[0];
  }
  return null;
}
