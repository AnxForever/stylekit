import {
  getLocaleFromPathname,
  isLocale,
  localizeHref,
  LOCALE_COOKIE_NAME,
} from "@/lib/i18n/routing";
import { hasUsableAppHistory, getPreviousAppHistoryPath } from "@/lib/navigation/browser-history";

interface RouterLike {
  back(): void;
  push(href: string): void;
}

interface SmartBackOptions {
  href?: string;
  fallbackHref?: string;
  savedReturnUrlKey?: string;
  consumeSavedReturnUrl?: boolean;
}

function readSavedReturnUrl(key: string): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = sessionStorage.getItem(key);
  if (!raw) {
    return null;
  }

  try {
    const url = new URL(raw, window.location.origin);
    if (url.origin !== window.location.origin) {
      return null;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function readLocaleCookie(): "en" | "zh" | null {
  if (typeof document === "undefined" || !document.cookie) {
    return null;
  }

  const prefix = `${LOCALE_COOKIE_NAME}=`;
  const rawValue = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))
    ?.slice(prefix.length);

  if (!rawValue) {
    return null;
  }

  try {
    const value = decodeURIComponent(rawValue);
    return isLocale(value) ? value : null;
  } catch {
    return null;
  }
}

function localizeForCurrentPath(href: string): string {
  if (typeof window === "undefined") {
    return href;
  }

  const locale =
    getLocaleFromPathname(window.location.pathname) ?? readLocaleCookie();
  return locale ? localizeHref(href, locale) : href;
}

export function isSemanticBackLabel(label: string): boolean {
  const normalized = label.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return false;
  }

  return (
    /^(?:back(?:\s+to)?\b|返回|回到|戻る)/i.test(normalized) ||
    /^(?:←|⟵|‹|«)\s*\S/.test(normalized)
  );
}

// Reduce a path to its locale-free pathname so "/zh/styles" and "/styles?x=1"
// compare as the same destination.
function normalizeComparablePath(path: string): string {
  let pathname = path;
  try {
    pathname = new URL(path, "https://internal.invalid").pathname;
  } catch {
    // keep the raw value
  }
  pathname = pathname.replace(/^\/(en|zh)(?=\/|$)/, "").replace(/\/+$/, "");
  return pathname === "" ? "/" : pathname;
}

export function navigateBackOrFallback(
  router: RouterLike,
  options: SmartBackOptions = {}
): void {
  const {
    href,
    fallbackHref = "/",
    savedReturnUrlKey,
    consumeSavedReturnUrl = true,
  } = options;

  if (hasUsableAppHistory()) {
    // A semantic back control promises a destination. Only reuse browser
    // history when the previous entry actually is that destination -
    // otherwise (e.g. showcase -> detail -> "back to catalog", where the
    // previous entry is the showcase) honor the label and navigate forward.
    const semanticTarget = options.href ?? options.fallbackHref ?? null;
    const previousPath = semanticTarget ? getPreviousAppHistoryPath() : null;
    if (
      !semanticTarget ||
      previousPath === null ||
      normalizeComparablePath(previousPath) ===
        normalizeComparablePath(semanticTarget)
    ) {
      router.back();
      return;
    }
  }

  if (savedReturnUrlKey) {
    const savedUrl = readSavedReturnUrl(savedReturnUrlKey);
    if (savedUrl) {
      if (consumeSavedReturnUrl && typeof window !== "undefined") {
        sessionStorage.removeItem(savedReturnUrlKey);
      }
      router.push(savedUrl);
      return;
    }
  }

  if (href) {
    router.push(localizeForCurrentPath(href));
    return;
  }

  router.push(localizeForCurrentPath(fallbackHref));
}
