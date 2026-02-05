"use client";

import { useState, useEffect, useCallback } from "react";
import dynamic from "next/dynamic";

// Lazy load CommandPalette - only when user activates it
const CommandPalette = dynamic(
  () => import("@/components/ui/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function LazyCommandPalette() {
  const [activated, setActivated] = useState(false);

  // Listen for Cmd+K / Ctrl+K to activate the palette
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      setActivated(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Only render CommandPalette after first activation
  if (!activated) {
    return null;
  }

  return <CommandPalette />;
}
