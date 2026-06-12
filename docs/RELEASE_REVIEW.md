# Release Review

This document captures the release review for the current refactor and admin operations batch on branch `cc/admin-password-login`.

## Reviewed Commits

```text
22d31bb chore(repo): normalize pnpm workflows
1709074 refactor(styles): split catalog registries
5096a3e chore(ops): add healthcheck watchdog
754b857 fix(admin): tolerate partial user table failures
f66012f feat(admin): add password session login
```

## Scope

This release keeps the application as a modular monolith. It does not change public style URLs, style API routes, or the documented catalog import paths:

- `@/lib/styles`
- `@/lib/styles/meta`
- `@/lib/styles/recipes`
- `@/lib/styles/tokens-registry`
- `@/lib/recipes`

The work splits large catalog registries behind those public entry points, adds admin password-session access for standalone deployments, makes the admin users API more tolerant of partial table failures, adds a lightweight health endpoint and watchdog script, and normalizes repository tooling around pnpm.

## User-Facing Impact

Expected improvements:

- Public catalog pages and APIs keep the same behavior while the internal registry files are smaller and easier to review.
- Catalog completeness is now guarded by `pnpm run check:catalog`.
- Admin routes can be accessed through a signed password session when Supabase auth is not the only desired admin path.
- Admin user listing degrades when optional activity tables fail instead of blanking the page.
- Production has a lightweight `/api/health` endpoint and an optional PM2 restart watchdog.
- CI and local instructions consistently use pnpm.

Expected non-impact:

- Public route paths are unchanged.
- Style slugs, metadata, tokens, recipe APIs, and showcase routes are unchanged.
- Existing Supabase admin access and admin API token access remain supported.
- No generated build artifacts are intended to be committed.

## Configuration Changes

New optional environment variables:

```bash
ADMIN_PASSWORD=
ADMIN_PASSWORD_SHA256=
ADMIN_SESSION_SECRET=
ADMIN_SESSION_MAX_AGE_SECONDS=43200
```

Rules:

- Use either `ADMIN_PASSWORD` or `ADMIN_PASSWORD_SHA256` for password login.
- Set `ADMIN_SESSION_SECRET` to a long random value in production.
- If `ADMIN_SESSION_SECRET` is omitted, session creation fails closed.
- `ADMIN_API_TOKEN` can still be used for token-based admin API access.
- `ADMIN_USER_IDS` still controls Supabase user-based admin access.

## Validation Performed

Full validation completed after the commits:

```bash
pnpm run check:catalog
pnpm run typecheck
pnpm exec vitest run --config tests/vitest.config.ts
pnpm run build
pnpm exec playwright test --config tests/playwright.config.ts tests/e2e/public-smoke.spec.ts --project=chromium --workers=1
git diff --check
```

Observed results:

- Catalog check passed for 127 styles.
- TypeScript check passed.
- Vitest passed: 119 files, 6248 tests.
- Production build passed and generated 1343 static pages.
- Public smoke passed: 11 tests.
- `git diff --check` passed.

Note: the Playwright dev server can log `ECONNRESET` or `aborted` noise during local smoke tests. In the reviewed run, the test process exited successfully with all 11 tests passing.

## Release Risks

Primary risk areas:

- Admin password login introduces a new access path. It depends on strong secrets and should be deployed only with production-grade `ADMIN_SESSION_SECRET`.
- The catalog registry split is broad. It is covered by typecheck, catalog checks, unit tests, production build, and public smoke tests.
- The healthcheck watchdog restarts a PM2 app after repeated local health failures. Its `PM2_APP`, `HEALTH_URL`, and log/state paths should be verified on the host before enabling the timer.
- `pnpm-workspace.yaml` and pnpm workflow updates may affect CI and package publish jobs. `pnpm install --frozen-lockfile` was verified locally.

No blocking issues were found in this review.

## Rollback Plan

Preferred rollback is commit-level, newest first:

```bash
git revert 22d31bb
git revert 1709074
git revert 5096a3e
git revert 754b857
git revert f66012f
```

Operational rollback without code revert:

- Disable admin password login by unsetting `ADMIN_PASSWORD` and `ADMIN_PASSWORD_SHA256`.
- Disable password session creation by unsetting `ADMIN_SESSION_SECRET`.
- Disable the watchdog with `systemctl disable --now stylekit-healthcheck.timer`.
- Continue using Supabase admin auth or `ADMIN_API_TOKEN` for admin access.

## Release Checklist

Before deployment:

```bash
pnpm install --frozen-lockfile
pnpm run security:secrets
pnpm run check:catalog
pnpm run typecheck
pnpm exec vitest run --config tests/vitest.config.ts
pnpm run build
pnpm exec playwright test --config tests/playwright.config.ts tests/e2e/public-smoke.spec.ts --project=chromium --workers=1
```

After deployment:

```bash
curl -fsS https://www.stylekit.top/api/health
curl -I https://www.stylekit.top/styles
curl -I https://www.stylekit.top/styles/neo-brutalist
curl -fsS https://www.stylekit.top/api/styles/neo-brutalist/tokens
```

Admin checks:

- Visit `/admin-login`.
- Confirm invalid passwords return an error and do not set a session cookie.
- Confirm valid password login redirects to the requested `/admin/...` route.
- Confirm Supabase admin access and token access still work if configured.
