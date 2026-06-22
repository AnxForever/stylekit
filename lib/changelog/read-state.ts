import { changelog } from "@/lib/changelog";

export const CHANGELOG_SEEN_STORAGE_KEY = "sk-announcement-dismissed";

export function getLatestChangelogVersion() {
  return changelog[0]?.version ?? "";
}

export function hasSeenLatestChangelog() {
  const latest = getLatestChangelogVersion();
  if (!latest || typeof window === "undefined") return true;

  try {
    return localStorage.getItem(CHANGELOG_SEEN_STORAGE_KEY) === latest;
  } catch {
    return false;
  }
}

export function markLatestChangelogSeen() {
  const latest = getLatestChangelogVersion();
  if (!latest || typeof window === "undefined") return;

  try {
    localStorage.setItem(CHANGELOG_SEEN_STORAGE_KEY, latest);
  } catch {
    // localStorage may be unavailable in private or restricted contexts.
  }
}

export function isChangelogPath(pathname: string | null) {
  return pathname === "/changelog" || pathname?.endsWith("/changelog") === true;
}
