/**
 * Rule grounding checker.
 *
 * Authored rules are only useful if their values are this style's real values.
 * A rule that invents a class or a hex is worse than a thin rule: it reads as
 * authoritative and sends the agent somewhere the style never went. Every class
 * and colour a rule cites has to appear in that style's tokens, component code,
 * global CSS or palette.
 */
import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";

const CLASS_PATTERN = /\b[a-z][a-z0-9]*(?::[a-z-]+)?-\[[^\]\s]+\]/g;
const HEX_PATTERN = /#[0-9a-fA-F]{6}\b/g;

/** Templates like shadow-[Xpx_Xpx_0px] or bg-[color] stand for a shape, not a value. */
const PLACEHOLDER = /\b(?:X|N|Y|color|colour|accent|opacity|value|size|px_)\b|\.\.\.|\[color|\[accent|\[value/i;

/** A value quoted as something to avoid is supposed to be absent from the style. */
const NEGATIVE_CONTEXT = /(禁止|不要|避免|勿用|never|forbidden|avoid|do not|don't|instead of|not\s+the)/i;

function lineFor(text: string, index: number): string {
  const start = text.lastIndexOf("\n", index) + 1;
  const end = text.indexOf("\n", index);
  return text.slice(start, end === -1 ? undefined : end);
}

function corpusFor(slug: string, style: (typeof styles)[number]): string {
  const tokens = getStyleTokens(slug);
  const components = Object.values(style.components ?? {})
    .map((component) => (component as { code?: string })?.code ?? "")
    .join("\n");
  return [
    tokens ? JSON.stringify(tokens) : "",
    components,
    style.globalCss ?? "",
    style.colors.primary,
    style.colors.secondary,
    ...style.colors.accent,
  ]
    .join("\n")
    .toLowerCase();
}

interface Finding {
  slug: string;
  locale: "zh" | "en";
  value: string;
}

const findings: Finding[] = [];

for (const style of styles) {
  const corpus = corpusFor(style.slug, style);

  for (const [locale, text] of [
    ["zh", style.aiRules],
    ["en", style.aiRulesEn ?? ""],
  ] as const) {
    const cited = new Set([
      ...(text.match(CLASS_PATTERN) ?? []),
      ...(text.match(HEX_PATTERN) ?? []),
    ]);

    for (const value of cited) {
      // Compare the value a class carries, not the whole class string: a style
      // whose tokens define #2eaadc grounds text-[#2eaadc] perfectly well, and
      // demanding the exact utility spelling only produced noise.
      const bracket = value.match(/\[([^\]]+)\]/)?.[1] ?? value;
      const needle = bracket.toLowerCase();
      if (corpus.includes(needle)) continue;
      if (corpus.includes(value.toLowerCase())) continue;
      if (PLACEHOLDER.test(value)) continue;
      const context = lineFor(text, text.indexOf(value));
      if (NEGATIVE_CONTEXT.test(context)) continue;
      findings.push({ slug: style.slug, locale, value });
    }
  }
}

const bySlug = new Map<string, Finding[]>();
for (const finding of findings) {
  const list = bySlug.get(finding.slug) ?? [];
  list.push(finding);
  bySlug.set(finding.slug, list);
}

const ranked = [...bySlug.entries()].sort((a, b) => b[1].length - a[1].length);

console.log(`[rule-grounding] ${styles.length} styles, ${findings.length} cited values not found in the style's own tokens, components, CSS or palette`);
console.log(`[rule-grounding] styles affected: ${ranked.length}`);
for (const [slug, list] of ranked.slice(0, 15)) {
  const sample = [...new Set(list.map((item) => item.value))].slice(0, 6).join(", ");
  console.log(`  ${slug.padEnd(24)} ${String(list.length).padStart(3)}  ${sample}`);
}
