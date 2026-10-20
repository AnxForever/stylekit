# HTTP API

Stable JSON endpoints for published style metadata, tokens, recipes, and rules.
Useful when you want StyleKit data in a build step, a script, or an agent that
does not speak MCP.

```http
GET  /api/styles                      # List all styles
GET  /api/styles/{slug}               # Style record (tokens + recipes + rules)
GET  /api/styles/{slug}/tokens        # Design tokens only
GET  /api/styles/{slug}/recipes       # Component recipes only
GET  /api/styles/{slug}/brief         # Complete implementation and lint contract
GET  /api/styles/stats                # Aggregate views, favorites, and ratings per style
GET  /api/assets                      # Public asset catalog, with filters and pagination
GET  /api/assets/{kind}/{id}           # One namespaced public asset
GET  /api/templates/{slug}/download   # Standalone template project ZIP
```

All endpoints are read-only and return `application/json`. Only published styles
are exposed.

## Implementation contract

`/api/styles/{slug}/brief` returns `stylekit-brief-v1`: AI rules, philosophy,
global CSS, component templates, recipe definitions, tokens, readiness guidance,
merged lint rules and provenance. Recipe definitions include the available
variants, parameters and slots; they are not an already-rendered component.

`provenance.source` identifies the content publisher (`bundled`, `static` or
`community`). `provenance.contentHash` identifies the complete contract for
drift detection; it is not a security digest. The HTTP endpoint returns the
complete contract. Section selections in the CLI/MCP repository source are
client-side projections and are marked separately from the original contract
identity. These new CLI/MCP options require a rebuilt package and a release
before npm consumers can use them.

Unknown style slugs return HTTP 404. Readiness fields describe implementation
coverage, not verified visual quality or browser accessibility. A static lint
pass is evidence only for the checks and syntax the report says it covered.

## Asset discovery and delivery

```http
GET /api/assets?kind=animation&q=fade&offset=0&limit=20
```

`kind` is optional; `q` searches names, descriptions and tags (up to 500
characters). `offset` is a nonnegative integer; `limit` is 1–100, default 20.
Invalid filters return HTTP 400. Successful pages contain `schemaVersion`,
`assets`, `total`, `offset`, `limit`, `hasMore` and `kindCounts`. An empty page
is a valid result. Follow `hasMore` and advance `offset` by the page size.

Use each result's exact `kind` and `id` to retrieve its detail. Asset details
preserve availability, content level, dependencies, attribution, license and
source URLs. External references and restricted packs do not imply permission
to redistribute their source. Private user kits and unpublished submissions
are excluded.

Invalid kinds or IDs return HTTP 400; missing assets return HTTP 404. A remote
template whose actual source cannot be delivered returns HTTP 503 with
`Cache-Control: no-store`; a download URL is not a substitute for project
files. A successful remote template includes its text file map and identifies
binary entries and their encoding.

## Related

- [MCP server](../packages/mcp/README.md) — the same catalog as MCP tools, for
  Claude Code, Cursor, and other hosts.
- [Registry guide](./registry.md) — installing a style as a shadcn theme.
- [`/registry.json`](https://www.stylekit.top/registry.json) — the full slug list
  in shadcn registry format.
- [`/llms.txt`](https://stylekit.top/llms.txt) — machine-readable index of the
  documentation.
