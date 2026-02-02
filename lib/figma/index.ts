/**
 * Figma MCP Integration
 *
 * This module provides utilities for importing design tokens from Figma
 * via the Figma MCP Server. It converts Figma variables and styles into
 * StyleKit's token format.
 *
 * @see https://www.figma.com/blog/introducing-figma-mcp-server/
 */

import type { StyleTokens } from "../styles/tokens";

/**
 * Figma Variable types as returned by MCP Server
 */
export interface FigmaVariable {
  id: string;
  name: string;
  resolvedType: "COLOR" | "FLOAT" | "STRING" | "BOOLEAN";
  valuesByMode: Record<
    string,
    | { type: "VARIABLE_ALIAS"; id: string }
    | { r: number; g: number; b: number; a: number }
    | number
    | string
    | boolean
  >;
}

export interface FigmaVariableCollection {
  id: string;
  name: string;
  modes: Array<{ modeId: string; name: string }>;
  variableIds: string[];
}

export interface FigmaStyle {
  key: string;
  name: string;
  styleType: "FILL" | "TEXT" | "EFFECT" | "GRID";
  description?: string;
}

/**
 * Figma MCP Response types
 */
export interface FigmaMCPVariablesResponse {
  variables: Record<string, FigmaVariable>;
  collections: Record<string, FigmaVariableCollection>;
}

export interface FigmaMCPStylesResponse {
  styles: FigmaStyle[];
}

/**
 * Convert RGBA color object to hex string
 */
export function rgbaToHex(color: {
  r: number;
  g: number;
  b: number;
  a?: number;
}): string {
  const toHex = (value: number) =>
    Math.round(value * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

/**
 * Convert Figma spacing value to CSS
 */
export function spacingToCss(value: number): string {
  return `${value}px`;
}

/**
 * Parse Figma variable name to extract semantic meaning
 * e.g., "colors/primary/500" -> { category: "colors", name: "primary", variant: "500" }
 */
export function parseVariableName(name: string): {
  category: string;
  name: string;
  variant?: string;
} {
  const parts = name.split("/").map((p) => p.trim().toLowerCase());

  if (parts.length >= 3) {
    return {
      category: parts[0],
      name: parts[1],
      variant: parts.slice(2).join("-"),
    };
  } else if (parts.length === 2) {
    return {
      category: parts[0],
      name: parts[1],
    };
  }

  return {
    category: "other",
    name: parts[0] || name,
  };
}

/**
 * Convert Figma variables to StyleKit color tokens
 */
export function convertFigmaColorsToTokens(
  variables: Record<string, FigmaVariable>,
  modeId?: string
): Record<string, string> {
  const colors: Record<string, string> = {};

  for (const variable of Object.values(variables)) {
    if (variable.resolvedType !== "COLOR") continue;

    const parsed = parseVariableName(variable.name);
    const modeKey = modeId || Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeKey];

    if (
      value &&
      typeof value === "object" &&
      "r" in value &&
      "g" in value &&
      "b" in value
    ) {
      const tokenName = parsed.variant
        ? `${parsed.name}-${parsed.variant}`
        : parsed.name;
      colors[tokenName] = rgbaToHex(value);
    }
  }

  return colors;
}

/**
 * Convert Figma variables to StyleKit spacing tokens
 */
export function convertFigmaSpacingToTokens(
  variables: Record<string, FigmaVariable>,
  modeId?: string
): Record<string, string> {
  const spacing: Record<string, string> = {};

  for (const variable of Object.values(variables)) {
    if (variable.resolvedType !== "FLOAT") continue;

    const parsed = parseVariableName(variable.name);
    if (!["spacing", "space", "size", "gap"].includes(parsed.category))
      continue;

    const modeKey = modeId || Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeKey];

    if (typeof value === "number") {
      const tokenName = parsed.variant
        ? `${parsed.name}-${parsed.variant}`
        : parsed.name;
      spacing[tokenName] = spacingToCss(value);
    }
  }

  return spacing;
}

/**
 * Convert Figma variables to StyleKit border radius tokens
 */
export function convertFigmaRadiusToTokens(
  variables: Record<string, FigmaVariable>,
  modeId?: string
): Record<string, string> {
  const radius: Record<string, string> = {};

  for (const variable of Object.values(variables)) {
    if (variable.resolvedType !== "FLOAT") continue;

    const parsed = parseVariableName(variable.name);
    if (!["radius", "corner", "rounded", "border-radius"].includes(parsed.category))
      continue;

    const modeKey = modeId || Object.keys(variable.valuesByMode)[0];
    const value = variable.valuesByMode[modeKey];

    if (typeof value === "number") {
      radius[parsed.name] = spacingToCss(value);
    }
  }

  return radius;
}

/**
 * Full conversion from Figma MCP response to StyleKit tokens
 */
export function convertFigmaToStyleKitTokens(
  response: FigmaMCPVariablesResponse,
  options: {
    modeId?: string;
    styleName?: string;
  } = {}
): Partial<StyleTokens> {
  const { variables } = response;
  const { modeId, styleName = "imported" } = options;

  const colors = convertFigmaColorsToTokens(variables, modeId);
  const spacing = convertFigmaSpacingToTokens(variables, modeId);
  const radius = convertFigmaRadiusToTokens(variables, modeId);

  // Map to StyleKit token structure
  return {
    colors: {
      background: {
        primary: colors.background || colors["bg-primary"] || "#ffffff",
        secondary: colors["background-secondary"] || colors["bg-secondary"] || "#f5f5f5",
        accent: Object.entries(colors)
          .filter(([key]) => key.includes("accent"))
          .map(([, value]) => value),
      },
      text: {
        primary: colors["text-primary"] || colors.foreground || "#000000",
        secondary: colors["text-secondary"] || "#666666",
        muted: colors["text-muted"] || colors["text-tertiary"] || "#999999",
      },
      button: {
        primary: colors.primary || colors["button-primary"] || "#000000",
        secondary: colors.secondary || colors["button-secondary"] || "#ffffff",
      },
    },
    spacing: {
      section: spacing.section || spacing["space-xl"] || "py-12 md:py-24",
      container: spacing.container || spacing["space-md"] || "px-4 md:px-8",
      card: spacing.card || spacing["space-sm"] || "p-4 md:p-6",
      gap: {
        sm: spacing["gap-sm"] || spacing["space-xs"] || "gap-2",
        md: spacing["gap-md"] || spacing["space-sm"] || "gap-4",
        lg: spacing["gap-lg"] || spacing["space-md"] || "gap-8",
      },
    },
    border: {
      width: "border-2",
      color: `border-[${colors.border || colors["border-primary"] || "#000000"}]`,
      radius: radius.default
        ? `rounded-[${radius.default}]`
        : radius.md
          ? `rounded-[${radius.md}]`
          : "rounded-md",
    },
  };
}

/**
 * Generate CSS custom properties from Figma variables
 */
export function generateCSSFromFigmaVariables(
  response: FigmaMCPVariablesResponse,
  modeId?: string
): string {
  const colors = convertFigmaColorsToTokens(response.variables, modeId);
  const spacing = convertFigmaSpacingToTokens(response.variables, modeId);
  const radius = convertFigmaRadiusToTokens(response.variables, modeId);

  const lines = [":root {"];

  // Colors
  for (const [name, value] of Object.entries(colors)) {
    lines.push(`  --color-${name}: ${value};`);
  }

  // Spacing
  for (const [name, value] of Object.entries(spacing)) {
    lines.push(`  --spacing-${name}: ${value};`);
  }

  // Radius
  for (const [name, value] of Object.entries(radius)) {
    lines.push(`  --radius-${name}: ${value};`);
  }

  lines.push("}");

  return lines.join("\n");
}

/**
 * Generate Tailwind config extension from Figma variables
 */
export function generateTailwindConfigFromFigma(
  response: FigmaMCPVariablesResponse,
  modeId?: string
): string {
  const colors = convertFigmaColorsToTokens(response.variables, modeId);
  const spacing = convertFigmaSpacingToTokens(response.variables, modeId);
  const radius = convertFigmaRadiusToTokens(response.variables, modeId);

  const config = {
    theme: {
      extend: {
        colors: Object.fromEntries(
          Object.entries(colors).map(([name, value]) => [
            name.replace(/\//g, "-"),
            value,
          ])
        ),
        spacing: Object.fromEntries(
          Object.entries(spacing).map(([name, value]) => [name, value])
        ),
        borderRadius: Object.fromEntries(
          Object.entries(radius).map(([name, value]) => [name, value])
        ),
      },
    },
  };

  return `// Tailwind config extension generated from Figma
// Add this to your tailwind.config.js

module.exports = ${JSON.stringify(config, null, 2)}`;
}
