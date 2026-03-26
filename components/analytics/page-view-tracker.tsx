"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView } from "@/lib/analytics/events";

const SEARCH_ENGINES = ["google.", "bing.com", "duckduckgo.com", "baidu.com", "yahoo.", "yandex."];
const SOCIAL_SOURCES = ["x.com", "twitter.com", "t.co", "linkedin.com", "facebook.com", "reddit.com", "youtube.com", "github.com"];

export function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastTrackedRef = useRef<string>("");

  useEffect(() => {
    if (!pathname || typeof window === "undefined") return;

    const query = searchParams?.toString();
    const key = query ? `${pathname}?${query}` : pathname;
    if (lastTrackedRef.current === key) return;
    lastTrackedRef.current = key;

    const referrer = document.referrer || null;
    const hostname = window.location.hostname;

    trackPageView({
      path: pathname,
      hostname,
      referrer,
      referrerDomain: getReferrerDomain(referrer),
      referrerType: classifyReferrer(referrer, hostname),
    });
  }, [pathname, searchParams]);

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
