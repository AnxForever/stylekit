// Style Linter - checks real user code against a style's forbidden/required rules.
//
// Why this exists: StyleKit ships precise per-style constraints (forbidden classes,
// required component classes), but nothing ever validated real code against them.
// AI assistants could read the rules yet had no way to verify their own output.
//
// Two rule sources are merged (measured: 0 hard conflicts between them, 12/15 styles
// carry complementary entries):
//   - lib/styles/lint-rules.ts  curated, 15 styles, hand-written reasons
//   - StyleTokens.forbidden     generated, all registered styles
//
// Merge strategy differs per rule kind, deliberately:
//   forbidden -> union      (bans are complementary; more coverage is safer)
//   required  -> curated wins (both sources describe the SAME requirement in
//                different notations, so unioning would demand both spellings)
//
// Design constraint: prefer a false negative over a false positive. A linter that
// cries wolf gets ignored by both humans and models, which is worse than one that
// occasionally stays quiet.

import { getStyleLintRules } from "./lint-rules";
import { getStyleTokens } from "./tokens-registry";
import type { StyleTokens } from "./tokens";

export type StyleLintSeverity = "error" | "warning";
export type StyleLintRuleSource = "curated" | "tokens";
export type StyleLintComponent = "button" | "card" | "input";

export interface StyleLintViolation {
  /** Class exactly as written in the source, variants included (e.g. "dark:shadow-lg"). */
  className: string;
  /** Class with variant prefixes stripped (e.g. "shadow-lg"). Opacity is kept. */
  baseClassName: string;
  /** 1-indexed line in the input code. */
  line: number;
  severity: StyleLintSeverity;
  source: StyleLintRuleSource;
  rule: "forbidden-class" | "forbidden-pattern";
  reason: string;
  /** Concrete replacement suggestion, when one can be derived. */
  fix?: string;
}

export interface StyleLintMissingRequired {
  component: StyleLintComponent;
  /** Individual classes that the style requires but the code never uses. */
  missing: string[];
  source: StyleLintRuleSource;
}

export interface StyleLintReport {
  slug: string;
  /** True when there are no violations. Missing required classes do not fail the report. */
  ok: boolean;
  violations: StyleLintViolation[];
  missingRequired: StyleLintMissingRequired[];
  /** How many class tokens were extracted and checked. */
  checkedClasses: number;
  /** Which rule sources contributed. Empty means the slug has no rules at all. */
  ruleSources: StyleLintRuleSource[];
}

export interface StyleLintOptions {
  /**
   * Components to check for missing required classes. Defaults to none, because
   * a snippet is rarely expected to contain every component of the style.
   */
  checkRequired?: StyleLintComponent[];
}

/** A class token plus where it came from. */
interface ExtractedClass {
  raw: string;
  line: number;
}

const CLASS_ATTR_RE = /\b(?:className|class)\s*=\s*/g;

/**
 * Pulls Tailwind class tokens out of source code.
 *
 * Only looks inside `className=` / `class=` values, and only at string literals
 * within them. That deliberately skips anything not statically knowable
 * (`className={styles.foo}`, interpolations) rather than guessing.
 *
 * Handles: plain strings, `{"..."}`, template literals (interpolations dropped),
 * and helper calls like `cn("a", cond && "b")` / `clsx(...)`.
 */
export function extractClassNames(code: string): ExtractedClass[] {
  const found: ExtractedClass[] = [];
  const lineStarts = buildLineStarts(code);

  CLASS_ATTR_RE.lastIndex = 0;
  let attrMatch: RegExpExecArray | null;

  while ((attrMatch = CLASS_ATTR_RE.exec(code)) !== null) {
    const valueStart = attrMatch.index + attrMatch[0].length;
    const region = readAttributeValue(code, valueStart);
    if (!region) continue;

    for (const literal of readStringLiterals(code, region.start, region.end)) {
      // Scan with positions so each token maps to its own line. Template
      // interpolations were blanked out (not removed), so offsets stay aligned
      // with the original source.
      const tokenRe = /\S+/g;
      let token: RegExpExecArray | null;
      while ((token = tokenRe.exec(literal.text)) !== null) {
        found.push({
          raw: token[0],
          line: offsetToLine(lineStarts, literal.offset + token.index),
        });
      }
    }

    // Continue scanning after this attribute value.
    CLASS_ATTR_RE.lastIndex = region.end;
  }

  return found;
}

/**
 * Determines the source range holding an attribute value.
 * Returns the span to search for string literals, or null if unparseable.
 */
function readAttributeValue(
  code: string,
  from: number,
): { start: number; end: number } | null {
  let i = from;
  while (i < code.length && /\s/.test(code[i])) i += 1;
  if (i >= code.length) return null;

  const opener = code[i];

  if (opener === '"' || opener === "'") {
    const close = code.indexOf(opener, i + 1);
    if (close === -1) return null;
    return { start: i, end: close + 1 };
  }

  if (opener === "{") {
    const close = findMatchingBrace(code, i);
    if (close === -1) return null;
    return { start: i + 1, end: close };
  }

  return null;
}

/** Finds the index of the `}` matching the `{` at `open`, ignoring braces in strings. */
function findMatchingBrace(code: string, open: number): number {
  let depth = 0;
  let quote: string | null = null;

  for (let i = open; i < code.length; i += 1) {
    const ch = code[i];

    if (quote) {
      if (ch === "\\") {
        i += 1;
        continue;
      }
      if (ch === quote) quote = null;
      continue;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
      continue;
    }
    if (ch === "{") depth += 1;
    else if (ch === "}") {
      depth -= 1;
      if (depth === 0) return i;
    }
  }

  return -1;
}

/**
 * Yields the contents of every string literal in [start, end).
 * Template-literal interpolations are replaced with whitespace so that classes
 * on either side stay separate tokens.
 */
function readStringLiterals(
  code: string,
  start: number,
  end: number,
): Array<{ text: string; offset: number }> {
  const literals: Array<{ text: string; offset: number }> = [];
  let i = start;

  while (i < end) {
    const ch = code[i];

    if (ch === '"' || ch === "'") {
      const close = findStringEnd(code, i, ch, end);
      if (close === -1) break;
      literals.push({ text: code.slice(i + 1, close), offset: i + 1 });
      i = close + 1;
      continue;
    }

    if (ch === "`") {
      const close = findStringEnd(code, i, "`", end);
      if (close === -1) break;
      const rawTemplate = code.slice(i + 1, close);
      literals.push({ text: stripInterpolations(rawTemplate), offset: i + 1 });
      i = close + 1;
      continue;
    }

    i += 1;
  }

  return literals;
}

function findStringEnd(
  code: string,
  open: number,
  quote: string,
  limit: number,
): number {
  for (let i = open + 1; i < limit; i += 1) {
    if (code[i] === "\\") {
      i += 1;
      continue;
    }
    if (code[i] === quote) return i;
  }
  return -1;
}

/** Replaces `${...}` spans with spaces, preserving offsets and token boundaries. */
function stripInterpolations(template: string): string {
  let out = "";
  let i = 0;

  while (i < template.length) {
    if (template[i] === "$" && template[i + 1] === "{") {
      const close = findMatchingBrace(template, i + 1);
      const stop = close === -1 ? template.length : close + 1;
      out += " ".repeat(stop - i);
      i = stop;
      continue;
    }
    out += template[i];
    i += 1;
  }

  return out;
}

function buildLineStarts(code: string): number[] {
  const starts = [0];
  for (let i = 0; i < code.length; i += 1) {
    if (code[i] === "\n") starts.push(i + 1);
  }
  return starts;
}

function offsetToLine(lineStarts: number[], offset: number): number {
  let low = 0;
  let high = lineStarts.length - 1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (lineStarts[mid] <= offset) low = mid;
    else high = mid - 1;
  }
  return low + 1;
}

/**
 * Strips Tailwind variant prefixes, keeping the utility itself.
 *
 * Splits on the last top-level `:` so bracketed variants survive intact
 * (`data-[state=open]:bg-red` -> `bg-red`, `[&>*]:p-4` -> `p-4`).
 * Leading `!` (important) is dropped; opacity (`bg-white/50`) is NOT, because
 * `bg-white` and `bg-white/50` mean different things to a style rule.
 */
export function stripVariants(className: string): string {
  let depth = 0;
  let lastColon = -1;

  for (let i = 0; i < className.length; i += 1) {
    const ch = className[i];
    if (ch === "[" || ch === "(") depth += 1;
    else if (ch === "]" || ch === ")") depth -= 1;
    else if (ch === ":" && depth === 0) lastColon = i;
  }

  const base = lastColon === -1 ? className : className.slice(lastColon + 1);
  return base.startsWith("!") ? base.slice(1) : base;
}

/** Normalized rule set merged from both sources. */
export interface MergedRules {
  /** Exact forbidden class -> reason. Curated reasons win over generated ones. */
  forbiddenClasses: Map<string, { reason: string; source: StyleLintRuleSource }>;
  forbiddenPatterns: Array<{
    pattern: RegExp;
    source: StyleLintRuleSource;
    reasons: Record<string, string>;
  }>;
  required: Map<StyleLintComponent, { classes: string[]; source: StyleLintRuleSource }>;
  /**
   * Classes the style itself requires. Never reported as violations, even when
   * a forbidden rule matches them.
   *
   * Measured: 2/15 curated styles ban a class they also require
   * (neo-brutalist forbids `transition-all` yet requires `transition-all duration-200`;
   * dark-mode forbids `text-white` yet requires it). Without this exemption the
   * linter fires on the style's own canonical code, which destroys trust faster
   * than missing a real violation.
   */
  exempt: Set<string>;
  recommended?: {
    borderRadius?: string;
    shadow?: string;
    transition?: string;
    spacing?: string;
  };
  tokens?: StyleTokens;
  sources: StyleLintRuleSource[];
}

/**
 * Merges curated and token-derived rules into one rule set.
 * Union, not override: the two sources were measured to be complementary
 * (no class is forbidden by one while required by the other).
 */
export function mergeStyleRules(slug: string): MergedRules {
  const merged: MergedRules = {
    forbiddenClasses: new Map(),
    forbiddenPatterns: [],
    required: new Map(),
    exempt: new Set(),
    sources: [],
  };

  const tokens = getStyleTokens(slug);
  if (tokens) {
    merged.sources.push("tokens");
    merged.tokens = tokens;

    for (const cls of tokens.forbidden.classes) {
      merged.forbiddenClasses.set(cls, {
        reason: tokens.forbidden.reasons[cls] ?? `"${cls}" is forbidden in this style`,
        source: "tokens",
      });
    }
    for (const pattern of tokens.forbidden.patterns) {
      const compiled = compilePattern(pattern);
      if (compiled) {
        merged.forbiddenPatterns.push({
          pattern: compiled,
          source: "tokens",
          reasons: tokens.forbidden.reasons,
        });
      }
    }
    for (const component of ["button", "card", "input"] as const) {
      const classes = splitRequiredEntries(tokens.required[component]);
      merged.required.set(component, { classes, source: "tokens" });
      for (const cls of classes) merged.exempt.add(stripVariants(cls));
    }
  }

  const curated = getStyleLintRules(slug);
  if (curated) {
    merged.sources.push("curated");
    merged.recommended = curated.recommended;

    for (const cls of curated.forbidden.classes) {
      // Curated reasons are hand-written, so they take precedence.
      merged.forbiddenClasses.set(cls, {
        reason:
          curated.forbidden.reasons[cls] ??
          `"${cls}" is forbidden in ${curated.name}`,
        source: "curated",
      });
    }
    for (const pattern of curated.forbidden.patterns) {
      // Rebuild without the global flag: a shared /g regex carries lastIndex
      // between .test() calls and would report inconsistently.
      merged.forbiddenPatterns.push({
        pattern: new RegExp(pattern.source, pattern.flags.replace(/g/g, "")),
        source: "curated",
        reasons: curated.forbidden.reasons,
      });
    }
    for (const component of ["button", "card", "input"] as const) {
      const entries = curated.required[component];
      if (!entries?.length) continue;
      // Unlike forbidden rules, required sets are NOT unioned: the two sources
      // express the same visual requirement in different notations
      // (shadow-[4px_4px_0_#000] vs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).
      // Unioning them would demand both spellings at once. Curated wins.
      const classes = splitRequiredEntries(entries);
      merged.required.set(component, { classes, source: "curated" });
      // Exemptions still accumulate across both sources: a class required by
      // either source must not be reported, whichever source banned it.
      for (const cls of classes) merged.exempt.add(stripVariants(cls));
    }
  }

  return merged;
}

/** Required entries may bundle several classes ("border-2 border-black"). */
function splitRequiredEntries(entries: string[] | undefined): string[] {
  if (!entries?.length) return [];
  const out: string[] = [];
  for (const entry of entries) {
    for (const token of entry.split(/\s+/)) {
      const trimmed = token.trim();
      if (trimmed) out.push(trimmed);
    }
  }
  return out;
}

function compilePattern(pattern: string): RegExp | null {
  try {
    return new RegExp(pattern);
  } catch {
    // A malformed pattern in style data must not break linting.
    return null;
  }
}

/**
 * Derives a concrete replacement class for a forbidden one.
 *
 * Only returns real class values pulled from the style's own tokens. It never
 * echoes the reason back: the reason is already shown next to the violation,
 * and repeating it as the "fix" is noise. When nothing concrete can be derived,
 * the reason alone has to carry the guidance.
 */
function deriveFix(
  baseClassName: string,
  rules: MergedRules,
): string | undefined {
  const tokens = rules.tokens;
  const recommended = rules.recommended;

  // Tokens hold literal classes; `recommended` is prose more often than not,
  // so tokens win when both are available.
  if (baseClassName.startsWith("rounded")) {
    return tokens?.border.radius ?? recommended?.borderRadius;
  }
  if (baseClassName.startsWith("shadow")) {
    return tokens?.shadow.md ?? recommended?.shadow;
  }
  if (
    baseClassName.startsWith("transition") ||
    baseClassName.startsWith("duration")
  ) {
    return tokens?.interaction.transition ?? recommended?.transition;
  }
  if (baseClassName.startsWith("border")) {
    if (!tokens) return undefined;
    return `${tokens.border.width} ${tokens.border.color}`.trim() || undefined;
  }
  if (baseClassName.startsWith("bg-")) {
    return tokens?.colors.background.primary;
  }
  if (baseClassName.startsWith("text-")) {
    return tokens?.colors.text.primary;
  }
  if (baseClassName.startsWith("p-") || baseClassName.startsWith("gap-")) {
    return tokens?.spacing.card ?? recommended?.spacing;
  }
  return undefined;
}

/**
 * Lints code against a style's rules.
 *
 * @param slug  Style identifier, e.g. "glassmorphism".
 * @param code  Source to check. JSX/TSX, HTML, or a bare class string.
 */
export function lintStyleCode(
  slug: string,
  code: string,
  options: StyleLintOptions = {},
): StyleLintReport {
  const rules = mergeStyleRules(slug);
  const extracted = extractClassNames(code);
  const violations: StyleLintViolation[] = [];

  for (const { raw, line } of extracted) {
    const base = stripVariants(raw);

    // The style asked for this class. Never report it, whatever the ban says.
    if (rules.exempt.has(base)) continue;

    const exact = rules.forbiddenClasses.get(base);
    if (exact) {
      violations.push({
        className: raw,
        baseClassName: base,
        line,
        severity: "error",
        source: exact.source,
        rule: "forbidden-class",
        reason: exact.reason,
        fix: deriveFix(base, rules),
      });
      continue;
    }

    // Patterns are written against the utility, so test the stripped form.
    // Testing the raw token would let a variant prefix mask a match.
    const matched = rules.forbiddenPatterns.find((entry) => entry.pattern.test(base));
    if (matched) {
      const reason =
        matched.reasons[base] ??
        `"${base}" matches a forbidden pattern for this style (${matched.pattern.source})`;
      violations.push({
        className: raw,
        baseClassName: base,
        line,
        severity: "error",
        source: matched.source,
        rule: "forbidden-pattern",
        reason,
        fix: deriveFix(base, rules),
      });
    }
  }

  const missingRequired: StyleLintMissingRequired[] = [];
  const present = new Set(extracted.map((entry) => entry.raw));
  const presentBase = new Set(extracted.map((entry) => stripVariants(entry.raw)));

  for (const component of options.checkRequired ?? []) {
    const requirement = rules.required.get(component);
    if (!requirement?.classes.length) continue;

    const missing = requirement.classes.filter(
      (cls) => !present.has(cls) && !presentBase.has(stripVariants(cls)),
    );
    if (missing.length) {
      missingRequired.push({ component, missing, source: requirement.source });
    }
  }

  return {
    slug,
    ok: violations.length === 0,
    violations,
    missingRequired,
    checkedClasses: extracted.length,
    ruleSources: rules.sources,
  };
}

/** True when the style has any rules to lint against. */
export function hasLintableRules(slug: string): boolean {
  return mergeStyleRules(slug).sources.length > 0;
}
