/**
 * Sample DESIGN.md payload used by the "Load template" button on the
 * submission form. Based on the Neo Brutalist example in
 * docs/design-md/template.md — kept here as a literal so the form can
 * inject it without a network round-trip.
 *
 * Picked Neo Brutalist (vs. the empty skeleton) because it triggers
 * "excellent" quality and produces a rich preview, so first-time users
 * see the full feature surface immediately.
 */
export const DESIGN_MD_TEMPLATE_SAMPLE = `---
name: "Neo Brutalist"
slug: "neo-brutalist"
category: "expressive"
style_type: "visual"
inspired_by: "https://gumroad.com, https://figma.com (early)"
tags: ["high-contrast", "expressive", "retro", "brand-inspired"]
version: "1.0"
author: "@AnxForever"
license: "CC-BY-4.0"
---

# Design System: Neo Brutalist

## 1. Overview

Aggressive honesty — raw blocks, thick black outlines, shocking color slabs.
Every element shouts its weight and purpose.

## 2. Visual Theme & Atmosphere

Dense, loud, unapologetic. Takes the austerity of 1970s Brutalist architecture
and injects 1990s zine culture into it. No gradients, no subtle shadows — only
hard edges, heavy strokes, and color blocks that fight for attention. Feels like
a physical object printed on risograph paper.

## 3. Color Palette & Roles

**Primary**
- Pure Tar Black (#000000) — All strokes, body text, borders (2-4px)
- Paper White (#FFFFFF) — Default canvas, card fills
- Shock Yellow (#FFE500) — Primary CTA fills, highlight slabs

**Accent (loud but disciplined)**
- Hot Cherry (#FF4444) — Secondary emphasis, warnings
- Electric Cyan (#00E5FF) — Playful accents, hover states
- Acid Lime (#C6FF00) — Success states, "new" badges

**Semantic**
- Success Lime (#C6FF00) — Positive confirmations
- Danger Cherry (#FF4444) — Destructive actions
- Warning Amber (#FFB800) — Caution, not error

## 4. Typography Rules

- **Font Family**: Space Grotesk (display), Inter (body), JetBrains Mono (code)
- **Weight Strategy**: 700-900 for headings (shout them), 400-500 for body,
  700 for emphasis within body. No italics — replace with bold or underline.
- **Letter-spacing Character**: Slightly negative on huge display (-0.03em),
  neutral on body, widely tracked on all-caps micro labels (+0.12em).
- **Type Scale**: 16px base, 1.333 ratio. Displays go up to 96px without apology.
- **Character**: Hand-set poster typography. Loud but structured.

## 5. Component Stylings

### Buttons
- **Shape**: Sharp squared-off corners (0-4px radius max)
- **Color Assignment**: Primary is Shock Yellow fill with Tar Black text and
  4px Tar Black outline. Secondary is Paper White with same outline.
- **Behavior**: Hover translates the button 4px up and 4px left, revealing a
  hard Tar Black shadow offset behind it. No opacity transitions, no easing curves.

### Cards / Containers
- **Corner Roundness**: Zero radius. Everything is rectangular.
- **Background**: Paper White on the canvas, tinted slabs for emphasis
- **Shadow Depth**: Hard offset shadows only — \`8px 8px 0 #000000\`. Never blurred.
- **Border**: Always 3-4px Tar Black. Non-negotiable.

### Inputs / Forms
- **Stroke Style**: 3px Tar Black border, no rounded corners
- **Background**: Paper White; focus turns background to Shock Yellow
- **Focus State**: No ring — the yellow fill IS the focus state

## 6. Layout Principles

- **Whitespace Strategy**: Asymmetric — big blocks butting against tiny gaps.
  Embrace uncomfortable space like a printed magazine.
- **Grid**: 12-column, max-width 1400px, gutter 32px. Occasional rule-breaking
  overhang for drama.
- **Alignment**: Left-dominant. Center alignment is banned except for hero display.
- **Rhythm**: Blocks, not flows. Each section is a clear rectangle.

## 7. Spacing Scale

- **Base Unit**: 8px
- **Scale**: 4, 8, 16, 24, 32, 48, 64, 96, 128, 192
- **Usage Rules**: 16px for inline gaps within a component, 48-64px between
  top-level sections. Never use values outside this scale.

## 8. Elevation & Depth

- **Level 0 (flat)**: No shadow. Default state for all surfaces.
- **Level 1 (lifted)**: \`4px 4px 0 #000000\`. Buttons, small cards on hover.
- **Level 2 (declared)**: \`8px 8px 0 #000000\`. Static cards, feature callouts.
- **Level 3 (dominant)**: \`12px 12px 0 #000000\`. Hero blocks, modal shells.

Never use blurred shadows. Always hard, always offset, always Tar Black.

## 9. Do's & Don'ts

### Do
- Use 3-4px Tar Black outlines on every containable surface.
- Layer color slabs to create visual hierarchy without gradients.
- Offset hard shadows by full pixel values (never fractional).
- Let type be oversized — 96px headlines are normal.
- Embrace imperfection: slight stroke variation, off-grid accents.

### Don't
- Never use gradients, blur filters, or translucency.
- Never use rounded corners above 4px radius.
- Never use more than 2 accent colors per page.
- Never center-align body text paragraphs.
- Never apply opacity to text or strokes (use a different color token instead).

## 10. AI Rules

- All containers must have a 3-4px solid Tar Black border.
- Primary CTA must be Shock Yellow with Tar Black text and hard offset shadow.
- Body text is Inter 400-500 at 16-18px; headings are Space Grotesk 700-900.
- Default button hover: translate -4px -4px and reveal matching offset shadow.
- No \`backdrop-filter\`, no \`box-shadow\` with blur > 0, no \`border-radius\` > 4px.
- Use \`tabular-nums\` on all numeric data.
- Focus states: background color change to Shock Yellow, not an outline ring.
- Never generate emoji. Replace with geometric shapes (squares, arrows, dots).

## 11. Responsive Breakpoints

- **Mobile** (\`< 640px\`): Single column. Reduce 96px displays to 48px.
  Shadows shrink from 8px offset to 4px offset.
- **Tablet** (\`640px – 1024px\`): 2-column where natural. Full type scale.
- **Desktop** (\`1024px – 1440px\`): 12-column grid, full scale, full shadow depth.
- **Wide** (\`> 1440px\`): Constrain content to 1400px max-width, center canvas.
  Allow occasional block to overhang grid for drama.
`;
