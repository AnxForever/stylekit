# Cover Preview Archetypes

`coverPreview` is what a visitor judges a style by in the catalog grid. It is the
only place in the product where 146 designs sit next to each other, so sameness
is expensive here in a way it is nowhere else.

## The problem this replaces

An audit on 2026-08-17 found 126 of 146 covers used one composition: a small
centered card holding the style's own name, a two-word tagline, and one button.
Thirty of them were byte-identical apart from hex values -- Gothic and Outrun
differed only in colour. Nine consecutive cards in a single viewport shared the
skeleton, so the grid read as a palette swatch sheet instead of a style library.

## Two rules

1. **The cover never prints the style's own name.** The card title sits directly
   below it, so the name inside the mock is redundant, and it crowds out the one
   thing the cover is for: showing what the style does.
2. **The cover shows the style's substance, not a generic UI.** Whatever a
   designer would recognise the style by -- its grid, its letterforms, its
   texture, its density -- is what belongs in the frame.

## Archetypes

Pick the one that carries the style's identity. The list is a vocabulary, not a
quota; a style that needs a composition outside it should have one.

| Archetype | Shows | Fits |
| --- | --- | --- |
| Layout skeleton | Columns, rails, rhythm of the grid itself | Layout styles, poster and editorial grids |
| Type specimen | Letterforms at size, hierarchy, scale steps | Styles whose identity is typographic |
| Component cluster | Real controls: input, toggle, chip, card | Styles defined by radius, shadow, restraint |
| Texture field | Full-bleed pattern, halftone, grain, weave | Print, craft, cultural, material styles |
| Data density | Rows, metrics, sparklines, heatmaps | Dashboards, developer tooling, data UI |
| Atmosphere scene | Horizon, light, depth, silhouette | Cinematic, retro-future, immersive styles |
| Product card | A single marketing card, done properly | Only where the style *is* product marketing |

Worked examples from the first batch:

- `gothic` -- type specimen: oversized blackletter, gold rule, rose window.
- `outrun` -- atmosphere scene: banded sun, glowing horizon, vanishing grid.
- `korean-minimal` -- component cluster: soft controls beside a hanji margin band.
- `risograph` -- texture field: one coarse halftone screen, spot overprint,
  registration mark.
- `github-style` -- data density: repo breadcrumb, file rows, contribution grid.
- `swiss-poster` -- layout skeleton: visible column grid under an oversized numeral.

## Constraints

- Palette comes from the style's own definition in `lib/styles/`. No invented
  colours; the cover and the style must agree.
- The frame is `aspect-[16/9]` in the catalog and `aspect-[4/3]` compact. Compose
  for the frame edges instead of centring a small box in dead space.
- Tailwind classes only, plus inline `style` for computed colours. No images, no
  network requests, no animation in covers.
- Clip decorative geometry (`overflow-hidden`) so rotated or oversized elements
  cannot bleed into neighbouring regions and read as a rendering bug.
- Avoid the house AI-slop tells: radial glow behind a centered card, a grid of
  identical rounded cards, a coloured eyebrow label above a heading.

## Changing an approved cover

Covers are frozen product assets. `docs/PREVIEW_VISUAL_BASELINE.md` governs any
change: owner approval of the concrete visual difference first, before/after
screenshots per slug and viewport, a written reason with the slug list, and only
then a dedicated commit that re-records snapshots and source hashes. Do not run
Playwright snapshot-update flags before that approval exists.
