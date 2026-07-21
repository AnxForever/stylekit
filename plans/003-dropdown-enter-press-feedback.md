# 003 — Animate the QuickExport dropdown entrance and add press feedback to carousel arrows

- **Status**: DONE
- **Commit**: fa3ce1c1
- **Severity**: MEDIUM
- **Category**: Physicality & origin / Missed opportunities
- **Estimated scope**: 3 files, ~15 lines

## Problem

1. The QuickExport style dropdown pops into existence with no motion — a panel spatially anchored to its trigger appears from nowhere:

```tsx
/* components/home/quick-export.tsx:163-165 — current */
{isDropdownOpen && (
  <div className="absolute z-20 top-full left-0 right-0 mt-1 border border-border bg-background shadow-lg max-h-64 overflow-y-auto">
```

2. The featured-carousel prev/next buttons (clicked repeatedly) give only a color change on press — no physical feedback:

```tsx
/* components/home/featured-carousel.tsx:157 (and same class on :165) — current */
className="w-9 h-9 flex items-center justify-center border border-border hover:border-foreground hover:bg-foreground/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-1 focus-visible:ring-offset-background transition-colors"
```

## Target

1. Dropdown enters with fade + `scale(0.97)` from the top edge (its trigger side), 160ms, house entrance curve. Never `scale(0)`.

```css
/* app/globals.css — add next to home-reveal keyframes (~line 483) */
@keyframes dropdown-enter {
  from { opacity: 0; transform: scale(0.97) translateY(-4px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
```

```css
/* app/globals.css — add inside `@theme inline` (~line 505) */
--animate-dropdown-enter: dropdown-enter 160ms cubic-bezier(0.22, 1, 0.36, 1) both;
```

```tsx
/* target — quick-export.tsx dropdown panel: add origin-top + motion-safe entrance */
<div className="absolute z-20 top-full left-0 right-0 mt-1 origin-top border border-border bg-background shadow-lg max-h-64 overflow-y-auto motion-safe:animate-dropdown-enter">
```

No exit animation — closing a dropdown should be instant (the user has moved on).

2. Arrow buttons get subtle press scale, on both buttons (lines 157 and 165), by appending to the existing className string:

```
motion-safe:transition-[transform,border-color,background-color] motion-safe:duration-150 motion-safe:active:scale-[0.96]
```

and removing the now-redundant `transition-colors` from those two buttons only.

## Repo conventions to follow

- Keyframes + `--animate-*` tokens in `app/globals.css` `@theme inline` — exemplar `app/globals.css:503`.
- `motion-safe:` gating on all movement — exemplar `components/home/home-style-card.tsx:15`.
- House entrance curve `cubic-bezier(0.22, 1, 0.36, 1)`.

## Steps

1. `app/globals.css`: add `dropdown-enter` keyframes and the `--animate-dropdown-enter` token as shown.
2. `components/home/quick-export.tsx:164`: add `origin-top motion-safe:animate-dropdown-enter` to the dropdown panel div's className.
3. `components/home/featured-carousel.tsx:157` and `:165`: replace `transition-colors` with `motion-safe:transition-[transform,border-color,background-color] motion-safe:duration-150 motion-safe:active:scale-[0.96]` in both button classNames.

## Boundaries

- Do NOT animate the dropdown's close.
- Do NOT touch the dropdown's open/close state logic or item list.
- Do NOT add press feedback to other buttons in this pass.
- If quoted code is not found (drift from fa3ce1c1), STOP and report.

## Verification

- **Mechanical**: `npx tsc --noEmit` and `pnpm lint` pass.
- **Feel check**: `pnpm dev`, open `/en`, scroll to Quick Export:
  - Open the style dropdown: it grows from the trigger edge (top), not from center, in ~160ms; closing is instant.
  - Reopen rapidly: animation restarts cleanly, list is immediately scrollable/clickable.
  - Hold mouse down on a carousel arrow: button visibly compresses to 96%; release snaps back.
  - Emulate `prefers-reduced-motion: reduce`: dropdown appears instantly, arrows no longer scale.
- **Done when**: all feel checks pass.
