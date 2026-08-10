#!/usr/bin/env bash
set -euo pipefail

# Safe-by-default cleanup for the StyleKit host.
# It only considers known generated backup/build names and previews removals
# unless STYLEKIT_CLEANUP_DRY_RUN=0 is explicitly provided.

APP_DIR="${STYLEKIT_APP_DIR:-/www/stylekit}"
BACKUP_DIR="${STYLEKIT_BACKUP_DIR:-/www/stylekit-backups}"
KEEP_FULL_BACKUPS="${STYLEKIT_KEEP_FULL_BACKUPS:-1}"
KEEP_BUILD_BACKUPS="${STYLEKIT_KEEP_BUILD_BACKUPS:-2}"
DRY_RUN="${STYLEKIT_CLEANUP_DRY_RUN:-1}"

if [[ "$APP_DIR" == "/" || "$BACKUP_DIR" == "/" ]]; then
  echo "Refusing to operate on /" >&2
  exit 1
fi

if [[ ! -d "$APP_DIR" || ! -d "$BACKUP_DIR" ]]; then
  echo "Required directory is missing: APP_DIR=$APP_DIR BACKUP_DIR=$BACKUP_DIR" >&2
  exit 1
fi

if ! [[ "$KEEP_FULL_BACKUPS" =~ ^[0-9]+$ && "$KEEP_BUILD_BACKUPS" =~ ^[0-9]+$ ]]; then
  echo "Retention values must be non-negative integers." >&2
  exit 1
fi

remove_child() {
  local parent="$1"
  local name="$2"
  local target="$parent/$name"

  case "$name" in
    ""|.|..|*/*|*\ *)
      echo "Refusing unsafe child name: $name" >&2
      exit 1
      ;;
  esac

  if [[ ! -e "$target" && ! -L "$target" ]]; then
    return
  fi

  if [[ "$DRY_RUN" != "0" ]]; then
    echo "would remove $target"
    return
  fi

  rm -rf -- "$target"
  echo "removed $target"
}

remove_older_than() {
  local keep="$1"
  shift
  local -a names=("$@")

  for ((index = keep; index < ${#names[@]}; index++)); do
    remove_child "$BACKUP_DIR" "${names[index]}"
  done
}

mapfile -t full_backups < <(
  find "$BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d \
    -name 'stylekit-??????????????' -printf '%f\n' | sort -r
)
remove_older_than "$KEEP_FULL_BACKUPS" "${full_backups[@]}"

mapfile -t build_backups < <(
  find "$BACKUP_DIR" -mindepth 1 -maxdepth 1 -type d \( \
    -name 'ops-dashboard-??????????????' -o \
    -name 'content-center-??????????????' \
  \) -printf '%f\n' | sort -r
)
remove_older_than "$KEEP_BUILD_BACKUPS" "${build_backups[@]}"

while IFS= read -r -d '' leftover; do
  remove_child "$APP_DIR" "$(basename "$leftover")"
done < <(
  find "$APP_DIR" -mindepth 1 -maxdepth 1 -type d \( \
    -name '.next-failed-*' -o \
    -name '.next-backup-*' \
  \) -print0
)

if command -v dnf >/dev/null 2>&1; then
  if [[ "$DRY_RUN" != "0" ]]; then
    echo "would run dnf clean all"
  else
    dnf clean all
    echo "cleaned dnf cache"
  fi
fi

echo "cleanup complete (dry_run=$DRY_RUN)"
