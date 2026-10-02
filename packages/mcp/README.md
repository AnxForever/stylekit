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
| `stylekit_get_implementation_brief` | Complete AI guidance, CSS, templates, recipes, tokens, readiness, merged lint rules and provenance (0.3.0) |
| `stylekit_get_style` | Full style profile: philosophy, palette, do/don't rules, quality/capability signals |
| `stylekit_get_style_tokens` | Typed design tokens: border, shadow, typography, spacing, colors |
| `stylekit_get_component_recipe` | Rendered component `className` + JSX (button/card/input) |
| `stylekit_get_shadcn_install` | The `npx shadcn add` command for a style's theme |
| `stylekit_lint_code` | Check generated UI code against a style's rules, with a reason and a fix per violation |

`stylekit_lint_code` is the one worth building into your loop: call it after the
agent writes UI code, so a style's constraints are **verified rather than
assumed**. It resolves variant prefixes (`dark:`, `md:`, `hover:`) before
matching, and understands JSX/HTML class attributes, `cn()`/`clsx()` calls, and
template literals.

## Setup

Install the published `stylekit-mcp@0.4.0` package from npm with `npx`. Add the
following to your MCP client config:

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["-y", "stylekit-mcp@0.4.0"]
    }
  }
}
```

- **Claude Desktop / Claude Code**: `claude_desktop_config.json` or `.mcp.json`
- **Cursor**: `.cursor/mcp.json`
- **Windsurf**: the Windsurf MCP config

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

## Example

In your editor's AI chat:

> "Search StyleKit for a frosted glass style, then give me its button recipe and the shadcn install command."

The agent calls `stylekit_search_styles` → `stylekit_get_component_recipe` → `stylekit_get_shadcn_install` and hands back ready-to-use code.

## Development

```bash
pnpm --filter stylekit-mcp build # compile to dist/
node scripts/smoke.mjs  # smoke-test all tools over stdio
```

## License

MIT

## Release contents

`stylekit-mcp@0.4.0` and `stylekit-core@beta` include the public asset tools,
source provenance, and the discovery reliability fixes described above. The
MCP package bundles `stylekit-core`; the runtime npm dependencies remain the MCP
SDK and Zod.

Call the brief tool before generation and save its `stylekit-brief-v1` payload
for later validation. `provenance.source` identifies the data origin;
`contentHash` detects drift.

Lint returns `status: pass | fail | inconclusive`. `ok` is true only for a
conclusive static pass. Runtime expressions are reported as inconclusive unless
known literals already contain a violation. Missing requirements are advisory;
pass `strict: true` and `checkRequired: ["button"]` to fail them in a static
component snippet. Required checks cover the entire input, not each element.
These checks do not certify visual quality or accessibility.
