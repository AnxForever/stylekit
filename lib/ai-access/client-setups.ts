import { AI_ACCESS_ENDPOINT } from "@/lib/ai-access";

export const AI_CLIENT_SETUPS = [
  {
    id: "claude-code",
    name: "Claude Code",
    format: "command",
    docsUrl: "https://code.claude.com/docs/en/mcp",
  },
  {
    id: "cursor",
    name: "Cursor",
    format: "json",
    docsUrl: "https://prod.cursor.com/docs/mcp",
  },
  {
    id: "codex-cli",
    name: "Codex CLI",
    format: "command",
    docsUrl: "https://developers.openai.com/learn/docs-mcp",
  },
  {
    id: "vscode",
    name: "VS Code",
    format: "json",
    docsUrl: "https://code.visualstudio.com/docs/agents/reference/mcp-configuration",
  },
  {
    id: "gemini-cli",
    name: "Gemini CLI",
    format: "command",
    docsUrl: "https://geminicli.com/docs/tools/mcp-server/",
  },
  {
    id: "chatgpt-web",
    name: "ChatGPT",
    format: "steps",
    docsUrl: "https://developers.openai.com/api/docs/guides/custom-mcp-server",
  },
] as const;

export type AiClientSetupId = (typeof AI_CLIENT_SETUPS)[number]["id"];
export type AiClientSetupFormat = (typeof AI_CLIENT_SETUPS)[number]["format"];

const CURSOR_SETUP_PREFIX =
  "cursor://anysphere.cursor-deeplink/mcp/install?name=stylekit&config=";

export interface AiStyleHandoff {
  slug: string;
  name: string;
  locale: "en" | "zh";
  markdown: string;
}

export interface AiStyleHandoffText {
  instruction: string;
  designDocumentUrl: string;
  designDocumentMarkdown: string | null;
}

/** Copy the selected client configuration without touching the user's settings. */
export function getAiClientSetupContent(id: AiClientSetupId): string {
  switch (id) {
    case "claude-code":
      return `claude mcp add --transport http stylekit ${AI_ACCESS_ENDPOINT}`;
    case "cursor":
      return JSON.stringify(
        { mcpServers: { stylekit: { url: AI_ACCESS_ENDPOINT } } },
        null,
        2,
      );
    case "codex-cli":
      return `codex mcp add stylekit --url ${AI_ACCESS_ENDPOINT}`;
    case "vscode":
      return JSON.stringify(
        { servers: { stylekit: { type: "http", url: AI_ACCESS_ENDPOINT } } },
        null,
        2,
      );
    case "gemini-cli":
      return `gemini mcp add --transport http stylekit ${AI_ACCESS_ENDPOINT}`;
    case "chatgpt-web":
      return AI_ACCESS_ENDPOINT;
  }
}

/** Open Cursor's documented install-review screen for the remote HTTP server. */
export function getCursorInstallReviewUrl(): string {
  const config = btoa(JSON.stringify({ url: AI_ACCESS_ENDPOINT }));
  return `${CURSOR_SETUP_PREFIX}${encodeURIComponent(config)}`;
}

/** Point AI clients at this locale's one canonical style document. */
export function buildAiStyleHandoff({
  slug,
  name,
  locale,
  markdown,
}: AiStyleHandoff): AiStyleHandoffText {
  const designDocumentUrl = `${AI_ACCESS_ENDPOINT.replace(/\/mcp$/, "")}/api/design/${encodeURIComponent(slug)}/design.md?locale=${locale}`;
  const instruction =
    locale === "zh"
      ? `请根据同一个 StyleKit 风格规范「${name}」（${slug}）实现我接下来的需求。此链接返回本页语言的完整 design.md：\n${designDocumentUrl}\n\n如果已连接 StyleKit MCP，调用 stylekit_get_style，参数为 { "slug": "${slug}", "include": ["brief"] }。MCP brief 中的 structuredContent.brief.designDocument.content 默认是英文；如果需要本页语言版本，请读取上方链接。`
      : `Use StyleKit's ${JSON.stringify(name)} style (${slug}) to implement my next request. This link returns the complete design.md in this page's language:\n${designDocumentUrl}\n\nIf StyleKit MCP is connected, call stylekit_get_style with { "slug": "${slug}", "include": ["brief"] }. Its structuredContent.brief.designDocument.content defaults to English. Fetch the linked URL when you need this page's language.`;

  // Keep the original Markdown verbatim so the on-page and modal copy actions
  // always hand over the same single design.md.
  return {
    instruction,
    designDocumentUrl,
    designDocumentMarkdown: markdown.trim() ? markdown : null,
  };
}
