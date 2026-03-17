## Summary

**What changed:**

**Why:**

## Change Type

- [ ] `feat` — new feature or style
- [ ] `fix` — bug fix
- [ ] `refactor` — code improvement (no behavior change)
- [ ] `docs` — documentation only
- [ ] `chore` — build, CI, or tooling

## Scope

- [ ] Styles / Recipes / Tokens
- [ ] UI Components
- [ ] API Endpoints
- [ ] Templates / Animations
- [ ] Build / CI
- [ ] Documentation

## Style Contribution Checklist

> Skip this section if your PR doesn't add a new style.

- Style slug: `___`
- [ ] Followed [`docs/STYLE_ADDITION_CHECKLIST.md`](docs/STYLE_ADDITION_CHECKLIST.md) completely
- [ ] Created all 6 required files (definition, tokens, recipes, showcase page + content, cover SVG)
- [ ] Updated all 4 registration files (index, meta, recipes/index, style-components)
- [ ] Verified `/styles/<slug>` loads correctly
- [ ] Verified `/styles/<slug>/showcase` renders all 12+ sections
- [ ] Attached screenshots below

## Validation

- [ ] `pnpm run security:secrets` — no secrets detected
- [ ] `pnpm run lint` — no errors
- [ ] `npx tsc --noEmit` — no type errors
- [ ] `pnpm test` — all tests pass
- [ ] `pnpm build` — builds successfully

## Security

- [ ] No secrets, credentials, or `.env` files committed
- [ ] Server-side values are not exposed via `NEXT_PUBLIC_`

## Breaking Changes

- [ ] None
- [ ] Yes (describe below)

## Screenshots

<!-- Attach screenshots or GIFs for any UI changes. Required for style contributions. -->

## Notes for Reviewers

<!-- Key files to review, known risks, follow-up items, etc. -->
