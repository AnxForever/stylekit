const APP_HISTORY_INDEX_KEY = "__stylekitAppHistoryIndex";
const APP_HISTORY_PATHS_KEY = "__stylekitAppHistoryPaths";
const PATCH_FLAG = "__stylekitAppHistoryPatched";

type PatchedHistory = History & {
  [PATCH_FLAG]?: boolean;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function withHistoryIndex(state: unknown, index: number) {
  return {
    ...(isRecord(state) ? state : {}),
    [APP_HISTORY_INDEX_KEY]: index,
  };
}

function hasSameOriginReferrer(): boolean {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  if (!document.referrer) {
    return false;
  }

  try {
    return new URL(document.referrer).origin === window.location.origin;
  } catch {
    return false;
  }
}

function readHistoryPaths(): Record<string, string> {
  if (typeof window === "undefined") {
    return {};
  }
  try {
    const raw = sessionStorage.getItem(APP_HISTORY_PATHS_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : {};
    return isRecord(parsed) ? (parsed as Record<string, string>) : {};
  } catch {
    return {};
  }
}

function writeHistoryPath(index: number, path: string): void {
  try {
    const paths = readHistoryPaths();
    paths[String(index)] = path;
    sessionStorage.setItem(APP_HISTORY_PATHS_KEY, JSON.stringify(paths));
  } catch {
    // Session storage unavailable (privacy mode) - direction checks degrade
    // gracefully to plain history behavior.
  }
}

export function getAppHistoryIndex(): number | null {
  if (typeof window === "undefined") {
    return null;
  }

  const value = isRecord(window.history.state)
    ? window.history.state[APP_HISTORY_INDEX_KEY]
    : null;

  return typeof value === "number" && Number.isInteger(value) && value >= 0
    ? value
    : null;
}

export function hasUsableAppHistory(): boolean {
  if (typeof window === "undefined" || window.history.length <= 1) {
    return false;
  }

  const index = getAppHistoryIndex();
  if (index !== null) {
    return index > 0;
  }

  // Covers a same-origin full-page navigation before the client tracker mounts.
  return hasSameOriginReferrer();
}

// The pathname the previous history entry showed, if the tracker recorded it.
// Lets smart-back verify that going "back" actually points where a semantic
// back link promises to go.
export function getPreviousAppHistoryPath(): string | null {
  const index = getAppHistoryIndex();
  if (index === null || index <= 0) {
    return null;
  }
  const value = readHistoryPaths()[String(index - 1)];
  return typeof value === "string" ? value : null;
}

export function installAppHistoryTracking(): () => void {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const history = window.history as PatchedHistory;
  if (history[PATCH_FLAG]) {
    return () => undefined;
  }

  const originalPushState = history.pushState.bind(history);
  const originalReplaceState = history.replaceState.bind(history);

  if (getAppHistoryIndex() === null) {
    originalReplaceState(
      withHistoryIndex(history.state, hasSameOriginReferrer() ? 1 : 0),
      ""
    );
  }
  const initialIndex = getAppHistoryIndex();
  if (initialIndex !== null) {
    writeHistoryPath(initialIndex, window.location.pathname);
  }

  const trackedPushState: History["pushState"] = (data, unused, url) => {
    const currentIndex = getAppHistoryIndex() ?? 0;
    originalPushState(withHistoryIndex(data, currentIndex + 1), unused, url);
    writeHistoryPath(currentIndex + 1, window.location.pathname);
  };

  const trackedReplaceState: History["replaceState"] = (data, unused, url) => {
    const currentIndex = getAppHistoryIndex() ?? 0;
    originalReplaceState(withHistoryIndex(data, currentIndex), unused, url);
    writeHistoryPath(currentIndex, window.location.pathname);
  };

  history.pushState = trackedPushState;
  history.replaceState = trackedReplaceState;
  history[PATCH_FLAG] = true;

  return () => {
    if (history.pushState === trackedPushState) {
      history.pushState = originalPushState;
    }
    if (history.replaceState === trackedReplaceState) {
      history.replaceState = originalReplaceState;
    }
    delete history[PATCH_FLAG];
  };
}
