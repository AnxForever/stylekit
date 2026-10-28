# stylekit-mcp

MCP server for [StyleKit](https://stylekit.top) — search design styles and retrieve templates, assets, tokens, recipes, lint checks, and repaired code from MCP clients such as Claude, ChatGPT, Claude Code, Codex CLI, Gemini CLI, VS Code, and Cursor.

The server uses the v2 MCP TypeScript SDK (`@modelcontextprotocol/server`) and serves both the 2026-07-28 stateless protocol and 2025-era `initialize` clients from one endpoint. Local stdio requires Node 20 or newer. It bundles `stylekit-core`; the published process depends on `@modelcontextprotocol/server`, `@modelcontextprotocol/node`, and `zod`. It is MIT-licensed.

The hosted endpoint is `https://www.stylekit.top/mcp`; the same tools can also
be self-hosted over Streamable HTTP (`--http`) for clients that cannot start a
local process.

## Tools

All tools are read-only.

| Tool | What it does |
|------|--------------|
| `stylekit_search_styles` | Search styles by keyword and/or category |
| `stylekit_list_assets` | Browse public templates and design assets by kind or query, with pagination and source provenance |
| `stylekit_get_asset` | Retrieve a namespaced public asset; `includeSource: false` or `files` limits source payload |
| `stylekit_get_implementation_brief` | Complete AI guidance, CSS, templates, recipes, tokens, readiness, merged lint rules and provenance; `sections` returns a subset |
| `stylekit_get_style` | Full style profile: philosophy, palette, do/don't rules, quality/capability signals |
| `stylekit_get_style_tokens` | Typed design tokens: border, shadow, typography, spacing, colors |
| `stylekit_get_component_recipe` | Rendered component `className` + JSX (button/card/input) |
| `stylekit_get_shadcn_install` | The `npx shadcn add` command for a style's theme |
| `stylekit_lint_code` | Check generated UI code against a style's rules, with a reason and a fix per violation |
| `stylekit_repair_code` | Rewrite violations into the style's own classes, reporting anything it cannot fix instead of guessing |

`stylekit_lint_code` and `stylekit_repair_code` are the pair worth building into
your loop: call `stylekit_lint_code` after the agent writes UI code, so a
style's constraints are **verified rather than assumed**, then call
`stylekit_repair_code` to get the corrected source back. Both resolve variant
prefixes (`dark:`, `md:`, `hover:`) before matching, and understand JSX/HTML
class attributes, `cn()`/`clsx()` calls, template literals, and bare class
strings.

Repair only applies replacements the style itself supplies. It never invents a
class, never rewrites a variable reference, and returns anything the rules flag
without a concrete replacement in `unfixed` for you to decide.

## Setup

### Remote endpoint (recommended)

`https://www.stylekit.top/mcp` is public, POST-only, rate-limited, and requires
no local process.

**Claude Code**

```bash
claude mcp add --transport http stylekit https://www.stylekit.top/mcp
```

**Codex CLI**

```bash
codex mcp add stylekit --url https://www.stylekit.top/mcp
```

**Gemini CLI** (`~/.gemini/settings.json` or `.gemini/settings.json`)

```json
{
  "mcpServers": {
    "stylekit": { "httpUrl": "https://www.stylekit.top/mcp" }
  }
}
```

**VS Code** (`.vscode/mcp.json`)

```json
{
  "servers": {
    "stylekit": { "type": "http", "url": "https://www.stylekit.top/mcp" }
  }
}
```

**Cursor** (`.cursor/mcp.json`)

```json
{
  "mcpServers": {
    "stylekit": { "url": "https://www.stylekit.top/mcp" }
  }
}
```

ChatGPT or Claude web connectors can use the same URL when the client accepts
an unauthenticated remote server. Connectors that require OAuth need an auth
front; this endpoint does not provide one.

### Local stdio

Use this for offline work, private code, or clients that only launch local
processes. Node 20+ is required.

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

When the client starts the MCP process, `npx` checks npm for the current
`latest` release, including when the package is already cached. A running MCP
process does not replace itself; restart the server or client to load an update.
For a reproducible setup, replace `stylekit-mcp@latest` with an exact published
version such as `stylekit-mcp@0.5.0`. The [npm caching options](https://docs.npmjs.com/cli/v11/commands/npm-exec/#a-note-on-caching)
describe how `--prefer-online` handles cached packages.

To run a locally built copy instead, point your client at the absolute path:

```json
{
  "mcpServers": {
    "stylekit": { "command": "node", "args": ["/abs/path/to/packages/mcp/dist/index.js"] }
  }
}
```

## Self-hosted HTTP mode

To run your own endpoint:

```bash
stylekit-mcp --http --host 127.0.0.1 --port 8787
```

The endpoint is `/mcp` and accepts `POST` only; `GET /healthz` is a public
health check. Every request gets its own server instance and responses are
JSON, so there is no session to resume, no event stream for a proxy to buffer,
and a `GET` or `DELETE` is answered with 405. The tools remain read-only.

Point a self-hosted client at its URL with the same shape. Set `MCP_HTTP_TOKEN`
to require a bearer token; leave it unset only for a public, rate-limited
endpoint. Body size defaults to 1 MB and the per-IP limit to 120 requests per
minute.

### Toolsets

The HTTP path selects a toolset on both the hosted and self-hosted endpoint,
so a generation-focused client does not load the asset tools:

| Path | Tools |
|------|-------|
| `/mcp` | all 10 |
| `/mcp/core` | search, implementation brief, lint, repair |
| `/mcp/assets` | list and get assets |
| `/mcp/design` | search, style, tokens, recipe, install, brief |

For stdio, set `STYLEKIT_MCP_TOOLSET=core|assets|design|all`.

| Variable | Default | Purpose |
|----------|---------|---------|
| `MCP_HTTP_HOST` | `127.0.0.1` | Bind address; keep loopback behind a reverse proxy |
| `MCP_HTTP_PORT` | random | Listen port |
| `MCP_HTTP_PATH` | `/mcp` | Endpoint path |
| `MCP_HTTP_TOKEN` | unset | Bearer token required for MCP requests |
| `MCP_MAX_BODY_BYTES` | `1000000` | Maximum JSON request size |
| `MCP_RATE_LIMIT` | `120` | Requests per minute per client IP; `0` disables |
| `MCP_TRUST_PROXY` | `false` | Read the client IP from `X-Forwarded-For`; set only behind a proxy |
| `STYLEKIT_MCP_BASE_URL` | `https://www.stylekit.top` | Live catalogue origin, e.g. `http://127.0.0.1:13000` on the app host |
| `STYLEKIT_MCP_TOOLSET` | `all` | stdio toolset: `all`, `core`, `assets`, or `design` |
| `MCP_ALLOWED_HOSTS` | loopback names for a loopback bind | Host header allowlist; set the public hostnames behind a proxy |
| `MCP_ALLOWED_ORIGINS` | loopback origins for a local bind | Comma-separated Origin allowlist; set `*` to allow all |
 
A loopback bind without a host allowlist rejects non-loopback `Host` and
`Origin` headers by default (DNS-rebinding protection). Set
`MCP_ALLOWED_HOSTS` when a reverse proxy passes the public hostname; that also
opens CORS to all origins unless `MCP_ALLOWED_ORIGINS` narrows it.

Running the endpoint yourself means lint and repair requests send the submitted
code to that host. The server does not log request bodies or store them. For
private code, run the stdio server locally instead.

The stdio package stays the default and keeps working offline through its
bundled snapshot; the remote endpoint serves the live catalogue and reports the
same `origin`/`fallbackReason` fields.

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

The published MCP package includes the public asset tools, the lint and repair
pair, source provenance, and discovery reliability fixes described above. It
bundles `stylekit-core`; the runtime npm dependencies remain the MCP SDK and
Zod.

Call the brief tool before generation and save its `stylekit-brief-v1` payload
for later validation. `provenance.source` identifies the data origin;
`contentHash` detects drift.

Lint returns `status: pass | fail | inconclusive`. `ok` is true only for a
conclusive static pass. Runtime expressions are reported as inconclusive unless
known literals already contain a violation. Missing requirements are advisory;
pass `strict: true` and `checkRequired: ["button"]` to fail them in a static
component snippet. Required checks cover the entire input, not each element.
These checks do not certify visual quality or accessibility.

Repair returns `{ code, edits, unfixed, before, report, origin, contentSource }`.
`edits` lists only replacements that were applied; the returned `code` never
still contains a class named in `edits`. `report` is the lint result for the
returned code, so `report.status` describes what you receive. Spacing, layout,
structure and variable references are untouched.
