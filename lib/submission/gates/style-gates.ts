/**
 * Hard gates and soft signals for style submissions.
 *
 * Calibration matters more than the rule list here. Every blocking gate below
 * was run against all 146 registered styles and produces zero false positives.
 * Three plausible-sounding gates were measured and demoted for failing that bar:
 *
 *   - a11y score >= 60      76 of our own styles score under 60 (median 59).
 *                           Low contrast is the design language of neumorphism
 *                           and soft-ui, not a defect.
 *   - palette subset        89 of 146 styles use hex values outside their own
 *                           declared palette (hover shades, neutral surfaces).
 *   - palette referenced    27 of 146 never name a palette color in component
 *                           code at all.
 *
 * All three survive as advisory signals. See
 * tests/unit/lib/style-quality-baseline.test.ts for the frozen measurements.
 */

import { scoreStyleData } from "@/lib/accessibility";
import { getStyleBySlug } from "@/lib/styles/registry";
import {
  validateStyleSubmissionManifest,
  type StyleSubmissionManifest,
} from "@/lib/submit/manifest-validator";
import {
  deriveStyleColors,
  deriveStyleTokens,
  paletteConsistency,
} from "../adapters/style";
import { isAccepted, type GateReport, type GateResult, type QualitySignal } from "../types";

/** Median a11y score across the 146 registered styles, measured 2026-08-18. */
export const LIBRARY_A11Y_MEDIAN = 59;

const REQUIRED_COMPONENTS = ["buttonCode", "cardCode", "inputCode"] as const;
const EXTENDED_COMPONENTS = ["navCode", "heroCode", "footerCode"] as const;

/**
 * Shortest component snippet in the existing library is 60+ characters, so this
 * floor rejects empty shells without touching anything we ship.
 */
const MIN_COMPONENT_LENGTH = 60;

const PLACEHOLDER_RE = /\bTODO\b|\bFIXME\b|lorem ipsum|placeholder-here|your-\w+-here/i;

/** Tags that can execute or load remote content. */
const DANGEROUS_TAG_RE = /<\s*(?:script|iframe|object|embed|base|link|meta)\b/i;
/** javascript: in a URL-bearing attribute. */
const JS_URL_RE = /(?:href|src|action|formaction)\s*=\s*["'{]?\s*javascript:/i;
/** Lowercase event handler in attribute position, e.g. onclick=" or onerror='. */
const INLINE_HANDLER_RE = /\son[a-z]+\s*=\s*["'{]/;

/** Minimum actionable AI rules. Our own thinnest style carries 21 lines. */
const MIN_AI_RULES = 3;

export interface StyleGateContext {
  /** True when the slug already has a pending or approved submission. */
  slugTaken?: boolean;
}

export async function runStyleGates(
  input: unknown,
  context: StyleGateContext = {},
): Promise<GateReport> {
  const gates: GateResult[] = [];
  const parsed = validateStyleSubmissionManifest(input);

  gates.push({
    id: "schema",
    label: "Manifest schema",
    passed: parsed.ok,
    detail: parsed.ok
      ? "Matches style-submission-manifest schema 1.0.0."
      : parsed.issues
          .slice(0, 6)
          .map((issue) => `${issue.path}: ${issue.message}`)
          .join("; "),
    severity: "blocking",
  });

  if (!parsed.ok) {
    // Every later gate reads typed manifest fields, so stop here rather than
    // report a cascade of failures that all trace back to the schema.
    return {
      kind: "style",
      slug: readSlug(input),
      accepted: false,
      gates,
      signals: [],
      checkedAt: new Date().toISOString(),
    };
  }

  const manifest = parsed.data;
  const form = manifest.formData;

  gates.push(slugGate(form.slug, context.slugTaken ?? false));
  gates.push(...componentGates(manifest));
  gates.push(coverGate(manifest));
  gates.push(aiRulesGate(form.aiRules));
  gates.push(safetyGate(manifest));

  return {
    kind: "style",
    slug: form.slug,
    accepted: isAccepted(gates),
    gates,
    signals: buildSignals(manifest),
    checkedAt: new Date().toISOString(),
  };
}

function slugGate(slug: string, slugTaken: boolean): GateResult {
  const registered = Boolean(getStyleBySlug(slug));
  const passed = !registered && !slugTaken;

  return {
    id: "slug-available",
    label: "Slug is available",
    passed,
    detail: registered
      ? `"${slug}" is already a curated StyleKit style. Pick a different slug.`
      : slugTaken
        ? `"${slug}" already has a submission awaiting or past review.`
        : `"${slug}" is available.`,
    severity: "blocking",
  };
}

function componentGates(manifest: StyleSubmissionManifest): GateResult[] {
  const form = manifest.formData as unknown as Record<string, unknown>;
  const results: GateResult[] = [];

  const tooShort: string[] = [];
  const placeholders: string[] = [];

  for (const field of REQUIRED_COMPONENTS) {
    const code = typeof form[field] === "string" ? (form[field] as string).trim() : "";
    if (code.length < MIN_COMPONENT_LENGTH) {
      tooShort.push(`${field} (${code.length} chars)`);
    }
    if (PLACEHOLDER_RE.test(code)) {
      placeholders.push(field);
    }
  }

  results.push({
    id: "core-components",
    label: "Button, card and input are real",
    passed: tooShort.length === 0,
    detail:
      tooShort.length === 0
        ? "All three core components carry substantive code."
        : `Needs at least ${MIN_COMPONENT_LENGTH} characters of real markup: ${tooShort.join(", ")}.`,
    severity: "blocking",
  });

  results.push({
    id: "no-placeholders",
    label: "No placeholder text",
    passed: placeholders.length === 0,
    detail:
      placeholders.length === 0
        ? "No TODO or lorem-ipsum markers found."
        : `Replace placeholder content in: ${placeholders.join(", ")}.`,
    severity: "blocking",
  });

  return results;
}

function coverGate(manifest: StyleSubmissionManifest): GateResult {
  const svg = manifest.assets.coverSvg ?? "";
  const hasRoot = svg.includes("<svg");
  // A cover that is only a headline teaches nothing about the style. Our own
  // covers all draw UI shapes, so requiring one drawing element is safe.
  const hasShape = /<(rect|circle|path|ellipse|polygon|line|g)\b/i.test(svg);

  return {
    id: "cover-svg",
    label: "Cover SVG shows UI",
    passed: hasRoot && hasShape,
    detail: !hasRoot
      ? "assets.coverSvg must contain a real <svg> root."
      : !hasShape
        ? "Cover contains no shapes. Draw the UI, not just a title."
        : "Cover SVG contains a drawn composition.",
    severity: "blocking",
  };
}

function aiRulesGate(aiRules: readonly string[]): GateResult {
  const filled = aiRules.filter((rule) => rule.trim().length > 0);

  return {
    id: "ai-rules",
    label: "AI rules are usable",
    passed: filled.length >= MIN_AI_RULES,
    detail:
      filled.length >= MIN_AI_RULES
        ? `${filled.length} actionable rules.`
        : `Needs at least ${MIN_AI_RULES} non-empty aiRules; found ${filled.length}.`,
    severity: "blocking",
  };
}

/**
 * Rejects markup carrying executable content.
 *
 * This gate is a courtesy, not the security boundary: `sanitizePreviewHtml`
 * runs at render time regardless, so nothing here can be executed either way.
 * Failing early just tells a submitter their script tag will be stripped
 * instead of leaving them puzzled by a published preview that lost content.
 *
 * The patterns are deliberately narrow and were calibrated against all 146
 * curated styles (0 hits). Two broader approaches were tried and discarded:
 *   - comparing sanitized length to input length flagged 639 of our own
 *     snippets, because DOMPurify strips JSX `className` attributes;
 *   - a bare /\son\w+\s*=/ flagged `const onScroll = () =>` inside
 *     launch-keynote's hero script.
 */
function safetyGate(manifest: StyleSubmissionManifest): GateResult {
  const form = manifest.formData as unknown as Record<string, unknown>;
  const unsafe: string[] = [];

  for (const field of [...REQUIRED_COMPONENTS, ...EXTENDED_COMPONENTS]) {
    const code = typeof form[field] === "string" ? (form[field] as string) : "";
    if (!code.trim()) continue;
    if (
      DANGEROUS_TAG_RE.test(code) ||
      JS_URL_RE.test(code) ||
      INLINE_HANDLER_RE.test(code)
    ) {
      unsafe.push(field);
    }
  }

  return {
    id: "content-safety",
    label: "No executable content",
    passed: unsafe.length === 0,
    detail:
      unsafe.length === 0
        ? "Component markup carries no scripts or event handlers."
        : `Remove script/iframe tags, inline handlers or javascript: URLs from: ${unsafe.join(", ")}.`,
    severity: "blocking",
  };
}

function buildSignals(manifest: StyleSubmissionManifest): QualitySignal[] {
  const form = manifest.formData;
  const colors = deriveStyleColors(form);
  const a11y = scoreStyleData(colors, deriveStyleTokens(form));
  const palette = paletteConsistency(form);

  const extendedCount = EXTENDED_COMPONENTS.filter((field) => {
    const value = (form as unknown as Record<string, unknown>)[field];
    return typeof value === "string" && value.trim().length >= MIN_COMPONENT_LENGTH;
  }).length;

  return [
    {
      id: "a11y",
      label: "Accessibility score",
      value: `${a11y.overall} / 100 (${a11y.grade})`,
      comparison:
        a11y.overall >= LIBRARY_A11Y_MEDIAN
          ? `At or above the library median of ${LIBRARY_A11Y_MEDIAN}.`
          : `Below the library median of ${LIBRARY_A11Y_MEDIAN}. Expected for deliberately low-contrast styles.`,
    },
    {
      id: "contrast-aa",
      label: "Contrast meets WCAG AA",
      value: a11y.contrast.meetsAA ? "yes" : "no",
    },
    {
      id: "palette-consistency",
      label: "Colors outside declared palette",
      value: `${palette.extraColors.length}`,
      comparison:
        palette.extraColors.length === 0
          ? "Component code uses the declared palette only."
          : `e.g. ${palette.extraColors.slice(0, 3).join(", ")}. 89 of 146 curated styles also do this.`,
    },
    {
      id: "palette-referenced",
      label: "Palette appears in component code",
      value: palette.referencesPalette ? "yes" : "no",
      comparison: palette.referencesPalette
        ? undefined
        : "27 of 146 curated styles also omit it, so this is not blocking.",
    },
    {
      id: "extended-components",
      label: "Extended components",
      value: `${extendedCount} of ${EXTENDED_COMPONENTS.length}`,
      comparison:
        extendedCount >= 2
          ? "Enough for a full showcase."
          : "Nav, hero or footer would make the showcase richer.",
    },
  ];
}

function readSlug(input: unknown): string {
  if (!input || typeof input !== "object") return "";
  const form = (input as Record<string, unknown>).formData;
  if (!form || typeof form !== "object") return "";
  const slug = (form as Record<string, unknown>).slug;
  return typeof slug === "string" ? slug : "";
}
