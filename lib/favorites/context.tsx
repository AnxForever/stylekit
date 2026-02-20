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

function readLocalFavorites(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // Invalid JSON, ignore
  }
  return [];
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [favorites, setFavorites] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const mergedRef = useRef(false);

  // Authenticated mode: load favorites from server
  useEffect(() => {
    if (!user || !mounted) return;

    let cancelled = false;
    setSyncing(true);

    async function loadServerFavorites() {
      try {
        // Merge local favorites to server on login (upsert-based and idempotent).
        if (!mergedRef.current) {
          mergedRef.current = true;
          const localSlugs = readLocalFavorites();
          if (localSlugs.length > 0) {
            await fetchWithAuth("/api/favorites/merge", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ slugs: localSlugs }),
            });
          }
        }

        const res = await fetchWithAuth("/api/favorites");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.success && Array.isArray(data.favorites)) {
          setFavorites(data.favorites);
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
      setFavorites(readLocalFavorites());
    }
  }, [user]);

  // Anonymous mode: persist to localStorage
  useEffect(() => {
    if (mounted && !user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
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
