# Local workspace

Keep a primary development checkout, only the additional checkouts needed for
active work, and a separate archive of completed tasks. The public source tree
does not need dependencies, screenshots or build output from every past task.

## Directory roles

| Directory | Purpose | Handling |
| --- | --- | --- |
| `app/`, `components/`, `lib/`, `packages/` | Application and package source | Versioned |
| `public/`, `content/`, `knowledge/`, `experience-packs/` | Product assets and runtime content | Preserve when used by routes or asset delivery |
| `node_modules/` | This checkout's installed dependencies | Reinstall with the matching lockfile when needed |
| `.next/` | Generated Next.js output | Rebuildable; stop the local server before cleaning |
| `.tmp/<task>/` | Temporary task scripts, previews and evidence | Archive completed tasks outside the primary checkout |
| `.data/`, `data/` | Local runtime state | Preserve as user data |
| `.worktrees/` | Additional Git checkouts | Inspect branch, ignored data and work-in-progress before moving |

## Routine checks

```bash
git status --short
git worktree list
pnpm run lint
pnpm run typecheck
pnpm test
pnpm run build
```

The lint and TypeScript configuration excludes local task output and nested
checkouts. Imported application/package source and Next-generated route types
continue to be checked.

The typecheck script generates fresh route types without deleting `.next/dev`,
so it also works from Windows PowerShell while a development server is running.

## Finishing a task

1. Keep the exact source changes on an appropriate development branch.
2. Save small verification receipts and any useful screenshots.
3. Preserve environment files and browser profiles in a restricted archive;
   do not include them in public bundles or source commits.
4. Archive closed task directories with a file-hash manifest. A same-drive move
   makes the project directory smaller but does not free disk space.
5. For a registered checkout, use `git worktree move` so Git updates its path.
   Do not move it as an ordinary folder or remove unique/uncommitted work.
6. Remove only fixed, reviewed regenerable cache targets, after confirming that
   no process uses them and that their ancestors do not redirect elsewhere.

Do not share a `node_modules` directory between Windows and Linux or between
incompatible lockfiles. One useful dependency installation is preferable to
multiple unneeded validation copies. An archived task may contain historical
absolute paths; use its receipts as evidence and rebuild its environment before
trying to run it again.
