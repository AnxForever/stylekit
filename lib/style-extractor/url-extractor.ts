import type { ExtractedStyleDraft } from "./adapter";

export interface UrlExtractionInput {
  url: string;
  html: string;
  cssChunks?: string[];
}

export interface UrlExtractionEvidence {
  stylesheetCount: number;
  colorCount: number;
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

const HEX_COLOR_GLOBAL = /#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g;
const RGB_COLOR_GLOBAL =
  /rgba?\(\s*(\d{1,3})[\s,]+(\d{1,3})[\s,]+(\d{1,3})(?:[\s,\/]+([0-9.]+))?\s*\)/g;
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
  const combined = `${title ?? ""}\n${description ?? ""}\n${textContent}\n${cssText}`;
  const combinedLower = combined.toLowerCase();

  const colors = extractTopColors(combined);
  const primaryColor = colors[0];
  const secondaryColor = colors[1];
  const accentColors = colors.slice(2, 6);

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
  };

  const evidence: UrlExtractionEvidence = {
    stylesheetCount: cssChunks.length + (inlineCss ? 1 : 0),
    colorCount: colors.length,
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

function extractTopColors(content: string): string[] {
  const counts = new Map<string, number>();
  const normalized = content.replace(/,\s+/g, ",");

  for (const match of normalized.matchAll(HEX_COLOR_GLOBAL)) {
    const hex = normalizeHex(match[0]);
    incrementCount(counts, hex);
  }

  for (const match of normalized.matchAll(RGB_COLOR_GLOBAL)) {
    const red = safeChannel(match[1]);
    const green = safeChannel(match[2]);
    const blue = safeChannel(match[3]);
    const alpha = match[4] ? Number(match[4]) : 1;
    if (alpha <= 0.08) continue;
    const hex = rgbToHex(red, green, blue);
    incrementCount(counts, hex);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .map((entry) => entry[0])
    .slice(0, 8);
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

  lines.push("## Do List");
  for (const rule of draft.doList ?? []) lines.push(`- ${rule}`);
  lines.push("");

  lines.push("## Don't List");
  for (const rule of draft.dontList ?? []) lines.push(`- ${rule}`);
  lines.push("");

  lines.push("## Evidence");
  lines.push(`- Stylesheets scanned: ${evidence.stylesheetCount}`);
  lines.push(`- Colors captured: ${evidence.colorCount}`);
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

function rgbToHex(red: number, green: number, blue: number): string {
  const hex = [red, green, blue]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("");
  return `#${hex}`;
}

function withAlpha(hex: string, alpha: number): string {
  const normalized = normalizeHex(hex);
  const r = parseInt(normalized.slice(1, 3), 16);
  const g = parseInt(normalized.slice(3, 5), 16);
  const b = parseInt(normalized.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${Math.max(0, Math.min(1, alpha)).toFixed(2)})`;
}

function incrementCount(map: Map<string, number>, key: string): void {
  map.set(key, (map.get(key) ?? 0) + 1);
}

function safeChannel(value: string | undefined): number {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(255, Math.round(num)));
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
