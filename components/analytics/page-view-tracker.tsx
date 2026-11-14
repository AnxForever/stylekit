"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics/events";

const SEARCH_ENGINES = ["google.", "bing.com", "duckduckgo.com", "baidu.com", "yahoo.", "yandex."];
const SOCIAL_SOURCES = ["x.com", "twitter.com", "t.co", "linkedin.com", "facebook.com", "reddit.com", "youtube.com", "github.com"];

export function PageViewTracker() {
  const pathname = usePathname();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    let restored = false;
    const trackVisiblePage = () => {
      if (document.visibilityState === "hidden" || (lastTrackedRef.current === pathname && !restored)) return;
      const hostname = window.location.hostname;
      // BFCache retains document.referrer from the original load; it cannot
      // establish the source of a later history restoration.
      const referrer = restored ? null : lastTrackedRef.current ? window.location.origin : document.referrer || null;
      lastTrackedRef.current = pathname;
      restored = false;

      // Queue immediately: an idle callback cancelled during navigation loses PV.
      trackPageView({
        path: pathname,
        hostname,
        referrerDomain: getReferrerDomain(referrer),
        referrerType: classifyReferrer(referrer, hostname),
      });
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      restored = true;
      trackVisiblePage();
    };
    trackVisiblePage();
    document.addEventListener("visibilitychange", trackVisiblePage);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      document.removeEventListener("visibilitychange", trackVisiblePage);
      window.removeEventListener("pageshow", onPageShow);
    };
  }, [pathname]);

  return null;
}

function getReferrerDomain(referrer: string | null): string | null {
  if (!referrer) return null;
  try {
    return new URL(referrer).hostname.toLowerCase();
  } catch {
    return null;
  }
}

function classifyReferrer(
  referrer: string | null,
  currentHostname: string
): "direct" | "search" | "social" | "external" | "internal" {
  const domain = getReferrerDomain(referrer);
  if (!domain) return "direct";
  if (domain === currentHostname || domain.endsWith(`.${currentHostname}`)) {
    return "internal";
  }
  if (SEARCH_ENGINES.some((entry) => domain.includes(entry))) {
    return "search";
  }
  if (SOCIAL_SOURCES.some((entry) => domain.includes(entry))) {
    return "social";
  }
  return "external";
}
