#!/bin/bash
# StyleKit pre-commit lint hook
# Validates staged .tsx/.jsx files against a StyleKit design style.
#
# Install:
#   cp tools/scripts/pre-commit-lint.sh .git/hooks/pre-commit && chmod +x .git/hooks/pre-commit
#   OR
#   bash tools/scripts/setup-hooks.sh
#
# Configure style by setting STYLEKIT_STYLE env var (default: neo-brutalist):
#   export STYLEKIT_STYLE=glassmorphism

set -euo pipefail

STYLE="${STYLEKIT_STYLE:-neo-brutalist}"

# Get staged .tsx and .jsx files
STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\.(tsx|jsx)$' || true)

if [ -z "$STAGED_FILES" ]; then
  exit 0
fi

echo "[StyleKit] Checking staged files against \"${STYLE}\" style..."
echo ""

HAS_ERRORS=0

for FILE in $STAGED_FILES; do
  if [ ! -f "$FILE" ]; then
    continue
  fi

  # Run lint on the staged version of the file
  CONTENT=$(git show ":${FILE}")
  TEMP_FILE=$(mktemp)
  echo "$CONTENT" > "$TEMP_FILE"

  # Use npx to run the CLI, or tsx if available locally
  if command -v npx &> /dev/null; then
    OUTPUT=$(npx --no-install tsx tools/cli/stylekit.ts lint "$TEMP_FILE" --style "$STYLE" 2>&1) || {
      echo "[StyleKit] FAIL: $FILE"
      echo "$OUTPUT" | sed 's/^/  /'
      echo ""
      HAS_ERRORS=1
    }
  fi

  rm -f "$TEMP_FILE"
done

if [ $HAS_ERRORS -ne 0 ]; then
  echo "[StyleKit] Style violations found. Commit blocked."
  echo "[StyleKit] Fix the issues above or use --no-verify to skip."
  exit 1
fi

echo "[StyleKit] All staged files pass style checks."
exit 0
