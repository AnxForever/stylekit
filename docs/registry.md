# shadcn Registry

Every StyleKit style is published as a [shadcn registry](https://ui.shadcn.com/docs/registry) theme. You can install any style's color theme — light and dark — into an existing [shadcn](https://ui.shadcn.com) project with a single command, no copy-paste required.

## Quick Start

In any shadcn project, run:

```bash
npx shadcn add https://stylekit.top/r/glassmorphism.json
```

Replace `glassmorphism` with the slug of any style. The shadcn CLI fetches the URL, reads the theme item, and injects its CSS variables into your `globals.css`. After it finishes, your project's components pick up the StyleKit palette for both light and dark mode.

## Prerequisites

- A project that has already been initialized with shadcn (it has a `components.json` and a `globals.css`).
- **The project must contain a `tsconfig.json`.** The shadcn CLI inspects `tsconfig.json` to resolve paths; without it the command fails with:

  ```
  Couldn't find tsconfig.json
  ```

  If you hit this, add a `tsconfig.json` to the project root (even a minimal one) and run the command again.

## What gets installed

Each style is served as a shadcn `registry:theme` item. A theme item ships **no source files** — it only carries CSS variables, which the CLI writes directly into your stylesheet. Two sets are applied:

- `cssVars.light` — written to your `:root` block
- `cssVars.dark` — written to your `.dark` block

The variables cover the standard shadcn theme tokens, derived from the style's own design tokens:

| Group | Variables |
|-------|-----------|
| Surfaces | `background`, `foreground`, `card`, `card-foreground`, `popover`, `popover-foreground` |
| Brand | `primary`, `primary-foreground`, `secondary`, `secondary-foreground`, `accent`, `accent-foreground` |
| Support | `muted`, `muted-foreground`, `destructive`, `destructive-foreground` |
| Form / focus | `border`, `input`, `ring` |
| Shape | `radius` |

### Tailwind v4 compatibility

Values are stored as bare HSL channels (for example `0 0% 100%`). When you install into a Tailwind v4 project, the shadcn CLI wraps each value as `hsl(...)` and generates the matching `@theme inline` block automatically, so the variables are usable as Tailwind utilities without extra configuration. Tailwind v3 projects work too — the CLI adapts the output to the detected setup.

## Finding a style slug

A slug is the kebab-case identifier in a style's URL, for example `glassmorphism`, `neo-brutalist`, or `bento-grid` (`https://stylekit.top/styles/neo-brutalist`).

You can list every available style — all 146 — from the registry index:

```bash
curl https://stylekit.top/registry.json
```

Or browse them visually in the [styles gallery](https://stylekit.top/styles).

## Endpoints

| Endpoint | Returns |
|----------|---------|
| `GET /registry.json` | The registry index: every style as a lightweight `{ name, type, title, description }` entry. |
| `GET /r/<slug>.json` | One style as a full shadcn `registry:theme` item, including `cssVars` for light and dark. |

Both responses follow the official shadcn schemas ([`registry.json`](https://ui.shadcn.com/docs/registry/registry-json) and [`registry-item.json`](https://ui.shadcn.com/docs/registry/registry-item-json)).

### Registry index shape

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry.json",
  "name": "stylekit",
  "homepage": "https://stylekit.top",
  "items": [
    {
      "name": "glassmorphism",
      "type": "registry:theme",
      "title": "Glassmorphism",
      "description": "..."
    }
  ]
}
```

### Registry item shape

```json
{
  "$schema": "https://ui.shadcn.com/schema/registry-item.json",
  "name": "glassmorphism",
  "type": "registry:theme",
  "title": "Glassmorphism",
  "description": "...",
  "cssVars": {
    "light": {
      "background": "0 0% 100%",
      "foreground": "0 0% 3.9%",
      "primary": "...",
      "radius": "0.5rem"
    },
    "dark": {
      "background": "0 0% 3.9%",
      "foreground": "0 0% 98%",
      "primary": "..."
    }
  },
  "files": []
}
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `Couldn't find tsconfig.json` | The target project has no `tsconfig.json`. | Add a `tsconfig.json` to the project root and re-run. |
| `Unknown style: <slug>` (404) | The slug does not exist. | Check the slug against [`/registry.json`](https://stylekit.top/registry.json) or the [styles gallery](https://stylekit.top/styles). |
| Variables not applied | The project was never initialized with shadcn. | Run `npx shadcn init` first, then add the theme. |

## See also

- [shadcn registry docs](https://ui.shadcn.com/docs/registry)
- [`STYLE_AUTHORING.md`](./STYLE_AUTHORING.md) — how StyleKit styles (and their tokens) are defined.
