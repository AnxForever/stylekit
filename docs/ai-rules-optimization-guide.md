# AI Rules English Prompt Optimization Guide

This document provides a standardized approach for optimizing the `aiRulesEn` field in style definition files located at `/lib/styles/*.ts`.

---

## Optimization Goals

1. **Structured Format**: Transform unstructured text into a consistent, hierarchical Markdown format
2. **English Only**: Convert all Chinese content to professional English
3. **Actionable Specifications**: Provide concrete Tailwind classes, not vague descriptions
4. **Self-Verification**: Include checklists for AI to validate its own output
5. **Clear Prohibitions**: Explicitly state forbidden patterns with reasons

---

## Standard Template Structure

Every `aiRulesEn` field should follow this exact structure:

```markdown
# [Style Name] Design System

You are an expert frontend developer specializing in [Style Name] design. Generate all code strictly following these specifications.

## Style Identity
- **Name**: [Full name] / [Alternative names]
- **Category**: [Modern/Retro/Minimal/Expressive], [High-Contrast/Subtle]
- **Essence**: [One sentence describing the core principle]
- **Mood**: [4-5 adjectives describing the emotional feel]
- **Inspiration**: [Real-world references, designers, movements]

---

## Core Visual Principles

### 1. Background Foundation
\`\`\`
[Specific background requirements with exact Tailwind classes]
\`\`\`

### 2. Shadow System
\`\`\`
[Shadow specifications with exact values]
\`\`\`

### 3. Border System
\`\`\`
[Border specifications]
\`\`\`

### 4. Border Radius
\`\`\`
[Border radius rules]
\`\`\`

---

## Interaction Specifications

### Button States
| State | Effect | Implementation |
|-------|--------|----------------|
| Default | [description] | [Tailwind classes] |
| Hover | [description] | [Tailwind classes] |
| Active | [description] | [Tailwind classes] |
| Focus | [description] | [Tailwind classes] |
| Disabled | [description] | [Tailwind classes] |

### [Other Element] States
[Similar table format]

---

## Animation Rules

### Interaction Physics
- **[Rule Name]**: [Detailed explanation of the interaction principle]
- **[Rule Name]**: [Detailed explanation]

### Timing Guidelines
| Interaction | Duration | Easing |
|-------------|----------|--------|
| [type] | [ms] | [easing function] |

---

## Color Palette

### Primary Colors
| Token | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| [name] | [#hex] | [class] | [usage] |

### Secondary/Accent Colors
[Similar table]

### Background & Surface
| Token | Value | Usage |
|-------|-------|-------|
| [name] | [value] | [usage] |

---

## Typography

| Element | Classes |
|---------|---------|
| Headlines | [classes] |
| Body | [classes] |
| Labels | [classes] |

---

## Forbidden Patterns

| Pattern | Reason |
|---------|--------|
| [pattern] | [why it violates this style] |

---

## Responsive Guidelines

### [Aspect] Scaling
\`\`\`
Mobile: [classes]
Desktop (md:): [classes]
\`\`\`

---

## Component Templates (Optional)

### [Component Name]
\`\`\`jsx
[Full component code example]
\`\`\`

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] [Verification item 1]
- [ ] [Verification item 2]
- [ ] [Verification item 3]
```

---

## Section-by-Section Guidelines

### 1. Style Identity

**Purpose**: Give the AI a mental model of the style's essence.

| Field | Description | Example |
|-------|-------------|---------|
| Name | Primary name + alternatives | "Neumorphism / Soft UI" |
| Category | 2-3 classification tags | "Modern, Minimal" |
| Essence | Core principle in one sentence | "Soft 3D depth through dual shadows simulating light hitting clay-like surfaces" |
| Mood | 4-5 emotional adjectives | "Calm, tactile, premium, approachable" |
| Inspiration | Real references | "Apple WWDC25, visionOS, Dribbble trends" |

### 2. Core Visual Principles

**Purpose**: Define the non-negotiable visual rules.

- Use code blocks with exact Tailwind classes
- Mark required vs optional with labels like `REQUIRED:`, `PREFERRED:`
- Include both mobile and desktop values where applicable
- Use comments to explain complex values

Example:
```markdown
### Shadow System
\`\`\`
RAISED (default):
shadow-[8px_8px_16px_#b8bcc2,-8px_-8px_16px_#ffffff]
- Dark shadow: lower-right (+X, +Y) → #b8bcc2
- Light shadow: upper-left (-X, -Y) → #ffffff

RECESSED (pressed):
shadow-[inset_8px_8px_16px_#b8bcc2,inset_-8px_-8px_16px_#ffffff]
\`\`\`
```

### 3. Interaction Specifications

**Purpose**: Define exact state changes for interactive elements.

- Use tables for clarity
- Include ALL states: Default, Hover, Active, Focus, Disabled
- Provide complete Tailwind class strings, not fragments
- Group by element type (Button, Card, Input, Link)

### 4. Animation Rules

**Purpose**: Define the physics and timing of interactions.

**Interaction Physics section should include named rules:**
- Give each rule a memorable name (e.g., "Physical Crushing", "Glitch Press")
- Explain the real-world metaphor
- Provide the exact implementation

**Timing Guidelines table must include:**
- Interaction type
- Duration in milliseconds
- Easing function (use exact cubic-bezier if custom)

### 5. Color Palette

**Purpose**: Provide exact color values and their semantic usage.

**Required tables:**
1. Primary/Core colors with Hex, Tailwind class, and usage
2. Background & Surface colors
3. Text hierarchy colors
4. For glow-based styles: RGBA values for shadows

### 6. Typography

**Purpose**: Define font treatments by element type.

**Include:**
- Font family (font-sans, font-mono, font-serif)
- Font weight
- Letter spacing (tracking)
- Line height (leading)
- Text transform (uppercase, etc.)

### 7. Forbidden Patterns

**Purpose**: Explicitly state what NOT to do.

**Rules:**
- Always pair the forbidden pattern with a reason
- Be specific: use actual class names, not vague descriptions
- Include common mistakes developers might make

Example:
```markdown
| Pattern | Reason |
|---------|--------|
| shadow-md, shadow-lg | Blur shadows violate hard-edge principle |
| rounded-2xl | Too soft for brutalist aesthetic |
| translate on active | Use shadow collapse instead |
```

### 8. Responsive Guidelines

**Purpose**: Ensure mobile-first, consistent scaling.

**Include scaling for:**
- Shadows
- Borders
- Spacing (padding, gap, margins)
- Typography
- Any style-specific elements (blur, glow intensity)

### 9. Component Templates (Optional)

**Purpose**: Provide copy-paste ready examples.

**When to include:**
- Complex shadow/glow configurations
- Multi-layer structures (glass panels, neumorphic buttons)
- Animation-heavy interactions

### 10. Self-Verification Checklist

**Purpose**: AI self-review before outputting code.

**Rules:**
- Use checkbox format `- [ ]`
- 8-12 items maximum
- Focus on the most critical, style-defining requirements
- Order from most important to least

---

## Translation Guidelines

When converting Chinese to English:

| Chinese Term | English Translation |
|--------------|---------------------|
| 新拟物派 / 新拟态 | Neumorphism / Soft UI |
| 毛玻璃 | Glassmorphism / Liquid Glass |
| 赛博朋克 | Cyberpunk |
| 蒸汽波 | Vaporwave |
| 新野兽派 | Neo-Brutalist |
| 极简扁平 | Minimalist Flat |
| 扫光 | Specular sweep / Light sweep |
| 发光 | Glow |
| 圆角 | Border radius / Rounded corners |
| 阴影 | Shadow |
| 边框 | Border |
| 悬停 | Hover |
| 点击/按下 | Active / Pressed |
| 聚焦 | Focus |
| 禁用 | Disabled |

---

## Quality Checklist for Optimized Prompts

Before finalizing an optimized `aiRulesEn`, verify:

- [ ] All sections from the template are present
- [ ] All Chinese text has been translated to English
- [ ] Code blocks use exact Tailwind classes (not vague descriptions)
- [ ] Tables are properly formatted with | separators
- [ ] Animation rules include named principles with metaphors
- [ ] Forbidden patterns table includes reasons
- [ ] Self-verification checklist has 8-12 items
- [ ] Responsive guidelines cover mobile and desktop
- [ ] Color palette includes Hex values AND Tailwind classes
- [ ] No placeholder text like "[TODO]" or "[...]"

---

## Files to Optimize

The following style files in `/lib/styles/` need their `aiRulesEn` field optimized:

### Already Optimized (Reference Examples)
- `neumorphism.ts` - Soft UI with dual shadows
- `glassmorphism.ts` - Liquid Glass / Premium glass effects
- `cyberpunk-neon.ts` - Sci-Fi neon HUD
- `vaporwave.ts` - Retro 80s/90s aesthetics
- `minimalist-flat.ts` - Zero-shadow flat design
- `neo-brutalist.ts` - Hard-edge brutalist

### Need Optimization
Run this command to find all style files:
```bash
ls /lib/styles/*.ts
```

For each file, locate the `aiRulesEn:` field and replace its content following this guide.

---

## Example: Before and After

### Before (Unstructured)
```typescript
aiRulesEn: `STYLE: Example Style
MUST USE:
- Some color
- Some shadow

MUST AVOID:
- Bad thing 1
- Bad thing 2

Animation rules in Chinese: 悬停时放大...`
```

### After (Optimized)
```typescript
aiRulesEn: `# Example Style Design System

You are an expert frontend developer specializing in Example Style design. Generate all code strictly following these specifications.

## Style Identity
- **Name**: Example Style / Alternative Name
- **Category**: Modern, Expressive
- **Essence**: [Core principle description]
- **Mood**: Bold, playful, dynamic, fresh
- **Inspiration**: [Real-world references]

---

## Core Visual Principles

### 1. Background Foundation
\`\`\`
REQUIRED: bg-[#specific-color]
[Additional context]
\`\`\`

[... remaining sections ...]

---

## Self-Verification Checklist

Before outputting code, verify:
- [ ] [Item 1]
- [ ] [Item 2]
- [ ] [Item 3]`
```

---

## Important Notes

1. **Preserve the backtick structure**: The `aiRulesEn` field uses template literals (\`...\`). Ensure internal code blocks use escaped backticks or indentation.

2. **Keep aiRules (Chinese) intact**: Only modify the `aiRulesEn` field unless explicitly asked to update both.

3. **Test readability**: The prompt will be read by AI models. Ensure formatting renders correctly in Markdown.

4. **Maintain style uniqueness**: Each style should feel distinct. Don't copy-paste generic content — adapt each section to the specific style's characteristics.

5. **Reference existing components**: Check if the style has example components in the same file. The prompt should align with those implementations.
