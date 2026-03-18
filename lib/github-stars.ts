const REPO = "AnxForever/stylekit";
const CACHE_KEY = "gh_star_count";
const CACHE_TTL = 1000 * 60 * 30;

let memoryCount: number | null = null;
let hasLoadedCache = false;
let inFlight: Promise<number | null> | null = null;
const listeners = new Set<() => void>();

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function getCachedCount(): number | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;

    const { count, ts } = JSON.parse(raw) as { count: number; ts: number };
    if (Date.now() - ts > CACHE_TTL) return null;
    return count;
  } catch {
    return null;
  }
}

function setCachedCount(count: number) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ count, ts: Date.now() }));
  } catch {
    // Ignore localStorage quota or access issues.
  }
}

function ensureCacheLoaded() {
  if (hasLoadedCache || typeof window === "undefined") return;

  hasLoadedCache = true;
  const cached = getCachedCount();
  if (cached === null) return;

  memoryCount = cached;
}

export function subscribeGitHubStars(listener: () => void) {
  ensureCacheLoaded();
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
}

export function getGitHubStarsSnapshot() {
  ensureCacheLoaded();
  return memoryCount;
}

export function getGitHubStarsServerSnapshot() {
  return null;
}

export async function requestGitHubStars(): Promise<number | null> {
  ensureCacheLoaded();
  if (typeof window === "undefined") return null;
  if (inFlight) return inFlight;

  inFlight = fetch(`https://api.github.com/repos/${REPO}`, {
    headers: { Accept: "application/vnd.github.v3+json" },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`GitHub API ${res.status}`);
      }
      return res.json() as Promise<{ stargazers_count?: number }>;
    })
    .then((data) => {
      const fresh = data.stargazers_count ?? 0;
      memoryCount = fresh;
      setCachedCount(fresh);
      notifyListeners();
      return fresh;
    })
    .catch(() => memoryCount)
    .finally(() => {
      inFlight = null;
    });

  return inFlight;
}

export function formatGitHubStars(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }

  return String(count);
}

export const GITHUB_REPO_URL = `https://github.com/${REPO}`;
