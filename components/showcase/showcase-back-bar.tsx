"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import {
  isSemanticBackLabel,
  navigateBackOrFallback,
} from "@/lib/navigation/smart-back";

// Per-style showcases are encouraged to ship their own design-matched back
// navigation (see 11ee3786). This bar is the safety net for the ones that
// don't: it mounts globally, matches showcase paths, scans the DOM for an
// existing semantic back anchor, and only appears when none is found - so a
// visitor landing from a new tab or a search result is never stranded.

const DETECTION_WINDOW_MS = 3000;
const FIRST_CHECK_DELAY_MS = 600;

function pageHasOwnBackNav(): boolean {
  const anchors = document.querySelectorAll<HTMLAnchorElement>("a[href]");
  for (const anchor of anchors) {
    if (anchor.dataset.backNavigation === "true") return true;
    const label =
      anchor.getAttribute("aria-label") ||
      anchor.getAttribute("title") ||
      anchor.textContent ||
      "";
    if (isSemanticBackLabel(label)) return true;
  }
  return false;
}

export function ShowcaseBackBar() {
  const pathname = usePathname();
  const match = pathname.match(/^\/(?:en\/|zh\/)?styles\/([^/]+)\/showcase\/?$/);
  const slug = match?.[1] ?? null;
  if (!slug) return null;
  // Keyed by slug so state resets declaratively when navigating between showcases.
  return <ShowcaseBackBarInner key={slug} slug={slug} />;
}

function ShowcaseBackBarInner({ slug }: { slug: string }) {
  const router = useRouter();
  const { locale } = useI18n();
  const [visible, setVisible] = useState(false);
  const [scrolledAway, setScrolledAway] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    let done = false;
    const observer = new MutationObserver(() => {
      if (pageHasOwnBackNav()) dismiss();
    });
    const dismiss = () => {
      done = true;
      setVisible(false);
      observer.disconnect();
      clearTimeout(firstCheck);
      clearTimeout(stopObserving);
    };

    // Showcase content is dynamically imported, so give it a beat before the
    // first check, then keep watching briefly in case a late chunk brings its
    // own back link.
    const firstCheck = setTimeout(() => {
      if (done) return;
      if (pageHasOwnBackNav()) {
        dismiss();
      } else {
        setVisible(true);
        observer.observe(document.body, { childList: true, subtree: true });
      }
    }, FIRST_CHECK_DELAY_MS);
    const stopObserving = setTimeout(() => observer.disconnect(), DETECTION_WINDOW_MS);

    return () => {
      observer.disconnect();
      clearTimeout(firstCheck);
      clearTimeout(stopObserving);
    };
  }, [slug]);

  // Recede while the visitor scrolls down into the demo; return on scroll-up.
  useEffect(() => {
    if (!visible) return;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolledAway(y > 96 && y > lastScrollY.current);
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [visible]);

  if (!visible) return null;

  const styleTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
  const label = locale === "zh" ? `返回 ${styleTitle}` : `Back to ${styleTitle}`;

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-[9999] pointer-events-none transition-all duration-300 ${
        scrolledAway ? "-translate-y-16 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4">
        <button
          onClick={() => navigateBackOrFallback(router, { fallbackHref: `/styles/${slug}` })}
          aria-label={label}
          className="pointer-events-auto inline-flex items-center gap-2 px-4 py-2 text-sm bg-black/60 text-white backdrop-blur-md rounded-full hover:bg-black/80 transition-colors shadow-lg"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span className="hidden sm:inline">{label}</span>
          <span className="sm:hidden">{locale === "zh" ? "返回" : "Back"}</span>
        </button>
      </div>
    </div>
  );
}
