import type { MigrationResult, MuiTheme } from "./types";
import type { StyleTokens } from "@/lib/styles/tokens";
import {
  safeJsonParse,
  pxToRadiusClass,
  fontSizeToTextClass,
  colorToBgClass,
  colorToTextClass,
  shadowToClass,
  pxToSpacingClass,
} from "./utils";

export function importMuiTheme(themeJson: string): MigrationResult {
  const theme = safeJsonParse<MuiTheme>(themeJson);
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
  const palette = theme.palette;
  if (palette) {
    const bgPrimary = palette.background?.default;
    const bgSecondary = palette.background?.paper;
    const textPrimary = palette.text?.primary;
    const textSecondary = palette.text?.secondary;
    const textDisabled = palette.text?.disabled;
    const primaryMain = palette.primary?.main;
    const secondaryMain = palette.secondary?.main;

    const colors: StyleTokens["colors"] = {
      background: {
        primary: bgPrimary ? colorToBgClass(bgPrimary) : "bg-white",
        secondary: bgSecondary ? colorToBgClass(bgSecondary) : "bg-gray-50",
        accent: primaryMain ? [colorToBgClass(primaryMain)] : ["bg-blue-500"],
      },
      text: {
        primary: textPrimary ? colorToTextClass(textPrimary) : "text-gray-900",
        secondary: textSecondary ? colorToTextClass(textSecondary) : "text-gray-600",
        muted: textDisabled ? colorToTextClass(textDisabled) : "text-gray-400",
      },
      button: {
        primary: primaryMain
          ? `${colorToBgClass(primaryMain)} text-white`
          : "bg-blue-500 text-white",
        secondary: secondaryMain
          ? `${colorToBgClass(secondaryMain)} text-white`
          : "bg-gray-200 text-gray-800",
      },
    };

    tokens.colors = colors;

    // Count mappings
    const colorFields = [
      bgPrimary, bgSecondary, textPrimary, textSecondary, textDisabled,
      primaryMain, secondaryMain,
    ];
    total += colorFields.length;
    mapped += colorFields.filter(Boolean).length;

    // Track extra palette fields we don't map
    for (const key of ["error", "warning", "info", "success"] as const) {
      if (palette[key]?.main) {
        total += 1;
        unmapped.push(`palette.${key}.main`);
        warnings.push(`palette.${key}.main is not mapped to StyleKit tokens (no semantic equivalent).`);
      }
    }

    if (palette.primary?.light) { total += 1; unmapped.push("palette.primary.light"); }
    if (palette.primary?.dark) { total += 1; unmapped.push("palette.primary.dark"); }
    if (palette.secondary?.light) { total += 1; unmapped.push("palette.secondary.light"); }
    if (palette.secondary?.dark) { total += 1; unmapped.push("palette.secondary.dark"); }
  }

  // -- Typography --
  const typo = theme.typography;
  if (typo) {
    const heading = typo.h1?.fontWeight
      ? `font-[${typo.h1.fontWeight}] tracking-tight`
      : "font-bold tracking-tight";

    const bodyFont = typo.fontFamily
      ? `font-['${typo.fontFamily.split(",")[0].trim().replace(/'/g, "")}']`
      : "font-sans";

    const h1Size = typo.h1?.fontSize ? fontSizeToTextClass(typo.h1.fontSize) : "text-3xl md:text-5xl";
    const h2Size = typo.h2?.fontSize ? fontSizeToTextClass(typo.h2.fontSize) : "text-2xl md:text-4xl";
    const bodySize = typo.body1?.fontSize ? fontSizeToTextClass(typo.body1.fontSize) : "text-sm md:text-base";

    tokens.typography = {
      heading,
      body: bodyFont,
      mono: "font-mono",
      sizes: {
        hero: `${h1Size} md:text-6xl lg:text-8xl`,
        h1: h1Size.includes("md:") ? h1Size : `${h1Size} md:text-5xl`,
        h2: h2Size.includes("md:") ? h2Size : `${h2Size} md:text-4xl`,
        h3: "text-xl md:text-2xl",
        body: bodySize.includes("md:") ? bodySize : `${bodySize} md:text-base`,
        small: "text-xs md:text-sm",
      },
    };

    const typoFields = [typo.fontFamily, typo.h1?.fontSize, typo.h2?.fontSize, typo.body1?.fontSize, typo.body1?.lineHeight];
    total += typoFields.length;
    mapped += typoFields.filter((v) => v !== undefined && v !== null).length;

    if (typo.fontSize) { total += 1; mapped += 1; }
    if (typo.body2?.fontSize) { total += 1; unmapped.push("typography.body2.fontSize"); }
    if (typo.button?.textTransform) { total += 1; unmapped.push("typography.button.textTransform"); }
  }

  // -- Border Radius --
  if (theme.shape?.borderRadius !== undefined) {
    total += 1;
    mapped += 1;
    tokens.border = {
      width: "border",
      color: "border-gray-200",
      radius: pxToRadiusClass(theme.shape.borderRadius),
      style: "border-solid",
    };
  }

  // -- Spacing --
  if (theme.spacing !== undefined) {
    total += 1;
    mapped += 1;
    const base = theme.spacing;
    tokens.spacing = {
      section: `${pxToSpacingClass(base * 6, "py")} md:${pxToSpacingClass(base * 10, "py")}`,
      container: `${pxToSpacingClass(base * 2, "px")} md:${pxToSpacingClass(base * 4, "px")}`,
      card: `${pxToSpacingClass(base * 2, "p")} md:${pxToSpacingClass(base * 3, "p")}`,
      gap: {
        sm: `${pxToSpacingClass(base, "gap")} md:${pxToSpacingClass(base * 1.5, "gap")}`,
        md: `${pxToSpacingClass(base * 1.5, "gap")} md:${pxToSpacingClass(base * 2, "gap")}`,
        lg: `${pxToSpacingClass(base * 2.5, "gap")} md:${pxToSpacingClass(base * 4, "gap")}`,
      },
    };
  }

  // -- Shadows --
  if (theme.shadows && Array.isArray(theme.shadows)) {
    total += 1;
    const defaultShadow = theme.shadows[2];
    const largeShadow = theme.shadows[8];

    if (defaultShadow || largeShadow) {
      mapped += 1;
      tokens.shadow = {
        sm: defaultShadow ? shadowToClass(defaultShadow) : "shadow-sm",
        md: defaultShadow ? shadowToClass(defaultShadow) : "shadow-md",
        lg: largeShadow ? shadowToClass(largeShadow) : "shadow-lg",
        none: "shadow-none",
        hover: largeShadow ? `hover:${shadowToClass(largeShadow)}` : "hover:shadow-lg",
        focus: defaultShadow ? `focus:${shadowToClass(defaultShadow)}` : "focus:shadow-md",
      };
    } else {
      warnings.push("shadows array exists but entries at index 2/8 are empty.");
    }
  }

  // Ensure total > 0 to avoid division by zero
  const coverage = total > 0 ? Math.round((mapped / total) * 100) : 0;

  return {
    success: mapped > 0,
    tokens,
    warnings,
    unmapped,
    coverage,
  };
}
