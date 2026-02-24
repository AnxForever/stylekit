import type { DesignStyle } from "./index";

type RulePolarity = "pos" | "neg";
type SectionKind = "required" | "forbidden" | "other";

interface RuleFlags {
  radiusNone: boolean;
  radiusRound: boolean;
  shadowNone: boolean;
  shadowOther: boolean;
  bgOpaque: boolean;
  bgTranslucent: boolean;
}

interface ParsedSection {
  heading: string;
  lines: string[];
  kind: SectionKind;
}

interface ParsedAiRules {
  preamble: string[];
  sections: ParsedSection[];
  usesMarkdownHeading: boolean;
}

export interface StyleRuleConflictReport {
  doDont: string[];
  aiRules: string[];
}

const NEGATOR_PATTERNS = [
  /禁止/,
  /不要/,
  /避免/,
  /严禁/,
  /\bdo\s+not\b/i,
  /\bdon't\b/i,
  /\bmust\s+not\b/i,
  /\bforbidden\b/i,
  /\bavoid\b/i,
  /\bwithout\b/i,
  /\bnot\b/i,
  /(?:^|[^a-z])no(?:\s+|$)/i,
];

const REQUIRED_MARKERS = [
  "必须遵守",
  "必须使用",
  "must follow",
  "must use",
  "required",
];

const FORBIDDEN_MARKERS = [
  "绝对禁止",
  "禁止使用",
  "禁止",
  "must avoid",
  "must not",
  "absolutely forbidden",
  "forbidden",
];

const RADIUS_NONE_RE = /\brounded-none\b/i;
const RADIUS_ROUND_RE = /\brounded-(?:sm|md|lg|xl|2xl|3xl|full)\b/i;
const SHADOW_NONE_RE = /\bshadow-none\b/i;
const SHADOW_OTHER_RE = /\bshadow(?:-(?!none\b)[a-z0-9[\]#/.%_-]+)?\b/i;
const BG_OPAQUE_RE = /\bbg-(?:white|black)\b(?!\/)/i;
const BG_TRANSLUCENT_RE = /\bbg-(?:white|black)\/[0-9]{1,3}\b/i;

const EMPTY_FLAGS: RuleFlags = {
  radiusNone: false,
  radiusRound: false,
  shadowNone: false,
  shadowOther: false,
  bgOpaque: false,
  bgTranslucent: false,
};

function hasCjk(text: string): boolean {
  return /[\u4e00-\u9fff]/.test(text);
}

function detectLang(style: DesignStyle): "zh" | "en" {
  return hasCjk(`${style.name}\n${style.aiRules}`) ? "zh" : "en";
}

function dedupe(items: string[]): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const item of items) {
    const cleaned = item.trim();
    if (!cleaned) continue;
    const key = cleaned.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(cleaned);
  }
  return out;
}

function parseHeading(line: string): { heading: string; markdown: boolean } | null {
  const trimmed = line.trim();
  if (!trimmed) return null;
  if (/^##\s+/.test(trimmed)) {
    return { heading: trimmed, markdown: true };
  }
  if (/^[A-Z][A-Z0-9/()& _-]{2,}:\s*$/.test(trimmed)) {
    return { heading: trimmed, markdown: false };
  }
  return null;
}

function normalizeHeadingText(heading: string): string {
  return heading
    .trim()
    .replace(/^##\s+/, "")
    .replace(/:\s*$/, "")
    .toLowerCase();
}

function classifyHeading(heading: string): SectionKind {
  const text = normalizeHeadingText(heading);
  if (REQUIRED_MARKERS.some((marker) => text.includes(marker))) return "required";
  if (FORBIDDEN_MARKERS.some((marker) => text.includes(marker))) return "forbidden";
  return "other";
}

function parseAiRules(aiRules: string): ParsedAiRules {
  const lines = aiRules.replace(/\r\n/g, "\n").split("\n");
  const preamble: string[] = [];
  const sections: ParsedSection[] = [];
  let current: ParsedSection | null = null;
  let usesMarkdownHeading = false;

  for (const line of lines) {
    const heading = parseHeading(line);
    if (heading) {
      if (current) sections.push(current);
      current = {
        heading: heading.heading,
        lines: [],
        kind: classifyHeading(heading.heading),
      };
      if (heading.markdown) usesMarkdownHeading = true;
      continue;
    }

    if (current) current.lines.push(line);
    else preamble.push(line);
  }

  if (current) sections.push(current);
  return { preamble, sections, usesMarkdownHeading };
}

function polarityOf(line: string, sectionKind: SectionKind): RulePolarity {
  if (sectionKind === "forbidden") return "neg";
  if (sectionKind === "required") return "pos";
  return NEGATOR_PATTERNS.some((pattern) => pattern.test(line)) ? "neg" : "pos";
}

function collectFlags(lines: string[]): RuleFlags {
  const flags: RuleFlags = { ...EMPTY_FLAGS };
  for (const line of lines) {
    if (RADIUS_NONE_RE.test(line)) flags.radiusNone = true;
    if (RADIUS_ROUND_RE.test(line)) flags.radiusRound = true;
    if (SHADOW_NONE_RE.test(line)) flags.shadowNone = true;
    if (SHADOW_OTHER_RE.test(line) && !SHADOW_NONE_RE.test(line)) flags.shadowOther = true;
    if (BG_OPAQUE_RE.test(line)) flags.bgOpaque = true;
    if (BG_TRANSLUCENT_RE.test(line)) flags.bgTranslucent = true;
  }
  return flags;
}

function collectAiFlags(aiRules: string): { pos: RuleFlags; neg: RuleFlags } {
  const parsed = parseAiRules(aiRules);
  const posLines: string[] = [];
  const negLines: string[] = [];
  const explicitConstraintSections = parsed.sections.filter(
    (section) => section.kind === "required" || section.kind === "forbidden"
  );

  const collectFrom = (sectionKind: SectionKind, lines: string[]) => {
    for (const raw of lines) {
      const line = raw.trim();
      if (!line) continue;
      if (line.startsWith("#")) continue;
      const normalized = line.replace(/^[-*]\s+/, "").replace(/^\d+\.\s+/, "").trim();
      if (!normalized) continue;
      const polarity = polarityOf(normalized, sectionKind);
      if (polarity === "neg") negLines.push(normalized);
      else posLines.push(normalized);
    }
  };

  if (explicitConstraintSections.length > 0) {
    for (const section of explicitConstraintSections) {
      collectFrom(section.kind, section.lines);
    }
  } else {
    collectFrom("other", parsed.preamble);
    for (const section of parsed.sections) {
      collectFrom(section.kind, section.lines);
    }
  }

  return {
    pos: collectFlags(posLines),
    neg: collectFlags(negLines),
  };
}

function styleCorpus(style: DesignStyle): string {
  const componentCode = Object.values(style.components || {})
    .map((component) => component?.code || "")
    .join("\n");
  return `${componentCode}\n${style.globalCss}\n${style.philosophy}`.toLowerCase();
}

function countInCorpus(corpus: string, pattern: RegExp): number {
  const globalPattern = pattern.global ? pattern : new RegExp(pattern.source, `${pattern.flags}g`);
  const matches = corpus.match(globalPattern);
  return matches ? matches.length : 0;
}

function pruneConflictingListItems(style: DesignStyle, doListInput: string[], dontListInput: string[]): { doList: string[]; dontList: string[] } {
  const doList = [...doListInput];
  const dontList = [...dontListInput];
  const corpus = styleCorpus(style);

  const removeBy = (list: string[], matcher: RegExp) => list.filter((line) => !matcher.test(line));
  const hasAny = (list: string[], matcher: RegExp) => list.some((line) => matcher.test(line));

  // Remove exact duplicates first.
  const doLower = new Set(doList.map((line) => line.toLowerCase()));
  let sanitizedDont = dontList.filter((line) => !doLower.has(line.toLowerCase()));
  let sanitizedDo = [...doList];

  const radiusNoneCount = countInCorpus(corpus, /\brounded-none\b/i);
  const radiusRoundCount = countInCorpus(corpus, /\brounded-(?:sm|md|lg|xl|2xl|3xl|full)\b/i);
  const shadowNoneCount = countInCorpus(corpus, /\bshadow-none\b/i);
  const shadowOtherCount = countInCorpus(corpus, /\bshadow(?:-(?!none\b)[a-z0-9[\]#/.%_-]+)?\b/i);
  const bgOpaqueCount = countInCorpus(corpus, /\bbg-(?:white|black)\b(?!\/)/i);
  const bgTransCount = countInCorpus(corpus, /\bbg-(?:white|black)\/[0-9]{1,3}\b/i);

  const resolveCrossConflict = (
    matcher: RegExp,
    preferDoWhen: boolean
  ) => {
    const doHit = hasAny(sanitizedDo, matcher);
    const dontHit = hasAny(sanitizedDont, matcher);
    if (!doHit || !dontHit) return;
    if (preferDoWhen) sanitizedDont = removeBy(sanitizedDont, matcher);
    else sanitizedDo = removeBy(sanitizedDo, matcher);
  };

  resolveCrossConflict(RADIUS_NONE_RE, radiusNoneCount >= radiusRoundCount);
  resolveCrossConflict(RADIUS_ROUND_RE, radiusRoundCount >= radiusNoneCount);
  resolveCrossConflict(SHADOW_NONE_RE, shadowNoneCount >= shadowOtherCount);
  resolveCrossConflict(SHADOW_OTHER_RE, shadowOtherCount >= shadowNoneCount);
  resolveCrossConflict(BG_OPAQUE_RE, bgOpaqueCount >= bgTransCount);
  resolveCrossConflict(BG_TRANSLUCENT_RE, bgTransCount >= bgOpaqueCount);

  return {
    doList: dedupe(sanitizedDo),
    dontList: dedupe(sanitizedDont),
  };
}

function formatRuleItems(items: string[]): string[] {
  return items.map((item) => {
    const normalized = item.trim().replace(/^[-*]\s+/, "");
    return `- ${normalized}`;
  });
}

function buildSection(heading: string, lines: string[]): string {
  return `${heading}\n\n${lines.join("\n")}`;
}

function normalizeAiRulesText(style: DesignStyle, doList: string[], dontList: string[]): string {
  const parsed = parseAiRules(style.aiRules || "");
  const lang = detectLang(style);
  const useMarkdown = parsed.usesMarkdownHeading || parsed.sections.length > 0;

  const requiredHeading = useMarkdown
    ? lang === "zh"
      ? "## 必须遵守"
      : "## Must Follow"
    : lang === "zh"
      ? "必须遵守："
      : "MUST FOLLOW:";

  const forbiddenHeading = useMarkdown
    ? lang === "zh"
      ? "## 绝对禁止"
      : "## Absolutely Forbidden"
    : lang === "zh"
      ? "绝对禁止："
      : "ABSOLUTELY FORBIDDEN:";

  const requiredSection = buildSection(requiredHeading, formatRuleItems(doList));
  const forbiddenSection = buildSection(forbiddenHeading, formatRuleItems(dontList));

  const removedKinds = parsed.sections
    .filter((section) => section.kind === "required" || section.kind === "forbidden")
    .map((section) => section.kind);
  const requiredFirst =
    removedKinds.includes("required") &&
    (!removedKinds.includes("forbidden") || removedKinds.indexOf("required") < removedKinds.indexOf("forbidden"));

  const rebuiltParts: string[] = [];
  const preamble = parsed.preamble.join("\n").trim();
  if (preamble) rebuiltParts.push(preamble);

  if (requiredFirst) {
    rebuiltParts.push(requiredSection);
    rebuiltParts.push(forbiddenSection);
  } else {
    rebuiltParts.push(forbiddenSection);
    rebuiltParts.push(requiredSection);
  }

  for (const section of parsed.sections) {
    if (section.kind === "required" || section.kind === "forbidden") continue;
    const sectionText = [section.heading, ...section.lines].join("\n").trim();
    if (sectionText) rebuiltParts.push(sectionText);
  }

  return rebuiltParts.join("\n\n").trim();
}

function flagConflicts(doList: string[], dontList: string[], aiRules: string): StyleRuleConflictReport {
  const doFlags = collectFlags(doList);
  const dontFlags = collectFlags(dontList);
  const aiFlags = collectAiFlags(aiRules);

  const doDontConflicts: string[] = [];
  const aiConflicts: string[] = [];

  const checkDoDont = (condition: boolean, code: string) => {
    if (condition) doDontConflicts.push(code);
  };
  const checkAi = (condition: boolean, code: string) => {
    if (condition) aiConflicts.push(code);
  };

  checkDoDont(doFlags.radiusNone && dontFlags.radiusNone, "radius-none");
  checkDoDont(doFlags.radiusRound && dontFlags.radiusRound, "radius-round");
  checkDoDont(doFlags.shadowNone && dontFlags.shadowNone, "shadow-none");
  checkDoDont(doFlags.shadowOther && dontFlags.shadowOther, "shadow-other");
  checkDoDont(doFlags.bgOpaque && dontFlags.bgOpaque, "bg-opaque");
  checkDoDont(doFlags.bgTranslucent && dontFlags.bgTranslucent, "bg-translucent");

  checkAi(doFlags.radiusNone && aiFlags.neg.radiusNone, "ai-vs-do:radius-none");
  checkAi(doFlags.radiusRound && aiFlags.neg.radiusRound, "ai-vs-do:radius-round");
  checkAi(doFlags.shadowNone && aiFlags.neg.shadowNone, "ai-vs-do:shadow-none");
  checkAi(doFlags.shadowOther && aiFlags.neg.shadowOther, "ai-vs-do:shadow-other");
  checkAi(doFlags.bgOpaque && aiFlags.neg.bgOpaque, "ai-vs-do:bg-opaque");
  checkAi(doFlags.bgTranslucent && aiFlags.neg.bgTranslucent, "ai-vs-do:bg-translucent");

  checkAi(dontFlags.radiusNone && aiFlags.pos.radiusNone, "ai-vs-dont:radius-none");
  checkAi(dontFlags.radiusRound && aiFlags.pos.radiusRound, "ai-vs-dont:radius-round");
  checkAi(dontFlags.shadowNone && aiFlags.pos.shadowNone, "ai-vs-dont:shadow-none");
  checkAi(dontFlags.shadowOther && aiFlags.pos.shadowOther, "ai-vs-dont:shadow-other");
  checkAi(dontFlags.bgOpaque && aiFlags.pos.bgOpaque, "ai-vs-dont:bg-opaque");
  checkAi(dontFlags.bgTranslucent && aiFlags.pos.bgTranslucent, "ai-vs-dont:bg-translucent");

  return {
    doDont: doDontConflicts,
    aiRules: aiConflicts,
  };
}

export function detectStyleRuleConflicts(style: DesignStyle): StyleRuleConflictReport {
  return flagConflicts(style.doList || [], style.dontList || [], style.aiRules || "");
}

export function normalizeStyleRules(style: DesignStyle): DesignStyle {
  const dedupedDo = dedupe(style.doList || []);
  const dedupedDont = dedupe(style.dontList || []);
  const sanitizedLists = pruneConflictingListItems(style, dedupedDo, dedupedDont);
  const normalizedAiRules = normalizeAiRulesText(style, sanitizedLists.doList, sanitizedLists.dontList);

  return {
    ...style,
    doList: sanitizedLists.doList,
    dontList: sanitizedLists.dontList,
    aiRules: normalizedAiRules,
  };
}
