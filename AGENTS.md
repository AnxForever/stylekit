# StyleKit Agent Entry Point

Start here before making changes.

## Read order

1. `AGENTS.md` (this file)
2. `docs/AGENTS.md`
3. `docs/CONTRIBUTING.md`
4. `docs/STYLE_ADDITION_CHECKLIST.md` (when adding styles)

## Operating model

- Long-lived integration branch: `main` only.
- Use short-lived branches per task (`cc/admin-*`, `cc/web-*`, `cc/shared-*`).
- Prefer isolated worktrees:
  - `bash tools/scripts/new-cc-worktree.sh admin <task-name>`
  - `bash tools/scripts/new-cc-worktree.sh web <task-name>`

## Scope rules

- Keep PRs single-scope (`admin`, `web`, or `shared`).
- Always report deploy impact (`admin`, `web`, or both).
- Do not mix unrelated refactors with feature/bugfix work.

## Required output in AI handoff

1. Scope
2. File map
3. Risk and rollback note
4. Validation commands and results
5. Deploy impact

## References

- `AI_CONTEXT.md`
- `docs/workflows/cc-main-admin-playbook.md`
- `docs/architecture/admin-independence-roadmap.md`
