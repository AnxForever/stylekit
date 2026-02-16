#!/bin/bash
# Setup StyleKit git hooks
#
# Usage:
#   bash scripts/setup-hooks.sh
#   bash scripts/setup-hooks.sh --style glassmorphism

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
HOOKS_DIR="$PROJECT_DIR/.git/hooks"
STYLE="${1:-}"

if [ "$STYLE" = "--style" ] && [ -n "${2:-}" ]; then
  STYLE="$2"
fi

# Ensure .git/hooks directory exists
if [ ! -d "$HOOKS_DIR" ]; then
  echo "Error: .git/hooks directory not found. Are you in a git repository?"
  exit 1
fi

# Copy pre-commit hook
cp "$SCRIPT_DIR/pre-commit-lint.sh" "$HOOKS_DIR/pre-commit"
chmod +x "$HOOKS_DIR/pre-commit"

echo "StyleKit pre-commit hook installed."

if [ -n "$STYLE" ] && [ "$STYLE" != "--style" ]; then
  echo "Default style: $STYLE"
  echo "  Set STYLEKIT_STYLE=$STYLE in your shell profile to persist."
else
  echo "Default style: neo-brutalist"
  echo "  Override with: export STYLEKIT_STYLE=<style-slug>"
fi

echo ""
echo "The hook will check staged .tsx/.jsx files before each commit."
echo "To bypass: git commit --no-verify"
