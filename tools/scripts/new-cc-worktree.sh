#!/usr/bin/env bash
set -euo pipefail

if [ $# -lt 2 ]; then
  cat <<'USAGE'
Usage:
  bash tools/scripts/new-cc-worktree.sh <scope> <task-name> [base-branch]

Examples:
  bash tools/scripts/new-cc-worktree.sh admin users-api-fallback
  bash tools/scripts/new-cc-worktree.sh web hero-redesign main
USAGE
  exit 1
fi

scope="$1"
task="$2"
base="${3:-main}"

sanitize() {
  printf "%s" "$1" | tr '[:upper:]' '[:lower:]' | tr -cs 'a-z0-9._-' '-'
}

scope_slug="$(sanitize "$scope")"
task_slug="$(sanitize "$task")"
branch="cc/${scope_slug}-${task_slug}"
target_dir="../stylekit-${scope_slug}-${task_slug}"

if git show-ref --verify --quiet "refs/heads/${branch}"; then
  echo "Branch already exists: ${branch}"
  exit 1
fi

if [ -e "${target_dir}" ]; then
  echo "Target directory already exists: ${target_dir}"
  exit 1
fi

echo "Fetching origin/${base}..."
git fetch origin "${base}"

echo "Creating worktree:"
echo "  branch: ${branch}"
echo "  dir:    ${target_dir}"
git worktree add -b "${branch}" "${target_dir}" "origin/${base}"

cat <<EOF

Worktree ready.

Next steps:
  cd ${target_dir}
  pnpm install
  pnpm dev

When done:
  git push origin ${branch}
EOF
