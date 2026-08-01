"use client";

import { useSyncExternalStore } from "react";

const APPLE_PLATFORM_RE = /Mac|iPhone|iPad|iPod/i;

const subscribeNever = () => () => {};
const readIsApple = () =>
  APPLE_PLATFORM_RE.test(navigator.platform || navigator.userAgent);
const serverIsApple = () => false;

interface ShortcutHintProps {
  /** Key label that follows the modifier, e.g. "K", "N", "S", "/" */
  keys: string;
  /**
   * Separator inserted between "Ctrl" and `keys` on non-Apple platforms.
   * Apple platforms always render the command glyph directly adjacent to
   * `keys` (no separator), matching macOS convention. Default "+".
   */
  separator?: string;
}

/**
 * Platform-aware keyboard shortcut text. Renders "⌘{keys}" on Apple platforms
 * (macOS / iOS / iPadOS) and "Ctrl{separator}{keys}" elsewhere.
 *
 * SSR-safe: returns the non-Apple variant during SSR and the first client
 * render so the server and client markup match (no hydration mismatch), then
 * settles to the real value after mount. Wrap in a <kbd>/<span> for styling.
 */
export function ShortcutHint({ keys, separator = "+" }: ShortcutHintProps) {
  // Platform never changes while mounted, so the store never notifies; the
  // server snapshot keeps SSR and hydration on the non-Apple variant, then
  // React settles to the real platform right after hydration.
  const isApple = useSyncExternalStore(subscribeNever, readIsApple, serverIsApple);
  return <>{isApple ? `⌘${keys}` : `Ctrl${separator}${keys}`}</>;
}
