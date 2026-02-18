# AI Submission Pack for StyleKit

Use this pack to let any AI assistant generate a submission-ready style package.

## 1) What "submission-ready" means

A submission is considered ready when it includes:

1. `manifest.json` that matches `schemas/style-submission-manifest.schema.json`
2. `cover.svg` for `public/styles/{slug}.svg`
3. `self-check.md` with validation notes and known risks

You can submit these through:

- GitHub Issue Form: `.github/ISSUE_TEMPLATE/style_submission.yml`
- StyleKit web submit flow (manual mapping from `manifest.json` to the submit form)

## 2) Input checklist before prompting AI

Provide the assistant with:

- Style name (local + English)
- Slug (kebab-case)
- Category: `modern | retro | minimal | expressive`
- Style type: `visual | layout | animation`
- 3-5 core colors (hex)
- Do / Don't lists
- Component snippets (`buttonCode`, `cardCode`, `inputCode`)
- Typography and spacing tokens

If any field is missing, ask the assistant to stop and request it explicitly.

## 3) Master prompt (assistant-agnostic)

Copy this prompt into your assistant:

```text
You are generating a StyleKit style submission package.

You MUST output exactly three artifacts:
1) manifest.json
2) cover.svg
3) self-check.md

Constraints:
- manifest.json MUST follow this JSON schema:
  schemas/style-submission-manifest.schema.json
- slug must match ^[a-z0-9]+(?:-[a-z0-9]+)*$
- colors must be valid hex
- doList and dontList must each contain at least one non-empty entry
- include buttonCode, cardCode, inputCode
- do not add unknown fields

Output format:
- Return three fenced blocks in this exact order:
  1) ```json (manifest.json)
  2) ```svg (cover.svg)
  3) ```md (self-check.md)
- Do not include any text outside these three blocks.
```

## 4) Repair prompt (when schema fails)

Use this prompt if validation fails:

```text
Fix the manifest.json to satisfy schemas/style-submission-manifest.schema.json.

Rules:
- Keep the same style concept.
- Only modify fields that are invalid or missing.
- Preserve slug unless it violates the slug pattern.
- Return only the corrected manifest.json in a single ```json block.
```

## 5) Self-check prompt

Use this to generate `self-check.md`:

```text
Create self-check.md for this StyleKit submission.

Include:
- schemaValid: true/false
- requiredFilesPrepared: manifest.json, cover.svg, self-check.md
- componentCoverage: buttonCode, cardCode, inputCode
- qualityRisks: bullet list
- maintainerReviewFocus: bullet list

Keep it concise and actionable.
Return only one ```md block.
```

## 6) Assistant-specific launch prompts

## Claude

```text
Use the master prompt in docs/submission/ai-submission-pack.md section 3.
Target output quality: production-ready proposal for maintainer review.
```

## Cursor

```text
Use workspace context.
Generate artifacts from docs/submission/ai-submission-pack.md section 3.
Prefer strict schema compliance over creativity.
```

## ChatGPT

```text
Follow the master prompt from docs/submission/ai-submission-pack.md section 3.
Do not include commentary outside fenced blocks.
```

## 7) Suggested submit workflow

1. Generate artifacts with the master prompt.
2. If invalid, run the repair prompt.
3. Generate `self-check.md`.
4. Validate locally:
   - `pnpm run submission:validate ./manifest.json`
5. (Optional) Build bundle via API:
   - `POST /api/submit/bundle` with `{ "manifest": <manifest json> }`
   - Downloaded ZIP includes `manifest.json`, `cover.svg`, `self-check.md`, scaffold files, and derived outputs.
6. Open issue form: `.github/ISSUE_TEMPLATE/style_submission.yml`.
7. Paste `manifest.json`, `cover.svg`, and `self-check.md`.

## 8) Mapping notes (manifest -> current backend form)

The `formData` object maps directly to backend validation in:

- `lib/submit/validator.ts`
- `app/api/submit/route.ts`
- `app/api/submit/validate/route.ts`
- `app/api/submit/bundle/route.ts`

If you need to submit through web UI (`/submit`), map `manifest.formData` field-by-field into the wizard.

## 9) Common failure modes

1. Slug includes uppercase or spaces
2. Invalid hex color values
3. Missing typography/spacing fields
4. Empty `doList` / `dontList`
5. Component code fields left blank
6. `cover.svg` missing or not valid SVG

## 10) Minimum acceptance for maintainers

Maintainers can quickly reject submissions that fail any of:

- Schema invalid
- Missing required artifacts
- No usable component snippets
- Slug conflict with existing style

This pack is designed to reduce these failures before review.
