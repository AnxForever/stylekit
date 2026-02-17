# Copilot Instructions for StyleKit

Read and follow these files before generating code:

1. `AGENTS.md`
2. `docs/AGENTS.md`
3. `CONTRIBUTING.md`
4. `docs/STYLE_ADDITION_CHECKLIST.md` (for new styles)

## Required Coding Rules

- Use TypeScript with strict typing.
- Keep 2-space indentation, double quotes, semicolons.
- Prefer `@/` aliases for internal imports.
- Keep presentational primitives in `components/ui`.
- Keep domain logic in `lib`.

## PR and Commit Rules

- Use Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`).
- Keep PRs focused and small.
- Include validation command results in PR description.

## Security Rules

- Never commit real secrets or `.env` files.
- Only use placeholders in `.env.example`.
- Keep service keys server-side only (no `NEXT_PUBLIC_` prefix).

## Validation Commands

```bash
npm run security:secrets
npm run lint
npx tsc --noEmit
npm run test
npm run build
```
