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
2. **The cover is an interface, not a mood board.** StyleKit exists so people can
   build pages, so a cover must read as a plausible screenshot of a real screen
   in that style: navigation, headings, controls, content. Ornament, texture and
   atmosphere belong *inside* that screen -- as its background, its header band,
   its thumbnails -- never instead of it. A beautiful abstract composition tells
   a visitor nothing about what their page will look like.

## Page archetypes

Pick the screen this style is most often used to build. Two styles sharing an
archetype still look nothing alike, because the visual language differs; two
styles sharing a *composition* is what made the old grid monotonous.

| Archetype | The screen | Fits |
| --- | --- | --- |
| Landing hero | Nav, headline, sub, CTA, supporting visual | Marketing-first and expressive styles |
| Card grid | Listing of products, posts or looks with prices/captions | Commerce, lookbook, blog index styles |
| Dashboard | Metrics, chart, table rows, status | Data, developer, enterprise styles |
| Article | Headline, byline, columns, pull quote, rules | Editorial, academic, typographic styles |
| App shell | Sidebar, toolbar, content pane | Tool and productivity styles |
| Form panel | Inputs, toggles, chips, submit | Styles defined by control shape and restraint |
| Gallery | Image tiles with captions and gallery chrome | Photo, art and portfolio styles |
| Document | Raw or minimally styled page structure | Anti-design and brutalist styles |

Worked examples:

- `github-style` -- dashboard: repo breadcrumb, file rows, contribution grid.
- `korean-minimal` -- form panel: soft controls beside a hanji margin band.
- `brutalist-web` -- document: a directory index with default link colours.
- `cyber-anime` -- dashboard: targeting bracket beside a holo status panel.

A texture, ornament or scene may only appear as part of the screen. The riso
halftone is the background of a zine landing page; the outrun sunset is the hero
image behind a nav and a CTA; the art nouveau vine frames a boutique header. If
removing the UI leaves the cover intact, the cover is wrong.

## Constraints

- Palette comes from the style's own definition in `lib/styles/`. No invented
  colours; the cover and the style must agree.
- The frame is `aspect-[16/9]` in the catalog and `aspect-[4/3]` compact. Compose
  for the frame edges instead of centring a small box in dead space.
- Tailwind classes only, plus inline `style` for computed colours. No images, no
  network requests, no animation in covers.
- The catalog card floats its kit and favourite buttons over the top-right corner
  of the cover. Keep roughly the top-right 70x30px free of nav items or content
  that must stay readable.
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
