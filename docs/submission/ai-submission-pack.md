# AI Submission Pack for StyleKit

Use this pack to generate submission artifacts that are both schema-valid and production-usable.

## 1) What "submission-ready" means

A submission is ready only when all three artifacts are usable:

1. `manifest.json` fully matches `lib/schemas/style-submission-manifest.schema.json`
2. `cover.svg` is valid SVG and visually matches the style direction
3. `self-check.md` clearly lists risks and review focus

Submission channels:

- GitHub issue form: `.github/ISSUE_TEMPLATE/style_submission.yml`
- Internal/experimental web submit flow. Do not present it as a primary public entry point until the review workflow is polished.

## 2) Input checklist before prompting AI

Provide the assistant with:

- Style name (local + English)
- Slug candidate (kebab-case)
- Category: `modern | retro | minimal | expressive`
- Style type: `visual | layout | animation`
- Color system: primary, secondary, 1-3 accents (hex)
- Typography intent: heading/body feel + scale direction
- Spacing intent: compact/medium/airy
- Style philosophy (1-2 sentences)
- Do rules (3+ preferred)
- Don't rules (3+ preferred)
- Core component targets:
  - `buttonCode`, `cardCode`, `inputCode` (all three required in practice)
- Extended components for stronger previews:
  - at least 2 of `navCode`, `heroCode`, `footerCode`
- Keywords (3+ preferred)

If critical fields are missing, the assistant should stop and request them first.

## 3) Master prompt (assistant-agnostic)

Copy this prompt into your assistant:

```text
You are generating a StyleKit style submission package.

You MUST output exactly three artifacts and nothing else:
1) manifest.json
2) cover.svg
3) self-check.md

Hard constraints:
- manifest.json MUST satisfy:
  lib/schemas/style-submission-manifest.schema.json
- slug must match ^[a-z0-9]+(?:-[a-z0-9]+)*$
- all colors must be valid hex
- doList and dontList must each include at least 1 non-empty item
- aiRules must include at least 3 non-empty, actionable rules
- buttonCode, cardCode, inputCode must all be present and meaningful
- include at least 2 of navCode, heroCode, footerCode
- do not add unknown fields

Quality constraints:
- Keep one coherent visual language across all component snippets
- Components must use consistent color hierarchy and spacing rhythm
- Avoid placeholders like "TODO", "...", or empty wrappers
- Component code should be renderable HTML/JSX snippets (no imports required)
- cover.svg must contain a real <svg> root and centered composition
- cover.svg should visually reflect the same style language as manifest components

Self-check requirements:
- requiredFilesPrepared must include: manifest.json, cover.svg, self-check.md
- componentCoverage must list all generated component fields (button/card/input + any nav/hero/footer included)
- notes must include:
  - qualityRisks (bullet list)
  - maintainerReviewFocus (bullet list)

Output format (strict):
1) ```json   (manifest.json)
2) ```svg    (cover.svg)
3) ```md     (self-check.md)
No commentary outside the three fenced blocks.
```

## 4) Repair prompt (when validation fails)

Use this prompt to repair invalid output:

```text
Fix this StyleKit manifest package so it passes schema and quality gates.

Rules:
- Keep the original style concept.
- Only change invalid, missing, or low-quality fields.
- Preserve slug unless it violates the slug regex.
- Ensure aiRules >= 3 and include button/card/input plus at least 2 of nav/hero/footer.
- Return only one corrected ```json block for manifest.json.
```

## 5) Self-check prompt

Use this prompt to improve `self-check.md` quality:

```text
Create self-check.md for a StyleKit submission.

Must include:
- schemaValid: true/false
- requiredFilesPrepared: manifest.json, cover.svg, self-check.md
- componentCoverage: include generated component fields
- qualityRisks: concise bullet list
- maintainerReviewFocus: concise bullet list

Keep it specific and actionable.
Return only one ```md block.
```

## 6) Assistant-specific launch prompts

### Claude

```text
Use docs/submission/ai-submission-pack.md section 3 as the system instruction.
Optimize for schema compliance first, then style coherence.
```

### Cursor

```text
Use workspace context and follow docs/submission/ai-submission-pack.md section 3 exactly.
Prioritize strict field correctness and component completeness.
```

### ChatGPT

```text
Follow docs/submission/ai-submission-pack.md section 3 with strict output formatting.
Return only the required fenced blocks in order.
```

## 7) Suggested submit workflow

1. Generate artifacts with the master prompt.
2. Run repair prompt if any schema/quality issue appears.
3. Validate locally:
   - `pnpm run submission:validate ./manifest.json`
4. (Optional, internal) Build a ZIP bundle:
   - `POST /api/submit/bundle` with `{ "manifest": <manifest json> }`
5. Submit via issue form, or use the internal manifest import flow during maintainer review.

## 8) Mapping notes (manifest -> backend)

`manifest.formData` maps to backend validation in:

- `lib/submit/validator.ts`
- `app/api/submit/route.ts`
- `app/api/submit/validate/route.ts`
- `app/api/submit/bundle/route.ts`

The web manifest import route is internal/experimental; paste or upload full manifest JSON there only during maintainer review.

## 9) Common failure modes

1. Slug uses uppercase, spaces, or symbols
2. Hex colors invalid or inconsistent with component code
3. aiRules too shallow (`< 3`) or generic
4. Missing one of `buttonCode/cardCode/inputCode`
5. Missing extended coverage (`navCode/heroCode/footerCode` too sparse)
6. Cover SVG exists but style language does not match components
7. Hallucinated extra fields outside schema

## 10) Minimum acceptance for maintainers

Maintainers can reject quickly if any of these fail:

- Schema invalid
- Missing required artifacts
- Low-quality component snippets (not usable)
- Weak prompt guidance (`aiRules` too sparse)
- Slug conflict

This pack is designed to maximize first-pass acceptance and reduce review churn.
