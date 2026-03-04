<div align="center">

<img src="public/readme/home-hero.png" alt="StyleKit" width="100%" />

# StyleKit

**AI-Friendly Design System — 130+ Styles, 30+ Templates, One Toolkit**

[![Live Site](https://img.shields.io/badge/Live-www.stylekit.top-black?style=for-the-badge&logo=vercel)](https://www.stylekit.top)

[![Next.js 16](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![React 19](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green)](LICENSE)

[Features](#features) · [Quick Start](#quick-start) · [Styles](#styles) · [Templates](#templates) · [AI Integration](#ai-integration) · [API](#api) · [Contributing](#contributing)

</div>

---

StyleKit helps humans and AI generate consistent, high-quality UI code. It provides structured style specifications, design tokens, component recipes, and prompt templates — everything needed to go from "glassmorphism SaaS dashboard" to production-ready code.

## Features

**Design System** — 130+ visual styles with design tokens, component recipes, and export to CSS variables, Tailwind presets, shadcn themes, and Figma tokens.

**AI Tools** — Prompt builder (Surface + Context + Constraints), smart recommender, style linter, style analyzer, and style blender.

**Creative Tools** — Live code playground, style creator, side-by-side comparison, and design system generator.

**Platform** — OAuth auth, community ratings and comments, style submissions, bilingual (EN/ZH), PWA, dark/light mode.

## Quick Start

```bash
git clone https://github.com/AnxForever/stylekit.git
cd stylekit
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000). See [`.env.example`](.env.example) for optional Supabase and admin configuration.

## Styles

130+ styles across multiple categories:

| Category | Examples |
|----------|---------|
| Modern / Tech | Glassmorphism, Neumorphism, Bento Grid, Liquid Glass, Fluent Design |
| Brutalist | Neo-Brutalist, Neo-Brutalist Playful, Neo-Brutalist Soft |
| Brand-Inspired | Apple Style, Notion Style, Stripe Style |
| Retro / Vintage | Art Deco, Vaporwave, VHS Aesthetic, Y2K, Outrun |
| Artistic | Watercolor, Impressionist Oil, Pop Art, Risograph |
| Japanese / Anime | Ghibli Style, Cyber Anime, Shoujo Manga, Ukiyo-e |
| Cyberpunk | Cyberpunk Neon, Neon Samurai, Sci-Fi HUD, Mecha |
| Layout Patterns | Magazine Grid, Masonry Flow, Split Screen, Parallax |
| Nature / Cozy | Cottagecore, Scandinavian, Wabi-Sabi, Natural Organic |

[Browse all styles →](https://www.stylekit.top/styles)

## Templates

30+ production-ready page templates covering SaaS landing, admin panel, e-commerce, portfolio, editorial blog, dashboard, auth pages, docs site, pricing, and more.

[Browse all templates →](https://www.stylekit.top/templates)

## AI Integration

### MCP Server

Direct AI assistant integration via [Model Context Protocol](https://modelcontextprotocol.io):

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/tools/mcp/server.ts"]
    }
  }
}
```

### IDE Export

Export any style as `.cursorrules`, `claude-rules`, `windsurf-rules`, `tailwind-preset`, `shadcn-theme`, `figma-tokens`, or `skill-pack`.

### llms.txt

AI-discoverable docs at [`/llms.txt`](https://www.stylekit.top/llms.txt) and `/llms-full.txt`.

### CLI

```bash
pnpm run cli -- lint src/app.tsx --style glassmorphism
pnpm run cli -- recommend --audience developers --mood professional
pnpm run cli -- export neo-brutalist --format tailwind-preset
```

## API

RESTful API for programmatic access:

```
GET  /api/styles                      # List all styles
GET  /api/styles/{slug}               # Full style pack
GET  /api/styles/{slug}/tokens        # Design tokens
GET  /api/styles/{slug}/recipes       # Component recipes
POST /api/lint                        # Lint code against a style
POST /api/analyze-style               # Analyze existing code
POST /api/match-style                 # Match to closest style
GET  /api/knowledge/search?q=...      # Search design knowledge
GET  /api/knowledge/smart             # Smart recommendations
```

[Full API docs →](https://www.stylekit.top/developers/api)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 + Turbopack |
| UI | React 19, Radix UI, Lucide Icons |
| Styling | Tailwind CSS 4, CVA |
| Auth & DB | Supabase (OAuth, PostgreSQL) |
| Validation | Zod 4 |
| Testing | Vitest + Playwright |
| AI Protocol | MCP SDK |

## Contributing

Contributions welcome. Please read these before opening a PR:

1. [`CONTRIBUTING.md`](docs/CONTRIBUTING.md)
2. [`STYLE_ADDITION_CHECKLIST.md`](docs/STYLE_ADDITION_CHECKLIST.md) — required for new styles

```bash
git checkout -b feat/your-feature
pnpm lint && pnpm test && pnpm build
git commit -m "feat: add your feature"
```

## License

MIT — see [LICENSE](LICENSE).

---

<div align="center">

**[www.stylekit.top](https://www.stylekit.top)**

Built by [AnxForever](https://github.com/AnxForever)

</div>
