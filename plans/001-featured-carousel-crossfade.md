# 001 — Crossfade the featured carousel slide swap

- **Status**: DONE
- **Commit**: fa3ce1c1
- **Severity**: HIGH
- **Category**: Missed opportunities / Interruptibility
- **Estimated scope**: 2 files (`components/home/featured-carousel.tsx`, `app/globals.css`), ~20 lines

## Problem

The homepage hero carousel auto-advances every 5.6s and also responds to arrow buttons and ArrowLeft/ArrowRight keys. On every advance, the cover preview, the style name, and the counter all hard-cut to the new content — a teleport swap in the most-viewed area of the page, repeating every few seconds.

```tsx
/* components/home/featured-carousel.tsx:133-135 — current: swaps with no transition */
<div className="h-full overflow-hidden border border-border">
  <StyleCoverPreview styleSlug={featuredStyle.slug} />
</div>
```

```tsx
/* components/home/featured-carousel.tsx:148-150 — current: title also hard-cuts */
<p className="font-serif text-xl leading-none transition-colors group-hover:text-accent sm:text-2xl">
  {featuredStyle.name}
</p>
```

## Target

Each slide change plays a brief enter animation on the new content: fade + 8px rise for the cover, fade only for the title block. Values:

```css
/* app/globals.css — add next to the existing home-reveal keyframes (~line 480) */
@keyframes home-feature-swap {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes home-feature-swap-soft {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

```css
/* app/globals.css — add inside the existing `@theme inline` block (~line 501) */
--animate-home-feature-swap: home-feature-swap 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
--animate-home-feature-swap-soft: home-feature-swap-soft 240ms cubic-bezier(0.22, 1, 0.36, 1) both;
```

In the component, key the animated wrappers by `featuredStyle.slug` so React remounts them on each slide change, restarting the animation:

```tsx
/* target — cover wrapper */
<div key={featuredStyle.slug} className="h-full overflow-hidden border border-border motion-safe:animate-home-feature-swap">
  <StyleCoverPreview styleSlug={featuredStyle.slug} />
</div>
```

```tsx
/* target — title block: add key + soft swap class to the existing inner content wrapper.
   Wrap the two <p> lines (name + nameEn) in a keyed div INSIDE the LocalizedLink at line 142,
   so the link itself (focus ring, aria) is not remounted: */
<div key={featuredStyle.slug} className="motion-safe:animate-home-feature-swap-soft">
  <p className="font-serif text-xl leading-none transition-colors group-hover:text-accent sm:text-2xl">
    {featuredStyle.name}
  </p>
  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-muted truncate">{featuredStyle.nameEn}</p>
</div>
```

Rapid arrow presses restart the 320ms animation from the keyed remount — acceptable because each press shows genuinely new content; do NOT try to build a two-layer crossfade.

## Repo conventions to follow

- Keyframes + `@theme inline` `--animate-*` tokens in `app/globals.css` — exemplar: `--animate-home-reveal-up: home-reveal-up 520ms cubic-bezier(0.22, 1, 0.36, 1) both;` (`app/globals.css:503`).
- Motion is always gated with the `motion-safe:` Tailwind variant — exemplar: `components/home/reveal-on-scroll.tsx:7-10`.
- The house entrance curve is `cubic-bezier(0.22, 1, 0.36, 1)`; use it, do not invent another.

## Steps

1. `app/globals.css`: add the two `@keyframes` blocks after `home-reveal-soft` (~line 483) and the two `--animate-*` tokens inside `@theme inline` (~line 505).
2. `components/home/featured-carousel.tsx:133`: add `key={featuredStyle.slug}` and `motion-safe:animate-home-feature-swap` to the cover wrapper div.
3. `components/home/featured-carousel.tsx:148-151`: wrap the two `<p>` elements in a new `<div key={featuredStyle.slug} className="motion-safe:animate-home-feature-swap-soft">`, keeping both `<p>` elements and their classes unchanged.

## Boundaries

- Do NOT touch the autoplay/interval/reduced-motion logic (lines 36-88) — it is already correct.
- Do NOT remount the `LocalizedLink` elements or the region container (focus/aria state lives there).
- Do NOT add dependencies (no Framer Motion).
- If line numbers have drifted from commit fa3ce1c1, locate by the quoted code; if the code itself differs, STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` passes; `pnpm lint` passes.
- **Feel check**: run `pnpm dev`, open `/en`:
  - Let the carousel auto-advance: new cover fades up in ~320ms, no hard cut.
  - Spam ArrowRight 5x fast: each press shows the next slide immediately (animation restarts, never blocks input).
  - DevTools → Rendering → emulate `prefers-reduced-motion: reduce`: swap is instant again, content fully visible.
- **Done when**: all three feel checks pass in both light and dark mode.
