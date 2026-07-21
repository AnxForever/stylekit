# 002 — Fix ease-in on the page view transition

- **Status**: DONE
- **Commit**: fa3ce1c1
- **Severity**: HIGH
- **Category**: Easing & duration
- **Estimated scope**: 1 file, 1 line

## Problem

Every client-side page navigation crossfades via the View Transitions API, and the incoming page animates with `ease-in` — it starts slow at exactly the moment the user is watching for the new page. `ease-in` on an entrance is always wrong; entrances must start fast (`ease-out`).

```css
/* app/globals.css:386-388 — current */
::view-transition-new(root) {
  animation: fade-in 150ms ease-in;
}
```

(The outgoing side at `app/globals.css:382-384` uses `fade-out 150ms ease-out`, which for an exit fade is acceptable — leave it.)

## Target

```css
/* target */
::view-transition-new(root) {
  animation: fade-in 150ms ease-out;
}
```

## Repo conventions to follow

- Plain keyframe + easing declarations directly in `app/globals.css`; no token needed for this one-liner.

## Steps

1. `app/globals.css:387`: change `ease-in` to `ease-out` in the `::view-transition-new(root)` rule.

## Boundaries

- Do NOT change durations, the `fade-in`/`fade-out` keyframes, or `::view-transition-old(root)`.
- If the rule is not found near line 387, search for `::view-transition-new`; if absent, STOP and report.

## Verification

- **Mechanical**: `pnpm lint` passes.
- **Feel check**: `pnpm dev`, navigate between `/en` and `/en/styles` in Chrome: the incoming page's fade should feel like it appears promptly rather than lagging then rushing. At 150ms the difference is subtle — in DevTools Animations panel set playback to 10% and confirm the new page's opacity rises steeply at the start of the curve.
- **Done when**: the edited rule reads `fade-in 150ms ease-out` and navigation still crossfades.
