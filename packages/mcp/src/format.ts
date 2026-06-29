/** Shared response formatting helpers. */

/** Maximum response size in characters before truncation kicks in. */
export const CHARACTER_LIMIT = 25000;

/** Truncate an over-long text response with an actionable hint. */
export function truncateText(text: string): string {
  if (text.length <= CHARACTER_LIMIT) return text;
  return (
    text.slice(0, CHARACTER_LIMIT) +
    "\n\n[Output truncated. Narrow the query, lower the limit, or request a specific slug.]"
  );
}

/** Build a tool result carrying both human text and structured data. */
export function toolResult(text: string, structuredContent: unknown) {
  return {
    content: [{ type: "text" as const, text: truncateText(text) }],
    structuredContent: structuredContent as Record<string, unknown>,
  };
}

/** Build a plain-text error result (no structured content). */
export function errorResult(text: string) {
  return {
    content: [{ type: "text" as const, text }],
    isError: true,
  };
}
