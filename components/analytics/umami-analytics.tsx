"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {
  canCollectClientAnalytics,
  isExcludedAnalyticsPath,
} from "@/lib/analytics/collection-policy";

declare global {
  interface Window {
    stylekitBeforeUmamiSend?: (type: string, payload: Record<string, unknown>) => Record<string, unknown> | false;
  }
}

/** Umami >= 2.18: https://docs.umami.is/docs/tracker-configuration#data-before-send */
export function beforeUmamiSend(_type: string, payload: Record<string, unknown>) {
  if (!canCollectClientAnalytics()) return false;
  if (typeof payload.url === "string") {
    try {
      if (isExcludedAnalyticsPath(new URL(payload.url, window.location.origin).pathname)) return false;
    } catch {
      return false;
    }
  }
  return payload;
}

export function UmamiAnalytics({ src, websiteId }: { src: string; websiteId: string }) {
  const pathname = usePathname();
  useEffect(() => {
    // Keep the hook installed after SPA navigation. Removing the script does
    // not remove its history listeners; this hook checks every subsequent send.
    window.stylekitBeforeUmamiSend = beforeUmamiSend;
    if (!canCollectClientAnalytics() || document.getElementById("umami-analytics")) return;
    const script = document.createElement("script");
    script.id = "umami-analytics";
    script.src = src;
    script.async = true;
    script.dataset.websiteId = websiteId;
    script.dataset.domains = "stylekit.top,www.stylekit.top";
    script.dataset.beforeSend = "stylekitBeforeUmamiSend";
    script.dataset.doNotTrack = "true";
    script.dataset.excludeSearch = "true";
    script.dataset.excludeHash = "true";
    document.head.appendChild(script);
  }, [pathname, src, websiteId]);
  return null;
}
