"use client";

import dynamic from "next/dynamic";

// Lazy load CommandPalette - it's only needed when user presses Cmd+K
const CommandPalette = dynamic(
  () => import("@/components/ui/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

export function LazyCommandPalette() {
  return <CommandPalette />;
}
