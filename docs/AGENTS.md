# StyleKit AI Contribution Contract

This file is the first entry point for AI contributors.
Read these documents in order before changing code:

1. `docs/AGENTS.md` (this file)
2. `docs/CONTRIBUTING.md`
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

---

## Repository Guidelines

### Project Structure & Module Organization
- `app/` contains Next.js App Router pages and API endpoints (`app/api/**/route.ts`).
- `components/` holds reusable UI and feature-level React components (`components/ui`, `components/styles`, etc.).
- `lib/` contains framework-agnostic logic (styles, linter, generator, i18n, recipes, extractors).
- `tests/` contains unit tests (`tests/unit/`) and E2E tests (`tests/e2e/`).
- Static assets live in `public/`; developer docs are in `docs/`.
- CLI, MCP server, and build scripts are in `tools/`.

### Build, Test, and Development Commands
- `npm run dev` - start the local Next.js dev server at `http://localhost:3000`.
- `npm run build` - compile a production build.
- `npm run start` - serve the production build.
- `npm run lint` - run ESLint (Next.js Core Web Vitals + TypeScript config).
- `npm run test` - run the Vitest suite.
- `npm run security:secrets` - scan tracked files for accidental secret leaks.
- `npm run cli` - execute the CLI entry point (`tools/cli/stylekit.ts`).
- `npm run mcp` - run the MCP server (`tools/mcp/server.ts`).

### Coding Style & Naming Conventions
- Use TypeScript (`strict: true`) and keep shared logic typed, especially exported APIs.
- Follow existing style: 2-space indentation, double quotes, and semicolons.
- Use `@/` path aliases for internal imports.
- Prefer kebab-case file names (for example, `lazy-command-palette.tsx`) and PascalCase React component names.
- Keep presentational primitives in `components/ui` and business/domain logic in `lib/`.

### Testing Guidelines
- Frameworks: Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- Name tests `*.test.ts` or `*.test.tsx`; colocate in `__tests__` under the related module.
- Cover new logic and regressions for modified modules, especially API routes and transformation utilities.
- No explicit coverage threshold is configured; maintain meaningful, targeted test coverage.

### Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes used in history: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- Keep commits focused and in imperative style (example: `feat: add style page tokens`).
- PRs should include a short summary, linked issue(s), and test/lint results.
- Include screenshots or GIFs for UI changes and note any breaking behavior.
- Use `.github/pull_request_template.md` and follow `docs/CONTRIBUTING.md`.

### Security & Configuration Tips
- Never commit secrets; use environment variables for runtime configuration.
- Expose only client-safe values with the `NEXT_PUBLIC_` prefix.
- Validate and sanitize external input in API routes before processing.
