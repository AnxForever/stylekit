/**
 * Public AI-access facts used by the "connect AI" call to action.
 *
 * These deliberately duplicate the MCP capability in `lib/developer-toolkit`.
 * The call to action is a client component, and importing the toolkit would
 * pull the whole style metadata array into the browser bundle just to print a
 * URL and a command. `tests/unit/lib/ai-access.test.ts` keeps the two in sync,
 * so a version bump that forgets this file fails the suite instead of shipping
 * a stale instruction.
 */

/** Hosted Streamable HTTP endpoint. Live catalogue, no token. */
export const AI_ACCESS_ENDPOINT = "https://www.stylekit.top/mcp";

/** stdio fallback the desktop clients run locally. */
export const AI_ACCESS_STDIO_COMMAND = "npx -y --prefer-online stylekit-mcp@latest";

/**
 * Clients the MCP server is documented to work with, in the order the reel
 * shows them. Order is editorial: the three editors most of our readers use
 * first, the rest behind them.
 */
/** Client names with a configuration path in the guide; they are not a claim of manual end-to-end testing. */
export const AI_ACCESS_CLIENTS = [
  "Claude Code",
  "Cursor",
  "VS Code",
  "Codex CLI",
  "Gemini CLI",
  "ChatGPT",
] as const;

export type AiAccessClient = (typeof AI_ACCESS_CLIENTS)[number];
