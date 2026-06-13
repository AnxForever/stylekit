# DESIGN.md Template

> 可直接复制填写的 DESIGN.md 骨架，StyleKit 推荐完整版（11 章节）。
> 最小必选：章节 1-5。章节 6-11 可选但强烈推荐。
> 核心铁律：**语义命名 + 自然语言描述 mood + hex 精确值括注 + 功能角色**。

---

## 使用步骤

1. 复制本文件到你的项目根目录，命名为 `DESIGN.md`（注意大写）
2. 填写 YAML frontmatter（用于本地归档或后续人工审核，官方版本可不填）
3. 按章节顺序填写，保持标题层级（`##` 一级大章节）
4. 先在本地保存并人工校验；公开提交流程暂不作为主入口

## 骨架（空白可填）

```markdown
---
name: "Your Style Name"
slug: "your-style-slug"
category: "modern"         # modern | retro | minimal | expressive
style_type: "visual"       # visual | layout
inspired_by: "https://example.com"
tags: ["modern", "high-contrast"]
version: "1.0"
author: "@your-handle"
license: "CC-BY-4.0"
---

# Design System: [Your Style Name]

## 1. Overview

（One sentence capturing the brand DNA. Example: "Frontend deployment precision — black, white, and Geist font."）

## 2. Visual Theme & Atmosphere

（2-4 sentences describing the mood, density, and aesthetic philosophy. Use evocative adjectives:
Airy / Dense / Minimalist / Utilitarian / Playful / Editorial / Cinematic / Brutalist / Warm / Cold / Sharp / Soft.）

## 3. Color Palette & Roles

**Primary**
- [Descriptive Name] (#HEXCODE) — [Functional role: when and where used]
- [Descriptive Name] (#HEXCODE) — [Functional role]

**Secondary / Surface**
- [Descriptive Name] (#HEXCODE) — [Functional role]

**Semantic**
- Success [Name] (#HEXCODE) — [Where used]
- Danger [Name] (#HEXCODE) — [Where used]
- Warning [Name] (#HEXCODE) — [Where used]

**Dark Mode Pair (optional)**
- Background: #HEXCODE
- Surface: #HEXCODE
- Text Primary: #HEXCODE

## 4. Typography Rules

- **Font Family**: [Display font], [Body font], [Mono font]
- **Weight Strategy**: [Explain which weights you use for what. Example: 600 headings, 400 body, 500 emphasis.]
- **Letter-spacing Character**: [Negative on display? Neutral on body? Positive on all-caps micro labels?]
- **Type Scale**: [Base size in rem/px + scale ratio, e.g. 16px base, 1.25 ratio]
- **Character**: [One sentence on the personality. Example: "Technical precision. No warmth, no flourish."]

## 5. Component Stylings

### Buttons
- **Shape**: [Pill-shaped / Subtly rounded / Sharp squared]
- **Color Assignment**: [Primary uses X, Secondary uses Y]
- **Behavior**: [Hover effect, focus ring, loading state]

### Cards / Containers
- **Corner Roundness**: [Physical description + pixel value]
- **Background**: [Color name + hex]
- **Shadow Depth**: [Flat / Whisper-soft / Moderate / Heavy, with values]
- **Border**: [If any, describe stroke]

### Inputs / Forms
- **Stroke Style**: [Hairline / Bold / None]
- **Background**: [Color + rationale]
- **Focus State**: [How it communicates focus]

### (Optional) Navigation / Hero / Footer
[Add as needed]

## 6. Layout Principles (recommended)

- **Whitespace Strategy**: [Generous / Tight / Asymmetric]
- **Grid**: [e.g., 12-column, max-width 1280px, gutter 24px]
- **Alignment**: [Left-dominant / Centered / Mixed]
- **Rhythm**: [How elements stack vertically]

## 7. Spacing Scale (recommended)

- **Base Unit**: [4px / 8px / custom]
- **Scale**: [e.g., 4, 8, 16, 24, 32, 48, 64, 96, 128]
- **Usage Rules**: [Which token for what — e.g., 16px for inline gaps, 24px for section spacing]

## 8. Elevation & Depth (recommended)

- **Level 0 (flat)**: No shadow. Used for [where].
- **Level 1 (raised)**: `0 1px 2px rgba(0,0,0,0.05)`. Used for [where].
- **Level 2 (floating)**: `0 4px 12px rgba(0,0,0,0.10)`. Used for [where].
- **Level 3 (modal)**: `0 20px 60px rgba(0,0,0,0.25)`. Used for [where].

## 9. Do's & Don'ts (recommended)

### Do
- [Concrete prescriptive rule, e.g., "Use the primary color only for the primary CTA per view."]
- [Another rule]
- [Another rule]

### Don't
- [Concrete proscriptive rule, e.g., "Never combine more than 3 weights on one page."]
- [Another rule]
- [Another rule]

## 10. AI Rules (recommended, high-signal)

Imperative instructions for AI coding agents. Keep each line one clear command:

- When generating buttons, use [shape] with [color] for primary actions.
- Always include [specific visual trait].
- Never use gradients / emoji / drop shadows / etc.
- Prefer [X] over [Y] when in doubt.
- Default to dark/light mode — the pair is specified in section 3.

## 11. Responsive Breakpoints (recommended)

- **Mobile**: `< 640px` — [layout behavior]
- **Tablet**: `640px – 1024px` — [layout behavior]
- **Desktop**: `1024px – 1440px` — [layout behavior]
- **Wide**: `> 1440px` — [layout behavior, e.g., constrain to max-width, center content]
```

---

## 完整样例：Neo Brutalist Design System

（基于 StyleKit 现有 `lib/styles/neo-brutalist.ts`，可作为写法参考）

```markdown
---
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
- **Shadow Depth**: Hard offset shadows only — `8px 8px 0 #000000`. Never blurred.
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
- **Level 1 (lifted)**: `4px 4px 0 #000000`. Buttons, small cards on hover.
- **Level 2 (declared)**: `8px 8px 0 #000000`. Static cards, feature callouts.
- **Level 3 (dominant)**: `12px 12px 0 #000000`. Hero blocks, modal shells.

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
- No `backdrop-filter`, no `box-shadow` with blur > 0, no `border-radius` > 4px.
- Use `tabular-nums` on all numeric data.
- Focus states: background color change to Shock Yellow, not an outline ring.
- Never generate emoji. Replace with geometric shapes (squares, arrows, dots).

## 11. Responsive Breakpoints

- **Mobile** (`< 640px`): Single column. Reduce 96px displays to 48px.
  Shadows shrink from 8px offset to 4px offset.
- **Tablet** (`640px – 1024px`): 2-column where natural. Full type scale.
- **Desktop** (`1024px – 1440px`): 12-column grid, full scale, full shadow depth.
- **Wide** (`> 1440px`): Constrain content to 1400px max-width, center canvas.
  Allow occasional block to overhang grid for drama.
```
