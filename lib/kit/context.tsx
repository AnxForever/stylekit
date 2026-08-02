"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Kit, KitItem, KitItemType } from "./types";
import {
  kitItemKey,
  makeKit,
  moveKitItemToFront,
  normalizeKitItems,
  readKitCollection,
  sanitizeKitName,
  writeKitCollection,
  MAX_KITS,
} from "./storage";

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
}

const KitContext = createContext<KitContextType | null>(null);

export function KitProvider({ children }: { children: ReactNode }) {
  const [kits, setKits] = useState<Kit[]>([]);
  const [activeKitId, setActiveKitId] = useState<string>("");
  const [hydrated, setHydrated] = useState(false);

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

  const activeKit = useMemo(
    () => kits.find((kit) => kit.id === activeKitId) ?? kits[0] ?? null,
    [kits, activeKitId]
  );
  const items = activeKit?.items ?? [];

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
