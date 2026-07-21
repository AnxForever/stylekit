# Animation Improvement Plans

Written by the `improve-animations` audit at commit `fa3ce1c1` (2026-07-21). Scope: homepage (`app/page.tsx`, `components/home/*`, homepage-related rules in `app/globals.css`).

| # | Plan | Severity | Status |
| --- | --- | --- | --- |
| 001 | [Crossfade the featured carousel slide swap](001-featured-carousel-crossfade.md) | HIGH | DONE |
| 002 | [Fix ease-in on the page view transition](002-view-transition-ease-out.md) | HIGH | DONE |
| 003 | [QuickExport dropdown entrance + arrow press feedback](003-dropdown-enter-press-feedback.md) | MEDIUM | DONE |

## Execution order

002 → 001 → 003. No dependencies between plans; 002 is a one-liner, do it first.

## Deferred findings (audited, not planned)

- Global `prefers-reduced-motion` block (`app/globals.css:577`) nukes ALL transitions to 0.01ms — reduced motion should keep opacity/color feedback. Low urgency because components also gate via `motion-safe:`; revisit if reduced-motion UX gets attention.
- Progress bars animate `width` (layout) instead of `transform: scaleX()` — `featured-carousel.tsx:177`, `trending-styles.tsx:201` (the latter also missing an easing). Tiny elements, negligible cost today.
- Easing/duration values are scattered (Tailwind default, `ease-out`, `cubic-bezier(0.22,1,0.36,1)`; durations 150/200/300/500) with no shared `--ease-*` tokens outside `--animate-*`. Consolidation candidate when motion work expands beyond the homepage.
- `--animate-home-support-float` token appears unused by any component — verify and delete in a cleanup pass.
