# Loading Skeletons for High-Traffic Routes

**Date:** 2026-04-18
**Status:** Approved (pending implementation plan)
**Scope:** A1 subtask of "Structural Reduction" optimization track

## Problem

StyleKit has 200+ routes but only 10 `loading.tsx` files. On client-side
navigation, users see a blank frame until the next route mounts. Perceived
performance suffers the most on:

- 130 style showcase pages (`/styles/{slug}/showcase`)
- 37 template pages (`/templates/{slug}`)
- Content routes: blog, changelog, compare, analyze, prompts

The site is mostly `force-static`, so the bottleneck is **JS bundle transfer
during client navigation**, not server data fetching. Streaming / Suspense
boundaries are not the right tool.

## Goals

- Cover ~80% of route impressions with route-level loading skeletons.
- Single shared skeleton component with small visual variants — no per-page
  bespoke skeletons.
- Zero layout shift (CLS budget unchanged).
- Keep the change minimal and reversible.

## Non-Goals

- Rewriting existing `loading.tsx` files in `app/`, `app/community/`,
  `app/profile/`, `app/animations/`, `app/components/`, `app/styles/`,
  `app/styles/[slug]/` — leave those alone.
- Per-style custom skeletons (rejected as low ROI).
- Changing the `[locale]/*` dual-routing — handled in A2.
- Adding `<Suspense>` boundaries inside pages — current pages are not
  data-bound, so no benefit.

## Design

### 1. Shared component

`components/skeletons/page-skeleton.tsx`

```tsx
type SkeletonVariant = "showcase" | "template" | "article" | "dashboard" | "form";

export function PageSkeleton({ variant }: { variant: SkeletonVariant }) { ... }
```

The component:

- Keeps app chrome (header/footer) visually stable during navigation.
  Implementation decides whether to render `<Header />`/`<Footer />` inside
  the skeleton or rely on a parent layout — verify current layout structure
  of each target route before choosing.
- Main area uses a `variant`-specific placeholder grid of `animate-pulse` blocks.
- Uses existing design tokens (muted / border colors) — no new Tailwind classes.
- Pure presentational, no client-side JS beyond the CSS animation.

### 2. Variant mapping

| variant | Used for | Visual hint |
|---|---|---|
| `showcase` | `app/styles/[slug]/showcase/loading.tsx` | Hero band + 3-column card grid |
| `template` | `app/templates/[slug]/loading.tsx` | Preview frame + spec sidebar |
| `article` | `app/blog/loading.tsx`, `app/blog/[slug]/loading.tsx`, `app/changelog/loading.tsx` | Prose column + TOC |
| `dashboard` | `app/analyze/loading.tsx`, `app/compare/loading.tsx` | Multi-panel grid |
| `form` | `app/prompts/loading.tsx` | Title + tabs + textarea + action row |

### 3. Route-level `loading.tsx` files to add

Each file is 2-3 lines:

```tsx
import { PageSkeleton } from "@/components/skeletons/page-skeleton";
export default function Loading() { return <PageSkeleton variant="showcase" />; }
```

Files to create (8 total):

1. `app/styles/[slug]/showcase/loading.tsx` — `showcase`
2. `app/templates/[slug]/loading.tsx` — `template`
3. `app/blog/loading.tsx` — `article`
4. `app/blog/[slug]/loading.tsx` — `article`
5. `app/changelog/loading.tsx` — `article`
6. `app/compare/loading.tsx` — `dashboard`
7. `app/analyze/loading.tsx` — `dashboard`
8. `app/prompts/loading.tsx` — `form`

### 4. File layout

```
components/skeletons/
  page-skeleton.tsx        (new)
  page-skeleton.test.tsx   (new, snapshot test per variant)
```

## Error handling

Skeletons are pure presentational. No error paths. Existing `app/error.tsx`
still catches render errors after the skeleton yields to the real page.

## Testing

- **Unit:** `page-skeleton.test.tsx` — render each variant, assert no `undefined`
  in output, assert header/footer present.
- **Manual:** after implementation, click-navigate from homepage → a style
  showcase, a template, a blog post. Confirm skeleton flashes for >0ms on slow
  3G throttle.
- **Regression:** existing test suite (`pnpm test`) must stay green.

## Verification before merge

```
pnpm lint
pnpm exec tsc --noEmit
pnpm test
pnpm build
```

## Rollback

Delete the 10 new files (8 loading.tsx + 1 component + 1 test). No other code
is touched. Safe to revert in one commit.

## Open questions

None. Darling already approved:

- Variant count: 5 (not 2-3, not per-page)
- Scope: 7 route groups covering ~80% of routes (not extended to admin/docs)
- Order: A1 first, A2 routing next, A3 translations last
