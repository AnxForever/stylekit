"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
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

// Anonymous favorites are intentionally separate from authenticated accounts.
// Never merge this list into a user account: browser storage is shared when
// people switch between Google, NodeLoc, and other providers.
const STORAGE_KEY = "stylekit-favorites-anonymous-v2";
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
  // Authenticated mode: load only the current user's server favorites.
  // Anonymous local favorites must not be copied into another account when
  // the user switches providers in the same browser.
  useEffect(() => {
    if (!user || !mounted) return;

    let cancelled = false;
    setFavorites([]);
    setSyncing(true);

    async function loadServerFavorites() {
      try {
        const res = await fetchWithAuth("/api/favorites");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.favorites)) {
          const serverSlugs = normalizeFavorites(data.favorites);
          setFavorites(serverSlugs);
        }
      } catch {
        // Network error, keep the account-scoped state empty.
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
      setFavorites(readLocalFavorites());
    }
  }, [user]);

  // Persist only anonymous favorites. Authenticated favorites live on the
  // server and must not be copied between accounts through localStorage.
  useEffect(() => {
    if (mounted && !user) {
      writeLocalFavorites(favorites);
    }
  }, [favorites, mounted, user]);

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
