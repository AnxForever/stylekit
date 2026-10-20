import { resolveTwColorCss, twRadiusToRem } from "./color-resolve";

export interface ExportDiagnostic {
  path: string;
  source: string;
  reason: string;
}

export interface ExportDiagnostics {
  fallbacks: ExportDiagnostic[];
  unsupported: ExportDiagnostic[];
}

export interface ResolvedUtilityValue {
  value?: string;
  responsive: Array<{ query: string; value: string; source: string }>;
}

export function createExportDiagnostics(): ExportDiagnostics {
  return { fallbacks: [], unsupported: [] };
}

export function addUnsupported(
  diagnostics: ExportDiagnostics,
  path: string,
  source: string,
  reason: string,
): void {
  if (diagnostics.unsupported.some((item) => item.path === path && item.source === source && item.reason === reason)) return;
  diagnostics.unsupported.push({ path, source, reason });
}

export function addFallback(
  diagnostics: ExportDiagnostics,
  path: string,
  source: string,
  reason: string,
): void {
  if (diagnostics.fallbacks.some((item) => item.path === path && item.source === source && item.reason === reason)) return;
  diagnostics.fallbacks.push({ path, source, reason });
}

function splitClasses(source: string): string[] {
  const classes: string[] = [];
  let start = 0;
  let brackets = 0;
  let parentheses = 0;
  let quote = "";
  let escaped = false;

  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (quote) {
      if (char === quote) quote = "";
      continue;
    }
    if (char === "'" || char === '"') {
      quote = char;
      continue;
    }
    if (char === "[") brackets++;
    else if (char === "]") brackets = Math.max(0, brackets - 1);
    else if (char === "(") parentheses++;
    else if (char === ")") parentheses = Math.max(0, parentheses - 1);
    else if (/\s/.test(char) && brackets === 0 && parentheses === 0) {
      if (source.slice(start, index)) classes.push(source.slice(start, index));
      start = index + 1;
    }
  }
  if (source.slice(start)) classes.push(source.slice(start));
  return classes;
}

function splitModifiers(className: string): { modifiers: string[]; utility: string } {
  const pieces: string[] = [];
  let start = 0;
  let brackets = 0;
  let parentheses = 0;
  let escaped = false;
  for (let index = 0; index < className.length; index++) {
    const char = className[index];
    if (escaped) {
      escaped = false;
      continue;
    }
    if (char === "\\") {
      escaped = true;
      continue;
    }
    if (char === "[") brackets++;
    else if (char === "]") brackets = Math.max(0, brackets - 1);
    else if (char === "(") parentheses++;
    else if (char === ")") parentheses = Math.max(0, parentheses - 1);
    else if (char === ":" && brackets === 0 && parentheses === 0) {
      pieces.push(className.slice(start, index));
      start = index + 1;
    }
  }
  const utility = className.slice(start);
  return { modifiers: pieces, utility };
}

function decodeArbitrary(value: string): string {
  return value.replace(/\\_/g, "\u0000").replace(/_/g, " ").replace(/\u0000/g, "_");
}

const STANDARD_BREAKPOINTS: Record<string, string> = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
};

function responsiveQuery(modifiers: string[]): string | null {
  if (modifiers.length !== 1) return null;
  const modifier = modifiers[0];
  const standard = STANDARD_BREAKPOINTS[modifier];
  if (standard) return `(min-width: ${standard})`;

  const min = modifier.match(/^min-\[(.+)\]$/);
  if (min) return `(min-width: ${decodeArbitrary(min[1])})`;
  const max = modifier.match(/^max-\[(.+)\]$/);
  if (max) return `(max-width: ${decodeArbitrary(max[1])})`;
  return null;
}

function isColorUtility(utility: string, prefix: "bg" | "text" | "border"): boolean {
  if (prefix === "bg") return utility.startsWith("bg-") && !utility.startsWith("bg-gradient-") && !utility.startsWith("bg-linear-");
  if (prefix === "text") return utility.startsWith("text-");
  if (!utility.startsWith("border-")) return false;
  const arbitrary = utility.match(/^border-\[(.+)\]$/);
  if (arbitrary && /^-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em|%)$/.test(arbitrary[1])) return false;
  return !/^border-\d/.test(utility);
}

export function resolveColorUtility(
  source: string,
  path: string,
  prefix: "bg" | "text" | "border",
  diagnostics: ExportDiagnostics,
  required = true,
): string | undefined {
  const candidates = splitClasses(source).map((raw) => ({ raw, ...splitModifiers(raw) }))
    .filter(({ utility }) => isColorUtility(utility, prefix));

  const resolved: Array<{ value: string; modifiers: string[]; raw: string }> = [];
  for (const candidate of candidates) {
    const value = resolveTwColorCss(candidate.utility);
    if (!value) {
      addUnsupported(diagnostics, path, candidate.raw, "The color utility is not a concrete color value.");
      continue;
    }
    resolved.push({ value, modifiers: candidate.modifiers, raw: candidate.raw });
  }

  const base = resolved.filter((item) => item.modifiers.length === 0);
  const distinct = [...new Set(base.map((item) => item.value))];
  let value: string | undefined;
  if (distinct.length === 1) value = distinct[0];
  else if (distinct.length > 1) {
    addUnsupported(diagnostics, path, base.map((item) => item.raw).join(" "), "Conflicting base colors cannot be represented as one semantic color token.");
  }

  for (const item of resolved.filter((candidate) => candidate.modifiers.length > 0)) {
    const query = responsiveQuery(item.modifiers);
    addUnsupported(
      diagnostics,
      path,
      item.raw,
      query
        ? `Responsive color value ${item.value} is not represented by a static Figma color token.`
        : "State or selector-specific colors are not represented by a static Figma color token.",
    );
  }

  if (!value && candidates.length === 0) {
    const gradient = prefix === "bg" && /(?:^|\s)bg-(?:gradient|linear)-/.test(source);
    if (gradient || required) {
      addUnsupported(
        diagnostics,
        path,
        source,
        gradient
          ? "A gradient background is not a single Figma color token."
          : "No concrete color utility was found for this semantic token.",
      );
    }
  }
  return value;
}

export function resolveGradientValue(
  source: string,
  path: string,
  diagnostics: ExportDiagnostics,
): string | undefined {
  const parsed = splitClasses(source).map((raw) => ({ raw, ...splitModifiers(raw) }));
  const direction = parsed.find(({ utility, modifiers }) =>
    modifiers.length === 0 && /^(?:bg-gradient-to-|bg-linear-to-)/.test(utility),
  );
  if (!direction) return undefined;

  const suffix = direction.utility.replace(/^bg-(?:gradient|linear)-to-/, "");
  const directionMap: Record<string, string> = {
    t: "top",
    tr: "top right",
    r: "right",
    br: "bottom right",
    b: "bottom",
    bl: "bottom left",
    l: "left",
    tl: "top left",
  };
  const cssDirection = directionMap[suffix];
  if (!cssDirection) {
    addUnsupported(diagnostics, path, direction.raw, "The gradient direction is not supported by this export.");
    return undefined;
  }

  const stops: string[] = [];
  for (const [prefix, label] of [["from", "start"], ["via", "middle"], ["to", "end"]] as const) {
    const stop = parsed.find(({ utility, modifiers }) => modifiers.length === 0 && utility.startsWith(`${prefix}-`));
    if (!stop) continue;
    const color = resolveTwColorCss(stop.utility);
    if (!color) {
      addUnsupported(diagnostics, `${path}.${label}`, stop.raw, "The gradient stop is not a concrete color.");
      continue;
    }
    stops.push(color);
  }
  if (stops.length < 2) {
    addUnsupported(diagnostics, path, source, "A gradient requires at least two resolvable color stops.");
    return undefined;
  }
  return `linear-gradient(to ${cssDirection}, ${stops.join(", ")})`;
}

function parseArbitraryUtility(utility: string, prefix: string): string | null {
  if (!utility.startsWith(`${prefix}-`)) return null;
  const suffix = utility.slice(prefix.length + 1);
  const arbitrary = suffix.match(/^\[(.+)\]$/);
  return arbitrary ? decodeArbitrary(arbitrary[1]) : null;
}

function numericRem(value: string): string | null {
  if (value === "0") return "0rem";
  if (/^-?(?:\d+\.?\d*|\.\d+)(?:px|rem)$/.test(value)) return value;
  return null;
}

function spacingUtilityValue(utility: string, prefixes: string[]): string | null {
  for (const prefix of [...prefixes].sort((a, b) => b.length - a.length)) {
    const raw = parseArbitraryUtility(utility, prefix);
    if (raw !== null) return numericRem(raw);
    const suffix = utility === prefix ? "0" : utility.startsWith(`${prefix}-`) ? utility.slice(prefix.length + 1) : "";
    if (!suffix) continue;
    if (suffix === "px") return "1px";
    if (/^-?(?:\d+\.?\d*|\.\d+)$/.test(suffix)) {
      const number = Number.parseFloat(suffix);
      return `${number * 0.25}rem`;
    }
  }
  return null;
}

export function resolveUtilityValue(
  source: string,
  path: string,
  prefixes: string[],
  resolver: (utility: string) => string | null,
  diagnostics: ExportDiagnostics,
  allowedStateModifiers: string[] = [],
): ResolvedUtilityValue {
  const candidates = splitClasses(source).map((raw) => ({ raw, ...splitModifiers(raw) }))
    .filter(({ utility }) => prefixes.some((prefix) => utility === prefix || utility.startsWith(`${prefix}-`)));

  const resolved = candidates.map((candidate) => ({
    ...candidate,
    effectiveModifiers: candidate.modifiers.filter((modifier) => !allowedStateModifiers.includes(modifier)),
    value: resolver(candidate.utility),
  }));
  for (const candidate of resolved.filter((item) => item.value === null)) {
    addUnsupported(diagnostics, path, candidate.raw, "This utility value could not be resolved to a concrete CSS value.");
  }

  const concrete = resolved.filter((item): item is typeof item & { value: string } => item.value !== null);
  const base = concrete.filter((item) => item.effectiveModifiers.length === 0);
  const baseValues = [...new Set(base.map((item) => item.value))];
  let value: string | undefined;
  if (baseValues.length === 1) value = baseValues[0];
  else if (baseValues.length > 1) {
    addUnsupported(diagnostics, path, base.map((item) => item.raw).join(" "), "Conflicting base utility values cannot be represented by one token.");
  }

  const responsiveCandidates: Array<{ item: typeof concrete[number]; query: string }> = [];
  for (const candidate of concrete.filter((item) => item.effectiveModifiers.length > 0)) {
    const query = responsiveQuery(candidate.effectiveModifiers);
    if (!query) {
      addUnsupported(diagnostics, path, candidate.raw, "State or selector-specific values are not represented as a static token value.");
      continue;
    }
    responsiveCandidates.push({ item: candidate, query });
  }

  const responsive: ResolvedUtilityValue["responsive"] = [];
  const byQuery = new Map<string, typeof responsiveCandidates>();
  for (const candidate of responsiveCandidates) {
    const group = byQuery.get(candidate.query) ?? [];
    group.push(candidate);
    byQuery.set(candidate.query, group);
  }
  for (const [query, group] of byQuery) {
    const distinctValues = [...new Set(group.map(({ item }) => item.value))];
    if (distinctValues.length > 1) {
      addUnsupported(
        diagnostics,
        path,
        group.map(({ item }) => item.raw).join(" "),
        `Conflicting responsive values target ${query} and cannot be resolved deterministically.`,
      );
      continue;
    }
    const first = group[0];
    responsive.push({ query, value: first.item.value, source: group.map(({ item }) => item.raw).join(" ") });
  }

  if (!value && responsive.length > 0) {
    addUnsupported(diagnostics, path, source, "No unmodified base utility exists; a responsive value cannot stand alone.");
  } else if (!value && candidates.length === 0) {
    addUnsupported(diagnostics, path, source, "No supported utility was found for this token.");
  }

  return { value, responsive };
}

export function resolveSpacingValue(
  source: string,
  path: string,
  prefixes: string[],
  diagnostics: ExportDiagnostics,
): ResolvedUtilityValue {
  return resolveUtilityValue(
    source,
    path,
    prefixes,
    (utility) => spacingUtilityValue(utility, prefixes),
    diagnostics,
  );
}

export function resolveRadiusUtilityValue(
  source: string,
  path: string,
  diagnostics: ExportDiagnostics,
): ResolvedUtilityValue {
  return resolveUtilityValue(
    source,
    path,
    ["rounded"],
    (utility) => {
      const value = twRadiusToRem(utility);
      return value && /^-?(?:\d+\.?\d*|\.\d+)(?:px|rem)$/.test(value) ? value : null;
    },
    diagnostics,
  );
}

const FONT_FAMILIES: Record<string, string> = {
  "font-sans": "ui-sans-serif, system-ui, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji'",
  "font-serif": "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
  "font-mono": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
};

function resolveFontFamilyUtility(utility: string): string | null {
  if (FONT_FAMILIES[utility]) return FONT_FAMILIES[utility];
  const arbitrary = parseArbitraryUtility(utility, "font");
  if (arbitrary?.startsWith("family-name:") || arbitrary?.startsWith("family:")) {
    const family = decodeArbitrary(arbitrary.replace(/^family(?:-name)?:/, ""));
    if (/\bvar\(/i.test(family) || /^(?:inherit|initial|unset|revert)$/i.test(family)) return null;
    return family;
  }
  return null;
}

function resolveMappedFontUtility(
  source: string,
  path: string,
  diagnostics: ExportDiagnostics | undefined,
  resolver: (utility: string) => string | null,
  field: "font-family" | "font-weight",
): string | null {
  const matches: Array<{ raw: string; modifiers: string[]; value: string }> = [];
  for (const raw of splitClasses(source)) {
    const { modifiers, utility } = splitModifiers(raw);
    const value = resolver(utility);
    if (value === null) continue;
    if (modifiers.length === 0) matches.push({ raw, modifiers, value });
    else if (diagnostics) {
      const query = responsiveQuery(modifiers);
      addUnsupported(
        diagnostics,
        path,
        raw,
        query
          ? `Responsive ${field} values are not emitted as static token values (${query}).`
          : `State or selector-specific ${field} values are not emitted as static token values.`,
      );
    }
  }

  const values = [...new Set(matches.map((match) => match.value))];
  if (values.length > 1) {
    if (diagnostics) {
      addUnsupported(
        diagnostics,
        path,
        matches.map((match) => match.raw).join(" "),
        `Conflicting base ${field} utilities cannot be represented by one token value.`,
      );
    }
    return null;
  }
  return values[0] ?? null;
}

export function resolveFontFamily(
  source: string,
  diagnostics?: ExportDiagnostics,
  path = "typography.fontFamily",
): string | null {
  return resolveMappedFontUtility(source, path, diagnostics, resolveFontFamilyUtility, "font-family");
}

const FONT_WEIGHTS: Record<string, string> = {
  "font-thin": "100",
  "font-extralight": "200",
  "font-light": "300",
  "font-normal": "400",
  "font-medium": "500",
  "font-semibold": "600",
  "font-bold": "700",
  "font-extrabold": "800",
  "font-black": "900",
};

const FONT_WEIGHT_NAMES: Record<string, string> = {
  "100": "thin",
  "200": "extralight",
  "300": "light",
  "400": "normal",
  "500": "medium",
  "600": "semibold",
  "700": "bold",
  "800": "extrabold",
  "900": "black",
};

export function fontWeightName(value: string): string {
  return FONT_WEIGHT_NAMES[value] ?? value;
}

function resolveFontWeightUtility(utility: string): string | null {
  if (FONT_WEIGHTS[utility]) return FONT_WEIGHTS[utility];
  const arbitrary = parseArbitraryUtility(utility, "font");
  return arbitrary && /^\d{1,4}$/.test(arbitrary) ? arbitrary : null;
}

export function resolveFontWeight(
  source: string,
  diagnostics?: ExportDiagnostics,
  path = "typography.fontWeight",
): string | null {
  return resolveMappedFontUtility(source, path, diagnostics, resolveFontWeightUtility, "font-weight");
}

const FONT_SIZES: Record<string, string> = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "1.25rem",
  "2xl": "1.5rem",
  "3xl": "1.875rem",
  "4xl": "2.25rem",
  "5xl": "3rem",
  "6xl": "3.75rem",
  "7xl": "4.5rem",
  "8xl": "6rem",
  "9xl": "8rem",
};

export function resolveFontSizeUtility(utility: string): string | null {
  if (!utility.startsWith("text-")) return null;
  const suffix = utility.slice(5);
  if (FONT_SIZES[suffix]) return FONT_SIZES[suffix];
  const arbitrary = suffix.match(/^\[(.+)\]$/);
  if (!arbitrary) return null;
  return numericRem(decodeArbitrary(arbitrary[1]));
}

function splitTopLevel(source: string, delimiter: string): string[] {
  const parts: string[] = [];
  let start = 0;
  let parentheses = 0;
  let brackets = 0;
  for (let index = 0; index < source.length; index++) {
    const char = source[index];
    if (char === "(") parentheses++;
    else if (char === ")") parentheses = Math.max(0, parentheses - 1);
    else if (char === "[") brackets++;
    else if (char === "]") brackets = Math.max(0, brackets - 1);
    else if (char === delimiter && parentheses === 0 && brackets === 0) {
      parts.push(source.slice(start, index).trim());
      start = index + 1;
    }
  }
  parts.push(source.slice(start).trim());
  return parts.filter(Boolean);
}

function splitShadowParts(layer: string): string[] {
  const parts: string[] = [];
  let start = 0;
  let parentheses = 0;
  for (let index = 0; index < layer.length; index++) {
    const char = layer[index];
    if (char === "(") parentheses++;
    else if (char === ")") parentheses = Math.max(0, parentheses - 1);
    else if (/\s/.test(char) && parentheses === 0) {
      if (layer.slice(start, index).trim()) parts.push(layer.slice(start, index).trim());
      start = index + 1;
    }
  }
  if (layer.slice(start).trim()) parts.push(layer.slice(start).trim());
  return parts;
}

function isCssColor(value: string): boolean {
  return /^(?:#[\da-f]{3,8}|rgba?\(|hsla?\(|oklch\(|transparent$|black$|white$)/i.test(value);
}

function parseShadowLayer(source: string): Record<string, string> | null {
  const parts = splitShadowParts(source);
  const inset = parts[0] === "inset";
  if (inset) parts.shift();
  const colorIndex = parts.findIndex(isCssColor);
  if (colorIndex < 0) return null;
  const lengths = parts.slice(0, colorIndex);
  if (lengths.length < 2 || lengths.length > 4 || lengths.some((part) => !/^-?(?:\d+\.?\d*|\.\d+)(?:px|rem|em)?$/.test(part))) return null;
  const toDimension = (value: string | undefined): string => {
    if (!value || value === "0") return "0px";
    return /(?:px|rem|em)$/.test(value) ? value : `${value}px`;
  };
  return {
    x: toDimension(lengths[0]),
    y: toDimension(lengths[1]),
    blur: toDimension(lengths[2]),
    spread: toDimension(lengths[3]),
    color: parts.slice(colorIndex).join(" "),
    type: inset ? "innerShadow" : "dropShadow",
  };
}

const TAILWIND_SHADOWS: Record<string, string> = {
  DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
  none: "0 0 #0000",
};

export function resolveShadowValue(utility: string): string | null {
  if (utility === "shadow") return TAILWIND_SHADOWS.DEFAULT;
  if (!utility.startsWith("shadow-")) return null;
  const suffix = utility.slice("shadow-".length);
  const arbitrary = suffix.match(/^\[(.+)\]$/);
  if (arbitrary) return decodeArbitrary(arbitrary[1]);
  return TAILWIND_SHADOWS[suffix] ?? null;
}

export function parseShadowValue(value: string): Array<Record<string, string>> | null {
  if (value === "0 0 #0000") return [{ x: "0px", y: "0px", blur: "0px", spread: "0px", color: "transparent", type: "dropShadow" }];
  const layers = splitTopLevel(value, ",").map(parseShadowLayer);
  return layers.length > 0 && layers.every((layer) => layer !== null)
    ? layers as Array<Record<string, string>>
    : null;
}
