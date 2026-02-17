# StyleKit AI Contribution Contract

This file is the first entry point for AI contributors.
Read these documents in order before changing code:

1. `docs/AGENTS.md`
2. `CONTRIBUTING.md`
3. `docs/STYLE_ADDITION_CHECKLIST.md` (required for new style PRs)

## Non-Negotiable Rules

- Use TypeScript strict-safe changes. Do not introduce `any` unless unavoidable.
- Keep formatting consistent: 2 spaces, double quotes, semicolons.
- Use Conventional Commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`).
- Never commit secrets, tokens, credentials, or `.env` values.
- For UI changes, include screenshots or short GIFs in the PR.

## New Style PR Requirements

When adding a new style, follow `docs/STYLE_ADDITION_CHECKLIST.md` exactly:

- Create definition, token, recipe, showcase, and cover asset files.
- Register the new style in style/recipe registries.
- Ensure gallery/docs/showcase routes all work for the new slug.

## Required Validation Before PR

Run and report these commands:

```bash
npm run security:secrets
npm run lint
npx tsc --noEmit
npm run test
npm run build
```

If style extractor files are touched, also run:

```bash
npm run test:style-extractor:ci
```

## PR Output Format for AI Agents

PR description must include:

1. Scope (what changed, and why)
2. File map (key files touched)
3. Validation results (commands + pass/fail)
4. Breaking changes (if any)
5. Screenshots for UI changes
