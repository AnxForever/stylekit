#!/usr/bin/env bash
set -u

PM2_APP="${PM2_APP:-stylekit}"
HEALTH_URL="${HEALTH_URL:-http://127.0.0.1:13000/api/health}"
TIMEOUT="${TIMEOUT:-10}"
CONNECT_TIMEOUT="${CONNECT_TIMEOUT:-2}"
FAIL_THRESHOLD="${FAIL_THRESHOLD:-3}"
RESTART_COOLDOWN_SECONDS="${RESTART_COOLDOWN_SECONDS:-300}"
STATE_FILE="${STATE_FILE:-/run/stylekit-healthcheck.failures}"
LAST_RESTART_FILE="${LAST_RESTART_FILE:-/run/stylekit-healthcheck.last-restart}"
LOCK_FILE="${LOCK_FILE:-/run/stylekit-healthcheck.lock}"
LOG_FILE="${LOG_FILE:-/var/log/stylekit-healthcheck.log}"

if [[ -z "${HOME:-}" ]]; then
  HOME="$(getent passwd "$(id -u)" 2>/dev/null | cut -d: -f6)"
fi
export HOME
export PM2_HOME="${PM2_HOME:-$HOME/.pm2}"

log() {
  local line
  line="$(date -Is) $1"
  if touch "$LOG_FILE" 2>/dev/null; then
    printf '%s\n' "$line" >> "$LOG_FILE"
  else
    printf '%s\n' "$line" >&2
  fi
}

read_number() {
  local file="$1"
  local value="0"
  if [[ -f "$file" ]]; then
    value="$(<"$file")"
  fi
  if [[ "$value" =~ ^[0-9]+$ ]]; then
    printf '%s' "$value"
  else
    printf '0'
  fi
}

mkdir -p "$(dirname "$LOCK_FILE")"
exec 9>"$LOCK_FILE"
if ! flock -n 9; then
  log "healthcheck skipped app=$PM2_APP reason=locked"
  exit 0
fi

response=""
curl_status=0
response="$(curl -fsS --connect-timeout "$CONNECT_TIMEOUT" --max-time "$TIMEOUT" "$HEALTH_URL" 2>&1)" || curl_status=$?

if [[ "$curl_status" -eq 0 ]]; then
  previous_failures="$(read_number "$STATE_FILE")"
  if [[ "$previous_failures" -gt 0 ]]; then
    log "healthcheck recovered app=$PM2_APP previous_failures=$previous_failures"
  fi
  rm -f -- "$STATE_FILE"
  exit 0
fi

failures=$(( $(read_number "$STATE_FILE") + 1 ))
mkdir -p "$(dirname "$STATE_FILE")"
printf '%s\n' "$failures" > "$STATE_FILE"
log "healthcheck failed app=$PM2_APP failures=$failures/$FAIL_THRESHOLD curl_status=$curl_status response=$(printf '%s' "$response" | tr '\n' ' ' | cut -c 1-240)"

if [[ "$failures" -lt "$FAIL_THRESHOLD" ]]; then
  exit 1
fi

pm2_bin="${PM2_BIN:-$(command -v pm2 || true)}"
if [[ -z "$pm2_bin" ]]; then
  log "restart skipped app=$PM2_APP reason=pm2-not-found"
  exit 1
fi

now="$(date +%s)"
last_restart="$(read_number "$LAST_RESTART_FILE")"
if [[ "$last_restart" -gt 0 && $((now - last_restart)) -lt "$RESTART_COOLDOWN_SECONDS" ]]; then
  log "restart skipped app=$PM2_APP reason=cooldown"
  exit 1
fi

log "restarting app=$PM2_APP after $failures consecutive failed healthchecks"
if "$pm2_bin" restart "$PM2_APP" >> "$LOG_FILE" 2>&1; then
  rm -f -- "$STATE_FILE"
  mkdir -p "$(dirname "$LAST_RESTART_FILE")"
  printf '%s\n' "$now" > "$LAST_RESTART_FILE"
  log "restart complete app=$PM2_APP"
  exit 0
fi

log "restart failed app=$PM2_APP"
exit 1
