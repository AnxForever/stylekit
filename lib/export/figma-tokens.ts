import type { DesignStyle } from "../styles";
import type { StyleTokens } from "../styles/tokens";
import { getStyleTokens } from "../styles/tokens-registry";
import { colorToHsl } from "./color-resolve";
import {
  addUnsupported,
  createExportDiagnostics,
  fontWeightName,
  parseShadowValue,
  resolveColorUtility,
  resolveFontFamily,
  resolveFontSizeUtility,
  resolveFontWeight,
  resolveRadiusUtilityValue,
  resolveShadowValue,
  resolveSpacingValue,
  resolveUtilityValue,
  type ExportDiagnostics,
  type ExportDiagnostic,
} from "./style-token-resolve";

export interface FigmaToken<T = string> {
  value: T;
  type: string;
  description?: string;
}

export interface FigmaTokenSet {
  colors: {
    primary?: FigmaToken;
    secondary?: FigmaToken;
    accent: Record<string, FigmaToken>;
    /** Backward-compatible aliases for the semantic primary surface and text. */
    background?: FigmaToken;
    foreground?: FigmaToken;
    semantic?: {
      background: Record<string, FigmaToken>;
      text: Record<string, FigmaToken>;
      border: Record<string, FigmaToken>;
      button: Record<string, Record<string, FigmaToken>>;
    };
  };
  typography: {
    fontFamily: {
      primary?: FigmaToken;
      mono?: FigmaToken;
    };
    fontSize: Record<string, FigmaToken>;
    fontWeight: Record<string, FigmaToken>;
  };
  spacing: Record<string, FigmaToken>;
  borderRadius: Record<string, FigmaToken>;
  borderWidth: Record<string, FigmaToken>;
  shadow: Record<string, FigmaToken<Array<Record<string, string>>>>;
}

export interface FigmaTokenExportDiagnostics {
  schemaVersion: 1;
  generatedBy: "StyleKit";
  styleSlug: string;
  fallbacks: ExportDiagnostic[];
  unsupported: ExportDiagnostic[];
}

export interface FigmaTokenExport {
  tokens: FigmaTokenSet;
  diagnostics: FigmaTokenExportDiagnostics;
}

function effectiveTokens(style: DesignStyle, tokens?: StyleTokens): StyleTokens | undefined {
  return tokens ?? getStyleTokens(style.slug);
}

function rawColor(value: string | undefined): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (colorToHsl(trimmed) || /^(?:transparent|white|black)$/i.test(trimmed)) return trimmed;
  return undefined;
}

function addRawColor(
  source: string | undefined,
  path: string,
  diagnostics: ExportDiagnostics,
): FigmaToken | undefined {
  const value = rawColor(source);
  if (value) return { value, type: "color" };
  if (source) addUnsupported(diagnostics, path, source, "The style palette value is not a concrete color.");
  return undefined;
}

function addSemanticColor(
  output: Record<string, FigmaToken>,
  key: string,
  source: string,
  path: string,
  prefix: "bg" | "text" | "border",
  diagnostics: ExportDiagnostics,
  required = true,
): void {
  const value = resolveColorUtility(source, path, prefix, diagnostics, required);
  if (value) output[key] = { value, type: "color" };
}

function addResponsiveDiagnostics(
  diagnostics: ExportDiagnostics,
  path: string,
  source: string,
  responsive: Array<{ query: string; value: string; source: string }>,
  format: "Figma" | "Tailwind v3 JavaScript",
): void {
  for (const entry of responsive) {
    addUnsupported(
      diagnostics,
      path,
      entry.source,
      `${format} artifact stores one static value; responsive value ${entry.value} at ${entry.query} is omitted.`,
    );
  }
  if (responsive.length > 0 && !source) {
    addUnsupported(diagnostics, path, source, "Responsive values require a base value.");
  }
}

function addSizeToken(
  output: Record<string, FigmaToken>,
  key: string,
  source: string,
  diagnostics: ExportDiagnostics,
): void {
  const resolved = resolveUtilityValue(
    source,
    `typography.fontSize.${key}`,
    ["text"],
    resolveFontSizeUtility,
    diagnostics,
  );
  if (resolved.value) output[key] = { value: resolved.value, type: "fontSize" };
  addResponsiveDiagnostics(diagnostics, `typography.fontSize.${key}`, source, resolved.responsive, "Figma");
}

function collectFontWeights(tokens: StyleTokens | undefined, diagnostics: ExportDiagnostics): Record<string, FigmaToken> {
  if (!tokens) return {};
  const output: Record<string, FigmaToken> = {};
  const names: Array<keyof StyleTokens["typography"]> = ["heading", "body", "mono"];
  for (const name of names) {
    const source = tokens.typography[name];
    if (typeof source !== "string") continue;
    const value = resolveFontWeight(source, diagnostics, `typography.fontWeight.${name}`);
    if (value) {
      output[fontWeightName(value)] = { value, type: "fontWeight" };
    }
  }
  return output;
}

export function generateFigmaTokenExport(
  style: DesignStyle,
  tokens?: StyleTokens,
): FigmaTokenExport {
  const diagnostics = createExportDiagnostics();
  const resolvedTokens = effectiveTokens(style, tokens);
  const colors: FigmaTokenSet["colors"] = {
    primary: addRawColor(style.colors.primary, "colors.primary", diagnostics),
    secondary: addRawColor(style.colors.secondary, "colors.secondary", diagnostics),
    accent: {},
    semantic: { background: {}, text: {}, border: {}, button: {} },
  };

  style.colors.accent.forEach((color, index) => {
    const token = addRawColor(color, `colors.accent.accent-${index + 1}`, diagnostics);
    if (token) colors.accent[`accent-${index + 1}`] = token;
  });

  const tokenColors = resolvedTokens?.colors;
  if (tokenColors) {
    const background = tokenColors.background;
    addSemanticColor(colors.semantic!.background, "primary", background.primary, "colors.semantic.background.primary", "bg", diagnostics);
    addSemanticColor(colors.semantic!.background, "secondary", background.secondary, "colors.semantic.background.secondary", "bg", diagnostics);
    background.accent.forEach((value, index) => {
      addSemanticColor(colors.semantic!.background, `accent-${index + 1}`, value, `colors.semantic.background.accent-${index + 1}`, "bg", diagnostics);
    });

    const text = tokenColors.text;
    addSemanticColor(colors.semantic!.text, "primary", text.primary, "colors.semantic.text.primary", "text", diagnostics);
    if (text.secondary) addSemanticColor(colors.semantic!.text, "secondary", text.secondary, "colors.semantic.text.secondary", "text", diagnostics);
    addSemanticColor(colors.semantic!.text, "muted", text.muted, "colors.semantic.text.muted", "text", diagnostics);

    addSemanticColor(colors.semantic!.border, "default", resolvedTokens.border.color, "colors.semantic.border.default", "border", diagnostics);

    colors.background = colors.semantic!.background.primary;
    colors.foreground = colors.semantic!.text.primary;

    const buttonColors = tokenColors.button;
    for (const [name, value] of Object.entries(buttonColors)) {
      if (typeof value !== "string") continue;
      const output: Record<string, FigmaToken> = {};
      addSemanticColor(output, "background", value, `colors.semantic.button.${name}.background`, "bg", diagnostics, false);
      addSemanticColor(output, "foreground", value, `colors.semantic.button.${name}.foreground`, "text", diagnostics, false);
      addSemanticColor(output, "border", value, `colors.semantic.button.${name}.border`, "border", diagnostics, false);
      if (Object.keys(output).length > 0) colors.semantic!.button[name] = output;
    }
  } else {
    addUnsupported(diagnostics, "colors.semantic", style.slug, "No StyleTokens were supplied or registered for this style.");
  }

  const fontFamily: FigmaTokenSet["typography"]["fontFamily"] = {};
  if (resolvedTokens) {
    const headingFamily = resolveFontFamily(resolvedTokens.typography.heading, diagnostics, "typography.fontFamily.primary");
    const bodyFamily = resolveFontFamily(resolvedTokens.typography.body, diagnostics, "typography.fontFamily.body");
    if (headingFamily) {
      fontFamily.primary = { value: headingFamily, type: "fontFamily" };
    } else if (bodyFamily) {
      fontFamily.primary = { value: bodyFamily, type: "fontFamily", description: "Inherited from the body font utility because the heading token specifies no family." };
      diagnostics.fallbacks.push({
        path: "typography.fontFamily.primary",
        source: resolvedTokens.typography.heading,
        reason: "The heading token sets weight or tracking but no font family; the body family is used as the inherited family.",
      });
    } else {
      addUnsupported(diagnostics, "typography.fontFamily.primary", resolvedTokens.typography.heading, "No concrete font-family utility is present.");
    }

    const monoSource = resolvedTokens.typography.mono ?? resolvedTokens.typography.body;
    const mono = resolveFontFamily(monoSource, diagnostics, "typography.fontFamily.mono");
    if (mono) fontFamily.mono = { value: mono, type: "fontFamily" };
    else addUnsupported(diagnostics, "typography.fontFamily.mono", monoSource, "No concrete monospace font-family utility is present.");
  } else {
    addUnsupported(diagnostics, "typography.fontFamily", style.slug, "No StyleTokens were supplied or registered for this style.");
  }

  const fontSize: Record<string, FigmaToken> = {};
  if (resolvedTokens) {
    for (const [key, source] of Object.entries(resolvedTokens.typography.sizes)) {
      addSizeToken(fontSize, key, source, diagnostics);
    }
  }

  const spacing: Record<string, FigmaToken> = {};
  const borderRadius: Record<string, FigmaToken> = {};
  const borderWidth: Record<string, FigmaToken> = {};
  const shadow: FigmaTokenSet["shadow"] = {};
  if (resolvedTokens) {
    const spacingEntries: Array<[string, string, string[]]> = [
      ["section", resolvedTokens.spacing.section, ["py", "p"]],
      ["container", resolvedTokens.spacing.container, ["px", "p"]],
      ["card", resolvedTokens.spacing.card, ["p"]],
      ["gap-sm", resolvedTokens.spacing.gap.sm, ["gap"]],
      ["gap-md", resolvedTokens.spacing.gap.md, ["gap"]],
      ["gap-lg", resolvedTokens.spacing.gap.lg, ["gap"]],
    ];
    for (const [key, source, prefixes] of spacingEntries) {
      const resolved = resolveSpacingValue(source, `spacing.${key}`, prefixes, diagnostics);
      if (resolved.value) spacing[key] = { value: resolved.value, type: "dimension" };
      addResponsiveDiagnostics(diagnostics, `spacing.${key}`, source, resolved.responsive, "Figma");
    }

    const radiusSource = resolvedTokens.border.radius;
    const radius = resolveRadiusUtilityValue(radiusSource, "borderRadius.default", diagnostics);
    if (radius.value) borderRadius.default = { value: radius.value, type: "dimension" };
    addResponsiveDiagnostics(diagnostics, "borderRadius.default", radiusSource, radius.responsive, "Figma");

    const width = resolveUtilityValue(
      resolvedTokens.border.width,
      "borderWidth.default",
      ["border"],
      (utility) => {
        if (utility === "border") return "1px";
        if (!utility.startsWith("border-")) return null;
        const suffix = utility.slice("border-".length);
        const arbitrary = suffix.match(/^\[(.+)\]$/);
        const candidate = arbitrary ? arbitrary[1] : suffix;
        return /^\d+(?:px|rem)?$/.test(candidate)
          ? candidate.endsWith("px") || candidate.endsWith("rem") ? candidate : `${candidate}px`
          : null;
      },
      diagnostics,
    );
    if (width.value) borderWidth.default = { value: width.value, type: "dimension" };
    addResponsiveDiagnostics(diagnostics, "borderWidth.default", resolvedTokens.border.width, width.responsive, "Figma");

    const shadowEntries: Array<[string, string, string[]]> = [
      ["sm", resolvedTokens.shadow.sm, []],
      ["md", resolvedTokens.shadow.md, []],
      ["lg", resolvedTokens.shadow.lg, []],
      ["none", resolvedTokens.shadow.none, []],
      ["hover", resolvedTokens.shadow.hover, ["hover"]],
      ["focus", resolvedTokens.shadow.focus, ["focus"]],
      ...Object.entries(resolvedTokens.shadow.colored ?? {}).map(([name, value]) => [`colored-${name}`, value, []] as [string, string, string[]]),
    ];
    for (const [key, source, allowedStateModifiers] of shadowEntries) {
      const resolved = resolveUtilityValue(
        source,
        `shadow.${key}`,
        ["shadow"],
        resolveShadowValue,
        diagnostics,
        allowedStateModifiers,
      );
      if (resolved.value) {
        const value = parseShadowValue(resolved.value);
        if (value) shadow[key] = { value, type: "boxShadow" };
        else addUnsupported(diagnostics, `shadow.${key}`, source, "The shadow value is not a concrete CSS box-shadow expression.");
      }
      addResponsiveDiagnostics(diagnostics, `shadow.${key}`, source, resolved.responsive, "Figma");
    }
  } else {
    addUnsupported(diagnostics, "typography.fontSize", style.slug, "No StyleTokens were supplied or registered for this style.");
    addUnsupported(diagnostics, "spacing", style.slug, "No StyleTokens were supplied or registered for this style.");
    addUnsupported(diagnostics, "border", style.slug, "No StyleTokens were supplied or registered for this style.");
    addUnsupported(diagnostics, "shadow", style.slug, "No StyleTokens were supplied or registered for this style.");
  }

  const output: FigmaTokenSet = {
    colors,
    typography: { fontFamily, fontSize, fontWeight: collectFontWeights(resolvedTokens, diagnostics) },
    spacing,
    borderRadius,
    borderWidth,
    shadow,
  };

  return {
    tokens: output,
    diagnostics: {
      schemaVersion: 1,
      generatedBy: "StyleKit",
      styleSlug: style.slug,
      fallbacks: diagnostics.fallbacks,
      unsupported: diagnostics.unsupported,
    },
  };
}

export function generateFigmaTokens(style: DesignStyle, tokens?: StyleTokens): FigmaTokenSet {
  return generateFigmaTokenExport(style, tokens).tokens;
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
  format: ExportFormat,
  tokens?: StyleTokens,
): string {
  switch (format) {
    case "figma-tokens":
      return JSON.stringify(generateFigmaTokens(style, tokens), null, 2);
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
  format: ExportFormat,
  tokens?: StyleTokens,
): void {
  const content = exportStyleTokens(style, format, tokens);
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
