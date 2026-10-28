// Style Repair - rewrites forbidden classes to the style's own replacements.
//
// Why this exists: the linter could say what was wrong and, in the best case,
// suggest one class to use instead. A developer (or an agent) still had to find
// every occurrence and edit it by hand, which is exactly where AI-generated
// pages stop matching the chosen style. Repair closes that loop: the same rule
// set that fails the code produces the fixed code.
//
// Deliberately narrow. It only rewrites class tokens that the linter already
// reports, and only when the style itself supplies a replacement. It never
// invents classes, never evaluates an expression (only literal class text is
// rewritten; variable references are copied verbatim), and never reindents.

import {
  isBareClassList,
  lintCodeWithRules,
  mergeStyleRules,
  stripVariants,
  type MergedRules,
  type StyleLintReport,
} from "./style-linter";

export interface StyleRepairEdit {
  /** The token as it appeared in the source, variants included. */
  from: string;
  /** The replacement, variants preserved, e.g. "hover:rounded-none". */
  to: string;
  line: number;
}

export interface StyleRepairUnfixed {
  className: string;
  line: number;
  reason: string;
}

export interface StyleRepairResult {
  slug: string;
  /** Source after every applicable rewrite. Byte-identical when nothing applied. */
  code: string;
  edits: StyleRepairEdit[];
  unfixed: StyleRepairUnfixed[];
  /** Report for the rewritten source, so callers can show the result, not the input. */
  report: StyleLintReport;
  /** Report for the source as submitted. */
  before: StyleLintReport;
}

/** Variant prefixes (`hover:`, `dark:`, `[&>*]:`) that must survive a rewrite. */
function variantPrefix(className: string): string {
  const base = stripVariants(className);
  return className.slice(0, className.length - base.length);
}

/**
 * Applies replacement class tokens to the class attributes of `code`.
 *
 * Rewrites are positional: every class attribute is re-read and its string
 * literals are rebuilt token by token, so a token repeated on three lines is
 * replaced on all three and unrelated text is never touched.
 *
 * A bare class string (no markup at all) is itself the class list, because the
 * linter reads it that way. `applied` records which replacements really landed
 * so the caller can report an unlocatable class as unfixed instead of claiming
 * an edit that never happened.
 */
function rewriteClassAttributes(
  code: string,
  replacements: Map<string, string>,
): { code: string; applied: Set<string> } {
  const applied = new Set<string>();
  if (replacements.size === 0) return { code, applied };
  if (isBareClassList(code)) {
    return { code: rewriteTokens(code, replacements, applied), applied };
  }

  let out = "";
  let cursor = 0;
  for (const match of code.matchAll(/\b(className|class)\s*=\s*(?:"([^"]*)"|'([^']*)'|`([^`]*)`|\{)/g)) {
    const [whole, , dq, sq, tpl] = match;
    const index = match.index ?? 0;
    out += code.slice(cursor, index);

    if (dq !== undefined) {
      out += `${whole.slice(0, -dq.length - 2)}"${rewriteTokens(dq, replacements, applied)}"`;
    } else if (sq !== undefined) {
      out += `${whole.slice(0, -sq.length - 2)}'${rewriteTokens(sq, replacements, applied)}'`;
    } else if (tpl !== undefined) {
      out += `${whole.slice(0, -tpl.length - 2)}\`${rewriteTemplate(tpl, replacements, applied)}\``;
    } else {
      // A `{...}` attribute holds an expression, not a class list: rebuild its
      // string and template literals and leave every variable reference alone.
      // The brace is matched, not covered by the regex, because `cn("a", f("b"))`
      // nests.
      const open = index + whole.length - 1;
      const close = matchBrace(code, open);
      if (close === -1) {
        out += whole;
      } else {
        out += whole + rewriteExpression(code.slice(open + 1, close), replacements, applied) + "}";
        cursor = close + 1;
        continue;
      }
    }
    cursor = index + whole.length;
  }
  return { code: out + code.slice(cursor), applied };
}

/**
 * Rebuilds the string and template literals of an expression, leaving code
 * between them untouched. So `cn("rounded-xl", cond && styles.card)` keeps the
 * variable reference and rewrites only the literal, and a nested template is
 * handled by {@link rewriteTemplate} rather than evaluated.
 */
function rewriteExpression(
  expression: string,
  replacements: Map<string, string>,
  applied: Set<string>,
): string {
  return expression.replace(
    /"([^"]*)"|'([^']*)'|`([^`]*)`/g,
    (literal: string, innerDq?: string, innerSq?: string, innerTpl?: string) => {
      if (innerTpl !== undefined) return `\`${rewriteTemplate(innerTpl, replacements, applied)}\``;
      return innerDq !== undefined
        ? `"${rewriteTokens(innerDq, replacements, applied)}"`
        : `'${rewriteTokens(innerSq ?? "", replacements, applied)}'`;
    },
  );
}

/**
 * Rewrites a template literal's static text while copying each `${...}` span
 * verbatim. An interpolation computes a value at runtime, so rewriting tokens
 * inside it would change code this pass did not read.
 */
function rewriteTemplate(
  template: string,
  replacements: Map<string, string>,
  applied: Set<string>,
): string {
  let out = "";
  let index = 0;
  while (index < template.length) {
    const start = template.indexOf("${", index);
    if (start === -1) {
      out += rewriteTokens(template.slice(index), replacements, applied);
      break;
    }
    out += rewriteTokens(template.slice(index, start), replacements, applied);
    const close = matchBrace(template, start + 1);
    const stop = close === -1 ? template.length : close + 1;
    out += rewriteExpression(template.slice(start, stop), replacements, applied);
    index = stop;
  }
  return out;
}

/** Index of the `}` closing the `{` at `open`, ignoring braces inside strings. */
function matchBrace(code: string, open: number): number {
  let depth = 0;
  let quote: string | null = null;
  for (let i = open; i < code.length; i += 1) {
    const ch = code[i];
    if (quote) {
      if (ch === "\\") i += 1;
      else if (ch === quote) quote = null;
      continue;
    }
    if (ch === '"' || ch === "'" || ch === "`") quote = ch;
    else if (ch === "{") depth += 1;
    else if (ch === "}" && --depth === 0) return i;
  }
  return -1;
}

/**
 * Replaces the tokens of one class string.
 *
 * A replacement may name several classes. Parts that already carry a variant of
 * their own keep it; bare parts inherit the original's variant so `hover:` rules
 * keep applying on hover. Parts the segment already contains are dropped, which
 * is what keeps `border-2 -> border border-white/15` from becoming a duplicate.
 */
function rewriteTokens(
  segment: string,
  replacements: Map<string, string>,
  applied: Set<string>,
): string {
  // Whole-token membership: `border` must not be considered present just
  // because the segment contains `border-2`, which is the token being replaced.
  const present = new Set(segment.split(/\s+/).filter(Boolean));
  const leading = /^\s*/.exec(segment)?.[0] ?? "";
  const trailing = /\s*$/.exec(segment)?.[0] ?? "";
  const body = segment.slice(leading.length, segment.length - trailing.length);
  if (!body) return segment;

  let out = "";
  let separator = "";
  let emittedAny = false;

  for (const part of body.split(/(\s+)/)) {
    if (part === "") continue;
    if (/^\s+$/.test(part)) {
      separator = part;
      continue;
    }

    const replacement = replacements.get(part);
    if (!replacement) {
      out += (emittedAny ? separator : leading) + part;
      emittedAny = true;
      separator = "";
      continue;
    }

    const prefix = variantPrefix(part);
    const emitted: string[] = [];
    for (const piece of replacement.split(/\s+/).filter(Boolean)) {
      const candidate = piece.includes(":") ? piece : `${prefix}${piece}`;
      if (present.has(candidate) || emitted.includes(candidate)) continue;
      emitted.push(candidate);
    }
    applied.add(part);
    // Every replacement part is already present, so the token disappears. Its
    // separator is dropped with it rather than left as a gap.
    if (emitted.length === 0) {
      separator = "";
      continue;
    }
    out += (emittedAny ? separator : leading) + emitted.join(" ");
    emittedAny = true;
    separator = "";
  }

  return out + trailing;
}

/**
 * Lints `code` against `slug` and rewrites every violation that has a concrete
 * replacement.
 *
 * One pass is enough: replacements come from the style's own tokens, which the
 * rule set exempts from its own bans. A second pass is still run so the returned
 * report describes the code the caller receives, not the code it sent.
 */
export function repairStyleCode(slug: string, code: string): StyleRepairResult {
  const rules = mergeStyleRules(slug);
  return repairCodeWithRules(slug, code, rules);
}

export function repairCodeWithRules(
  slug: string,
  code: string,
  rules: MergedRules,
): StyleRepairResult {
  const before = lintCodeWithRules(rules, code, { slug });
  const replacements = new Map<string, string>();
  const edits: StyleRepairEdit[] = [];
  const unfixed: StyleRepairUnfixed[] = [];

  for (const violation of before.violations) {
    if (!violation.fix) {
      unfixed.push({
        className: violation.className,
        line: violation.line,
        reason: violation.reason,
      });
      continue;
    }
    // The fix is a full class list ("border-2 border-black"), and each part
    // inherits the original variant so `hover:` rules keep applying on hover.
    const to = violation.fix
      .split(/\s+/)
      .filter(Boolean)
      .map((part) => `${variantPrefix(violation.className)}${part}`)
      .join(" ");
    if (to === violation.className) {
      unfixed.push({
        className: violation.className,
        line: violation.line,
        reason: violation.reason,
      });
      continue;
    }
    replacements.set(violation.className, to);
    edits.push({ from: violation.className, to, line: violation.line });
  }

  const { code: repaired, applied } = rewriteClassAttributes(code, replacements);
  // Only report edits that actually landed. A class the linter saw inside a
  // construct this pass cannot rewrite (a concatenation, a computed key) is
  // unfixed, not silently claimed as repaired. A class repeated on several
  // lines is still one replacement, so `applied` is keyed by token.
  const appliedEdits = edits.filter((edit) => applied.has(edit.from));
  for (const edit of edits) {
    if (applied.has(edit.from)) continue;
    const violation = before.violations.find((item) => item.className === edit.from);
    unfixed.push({
      className: edit.from,
      line: edit.line,
      reason: violation?.reason ?? "No concrete replacement could be applied.",
    });
  }

  return {
    slug,
    code: repaired,
    edits: appliedEdits,
    unfixed,
    before,
    report: lintCodeWithRules(rules, repaired, { slug }),
  };
}
