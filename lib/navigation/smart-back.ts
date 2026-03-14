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

function canUseBrowserBack(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  if (window.history.length <= 1) {
    return false;
  }

  if (!document.referrer) {
    return true;
  }

  try {
    return new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
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
    router.push(href);
    return;
  }

  if (canUseBrowserBack()) {
    router.back();
    return;
  }

  router.push(fallbackHref);
}
