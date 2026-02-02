---
name: stylekit-design-system
description: StyleKit AI-friendly design system with Neo-Brutalist, Neumorphism, Glassmorphism, and Editorial styles. Use when implementing UI components with specific visual styles, design tokens, and component recipes.
---

# StyleKit Design System

You are implementing UI components using the StyleKit design system. This skill provides precise design tokens, component code, and style rules for consistent, high-quality interfaces.

## Available Styles

### 1. Neo-Brutalist
Bold black borders, hard-edge shadows, sharp corners, high contrast.

**Design Tokens:**
```css
/* Borders */
--border-width: 2px (mobile) / 4px (desktop)
--border-color: #000000
--border-radius: 0px

/* Shadows */
--shadow-sm: 4px 4px 0 #000
--shadow-md: 8px 8px 0 #000
--shadow-hover: none (shadow disappears on hover)

/* Colors */
--color-primary: #000000
--color-accent: #ff006e, #ccff00, #00d9ff, #ff9500
--color-background: #ffffff

/* Typography */
--font-heading: font-black
--font-body: font-mono
```

**Button Example:**
```tsx
<button className="
  bg-[#ff006e] text-white font-black
  px-4 py-2 md:px-6 md:py-3
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:shadow-none
  hover:translate-x-[2px] hover:translate-y-[2px]
  transition-all duration-200
  cursor-pointer
">
  Click Me
</button>
```

**Card Example:**
```tsx
<div className="
  bg-white
  border-2 md:border-4 border-black
  shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
  md:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]
  hover:-translate-y-1
  transition-all duration-300
  p-4 md:p-6
">
  <h3 className="font-black text-xl mb-2">Card Title</h3>
  <p className="font-mono text-gray-700">Card content</p>
</div>
```

**Rules:**
- DO: Use pure black borders, hard shadows, sharp corners
- DO: Hover removes shadow + slight translate
- DON'T: Use rounded corners, blur shadows, gradients

---

### 2. Neumorphism
Soft UI with embossed/debossed effects, subtle depth, monochromatic.

**Design Tokens:**
```css
/* Background (must match parent) */
--color-background: #e0e5ec

/* Shadows (light source: top-left) */
--shadow-raised: -6px -6px 14px rgba(255,255,255,0.7),
                 6px 6px 14px rgba(0,0,0,0.15)
--shadow-pressed: inset -4px -4px 8px rgba(255,255,255,0.7),
                  inset 4px 4px 8px rgba(0,0,0,0.15)

/* Border radius */
--border-radius: 12px to 20px

/* Typography */
--font-family: Inter, system-ui
--color-text: #4a5568
```

**Button Example:**
```tsx
<button className="
  bg-[#e0e5ec]
  px-6 py-3
  rounded-xl
  shadow-[-6px_-6px_14px_rgba(255,255,255,0.7),6px_6px_14px_rgba(0,0,0,0.15)]
  hover:shadow-[-2px_-2px_6px_rgba(255,255,255,0.7),2px_2px_6px_rgba(0,0,0,0.15)]
  active:shadow-[inset_-4px_-4px_8px_rgba(255,255,255,0.7),inset_4px_4px_8px_rgba(0,0,0,0.15)]
  transition-all duration-200
  text-[#4a5568] font-medium
  cursor-pointer
">
  Soft Button
</button>
```

**Rules:**
- DO: Use consistent light source (top-left)
- DO: Match button background to parent background
- DO: Use soft, rounded corners (12-20px)
- DON'T: Use hard shadows, sharp corners, high contrast

---

### 3. Glassmorphism
Frosted glass effect with blur, transparency, and vibrant backgrounds.

**Design Tokens:**
```css
/* Glass effect */
--backdrop-blur: blur(16px)
--background: rgba(255, 255, 255, 0.1) to rgba(255, 255, 255, 0.25)
--border: 1px solid rgba(255, 255, 255, 0.2)

/* Border radius */
--border-radius: 16px to 24px

/* Colors */
--color-background-vibrant: gradient or image required behind glass
--color-text: #ffffff (on dark) or #1a1a2e (on light)
```

**Card Example:**
```tsx
{/* Requires vibrant background behind */}
<div className="
  backdrop-blur-lg
  bg-white/10
  border border-white/20
  rounded-2xl
  p-6
  shadow-xl
">
  <h3 className="text-white font-semibold text-xl mb-2">Glass Card</h3>
  <p className="text-white/80">Frosted glass effect</p>
</div>
```

**Rules:**
- DO: Always have vibrant/gradient background behind glass
- DO: Use backdrop-blur-lg or backdrop-blur-xl
- DO: Add subtle white border for depth
- DON'T: Use glass on plain white backgrounds
- DON'T: Use heavy shadows (defeats glass effect)

---

### 4. Editorial
Typography-first, magazine-inspired, elegant with strong hierarchy.

**Design Tokens:**
```css
/* Typography */
--font-heading: Playfair Display, serif
--font-body: Inter, system-ui
--font-size-hero: clamp(3rem, 8vw, 6rem)
--line-height: 1.6 to 1.8 for body

/* Colors */
--color-text: #1a1a2e
--color-accent: #c9a959 (gold) or brand color
--color-background: #fafafa

/* Spacing */
--spacing-section: 6rem to 8rem
--max-width-content: 65ch to 75ch
```

**Hero Example:**
```tsx
<section className="py-24 px-6">
  <h1 className="
    font-serif
    text-5xl md:text-7xl
    font-bold
    leading-tight
    tracking-tight
    max-w-4xl
  ">
    The Art of <span className="italic">Beautiful</span> Typography
  </h1>
  <p className="
    mt-8
    text-xl
    text-gray-600
    max-w-2xl
    leading-relaxed
  ">
    A magazine-inspired approach to web design.
  </p>
</section>
```

**Rules:**
- DO: Use serif fonts for headings, sans-serif for body
- DO: Create strong visual hierarchy with size contrast
- DO: Use generous white space
- DON'T: Use more than 2-3 font families
- DON'T: Let text lines exceed 75 characters

---

## Component Recipes

### Button Recipe
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size: 'sm' | 'md' | 'lg'
  style: 'neo-brutalist' | 'neumorphism' | 'glassmorphism' | 'editorial'
}
```

### Card Recipe
```typescript
interface CardProps {
  variant: 'default' | 'hover' | 'interactive'
  padding: 'compact' | 'normal' | 'spacious'
  style: 'neo-brutalist' | 'neumorphism' | 'glassmorphism' | 'editorial'
}
```

## Pre-Delivery Checklist

Before delivering any UI code using StyleKit:

- [ ] Style tokens applied consistently
- [ ] Responsive values (mobile/desktop) included
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover/active states implemented
- [ ] Focus states visible for accessibility
- [ ] Transitions smooth (150-300ms)
- [ ] No emojis as icons (use Lucide/Heroicons)
- [ ] Color contrast 4.5:1 minimum
- [ ] `prefers-reduced-motion` respected

## API Reference

StyleKit provides REST APIs for programmatic access:

- `GET /api/styles` - List all styles
- `GET /api/styles/[slug]` - Get style pack with tokens
- `GET /api/styles/[slug]/tokens` - Get design tokens only
- `GET /api/styles/[slug]/recipes` - Get component recipes
- `GET /api/archetypes` - Get layout patterns
