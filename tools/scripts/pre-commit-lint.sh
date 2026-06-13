#!/bin/bash
# StyleKit pre-commit lint hook
# Runs ESLint against staged .tsx/.jsx files.
#
# Install:
#   cp tools/scripts/pre-commit-lint.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
#   OR
#   bash tools/scripts/setup-hooks.sh

set -euo pipefail

# Get staged .tsx and .jsx files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(tsx|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

echo "[StyleKit] Running ESLint on staged React files..."
echo ""

HAS_ERRORS=0

for FILE in $STAGED_FILES; do
  if [ ! -f "$FILE" ]; then
    continue
  fi

  OUTPUT=$(npx --no-install eslint "$FILE" 2>&1) || {
    echo "[StyleKit] FAIL: $FILE"
    echo "$OUTPUT" | sed 's/^/  /'
    echo ""
    HAS_ERRORS=1
  }
done

if [ $HAS_ERRORS -ne 0 ]; then
  echo "[StyleKit] Lint issues found. Commit blocked."
  echo "[StyleKit] Fix the issues above or use --no-verify to skip."
  exit 1
fi

echo "[StyleKit] All staged files pass lint checks."
exit 0
