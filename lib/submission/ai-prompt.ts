/**
 * The prompt contributors paste into their AI assistant.
 *
 * Kept in code rather than fetched from `docs/submission/ai-submission-pack.md`
 * so the page cannot drift from the gates: the constraints listed here are
 * generated from the same vocabulary and thresholds the gates enforce.
 */

import { STYLE_CATEGORIES, STYLE_TAGS, STYLE_TYPES } from "@/lib/styles/meta-types";

export const MASTER_PROMPT = `You are generating a StyleKit style submission manifest.

Output exactly one JSON object and nothing else. No commentary, no fenced block labels other than json.

REQUIRED SHAPE
{
  "schemaVersion": "1.0.0",
  "generatedAt": "<current ISO 8601 timestamp>",
  "source": { "assistant": "claude|cursor|chatgpt|manual|other", "model": "<model name>" },
  "formData": { ... },
  "assets": { "coverSvg": "<svg>...</svg>" },
  "selfCheck": {
    "schemaValid": true,
    "requiredFilesPrepared": ["manifest.json", "cover.svg"],
    "componentCoverage": ["buttonCode", "cardCode", "inputCode"],
    "notes": "qualityRisks: ...  maintainerReviewFocus: ..."
  }
}

HARD CONSTRAINTS - a submission is rejected automatically if any fail
- slug matches ^[a-z0-9]+(?:-[a-z0-9]+)*$ and is not an existing StyleKit style
- category is one of: ${STYLE_CATEGORIES.join(" | ")}
- styleType is one of: ${STYLE_TYPES.join(" | ")}
- tags come only from: ${STYLE_TAGS.join(", ")}
- every color field is a 3- or 6-digit hex value
  (primaryColor, secondaryColor, background, foreground, muted, accentColors[])
- doList and dontList each hold at least one non-empty rule
- aiRules holds at least 3 non-empty, actionable rules
- buttonCode, cardCode and inputCode are each at least 60 characters of real markup
- no TODO, FIXME, lorem ipsum or placeholder text anywhere
- no <script>, <iframe>, inline event handlers or javascript: URLs
- assets.coverSvg has an <svg> root AND draws shapes (rect/circle/path/...),
  not just a headline

QUALITY CONSTRAINTS - not auto-rejected, but a reviewer will see them
- include at least 2 of navCode, heroCode, footerCode
- reuse the declared palette inside the component code rather than inventing colors
- keep one coherent visual language across every snippet
- component code should render standalone: plain HTML or JSX with Tailwind
  classes, no imports, no component references
- the cover should read as the same style as the components

REMAINING formData FIELDS (all required, all strings)
  name, nameEn, description, philosophy,
  headingFont, bodyFont,
  fontSizeBase, fontSizeHeading, fontSizeSmall,
  fontWeightNormal, fontWeightBold,
  lineHeightNormal, lineHeightTight,
  borderRadius, spacingSm, spacingMd, spacingLg
  keywords is an array of strings (3 or more recommended)

Add no fields beyond those listed.`;

/** What a contributor should decide before prompting. */
export const PROMPT_INPUT_CHECKLIST = [
  "Style name, in your language and in English",
  "A slug candidate in lowercase kebab-case",
  "Palette: primary, secondary, background, foreground, muted, 1-3 accents",
  "One or two sentences of design philosophy",
  "3 or more Do rules and 3 or more Don't rules",
  "3 or more actionable AI rules",
  "Which extended components to include: nav, hero, footer",
] as const;
