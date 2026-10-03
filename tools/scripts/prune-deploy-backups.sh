#!/bin/bash
# StyleKit deployment artifact retention (runs on the production host)
#
# Every deploy leaves a pre-deploy snapshot under /www/stylekit-backups and the
# previously served build at /www/stylekit/.next.previous-*. Nothing pruned the
# older ones, so the host reached 98% disk use on 2026-10-03: 37 GB of 40 GB
# used, 843 MB free. The snapshots alone were 8.1 GB across 20 entries.
#
# This keeps the most recent entries and deletes the rest. The newest snapshot
# is never a candidate: it is the rollback target for the deploy that just
# landed, and the snapshot directory holds source only, so it is the one
# artifact that can still rebuild the previous release. KEEP_* values are
# floored at 1 for the same reason.
#
# Install:
#   install -m 755 tools/scripts/prune-deploy-backups.sh \
#     /usr/local/bin/stylekit-prune-deploy-backups
#
# The systemd units live on the host only, alongside stylekit-healthcheck.*;
# see the deployment artifact retention section of docs/DEPLOYMENT.md for the
# unit contents.
#
# Dry run:
#   DRY_RUN=1 /usr/local/bin/stylekit-prune-deploy-backups

set -euo pipefail

BACKUP_DIR="${BACKUP_DIR:-/www/stylekit-backups}"
APP_DIR="${APP_DIR:-/www/stylekit}"
KEEP_SNAPSHOTS="${KEEP_SNAPSHOTS:-3}"
KEEP_NEXT_PREVIOUS="${KEEP_NEXT_PREVIOUS:-1}"
DRY_RUN="${DRY_RUN:-0}"
LOCK_FILE="${LOCK_FILE:-/run/stylekit-prune-backups.lock}"

# Diagnostics go to stderr and only stderr: floor_keep returns its result over
# stdout, so a log line written there would be captured as the keep count.
log() {
  echo "[StyleKit] $*" >&2
}

# Only one run at a time, so a manual invocation cannot delete an entry the
# timer is midway through measuring.
if [ "$DRY_RUN" != "1" ] && [ -w "$(dirname "$LOCK_FILE")" ]; then
  exec 9>"$LOCK_FILE"
  if ! flock -n 9; then
    log "another run holds $LOCK_FILE, exiting"
    exit 0
  fi
fi

size_of() {
  du -sh "$1" 2>/dev/null | cut -f1
}

# Hold a positive floor: a bad environment value must not delete every rollback
# target on a host where rebuilding one takes a full local build.
floor_keep() {
  local value="$1"
  if ! [[ "$value" =~ ^[0-9]+$ ]] || [ "$value" -lt 1 ]; then
    log "WARN: keep count '$value' is invalid, falling back to 1"
    echo 1
  else
    echo "$value"
  fi
}

prune() {
  local dir="$1" keep="$2" pattern="$3" label="$4"
  local limit
  limit=$(floor_keep "$keep")

  if [ ! -d "$dir" ]; then
    log "$label: $dir is missing, nothing to do"
    return 0
  fi

  # Newest first by mtime, not by the date embedded in the name: the oldest
  # entries predate the current naming convention. NUL-separated so names with
  # spaces survive the round trip.
  local entries=()
  while IFS= read -r -d '' entry; do
    entries+=("$entry")
  done < <(
    find "$dir" -maxdepth 1 -mindepth 1 -name "$pattern" -printf '%T@\t%p\0' \
      | sort -z -k1,1 -rn \
      | cut -z -f2-
  )

  local total="${#entries[@]}"
  if [ "$total" -le "$limit" ]; then
    log "$label: $total entries, all within the $limit-entry limit"
    return 0
  fi

  log "$label: $total entries, keeping the newest $limit"

  local entry base size
  for entry in "${entries[@]:limit}"; do
    base="${entry#"$dir"/}"
    # Refuse anything that is not a direct child of $dir. A malformed listing
    # must never turn into `rm -rf` on a parent path.
    if [ -z "$entry" ] || [ -z "$base" ] || [ "$base" = "$entry" ] || [ "$base" = "." ] || [ "$base" = ".." ]; then
      log "WARN: refusing to delete unexpected path '$entry'"
      continue
    fi
    size=$(size_of "$entry")
    if [ "$DRY_RUN" = "1" ]; then
      log "dry-run: would delete $base ($size)"
    else
      rm -rf -- "$entry"
      log "deleted $base ($size)"
    fi
  done
}

free_mb() {
  df -Pk / | awk 'NR==2 {printf "%d", $4 / 1024}'
}

main() {
  local before after
  before=$(free_mb)
  log "retention run starting (dry-run=$DRY_RUN, free ${before} MB)"

  prune "$BACKUP_DIR" "$KEEP_SNAPSHOTS" '*' 'deploy snapshots'
  prune "$APP_DIR" "$KEEP_NEXT_PREVIOUS" '.next.previous-*' 'previous builds'

  after=$(free_mb)
  if [ "$DRY_RUN" = "1" ]; then
    log "dry-run complete, free ${after} MB (unchanged)"
  else
    log "retention run complete, free ${after} MB (reclaimed $((after - before)) MB)"
  fi
}

main "$@"
