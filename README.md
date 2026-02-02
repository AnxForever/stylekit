# StyleKit

<p align="center">
  <strong>AI-Friendly Design System with 16+ Visual Styles</strong>
</p>

<p align="center">
  <a href="#features">Features</a> |
  <a href="#quick-start">Quick Start</a> |
  <a href="#styles">Styles</a> |
  <a href="#api">API</a> |
  <a href="#contributing">Contributing</a>
</p>

<p align="center">
  <img alt="Next.js" src="https://img.shields.io/badge/Next.js-16-black?logo=next.js" />
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?logo=react" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript" />
  <img alt="License" src="https://img.shields.io/badge/License-MIT-green" />
</p>

---

StyleKit is a design system toolkit that helps AI generate consistent, high-quality UI code. It provides clear style specifications, design tokens, component recipes, and prompt templates that guide AI to output beautiful, style-consistent frontend code.

## Features

- **16+ Visual Styles** - Neo-Brutalist, Glassmorphism, Neumorphism, Editorial, Cyberpunk, and more
- **25+ UI Components** - Built on Radix UI with full accessibility support
- **Design Tokens** - Export CSS variables, Tailwind presets, and Figma tokens
- **AI Prompt Builder** - Generate v0-style prompts with the three-element framework
- **Smart Recommender** - Context-aware design suggestions based on audience and brand
- **Style Linter** - Validate code against specific design styles
- **Gradient Library** - 24 curated gradients across 8 categories
- **Skills.sh Integration** - Use as an AI coding skill
- **llms.txt Support** - AI-discoverable documentation

## Quick Start

```bash
# Clone the repository
git clone https://github.com/AnxForever/stylekit.git
cd stylekit

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

## Styles

| Style | Best For | Key Feature |
|-------|----------|-------------|
| Neo-Brutalist | Creative, Portfolio | Bold borders, hard shadows |
| Glassmorphism | Modern SaaS, Landing | Frosted glass, blur effects |
| Neumorphism | Soft UI, Forms | Embossed/debossed depth |
| Editorial | Blog, Magazine | Typography-first, elegant |
| Cyberpunk Neon | Gaming, Tech | Neon glow, dark theme |
| Modern Gradient | Startup, Marketing | Vibrant color gradients |
| Bento Grid | Dashboards, Portfolios | Grid-based layouts |
| Corporate Clean | Business, Enterprise | Professional, minimal |

[View all 16 styles](https://stylekit.cc/styles)

## API

StyleKit provides REST APIs for programmatic access:

```bash
# List all styles
GET /api/styles

# Get style pack with tokens
GET /api/styles/{slug}

# Get design tokens only
GET /api/styles/{slug}/tokens

# Get component recipes
GET /api/styles/{slug}/recipes

# Search design knowledge
GET /api/knowledge/search?q=button

# Smart design recommendations
POST /api/knowledge/smart

# Lint code against style
POST /api/lint
```

## Using with AI

### Skills.sh

```bash
npx skills add AnxForever/stylekit
```

### llms.txt

StyleKit provides AI-friendly documentation at `/llms.txt` and `/llms-full.txt` endpoints.

### Prompt Builder

Use the [Prompt Builder](https://stylekit.cc/prompt-builder) to generate AI prompts with:

- **Product Surface** - What components and features
- **Context of Use** - Who uses it and when
- **Constraints & Taste** - Style preferences and requirements

### Developer Portal

Visit `/developers` to access comprehensive integration guides, including:

- **Linter Integration** - How to use the Style Linter in your CI/CD
- **Smart Recommender** - Using the recommendation engine API
- **Figma Integration** - Syncing tokens with Figma

## Tech Stack

- **Next.js 16** + Turbopack
- **React 19**
- **Tailwind CSS 4**
- **Radix UI** - Accessible primitives
- **TypeScript 5** - Strict mode
- **Lucide React** - Icons

## Project Structure

```
app/
  ├── page.tsx              # Home
  ├── components/           # Component showcase
  ├── prompt-builder/       # AI prompt generator
  ├── styles/               # Style gallery & details
  └── api/                  # REST APIs
components/
  ├── ui/                   # UI component library
  └── layout/               # Layout components
lib/
  ├── styles/               # Style definitions & tokens
  ├── gradients/            # Gradient library
  └── prompt-builder/       # Prompt generation logic
skills/
  └── stylekit/             # Skills.sh package
```

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run lint     # Code linting
npm run test     # Run tests
```

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting a PR.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with care by the StyleKit Team
</p>
