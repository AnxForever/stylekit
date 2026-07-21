"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { installAppHistoryTracking } from "@/lib/navigation/browser-history";
import {
  isSemanticBackLabel,
  navigateBackOrFallback,
} from "@/lib/navigation/smart-back";

function getBackLabel(anchor: HTMLAnchorElement): string {
  return (
    anchor.getAttribute("aria-label") ||
    anchor.getAttribute("title") ||
    anchor.textContent ||
    ""
  );
}

function getFallbackHref(anchor: HTMLAnchorElement): string | null {
  const rawHref = anchor.getAttribute("href");
  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:")
  ) {
    return null;
  }

  try {
    const url = new URL(anchor.href, window.location.href);
    if (url.origin !== window.location.origin) {
      return null;
    }
    return `${url.pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

export function BackNavigationRuntime() {
  const router = useRouter();

  useEffect(() => installAppHistoryTracking(), []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const anchor = target.closest("a");
      if (
        !(anchor instanceof HTMLAnchorElement) ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        anchor.dataset.backNavigation === "false"
      ) {
        return;
      }

      const isExplicitBack = anchor.dataset.backNavigation === "true";
      if (!isExplicitBack && !isSemanticBackLabel(getBackLabel(anchor))) {
        return;
      }

      const fallbackHref = getFallbackHref(anchor);
      if (!fallbackHref) {
        return;
      }

      event.preventDefault();
      navigateBackOrFallback(router, { fallbackHref });
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return null;
}
