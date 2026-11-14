"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/analytics/events";
import { observeStyleEngagement, readStylePage } from "@/lib/analytics/style-engagement";

export function StylePageTracker() {
  const pathname = usePathname();
  useEffect(() => {
    // Detail-page live previews embed the full showcase document.
    if (window.self !== window.top) return;
    const page = pathname ? readStylePage(pathname) : null;
    if (!page) return;
    let stop: (() => void) | undefined;
    let arrived = false;
    const arrive = () => {
      if (arrived || document.visibilityState === "hidden") return;
      arrived = true;
      trackEvent(page.surface === "detail" ? "style_view" : "showcase_view", { slug: page.slug, source: "page" });
      // The existing observer pauses on pagehide and resumes on pageshow.
      // BFCache restores must not add another set of engagement listeners.
      stop ??= observeStyleEngagement(page.slug, page.surface);
    };
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted) return;
      arrived = false;
      arrive();
    };
    // Deferring one task avoids duplicate React strict-effect mounts while
    // still collecting immediately, without waiting for an idle callback.
    const timer = window.setTimeout(arrive, 0);
    document.addEventListener("visibilitychange", arrive);
    window.addEventListener("pageshow", onPageShow);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("visibilitychange", arrive);
      window.removeEventListener("pageshow", onPageShow);
      stop?.();
    };
  }, [pathname]);
  return null;
}
