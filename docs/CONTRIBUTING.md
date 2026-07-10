# Contributing to StyleKit

Thanks for your interest in contributing to StyleKit. Whether you're fixing a bug, adding a new style, or improving docs, this guide will help you get started.

## Table of Contents

- [Development Setup](#development-setup)
- [Types of Contributions](#types-of-contributions)
- [Workflow](#workflow)
- [Code Style](#code-style)
- [Adding a New Style](#adding-a-new-style)
- [Pull Request Process](#pull-request-process)
- [Local Validation](#local-validation)
- [Security](#security)

## Development Setup

```bash
# Clone the repo
git clone https://github.com/AnxForever/stylekit.git
cd stylekit

# Install dependencies (pnpm required)
pnpm install

# Start dev server
pnpm dev
```

Open [localhost:3000](http://localhost:3000).

<!-- PLACEHOLDER_SETUP -->

**Optional:** Copy `.env.example` to `.env.local` and fill in Supabase credentials if you need auth or database features. Most UI work doesn't require this.

**Tech stack at a glance:**

| What | Tool |
|------|------|
| Package manager | pnpm |
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 4 |
| Components | Radix UI primitives |
| Tests | Vitest (unit) + Playwright (E2E) |

## Types of Contributions

| Type | Description | Difficulty |
|------|-------------|------------|
| Bug fix | Fix broken UI, routing, or logic | Easy |
| New style | Add a complete design style (tokens, recipes, showcase) | Medium |
| New animation | Add a CSS animation with preview | Easy |
| Feature | Add new functionality (tools, pages, API endpoints) | Medium-Hard |
| Docs | Improve guides, fix typos, add examples | Easy |
| Performance | Optimize rendering, bundle size, or load times | Medium |

## Workflow

1. **Fork** the repo and create a branch from `main`:
   ```bash
   git checkout -b feat/your-feature
   ```

2. **Branch naming** convention:
   - `feat/<topic>` — new feature or style
   - `fix/<topic>` — bug fix
   - `docs/<topic>` — documentation
   - `refactor/<topic>` — code improvement

3. **Make your changes** with focused, atomic commits.

4. **Run validation** (see [Local Validation](#local-validation)).

5. **Open a PR** against `main`.

## Code Style

- **Formatting:** 2 spaces, double quotes, semicolons
- **TypeScript:** strict mode, no `any` unless absolutely necessary
- **Imports:** use `@/` path aliases (e.g., `@/lib/styles`, `@/components/ui`)
- **Components:** keep UI in `components/`, domain logic in `lib/`
- **No console.log** in production code
- **Commit messages:** use [Conventional Commits](https://www.conventionalcommits.org/)
  ```
  feat: add arcade-crt style with CRT scanline effects
  fix: correct color palette rendering on mobile
  docs: update style addition checklist
  ```

<!-- PLACEHOLDER_STYLE -->

## Adding a New Style

This is the most common contribution. A complete style requires **6 new files + 5 modified files**.

> For the full step-by-step checklist, see [`STYLE_ADDITION_CHECKLIST.md`](./STYLE_ADDITION_CHECKLIST.md).

**Quick overview:**

```
New files:
  lib/styles/{slug}.ts              # Style definition (colors, rules, components)
  lib/styles/{slug}-tokens.ts       # Design tokens for AI consumption
  lib/recipes/{slug}.ts             # Component recipes (button, card, input)
  app/styles/{slug}/showcase/page.tsx       # Showcase page wrapper
  app/styles/{slug}/showcase/_content.tsx   # Showcase content (400+ lines, 12+ sections)
  public/styles/{slug}.svg          # Cover image (1200x630)

Modified files:
  lib/styles/registry.ts            # Register full style definition
  lib/styles/meta-registry.ts       # Add lightweight metadata
  lib/styles/tokens-registry-data.ts # Register style tokens
  lib/recipes/registry.ts           # Register recipes
  lib/style-components.tsx          # Add component renderers
```

**Key rules:**
- Slug must be kebab-case and consistent across all files
- Showcase must have 12+ sections with interactive elements (useState)
- Cover SVG must show miniaturized UI components, not just the style name
- Run the test suite to verify all registrations are correct

## Pull Request Process

1. Fill out the [PR template](../.github/pull_request_template.md) completely.
2. Include screenshots or GIFs for any UI changes.
3. Link related issues if applicable.
4. Ensure all validation checks pass.
5. A maintainer will review your PR. Expect feedback within a few days.

**For style contributions**, the PR checklist includes:
- Verified `/styles/{slug}` page loads correctly
- Verified `/styles/{slug}/showcase` renders all sections
- Attached screenshots of the style in the gallery and showcase

## Local Validation

Run these before opening a PR:

```bash
# Security: check for leaked secrets
pnpm run security:secrets

# Lint
pnpm run lint

# Type check
npx tsc --noEmit

# Unit tests
pnpm test

# Build
pnpm build
```

All checks must pass. The CI pipeline runs the same checks automatically.

## Security

- Never commit secrets, API keys, or credentials
- Never commit `.env` files (use `.env.example` for placeholders)
- Keep server-side secrets server-only (no `NEXT_PUBLIC_` prefix)
- Validate all user input at system boundaries

## Questions?

- Open a [Discussion](https://github.com/AnxForever/stylekit/discussions) for questions
- Open an [Issue](https://github.com/AnxForever/stylekit/issues) for bugs or feature requests
- Check existing issues before creating new ones

---

Thank you for helping make StyleKit better.
