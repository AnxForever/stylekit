# stylekit-cli

Command-line tool for [StyleKit](https://stylekit.top) — browse design styles, inspect public assets, and pull design tokens, component recipes, and shadcn install commands from your terminal. Discovery uses stylekit-core@beta with a bundled catalogue fallback.

## Usage

```bash
npx -y --prefer-online stylekit-cli@latest <command> [args] [flags]
```

This checks npm for the latest release whenever you run the command, even if a
copy is already cached. Use an exact published version (for example
`stylekit-cli@0.3.1`) when a script needs repeatable output. `--prefer-online`
behavior is documented in [npm's cache options](https://docs.npmjs.com/cli/v11/commands/npm-exec/#a-note-on-caching).

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
| assets | List public assets with kind, query, offset and limit filters |
| asset <kind> <id> | Inspect one asset by namespace and ID |

Commands accept --json for machine-readable output. Style list/search use a
{ total, count, results } envelope. Asset commands preserve the Core source
envelope and namespaced metadata. List data includes schemaVersion, assets,
total, offset, limit, hasMore and kindCounts. Each list entry carries its kind,
ID, name and availability (bundled, remote, external or restricted). Detail
results contain the namespaced metadata object. Empty pages are successful.
Errors use { error, code } plus source metadata when relevant. --help and
--version are available.

## Examples

```bash
stylekit list --category retro
stylekit search glass
stylekit show neo-brutalist
stylekit tokens glassmorphism > tokens.json
stylekit recipe glassmorphism button
stylekit add synthwave
stylekit assets --kind template --limit 10
stylekit assets --query "dashboard" --offset 10 --limit 5 --json
```

Copy a result's kind and ID from the asset list when running the detail command.

## License

MIT

## Implementation briefs and static checks

The brief and lint commands are included in the published 0.2.0 release.
The asset commands are included in CLI 0.3.x and use
stylekit-core@beta. Changes in the working tree require a release before
npm consumers receive them.

```bash
node packages/cli/dist/index.js brief neo-brutalist > style-spec.json
node packages/cli/dist/index.js lint neo-brutalist 'src/**/*.tsx' --json
node packages/cli/dist/index.js lint --style neo-brutalist --files 'src/**/*.tsx' --format github
node packages/cli/dist/index.js lint neo-brutalist --stdin --component button --strict --json
node packages/cli/dist/index.js assets --kind template --limit 10 --json
```

Lint returns `pass`, `fail`, or `inconclusive`; exit codes are 0, 1, and 3.
Usage/file errors use exit 1. Runtime expressions and unreadable sources cannot
pass. Required checks cover the whole input file and are advisory unless
`--strict` is used with `--component`. Use a single component snippet for strict
checks. Paths, directories, repeated `--files`, and `*`/`**`/`?` globs are supported.
Completed JSON lint reports go to stdout even when the check fails. An
unavailable remote asset returns a nonzero exit code with explicit source
metadata and no bundled placeholder presented as full source. External and
restricted assets retain their availability metadata and URLs without
invented source content.
