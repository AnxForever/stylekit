import type { DesignStyle } from "../styles";
import type { StyleTokens } from "../styles/tokens";
import { getStyleTokens } from "../styles/tokens-registry";
import { colorToHsl } from "./color-resolve";
import {
  addFallback,
  addUnsupported,
  createExportDiagnostics,
  fontWeightName,
  resolveColorUtility,
  resolveFontFamily,
  resolveFontSizeUtility,
  resolveFontWeight,
  resolveGradientValue,
  resolveRadiusUtilityValue,
  resolveShadowValue,
  resolveSpacingValue,
  resolveUtilityValue,
  type ExportDiagnostics,
  type ExportDiagnostic,
} from "./style-token-resolve";

export interface TailwindPreset {
  theme: {
    extend: {
      colors: Record<string, string>;
      fontFamily: Record<string, string[]>;
      fontWeight: Record<string, string>;
      fontSize: Record<string, string>;
      spacing: Record<string, string>;
      borderRadius: Record<string, string>;
      borderWidth: Record<string, string>;
      boxShadow: Record<string, string>;
      backgroundImage: Record<string, string>;
    };
  };
}

export interface TailwindPresetExport {
  preset: TailwindPreset;
  diagnostics: ExportDiagnostics;
}

export interface TailwindThemeCSSExport {
  css: string;
  diagnostics: ExportDiagnostics;
}

const SPACING_ENTRIES = [
  ["section", "stylekit-section", ["py", "p"]],
  ["container", "stylekit-container", ["px", "p"]],
  ["card", "stylekit-card", ["p"]],
  ["gap.sm", "stylekit-sm", ["gap"]],
  ["gap.md", "stylekit-md", ["gap"]],
  ["gap.lg", "stylekit-lg", ["gap"]],
] as const;

function effectiveTokens(style: DesignStyle, tokens?: StyleTokens): StyleTokens | undefined {
  return tokens ?? getStyleTokens(style.slug);
}

function isConcreteColor(value: string | undefined): value is string {
  return Boolean(value && (colorToHsl(value) || /^(?:transparent|white|black)$/i.test(value.trim())));
}

function cssIdentifier(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9_-]+/g, "-").replace(/^-+|-+$/g, "") || "token";
}

function splitFontStack(value: string): string[] {
  const parts: string[] = [];
  let start = 0;
  let quote = "";
  for (let index = 0; index < value.length; index++) {
    const char = value[index];
    if (quote) {
      if (char === quote && value[index - 1] !== "\\") quote = "";
    } else if (char === "'" || char === '"') quote = char;
    else if (char === ",") {
      const part = value.slice(start, index).trim();
      if (part) parts.push(part);
      start = index + 1;
    }
  }
  const last = value.slice(start).trim();
  if (last) parts.push(last);
  return parts;
}

function addResponsiveLimitations(
  diagnostics: ExportDiagnostics,
  path: string,
  responsive: Array<{ query: string; value: string; source: string }>,
): void {
  for (const entry of responsive) {
    addUnsupported(
      diagnostics,
      path,
      entry.source,
      `The Tailwind v3 JavaScript theme object has one static value; responsive value ${entry.value} at ${entry.query} is omitted.`,
    );
  }
}

function addStyleColors(
  style: DesignStyle,
  colors: Record<string, string>,
  diagnostics: ExportDiagnostics,
): void {
  const entries: Array<[string, string]> = [
    ["primary", style.colors.primary],
    ["secondary", style.colors.secondary],
    ...style.colors.accent.map((color, index) => [`accent-${index + 1}`, color] as [string, string]),
  ];
  for (const [key, value] of entries) {
    if (isConcreteColor(value)) colors[key] = value;
    else addUnsupported(diagnostics, `colors.${key}`, value, "The style palette value is not a concrete CSS color.");
  }
}

function addTokenColors(
  tokens: StyleTokens | undefined,
  colors: Record<string, string>,
  backgroundImages: Record<string, string>,
  diagnostics: ExportDiagnostics,
): void {
  if (!tokens) return;
  for (const [key, source] of [
    ["background-primary", tokens.colors.background.primary],
    ["background-secondary", tokens.colors.background.secondary],
    ...tokens.colors.background.accent.map((value, index) => [`background-accent-${index + 1}`, value] as [string, string]),
  ] as Array<[string, string]>) {
    const value = resolveColorUtility(source, `colors.${key}`, "bg", diagnostics);
    if (value) colors[key] = value;
  }

  for (const [key, source] of [
    ["text-primary", tokens.colors.text.primary],
    ["text-secondary", tokens.colors.text.secondary],
    ["text-muted", tokens.colors.text.muted],
  ] as Array<[string, string]>) {
    const value = resolveColorUtility(source, `colors.${key}`, "text", diagnostics);
    if (value) colors[key] = value;
  }

  const borderColor = resolveColorUtility(tokens.border.color, "colors.border", "border", diagnostics);
  if (borderColor) colors.border = borderColor;

  for (const [name, source] of Object.entries(tokens.colors.button)) {
    const base = `button-${cssIdentifier(name)}`;
    const background = resolveColorUtility(source, `colors.${base}-background`, "bg", diagnostics, false);
    if (background) colors[`${base}-background`] = background;
    const foreground = resolveColorUtility(source, `colors.${base}-foreground`, "text", diagnostics, false);
    if (foreground) colors[`${base}-foreground`] = foreground;
    const border = resolveColorUtility(source, `colors.${base}-border`, "border", diagnostics, false);
    if (border) colors[`${base}-border`] = border;

    const gradient = resolveGradientValue(source, `colors.${base}-background-image`, diagnostics);
    if (gradient) backgroundImages[name] = gradient;
  }
}

function addTypography(
  tokens: StyleTokens | undefined,
  fontFamily: Record<string, string[]>,
  fontWeight: Record<string, string>,
  fontSize: Record<string, string>,
  diagnostics: ExportDiagnostics,
  responsive?: Map<string, Map<string, string>>,
): void {
  if (!tokens) return;
  const heading = resolveFontFamily(tokens.typography.heading, diagnostics, "typography.fontFamily.heading");
  const body = resolveFontFamily(tokens.typography.body, diagnostics, "typography.fontFamily.body");
  if (heading) fontFamily.heading = splitFontStack(heading);
  else if (body) {
    fontFamily.heading = splitFontStack(body);
    addFallback(diagnostics, "typography.fontFamily.heading", tokens.typography.heading, "No heading family is specified; the body family is used because headings inherit it.");
  } else {
    addUnsupported(diagnostics, "typography.fontFamily.heading", tokens.typography.heading, "No concrete font-family utility is present.");
  }

  if (body) fontFamily.body = splitFontStack(body);
  else addUnsupported(diagnostics, "typography.fontFamily.body", tokens.typography.body, "No concrete font-family utility is present.");

  const monoSource = tokens.typography.mono ?? tokens.typography.body;
  const mono = resolveFontFamily(monoSource, diagnostics, "typography.fontFamily.mono");
  if (mono) fontFamily.mono = splitFontStack(mono);
  else addUnsupported(diagnostics, "typography.fontFamily.mono", tokens.typography.mono ?? tokens.typography.body, "No concrete monospace font-family utility is present.");

  const weights = new Set<string>();
  for (const [name, source] of [
    ["heading", tokens.typography.heading],
    ["body", tokens.typography.body],
    ["mono", tokens.typography.mono ?? ""],
  ] as Array<[string, string]>) {
    const weight = resolveFontWeight(source, diagnostics, `typography.fontWeight.${name}`);
    if (weight) weights.add(weight);
  }
  for (const weight of weights) {
    fontWeight[fontWeightName(weight)] = weight;
  }

  for (const [key, source] of Object.entries(tokens.typography.sizes)) {
    const resolved = resolveUtilityValue(
      source,
      `typography.fontSize.${key}`,
      ["text"],
      resolveFontSizeUtility,
      diagnostics,
    );
    if (resolved.value) fontSize[key] = resolved.value;
    if (responsive) {
      for (const item of resolved.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--text-${cssIdentifier(key)}`, item.value);
        responsive.set(item.query, declarations);
      }
    } else addResponsiveLimitations(diagnostics, `typography.fontSize.${key}`, resolved.responsive);
  }
}

function addSpacing(
  tokens: StyleTokens | undefined,
  spacing: Record<string, string>,
  diagnostics: ExportDiagnostics,
  responsive?: Map<string, Map<string, string>>,
): void {
  if (!tokens) return;
  for (const [tokenPath, name, prefixes] of SPACING_ENTRIES) {
    const source = tokenPath.startsWith("gap.")
      ? tokens.spacing.gap[tokenPath.slice("gap.".length) as "sm" | "md" | "lg"]
      : tokens.spacing[tokenPath as "section" | "container" | "card"];
    const result = resolveSpacingValue(source, `spacing.${tokenPath}`, [...prefixes], diagnostics);
    if (result.value) spacing[name] = result.value;
    if (responsive) {
      for (const item of result.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--spacing-${cssIdentifier(name)}`, item.value);
        responsive.set(item.query, declarations);
      }
    } else addResponsiveLimitations(diagnostics, `spacing.${tokenPath}`, result.responsive);
  }
}

function addBorders(
  tokens: StyleTokens | undefined,
  borderRadius: Record<string, string>,
  borderWidth: Record<string, string>,
  diagnostics: ExportDiagnostics,
  responsive?: Map<string, Map<string, string>>,
): void {
  if (!tokens) return;
  const radius = resolveRadiusUtilityValue(tokens.border.radius, "border.radius", diagnostics);
  if (radius.value) {
    borderRadius.style = radius.value;
    borderRadius.DEFAULT = radius.value;
  }
  if (responsive) {
    for (const item of radius.responsive) {
      const declarations = responsive.get(item.query) ?? new Map<string, string>();
      declarations.set("--radius-style", item.value);
      responsive.set(item.query, declarations);
    }
  } else addResponsiveLimitations(diagnostics, "border.radius", radius.responsive);

  const width = resolveUtilityValue(
    tokens.border.width,
    "border.width",
    ["border"],
    (utility) => {
      if (utility === "border") return "1px";
      const suffix = utility.startsWith("border-") ? utility.slice(7) : "";
      const arbitrary = suffix.match(/^\[(.+)\]$/);
      const candidate = arbitrary ? arbitrary[1] : suffix;
      return /^\d+(?:px|rem)?$/.test(candidate)
        ? candidate.endsWith("px") || candidate.endsWith("rem") ? candidate : `${candidate}px`
        : null;
    },
    diagnostics,
  );
  if (width.value) {
    borderWidth.style = width.value;
    borderWidth.DEFAULT = width.value;
  }
  if (responsive) {
    for (const item of width.responsive) {
      const declarations = responsive.get(item.query) ?? new Map<string, string>();
      declarations.set("--border-width-style", item.value);
      responsive.set(item.query, declarations);
    }
  } else addResponsiveLimitations(diagnostics, "border.width", width.responsive);
}

function addShadows(
  tokens: StyleTokens | undefined,
  boxShadow: Record<string, string>,
  diagnostics: ExportDiagnostics,
  responsive?: Map<string, Map<string, string>>,
): void {
  if (!tokens) return;
  const entries: Array<[string, string, string[]]> = [
    ["sm", tokens.shadow.sm, []],
    ["md", tokens.shadow.md, []],
    ["lg", tokens.shadow.lg, []],
    ["none", tokens.shadow.none, []],
    ["hover", tokens.shadow.hover, ["hover"]],
    ["focus", tokens.shadow.focus, ["focus"]],
    ...Object.entries(tokens.shadow.colored ?? {}).map(([name, value]) => [`colored-${name}`, value, []] as [string, string, string[]]),
  ];
  for (const [key, source, states] of entries) {
    const resolved = resolveUtilityValue(source, `shadow.${key}`, ["shadow"], resolveShadowValue, diagnostics, states);
    const cssName = key.startsWith("colored-") ? key : key;
    if (resolved.value) boxShadow[cssName] = resolved.value;
    if (responsive) {
      for (const item of resolved.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--shadow-${cssIdentifier(cssName)}`, item.value);
        responsive.set(item.query, declarations);
      }
    } else addResponsiveLimitations(diagnostics, `shadow.${key}`, resolved.responsive);
  }
}

function createPresetExport(style: DesignStyle, tokens?: StyleTokens): TailwindPresetExport {
  const diagnostics = createExportDiagnostics();
  const resolvedTokens = effectiveTokens(style, tokens);
  const preset: TailwindPreset = {
    theme: {
      extend: {
        colors: {},
        fontFamily: {},
        fontWeight: {},
        fontSize: {},
        spacing: {},
        borderRadius: {},
        borderWidth: {},
        boxShadow: {},
        backgroundImage: {},
      },
    },
  };

  addStyleColors(style, preset.theme.extend.colors, diagnostics);
  if (!resolvedTokens) {
    addUnsupported(diagnostics, "tokens", style.slug, "No StyleTokens were supplied or registered for this style.");
  }
  addTokenColors(resolvedTokens, preset.theme.extend.colors, preset.theme.extend.backgroundImage, diagnostics);
  addTypography(resolvedTokens, preset.theme.extend.fontFamily, preset.theme.extend.fontWeight, preset.theme.extend.fontSize, diagnostics);
  addSpacing(resolvedTokens, preset.theme.extend.spacing, diagnostics);
  addBorders(resolvedTokens, preset.theme.extend.borderRadius, preset.theme.extend.borderWidth, diagnostics);
  addShadows(resolvedTokens, preset.theme.extend.boxShadow, diagnostics);

  return { preset, diagnostics };
}

export function generateTailwindPresetExport(style: DesignStyle, tokens?: StyleTokens): TailwindPresetExport {
  return createPresetExport(style, tokens);
}

export function generateTailwindPreset(style: DesignStyle, tokens?: StyleTokens): TailwindPreset {
  return createPresetExport(style, tokens).preset;
}

function commentText(value: string): string {
  return value.replace(/[\r\n]+/g, " ").replace(/\*\//g, "* /");
}

export function generateTailwindPresetJS(style: DesignStyle, tokens?: StyleTokens): string {
  const { preset, diagnostics } = createPresetExport(style, tokens);
  const limitations = diagnostics.unsupported.length === 0
    ? "// Export limitations: none."
    : ["// Export limitations:", ...diagnostics.unsupported.map((item) => `// - ${commentText(item.path)}: ${commentText(item.reason)}`)].join("\n");
  const fallbacks = diagnostics.fallbacks.length === 0
    ? "// Export fallbacks: none."
    : ["// Export fallbacks:", ...diagnostics.fallbacks.map((item) => `// - ${commentText(item.path)}: ${commentText(item.reason)}`)].join("\n");

  return `// ${commentText(style.name)} (${commentText(style.nameEn)}) Tailwind CSS Preset\n// Generated by StyleKit\n// Compatibility: Tailwind CSS v3.x CommonJS config API.\n// Tailwind CSS v4 projects should import the generated -tailwind-theme.css file.\n// Custom spacing keys use the stylekit- namespace to preserve default aliases.\n${limitations}\n${fallbacks}\n\n/** @type {import('tailwindcss').Config} */\nmodule.exports = ${JSON.stringify(preset, null, 2)};\n`;
}

function cssValue(value: string): string {
  return value.replace(/[;{}\r\n]/g, " ").trim();
}

function createThemeCSSExport(style: DesignStyle, tokens?: StyleTokens): TailwindThemeCSSExport {
  const diagnostics = createExportDiagnostics();
  const resolvedTokens = effectiveTokens(style, tokens);
  const colors: Record<string, string> = {};
  const fonts: Record<string, string> = {};
  const fontWeights: Record<string, string> = {};
  const fontSizes: Record<string, string> = {};
  const spacing: Record<string, string> = {};
  const radii: Record<string, string> = {};
  const borderWidths: Record<string, string> = {};
  const shadows: Record<string, string> = {};
  const responsive = new Map<string, Map<string, string>>();
  const utilityBlocks: string[] = [];

  const styleColors: Array<[string, string]> = [
    ["primary", style.colors.primary],
    ["secondary", style.colors.secondary],
    ...style.colors.accent.map((color, index) => [`accent-${index + 1}`, color] as [string, string]),
  ];
  for (const [key, value] of styleColors) {
    if (isConcreteColor(value)) colors[`--color-${key}`] = value;
    else addUnsupported(diagnostics, `colors.${key}`, value, "The style palette value is not a concrete CSS color.");
  }

  if (resolvedTokens) {
    const tokenColors: Array<[string, string, "bg" | "text"]> = [
      ["background-primary", resolvedTokens.colors.background.primary, "bg"],
      ["background-secondary", resolvedTokens.colors.background.secondary, "bg"],
      ...resolvedTokens.colors.background.accent.map((value, index) => [`background-accent-${index + 1}`, value, "bg"] as [string, string, "bg"]),
      ["text-primary", resolvedTokens.colors.text.primary, "text"],
      ["text-secondary", resolvedTokens.colors.text.secondary, "text"],
      ["text-muted", resolvedTokens.colors.text.muted, "text"],
    ];
    for (const [key, source, prefix] of tokenColors) {
      const value = resolveColorUtility(source, `colors.${key}`, prefix, diagnostics);
      if (value) colors[`--color-${key}`] = value;
    }

    const borderColor = resolveColorUtility(resolvedTokens.border.color, "colors.border", "border", diagnostics);
    if (borderColor) colors["--color-border"] = borderColor;

    for (const [name, source] of Object.entries(resolvedTokens.colors.button)) {
      const safeName = cssIdentifier(name);
      const background = resolveColorUtility(source, `colors.button.${name}.background`, "bg", diagnostics, false);
      if (background) colors[`--color-button-${safeName}-background`] = background;
      const foreground = resolveColorUtility(source, `colors.button.${name}.foreground`, "text", diagnostics, false);
      if (foreground) colors[`--color-button-${safeName}-foreground`] = foreground;
      const border = resolveColorUtility(source, `colors.button.${name}.border`, "border", diagnostics, false);
      if (border) colors[`--color-button-${safeName}-border`] = border;
      const gradient = resolveGradientValue(source, `colors.button.${name}.background-image`, diagnostics);
      if (gradient) {
        utilityBlocks.push(`@utility bg-button-${safeName} {\n  background-image: ${cssValue(gradient)};\n}`);
      }
    }
  } else {
    addUnsupported(diagnostics, "tokens", style.slug, "No StyleTokens were supplied or registered for this style.");
  }

  if (resolvedTokens) {
    const heading = resolveFontFamily(resolvedTokens.typography.heading, diagnostics, "typography.fontFamily.heading");
    const body = resolveFontFamily(resolvedTokens.typography.body, diagnostics, "typography.fontFamily.body");
    const monoSource = resolvedTokens.typography.mono ?? resolvedTokens.typography.body;
    const mono = resolveFontFamily(monoSource, diagnostics, "typography.fontFamily.mono");
    if (heading) fonts["--font-heading"] = heading;
    else if (body) {
      fonts["--font-heading"] = body;
      addFallback(diagnostics, "typography.fontFamily.heading", resolvedTokens.typography.heading, "No heading family is specified; the body family is used because headings inherit it.");
    } else addUnsupported(diagnostics, "typography.fontFamily.heading", resolvedTokens.typography.heading, "No concrete font-family utility is present.");
    if (body) fonts["--font-body"] = body;
    else addUnsupported(diagnostics, "typography.fontFamily.body", resolvedTokens.typography.body, "No concrete font-family utility is present.");
    if (mono) fonts["--font-mono"] = mono;
    else addUnsupported(diagnostics, "typography.fontFamily.mono", resolvedTokens.typography.mono ?? resolvedTokens.typography.body, "No concrete monospace font-family utility is present.");

    for (const [name, source] of [
      ["heading", resolvedTokens.typography.heading],
      ["body", resolvedTokens.typography.body],
      ["mono", resolvedTokens.typography.mono ?? ""],
    ] as Array<[string, string]>) {
      const weight = resolveFontWeight(source, diagnostics, `typography.fontWeight.${name}`);
      if (weight) {
        fontWeights[`--font-weight-${fontWeightName(weight)}`] = weight;
      }
    }

    for (const [key, source] of Object.entries(resolvedTokens.typography.sizes)) {
      const result = resolveUtilityValue(source, `typography.fontSize.${key}`, ["text"], resolveFontSizeUtility, diagnostics);
      if (result.value) fontSizes[`--text-${cssIdentifier(key)}`] = result.value;
      for (const item of result.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--text-${cssIdentifier(key)}`, item.value);
        responsive.set(item.query, declarations);
      }
    }

    for (const [tokenPath, name, prefixes] of SPACING_ENTRIES) {
      const source = tokenPath.startsWith("gap.")
        ? resolvedTokens.spacing.gap[tokenPath.slice("gap.".length) as "sm" | "md" | "lg"]
        : resolvedTokens.spacing[tokenPath as "section" | "container" | "card"];
      const result = resolveSpacingValue(source, `spacing.${tokenPath}`, [...prefixes], diagnostics);
      if (result.value) spacing[`--spacing-${cssIdentifier(name)}`] = result.value;
      for (const item of result.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--spacing-${cssIdentifier(name)}`, item.value);
        responsive.set(item.query, declarations);
      }
    }

    const radius = resolveRadiusUtilityValue(resolvedTokens.border.radius, "border.radius", diagnostics);
    if (radius.value) radii["--radius-style"] = radius.value;
    for (const item of radius.responsive) {
      const declarations = responsive.get(item.query) ?? new Map<string, string>();
      declarations.set("--radius-style", item.value);
      responsive.set(item.query, declarations);
    }

    const borderWidth = resolveUtilityValue(
      resolvedTokens.border.width,
      "border.width",
      ["border"],
      (utility) => {
        if (utility === "border") return "1px";
        const suffix = utility.startsWith("border-") ? utility.slice(7) : "";
        const arbitrary = suffix.match(/^\[(.+)\]$/);
        const candidate = arbitrary ? arbitrary[1] : suffix;
        return /^\d+(?:px|rem)?$/.test(candidate)
          ? candidate.endsWith("px") || candidate.endsWith("rem") ? candidate : `${candidate}px`
          : null;
      },
      diagnostics,
    );
    if (borderWidth.value) borderWidths["--border-width-style"] = borderWidth.value;
    for (const item of borderWidth.responsive) {
      const declarations = responsive.get(item.query) ?? new Map<string, string>();
      declarations.set("--border-width-style", item.value);
      responsive.set(item.query, declarations);
    }

    const shadowEntries: Array<[string, string, string[]]> = [
      ["sm", resolvedTokens.shadow.sm, []],
      ["md", resolvedTokens.shadow.md, []],
      ["lg", resolvedTokens.shadow.lg, []],
      ["none", resolvedTokens.shadow.none, []],
      ["hover", resolvedTokens.shadow.hover, ["hover"]],
      ["focus", resolvedTokens.shadow.focus, ["focus"]],
      ...Object.entries(resolvedTokens.shadow.colored ?? {}).map(([name, value]) => [`colored-${name}`, value, []] as [string, string, string[]]),
    ];
    for (const [key, source, states] of shadowEntries) {
      const result = resolveUtilityValue(source, `shadow.${key}`, ["shadow"], resolveShadowValue, diagnostics, states);
      if (result.value) shadows[`--shadow-${cssIdentifier(key)}`] = result.value;
      for (const item of result.responsive) {
        const declarations = responsive.get(item.query) ?? new Map<string, string>();
        declarations.set(`--shadow-${cssIdentifier(key)}`, item.value);
        responsive.set(item.query, declarations);
      }
    }
  }

  const sections = [
    `@import "tailwindcss";`,
    `/* ${commentText(style.name)} (${commentText(style.nameEn)}) tokens generated by StyleKit. */`,
    `@theme {\n${Object.entries({ ...colors, ...fonts, ...fontWeights, ...fontSizes, ...spacing, ...radii, ...borderWidths, ...shadows })
      .map(([name, value]) => `  ${name}: ${cssValue(value)};`)
      .join("\n")}\n}`,
    ...[...responsive.entries()].map(([query, declarations]) =>
      `@media ${query} {\n  :root {\n${[...declarations.entries()].map(([name, value]) => `    ${name}: ${cssValue(value)};`).join("\n")}\n  }\n}`,
    ),
    ...utilityBlocks,
  ];
  return { css: `${sections.filter((section) => !section.endsWith("{\n\n}")).join("\n\n")}\n`, diagnostics };
}

export function generateTailwindThemeCSSExport(style: DesignStyle, tokens?: StyleTokens): TailwindThemeCSSExport {
  return createThemeCSSExport(style, tokens);
}

export function generateTailwindThemeCSS(style: DesignStyle, tokens?: StyleTokens): string {
  return createThemeCSSExport(style, tokens).css;
}

export function serializeTailwindDiagnostics(diagnostics: ExportDiagnostics, styleSlug: string) {
  return {
    schemaVersion: 1,
    generatedBy: "StyleKit" as const,
    styleSlug,
    fallbacks: diagnostics.fallbacks,
    unsupported: diagnostics.unsupported,
  };
}

export type { ExportDiagnostic };
