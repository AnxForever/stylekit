# StyleKit Style Inventory

> Last Updated: 2026-02-04
> Total Styles: 36 (after merging similar styles)

This document tracks all design styles in StyleKit to prevent duplicates when adding new styles.

## Style Variants System

StyleKit uses a variant system to handle closely related styles. Instead of separate entries, similar styles are grouped under one main style with color/behavior variants.

**Current merged styles:**
- **Neo-Brutalist** includes: Classic, Soft (softer colors), Playful (colorful, rotations)
- **Neon Retro (Vaporwave)** includes: Vaporwave, Synthwave, Cyberpunk

## Visual Styles (26)

### Morphism Family
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `neumorphism` | Neumorphism | Dual shadows (light/dark), same-color system, soft 3D effect |
| `glassmorphism` | Glassmorphism | Frosted glass, blur backdrop, transparency, borders |
| `claymorphism` | Claymorphism | 3D clay-like elements, rounded shapes, playful shadows |
| `skeuomorphism` | Skeuomorphism | Realistic textures (leather, metal), tactile gradients |

### Minimal/Clean Family
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `minimalist-flat` | Minimalist Flat | No shadows, flat colors, clean lines |
| `soft-ui` | Soft UI | Soft shadows, rounded corners, low saturation |
| `corporate-clean` | Corporate Clean | Professional, structured, neutral colors |
| `swiss-style` | Swiss International | Grid-based, typography-focused, mathematical precision |

### Neo-Brutalist Family
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `neo-brutalist` | Neo-Brutalist | Bold borders, raw aesthetic, high contrast. **Variants:** Classic, Soft, Playful |

### Retro Family
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `retro-vintage` | Retro Vintage | Sepia tones, aged textures, classic typography |
| `vaporwave` | Neon Retro | 80-90s neon aesthetic. **Variants:** Vaporwave, Synthwave, Cyberpunk |
| `y2k` | Y2K | 2000s aesthetic, metallic, bubbly, tech-optimism |
| `memphis` | Memphis | 80s Memphis Group, geometric shapes, bold patterns |
| `art-deco` | Art Deco | 1920s geometric, gold accents, symmetry |
| `bauhaus` | Bauhaus | Primary colors, geometric shapes, functional |
| `pixel-art` | Pixel Art | 8-bit aesthetic, pixelated, retro gaming |

### Brand-Inspired Family
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `apple-style` | Apple Style | Clean, spacious, SF Pro font, subtle animations |
| `notion-style` | Notion Style | Minimal, content-focused, clean typography |
| `stripe-style` | Stripe Style | Gradient mesh, professional, modern fintech |
| `material-design` | Material Design | Google's system, elevation shadows, bold colors |
| `fluent-design` | Fluent Design | Microsoft's system, acrylic blur, depth, light |

### Other Visual Styles
| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `natural-organic` | Natural Organic | Earth tones, organic shapes, nature-inspired |
| `modern-gradient` | Modern Gradient | Vibrant gradients, mesh backgrounds |
| `dark-mode` | Dark Mode | Dark backgrounds, reduced eye strain |
| `geometric-bold` | Geometric Bold | Bold geometric shapes, strong colors |
| `editorial` | Editorial | Magazine-style, typography-focused, elegant |
| `ghibli-style` | Ghibli Style | Anime-inspired, warm colors, dreamy, soft |

## Layout Styles (8)

| Slug | Name | Key Characteristics |
|------|------|---------------------|
| `bento-grid` | Bento Grid | Apple-inspired grid, varied card sizes |
| `masonry-flow` | Masonry Flow | Pinterest-style, varied heights |
| `split-screen` | Split Screen | Two-column, contrasting sections |
| `full-page-scroll` | Full Page Scroll | Section-by-section scrolling |
| `timeline-vertical` | Timeline Vertical | Chronological, vertical flow |
| `card-stack` | Card Stack | Layered cards, depth effect |
| `sidebar-fixed` | Sidebar Fixed | Fixed navigation sidebar |
| `magazine-grid` | Magazine Grid | Editorial grid, mixed content |
| `hero-fullscreen` | Hero Fullscreen | Full-viewport hero sections |

---

## Similar Styles Reference

These style pairs share characteristics but have distinct differences:

### Neumorphism vs Soft UI
- **Neumorphism**: Specific dual-shadow technique (light + dark shadows), elements same color as background
- **Soft UI**: Broader category, soft shadows with any color, more flexible

### Vaporwave vs Synthwave
- **Vaporwave**: 80-90s consumerism, Japanese text, Greek sculptures, glitch effects
- **Synthwave**: 80s synth music, grid horizons, sunset gradients, sci-fi aesthetic

### Minimalist Flat vs Swiss Style
- **Minimalist Flat**: General flat design, no specific rules
- **Swiss Style**: Strict grid system, Helvetica, mathematical precision

### Glassmorphism vs Fluent Design
- **Glassmorphism**: Frosted glass effect only
- **Fluent Design**: Complete system including acrylic, reveal highlights, depth, motion

---

## Adding New Styles Checklist

Before adding a new style, verify it doesn't duplicate existing ones:

1. [ ] Check if similar style exists in inventory above
2. [ ] Verify distinct visual characteristics from similar styles
3. [ ] Ensure different color palette
4. [ ] Confirm unique design philosophy
5. [ ] Check that keywords don't significantly overlap

### Suggested Future Styles (Non-duplicating)

- **Brutalist Web** - Raw HTML aesthetic, system fonts, minimal styling
- **Frutiger Aero** - 2000s tech aesthetic, glossy, nature + technology
- **Corporate Memphis** - Flat illustration style with simple characters
- **Risograph** - Print-inspired, halftone, limited colors, grain
- **Kinetic Typography** - Motion-focused, animated text
- **Isometric** - 3D isometric illustrations, geometric
- **Scandinavian** - Nordic minimalism, natural materials, hygge
- **Japanese Minimalism** - Wabi-sabi, asymmetry, negative space
- **Art Nouveau** - Organic curves, nature motifs, ornate
- **Psychedelic** - 60s-70s, swirling patterns, vibrant colors
- **Grunge** - Distressed textures, rough edges, underground
- **Steampunk** - Victorian + industrial, gears, brass tones
