import type { MigrationResult, ChakraTheme } from "./types";
import type { StyleTokens } from "@/lib/styles/tokens";
import {
  safeJsonParse,
  pxToRadiusClass,
  fontSizeToTextClass,
  colorToBgClass,
  colorToTextClass,
  shadowToClass,
} from "./utils";

function resolveChakraColor(
  colors: Record<string, string | Record<string, string>> | undefined,
  path: string
): string | undefined {
  if (!colors) return undefined;
  const [group, shade] = path.split(".");
  const entry = colors[group];
  if (!entry) return undefined;
  if (typeof entry === "string") return entry;
  if (shade && typeof entry === "object") return entry[shade];
  return undefined;
}

export function importChakraTheme(themeJson: string): MigrationResult {
  const theme = safeJsonParse<ChakraTheme>(themeJson);
  if (!theme) {
    return {
      success: false,
      tokens: {},
      warnings: ["Failed to parse JSON input."],
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
  if (theme.colors) {
    const primary =
      resolveChakraColor(theme.colors, "brand.500") ??
      resolveChakraColor(theme.colors, "primary.500");
    const bgColor = resolveChakraColor(theme.colors, "gray.50");
    const fgColor = resolveChakraColor(theme.colors, "gray.900");
    const secondary = resolveChakraColor(theme.colors, "gray.100");
    const accent =
      resolveChakraColor(theme.colors, "brand.300") ??
      resolveChakraColor(theme.colors, "primary.300");

    const colorFields = [primary, bgColor, fgColor, secondary, accent];
    total += colorFields.length;
    mapped += colorFields.filter(Boolean).length;

    tokens.colors = {
      background: {
        primary: bgColor ? colorToBgClass(bgColor) : "bg-white",
        secondary: secondary ? colorToBgClass(secondary) : "bg-gray-50",
        accent: primary ? [colorToBgClass(primary)] : ["bg-blue-500"],
      },
      text: {
        primary: fgColor ? colorToTextClass(fgColor) : "text-gray-900",
        secondary: "text-gray-600",
        muted: "text-gray-400",
      },
      button: {
        primary: primary
          ? `${colorToBgClass(primary)} text-white`
          : "bg-blue-500 text-white",
        secondary: "bg-gray-200 text-gray-800",
      },
    };

    // Count unmapped color scales
    const knownGroups = new Set(["brand", "primary", "gray"]);
    for (const key of Object.keys(theme.colors)) {
      if (!knownGroups.has(key)) {
        total += 1;
        unmapped.push(`colors.${key}`);
      }
    }
  }

  // -- Typography --
  const bodyFont = theme.fonts?.body;
  const headingFont = theme.fonts?.heading;
  const monoFont = theme.fonts?.mono;
  const bodyFontSize = theme.fontSizes?.md;
  const h1Size = theme.fontSizes?.["4xl"] ?? theme.fontSizes?.["3xl"];
  const h2Size = theme.fontSizes?.["2xl"] ?? theme.fontSizes?.xl;

  const fontFields = [bodyFont, headingFont, bodyFontSize, h1Size, h2Size];
  total += fontFields.length;
  mapped += fontFields.filter(Boolean).length;

  if (monoFont) { total += 1; mapped += 1; }

  if (bodyFont || headingFont || bodyFontSize) {
    const formatFont = (f: string) =>
      `font-['${f.split(",")[0].trim().replace(/'/g, "")}']`;

    tokens.typography = {
      heading: headingFont
        ? `${formatFont(headingFont)} font-bold tracking-tight`
        : "font-bold tracking-tight",
      body: bodyFont ? formatFont(bodyFont) : "font-sans",
      mono: monoFont ? formatFont(monoFont) : "font-mono",
      sizes: {
        hero: h1Size
          ? `${fontSizeToTextClass(h1Size)} md:text-6xl lg:text-8xl`
          : "text-4xl md:text-6xl lg:text-8xl",
        h1: h1Size
          ? `${fontSizeToTextClass(h1Size)} md:text-5xl`
          : "text-3xl md:text-5xl",
        h2: h2Size
          ? `${fontSizeToTextClass(h2Size)} md:text-4xl`
          : "text-2xl md:text-4xl",
        h3: "text-xl md:text-2xl",
        body: bodyFontSize
          ? `${fontSizeToTextClass(bodyFontSize)} md:text-base`
          : "text-sm md:text-base",
        small: "text-xs md:text-sm",
      },
    };
  }

  // Unmapped font sizes
  if (theme.fontSizes) {
    const usedKeys = new Set(["md", "4xl", "3xl", "2xl", "xl"]);
    for (const key of Object.keys(theme.fontSizes)) {
      if (!usedKeys.has(key)) {
        total += 1;
        unmapped.push(`fontSizes.${key}`);
      }
    }
  }

  // -- Border Radius --
  const radiusMd = theme.radii?.md;
  if (radiusMd) {
    total += 1;
    mapped += 1;
    const px = parseFloat(radiusMd);
    tokens.border = {
      width: "border",
      color: "border-gray-200",
      radius: Number.isNaN(px) ? "rounded-lg" : pxToRadiusClass(px),
      style: "border-solid",
    };
  }

  // Unmapped radii
  if (theme.radii) {
    const usedKeys = new Set(["md"]);
    for (const key of Object.keys(theme.radii)) {
      if (!usedKeys.has(key)) {
        total += 1;
        unmapped.push(`radii.${key}`);
      }
    }
  }

  // -- Spacing --
  const space4 = theme.space?.["4"];
  if (space4) {
    total += 1;
    mapped += 1;
    // space.4 is typically 1rem = 16px
    const basePx = parseFloat(space4) * (space4.endsWith("rem") ? 16 : 1);
    const base = Number.isNaN(basePx) ? 16 : basePx;

    tokens.spacing = {
      section: `py-12 md:py-20 lg:py-28`,
      container: `px-4 md:px-8 lg:px-12`,
      card: `p-5 md:p-8`,
      gap: {
        sm: `gap-3 md:gap-4`,
        md: `gap-4 md:gap-6`,
        lg: `gap-6 md:gap-10`,
      },
    };

    // Only override if the base is significantly different from 16px
    if (Math.abs(base - 16) > 4) {
      warnings.push(
        `space.4 = ${space4} differs from the typical 1rem. Spacing tokens use approximate defaults.`
      );
    }
  }

  // Unmapped space keys
  if (theme.space) {
    const usedKeys = new Set(["4"]);
    for (const key of Object.keys(theme.space)) {
      if (!usedKeys.has(key)) {
        total += 1;
        unmapped.push(`space.${key}`);
      }
    }
  }

  // -- Shadow --
  const shadowMd = theme.shadows?.md;
  if (shadowMd) {
    total += 1;
    mapped += 1;
    const shadowSm = theme.shadows?.sm;
    const shadowLg = theme.shadows?.lg;

    tokens.shadow = {
      sm: shadowSm ? shadowToClass(shadowSm) : "shadow-sm",
      md: shadowToClass(shadowMd),
      lg: shadowLg ? shadowToClass(shadowLg) : "shadow-lg",
      none: "shadow-none",
      hover: shadowLg ? `hover:${shadowToClass(shadowLg)}` : "hover:shadow-lg",
      focus: `focus:${shadowToClass(shadowMd)}`,
    };

    if (shadowSm) { total += 1; mapped += 1; }
    if (shadowLg) { total += 1; mapped += 1; }
  }

  // Unmapped shadow keys
  if (theme.shadows) {
    const usedKeys = new Set(["sm", "md", "lg"]);
    for (const key of Object.keys(theme.shadows)) {
      if (!usedKeys.has(key)) {
        total += 1;
        unmapped.push(`shadows.${key}`);
      }
    }
  }

  // -- Line heights (unmapped) --
  if (theme.lineHeights) {
    for (const key of Object.keys(theme.lineHeights)) {
      total += 1;
      unmapped.push(`lineHeights.${key}`);
    }
    if (Object.keys(theme.lineHeights).length > 0) {
      warnings.push("lineHeights are noted but not directly mapped to StyleKit tokens.");
    }
  }

  const coverage = total > 0 ? Math.round((mapped / total) * 100) : 0;

  return {
    success: mapped > 0,
    tokens,
    warnings,
    unmapped,
    coverage,
  };
}
