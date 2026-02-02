# StyleKit MCP Server

Model Context Protocol server that exposes StyleKit's design knowledge base as tools for AI assistants.

## Tools

| Tool | Description |
|------|-------------|
| `search_knowledge` | Search across all design knowledge domains (colors, typography, UX, etc.) |
| `get_design_recommendation` | Generate comprehensive design recommendation for a product type |
| `get_style` | Get a specific design style with tokens, recipes, and rules |
| `list_styles` | List all available design styles |
| `list_knowledge_domains` | List all knowledge domains with descriptions |
| `get_stack_guidelines` | Get coding guidelines for a specific tech stack |

## Installation

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "stylekit": {
      "command": "npx",
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
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
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
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
      "args": ["tsx", "/path/to/stylekit/mcp/server.ts"]
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

### Get Design Recommendation

```
What's the best design approach for an e-commerce website?
```

The AI will use `get_design_recommendation` to generate a comprehensive recommendation including:
- Style suggestions
- Color palette
- Typography pairing
- Landing page pattern
- Chart recommendations
- Icon suggestions
- UX guidelines

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

## Development

Run the server locally:

```bash
cd mcp
npx tsx server.ts
```

The server communicates via stdio using the MCP protocol.
