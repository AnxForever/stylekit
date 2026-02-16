import type { MigrationResult, AntTheme } from "./types";
import type { StyleTokens } from "@/lib/styles/tokens";
import {
  safeJsonParse,
  pxToRadiusClass,
  pxToTextClass,
  colorToBgClass,
  colorToTextClass,
  shadowToClass,
  pxToSpacingClass,
} from "./utils";

export function importAntTheme(themeJson: string): MigrationResult {
  const theme = safeJsonParse<AntTheme>(themeJson);
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
  const t = theme.token;

  if (!t) {
    return {
      success: false,
      tokens: {},
      warnings: ["No 'token' field found in the Ant Design theme configuration."],
      unmapped: [],
      coverage: 0,
    };
  }

  // -- Colors --
  const primaryColor = t.colorPrimary;
  const bgBase = t.colorBgBase;
  const textBase = t.colorTextBase;

  const colors: StyleTokens["colors"] = {
    background: {
      primary: bgBase ? colorToBgClass(bgBase) : "bg-white",
      secondary: "bg-gray-50",
      accent: primaryColor ? [colorToBgClass(primaryColor)] : ["bg-blue-500"],
    },
    text: {
      primary: textBase ? colorToTextClass(textBase) : "text-gray-900",
      secondary: "text-gray-600",
      muted: "text-gray-400",
    },
    button: {
      primary: primaryColor
        ? `${colorToBgClass(primaryColor)} text-white`
        : "bg-blue-500 text-white",
      secondary: "bg-gray-200 text-gray-800",
    },
  };
  tokens.colors = colors;

  const colorFields: Array<string | undefined> = [primaryColor, bgBase, textBase];
  total += colorFields.length;
  mapped += colorFields.filter(Boolean).length;

  // Status colors are tracked but unmapped
  for (const key of ["colorSuccess", "colorWarning", "colorError", "colorInfo"] as const) {
    if (t[key]) {
      total += 1;
      unmapped.push(`token.${key}`);
      warnings.push(`token.${key} has no direct StyleKit semantic mapping.`);
    }
  }

  // -- Typography --
  const fontFamily = t.fontFamily;
  const fontSize = t.fontSize;
  const lineHeight = t.lineHeight;

  if (fontFamily || fontSize) {
    const bodyFont = fontFamily
      ? `font-['${fontFamily.split(",")[0].trim().replace(/'/g, "")}']`
      : "font-sans";

    const bodySize = fontSize ? pxToTextClass(fontSize) : "text-sm md:text-base";

    tokens.typography = {
      heading: "font-bold tracking-tight",
      body: bodyFont,
      mono: "font-mono",
      sizes: {
        hero: "text-4xl md:text-6xl lg:text-8xl",
        h1: "text-3xl md:text-5xl",
        h2: "text-2xl md:text-4xl",
        h3: "text-xl md:text-2xl",
        body: bodySize.includes("md:") ? bodySize : `${bodySize} md:text-base`,
        small: "text-xs md:text-sm",
      },
    };
  }

  const typoFields = [fontFamily, fontSize, lineHeight];
  total += typoFields.length;
  mapped += typoFields.filter((v) => v !== undefined && v !== null).length;

  if (lineHeight !== undefined) {
    warnings.push("token.lineHeight is noted but not directly mapped to a Tailwind leading class.");
  }

  // -- Border Radius --
  if (t.borderRadius !== undefined) {
    total += 1;
    mapped += 1;
    tokens.border = {
      width: "border",
      color: "border-gray-200",
      radius: pxToRadiusClass(t.borderRadius),
      style: "border-solid",
    };
  }

  // -- Spacing --
  const padding = t.padding;
  const margin = t.margin;
  if (padding !== undefined || margin !== undefined) {
    const base = padding ?? margin ?? 16;
    total += (padding !== undefined ? 1 : 0) + (margin !== undefined ? 1 : 0);
    mapped += (padding !== undefined ? 1 : 0) + (margin !== undefined ? 1 : 0);

    tokens.spacing = {
      section: `${pxToSpacingClass(base * 3, "py")} md:${pxToSpacingClass(base * 5, "py")}`,
      container: `${pxToSpacingClass(base, "px")} md:${pxToSpacingClass(base * 2, "px")}`,
      card: `${pxToSpacingClass(base, "p")} md:${pxToSpacingClass(base * 1.5, "p")}`,
      gap: {
        sm: `${pxToSpacingClass(base * 0.5, "gap")} md:${pxToSpacingClass(base * 0.75, "gap")}`,
        md: `${pxToSpacingClass(base * 0.75, "gap")} md:${pxToSpacingClass(base, "gap")}`,
        lg: `${pxToSpacingClass(base * 1.5, "gap")} md:${pxToSpacingClass(base * 2.5, "gap")}`,
      },
    };
  }

  // -- Shadow --
  if (t.boxShadow) {
    total += 1;
    mapped += 1;
    tokens.shadow = {
      sm: "shadow-sm",
      md: shadowToClass(t.boxShadow),
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-lg",
      focus: `focus:${shadowToClass(t.boxShadow)}`,
    };
  }

  // -- Unmapped fields --
  if (t.controlHeight !== undefined) {
    total += 1;
    unmapped.push("token.controlHeight");
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
