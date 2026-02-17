# Contributing to StyleKit

Thanks for contributing.
This repository accepts both human-authored and AI-assisted pull requests.

## Before You Start

- Read `AGENTS.md` and `docs/AGENTS.md`.
- For new style contributions, follow `docs/STYLE_ADDITION_CHECKLIST.md`.
- Keep PR scope focused. Avoid mixing unrelated refactors.

## Branch and Commit Conventions

### Branch naming

- `feat/<short-topic>`
- `fix/<short-topic>`
- `docs/<short-topic>`
- `refactor/<short-topic>`

Examples:

- `feat/new-style-arcade-crt`
- `fix/supabase-auth-callback`

### Commit format

Use Conventional Commits:

- `feat: add style metadata schema validation`
- `fix: correct style showcase route params`
- `docs: add AI PR prompt template`

## Pull Request Requirements

Every PR should include:

1. Clear summary of what changed and why
2. Linked issue (if available)
3. Validation results (commands + outcomes)
4. Screenshots/GIFs for UI changes
5. Breaking change notes (if applicable)

Use the repo PR template at `.github/pull_request_template.md`.

## Required Local Checks

Run these checks before opening a PR:

```bash
npm run security:secrets
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

If you touched `style-extractor` integration files:

```bash
npm run test:style-extractor:ci
```

## New Style Contribution Rules

If your PR adds a new style:

- Use a kebab-case slug, and keep it consistent in all files.
- Add style definition, tokens, recipes, showcase pages, and cover SVG.
- Register the style in all required registries.
- Verify routes:
  - `/styles`
  - `/styles/<slug>`
  - `/styles/<slug>/showcase`
- Include visual proof (screenshots) in PR.

Do not skip checklist items in `docs/STYLE_ADDITION_CHECKLIST.md`.

## Security Rules

- Never commit real keys, tokens, credentials, or `.env` files.
- Only commit placeholders in `.env.example`.
- Keep server secrets server-only (no `NEXT_PUBLIC_` prefix).

## AI Contributor Prompt Template

Use this prompt when asking an AI to prepare a PR:

```text
You are contributing to StyleKit.
Follow AGENTS.md, docs/AGENTS.md, and CONTRIBUTING.md exactly.
If adding a style, follow docs/STYLE_ADDITION_CHECKLIST.md item by item.
Use Conventional Commit messages.
Do not commit secrets or .env files.
Before final output, run:
- npm run security:secrets
- npm run lint
- npx tsc --noEmit
- npm run test
- npm run build
Return:
1) summary
2) files changed
3) command results
4) risks/breaking changes
```
