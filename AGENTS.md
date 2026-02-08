# Repository Guidelines

## Project Structure & Module Organization
- `app/` contains Next.js App Router pages and API endpoints (`app/api/**/route.ts`).
- `components/` holds reusable UI and feature-level React components (`components/ui`, `components/styles`, etc.).
- `lib/` contains framework-agnostic logic (styles, linter, generator, i18n, recipes, extractors).
- Tests live close to their domain in `__tests__` folders (examples: `components/ui/__tests__`, `lib/styles/__tests__`).
- Static assets live in `public/`; developer docs are in `docs/`; runtime entry points are in `cli/` and `mcp/`.

## Build, Test, and Development Commands
- `npm run dev` - start the local Next.js dev server at `http://localhost:3000`.
- `npm run build` - compile a production build.
- `npm run start` - serve the production build.
- `npm run lint` - run ESLint (Next.js Core Web Vitals + TypeScript config).
- `npm run test` - run the Vitest suite in `jsdom`.
- `npm run cli` - execute the CLI entry point (`cli/stylekit.ts`).
- `npm run mcp` - run the MCP server (`mcp/server.ts`).

## Coding Style & Naming Conventions
- Use TypeScript (`strict: true`) and keep shared logic typed, especially exported APIs.
- Follow existing style: 2-space indentation, double quotes, and semicolons.
- Use `@/` path aliases for internal imports.
- Prefer kebab-case file names (for example, `lazy-command-palette.tsx`) and PascalCase React component names.
- Keep presentational primitives in `components/ui` and business/domain logic in `lib/`.

## Testing Guidelines
- Frameworks: Vitest + Testing Library (`@testing-library/react`, `@testing-library/jest-dom`).
- Name tests `*.test.ts` or `*.test.tsx`; colocate in `__tests__` under the related module.
- Cover new logic and regressions for modified modules, especially API routes and transformation utilities.
- No explicit coverage threshold is configured; maintain meaningful, targeted test coverage.

## Commit & Pull Request Guidelines
- Follow Conventional Commit prefixes used in history: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`.
- Keep commits focused and in imperative style (example: `feat: add style page tokens`).
- PRs should include a short summary, linked issue(s), and test/lint results.
- Include screenshots or GIFs for UI changes and note any breaking behavior.

## Security & Configuration Tips
- Never commit secrets; use environment variables for runtime configuration.
- Expose only client-safe values with the `NEXT_PUBLIC_` prefix.
- Validate and sanitize external input in API routes before processing.
