# AI Context for CC Sessions

Last updated: 2026-02-19

## Current development model

- Canonical integration branch: `main`.
- Avoid long-lived environment branches for feature work (`admin`, `dev`).
- Use short-lived task branches and worktrees for AI sessions.

## Admin isolation direction

Reference roadmap:

- `docs/architecture/admin-independence-roadmap.md`
- `docs/workflows/cc-main-admin-playbook.md`

Target architecture (phased):

1. Workflow isolation now (main + short branches).
2. Domain boundary hardening (`app/admin`, `app/api/admin`, `lib/admin`).
3. Future split into `apps/web`, `apps/admin`, `packages/shared`.

## Quick start for a new CC task

```bash
bash tools/scripts/new-cc-worktree.sh admin <task-name>
cd ../stylekit-admin-<task-name>
pnpm install
pnpm dev
```

## Required report format from CC

Every task handoff should include:

1. Scope (`admin` / `web` / `shared`)
2. File map
3. Risk and rollback note
4. Validation command results
5. Deploy impact (web/admin/both)
