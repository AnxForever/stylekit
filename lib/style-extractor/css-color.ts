export type CssVariableMap = Record<string, string>;

const HEX_COLOR_PATTERN = /^#(?:[0-9a-f]{3}|[0-9a-f]{4}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

export function extractCssVariablesFromText(cssText: string): CssVariableMap {
  const vars: CssVariableMap = {};
  const css = stripCssComments(cssText);

  // Best-effort: capture "--token: value;" declarations without a full CSS parser.
  const re = /(--[a-zA-Z0-9_-]+)\s*:\s*([^;{}]+);/g;
  for (const match of css.matchAll(re)) {
    const name = match[1]?.trim();
    const rawValue = match[2]?.trim();
    if (!name || !rawValue) continue;

    const value = stripImportant(rawValue);
    if (value) vars[name] = value;
  }

  return vars;
}

export function resolveCssValue(
  value: string | undefined,
  variables?: CssVariableMap,
  options?: { maxDepth?: number }
): string | undefined {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (!trimmed) return undefined;
  if (!variables || Object.keys(variables).length === 0) return trimmed;

  const resolved = resolveCssVarFunction(trimmed, variables, {
    maxDepth: options?.maxDepth ?? 8,
    visited: new Set<string>(),
  });

  return resolved ?? trimmed;
}

export function normalizeCssColorToHex(
  value: string | undefined,
  variables?: CssVariableMap
): string | undefined {
  const resolved = resolveCssValue(value, variables);
  if (!resolved) return undefined;

  const normalized = resolved.trim().toLowerCase();

  if (HEX_COLOR_PATTERN.test(normalized)) {
    // #rgb / #rgba
    if (normalized.length === 4 || normalized.length === 5) {
      const r = normalized[1];
      const g = normalized[2];
      const b = normalized[3];
      return `#${r}${r}${g}${g}${b}${b}`;
    }

    // #rrggbbaa (drop alpha for broad compatibility, including <input type="color">)
    if (normalized.length === 9) {
      return normalized.slice(0, 7);
    }

    return normalized;
  }

  const rgb = parseRgbFunction(normalized);
  if (rgb) return rgbToHex(rgb.r, rgb.g, rgb.b);

  const hsl = parseHslFunction(normalized);
  if (hsl) {
    const rgbFromHsl = hslToRgb(hsl.h, hsl.s, hsl.l);
    return rgbToHex(rgbFromHsl.r, rgbFromHsl.g, rgbFromHsl.b);
  }

  const oklch = parseOklchFunction(normalized);
  if (oklch) {
    const rgbFromOklch = oklchToRgb(oklch.l, oklch.c, oklch.h);
    return rgbToHex(rgbFromOklch.r, rgbFromOklch.g, rgbFromOklch.b);
  }

  return undefined;
}

function resolveCssVarFunction(
  value: string,
  variables: CssVariableMap,
  state: { maxDepth: number; visited: Set<string> }
): string | undefined {
  const trimmed = value.trim();
  if (!/^var\s*\(/i.test(trimmed)) return undefined;

  const inside = extractFunctionContents(trimmed);
  if (inside === null) return undefined;

  const parts = splitTopLevel(inside, ",").map((part) => part.trim()).filter(Boolean);
  const name = parts[0];
  const fallback = parts.slice(1).join(",").trim();

  if (!name || !name.startsWith("--")) {
    return fallback ? resolveCssValue(fallback, variables, { maxDepth: state.maxDepth }) : undefined;
  }

  if (state.visited.has(name)) {
    return fallback ? resolveCssValue(fallback, variables, { maxDepth: state.maxDepth }) : undefined;
  }

  const raw = variables[name];
  if (!raw) {
    return fallback ? resolveCssValue(fallback, variables, { maxDepth: state.maxDepth }) : undefined;
  }

  const next = stripImportant(raw).trim();
  if (!next) {
    return fallback ? resolveCssValue(fallback, variables, { maxDepth: state.maxDepth }) : undefined;
  }

  if (state.maxDepth <= 0) return next;

  state.visited.add(name);
  try {
    // Resolve nested var() references if the variable value is itself a var() call.
    if (/^var\s*\(/i.test(next)) {
      return resolveCssVarFunction(next, variables, {
        maxDepth: state.maxDepth - 1,
        visited: state.visited,
      }) ?? next;
    }
    return next;
  } finally {
    state.visited.delete(name);
  }
}

function extractFunctionContents(value: string): string | null {
  const open = value.indexOf("(");
  const close = value.lastIndexOf(")");
  if (open < 0 || close < 0 || close <= open) return null;
  return value.slice(open + 1, close);
}

function splitTopLevel(input: string, separator: string): string[] {
  const chunks: string[] = [];
  let depth = 0;
  let start = 0;

  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "(") depth += 1;
    else if (ch === ")") depth = Math.max(0, depth - 1);
    else if (depth === 0 && ch === separator) {
      chunks.push(input.slice(start, i));
      start = i + 1;
    }
  }

  chunks.push(input.slice(start));
  return chunks;
}

function tokenizeFunctionArgs(raw: string): string[] {
  return raw
    .replace(/,/g, " ")
    .replace(/\//g, " / ")
    .trim()
    .split(/\s+/g)
    .filter(Boolean);
}

function parseRgbFunction(
  normalized: string
): { r: number; g: number; b: number; a: number } | null {
  const fn = normalized.match(/^rgba?\((.*)\)$/i);
  if (!fn?.[1]) return null;

  const tokens = tokenizeFunctionArgs(fn[1]);
  if (tokens.length < 3) return null;

  const r = parseRgbChannel(tokens[0]);
  const g = parseRgbChannel(tokens[1]);
  const b = parseRgbChannel(tokens[2]);
  if (r === null || g === null || b === null) return null;

  let alpha = 1;
  const slashIndex = tokens.indexOf("/");
  if (slashIndex >= 0 && tokens[slashIndex + 1]) {
    alpha = parseAlpha(tokens[slashIndex + 1]) ?? 1;
  } else if (tokens.length >= 4) {
    alpha = parseAlpha(tokens[3]) ?? 1;
  }

  return { r, g, b, a: alpha };
}

function parseHslFunction(
  normalized: string
): { h: number; s: number; l: number; a: number } | null {
  const fn = normalized.match(/^hsla?\((.*)\)$/i);
  if (!fn?.[1]) return null;

  const tokens = tokenizeFunctionArgs(fn[1]);
  if (tokens.length < 3) return null;

  const h = parseAngle(tokens[0]);
  const s = parsePercent(tokens[1]);
  const l = parsePercent(tokens[2]);
  if (h === null || s === null || l === null) return null;

  let alpha = 1;
  const slashIndex = tokens.indexOf("/");
  if (slashIndex >= 0 && tokens[slashIndex + 1]) {
    alpha = parseAlpha(tokens[slashIndex + 1]) ?? 1;
  } else if (tokens.length >= 4) {
    alpha = parseAlpha(tokens[3]) ?? 1;
  }

  return { h, s, l, a: alpha };
}

function parseOklchFunction(
  normalized: string
): { l: number; c: number; h: number; a: number } | null {
  const fn = normalized.match(/^oklch\((.*)\)$/i);
  if (!fn?.[1]) return null;

  const tokens = tokenizeFunctionArgs(fn[1]);
  if (tokens.length < 3) return null;

  const l = parsePercentOrNumber(tokens[0], { scalePercentToOne: true });
  const c = parseNumber(tokens[1]);
  const h = parseAngle(tokens[2]);
  if (l === null || c === null || h === null) return null;

  let alpha = 1;
  const slashIndex = tokens.indexOf("/");
  if (slashIndex >= 0 && tokens[slashIndex + 1]) {
    alpha = parseAlpha(tokens[slashIndex + 1]) ?? 1;
  } else if (tokens.length >= 4) {
    alpha = parseAlpha(tokens[3]) ?? 1;
  }

  return { l, c, h, a: alpha };
}

function parseRgbChannel(token: string): number | null {
  const raw = token.trim();
  if (!raw) return null;
  if (raw.endsWith("%")) {
    const percent = Number(raw.slice(0, -1));
    if (!Number.isFinite(percent)) return null;
    return clamp(Math.round((percent / 100) * 255), 0, 255);
  }
  const num = Number(raw);
  if (!Number.isFinite(num)) return null;
  return clamp(Math.round(num), 0, 255);
}

function parseAlpha(token: string): number | null {
  const raw = token.trim();
  if (!raw) return null;
  if (raw.endsWith("%")) {
    const percent = Number(raw.slice(0, -1));
    if (!Number.isFinite(percent)) return null;
    return clamp(percent / 100, 0, 1);
  }
  const num = Number(raw);
  if (!Number.isFinite(num)) return null;
  return clamp(num, 0, 1);
}

function parsePercent(token: string): number | null {
  const raw = token.trim();
  if (!raw.endsWith("%")) return null;
  const percent = Number(raw.slice(0, -1));
  if (!Number.isFinite(percent)) return null;
  return clamp(percent / 100, 0, 1);
}

function parsePercentOrNumber(
  token: string,
  options: { scalePercentToOne: boolean }
): number | null {
  const raw = token.trim();
  if (!raw) return null;
  if (raw.endsWith("%")) {
    const percent = Number(raw.slice(0, -1));
    if (!Number.isFinite(percent)) return null;
    const scaled = options.scalePercentToOne ? percent / 100 : percent;
    return clamp(scaled, 0, 1);
  }
  return parseNumber(raw);
}

function parseNumber(token: string): number | null {
  const num = Number(token.trim());
  return Number.isFinite(num) ? num : null;
}

function parseAngle(token: string): number | null {
  const raw = token.trim().toLowerCase();
  if (!raw) return null;

  const match = raw.match(/^(-?\d*\.?\d+)(deg|rad|grad|turn)?$/);
  if (!match?.[1]) return null;

  const value = Number(match[1]);
  if (!Number.isFinite(value)) return null;

  const unit = match[2] ?? "deg";
  const degrees =
    unit === "deg"
      ? value
      : unit === "grad"
        ? value * 0.9
        : unit === "turn"
          ? value * 360
          : value * (180 / Math.PI);

  // Wrap hue into [0, 360)
  const wrapped = ((degrees % 360) + 360) % 360;
  return wrapped;
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const hue = ((h % 360) + 360) % 360 / 360;

  if (s === 0) {
    const v = Math.round(l * 255);
    return { r: v, g: v, b: v };
  }

  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  const r = hueToRgb(p, q, hue + 1 / 3);
  const g = hueToRgb(p, q, hue);
  const b = hueToRgb(p, q, hue - 1 / 3);

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

function hueToRgb(p: number, q: number, t: number): number {
  let tt = t;
  if (tt < 0) tt += 1;
  if (tt > 1) tt -= 1;
  if (tt < 1 / 6) return p + (q - p) * 6 * tt;
  if (tt < 1 / 2) return q;
  if (tt < 2 / 3) return p + (q - p) * (2 / 3 - tt) * 6;
  return p;
}

function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  const hr = (h / 180) * Math.PI;
  const a = c * Math.cos(hr);
  const b = c * Math.sin(hr);

  // OKLab to LMS
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l_ * l_ * l_;
  const m3 = m_ * m_ * m_;
  const s3 = s_ * s_ * s_;

  // LMS to linear sRGB
  const rLin = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const r = linearToSrgb(rLin);
  const g = linearToSrgb(gLin);
  const bb = linearToSrgb(bLin);

  return {
    r: clamp(Math.round(r * 255), 0, 255),
    g: clamp(Math.round(g * 255), 0, 255),
    b: clamp(Math.round(bb * 255), 0, 255),
  };
}

function linearToSrgb(value: number): number {
  const v = clamp(value, 0, 1);
  if (v <= 0.0031308) return 12.92 * v;
  return 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
}

function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

function stripCssComments(value: string): string {
  return value.replace(/\/\*[\s\S]*?\*\//g, "");
}

function stripImportant(value: string): string {
  return value.replace(/\s*!important\s*$/i, "");
}

