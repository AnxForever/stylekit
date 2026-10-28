import type { DesignStyle } from "../styles";
import { hslToHex } from "../color/convert";
import { getStyleTokens } from "../styles/tokens-registry";
import { resolveTwColor } from "./color-resolve";

export interface FigmaTokenSet {
  colors: {
    primary: { value: string; type: "color" };
    secondary: { value: string; type: "color" };
    accent: Record<string, { value: string; type: "color" }>;
    /** Scalar color field; gradient backgrounds use their first resolved color stop. */
    background: { value: string; type: "color" };
    foreground: { value: string; type: "color" };
  };
  typography: {
    fontFamily: {
      primary: { value: string; type: "fontFamily" };
      mono: { value: string; type: "fontFamily" };
    };
    fontSize: Record<string, { value: string; type: "fontSize" }>;
    fontWeight: Record<string, { value: string; type: "fontWeight" }>;
  };
  spacing: Record<string, { value: string; type: "spacing" }>;
  borderRadius: Record<string, { value: string; type: "borderRadius" }>;
  borderWidth: Record<string, { value: string; type: "borderWidth" }>;
  shadow: Record<string, { value: string; type: "boxShadow" }>;
}

function parseOpacityModifier(token: string): { colorClass: string; opacity: number } | null {
  const slash = token.lastIndexOf("/");
  if (slash < 0) return { colorClass: token, opacity: 1 };

  const bracketStartBeforeSlash = token.lastIndexOf("[", slash);
  const bracketEndBeforeSlash = token.lastIndexOf("]", slash);
  if (bracketStartBeforeSlash > bracketEndBeforeSlash) {
    // A slash inside an arbitrary CSS color (for example rgb(... / 50%)) is
    // part of that color, not Tailwind's trailing opacity modifier.
    return { colorClass: token, opacity: 1 };
  }

  const modifier = token.slice(slash + 1);
  let opacity: number;
  if (/^\d{1,3}(?:\.\d+)?$/.test(modifier)) {
    opacity = Number(modifier) / 100;
  } else {
    const arbitrary = modifier.match(/^\[([\d.]+)(%)?\]$/);
    if (!arbitrary) return null;
    opacity = Number(arbitrary[1]) / (arbitrary[2] ? 100 : 1);
  }

  if (!Number.isFinite(opacity) || opacity < 0 || opacity > 1) return null;
  return { colorClass: token.slice(0, slash), opacity };
}

function parseHexColor(hex: string): { rgb: [number, number, number]; alpha: number } | null {
  const value = hex.replace(/^#/, "");
  if (![3, 4, 6, 8].includes(value.length) || !/^[\da-f]+$/i.test(value)) {
    return null;
  }

  const expanded = value.length <= 4
    ? value.split("").map((digit) => digit + digit).join("")
    : value;
  const hasAlpha = expanded.length === 8;
  return {
    rgb: [
      Number.parseInt(expanded.slice(0, 2), 16),
      Number.parseInt(expanded.slice(2, 4), 16),
      Number.parseInt(expanded.slice(4, 6), 16),
    ],
    alpha: hasAlpha ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
  };
}

function formatRgba(
  [r, g, b]: [number, number, number],
  alpha: number,
): string {
  const roundedAlpha = Number(alpha.toFixed(4));
  return `rgba(${r}, ${g}, ${b}, ${roundedAlpha})`;
}

/**
 * Resolve class-based colors to the scalar color value accepted by Figma tokens.
 * For gradients, only the first resolvable stop is exported; direction and
 * remaining stops are not represented by this schema.
 * @internal Exported so opacity/color edge cases can be tested directly.
 */
export function resolveFigmaColorToken(token: string | undefined, fallback: string): string {
  if (!token) return fallback;

  // Source order makes the first explicit gradient stop the scalar representative.
  for (const classToken of token.trim().split(/\s+/)) {
    const opacity = parseOpacityModifier(classToken);
    if (!opacity) {
      // An unrecognized opacity modifier must not be silently treated as solid.
      if (resolveTwColor(classToken)) return fallback;
      continue;
    }

    const { colorClass, opacity: utilityOpacity } = opacity;
    const rawColor = colorClass.match(/\[([^\]]+)\]/)?.[1]?.replace(/_/g, " ");
    const hex = rawColor?.match(/^#[\da-f]+$/i)?.[0];
    if (hex) {
      const parsed = parseHexColor(hex);
      if (!parsed) return fallback;
      const alpha = parsed.alpha * utilityOpacity;
      return alpha === 1 ? hex : formatRgba(parsed.rgb, alpha);
    }

    // Keep CSS RGB/HSL functions intact so embedded alpha is preserved.
    if (rawColor && /^(?:rgba?|hsla?)\(/i.test(rawColor)) {
      if (/^hsl\(/i.test(rawColor) && rawColor.includes("/")) return fallback;
      return utilityOpacity === 1 ? rawColor : fallback;
    }

    // The Tailwind resolver ignores alpha in OKLCH slash notation. Do not
    // convert such a color to an opaque hex value when its alpha is uncertain.
    if (rawColor?.startsWith("oklch(") && rawColor.includes("/")) return fallback;

    if (/^(?:bg|text|border|ring|from|to|via|fill|stroke|decoration|outline)-transparent$/.test(colorClass)) {
      return utilityOpacity === 1 ? "rgba(0, 0, 0, 0)" : fallback;
    }

    const hsl = resolveTwColor(colorClass)?.match(
      /^(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/,
    );
    if (!hsl) continue;

    const resolvedHex = hslToHex({
      h: Number(hsl[1]),
      s: Number(hsl[2]),
      l: Number(hsl[3]),
    });
    const parsed = parseHexColor(resolvedHex);
    if (!parsed) return fallback;
    return utilityOpacity === 1
      ? resolvedHex
      : formatRgba(parsed.rgb, utilityOpacity);
  }

  return fallback;
}

export function generateFigmaTokens(style: DesignStyle): FigmaTokenSet {
  const tokens = getStyleTokens(style.slug);
  const background = resolveFigmaColorToken(tokens?.colors.background.primary, "#ffffff");
  const foreground = resolveFigmaColorToken(tokens?.colors.text.primary, "#000000");
  const accentTokens: Record<string, { value: string; type: "color" }> = {};
  style.colors.accent.forEach((color, index) => {
    accentTokens[`accent-${index + 1}`] = { value: color, type: "color" };
  });

  return {
    colors: {
      primary: { value: style.colors.primary, type: "color" },
      secondary: { value: style.colors.secondary, type: "color" },
      accent: accentTokens,
      background: { value: background, type: "color" },
      foreground: { value: foreground, type: "color" },
    },
    typography: {
      fontFamily: {
        primary: { value: "Inter, system-ui, sans-serif", type: "fontFamily" },
        mono: { value: "JetBrains Mono, monospace", type: "fontFamily" },
      },
      fontSize: {
        xs: { value: "12px", type: "fontSize" },
        sm: { value: "14px", type: "fontSize" },
        base: { value: "16px", type: "fontSize" },
        lg: { value: "18px", type: "fontSize" },
        xl: { value: "20px", type: "fontSize" },
        "2xl": { value: "24px", type: "fontSize" },
        "3xl": { value: "30px", type: "fontSize" },
        "4xl": { value: "36px", type: "fontSize" },
        "5xl": { value: "48px", type: "fontSize" },
      },
      fontWeight: {
        normal: { value: "400", type: "fontWeight" },
        medium: { value: "500", type: "fontWeight" },
        semibold: { value: "600", type: "fontWeight" },
        bold: { value: "700", type: "fontWeight" },
        black: { value: "900", type: "fontWeight" },
      },
    },
    spacing: {
      "0": { value: "0px", type: "spacing" },
      "1": { value: "4px", type: "spacing" },
      "2": { value: "8px", type: "spacing" },
      "3": { value: "12px", type: "spacing" },
      "4": { value: "16px", type: "spacing" },
      "5": { value: "20px", type: "spacing" },
      "6": { value: "24px", type: "spacing" },
      "8": { value: "32px", type: "spacing" },
      "10": { value: "40px", type: "spacing" },
      "12": { value: "48px", type: "spacing" },
      "16": { value: "64px", type: "spacing" },
    },
    borderRadius: {
      none: { value: "0px", type: "borderRadius" },
      sm: { value: "2px", type: "borderRadius" },
      default: { value: "4px", type: "borderRadius" },
      md: { value: "6px", type: "borderRadius" },
      lg: { value: "8px", type: "borderRadius" },
      xl: { value: "12px", type: "borderRadius" },
      "2xl": { value: "16px", type: "borderRadius" },
      "3xl": { value: "24px", type: "borderRadius" },
      full: { value: "9999px", type: "borderRadius" },
    },
    borderWidth: {
      "0": { value: "0px", type: "borderWidth" },
      "1": { value: "1px", type: "borderWidth" },
      "2": { value: "2px", type: "borderWidth" },
      "3": { value: "3px", type: "borderWidth" },
      "4": { value: "4px", type: "borderWidth" },
    },
    shadow: {
      sm: { value: "0 1px 2px 0 rgb(0 0 0 / 0.05)", type: "boxShadow" },
      default: { value: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", type: "boxShadow" },
      md: { value: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", type: "boxShadow" },
      lg: { value: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", type: "boxShadow" },
      brutal: { value: "4px 4px 0px 0px rgba(0,0,0,1)", type: "boxShadow" },
      "brutal-lg": { value: "8px 8px 0px 0px rgba(0,0,0,1)", type: "boxShadow" },
    },
  };
}

export function generateStyleDictionary(style: DesignStyle) {
  return {
    color: {
      primary: { value: style.colors.primary },
      secondary: { value: style.colors.secondary },
      ...style.colors.accent.reduce((acc, color, i) => ({
        ...acc,
        [`accent-${i + 1}`]: { value: color },
      }), {}),
    },
  };
}

export function generateCSSVariables(style: DesignStyle): string {
  const lines = [
    `:root {`,
    `  /* ${style.name} - ${style.nameEn} */`,
    `  --color-primary: ${style.colors.primary};`,
    `  --color-secondary: ${style.colors.secondary};`,
    ...style.colors.accent.map((color, i) =>
      `  --color-accent-${i + 1}: ${color};`
    ),
    `}`,
  ];
  return lines.join("\n");
}

export type ExportFormat = "figma-tokens" | "style-dictionary" | "css-variables";

export function exportStyleTokens(
  style: DesignStyle,
  format: ExportFormat
): string {
  switch (format) {
    case "figma-tokens":
      return JSON.stringify(generateFigmaTokens(style), null, 2);
    case "style-dictionary":
      return JSON.stringify(generateStyleDictionary(style), null, 2);
    case "css-variables":
      return generateCSSVariables(style);
    default:
      return "";
  }
}

export function downloadTokens(
  style: DesignStyle,
  format: ExportFormat
): void {
  const content = exportStyleTokens(style, format);
  const filename = format === "css-variables"
    ? `${style.slug}-tokens.css`
    : `${style.slug}-tokens.json`;
  const mimeType = format === "css-variables"
    ? "text/css"
    : "application/json";

  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
