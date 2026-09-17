<p align="center">
  <a href="https://stylekit.top">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/readme/logo-dark.svg">
      <source media="(prefers-color-scheme: light)" srcset="public/readme/logo-light.svg">
      <img alt="StyleKit" src="public/readme/logo-light.svg" width="280">
    </picture>
  </a>
</p>

<p align="center">
  <strong>An open-source visual style library for AI-generated web interfaces.</strong><br>
  148 curated styles, each with design tokens, component recipes, Tailwind-ready constraints, and copy-ready prompts.
</p>

<p align="center">
  <a href="https://stylekit.top"><img src="https://img.shields.io/badge/Live-www.stylekit.top-black?style=flat-square" alt="Live Site"></a>
  <a href="https://github.com/AnxForever/stylekit/stargazers"><img src="https://img.shields.io/github/stars/AnxForever/stylekit?style=flat-square&color=f59e0b" alt="Stars"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-green?style=flat-square" alt="License"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js" alt="Next.js 16"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript" alt="TypeScript"></a>
</p>

<p align="center">
  <strong>English</strong> &middot; <a href="README.zh-CN.md">简体中文</a>
</p>

<br>

<p align="center">
  <a href="https://stylekit.top">
    <img src="public/readme/home-hero.png" alt="StyleKit Preview" width="100%">
  </a>
</p>

<p align="center">
  <a href="https://www.stylekit.top/en/styles"><strong>Styles</strong></a> &middot;
  <a href="https://www.stylekit.top/en/templates"><strong>Templates</strong></a> &middot;
  <a href="https://www.stylekit.top/en/animations"><strong>Animations</strong></a> &middot;
  <a href="#contributing"><strong>Contributing</strong></a>
</p>

<br>

---

## What is StyleKit?

Ask an AI to build you a landing page and you get something that works and looks
like every other AI-built landing page. The problem is not the model — it is that
"make it look good" is not a specification.

StyleKit turns a visual direction into something an agent can actually follow: a
named style with real tokens, hard constraints, and a demo you can look at first.
Pick one, and the output stops drifting.

It does not guarantee a production-ready interface. Integration and completeness
still depend on your project.

## Quick start

```bash
git clone https://github.com/AnxForever/stylekit.git
cd stylekit
pnpm install
pnpm dev
```

Open [localhost:3000](http://localhost:3000). See [`.env.example`](.env.example)
for optional Supabase and admin configuration.

## Three ways to use it

### 1. Install a style into an existing shadcn project

Every style is published as a [shadcn registry](https://ui.shadcn.com/docs/registry)
theme. One command adds its light and dark `cssVars` to your `globals.css`:

```bash
npx shadcn add https://stylekit.top/r/glassmorphism.json
```

Swap `glassmorphism` for any slug. Works with Tailwind v4.

> The target project needs a `tsconfig.json`, or the shadcn CLI exits with
> `Couldn't find tsconfig.json`. Full guide: [`docs/registry.md`](docs/registry.md).

### 2. Give your coding agent the whole library

```bash
npx skills add AnxForever/stylekit-skill
```

Claude Code, Cursor, Windsurf, and any Agent-Skills-compatible tool can then
apply any of the 148 styles on request — "make this look like Stripe", "cyberpunk
dashboard" — using the correct tokens and rules. The skill lives in
[`AnxForever/stylekit-skill`](https://github.com/AnxForever/stylekit-skill).

### 3. Call it over MCP

```bash
npx -y stylekit-mcp
```

Exposes search, tokens, component recipes, and a `stylekit_lint_code` tool that
checks whether generated UI code actually follows the style's rules. See
[`packages/mcp/README.md`](packages/mcp/README.md).

## Styles

148 styles in ten families — Modern & Tech, Brutalist, Brand-Inspired (Apple,
Stripe, Notion, GitHub), Retro & Vintage, Artistic, Japanese & Anime, Cyberpunk
& Sci-Fi, Layout Patterns, Cultural & Regional, Nature & Cozy.

Every style ships tokens, component code, AI rules, and a full-page live demo.

**[Browse all 148 →](https://www.stylekit.top/en/styles)**

## What else is in here

- **60 animations** with live preview and one-click copy
- **36 page templates** — SaaS, dashboard, e-commerce, portfolio, blog
- **Export anywhere** — Tailwind preset, shadcn theme, CSS variables, Figma tokens
- **IDE rules** — `.cursorrules`, `claude-rules`, `windsurf-rules`
- **Bilingual** — full English and Chinese, with localized routing
- **Machine-readable** — [`/llms.txt`](https://stylekit.top/llms.txt),
  [`/llms.md`](https://stylekit.top/llms.md),
  [`/llms-full.txt`](https://stylekit.top/llms-full.txt), and a documented HTTP
  API ([`docs/API.md`](docs/API.md))

## Guides for building frontends with AI

Practical walkthroughs on the site, for when the problem is the workflow rather
than the style:

- [Fix an AI-generated website that looks bad](https://www.stylekit.top/en/ai-generated-website-fix)
- [How to choose AI web design tools](https://www.stylekit.top/en/ai-web-design-tools)
- [AI UI generation](https://www.stylekit.top/en/ai-ui-generator) — turn a page brief into a usable interface structure
- [AI frontend workflow](https://www.stylekit.top/en/ai-frontend-workflow)
- [中文：AI 网页设计工具](https://www.stylekit.top/zh/ai-web-design-tools) · [AI 前端工作流](https://www.stylekit.top/zh/ai-frontend-workflow)

## Contributing

Contributions welcome. Read these before opening a PR:

1. [`docs/CONTRIBUTING.md`](docs/CONTRIBUTING.md)
2. [`docs/STYLE_ADDITION_CHECKLIST.md`](docs/STYLE_ADDITION_CHECKLIST.md) — required for new styles
3. [`docs/STYLE_AUTHORING.md`](docs/STYLE_AUTHORING.md) — how a style is written, before you add or change one

```bash
git checkout -b feat/your-feature
pnpm lint && pnpm test && pnpm build
git commit -m "feat: add your feature"
```

Working on the codebase? [`docs/PROJECT_STRUCTURE.md`](docs/PROJECT_STRUCTURE.md)
maps the repository, and [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md) covers how
production is served.

## Support this project

If StyleKit helped you, a star is already a lot. If you want to go further,
there is a support page on the site covering server and domain costs —
[stylekit.top/contact#support-maintenance](https://stylekit.top/contact#support-maintenance).
中文读者欢迎扫码支持，金额随意。

## Star history

<a href="https://star-history.com/#AnxForever/stylekit&Date">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=AnxForever/stylekit&type=Date" />
  </picture>
</a>

## Contributors

<a href="https://github.com/AnxForever/stylekit/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=AnxForever/stylekit" alt="StyleKit contributors" />
</a>

## License

MIT — see [LICENSE](LICENSE).

---

<p align="center">
  <a href="https://stylekit.top"><strong>www.stylekit.top</strong></a>
  <br>
  Built by <a href="https://github.com/AnxForever">AnxForever</a>
</p>
