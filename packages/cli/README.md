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
| `recipe <slug> <component>` | Render a component recipe with optional variant, parameter, and slot values |
| `brief <slug>` | Complete implementation JSON by default, or selected sections and component templates |
| `lint <slug> <files...>` | Static rule checks, JSON/GitHub output and exit codes (0.2.0) |
| `doctor` | Inspect a project for package, Tailwind, shadcn, and CSS entry readiness |
| `add <slug>` | Print the install command, inspect a target plan, or explicitly apply it |
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
node packages/cli/dist/index.js brief neo-brutalist --sections components,recipes --components button --json
node packages/cli/dist/index.js lint neo-brutalist 'src/**/*.tsx' --json
node packages/cli/dist/index.js lint --style neo-brutalist --files 'src/**/*.tsx' --format github
node packages/cli/dist/index.js lint neo-brutalist --stdin --component button --strict --json
node packages/cli/dist/index.js assets --kind template --limit 10 --json
```

Recipe rendering accepts JSON objects for `--params` and `--slots`:

```bash
stylekit recipe broadcast-glitch button --variant cyan --params '{"size":"lg","fullWidth":true}' --slots '{"label":"RUN REPORT"}' --json
```

Text slots (including slots without an explicit type) are emitted as escaped text. Icon slots accept an empty value or a JSX component/member name such as `ArrowRight` or `Icons.ArrowRight`. `children` and `element` slots insert raw JSX/HTML code, so use only trusted code with those slot types.

`brief <slug>` still returns the full contract by default. Add `--sections`
with a comma-separated list (or repeat the flag), and optionally `--components`
to keep only named component templates or recipes when `components` or `recipes`
is included. Brief JSON
keeps its schema and provenance fields and adds `projection.complete`,
`projection.includedSections`, `projection.excludedSections`, and a notice so
callers can distinguish a partial contract from a full one.

Project commands use the current directory unless `--cwd` supplies a target:
The StyleKit registry add command supports Tailwind CSS v4 only. Its target
must be initialized for shadcn with `components.json` configured for
`tailwind.css` and CSS variables, and it must contain `tsconfig.json`. For
Tailwind v3, use the Style Pack's legacy HSL `<slug>-variables.css` and
Tailwind v3 `<slug>-tailwind-preset.js` artifacts instead of the registry
command. The current theme has no TypeScript source files, but shadcn still
loads the project TypeScript configuration while applying it.

```bash
stylekit doctor --cwd ./my-app
stylekit add synthwave --cwd ./my-app --dry-run --json
stylekit add synthwave --cwd ./my-app --apply --json
```

`add <slug>` without project flags keeps printing the install command. A target
directory without `--apply` produces a read-only plan. `--dry-run` also returns
that plan and never writes files or starts a package manager. Only `--apply`
starts the planned shadcn command; its JSON includes the exact process result,
files observed as changed, CSS variable differences, and explicit fields for
what remains unverified.
`doctor` exits nonzero when project blockers are present; warnings alone keep
exit code 0. A read-only `add --dry-run` or `add --cwd` plan exits nonzero when
the plan has blockers and includes the full inspection and plan in JSON output.

These recipe options, brief projections, and project commands are implemented
in repository source; the current npm package does not include them until a new
release. To use this checkout locally, build `stylekit-core` first, then
`stylekit-cli`, run `pnpm --filter stylekit-cli test`, and invoke
`node packages/cli/dist/index.js ...`.

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
The lint adapter supports `stylekit-lint-v1` and `stylekit-lint-v2` rule
contracts; unsupported or malformed contracts return an explicit error.
