# stylekit-cli

Command-line tool for [StyleKit](https://stylekit.top) — browse 120+ design styles and pull design tokens, component recipes, and shadcn install commands straight from your terminal. Works **offline** (served from the bundled `stylekit-core`).

## Usage

```bash
npx stylekit-cli <command> [args] [flags]
```

> Not yet published to npm. Until then, build locally and run `node packages/cli/dist/index.js <command>` after `pnpm build`.

## Commands

| Command | What it does |
|---------|--------------|
| `list` | List all styles (`--category <c>`, `--limit <n>`) |
| `search <query>` | Search styles by keyword |
| `show <slug>` | Show a style's full detail (philosophy, palette, do/don't) |
| `tokens <slug>` | Print a style's design tokens as JSON |
| `recipe <slug> <component>` | Print a rendered component recipe (className + code) |
| `add <slug>` | Print the `npx shadcn add` command for the style's theme |

Every command accepts `--json` for machine-readable output. `--help` / `--version` are available.

## Examples

```bash
stylekit list --category retro
stylekit search glass
stylekit show neo-brutalist
stylekit tokens glassmorphism > tokens.json
stylekit recipe glassmorphism button
stylekit add synthwave
```

## License

MIT
