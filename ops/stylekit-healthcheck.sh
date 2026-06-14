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
EXPECTED_PATTERN="${EXPECTED_PATTERN:-}"

if [ -z "${HOME:-}" ]; then
  HOME="$(getent passwd "$(id -u)" 2>/dev/null | cut -d: -f6)"
fi

if [ -n "${HOME:-}" ]; then
  export HOME
  export PM2_HOME="${PM2_HOME:-$HOME/.pm2}"
fi

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

with_lock() {
  local lock_dir
  lock_dir="$(dirname "$LOCK_FILE")"
  mkdir -p "$lock_dir"
  exec 9>"$LOCK_FILE"
  if ! flock -n 9; then
    log "healthcheck skipped app=${PM2_APP} reason=locked"
    exit 0
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

read_last_restart() {
  if [ -f "$LAST_RESTART_FILE" ]; then
    local value
    value="$(cat "$LAST_RESTART_FILE" 2>/dev/null || printf '0')"
    case "$value" in
      ''|*[!0-9]*) printf '0' ;;
      *) printf '%s' "$value" ;;
    esac
  else
    printf '0'
  fi
}

record_restart() {
  local state_dir
  state_dir="$(dirname "$LAST_RESTART_FILE")"
  mkdir -p "$state_dir"
  date +%s > "$LAST_RESTART_FILE"
}

pm2_summary() {
  local pm2_bin="$1"
  "$pm2_bin" jlist 2>/dev/null | node -e '
let data = "";
process.stdin.on("data", (chunk) => data += chunk);
process.stdin.on("end", () => {
  try {
    const appName = process.env.PM2_APP || "stylekit";
    const app = JSON.parse(data).find((item) => item.name === appName);
    if (!app) {
      process.stdout.write("missing");
      return;
    }
    const uptimeSeconds = app.pm2_env?.pm_uptime
      ? Math.round((Date.now() - app.pm2_env.pm_uptime) / 1000)
      : 0;
    process.stdout.write(`status=${app.pm2_env?.status || "unknown"} pid=${app.pid || 0} restarts=${app.pm2_env?.restart_time ?? "unknown"} uptime=${uptimeSeconds}s memory=${app.monit?.memory || 0} cpu=${app.monit?.cpu || 0}`);
  } catch {
    process.stdout.write("unavailable");
  }
});
' 2>/dev/null || printf 'unavailable'
}

with_lock

response=""
curl_status=0
response="$(curl -fsS --connect-timeout "$CONNECT_TIMEOUT" --max-time "$TIMEOUT" "$HEALTH_URL" 2>&1)" || curl_status=$?

if [ "$curl_status" -eq 0 ] && { [ -z "$EXPECTED_PATTERN" ] || printf '%s' "$response" | grep -q "$EXPECTED_PATTERN"; }; then
  previous_failures="$(read_failures)"
  if [ "$previous_failures" -gt 0 ]; then
    log "healthcheck recovered app=${PM2_APP} url=${HEALTH_URL} previous_failures=${previous_failures}"
  fi
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

now="$(date +%s)"
last_restart="$(read_last_restart)"
seconds_since_restart=$(( now - last_restart ))

if [ "$last_restart" -gt 0 ] && [ "$seconds_since_restart" -lt "$RESTART_COOLDOWN_SECONDS" ]; then
  log "restart skipped app=${PM2_APP} reason=cooldown seconds_since_restart=${seconds_since_restart}/${RESTART_COOLDOWN_SECONDS} pm2=$(pm2_summary "$pm2_bin")"
  exit 1
fi

log "restarting app=${PM2_APP} after ${failures} consecutive failed healthchecks pm2_before=$(pm2_summary "$pm2_bin")"
if "$pm2_bin" restart "$PM2_APP" >> "$LOG_FILE" 2>&1; then
  reset_failures
  record_restart
  log "restart complete app=${PM2_APP} pm2_after=$(pm2_summary "$pm2_bin")"
  exit 0
fi

log "restart failed app=${PM2_APP}"
exit 1
