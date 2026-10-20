# stylekit-mcp

MCP server for [StyleKit](https://stylekit.top) — search design styles and retrieve templates, assets, tokens, recipes, and lint checks from Claude, Cursor, or Windsurf.

The server runs locally over stdio using the official MCP SDK. It bundles `stylekit-core`; the published process depends on `@modelcontextprotocol/sdk` and `zod`, and needs network access only for live catalogue data and remote assets. It is MIT-licensed.

## Tools

All tools are read-only.

| Tool | What it does |
|------|--------------|
| `stylekit_search_styles` | Search styles by keyword and/or category |
| `stylekit_list_assets` | Browse public templates and design assets by kind or query, with pagination and source provenance |
| `stylekit_get_asset` | Retrieve a namespaced public asset detail and any source files the license permits |
| `stylekit_get_implementation_brief` | Complete brief by default, or selected sections and component templates with a completeness marker |
| `stylekit_get_style` | Full style profile: philosophy, palette, do/don't rules, quality/capability signals |
| `stylekit_get_style_tokens` | Typed design tokens: border, shadow, typography, spacing, colors |
| `stylekit_get_component_recipe` | Rendered component `className` + JSX with optional variant, parameter, and slot values |
| `stylekit_get_shadcn_install` | The `npx shadcn add` command for a style's theme |
| `stylekit_lint_code` | Check generated UI code against a style's rules, with a reason and a fix per violation |

`stylekit_lint_code` is the one worth building into your loop: call it after the
agent writes UI code, so a style's constraints are **verified rather than
assumed**. It resolves variant prefixes (`dark:`, `md:`, `hover:`) before
matching, and understands JSX/HTML class attributes, `cn()`/`clsx()` calls, and
template literals.

## Recipe options and brief projections

`stylekit_get_component_recipe` accepts optional `variant`, `params`, and
`slots` fields. `params` and `slots` are JSON objects. For example:

```json
{
  "slug": "broadcast-glitch",
  "component": "button",
  "variant": "cyan",
  "params": { "size": "lg", "fullWidth": true },
  "slots": { "label": "RUN REPORT" }
}
```

The renderer validates the requested variant, parameter ids and values, and
slot ids and values. Invalid options return a tool error rather than silently
falling back to the default recipe.
Text and unspecified slots are escaped. Icon slots accept an empty value or a
component/member name such as `ArrowRight`; `children` and `element` slots insert
raw JSX/HTML, so pass only trusted code to those slots.

`stylekit_get_implementation_brief` returns the complete contract when only
`slug` is supplied. To reduce context size, pass `sections` as a list chosen
from `identity`, `guidance`, `colors`, `globalCss`, `variants`, `components`,
`tokens`, `recipes`, `readiness`, and `lintRules`. Pass `components` to filter
component templates or recipes when `sections` includes `components` or
`recipes`:

```json
{
  "slug": "neo-brutalist",
  "sections": ["guidance", "components", "recipes", "tokens"],
  "components": ["button"]
}
```

Every brief includes `projection.complete`, `projection.mode`, included and
excluded section names, and a notice explaining whether it is complete. Keep
`provenance.contentHash` with stored briefs so consumers can detect content
drift.

## Setup

Add this configuration once to your MCP client:

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["-y", "--prefer-online", "stylekit-mcp@latest"]
    }
  }
}
```

- **Claude Desktop / Claude Code**: `claude_desktop_config.json` or `.mcp.json`
- **Cursor**: `.cursor/mcp.json`
- **Windsurf**: the Windsurf MCP config

When the client starts the MCP process, `npx` checks npm for the current
`latest` release, including when the package is already cached. A running MCP
process does not replace itself; restart the server or client to load an update.
For a reproducible setup, replace `stylekit-mcp@latest` with an exact published
version such as `stylekit-mcp@0.4.1`. The [npm caching options](https://docs.npmjs.com/cli/v11/commands/npm-exec/#a-note-on-caching)
describe how `--prefer-online` handles cached packages.

To run a locally built copy instead, point your client at the absolute path:

```json
{
  "mcpServers": {
    "stylekit": { "command": "node", "args": ["/abs/path/to/packages/mcp/dist/index.js"] }
  }
}
```

## Public assets

`stylekit_list_assets` accepts optional `kind` and `query` filters plus
`offset`/`limit`. It returns a structured page with the namespace, content level,
availability, license and attribution metadata, and whether the page came from
the live API or bundled snapshot. An offset beyond the last result is an empty
successful page.

`stylekit_get_asset` returns the complete asset detail as structured data and
JSON text. `contentLevel` tells you what is actually available: `source` and
`remote` assets can include source files; `metadata` and `restricted` entries do
not. `availability` distinguishes bundled, remote, external and restricted
content. External and restricted entries provide metadata or source links only;
they are not represented as downloadable full source. Remote templates require
the live API to return their actual file set; if that source is unavailable, the
tool reports an error instead of returning a placeholder as code.

`stylekit_get_shadcn_install` returns the theme command and its prerequisites.
This registry command targets Tailwind CSS v4. The target project must have
`components.json` configured with `tailwind.css` and CSS variables enabled, and
must contain `tsconfig.json`. For Tailwind v3, use the local Style Pack's
legacy HSL `<slug>-variables.css` and Tailwind v3 `<slug>-tailwind-preset.js`
artifacts instead of this registry endpoint. The current theme item has no
TypeScript source files, but shadcn still loads the project TypeScript
configuration while applying it.

## Example

In your editor's AI chat:

> "Search StyleKit for a frosted glass style, then give me its button recipe and the shadcn install command."

The agent calls `stylekit_search_styles` → `stylekit_get_component_recipe` → `stylekit_get_shadcn_install` and hands back ready-to-use code.

## Development

```bash
pnpm --filter stylekit-core build
pnpm --filter stylekit-mcp build
pnpm --filter stylekit-mcp test  # smoke-test all tools over stdio
```

Recipe options and brief projections are present in this repository source and
require a rebuilt package plus a new npm release before `stylekit-mcp@latest`
consumers receive them. To exercise this checkout, build `stylekit-core` first,
then `stylekit-mcp`, and point your MCP client at `packages/mcp/dist/index.js`
as shown in Setup.

## License

MIT

## Release contents

The published MCP package includes the public asset tools, source provenance,
and discovery reliability fixes described above. It bundles `stylekit-core`;
the runtime npm dependencies remain the MCP SDK and Zod.

Call the brief tool before generation and save its `stylekit-brief-v1` payload
for later validation. `provenance.source` identifies the data origin;
`contentHash` detects drift.

Lint returns `status: pass | fail | inconclusive`. `ok` is true only for a
conclusive static pass. Runtime expressions are reported as inconclusive unless
known literals already contain a violation. Missing requirements are advisory;
pass `strict: true` and `checkRequired: ["button"]` to fail them in a static
component snippet. Required checks cover the entire input, not each element.
These checks do not certify visual quality or accessibility.
The lint adapter accepts supported `stylekit-lint-v1` and
`stylekit-lint-v2` rule contracts; unsupported or malformed contracts produce
an explicit tool error.
