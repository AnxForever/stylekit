# CC Main-Only Playbook (Admin + Web)

This is the operational guide for using Cursor/Claude Code (`cc`) while pushing only to `main`.

## Branch strategy

- Do not develop directly on `main`.
- Do not use long-lived `admin` branch for feature work.
- Use one short branch per task:
  - `cc/admin-<task>`
  - `cc/web-<task>`

## Worktree-first workflow

Create one isolated directory per task:

```bash
bash tools/scripts/new-cc-worktree.sh admin users-api-fallback
```

Inside the new directory:

```bash
pnpm install
pnpm lint
pnpm typecheck
pnpm test
```

Push and open PR:

```bash
git push origin cc/admin-users-api-fallback
```

Merge to `main` after checks pass.

## PR scope contract

Each PR must declare one scope:

- `scope: admin`
- `scope: web`
- `scope: shared`

Include this in PR body:

1. Scope and rationale
2. File map
3. Validation commands and results
4. Deploy impact (`web`, `admin`, or both)

## Recommended CC prompt header

Copy this at the top of CC tasks:

```text
Scope: admin
Base branch: main
Branch policy: short-lived only, no long-lived admin/dev branch work
Change boundary: app/admin/**, app/api/admin/**, lib/admin/**, lib/auth/admin-*
Validation required: pnpm lint && pnpm typecheck && pnpm test && pnpm build
Output format: scope, file map, risk, validation results, deploy impact
```

## Vercel deployment model

- Keep both Vercel projects tracking `main`.
- Differentiate by project root directory after app split:
  - web project root: `apps/web`
  - admin project root: `apps/admin`
- Until split, both concerns still build from repo root; deploy impact must be stated in PR.
