# StyleKit - New Style Addition Checklist

## Overview

Complete checklist for adding a new design style to StyleKit.
**All items are REQUIRED** - do not skip any step.

## Pre-Flight

- [ ] Define style slug (kebab-case, e.g., `warm-dashboard`)
- [ ] Prepare 3-5 primary colors with hex codes
- [ ] Identify 5-10 characteristic visual traits
- [ ] Determine styleType: `visual` | `layout` | `both`
- [ ] Choose category: `modern` | `classic` | `expressive` | `cultural` | `functional`

## Phase 1: Core Definition Files (CREATE)

### 1.1 Style Definition

- [ ] `lib/styles/{slug}.ts` - Main DesignStyle object
  - `slug`, `name`, `nameEn`, `description`
  - `cover`: `/styles/{slug}.svg`
  - `styleType`, `tags`, `category`
  - `colors`: primary, secondary, accent[]
  - `keywords`: Chinese search terms
  - `philosophy`: Design principles (multi-line string)
  - `doList`: 6-8 required patterns
  - `dontList`: 4-6 forbidden patterns
  - `components`: button, card, input, nav, hero, footer (with code snippets)
  - `globalCss`: CSS custom properties
  - `aiRules`: Comprehensive AI generation guidelines
  - `examplePrompts`: 2-3 example use cases

### 1.2 Style Tokens

- [ ] `lib/styles/{slug}-tokens.ts` - AI-consumable Tailwind mappings
  - `border`: radius, width, style
  - `shadow`: default, hover variants
  - `interaction`: hover, active, focus states
  - `typography`: fonts, sizes, weights
  - `spacing`: padding, margin, gap
  - `colors`: all color tokens
  - `forbidden`: classes to never use
  - `required`: classes that must be used

### 1.3 Recipe Definition

- [ ] `lib/recipes/{slug}.ts` - Component recipes
  - **MUST include**: button, card, input (minimum)
  - **Optional**: nav, badge, table, alert, hero, footer, etc.
  - Each recipe: `name`, `description`, `className`, `html` (optional)

## Phase 2: Registration Files (MODIFY)

### 2.1 Style Index

- [ ] `lib/styles/index.ts`
  - Add import statement: `import { styleName } from "./{slug}";`
  - Add to `styles` array: `styleName,`

### 2.2 Style Metadata

- [ ] `lib/styles/meta.ts`
  - Add entry to `stylesMeta` array with:
    - `slug`, `name`, `nameEn`, `description`
    - `cover`: `/styles/{slug}.svg`
    - `styleType`, `tags`, `category`
    - `colors`: primary, secondary, accent[]
    - `keywords`: Chinese search terms

### 2.3 Recipe Registry

- [ ] `lib/recipes/index.ts`
  - Add import statement: `import { styleNameRecipes } from "./{slug}";`
  - Add to `recipeRegistry` object: `"{slug}": styleNameRecipes,`

### 2.4 Style Components

- [ ] `lib/style-components.tsx`
  - Add entry with all four component renderers:
    - `button`: Interactive button component
    - `card`: Card/container component
    - `input`: Text input component
    - `coverPreview`: Miniaturized UI preview for gallery

## Phase 3: Showcase Pages (CREATE)

### 3.1 Showcase Directory

- [ ] Create `app/styles/{slug}/showcase/` directory

### 3.2 Page Wrapper

- [ ] `app/styles/{slug}/showcase/page.tsx`
  - Dynamic import with loading skeleton
  - Loading skeleton styled to match theme colors
  - Example:
    ```tsx
    import dynamic from "next/dynamic";

    const ShowcaseContent = dynamic(() => import("./_content"), {
      loading: () => (
        <div className="min-h-screen bg-[#BACKGROUND] flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block w-8 h-8 border-2 border-[#PRIMARY] border-t-transparent animate-spin rounded-full mb-4" />
            <p className="text-[#MUTED]">Loading...</p>
          </div>
        </div>
      ),
    });

    export default function StyleShowcase() {
      return <ShowcaseContent />;
    }
    ```

### 3.3 Showcase Content

- [ ] `app/styles/{slug}/showcase/_content.tsx`
  - `"use client"` directive at top
  - **400-600 lines minimum**
  - **12+ distinct sections**
  - **2+ useState hooks** for interactivity (tabs, dropdowns, pagination, etc.)
  - Required sections:
    1. Navigation header
    2. Hero section with title
    3. Color palette display
    4. Typography showcase
    5. Buttons (4+ variants)
    6. Cards (3+ variations)
    7. Form elements (input, textarea, select)
    8. Tabs or navigation component
    9. Badges/tags
    10. Progress bars or indicators
    11. Alerts (info, success, warning, error)
    12. Table with data
    13. Blockquote/testimonial
    14. Dividers/decorators
    15. Rules summary (do/don't)
    16. Footer

## Phase 4: Visual Assets (CREATE)

### 4.1 Cover SVG (CRITICAL)

- [ ] `public/styles/{slug}.svg`
  - Dimensions: `1200x630` viewBox
  - **MUST show miniaturized UI components** (NOT just style name)
  - Four-corner layout with variety of components:
    - Top-left: Card with heading + text
    - Top-right: Another card or component
    - Bottom-left: Buttons or badges
    - Bottom-right: Form element or card
  - Central title area with style name
  - Style-specific effects:
    - Shadows (drop-shadow, soft, hard)
    - Gradients
    - Patterns (grids, dots, textures)
    - Borders (thick, thin, dashed)
    - Decorative elements

**Reference examples:**

| Style | Approach |
|-------|----------|
| `neo-brutalist.svg` | Hard shadows, grid background, bold colors |
| `neumorphism.svg` | Soft embossed shadows, rounded shapes |
| `dark-academia.svg` | Leather texture, gold accents, serif headings |

## Phase 5: Verification

### 5.1 TypeScript Check

- [ ] Run `npx tsc --noEmit` - no errors

### 5.2 Test Suite

- [ ] Run `npm test` - all tests pass
  - `styles-consistency.test.ts` validates index + meta alignment
  - `style-assets.test.ts` validates SVG + coverPreview existence
  - `recipes-integrity.test.ts` validates recipe structure

### 5.3 Visual Check

- [ ] Run `npm run dev`
- [ ] Visit `/styles` - verify style appears in gallery with correct cover
- [ ] Visit `/styles/{slug}` - verify docs page loads
- [ ] Visit `/styles/{slug}/showcase` - verify showcase renders with all sections
- [ ] Test responsive behavior (mobile/tablet/desktop)

## File Summary

| Phase | Action | File |
|-------|--------|------|
| 1.1 | CREATE | `lib/styles/{slug}.ts` |
| 1.2 | CREATE | `lib/styles/{slug}-tokens.ts` |
| 1.3 | CREATE | `lib/recipes/{slug}.ts` |
| 2.1 | MODIFY | `lib/styles/index.ts` |
| 2.2 | MODIFY | `lib/styles/meta.ts` |
| 2.3 | MODIFY | `lib/recipes/index.ts` |
| 2.4 | MODIFY | `lib/style-components.tsx` |
| 3.1 | CREATE | `app/styles/{slug}/showcase/` (directory) |
| 3.2 | CREATE | `app/styles/{slug}/showcase/page.tsx` |
| 3.3 | CREATE | `app/styles/{slug}/showcase/_content.tsx` |
| 4.1 | CREATE | `public/styles/{slug}.svg` |

**Total: 6 new files + 4 modified files per style**

## Common Mistakes to Avoid

1. **Forgetting showcase pages** - Always create both `page.tsx` and `_content.tsx`
2. **Cover SVG shows only text** - MUST show UI components
3. **Missing coverPreview in style-components** - Required for gallery preview
4. **Mismatched slugs** - Use exact same slug everywhere
5. **Missing imports** - Remember to add to index.ts files
6. **Non-interactive showcase** - Add useState hooks for tabs, dropdowns, etc.

## Quick Copy Template

```bash
# Create directories
mkdir -p app/styles/{slug}/showcase

# Files to create
touch lib/styles/{slug}.ts
touch lib/styles/{slug}-tokens.ts
touch lib/recipes/{slug}.ts
touch app/styles/{slug}/showcase/page.tsx
touch app/styles/{slug}/showcase/_content.tsx
touch public/styles/{slug}.svg

# Files to modify
# - lib/styles/index.ts
# - lib/styles/meta.ts
# - lib/recipes/index.ts
# - lib/style-components.tsx
```
