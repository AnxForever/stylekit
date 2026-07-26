# Style Library Quality Audit

Date: 2026-07-26
Method: 27-agent workflow (14 batched auditors + 13 adversarial verifiers). Every claim below was
re-verified against the actual files by an independent skeptic agent; 3 claims were refuted and
dropped. Coverage: 140/140 registered styles.

## Headline

- Structural layer: **zero missing artifacts.** All 140 styles have the full 7-file footprint
  (definition, tokens, recipes, preview module, showcase page + content, cover SVG). 0 high-severity issues.
- Content layer: **44 confirmed issues** (42 medium, 2 low), concentrated in EN keyword coverage
  and aiRules density.

## P0 — keywordsEn missing in 133/140 styles (SEO/GEO impact)

`keywordsEn` is NOT a dormant optional field. It is consumed with a `keywordsEn ?? keywords`
fallback in:

- `app/styles/[slug]/page.tsx:66,145` — SEO `keywords` metadata for style detail pages
- `app/styles/[slug]/showcase/_metadata.ts:65` — showcase page metadata
- `lib/export/llms-full.ts:68` — llms.txt full export (GEO surface)
- `lib/discovery.ts:161` — discovery/search
- `PromptPairExporter` / `AIImplementationPanel` — EN prompt exports

Consequence: on `/en/styles/{slug}` pages, 133 styles currently emit **Chinese keywords** into
English SEO metadata and the llms.txt export. Only 7 styles carry `keywordsEn`.

Fix: backfill `keywordsEn` (5-8 EN search terms per style) across 133 definitions. Mechanical,
batchable, high SEO leverage for the US-market CTR problem (GSC: 4476 impressions, CTR 1.81%).

## P1 — Hard gaps (small count, user-visible)

### aiRulesEn missing (4 styles)

`data-dense`, `fresh-market`, `luxury-retail`, `warm-organic` — EN visitors of these styles get
Chinese aiRules in the copy-for-AI flow.

### Showcase far below project bar (3 styles)

Bar (docs/STYLE_ADDITION_CHECKLIST.md): 400-600+ lines, 12+ sections, 2+ useState.
Library median across 141 showcases: ~1435 lines. Only 4 files are under 400 lines.

| Style | Lines | Sections | useState | Note |
|---|---|---|---|---|
| `warm-organic` | 137 | 4 | 0 | Shortest showcase in the library; fully static |
| `studio-bold` | 149 | 5 | 0 | 2nd shortest; fully static |
| `gallery-dark` | 270 | 5 | 3 | Below bar, has some interactivity |

### examplePrompts missing (1 style)

`warm-organic` — the only style definition without `examplePrompts` (~140 siblings have it).

## P2 — aiRules density gaps (36 styles, verified)

Norm check by verifiers: median aiRules length is 50 lines; 121/142 style files embed concrete hex
codes in aiRules. The styles below fall short of "an AI can faithfully reproduce the style from
aiRules alone" (the bar this library sells on).

### Visual styles with hex palette but ZERO typography guidance (17)

No font family, weight, or type-scale rules inside aiRules (some name the font only in doList,
which aiRules consumers do not always receive):

`cinematic-video-hero`, `fluent-design` (Segoe UI only in doList), `glassmorphism`, `holographic`,
`immersive-photo`, `material-design` (Roboto only in doList), `neo-brutalist-playful`,
`neon-gradient`, `neumorphism`, `notion-style`, `paper-craft`, `pastel-goth`, `pixel-art`
(doList names pixel/mono fonts, aiRules omits them), `solarpunk`, `stripe-style`,
`synthwave` (prohibition-only: "no formal fonts"), `tropical-paradise` (prohibition-only: "no serif").

### Layout-family aiRules are layout-only (14)

Zero hex codes AND zero typography guidance; content covers grid/scroll/stacking mechanics only.
Verifier caveat: this is a family-wide convention (colors live in tokens files), so severity is
arguable — but for standalone aiRules consumers (registry JSON, MCP, copy-paste) the visual style
is not reproducible:

`asymmetric-grid` (also contains literal `shadow-[8px_8px_0px_color]` placeholder — `color` is not
a valid Tailwind value), `bento-grid`, `card-stack`, `dashboard-layout`, `full-page-scroll`,
`hero-fullscreen`, `holy-grail-layout`, `magazine-grid`, `masonry-flow`, `parallax-sections`
(has font guidance, 0 hex), `sidebar-fixed`, `split-screen`, `timeline-vertical`, `z-pattern-layout`.

### Palette only as Tailwind class names, no literal hex (4)

Reproducible for Tailwind targets, lossy for others: `claymorphism` (also 0 typography),
`corporate-clean`, `data-dense` (also short: 21 lines), `geometric-bold`.

### Below the 15-line bar (1)

`cel-shading` — 14 lines (dense and actionable, but no font family named).

## P2 — Cover SVGs without UI components (2)

Checklist requires covers to depict miniaturized UI components, not just the style name:

- `pixel-art.svg` — framed 4-square palette-swatch poster + title text only
- `pop-art.svg` — text-dominated poster (POP ART headline over starburst/halftone)

## Docs drift

`docs/STYLE_ADDITION_CHECKLIST.md` Pre-Flight lists categories
`modern | classic | expressive | cultural | functional`, but `lib/styles/types.ts` defines
`"modern" | "retro" | "minimal" | "expressive"`. The checklist also states the 400-600-line /
12-section / 2-useState showcase bar used in this audit.

## Suggested fix order

1. **keywordsEn backfill (133)** — mechanical, direct SEO/GEO payoff, batchable by an agent fleet.
2. **aiRulesEn x4 + warm-organic examplePrompts** — small, closes EN hard gaps.
3. **Showcase rebuilds x3** (`warm-organic`, `studio-bold`, `gallery-dark`) — same playbook as the
   2026-07 template overhaul.
4. **aiRules typography/palette enrichment (36)** — the deep-quality pass; do visual styles first
   (17 typography gaps), decide policy for the layout family (inline hex vs. explicit
   "pair-with-a-visual-style" note), fix the `asymmetric-grid` placeholder either way.
5. **Cover redraws x2** + checklist category enum correction.

## Verification data

- Run: workflow `stylekit-style-audit` (wf_e9bfcc41-3c3), 27 agents, 1.27M tokens, ~8 min,
  0 agent failures. 44 confirmed / 3 refuted / 0 unverified.
- Refuted-claim examples are preserved in the workflow journal
  (session `4421c195`, `subagents/workflows/wf_e9bfcc41-3c3/journal.jsonl`).
