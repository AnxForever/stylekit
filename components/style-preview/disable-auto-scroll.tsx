"use client";

import { ReactNode, useEffect } from "react";

/**
 * Prevents browser/Next.js auto-scroll-to-top on soft navigation.
 * Sets scrollRestoration to "manual" while mounted, restores "auto" on unmount.
 */
export function DisableAutoScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  return <>{children}</>;
}
