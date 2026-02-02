# Figma MCP Integration Guide

StyleKit supports importing design tokens directly from Figma via the Figma MCP Server.

## What is Figma MCP Server?

Figma MCP Server implements the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) to allow AI assistants to read design data from Figma files. This enables:

- Automatic extraction of color tokens
- Spacing and sizing values
- Typography specifications
- Component properties

## Setup

### 1. Configure Figma MCP Server

Add the Figma MCP server to your AI assistant's configuration:

**For Claude Code (`.claude/mcp.json`):**

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

**For Cursor (`.cursor/mcp.json`):**

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@anthropic-ai/figma-mcp-server@latest"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-figma-token"
      }
    }
  }
}
```

### 2. Get Figma Access Token

1. Go to Figma Settings > Account > Personal Access Tokens
2. Create a new token with "Read" permissions
3. Add the token to your environment or MCP config

## Usage

### Import Colors from Figma

Once configured, you can ask your AI assistant to:

```
Read the design tokens from my Figma file [FILE_URL] and convert them to StyleKit format.
```

The assistant will use the Figma MCP tools to:
1. Read variables from your Figma file
2. Convert them to StyleKit token format
3. Generate CSS variables or Tailwind config

### Supported Figma Features

| Figma Feature | StyleKit Token |
|---------------|----------------|
| Color Variables | `colors.primary`, `colors.accent`, etc. |
| Number Variables (spacing) | `spacing.sm`, `spacing.md`, etc. |
| Number Variables (radius) | `border.radius` |
| Text Styles | `typography.heading`, `typography.body` |
| Effect Styles | `shadow.sm`, `shadow.md`, etc. |

### Example Workflow

1. **Design in Figma**: Create your design system with variables
2. **Export via MCP**: Ask AI to read your Figma file
3. **Generate Code**: AI converts to StyleKit tokens
4. **Use in Project**: Import tokens into your codebase

```typescript
// Example: Using imported Figma tokens
import { convertFigmaToStyleKitTokens } from '@/lib/figma';

// Figma MCP response (from AI assistant)
const figmaResponse = {
  variables: {
    // ... variables from Figma
  },
  collections: {
    // ... collections from Figma
  }
};

// Convert to StyleKit format
const tokens = convertFigmaToStyleKitTokens(figmaResponse, {
  modeId: 'light', // or 'dark' for dark mode
  styleName: 'my-design-system'
});
```

## API Reference

### `convertFigmaToStyleKitTokens(response, options)`

Converts Figma MCP variables response to StyleKit tokens.

```typescript
function convertFigmaToStyleKitTokens(
  response: FigmaMCPVariablesResponse,
  options?: {
    modeId?: string;      // Figma variable mode (e.g., 'light', 'dark')
    styleName?: string;   // Name for the generated style
  }
): Partial<StyleTokens>
```

### `generateCSSFromFigmaVariables(response, modeId)`

Generates CSS custom properties from Figma variables.

```typescript
function generateCSSFromFigmaVariables(
  response: FigmaMCPVariablesResponse,
  modeId?: string
): string

// Output:
// :root {
//   --color-primary: #000000;
//   --color-secondary: #ffffff;
//   --spacing-sm: 8px;
//   ...
// }
```

### `generateTailwindConfigFromFigma(response, modeId)`

Generates Tailwind config extension from Figma variables.

```typescript
function generateTailwindConfigFromFigma(
  response: FigmaMCPVariablesResponse,
  modeId?: string
): string

// Output: Tailwind config object ready to merge
```

## Best Practices

### Figma Variable Naming

For best results, use consistent naming in Figma:

```
colors/
  primary/500
  primary/600
  secondary/500
  accent/1
  background
  foreground

spacing/
  xs (4px)
  sm (8px)
  md (16px)
  lg (24px)
  xl (32px)

radius/
  none (0px)
  sm (4px)
  md (8px)
  lg (12px)
  full (9999px)
```

### Mode Support

StyleKit supports Figma's variable modes for light/dark themes:

```typescript
// Light mode tokens
const lightTokens = convertFigmaToStyleKitTokens(response, { modeId: 'light' });

// Dark mode tokens
const darkTokens = convertFigmaToStyleKitTokens(response, { modeId: 'dark' });
```

## Troubleshooting

### Token not found

Ensure your Figma variable names follow the expected pattern:
- Colors: `colors/[name]` or `colors/[name]/[variant]`
- Spacing: `spacing/[name]` or `space/[name]`
- Radius: `radius/[name]` or `corner/[name]`

### Wrong values imported

Check the variable mode - if you have multiple modes (light/dark), specify which one to use.

### MCP connection issues

1. Verify your Figma access token is valid
2. Ensure the file URL is accessible with your token
3. Check MCP server logs for errors

## Resources

- [Figma MCP Server Documentation](https://www.figma.com/blog/introducing-figma-mcp-server/)
- [Model Context Protocol Specification](https://modelcontextprotocol.io/)
- [Figma Variables Documentation](https://help.figma.com/hc/en-us/articles/15145852043927-Variables-in-Figma)
