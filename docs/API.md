# HTTP API

Stable JSON endpoints for published style metadata, tokens, recipes, and rules.
Useful when you want StyleKit data in a build step, a script, or an agent that
does not speak MCP.

```http
GET  /api/styles                      # List all styles
GET  /api/styles/{slug}               # Style record (tokens + recipes + rules)
GET  /api/styles/{slug}/tokens        # Design tokens only
GET  /api/styles/{slug}/recipes       # Component recipes only
GET  /api/styles/stats                # Aggregate views, favorites, and ratings per style
```

All endpoints are read-only and return `application/json`. Only published styles
are exposed.

## Related

- [MCP server](../packages/mcp/README.md) — the same catalog as MCP tools, for
  Claude Code, Cursor, and other hosts.
- [Registry guide](./registry.md) — installing a style as a shadcn theme.
- [`/registry.json`](https://www.stylekit.top/registry.json) — the full slug list
  in shadcn registry format.
- [`/llms.txt`](https://stylekit.top/llms.txt) — machine-readable index of the
  documentation.
