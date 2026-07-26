"use client";

import { usePathname } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { LocalizedLink } from "@/components/i18n/localized-link";
import { getShowcaseNeighbors } from "@/lib/styles/showcase-sequence";

/**
 * Floating prev/next gallery navigation for showcase pages.
 *
 * Mounted globally via app/styles/layout.tsx (the same mechanism the former
 * ShowcaseBackBar used) and self-hides on non-showcase routes. Right-aligned
 * counterpart to the per-style back links, letting visitors flip through the
 * whole catalog without returning to the list. Order and wrap-around come
 * from lib/styles/showcase-sequence.ts, which stays deliberately tiny so the
 * full style meta registry never enters this client bundle.
 *
 * Labels intentionally avoid leading "Back"/arrow glyphs and the anchors set
 * data-back-navigation="false" so the smart-back click interceptor in
 * lib/navigation/smart-back.ts never hijacks them. No global keyboard
 * bindings: several showcases (e.g. gallery-dark) use arrow keys for their
 * own lightboxes.
 */
export function ShowcaseGalleryNav() {
  const pathname = usePathname();

  const match = pathname.match(/^\/(?:en\/|zh\/)?styles\/([^/]+)\/showcase\/?$/);
  if (!match) return null;

  const neighbors = getShowcaseNeighbors(match[1]);
  if (!neighbors) return null;

  const [prevSlug, prevName] = neighbors.prev;
  const [nextSlug, nextName] = neighbors.next;

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-4 flex justify-end">
        <nav
          aria-label="Showcase gallery navigation"
          className="pointer-events-auto flex items-stretch bg-black/60 text-white backdrop-blur-md rounded-full shadow-lg divide-x divide-white/20 overflow-hidden"
        >
          <LocalizedLink
            href={`/styles/${prevSlug}/showcase`}
            prefetch={false}
            aria-label={`Previous style: ${prevName}`}
            data-back-navigation="false"
            className="flex items-center gap-1.5 pl-3.5 pr-3 py-2 text-sm hover:bg-black/80 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="hidden sm:inline max-w-[8.5rem] truncate">
              {prevName}
            </span>
          </LocalizedLink>
          <LocalizedLink
            href={`/styles/${nextSlug}/showcase`}
            prefetch={false}
            aria-label={`Next style: ${nextName}`}
            data-back-navigation="false"
            className="flex items-center gap-1.5 pl-3 pr-3.5 py-2 text-sm hover:bg-black/80 transition-colors"
          >
            <span className="hidden sm:inline max-w-[8.5rem] truncate">
              {nextName}
            </span>
            <ChevronRight className="w-4 h-4 shrink-0" aria-hidden="true" />
          </LocalizedLink>
        </nav>
      </div>
    </div>
  );
}
