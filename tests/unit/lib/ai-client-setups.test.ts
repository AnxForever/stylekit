import { describe, expect, it } from "vitest";
import { AI_ACCESS_ENDPOINT } from "@/lib/ai-access";
import {
  AI_CLIENT_SETUPS,
  buildAiStyleHandoff,
  getAiClientSetupContent,
  getCursorInstallReviewUrl,
} from "@/lib/ai-access/client-setups";

describe("AI client setup guides", () => {
  it("provides a distinct official setup path for each supported client", () => {
    expect(AI_CLIENT_SETUPS.map(({ id }) => id)).toEqual([
      "claude-code",
      "cursor",
      "codex-cli",
      "vscode",
      "gemini-cli",
      "chatgpt-web",
    ]);
    expect(new Set(AI_CLIENT_SETUPS.map(({ docsUrl }) => new URL(docsUrl).hostname)).size)
      .toBeGreaterThan(0);
  });

  it("emits the documented HTTP configuration shape for each client", () => {
    expect(getAiClientSetupContent("claude-code")).toBe(
      `claude mcp add --transport http stylekit ${AI_ACCESS_ENDPOINT}`,
    );
    expect(JSON.parse(getAiClientSetupContent("cursor"))).toEqual({
      mcpServers: { stylekit: { url: AI_ACCESS_ENDPOINT } },
    });
    expect(getAiClientSetupContent("codex-cli")).toBe(
      `codex mcp add stylekit --url ${AI_ACCESS_ENDPOINT}`,
    );
    expect(JSON.parse(getAiClientSetupContent("vscode"))).toEqual({
      servers: { stylekit: { type: "http", url: AI_ACCESS_ENDPOINT } },
    });
    expect(getAiClientSetupContent("gemini-cli")).toBe(
      `gemini mcp add --transport http stylekit ${AI_ACCESS_ENDPOINT}`,
    );
    expect(getAiClientSetupContent("chatgpt-web")).toBe(AI_ACCESS_ENDPOINT);
  });

  it("builds a review-first Cursor link for exactly the remote URL", () => {
    const installUrl = new URL(getCursorInstallReviewUrl());
    const payload = JSON.parse(atob(installUrl.searchParams.get("config") ?? ""));

    expect(installUrl.protocol).toBe("cursor:");
    expect(installUrl.searchParams.get("name")).toBe("stylekit");
    expect(payload).toEqual({ url: AI_ACCESS_ENDPOINT });
  });

  it("keeps the selected slug, locale and canonical single design document together", () => {
    const markdown = "# Editorial — Style Reference\n\nUse the sole style guide.";
    const handoff = buildAiStyleHandoff({
      slug: "editorial",
      name: "编辑杂志风",
      locale: "zh",
      markdown,
    });

    expect(handoff.designDocumentUrl).toBe(
      "https://www.stylekit.top/api/design/editorial/design.md?locale=zh",
    );
    expect(handoff.instruction).toContain("editorial");
    expect(handoff.instruction).toContain(handoff.designDocumentUrl);
    expect(handoff.instruction).toContain('"include": ["brief"]');
    expect(handoff.instruction).toContain("默认是英文");
    expect(handoff.instruction).toContain("如果需要本页语言版本，请读取上方链接");
    expect(handoff.designDocumentMarkdown).toBe(markdown);
  });

  it("distinguishes the page's localized document from the default English MCP brief", () => {
    const handoff = buildAiStyleHandoff({
      slug: "editorial",
      name: "Editorial",
      locale: "en",
      markdown: "# Editorial — Style Reference",
    });

    expect(handoff.instruction).toContain("designDocument.content defaults to English");
    expect(handoff.instruction).toContain("this page's language");
    expect(handoff.instruction).not.toContain("same canonical design.md");
  });

  it("escapes dynamic slugs in the canonical document URL", () => {
    const handoff = buildAiStyleHandoff({
      slug: "style with spaces",
      name: "Style",
      locale: "en",
      markdown: "# Style — Style Reference",
    });

    expect(handoff.designDocumentUrl).toBe(
      "https://www.stylekit.top/api/design/style%20with%20spaces/design.md?locale=en",
    );
  });
});
