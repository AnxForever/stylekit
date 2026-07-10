---
name: stylekit
description: Apply a specific, consistent visual style to frontend UI you are generating. Use when building or styling web UI (pages, components, dashboards, landing pages) and you want a named aesthetic — Glassmorphism, Neo-Brutalist, Cyberpunk, Bauhaus, Apple, Stripe, Linear, and many more — instead of generic AI defaults. StyleKit gives you design tokens, component recipes, and AI rules for each style, with themes installable through the shadcn registry.
metadata:
  homepage: https://www.stylekit.top
---

# StyleKit

StyleKit is an open-source style library for AI coding with 135 curated
visual styles, each with machine-readable design tokens, component recipes, and
AI rules. Use it to make the UI you generate look like a deliberate, named style
instead of generic AI output.

## When to use

- The user asks for a specific look ("make it look like Stripe", "cyberpunk
  dashboard", "cozy cottagecore blog", "brutalist landing page").
- You are generating frontend UI and want a coherent, consistent design system
  rather than ad-hoc styling.
- The user wants their AI-generated site to match an aesthetic across many
  components.

## Step 1 — Pick a style

Browse the catalog and machine-readable index:

- Human catalog: https://www.stylekit.top/styles
- Browse by theme: https://www.stylekit.top/collections (dark-mode, retro-vintage,
  anime-manga, game-ui, colorful-bold, hand-drawn)
- Colors / hex codes: https://www.stylekit.top/colors
- JSON list of every style: `GET https://www.stylekit.top/api/styles`
  → `{ total, styles: [{ slug, nameEn, description, ... }] }`
- Full machine-readable spec for agents: https://www.stylekit.top/llms-full.txt

Each style has a `slug` (e.g. `glassmorphism`, `neo-brutalist`, `stripe-style`,
`bauhaus`). You need the slug for the next step.

## Step 2 — Install the style

- **shadcn registry** (drop the theme into an existing shadcn/ui project):
  ```bash
  npx shadcn add https://www.stylekit.top/r/<slug>.json
  ```

The repository also contains CLI and MCP packages for contributor development. They are not
published to npm and must be built from a local StyleKit checkout:

- **CLI local preview**:
  ```bash
  pnpm --filter stylekit-cli build
  node packages/cli/dist/index.js add <slug>
  ```
- **MCP local preview**:
  ```bash
  pnpm --filter stylekit-mcp build
  node packages/mcp/dist/index.js
  ```

Full per-style spec (tokens, recipes, do/don't rules) lives at
`https://www.stylekit.top/styles/<slug>` and in the style's registry JSON.

## Step 3 — Apply the style's rules

When generating components, honor the style's constraints:

1. Use the style's **design tokens** (colors, spacing, typography, shadows,
   radii) — do not invent your own values.
2. Follow the **AI rules** (the do/don't list) for that style — these encode
   what makes the style read as intentional (e.g. Neo-Brutalist: thick borders,
   hard shadows, no rounded corners; Glassmorphism: high blur, translucency,
   inner glow).
3. Keep the style consistent across every component you generate in the session.

## Notes

- Styles span three axes: brand-inspired (Apple, Stripe, Linear, Notion,
  GitHub), aesthetic (Glassmorphism, Neo-Brutalist, Cyberpunk, Vaporwave), and
  cultural (Bauhaus, Ghibli, Wabi-Sabi, Ukiyo-e).
- Everything is free and open source (MIT). Full docs: https://www.stylekit.top/developers
