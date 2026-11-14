"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { observeCatalogImpressions, type CatalogImpressionContext } from "@/lib/analytics/catalog-impressions";

/** Attach only to real catalog cards, never demo content inside showcases. */
export function CatalogAnalytics({ children, className, surface, contextKey, collectionSlug = null }: {
  children: ReactNode;
  className?: string;
  surface: CatalogImpressionContext["surface"];
  contextKey: string;
  collectionSlug?: string | null;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const seenRef = useRef(new Set<string>());
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    return observeCatalogImpressions(root, {
      surface, contextKey, collectionSlug,
      sort: null, filterCount: 0, queryPresent: false,
    }, seenRef.current);
  }, [surface, contextKey, collectionSlug, children]);
  return <div ref={rootRef} className={className}>{children}</div>;
}
