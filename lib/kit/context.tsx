"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Kit, KitItem, KitItemType } from "./types";
import {
  kitItemKey,
  makeKit,
  moveKitItemToFront,
  normalizeKitItems,
  normalizeKits,
  readKitCollection,
  resolveActiveKitId,
  sanitizeKitName,
  writeKitCollection,
  MAX_KITS,
} from "./storage";
import { mergeKitCollections } from "./merge";
import { useUser } from "@/lib/auth/use-user";
import { getAuthClient } from "@/lib/auth/supabase-browser";

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
  return fetch(input, { ...init, headers });
}

interface KitContextType {
  /** Items of the active kit. */
  items: KitItem[];
  count: number;
  kits: Kit[];
  activeKitId: string;
  activeKitName: string;
  maxKits: number;
  addItem: (type: KitItemType, slug: string) => void;
  removeItem: (type: KitItemType, slug: string) => void;
  toggleItem: (type: KitItemType, slug: string) => void;
  hasItem: (type: KitItemType, slug: string) => boolean;
  updateNote: (type: KitItemType, slug: string, note: string) => void;
  makePrimary: (type: KitItemType, slug: string) => void;
  clearKit: () => void;
  // Multi-kit management
  createKit: (name?: string) => void;
  renameKit: (id: string, name: string) => void;
  deleteKit: (id: string) => void;
  switchKit: (id: string) => void;
  /** True while the initial cloud sync is in flight (signed-in users). */
  syncing: boolean;
}

const KitContext = createContext<KitContextType | null>(null);

export function KitProvider({ children }: { children: ReactNode }) {
  const { user } = useUser();
  const [kits, setKits] = useState<Kit[]>([]);
  const [activeKitId, setActiveKitId] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);
  const [syncing, setSyncing] = useState(false);
  // One cloud merge per signed-in user per page session.
  const mergedUserIdRef = useRef<string | null>(null);
  // Skip the very first local-write effect so hydration itself isn't a write.
  const skipNextPushRef = useRef(true);

  // Hydrate (and migrate v1 -> v2) after mount so SSR/CSR markup agree.
  useEffect(() => {
    const id = window.setTimeout(() => {
      const { kits: loaded, activeKitId: active } = readKitCollection();
      setKits(loaded);
      setActiveKitId(active);
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeKitCollection(kits, activeKitId);
  }, [kits, activeKitId, hydrated]);

  // Signed-in: merge local kits with the cloud once, then adopt the union.
  useEffect(() => {
    if (!hydrated || !user) {
      if (!user) mergedUserIdRef.current = null;
      return;
    }
    const userId = user.id;
    if (mergedUserIdRef.current === userId) return;
    mergedUserIdRef.current = userId;

    let cancelled = false;
    setSyncing(true);
    (async () => {
      try {
        const res = await fetchWithAuth("/api/kits", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ kits, activeKitId }),
        });
        if (!res.ok || cancelled) return;
        const data = await res.json();
        if (cancelled || !data.success || !Array.isArray(data.kits)) return;
        const remote = normalizeKits(data.kits);
        const merged = mergeKitCollections(kits, remote);
        if (merged.length === 0) return;
        skipNextPushRef.current = true;
        setKits(merged);
        setActiveKitId(resolveActiveKitId(merged, data.activeKitId || activeKitId));
      } catch {
        // Offline or misconfigured: local storage keeps working.
      } finally {
        if (!cancelled) setSyncing(false);
      }
    })();

    return () => {
      cancelled = true;
    };
    // Only re-run when the signed-in user changes, not on every edit.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, hydrated]);

  // Push local changes to the cloud (debounced) for signed-in users.
  useEffect(() => {
    if (!hydrated || !user) return;
    if (skipNextPushRef.current) {
      skipNextPushRef.current = false;
      return;
    }
    const handle = window.setTimeout(() => {
      void fetchWithAuth("/api/kits", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kits, activeKitId }),
      }).catch(() => {});
    }, 1200);
    return () => window.clearTimeout(handle);
  }, [kits, activeKitId, hydrated, user]);

  const activeKit = useMemo(
    () => kits.find((kit) => kit.id === activeKitId) ?? kits[0] ?? null,
    [kits, activeKitId]
  );
  const items = useMemo(() => activeKit?.items ?? [], [activeKit]);

  /** Applies a transform to the active kit's items and bumps updatedAt. */
  const updateActiveItems = useCallback(
    (transform: (items: KitItem[]) => KitItem[]) => {
      setKits((prev) =>
        prev.map((kit) =>
          kit.id === activeKitId
            ? { ...kit, items: transform(kit.items), updatedAt: new Date().toISOString() }
            : kit
        )
      );
    },
    [activeKitId]
  );

  const addItem = useCallback(
    (type: KitItemType, slug: string) => {
      updateActiveItems((prev) => {
        const key = `${type}:${slug}`;
        if (prev.some((item) => kitItemKey(item) === key)) return prev;
        return normalizeKitItems([...prev, { type, slug, addedAt: new Date().toISOString() }]);
      });
    },
    [updateActiveItems]
  );

  const removeItem = useCallback(
    (type: KitItemType, slug: string) => {
      updateActiveItems((prev) =>
        prev.filter((item) => !(item.type === type && item.slug === slug))
      );
    },
    [updateActiveItems]
  );

  const hasItem = useCallback(
    (type: KitItemType, slug: string) =>
      items.some((item) => item.type === type && item.slug === slug),
    [items]
  );

  const toggleItem = useCallback(
    (type: KitItemType, slug: string) => {
      if (items.some((item) => item.type === type && item.slug === slug)) {
        removeItem(type, slug);
      } else {
        addItem(type, slug);
      }
    },
    [items, addItem, removeItem]
  );

  const updateNote = useCallback(
    (type: KitItemType, slug: string, note: string) => {
      updateActiveItems((prev) =>
        prev.map((item) =>
          item.type === type && item.slug === slug
            ? { ...item, note: note.trim() ? note.slice(0, 500) : undefined }
            : item
        )
      );
    },
    [updateActiveItems]
  );

  const makePrimary = useCallback(
    (type: KitItemType, slug: string) => {
      updateActiveItems((prev) => moveKitItemToFront(prev, type, slug));
    },
    [updateActiveItems]
  );

  const clearKit = useCallback(() => {
    updateActiveItems(() => []);
  }, [updateActiveItems]);

  const createKit = useCallback((name?: string) => {
    setKits((prev) => {
      if (prev.length >= MAX_KITS) return prev;
      const kit = makeKit(name ?? `Kit ${prev.length + 1}`);
      setActiveKitId(kit.id);
      return [...prev, kit];
    });
  }, []);

  const renameKit = useCallback((id: string, name: string) => {
    setKits((prev) =>
      prev.map((kit) => (kit.id === id ? { ...kit, name: sanitizeKitName(name) } : kit))
    );
  }, []);

  const deleteKit = useCallback((id: string) => {
    setKits((prev) => {
      if (prev.length <= 1) {
        // Never leave the user with zero kits; clear the last one instead.
        return prev.map((kit) =>
          kit.id === id ? { ...kit, items: [], updatedAt: new Date().toISOString() } : kit
        );
      }
      const next = prev.filter((kit) => kit.id !== id);
      setActiveKitId((current) => (current === id ? next[0].id : current));
      return next;
    });
  }, []);

  const switchKit = useCallback(
    (id: string) => {
      if (kits.some((kit) => kit.id === id)) setActiveKitId(id);
    },
    [kits]
  );

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      kits,
      activeKitId: activeKit?.id ?? "",
      activeKitName: activeKit?.name ?? "",
      maxKits: MAX_KITS,
      addItem,
      removeItem,
      toggleItem,
      hasItem,
      updateNote,
      makePrimary,
      clearKit,
      createKit,
      renameKit,
      deleteKit,
      switchKit,
      syncing,
    }),
    [
      items,
      kits,
      activeKit,
      addItem,
      removeItem,
      toggleItem,
      hasItem,
      updateNote,
      makePrimary,
      clearKit,
      createKit,
      renameKit,
      deleteKit,
      switchKit,
      syncing,
    ]
  );

  return <KitContext.Provider value={value}>{children}</KitContext.Provider>;
}

export function useKit(): KitContextType {
  const context = useContext(KitContext);
  if (!context) {
    throw new Error("useKit must be used within KitProvider");
  }
  return context;
}
