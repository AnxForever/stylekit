import type { ExtractedStyleDraft } from "./adapter";
import {
  extractCssVariablesFromText,
  normalizeCssColorToHex,
  resolveCssValue,
  type CssVariableMap,
} from "./css-color";

export interface UrlExtractionInput {
  url: string;
  html: string;
  cssChunks?: string[];
}

export interface UrlExtractionEvidence {
  stylesheetCount: number;
  colorCount: number;
  cssVariableCount: number;
  fontFamilyCount: number;
  borderRadiusCount: number;
  borderWidthCount: number;
  boxShadowCount: number;
  hasAnimation: boolean;
  hasGridLayout: boolean;
  hasGlassEffect: boolean;
  hasNeonEffect: boolean;
}

export interface UrlExtractionResult {
  draft: ExtractedStyleDraft;
  raw: string;
  evidence: UrlExtractionEvidence;
}

const HEX_COLOR_GLOBAL =
  /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;
const FUNCTION_COLOR_GLOBAL = /\b(?:rgb|rgba|hsl|hsla|oklch)\([^)]*\)/gi;
const CSS_VAR_GLOBAL = /var\(\s*(--[a-zA-Z0-9_-]+)\s*(?:,[^)]+)?\)/gi;
const STOPWORDS = new Set([
  "the",
  "and",
  "for",
  "with",
  "from",
  "your",
  "this",
  "that",
  "into",
  "about",
  "home",
  "page",
  "official",
  "website",
  "style",
  "design",
]);

export function extractStylesheetLinks(html: string, pageUrl: string): string[] {
  const links: string[] = [];
  const linkRegex = /<link\b[^>]*>/gi;
  const tags = html.match(linkRegex) ?? [];

  for (const tag of tags) {
    if (!/rel\s*=\s*["'][^"']*stylesheet[^"']*["']/i.test(tag)) continue;
    const hrefMatch = tag.match(/href\s*=\s*["']([^"']+)["']/i);
    if (!hrefMatch?.[1]) continue;
    try {
      const resolved = new URL(hrefMatch[1], pageUrl).toString();
      links.push(resolved);
    } catch {
      continue;
    }
  }

  return dedupe(links);
}

export function extractStyleDraftFromDocument({
  url,
  html,
  cssChunks = [],
}: UrlExtractionInput): UrlExtractionResult {
  const pageUrl = new URL(url);
  const title = extractTitle(html);
  const description = extractDescription(html);
  const textContent = extractTextContent(html);
  const inlineCss = extractInlineStyles(html);
  const cssText = [inlineCss, ...cssChunks].join("\n");
  const cssVariables = extractCssVariablesFromText(cssText);
  const combined = `${title ?? ""}\n${description ?? ""}\n${textContent}\n${cssText}`;
  const combinedLower = combined.toLowerCase();

  const colors = extractTopColors(combined, cssVariables);
  const primaryColor = colors[0];
  const secondaryColor = colors[1];
  const accentColors = colors.slice(2, 6);

  const typography = inferTypographyFromCss(cssText, cssVariables);
  const borders = inferBordersFromCss(cssText, cssVariables);
  const shadows = inferShadowsFromCss(cssText, cssVariables);

  const hasAnimation = /@keyframes|animation\s*:|transition\s*:|framer-motion|gsap|lottie/i.test(
    combined
  );
  const hasGridLayout = /display\s*:\s*(grid|flex)|grid-template|sidebar|navbar|hero/i.test(
    combined
  );
  const hasGlassEffect = /backdrop-filter|backdrop-blur|glass|frosted|rgba\([^)]*0\./i.test(
    combined
  );
  const hasNeonEffect = /neon|glow|cyberpunk|text-shadow|box-shadow/i.test(combined);

  const styleType = inferStyleType(combinedLower, hasAnimation, hasGridLayout);
  const category = inferCategory(combinedLower, hasGlassEffect, hasNeonEffect);
  const tags = inferTags(combinedLower, category, styleType);

  const normalizedTitle = normalizeTitle(title, pageUrl.hostname);
  const slug = slugify(normalizedTitle || pageUrl.hostname);
  const keywords = extractKeywords({
    title: normalizedTitle,
    description,
    hostname: pageUrl.hostname,
    textContent,
  });

  const doList = buildDoList({
    hasAnimation,
    hasGridLayout,
    hasGlassEffect,
    hasNeonEffect,
    primaryColor,
    secondaryColor,
    accentColor: accentColors[0],
  });
  const dontList = buildDontList({
    hasAnimation,
    hasGlassEffect,
  });

  const philosophy = buildPhilosophy({
    description,
    hasAnimation,
    hasGridLayout,
    hasGlassEffect,
    hasNeonEffect,
  });

  const buttonCode = generateButtonCode({
    hasAnimation,
    accentColor: accentColors[0] ?? primaryColor,
  });
  const cardCode = generateCardCode({
    secondaryColor: secondaryColor ?? "#ffffff",
    borderColor: primaryColor ?? "#111111",
  });
  const inputCode = generateInputCode({
    borderColor: primaryColor ?? "#111111",
    accentColor: accentColors[0] ?? primaryColor ?? "#111111",
  });

  const draft: ExtractedStyleDraft = {
    nameEn: normalizedTitle || undefined,
    slug: slug || undefined,
    description: description || undefined,
    category,
    styleType,
    tags,
    primaryColor,
    secondaryColor,
    accentColors: accentColors.length > 0 ? accentColors : undefined,
    keywords,
    philosophy,
    doList,
    dontList,
    buttonCode,
    cardCode,
    inputCode,
    headingFont: typography.headingFont,
    bodyFont: typography.bodyFont,
    borderRadius: borders.borderRadius,
    borderWidth: borders.borderWidth,
    shadowSm: shadows.shadowSm,
    shadowMd: shadows.shadowMd,
    shadowLg: shadows.shadowLg,
  };

  const evidence: UrlExtractionEvidence = {
    stylesheetCount: cssChunks.length + (inlineCss ? 1 : 0),
    colorCount: colors.length,
    cssVariableCount: Object.keys(cssVariables).length,
    fontFamilyCount: typography.fontFamilyCount,
    borderRadiusCount: borders.borderRadiusCount,
    borderWidthCount: borders.borderWidthCount,
    boxShadowCount: shadows.boxShadowCount,
    hasAnimation,
    hasGridLayout,
    hasGlassEffect,
    hasNeonEffect,
  };

  return {
    draft,
    raw: buildMarkdownDraft(draft, pageUrl.hostname, evidence),
    evidence,
  };
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match?.[1] ? cleanText(match[1]) : null;
}

function extractDescription(html: string): string | null {
  const patterns = [
    /<meta[^>]*name=["']description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*name=["']description["'][^>]*>/i,
    /<meta[^>]*property=["']og:description["'][^>]*content=["']([^"']+)["'][^>]*>/i,
    /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:description["'][^>]*>/i,
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return cleanText(match[1]);
  }
  return null;
}

function extractTextContent(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractInlineStyles(html: string): string {
  const matches = html.match(/<style[^>]*>([\s\S]*?)<\/style>/gi) ?? [];
  return matches
    .map((block) => block.replace(/^<style[^>]*>/i, "").replace(/<\/style>$/i, ""))
    .join("\n");
}

function extractTopColors(content: string, cssVariables: CssVariableMap): string[] {
  const counts = new Map<string, number>();
  const normalized = content.replace(/,\s+/g, ",").replace(/\s+/g, " ");

  for (const match of normalized.matchAll(HEX_COLOR_GLOBAL)) {
    const hex = normalizeCssColorToHex(match[0], cssVariables);
    if (hex) incrementCount(counts, hex);
  }

  for (const match of normalized.matchAll(FUNCTION_COLOR_GLOBAL)) {
    const raw = match[0];
    const alpha = extractAlphaFromColorFunction(raw);
    if (alpha !== null && alpha <= 0.08) continue;

    const hex = normalizeCssColorToHex(raw, cssVariables);
    if (hex) incrementCount(counts, hex);
  }

  for (const match of normalized.matchAll(CSS_VAR_GLOBAL)) {
    const name = match[1];
    if (!name) continue;

    const resolved = resolveCssValue(`var(${name})`, cssVariables);
    if (!resolved) continue;

    const alpha = extractAlphaFromColorFunction(resolved);
    if (alpha !== null && alpha <= 0.08) continue;

    const hex = normalizeCssColorToHex(resolved, cssVariables);
    if (hex) incrementCount(counts, hex);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, 8);
}

function extractAlphaFromColorFunction(raw: string): number | null {
  const normalized = raw.trim().toLowerCase();
  const fn = normalized.match(/^(rgba|rgb|hsla|hsl|oklch)\((.*)\)$/);
  if (!fn?.[1] || fn[2] === undefined) return null;

  const args = fn[2]
    .replace(/,/g, " ")
    .replace(/\//g, " / ")
    .trim()
    .split(/\s+/g)
    .filter(Boolean);

  const slashIndex = args.indexOf("/");
  const alphaToken =
    slashIndex >= 0
      ? args[slashIndex + 1]
      : args.length >= 4
        ? args[3]
        : undefined;

  if (!alphaToken) return null;

  if (alphaToken.endsWith("%")) {
    const percent = Number(alphaToken.slice(0, -1));
    return Number.isFinite(percent) ? clamp(percent / 100, 0, 1) : null;
  }

  const num = Number(alphaToken);
  return Number.isFinite(num) ? clamp(num, 0, 1) : null;
}

function inferTypographyFromCss(
  cssText: string,
  cssVariables: CssVariableMap
): { headingFont?: string; bodyFont?: string; fontFamilyCount: number } {
  const blocks = extractCssRuleBlocks(cssText);
  const overall = new Map<string, number>();
  const heading = new Map<string, number>();
  const body = new Map<string, number>();
  let count = 0;

  for (const block of blocks) {
    const values = extractDeclarationValues(block.bodyText, "font-family");
    if (values.length === 0) continue;

    for (const value of values) {
      const expanded = expandCssVars(value, cssVariables);
      const normalized = normalizeFontFamily(expanded);
      if (!normalized) continue;

      count += 1;
      incrementCount(overall, normalized);
      if (isHeadingSelector(block.selectorText)) incrementCount(heading, normalized, 2);
      if (isBodySelector(block.selectorText)) incrementCount(body, normalized, 2);
    }
  }

  const bodyFont = pickTopKey(body) ?? pickTopKey(overall);
  const headingFont = pickTopKey(heading) ?? bodyFont ?? pickTopKey(overall);

  return {
    headingFont: headingFont || undefined,
    bodyFont: bodyFont || undefined,
    fontFamilyCount: count,
  };
}

function inferBordersFromCss(
  cssText: string,
  cssVariables: CssVariableMap
): {
  borderRadius?: string;
  borderWidth?: string;
  borderRadiusCount: number;
  borderWidthCount: number;
} {
  const blocks = extractCssRuleBlocks(cssText);
  const radiusCounts = new Map<string, number>();
  const widthCounts = new Map<string, number>();
  let radiusCount = 0;
  let widthCount = 0;

  for (const block of blocks) {
    for (const value of extractDeclarationValues(block.bodyText, "border-radius")) {
      const expanded = expandCssVars(value, cssVariables);
      const token = firstRadiusToken(expanded);
      if (!token) continue;
      radiusCount += 1;
      incrementCount(radiusCounts, token);
    }

    for (const value of extractDeclarationValues(block.bodyText, "border-width")) {
      const expanded = expandCssVars(value, cssVariables);
      const token = firstLengthToken(expanded);
      if (!token) continue;
      widthCount += 1;
      incrementCount(widthCounts, token);
    }

    for (const value of extractDeclarationValues(block.bodyText, "border")) {
      const expanded = expandCssVars(value, cssVariables);
      const token = firstBorderWidthFromBorderShorthand(expanded);
      if (!token) continue;
      widthCount += 1;
      incrementCount(widthCounts, token);
    }
  }

  return {
    borderRadius: pickTopKey(radiusCounts) || undefined,
    borderWidth: pickTopKey(widthCounts) || undefined,
    borderRadiusCount: radiusCount,
    borderWidthCount: widthCount,
  };
}

function inferShadowsFromCss(
  cssText: string,
  cssVariables: CssVariableMap
): { shadowSm?: string; shadowMd?: string; shadowLg?: string; boxShadowCount: number } {
  const blocks = extractCssRuleBlocks(cssText);
  const counts = new Map<string, number>();
  let boxShadowCount = 0;

  for (const block of blocks) {
    for (const value of extractDeclarationValues(block.bodyText, "box-shadow")) {
      const expanded = expandCssVars(value, cssVariables);
      const cleaned = stripImportant(expanded).trim();
      if (!cleaned || cleaned.toLowerCase() === "none") continue;

      boxShadowCount += 1;
      incrementCount(counts, cleaned);
    }
  }

  const entries = [...counts.entries()].map(([value, count]) => ({
    value,
    count,
    size: estimateShadowSize(value),
  }));

  // If there is no evidence, fall back to undefined and let downstream inference decide.
  if (entries.length === 0) {
    return { boxShadowCount, shadowSm: undefined, shadowMd: undefined, shadowLg: undefined };
  }

  const topByCount = entries.sort((a, b) => b.count - a.count).slice(0, 12);
  topByCount.sort((a, b) => a.size - b.size);

  const sm = topByCount[0]?.value;
  const md = topByCount[Math.floor(topByCount.length / 2)]?.value ?? sm;
  const lg = topByCount[topByCount.length - 1]?.value ?? md;

  return {
    shadowSm: sm || undefined,
    shadowMd: md || undefined,
    shadowLg: lg || undefined,
    boxShadowCount,
  };
}

interface CssRuleBlock {
  selectorText: string;
  bodyText: string;
}

function extractCssRuleBlocks(cssText: string): CssRuleBlock[] {
  const css = stripCssComments(cssText);
  const blocks: CssRuleBlock[] = [];

  let index = 0;
  while (index < css.length) {
    const open = css.indexOf("{", index);
    if (open < 0) break;

    const selector = css.slice(index, open).trim();

    let depth = 1;
    let close = open + 1;
    while (close < css.length && depth > 0) {
      const ch = css[close];
      if (ch === "{") depth += 1;
      else if (ch === "}") depth -= 1;
      close += 1;
    }

    const body = css.slice(open + 1, close - 1);

    if (selector) {
      if (selector.startsWith("@")) {
        blocks.push(...extractCssRuleBlocks(body));
      } else if (body.trim()) {
        blocks.push({ selectorText: selector, bodyText: body });
      }
    }

    index = close;
  }

  return blocks;
}

function extractDeclarationValues(bodyText: string, property: string): string[] {
  const escaped = escapeRegExp(property);
  const re = new RegExp(`${escaped}\\s*:\\s*([^;]+)`, "gi");
  const values: string[] = [];

  for (const match of bodyText.matchAll(re)) {
    const raw = match[1]?.trim();
    if (!raw) continue;
    values.push(raw);
  }

  return values;
}

function normalizeFontFamily(value: string): string | null {
  const trimmed = stripImportant(value).replace(/\s+/g, " ").trim();
  return trimmed ? trimmed : null;
}

function isHeadingSelector(selectorText: string): boolean {
  const sel = selectorText.toLowerCase();
  return /\bh[1-6]\b/.test(sel) || /heading|title|headline|display/.test(sel);
}

function isBodySelector(selectorText: string): boolean {
  const sel = selectorText.toLowerCase();
  return sel.includes(":root") || /\bhtml\b/.test(sel) || /\bbody\b/.test(sel);
}

function firstRadiusToken(value: string): string | null {
  const normalized = stripImportant(value).trim();
  if (!normalized) return null;
  const withoutSlash = normalized.split("/")[0]?.trim() ?? normalized;
  const first = withoutSlash.split(/\s+/)[0]?.trim();
  if (!first) return null;
  if (first === "0" || first === "0px" || first === "0rem" || first === "0em") return "0";
  return first.toLowerCase();
}

function firstLengthToken(value: string): string | null {
  const normalized = stripImportant(value).trim();
  if (!normalized) return null;
  const first = normalized.split(/\s+/)[0]?.trim();
  if (!first) return null;
  if (first === "0" || first === "0px" || first === "0rem" || first === "0em") return "0";
  if (/^(thin|medium|thick)$/i.test(first)) {
    return first.toLowerCase() === "thin" ? "1px" : first.toLowerCase() === "thick" ? "4px" : "2px";
  }
  return first.toLowerCase();
}

function firstBorderWidthFromBorderShorthand(value: string): string | null {
  const normalized = stripImportant(value).trim();
  if (!normalized) return null;

  // Common patterns: "1px solid #000", "solid 1px #000", "none", etc.
  const length = normalized.match(/(-?\d*\.?\d+)(px|rem|em)\b/i);
  if (length?.[0]) return length[0].toLowerCase();

  const keyword = normalized.match(/\b(thin|medium|thick)\b/i);
  if (keyword?.[1]) {
    return keyword[1].toLowerCase() === "thin" ? "1px" : keyword[1].toLowerCase() === "thick" ? "4px" : "2px";
  }

  return null;
}

function estimateShadowSize(value: string): number {
  const firstLayer = splitTopLevel(value, ",")[0] ?? value;
  const layer = firstLayer.trim();
  if (!layer) return 0;

  // Extract up to 4 length components (offset-x, offset-y, blur, spread).
  const tokens: number[] = [];
  const re = /(-?\d*\.?\d+)(px|rem|em)\b/gi;
  for (const match of layer.matchAll(re)) {
    const num = Number(match[1]);
    const unit = match[2]?.toLowerCase();
    if (!Number.isFinite(num) || !unit) continue;
    const px = unit === "px" ? num : num * 16;
    tokens.push(px);
    if (tokens.length >= 4) break;
  }

  if (tokens.length === 0) return 0;

  const [x = 0, y = 0, blur = 0, spread = 0] = tokens;
  return Math.abs(x) + Math.abs(y) + Math.abs(blur) + Math.abs(spread);
}

function pickTopKey(map: Map<string, number>): string | null {
  if (map.size === 0) return null;

  let best: string | null = null;
  let bestCount = -1;

  for (const [key, count] of map.entries()) {
    if (count > bestCount) {
      best = key;
      bestCount = count;
    }
  }

  return best;
}

function stripCssComments(value: string): string {
  return value.replace(/\/\*[\s\S]*?\*\//g, "");
}

function stripImportant(value: string): string {
  return value.replace(/\s*!important\s*$/i, "");
}

function expandCssVars(value: string, cssVariables: CssVariableMap): string {
  const input = value.trim();
  if (!input.toLowerCase().includes("var(")) return input;

  let output = input;
  for (let i = 0; i < 24; i += 1) {
    const idx = output.toLowerCase().indexOf("var(");
    if (idx < 0) break;

    const end = findMatchingParenIndex(output, idx + 3);
    if (end < 0) break;

    const fn = output.slice(idx, end + 1);
    const resolved = resolveCssValue(fn, cssVariables) ?? fn;
    output = output.slice(0, idx) + resolved + output.slice(end + 1);
  }

  return output.trim();
}

function findMatchingParenIndex(input: string, openParenIndex: number): number {
  let depth = 0;

  for (let i = openParenIndex; i < input.length; i += 1) {
    const ch = input[i];
    if (ch === "(") depth += 1;
    else if (ch === ")") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

function inferStyleType(
  text: string,
  hasAnimation: boolean,
  hasGridLayout: boolean
): "visual" | "layout" | "animation" {
  const animationScore =
    Number(hasAnimation) * 3 +
    scoreKeywords(text, ["animation", "motion", "transition", "micro-interaction", "keyframes"]);
  const layoutScore =
    Number(hasGridLayout) * 3 +
    scoreKeywords(text, ["layout", "grid", "sidebar", "dashboard", "hero", "section"]);

  if (animationScore >= 4 && animationScore >= layoutScore) return "animation";
  if (layoutScore >= 4) return "layout";
  return "visual";
}

function inferCategory(
  text: string,
  hasGlassEffect: boolean,
  hasNeonEffect: boolean
): "modern" | "minimal" | "expressive" | "retro" {
  const scores = {
    modern: scoreKeywords(text, ["modern", "saas", "product", "clean", "professional"]),
    minimal: scoreKeywords(text, ["minimal", "simple", "clean", "whitespace", "editorial"]),
    expressive:
      Number(hasNeonEffect) * 2 +
      scoreKeywords(text, ["bold", "vibrant", "expressive", "neon", "creative", "gradient"]),
    retro: scoreKeywords(text, ["retro", "vintage", "y2k", "nostalgia", "pixel"]),
  };

  if (hasGlassEffect) scores.modern += 2;
  const winner = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return (winner?.[0] as "modern" | "minimal" | "expressive" | "retro") || "modern";
}

function inferTags(
  text: string,
  category: "modern" | "minimal" | "expressive" | "retro",
  styleType: "visual" | "layout" | "animation"
): Array<
  | "modern"
  | "minimal"
  | "expressive"
  | "retro"
  | "high-contrast"
  | "responsive"
  | "brand-inspired"
> {
  const tags: Array<
    | "modern"
    | "minimal"
    | "expressive"
    | "retro"
    | "high-contrast"
    | "responsive"
    | "brand-inspired"
  > = [category];

  if (/contrast|high-contrast|bold color/i.test(text)) tags.push("high-contrast");
  if (/responsive|mobile|adaptive/i.test(text)) tags.push("responsive");
  if (/brand|identity|marketing/i.test(text)) tags.push("brand-inspired");
  if (styleType === "animation") tags.push("expressive");

  return dedupe(tags);
}

function extractKeywords({
  title,
  description,
  hostname,
  textContent,
}: {
  title: string | null;
  description: string | null;
  hostname: string;
  textContent: string;
}): string[] {
  const sample = `${title ?? ""} ${description ?? ""} ${hostname.replace(/\./g, " ")} ${textContent
    .split(/\s+/)
    .slice(0, 80)
    .join(" ")}`.toLowerCase();

  const words = sample.match(/[a-z0-9-]{3,}/g) ?? [];
  const counts = new Map<string, number>();
  for (const word of words) {
    if (STOPWORDS.has(word)) continue;
    incrementCount(counts, word);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, 8);
}

function buildDoList({
  hasAnimation,
  hasGridLayout,
  hasGlassEffect,
  hasNeonEffect,
  primaryColor,
  secondaryColor,
  accentColor,
}: {
  hasAnimation: boolean;
  hasGridLayout: boolean;
  hasGlassEffect: boolean;
  hasNeonEffect: boolean;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
}): string[] {
  const list = [
    "Use a consistent spacing scale (8px rhythm) across sections and components.",
  ];

  if (primaryColor && secondaryColor) {
    list.push(`Anchor core surfaces with ${primaryColor} and ${secondaryColor}.`);
  }
  if (accentColor) {
    list.push(`Use ${accentColor} as a focused accent for CTA and interactive states.`);
  }
  if (hasAnimation) {
    list.push("Keep transition durations in the 150ms-400ms range and support prefers-reduced-motion.");
  }
  if (hasGridLayout) {
    list.push("Preserve strong layout hierarchy using grid/flex structure from the source site.");
  }
  if (hasGlassEffect) {
    list.push("Use subtle transparency, blur, and soft borders to maintain the glass-like depth.");
  }
  if (hasNeonEffect) {
    list.push("Use glow effects sparingly and reserve high-intensity contrast for key emphasis.");
  }

  return dedupe(list).slice(0, 6);
}

function buildDontList({
  hasAnimation,
  hasGlassEffect,
}: {
  hasAnimation: boolean;
  hasGlassEffect: boolean;
}): string[] {
  const list = [
    "Do not introduce unrelated colors that break the extracted palette.",
    "Avoid inconsistent spacing or mixed radius values across similar components.",
  ];

  if (hasAnimation) {
    list.push("Avoid long blocking animations (>600ms) on core interactions.");
  } else {
    list.push("Avoid heavy decorative animations that distract from content readability.");
  }

  if (hasGlassEffect) {
    list.push("Avoid fully opaque cards on layered backgrounds; keep depth cues visible.");
  }

  return dedupe(list).slice(0, 6);
}

function buildPhilosophy({
  description,
  hasAnimation,
  hasGridLayout,
  hasGlassEffect,
  hasNeonEffect,
}: {
  description: string | null;
  hasAnimation: boolean;
  hasGridLayout: boolean;
  hasGlassEffect: boolean;
  hasNeonEffect: boolean;
}): string {
  const parts = [description || "Build a coherent modern interface with clear visual rhythm."];

  if (hasGridLayout) {
    parts.push("Prioritize structural clarity through a strong grid and predictable section flow.");
  }
  if (hasAnimation) {
    parts.push("Use motion to communicate intent and state change, not as pure decoration.");
  }
  if (hasGlassEffect) {
    parts.push("Layer depth through translucency and soft contrast while keeping text legible.");
  }
  if (hasNeonEffect) {
    parts.push("Balance expressive accents with restrained surfaces to avoid visual fatigue.");
  }

  return parts.join(" ");
}

function generateButtonCode({
  hasAnimation,
  accentColor,
}: {
  hasAnimation: boolean;
  accentColor?: string;
}): string {
  const transition = hasAnimation ? "transition-all duration-300" : "transition-colors duration-200";
  const styleAttr = accentColor ? ` style={{ backgroundColor: "${accentColor}" }}` : "";
  return `<button className="inline-flex items-center justify-center px-4 py-2 rounded-md text-white font-medium ${transition} hover:opacity-90"${styleAttr}>
  Get started
</button>`;
}

function generateCardCode({
  secondaryColor,
  borderColor,
}: {
  secondaryColor: string;
  borderColor: string;
}): string {
  return `<div className="rounded-xl border p-6 shadow-sm" style={{ backgroundColor: "${secondaryColor}", borderColor: "${withAlpha(borderColor, 0.22)}" }}>
  <h3 className="text-lg font-semibold mb-2">Card title</h3>
  <p className="text-sm opacity-80">Card description content.</p>
</div>`;
}

function generateInputCode({
  borderColor,
  accentColor,
}: {
  borderColor: string;
  accentColor: string;
}): string {
  return `<input
  type="text"
  placeholder="Type here..."
  className="w-full px-4 py-3 rounded-md border outline-none focus:ring-2"
  style={{ borderColor: "${withAlpha(borderColor, 0.3)}", boxShadow: "0 0 0 0 ${accentColor}" }}
/>`;
}

function buildMarkdownDraft(
  draft: ExtractedStyleDraft,
  hostname: string,
  evidence: UrlExtractionEvidence
): string {
  const lines: string[] = [];

  lines.push(`# ${draft.nameEn || "Extracted Style"}`);
  lines.push("");
  lines.push(draft.description || `Extracted from ${hostname}.`);
  lines.push("");
  if (draft.keywords && draft.keywords.length > 0) {
    lines.push(`Keywords: ${draft.keywords.join(", ")}`);
    lines.push("");
  }

  lines.push("## Design Philosophy");
  lines.push(draft.philosophy || "");
  lines.push("");

  lines.push("## Colors");
  if (draft.primaryColor) lines.push(`Primary: ${draft.primaryColor}`);
  if (draft.secondaryColor) lines.push(`Secondary: ${draft.secondaryColor}`);
  if (draft.accentColors && draft.accentColors.length > 0) {
    lines.push(`Accent: ${draft.accentColors.join(", ")}`);
  }
  lines.push("");

  if (draft.headingFont || draft.bodyFont) {
    lines.push("## Typography");
    if (draft.headingFont) lines.push(`Heading Font: ${draft.headingFont}`);
    if (draft.bodyFont) lines.push(`Body Font: ${draft.bodyFont}`);
    lines.push("");
  }

  if (draft.borderRadius || draft.borderWidth) {
    lines.push("## Borders");
    if (draft.borderRadius) lines.push(`Radius: ${draft.borderRadius}`);
    if (draft.borderWidth) lines.push(`Width: ${draft.borderWidth}`);
    lines.push("");
  }

  if (draft.shadowSm || draft.shadowMd || draft.shadowLg) {
    lines.push("## Shadows");
    if (draft.shadowSm) lines.push(`Sm: ${draft.shadowSm}`);
    if (draft.shadowMd) lines.push(`Md: ${draft.shadowMd}`);
    if (draft.shadowLg) lines.push(`Lg: ${draft.shadowLg}`);
    lines.push("");
  }

  lines.push("## Do List");
  for (const rule of draft.doList ?? []) lines.push(`- ${rule}`);
  lines.push("");

  lines.push("## Don't List");
  for (const rule of draft.dontList ?? []) lines.push(`- ${rule}`);
  lines.push("");

  lines.push("## Evidence");
  lines.push(`- Stylesheets scanned: ${evidence.stylesheetCount}`);
  lines.push(`- Colors captured: ${evidence.colorCount}`);
  lines.push(`- CSS variables captured: ${evidence.cssVariableCount}`);
  lines.push(`- font-family samples: ${evidence.fontFamilyCount}`);
  lines.push(`- border-radius samples: ${evidence.borderRadiusCount}`);
  lines.push(`- border-width samples: ${evidence.borderWidthCount}`);
  lines.push(`- box-shadow samples: ${evidence.boxShadowCount}`);
  lines.push(`- Animation detected: ${evidence.hasAnimation ? "yes" : "no"}`);
  lines.push(`- Grid/flex structure detected: ${evidence.hasGridLayout ? "yes" : "no"}`);
  lines.push("");

  lines.push("### Button");
  lines.push("```tsx");
  lines.push(draft.buttonCode || "");
  lines.push("```");
  lines.push("");

  lines.push("### Card");
  lines.push("```tsx");
  lines.push(draft.cardCode || "");
  lines.push("```");
  lines.push("");

  lines.push("### Input");
  lines.push("```tsx");
  lines.push(draft.inputCode || "");
  lines.push("```");

  return lines.join("\n");
}

function normalizeTitle(title: string | null, hostname: string): string {
  const fallback = hostname.replace(/^www\./, "").split(".")[0] || "Extracted Style";
  const raw = (title || fallback)
    .replace(/\s*[|\-–—]\s*.+$/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!raw) return toTitleCase(fallback);
  if (raw.length > 72) return raw.slice(0, 72).trim();
  return raw;
}

function cleanText(value: string): string {
  return value
    .replace(/\s+/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .trim();
}

function scoreKeywords(text: string, keywords: string[]): number {
  return keywords.reduce((score, keyword) => (text.includes(keyword) ? score + 1 : score), 0);
}

function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function normalizeHex(hex: string): string {
  const value = hex.toLowerCase();
  if (value.length === 4) {
    return `#${value[1]}${value[1]}${value[2]}${value[2]}${value[3]}${value[3]}`;
  }
  return value;
}

function withAlpha(hex: string, alpha: number): string {
  const normalized = normalizeHex(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(2)})`;
}

function incrementCount(map: Map<string, number>, key: string, by: number = 1): void {
  map.set(key, (map.get(key) ?? 0) + by);
}

function toTitleCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((token) => token[0].toUpperCase() + token.slice(1))
    .join(" ");
}

function dedupe<T>(items: T[]): T[] {
  return Array.from(new Set(items));
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
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

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
