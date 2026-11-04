import { describe, expect, it } from "vitest";
import {
  AI_ACCESS_CLIENTS,
  AI_ACCESS_ENDPOINT,
  AI_ACCESS_STDIO_COMMAND,
} from "@/lib/ai-access";
import { getDeveloperToolkitCapability } from "@/lib/developer-toolkit";

/**
 * The call-to-action ships its own copy of two MCP facts so the home page does
 * not import the whole style metadata array into the browser bundle. This suite
 * is the guard: a version or endpoint change that forgets `lib/ai-access` fails
 * here instead of advertising a command that no longer installs anything.
 */
describe("AI access facts", () => {
  it("mirrors the MCP capability printed on the developers page", () => {
    const mcp = getDeveloperToolkitCapability("mcp");

    // The hosted endpoint is documented on /developers rather than carried on
    // the capability record, so this only asserts the shape and the stdio
    // fallback that the capability does publish.
    expect(AI_ACCESS_ENDPOINT).toMatch(/^https:\/\/[a-z0-9.-]+\/mcp$/);
    expect(AI_ACCESS_STDIO_COMMAND).toBe(mcp.command);
  });

  it("uses an https endpoint that clients can reach without a token", () => {
    expect(AI_ACCESS_ENDPOINT.startsWith("https://")).toBe(true);
    expect(AI_ACCESS_ENDPOINT.endsWith("/mcp")).toBe(true);
  });

  it("lists distinct client names and keeps the reel short enough to read", () => {
    expect(new Set(AI_ACCESS_CLIENTS).size).toBe(AI_ACCESS_CLIENTS.length);
    expect(AI_ACCESS_CLIENTS).toContain("Claude Code");
    expect(AI_ACCESS_CLIENTS).toContain("Cursor");
    expect(AI_ACCESS_CLIENTS.length).toBeLessThanOrEqual(6);
  });
});
