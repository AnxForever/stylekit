/**
 * Prompt delivery regression check.
 *
 * The prompt a visitor copies is assembled from four moving parts: the authored
 * rules, the generated token spec, the normalizer that rewrites the rules at
 * load, and the builder that joins them. A change to any one of them can quietly
 * remove content from all 146 styles at once - which is exactly what happened
 * when the normalizer began parsing structure inside code fences and deleted a
 * block, and when the builder preferred the generated spec and discarded the
 * authored rules entirely.
 *
 * This records what every style currently delivers in both languages and fails
 * when a prompt loses a section, a rule line, a code block or its token
 * dictionary, or ends up with an unbalanced fence. Growth always passes.
 *
 *   npx tsx tools/scripts/check-prompt-regression.ts            compare
 *   npx tsx tools/scripts/check-prompt-regression.ts --update   re-record
 *
 * Re-record only when you understand why content went missing.
 *
 * One known false positive: while a style's rules are still authored in English,
 * its "Absolute Prohibitions" heading does not match the normalizer's forbidden
 * markers, so the authored section survives *and* the canonical Chinese dontList
 * is appended - the delivered prompt carries both. Translating the rules into
 * Chinese makes the heading match, the duplicate collapses, and this check sees
 * lines disappear. Confirm the canonical list is a superset before re-recording;
 * for hero-fullscreen it was 7 rules replacing the same 5.
 */
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { styles } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateEnhancedAIRules } from "@/lib/styles/enhanced-rules";
import { buildHardPrompt } from "@/lib/styles/prompt-pair";

const BASELINE_PATH = path.join(
  process.cwd(),
  "tests/fixtures/prompt-delivery-baseline.json"
);

/**
 * Byte length is a bad proxy for content. A faithful Chinese translation of an
 * English document is legitimately 40-60% shorter, so length alone would demand
 * a baseline edit every time a style's rules move into the right language - and
 * a guard you are expected to overwrite is not a guard. Structure is what a
 * regression actually destroys: a deleted code block costs fences and bullets,
 * a dropped section costs a heading. Length is recorded for context only.
 */
export interface PromptDelivery {
  zh: number;
  en: number;
  zhTokens: boolean;
  enTokens: boolean;
  zhFences: number;
  enFences: number;
  zhHeadings: number;
  enHeadings: number;
  zhBullets: number;
  enBullets: number;
}

function countHeadings(value: string): number {
  return (value.match(/^#{1,4} .+$/gm) ?? []).length;
}

function countBullets(value: string): number {
  return (
    (value.match(/^\s*[-*] /gm) ?? []).length +
    (value.match(/^\s*\d+\. /gm) ?? []).length
  );
}

export function measureDelivery(): Record<string, PromptDelivery> {
  const out: Record<string, PromptDelivery> = {};

  for (const style of styles) {
    const tokens = getStyleTokens(style.slug);

    const build = (locale: "zh" | "en") => {
      const enhancedRules = tokens
        ? generateEnhancedAIRules({ style, tokens, format: "full", locale })
        : null;

      return buildHardPrompt(
        {
          styleName: locale === "zh" ? style.name : style.nameEn,
          styleSlug: style.slug,
          aiRules: style.aiRules,
          aiRulesEn: style.aiRulesEn,
          enhancedRules,
          doList: style.doList,
          doListEn: style.doListEn,
          dontList: style.dontList,
          dontListEn: style.dontListEn,
          keywords: style.keywords,
          keywordsEn: style.keywordsEn,
        },
        locale
      );
    };

    const zh = build("zh");
    const en = build("en");

    out[style.slug] = {
      zh: zh.length,
      en: en.length,
      zhTokens: /Token (Dictionary|字典)/.test(zh),
      enTokens: /Token (Dictionary|字典)/.test(en),
      zhFences: (zh.match(/```/g) ?? []).length,
      enFences: (en.match(/```/g) ?? []).length,
      zhHeadings: countHeadings(zh),
      enHeadings: countHeadings(en),
      zhBullets: countBullets(zh),
      enBullets: countBullets(en),
    };
  }

  return out;
}

export interface DeliveryFinding {
  slug: string;
  message: string;
}

export function compareDelivery(
  baseline: Record<string, PromptDelivery>,
  current: Record<string, PromptDelivery>
): DeliveryFinding[] {
  const findings: DeliveryFinding[] = [];

  for (const [slug, before] of Object.entries(baseline)) {
    const after = current[slug];
    if (!after) {
      findings.push({ slug, message: "style disappeared from the catalog" });
      continue;
    }

    for (const locale of ["zh", "en"] as const) {
      const headingsKey = locale === "zh" ? "zhHeadings" : "enHeadings";
      const bulletsKey = locale === "zh" ? "zhBullets" : "enBullets";

      if (after[headingsKey] < before[headingsKey]) {
        findings.push({
          slug,
          message: `${locale} prompt lost ${before[headingsKey] - after[headingsKey]} section heading(s)`,
        });
      }

      if (after[bulletsKey] < before[bulletsKey]) {
        findings.push({
          slug,
          message: `${locale} prompt lost ${before[bulletsKey] - after[bulletsKey]} rule line(s)`,
        });
      }

      const previousFences = before[locale === "zh" ? "zhFences" : "enFences"];
      const currentFences = after[locale === "zh" ? "zhFences" : "enFences"];
      if (currentFences < previousFences) {
        findings.push({
          slug,
          message: `${locale} prompt lost ${(previousFences - currentFences) / 2} code block(s)`,
        });
      }

      const tokensKey = locale === "zh" ? "zhTokens" : "enTokens";
      if (before[tokensKey] && !after[tokensKey]) {
        findings.push({ slug, message: `${locale} prompt lost the token dictionary` });
      }

      const fenceKey = locale === "zh" ? "zhFences" : "enFences";
      if (after[fenceKey] % 2 !== 0) {
        findings.push({
          slug,
          message: `${locale} prompt has an unclosed code fence (${after[fenceKey]} markers)`,
        });
      }
    }
  }

  return findings;
}

function main(): void {
  const current = measureDelivery();

  if (process.argv.includes("--update")) {
    mkdirSync(path.dirname(BASELINE_PATH), { recursive: true });
    writeFileSync(BASELINE_PATH, `${JSON.stringify(current, null, 2)}\n`);
    console.log(
      `[prompt-regression] recorded ${Object.keys(current).length} styles to ${path.relative(process.cwd(), BASELINE_PATH)}`
    );
    return;
  }

  const baseline = JSON.parse(readFileSync(BASELINE_PATH, "utf8")) as Record<
    string,
    PromptDelivery
  >;
  const findings = compareDelivery(baseline, current);

  if (findings.length > 0) {
    console.error(`[prompt-regression] FAIL - ${findings.length} regression(s):`);
    for (const finding of findings) {
      console.error(`- ${finding.slug}: ${finding.message}`);
    }
    process.exitCode = 1;
    return;
  }

  const added = Object.keys(current).filter((slug) => !baseline[slug]);
  console.log(
    `[prompt-regression] PASS - ${Object.keys(current).length} styles deliver at least what they used to${added.length ? `, ${added.length} new` : ""}.`
  );
}

if (process.argv[1]?.includes("check-prompt-regression")) {
  main();
}
