# stylekit-cli

Command-line tool for [StyleKit](https://stylekit.top) — browse 148 design styles and pull design tokens, component recipes, and shadcn install commands straight from your terminal. Works **offline** (served from the bundled `stylekit-core`).

## Usage

```bash
npx -y stylekit-cli@0.1.4 <command> [args] [flags]
```

The `0.1.4` public beta is self-contained and works offline from a clean
directory. Pin the version when scripting against JSON output.

## Commands

| Command | What it does |
|---------|--------------|
| `list` | List all styles (`--category <c>`, `--limit <n>`) |
| `search <query>` | Search styles by keyword |
| `show <slug>` | Show a style's full detail (philosophy, palette, do/don't, quality signals) |
| `tokens <slug>` | Print a style's design tokens as JSON |
| `recipe <slug> <component>` | Print a rendered component recipe (className + code) |
| `brief <slug>` | Complete implementation JSON, merged lint rules and provenance (0.2.0) |
| `lint <slug> <files...>` | Static rule checks, JSON/GitHub output and exit codes (0.2.0) |
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

## 0.2.0 release candidate

The new commands are available in the locally built 0.2.0 candidate. Public
installs need that release to be published; the 0.1.4 package has no lint command.

```bash
node packages/cli/dist/index.js brief neo-brutalist > style-spec.json
node packages/cli/dist/index.js lint neo-brutalist 'src/**/*.tsx' --json
node packages/cli/dist/index.js lint --style neo-brutalist --files 'src/**/*.tsx' --format github
node packages/cli/dist/index.js lint neo-brutalist --stdin --component button --strict --json
```

Lint returns `pass`, `fail`, or `inconclusive`; exit codes are 0, 1, and 3.
Usage/file errors use exit 1. Runtime expressions and unreadable sources cannot
pass. Required checks cover the whole input file and are advisory unless
`--strict` is used with `--component`. Use a single component snippet for strict
checks. Paths, directories, repeated `--files`, and `*`/`**`/`?` globs are supported.
Completed JSON lint reports go to stdout even when the check fails.
