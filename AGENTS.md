# StyleKit Agent Rules

Rules for any AI assistant working in this repository. Checked into version
control on purpose: `CLAUDE.md` is a local, gitignored file, so anything that
should reach every contributor and every assistant belongs here.

If instructions conflict, follow this order:

1. `AGENTS.md` (this file)
2. `CONTRIBUTING.md`
3. `docs/STYLE_ADDITION_CHECKLIST.md`

## Tech Stack

- Next.js 16 (App Router, NOT Pages Router)
- React 19
- TypeScript strict mode
- Tailwind CSS v4 (CSS-based config, NO `tailwind.config.js`)
- pnpm (NOT npm or yarn)
- Vitest for unit tests, Playwright for E2E
- Radix UI primitives for accessible components

## Interface Rules

- **Never use a native `<select>` in product UI.** Its dropdown is drawn by the
  operating system, so the arrow, option typography, highlight color and radius
  cannot follow the design system. Use segmented buttons when the option set is
  short (see `Segmented` in `app/submit/_style-form.tsx`), or a custom listbox
  built on Radix when it is long.
  - Exempt: `app/styles/*/showcase/` pages. Their form controls are demo content
    illustrating what a style looks like, not product chrome.
- Do not use emoji in code, UI text, or docs unless explicitly requested.
- Prefer existing components in `components/ui/` over adding duplicates.
- Keep UI components in `components/` and domain logic in `lib/`.

## Code Rules

- Use TypeScript strict-safe changes.
- Keep formatting consistent: 2 spaces, double quotes, semicolons.
- Never commit secrets, API keys, or real `.env` files.
- Keep server keys server-side only (never expose via `NEXT_PUBLIC_`).

## Verification Before Final Output

```bash
pnpm run lint
npx tsc --noEmit
pnpm run test
pnpm run build
```

## Commits

Conventional Commits, one concern per commit: `feat:` `fix:` `refactor:`
`docs:` `chore:` `test:` `perf:`.
