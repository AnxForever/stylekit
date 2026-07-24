# Style Authoring Guide

Use this checklist when adding or changing a StyleKit style. The goal is to keep the catalog complete while the repository is gradually refactored.

## Required Sources

Every production style must have these entries:

- Full style definition in `lib/styles/<slug>.ts` and registration in `lib/styles/registry.ts`.
- Lightweight metadata entry in `lib/styles/meta-registry.ts`.
- Token definition in `lib/styles/<slug>-tokens.ts` and registration in `lib/styles/tokens-registry-data.ts`.
- Component recipes in `lib/recipes/<slug>.ts` and registration in `lib/recipes/registry.ts`.
- Cover asset under `public/styles/`.
- Showcase content under `app/styles/<slug>/showcase/` or compatibility with the dynamic showcase fallback.

Do not add a style to only one registry. The style is not complete until the full style, metadata, recipes, tokens, and cover asset all agree on the same slug.

## Publication Workflow

Trusted authoring and admin tooling should call the single publication seam:

```ts
import { publishStyle } from "@/lib/style-publication";

const result = await publishStyle(input, process.cwd());
```

`input` is a `StyleScaffoldInput` and must include an explicitly authored, product-approved
`previewModule` with `coverPreview`. The publication module plans every generated file and all six
registry projections before it writes, then rolls back completed writes if commit fails. Callers
must not invoke the internal plan or commit modules directly.

The registry paths below remain useful for review and recovery, but normal publication should not
patch them independently.

## Naming Rules

- Use lowercase kebab-case slugs, for example `neo-brutalist`.
- Keep the slug identical across style definitions, recipes, tokens, assets, and routes.
- Use `/styles/<slug>.svg`, `/styles/<slug>.jpg`, or another public path for `cover`.
- Keep `nameEn` stable; it appears in metadata, SEO, exports, and public API responses.
- In `lib/styles/<slug>.ts`, import shared catalog types from `./types`, not from `./index`.

## Minimum Component Coverage

Each style must provide:

- `components.button.code`
- `components.card.code`
- `components.input.code`
- `recipes.button`
- `recipes.card`
- `recipes.input`

Additional components such as nav, hero, and footer are encouraged, but they should not replace the required three.

## Validation

Run these checks before submitting a style change:

```bash
pnpm run check:catalog
pnpm run lint:style-rules
pnpm exec vitest run --config tests/vitest.config.ts lib/styles/__tests__ lib/recipes/__tests__
```

For UI-heavy showcase changes, also run:

```bash
pnpm exec playwright test --config tests/playwright.config.ts tests/e2e/core-journeys.spec.ts
```

## Refactor Rule

During the gradual cleanup, keep existing public imports working:

- `@/lib/styles`
- `@/lib/styles/meta`
- `@/lib/styles/recipes`
- `@/lib/styles/tokens-registry`
- `@/lib/recipes`

New helpers may be introduced behind those entry points, but style consumers should not need to know the internal registry layout.
Only catalog maintainers should edit `lib/styles/registry.ts`, `lib/styles/meta-registry.ts`, `lib/styles/recipe-registry.ts`, `lib/styles/tokens-registry-data.ts`, and `lib/recipes/registry.ts` directly.
