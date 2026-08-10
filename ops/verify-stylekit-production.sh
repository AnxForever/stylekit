#!/usr/bin/env bash
set -euo pipefail

BASE_URL="${STYLEKIT_BASE_URL:-https://www.stylekit.top}"
BASE_URL="${BASE_URL%/}"

check_url() {
  local path="$1"
  local label="$2"
  local status
  status=$(curl --silent --show-error --retry 3 --retry-delay 1 \
    --output /dev/null --write-out '%{http_code}' "$BASE_URL$path")
  if [[ "$status" != "200" ]]; then
    echo "$label failed: HTTP $status" >&2
    exit 1
  fi
  echo "$label=200"
}

check_url "/api/health" "health"
check_url "/zh" "public_home"
check_url "/admin-login" "admin_login"
echo "production verification complete: $BASE_URL"
