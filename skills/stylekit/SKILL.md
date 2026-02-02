---
name: stylekit
version: 2.0.0
description: AI-friendly design system with 16+ visual styles, design tokens, component recipes, gradients, and v0-style prompt framework. Use for generating consistent, high-quality UI with Neo-Brutalist, Glassmorphism, Neumorphism, Editorial, and more.
author: StyleKit Team
repository: https://github.com/AnxForever/stylekit
tags:
  - design-system
  - ui-components
  - tailwind-css
  - react
  - ai-coding
---

# StyleKit Design System

You are implementing UI components using the StyleKit design system. This skill provides precise design tokens, component code, style rules, and the v0 prompt framework for consistent, high-quality interfaces.

## Quick Reference

| Style | Best For | Key Feature |
|-------|----------|-------------|
| `neo-brutalist` | Creative, Portfolio | Bold borders, hard shadows |
| `glassmorphism` | Modern SaaS, Landing | Frosted glass, blur effects |
| `neumorphism` | Soft UI, Forms | Embossed/debossed depth |
| `editorial` | Blog, Magazine | Typography-first, elegant |
| `cyberpunk-neon` | Gaming, Tech | Neon glow, dark theme |
| `modern-gradient` | Startup, Marketing | Vibrant color gradients |

## v0 Prompt Framework

When generating UI, structure your prompt using three elements:

### 1. Product Surface (What)
Specify exact components, data, and features:
```
- Hero section with headline, subheadline, CTA button
- Feature grid with 3 cards showing icon, title, description
- Pricing table with 3 tiers and feature comparison
```

### 2. Context of Use (Who/When)
Define user, scenario, and decisions:
```
- Target: Enterprise B2B users evaluating SaaS products
- Decision: Compare pricing tiers and feature availability
- Device: Desktop-first, responsive to tablet
```

### 3. Constraints & Taste (How)
Set style preferences and requirements:
```
- Mood: Professional, trustworthy
- Priority: Conversion optimization
- Must have: Social proof, clear CTAs
- Must NOT: Animations, dark mode
```

## Design Tokens by Style

### Neo-Brutalist
```css
/* Borders */
border-width: 2px (mobile) / 4px (desktop)
border-color: #000000
border-radius: 0px

/* Shadows - Hard offset */
shadow-sm: 4px 4px 0 #000
shadow-md: 8px 8px 0 #000
shadow-hover: none (shadow disappears on hover)

/* Typography */
font-heading: font-black
font-body: font-mono
```

**Button:**
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

**Rules:**
- DO: Pure black borders, hard shadows, sharp corners
- DO: Hover removes shadow + slight translate
- DON'T: Rounded corners, blur shadows, gradients

---

### Glassmorphism
```css
/* Glass effect */
backdrop-blur: blur(16px)
background: rgba(255, 255, 255, 0.1) to 0.25
border: 1px solid rgba(255, 255, 255, 0.2)
border-radius: 16px to 24px
```

**Card:**
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
- DON'T: Use glass on plain white backgrounds
- DON'T: Use heavy shadows (defeats glass effect)

---

### Neumorphism
```css
/* Background must match parent */
background: #e0e5ec

/* Shadows - Light source top-left */
shadow-raised: -6px -6px 14px rgba(255,255,255,0.7),
               6px 6px 14px rgba(0,0,0,0.15)
shadow-pressed: inset -4px -4px 8px rgba(255,255,255,0.7),
                inset 4px 4px 8px rgba(0,0,0,0.15)
border-radius: 12px to 20px
```

**Button:**
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
- DO: Consistent light source (top-left)
- DO: Match button background to parent
- DON'T: Hard shadows, sharp corners, high contrast

---

### Editorial
```css
/* Typography-first */
font-heading: Playfair Display, serif
font-body: Inter, system-ui
font-size-hero: clamp(3rem, 8vw, 6rem)
line-height: 1.6 to 1.8 for body
max-width-content: 65ch to 75ch
```

**Hero:**
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
- DO: Serif for headings, sans-serif for body
- DO: Strong visual hierarchy with size contrast
- DO: Generous white space
- DON'T: More than 2-3 font families
- DON'T: Lines exceeding 75 characters

## Gradient Palette

### Recommended Gradients

**Candy Pop** (Vibrant)
```css
background: linear-gradient(45deg, #fada61 0%, #ff9188 50%, #ff5acd 100%);
/* Tailwind: bg-gradient-to-tr from-[#fada61] via-[#ff9188] to-[#ff5acd] */
```

**Ocean Blue** (Cool)
```css
background: linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%);
/* Tailwind: bg-gradient-to-br from-[#2193b0] to-[#6dd5ed] */
```

**Purple Dream** (Vibrant)
```css
background: linear-gradient(45deg, #4159d0 0%, #c84fc0 50%, #ffcd70 100%);
/* Tailwind: bg-gradient-to-tr from-[#4159d0] via-[#c84fc0] to-[#ffcd70] */
```

**Forest Canopy** (Nature)
```css
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
/* Tailwind: bg-gradient-to-br from-[#11998e] to-[#38ef7d] */
```

## Component Recipes

### Button Recipe
```typescript
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost' | 'destructive'
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

### Input Recipe
```typescript
interface InputProps {
  variant: 'default' | 'filled' | 'outlined'
  size: 'sm' | 'md' | 'lg'
  state: 'default' | 'error' | 'success' | 'disabled'
}
```

## Pre-Delivery Checklist

Before delivering any UI code:

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

```
GET  /api/styles              - List all styles
GET  /api/styles/[slug]       - Get style pack with tokens
GET  /api/styles/[slug]/tokens - Get design tokens only
GET  /api/styles/[slug]/recipes - Get component recipes
GET  /api/archetypes          - Get layout patterns
GET  /api/knowledge/search    - Search design knowledge
POST /api/knowledge/smart     - Smart recommendations
GET  /api/lint                - List lintable styles
POST /api/lint                - Check code against style
```

## Example Workflow

```
1. User: "Create a SaaS landing page"

2. Apply v0 Framework:
   - Product Surface: Hero, features, pricing, testimonials, CTA
   - Context: B2B decision makers, desktop-first
   - Constraints: Professional mood, conversion priority

3. Select Style: corporate-clean or editorial

4. Fetch tokens: GET /api/styles/corporate-clean/tokens

5. Generate using tokens + rules + gradients

6. Validate: POST /api/lint with generated code
```

## Installation

```bash
# Use as Skills.sh skill
npx skills add AnxForever/stylekit

# Or use the API directly
curl https://stylekit.example.com/api/styles
```
