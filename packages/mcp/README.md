# stylekit-mcp

MCP server for [StyleKit](https://stylekit.top) — search 148 design styles and pull design tokens, component recipes, and shadcn install commands directly from Claude, Cursor, or Windsurf.

Runs locally over stdio and serves everything **offline** from the bundled `stylekit-core`.

## Tools

All tools are read-only.

| Tool | What it does |
|------|--------------|
| `stylekit_search_styles` | Search styles by keyword and/or category |
| `stylekit_get_style` | Full style profile: philosophy, palette, do/don't rules, quality/capability signals |
| `stylekit_get_style_tokens` | Typed design tokens: border, shadow, typography, spacing, colors |
| `stylekit_get_component_recipe` | Rendered component `className` + JSX (button/card/input) |
| `stylekit_get_shadcn_install` | The `npx shadcn add` command for a style's theme |

## Setup

The public beta is available from npm. Add the following to your MCP client
config:

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["-y", "stylekit-mcp"]
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
