import { trackEvent } from "@/lib/analytics/events";

export function readStylePage(pathname: string): { slug: string; surface: "detail" | "showcase" } | null {
  const match = pathname.match(/^(?:\/(?:zh|en))?\/styles\/([a-z0-9]+(?:-[a-z0-9]+)*)(\/showcase)?\/?$/);
  return match ? { slug: match[1], surface: match[2] ? "showcase" : "detail" } : null;
}

/** Foreground elapsed time, sent as non-overlapping deltas, never inferred human attention. */
export function observeStyleEngagement(slug: string, surface: "detail" | "showcase"): () => void {
  let startedAt: number | null = document.visibilityState === "hidden" ? null : performance.now();
  let maxScroll = 0;
  const updateScroll = () => {
    if (document.visibilityState === "hidden") return;
    const height = Math.max(document.documentElement.scrollHeight, window.innerHeight, 1);
    maxScroll = Math.max(maxScroll, Math.min(100, Math.round((window.scrollY + window.innerHeight) / height * 100)));
  };
  const flush = () => {
    if (startedAt === null) return;
    const now = performance.now();
    const duration = Math.min(1_800_000, Math.max(0, Math.floor(now - startedAt)));
    startedAt = now;
    if (duration > 0) {
      trackEvent("style_engagement", { slug, surface, active_ms: duration, max_scroll_percent: maxScroll });
    }
  };
  const pause = () => { flush(); startedAt = null; };
  const resume = () => {
    if (document.visibilityState !== "hidden" && startedAt === null) startedAt = performance.now();
    updateScroll();
  };
  const onVisibility = () => {
    if (document.visibilityState === "hidden") pause();
    else resume();
  };
  updateScroll();
  const timer = window.setInterval(flush, 30_000);
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("pagehide", pause);
  window.addEventListener("pageshow", resume);
  window.addEventListener("scroll", updateScroll, { passive: true });
  return () => {
    pause();
    window.clearInterval(timer);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pagehide", pause);
    window.removeEventListener("pageshow", resume);
    window.removeEventListener("scroll", updateScroll);
  };
}
