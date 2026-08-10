#!/usr/bin/env bash
set -euo pipefail

# This is a local, read-only release gate. It never deploys, migrates Supabase,
# uploads assets, or changes a remote service. Keep payment confirmation
# explicit so a future deployment cannot start from a stale assumption.

if [[ "${STYLEKIT_PAYMENT_CONFIRMED:-0}" != "1" ]]; then
  echo "release blocked: set STYLEKIT_PAYMENT_CONFIRMED=1 only after you have confirmed payment/receipts" >&2
  echo "no deployment, migration, upload, or remote write was attempted" >&2
  exit 2
fi

run_step() {
  local label="$1"
  shift
  echo "==> ${label}"
  "$@"
}

run_step "secret scan" pnpm run security:secrets
run_step "runtime config" pnpm run check:runtime-config
run_step "lint" pnpm lint
run_step "product truth" pnpm run check:product-truth
run_step "catalog integrity" pnpm run check:catalog
run_step "support assets" pnpm run check:support-assets
run_step "experience packs" pnpm run check:experience-packs
pack_install_proof_path="$(mktemp /tmp/stylekit-pack-install-proof.XXXXXX.json)"
trap 'unlink "$pack_install_proof_path" 2>/dev/null || true' EXIT
run_step "pack install" env PACK_INSTALL_PROOF_PATH="$pack_install_proof_path" pnpm run test:pack-install
run_step "workspace generation" pnpm run test:workspace-generation
run_step "typecheck" pnpm typecheck
run_step "unit and contract tests" pnpm test
run_step "approved preview visual regression" pnpm run test:preview-visual
run_step "production build" pnpm run build

if [[ -n "$(git status --short)" ]]; then
  echo "release blocked: working tree is not clean; review and commit the verified changes before deployment" >&2
  git status --short
  exit 1
fi

echo "release preflight passed: local verification complete; deployment still requires an explicit operator action"
