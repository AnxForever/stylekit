# StyleKit MCP Server

Model Context Protocol server that exposes StyleKit's design knowledge base as tools for AI assistants.

## Tools

### Core tools (enabled by default)

| Tool | Description |
|------|-------------|
| `search_knowledge` | Search across all design knowledge domains (colors, typography, UX, etc.) |
| `smart_recommend` | Generate context-aware style recommendations with scoring |
| `get_style` | Get a specific design style with tokens, recipes, and rules |
| `list_styles` | List all available design styles |
| `lint_code` | Lint JSX/TSX class usage against a style's constraints |
| `get_stack_guidelines` | Get coding guidelines for a specific tech stack |
| `submit_style` | Validate and prepare a style submission from manifest JSON |

### Experimental tools (disabled by default)

Set `STYLEKIT_ENABLE_EXPERIMENTAL_TOOLS=1` to enable:

| `compose_styles` | Compose visual style + optional layout archetype |
| `generate_context_file` | Generate IDE context/rules files for AI coding tools |
| `analyze_project_style` | Detect nearest StyleKit style from component code |

## Installation

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/tools/mcp/server.ts"]
    }
  }
}
```

### Cursor

Add to Cursor settings:

```json
{
  "mcp.servers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/tools/mcp/server.ts"]
    }
  }
}
```

### Claude Code

Add to `.claude/settings.json`:

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/tools/mcp/server.ts"]
    }
  }
}
```

## Usage Examples

### Search Knowledge

```
Search for "SaaS dashboard" design recommendations
```

The AI will use `search_knowledge` to find relevant design patterns, color palettes, and UX guidelines.

### Smart Recommendation

```
What's the best design approach for an e-commerce website?
```

The AI will use `smart_recommend` to return ranked candidates with:
- suitability scores
- context-aware reasoning
- alternatives and tradeoffs

### Get Style Details

```
Show me the Neo-Brutalist design tokens
```

The AI will use `get_style` to retrieve complete style information including:
- Design tokens (borders, shadows, typography)
- Component recipes
- Do's and Don'ts
- Code examples

### Tech Stack Guidelines

```
What are the critical guidelines for Next.js development?
```

The AI will use `get_stack_guidelines` to retrieve stack-specific coding guidelines.

### Validate a Style Submission

```
Validate this manifest.json for a new style submission
```

The AI will use `submit_style` with `dryRun: true` to return a detailed validation report including:
- Per-field validation status (schemaVersion, slug, colors, doList, etc.)
- Schema compliance issues
- Summary of the style being submitted

### Analyze Existing Code

> Requires `STYLEKIT_ENABLE_EXPERIMENTAL_TOOLS=1`

```
Which StyleKit style does this component look like?
```

The AI will use `analyze_project_style` to return top style matches with confidence and explanations.

## Development

Run the server locally:

```bash
cd tools/mcp
npx tsx server.ts
```

The server communicates via stdio using the MCP protocol.
