/**
 * @module lib/search/synonyms
 *
 * Intent-aware search expansion. StyleKit's style keywords are largely
 * Chinese-first (e.g. corporate-clean carries "专业" but not "professional"),
 * so a literal substring search misses common English intent queries and
 * vice-versa. This module maps a user's query to a bilingual set of surface
 * terms and colour intents so search matches meaning, not just spelling.
 *
 * Shared by lib/discovery (CLI / MCP / API) and the /styles client search.
 */

/**
 * Groups of interchangeable intent terms (English + 中文). If a query matches
 * any term in a group, the whole group is used to match a style's text — so
 * "professional" also matches styles that only say "专业" / "corporate" / "b2b".
 */
const SYNONYM_GROUPS: string[][] = [
  ["professional", "专业", "corporate", "企业", "business", "商务", "b2b", "saas", "enterprise", "trustworthy", "可信"],
  ["minimal", "minimalist", "极简", "simple", "简约", "简洁", "clean", "干净"],
  ["dark", "暗色", "深色", "night", "夜间", "black", "黑", "dark-theme"],
  ["light", "明亮", "浅色", "bright", "airy", "通透"],
  ["colorful", "多彩", "vibrant", "鲜艳", "bold", "大胆", "playful", "活泼", "缤纷"],
  ["retro", "复古", "vintage", "怀旧", "nostalgic", "old", "年代"],
  ["elegant", "优雅", "luxury", "奢华", "premium", "高端", "sophisticated", "精致"],
  ["cute", "可爱", "kawaii", "萌", "甜美", "少女"],
  ["tech", "科技", "futuristic", "未来", "cyber", "赛博", "sci-fi", "科幻", "hud"],
  ["warm", "温暖", "cozy", "温馨", "舒适"],
  ["nature", "自然", "organic", "有机", "natural", "eco", "环保", "生态"],
  ["gradient", "渐变", "glow", "光晕"],
  ["glass", "玻璃", "glassmorphism", "glassmorphic", "frosted", "磨砂", "transparent", "透明"],
  ["hand-drawn", "手绘", "sketch", "涂鸦", "doodle", "手写"],
  ["game", "游戏", "gaming", "game-ui", "arcade", "街机", "pixel", "像素"],
  ["anime", "二次元", "manga", "漫画", "anime-aesthetic", "动漫"],
  ["japanese", "日本", "日式", "和风", "wafuu", "zen", "禅"],
  ["chinese", "中国", "中式", "国风", "东方", "oriental"],
  ["bold", "brutalist", "野兽派", "high-contrast", "高对比", "粗犷"],
  ["editorial", "杂志", "magazine", "排版", "typography", "文字"],
  ["dashboard", "仪表盘", "后台", "admin", "管理", "analytics"],
];

/** Colour words → an HSL hue window (inclusive) plus special grey/black/white. */
const COLOR_HUES: Record<string, { min: number; max: number } | "light" | "dark"> = {
  red: { min: 345, max: 360 }, 红: { min: 345, max: 360 },
  orange: { min: 15, max: 45 }, 橙: { min: 15, max: 45 },
  yellow: { min: 45, max: 70 }, 黄: { min: 45, max: 70 },
  green: { min: 80, max: 160 }, 绿: { min: 80, max: 160 },
  cyan: { min: 160, max: 200 }, 青: { min: 160, max: 200 },
  blue: { min: 200, max: 250 }, 蓝: { min: 200, max: 250 },
  purple: { min: 250, max: 290 }, 紫: { min: 250, max: 290 },
  pink: { min: 290, max: 345 }, 粉: { min: 290, max: 345 },
  white: "light", 白: "light",
  black: "dark", 黑: "dark",
};

/** Expand a lowercased query into every interchangeable surface term. */
export function expandQueryTerms(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = new Set<string>([q]);
  for (const group of SYNONYM_GROUPS) {
    if (group.some((t) => t === q || q.includes(t) || t.includes(q))) {
      for (const t of group) terms.add(t);
    }
  }
  return [...terms];
}

/** Parse a hex/rgb color to its HSL hue + lightness, or null if unparseable. */
function colorToHueLightness(input: string): { hue: number; light: number } | null {
  let r: number, g: number, b: number;
  const hex = input.trim().replace(/^#/, "");
  if (/^[0-9a-f]{3}$/i.test(hex)) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (/^[0-9a-f]{6}$/i.test(hex)) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    const m = input.match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/i);
    if (!m) return null;
    r = +m[1]; g = +m[2]; b = +m[3];
  }
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const light = ((max + min) / 2) * 100;
  let hue = 0;
  if (max !== min) {
    const d = max - min;
    if (max === rn) hue = ((gn - bn) / d + (gn < bn ? 6 : 0));
    else if (max === gn) hue = (bn - rn) / d + 2;
    else hue = (rn - gn) / d + 4;
    hue *= 60;
  }
  return { hue, light };
}

/**
 * True when the query names a colour that appears in the style's palette.
 * Enables "blue", "蓝", "dark red" to find palette-matching styles even when
 * the colour word never appears in the style's text.
 */
export function colorIntentMatches(query: string, palette: string[]): boolean {
  const q = query.trim().toLowerCase();
  const spec = Object.entries(COLOR_HUES).find(([word]) => q === word || q.includes(word));
  if (!spec) return false;
  const [, target] = spec;
  for (const raw of palette) {
    const hl = colorToHueLightness(raw);
    if (!hl) continue;
    if (target === "light" && hl.light >= 82) return true;
    if (target === "dark" && hl.light <= 18) return true;
    if (typeof target === "object" && hl.light > 12 && hl.light < 92) {
      // hue window with wrap-around for red
      if (target.min <= target.max) {
        if (hl.hue >= target.min && hl.hue <= target.max) return true;
      } else if (hl.hue >= target.min || hl.hue <= target.max) return true;
    }
  }
  return false;
}
