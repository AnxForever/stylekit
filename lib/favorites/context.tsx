"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { useUser } from "@/lib/auth/use-user";
import { getAuthClient } from "@/lib/auth/supabase-browser";

interface FavoritesContextType {
  favorites: string[];
  addFavorite: (slug: string) => void;
  removeFavorite: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  syncing: boolean;
}

const FavoritesContext = createContext<FavoritesContextType | null>(null);

const STORAGE_KEY = "stylekit-favorites";
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function fetchWithAuth(input: RequestInfo | URL, init: RequestInit = {}) {
  const headers = new Headers(init.headers ?? {});
  const client = getAuthClient();
  if (client) {
    const {
      data: { session },
    } = await client.auth.getSession();
    if (session?.access_token) {
      headers.set("Authorization", `Bearer ${session.access_token}`);
    }
  }

  return fetch(input, {
    ...init,
    headers,
  });
}

function normalizeFavorites(values: unknown): string[] {
  if (!Array.isArray(values)) return [];

  const normalized: string[] = [];
  const seen = new Set<string>();
  for (const value of values) {
    if (typeof value !== "string") continue;
    const slug = value.trim();
    if (!SLUG_RE.test(slug) || seen.has(slug)) continue;
    seen.add(slug);
    normalized.push(slug);
  }

  return normalized;
}

function mergeFavoriteLists(...lists: string[][]): string[] {
  return normalizeFavorites(lists.flat());
}

function readLocalFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return normalizeFavorites(parsed);
    }
  } catch {
    // Invalid JSON, ignore
  }
  return [];
}

function writeLocalFavorites(favorites: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch {
    // Ignore write failures (private mode / quota)
  }
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const mergedUserIdRef = useRef<string | null>(null);

  // Authenticated mode: load favorites from server
  useEffect(() => {
    if (!user || !mounted) return;
    const userId = user.id;

    let cancelled = false;
    setSyncing(true);

    async function loadServerFavorites() {
      try {
        const localSlugs = readLocalFavorites();

        // Merge once per logged-in user per page session.
        if (mergedUserIdRef.current !== userId && localSlugs.length > 0) {
          mergedUserIdRef.current = userId;
          await fetchWithAuth("/api/favorites/merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ slugs: localSlugs }),
          });
        }

        const res = await fetchWithAuth("/api/favorites");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.favorites)) {
          const serverSlugs = normalizeFavorites(data.favorites);
          const mergedSlugs = mergeFavoriteLists(serverSlugs, localSlugs);
          setFavorites(mergedSlugs);

          // If server still misses local slugs, retry best-effort upsert.
          const serverSet = new Set(serverSlugs);
          const missingLocal = localSlugs.filter((slug) => !serverSet.has(slug));
          if (missingLocal.length > 0) {
            void fetchWithAuth("/api/favorites/merge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slugs: missingLocal }),
            }).catch(() => {});
          }
        }
      } catch {
        // Network error, keep current state
      } finally {
        if (!cancelled) setSyncing(false);
      }
    }

    void loadServerFavorites();
    return () => { cancelled = true; };
  }, [user, mounted]);

  // Anonymous mode: load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    if (!user) {
      mergedUserIdRef.current = null;
      setFavorites(readLocalFavorites());
    }
  }, [user]);

  // Persist a local shadow copy for both anonymous and authenticated users.
  useEffect(() => {
    if (mounted) {
      writeLocalFavorites(favorites);
    }
  }, [favorites, mounted]);

  const addFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      if (prev.includes(slug)) return prev;
      return [...prev, slug];
    });

    if (user) {
      fetchWithAuth("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      }).catch(() => {});
    }
  }, [user]);

  const removeFavorite = useCallback((slug: string) => {
    setFavorites((prev) => prev.filter((s) => s !== slug));

    if (user) {
      fetchWithAuth(`/api/favorites?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      }).catch(() => {});
    }
  }, [user]);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const removing = prev.includes(slug);
      if (removing) {
        if (user) {
          fetchWithAuth(`/api/favorites?slug=${encodeURIComponent(slug)}`, {
            method: "DELETE",
          }).catch(() => {});
        }
        return prev.filter((s) => s !== slug);
      }
      if (user) {
        fetchWithAuth("/api/favorites", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        }).catch(() => {});
      }
      return [...prev, slug];
    });
  }, [user]);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, toggleFavorite, isFavorite, syncing }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
