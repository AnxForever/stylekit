#!/usr/bin/env bash
set -u

PM2_APP="${PM2_APP:-stylekit}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:13000/api/health}"
TIMEOUT="${TIMEOUT:-5}"
FAIL_THRESHOLD="${FAIL_THRESHOLD:-2}"
STATE_FILE="${STATE_FILE:-/run/stylekit-healthcheck.failures}"
LOG_FILE="${LOG_FILE:-/var/log/stylekit-healthcheck.log}"
EXPECTED_PATTERN="${EXPECTED_PATTERN:-}"

timestamp() {
  date -Is
}

log() {
  local message="$1"
  local line
  line="$(timestamp) ${message}"

  if touch "$LOG_FILE" 2>/dev/null; then
    printf '%s\n' "$line" >> "$LOG_FILE"
  else
    printf '%s\n' "$line" >&2
  fi
}

find_pm2() {
  if [ -n "${PM2_BIN:-}" ] && [ -x "$PM2_BIN" ]; then
    printf '%s\n' "$PM2_BIN"
    return 0
  fi

  if command -v pm2 >/dev/null 2>&1; then
    command -v pm2
    return 0
  fi

  for candidate in /usr/bin/pm2 /usr/local/bin/pm2; do
    if [ -x "$candidate" ]; then
      printf '%s\n' "$candidate"
      return 0
    fi
  done

  return 1
}

read_failures() {
  if [ -f "$STATE_FILE" ]; then
    local value
    value="$(cat "$STATE_FILE" 2>/dev/null || printf '0')"
    case "$value" in
      ''|*[!0-9]*) printf '0' ;;
      *) printf '%s' "$value" ;;
    esac
  else
    printf '0'
  fi
}

reset_failures() {
  rm -f "$STATE_FILE"
}

record_failure() {
  local next_failures="$1"
  local state_dir
  state_dir="$(dirname "$STATE_FILE")"
  mkdir -p "$state_dir"
  printf '%s\n' "$next_failures" > "$STATE_FILE"
}

response=""
curl_status=0
response="$(curl -fsS --max-time "$TIMEOUT" "$HEALTH_URL" 2>&1)" || curl_status=$?

if [ "$curl_status" -eq 0 ] && { [ -z "$EXPECTED_PATTERN" ] || printf '%s' "$response" | grep -q "$EXPECTED_PATTERN"; }; then
  reset_failures
  exit 0
fi

failures=$(( $(read_failures) + 1 ))
record_failure "$failures"
log "healthcheck failed app=${PM2_APP} url=${HEALTH_URL} failures=${failures}/${FAIL_THRESHOLD} curl_status=${curl_status} expected_pattern=${EXPECTED_PATTERN:-none} response=$(printf '%s' "$response" | tr '\n' ' ' | cut -c 1-240)"

if [ "$failures" -lt "$FAIL_THRESHOLD" ]; then
  exit 1
fi

pm2_bin="$(find_pm2 || true)"
if [ -z "$pm2_bin" ]; then
  log "restart skipped app=${PM2_APP} reason=pm2-not-found"
  exit 1
fi

log "restarting app=${PM2_APP} after ${failures} consecutive failed healthchecks"
if "$pm2_bin" restart "$PM2_APP" --update-env >> "$LOG_FILE" 2>&1; then
  reset_failures
  log "restart complete app=${PM2_APP}"
  exit 0
fi

log "restart failed app=${PM2_APP}"
exit 1
