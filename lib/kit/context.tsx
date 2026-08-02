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
import type { KitItem, KitItemType } from "./types";
import { kitItemKey, moveKitItemToFront, normalizeKitItems, readKitFromStorage, writeKitToStorage } from "./storage";

interface KitContextType {
  items: KitItem[];
  count: number;
  addItem: (type: KitItemType, slug: string) => void;
  removeItem: (type: KitItemType, slug: string) => void;
  toggleItem: (type: KitItemType, slug: string) => void;
  hasItem: (type: KitItemType, slug: string) => boolean;
  updateNote: (type: KitItemType, slug: string, note: string) => void;
  makePrimary: (type: KitItemType, slug: string) => void;
  clearKit: () => void;
}

const KitContext = createContext<KitContextType | null>(null);

export function KitProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<KitItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (deferred to a task so SSR markup
  // and the first client render agree, and to satisfy set-state-in-effect).
  useEffect(() => {
    const id = window.setTimeout(() => {
      setItems(readKitFromStorage());
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    writeKitToStorage(items);
  }, [items, hydrated]);

  const addItem = useCallback((type: KitItemType, slug: string) => {
    setItems((prev) => {
      const key = `${type}:${slug}`;
      if (prev.some((item) => kitItemKey(item) === key)) return prev;
      return normalizeKitItems([...prev, { type, slug, addedAt: new Date().toISOString() }]);
    });
  }, []);

  const removeItem = useCallback((type: KitItemType, slug: string) => {
    setItems((prev) => prev.filter((item) => !(item.type === type && item.slug === slug)));
  }, []);

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

  const updateNote = useCallback((type: KitItemType, slug: string, note: string) => {
    setItems((prev) =>
      prev.map((item) =>
        item.type === type && item.slug === slug
          ? { ...item, note: note.trim() ? note.slice(0, 500) : undefined }
          : item
      )
    );
  }, []);

  const makePrimary = useCallback((type: KitItemType, slug: string) => {
    setItems((prev) => moveKitItemToFront(prev, type, slug));
  }, []);

  const clearKit = useCallback(() => setItems([]), []);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      addItem,
      removeItem,
      toggleItem,
      hasItem,
      updateNote,
      makePrimary,
      clearKit,
    }),
    [items, addItem, removeItem, toggleItem, hasItem, updateNote, makePrimary, clearKit]
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
