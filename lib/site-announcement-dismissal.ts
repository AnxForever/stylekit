import type { SiteAnnouncementLocale } from "./site-announcements";

const DISMISSED_PREFIX = "sk-site-announcement-dismissed:";
const LEGACY_ANNOUNCEMENT_ID_PREFIX = "site-announcement:";
const LEGACY_REVISION_PREFIX = "sk-site-announcement-legacy-revision:";

export function getAnnouncementDismissalKeys(
  id: string,
  locale: SiteAnnouncementLocale,
) {
  return {
    current: DISMISSED_PREFIX + id,
    legacy: DISMISSED_PREFIX + LEGACY_ANNOUNCEMENT_ID_PREFIX + locale,
    legacyRevision: LEGACY_REVISION_PREFIX + locale,
  } as const;
}

export function hasAnnouncementDismissal(
  storage: { getItem(key: string): string | null; setItem(key: string, value: string): void },
  id: string,
  locale: SiteAnnouncementLocale,
): boolean {
  const keys = getAnnouncementDismissalKeys(id, locale);
  if (storage.getItem(keys.current) === "1") return true;
  if (storage.getItem(keys.legacy) !== "1") return false;
  const migratedRevision = storage.getItem(keys.legacyRevision);
  if (migratedRevision !== null) return migratedRevision === id;
  storage.setItem(keys.legacyRevision, id);
  return true;
}

export function buildAnnouncementBootstrapScript(
  id: string,
  locale: SiteAnnouncementLocale,
): string {
  const keys = getAnnouncementDismissalKeys(id, locale);
  const currentKey = JSON.stringify(keys.current);
  const legacyKey = JSON.stringify(keys.legacy);
  const migrationKey = JSON.stringify(keys.legacyRevision);
  const currentId = JSON.stringify(id);
  const escapeScriptLiteral = (value: string) => value.replace(/</g, "\\u003c");
  return [
    "(function () {",
    "  try {",
    "    if (localStorage.getItem(" + escapeScriptLiteral(currentKey) + ") === \"1\") {",
    "      document.documentElement.dataset.siteAnnouncementDismissed = \"true\";",
    "      return;",
    "    }",
    "    if (localStorage.getItem(" + escapeScriptLiteral(legacyKey) + ") !== \"1\") return;",
    "    var migratedRevision = localStorage.getItem(" + escapeScriptLiteral(migrationKey) + ");",
    "    if (migratedRevision === null) {",
    "      localStorage.setItem(" + escapeScriptLiteral(migrationKey) + ", " + escapeScriptLiteral(currentId) + ");",
    "      migratedRevision = " + escapeScriptLiteral(currentId) + ";",
    "    }",
    "    if (migratedRevision === " + escapeScriptLiteral(currentId) + ") {",
    "      document.documentElement.dataset.siteAnnouncementDismissed = \"true\";",
    "    }",
    "  } catch {}",
    "})();",
  ].join("\n");
}
