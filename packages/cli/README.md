# stylekit-cli

Command-line tool for [StyleKit](https://stylekit.top) — browse 148 design styles and pull design tokens, component recipes, and shadcn install commands straight from your terminal. Works **offline** (served from the bundled `stylekit-core`).

## Usage

```bash
npx -y stylekit-cli@0.1.2 <command> [args] [flags]
```

The `0.1.2` public beta is self-contained and works offline from a clean
directory. The repository currently contains the newer `0.1.1` candidate; to
try that candidate without installing from npm, run from the repository root:

```bash
pnpm --filter stylekit-cli build
node packages/cli/dist/index.js <command>
```

The public beta and repository candidate may have different output contracts;
pin the version when scripting against JSON output.

## Commands

| Command | What it does |
|---------|--------------|
| `list` | List all styles (`--category <c>`, `--limit <n>`) |
| `search <query>` | Search styles by keyword |
| `show <slug>` | Show a style's full detail (philosophy, palette, do/don't, quality signals) |
| `tokens <slug>` | Print a style's design tokens as JSON |
| `recipe <slug> <component>` | Print a rendered component recipe (className + code) |
| `add <slug>` | Print the `npx shadcn add` command for the style's theme |

Every command accepts `--json` for machine-readable output. List/search JSON uses a `{ total, count, results }` envelope; errors use `{ error, code }`. `--help` / `--version` are available.

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
