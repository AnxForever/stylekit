"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getShowcaseNeighbors } from "@/lib/styles/showcase-sequence";

/**
 * Floating prev/next gallery navigation for showcase pages.
 *
 * Mounted via app/styles/layout.tsx AND app/[locale]/styles/layout.tsx and
 * self-hides on non-showcase routes. Rendered as two edge buttons vertically
 * centered on the viewport sides (standard gallery pager position) so it
 * never overlaps the per-showcase back links and headers at the top of each
 * page, nor ScrollToTop / the mobile bottom nav in the corners. Order and
 * wrap-around come from lib/styles/showcase-sequence.ts, which stays
 * deliberately tiny so the full style meta registry never enters this client
 * bundle.
 *
 * Labels intentionally avoid leading "Back"/arrow glyphs and the anchors set
 * data-back-navigation="false" so the smart-back click interceptor in
 * lib/navigation/smart-back.ts never hijacks them. No global keyboard
 * bindings: several showcases (e.g. gallery-dark) use arrow keys for their
 * own lightboxes. z-40 keeps showcase-internal overlays (lightboxes, modals)
 * able to layer above the pager.
 */
export function ShowcaseGalleryNav() {
  const pathname = usePathname();

  const match = pathname.match(/^\/(?:en\/|zh\/)?styles\/([^/]+)\/showcase\/?$/);
  if (!match) return null;

  const neighbors = getShowcaseNeighbors(match[1]);
  if (!neighbors) return null;

  const [prevSlug, prevName] = neighbors.prev;
  const [nextSlug, nextName] = neighbors.next;

  const buttonClass =
    "group pointer-events-auto flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/50 text-white/90 shadow-lg backdrop-blur-md transition-colors hover:bg-black/80 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70";
  const labelClass =
    "pointer-events-none absolute top-1/2 hidden max-w-[11rem] -translate-y-1/2 truncate whitespace-nowrap rounded-full bg-black/80 px-3 py-1.5 text-xs text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 group-hover:opacity-100 group-focus-visible:opacity-100 sm:block";

  return (
    <nav aria-label="Showcase gallery navigation">
      <div className="fixed left-2 sm:left-3 top-1/2 z-40 -translate-y-1/2">
        <LocalizedLink
          href={`/styles/${prevSlug}/showcase`}
          prefetch={false}
          aria-label={`Previous style: ${prevName}`}
          title={`Previous style: ${prevName}`}
          data-back-navigation="false"
          className={`${buttonClass} relative`}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          <span className={`${labelClass} left-full ml-2`}>{prevName}</span>
        </LocalizedLink>
      </div>
      <div className="fixed right-2 sm:right-3 top-1/2 z-40 -translate-y-1/2">
        <LocalizedLink
          href={`/styles/${nextSlug}/showcase`}
          prefetch={false}
          aria-label={`Next style: ${nextName}`}
          title={`Next style: ${nextName}`}
          data-back-navigation="false"
          className={`${buttonClass} relative`}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
          <span className={`${labelClass} right-full mr-2`}>{nextName}</span>
        </LocalizedLink>
      </div>
    </nav>
  );
}
