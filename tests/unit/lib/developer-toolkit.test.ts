import { describe, expect, it } from "vitest";
import {
  getDeveloperToolkitCapability,
  getDeveloperToolkitSetupSnippet,
  listDeveloperToolkitCapabilities,
} from "@/lib/developer-toolkit";

describe("Developer Toolkit capability manifest", () => {
  it("matches verified npm tags and GitHub main versions", () => {
    expect(getDeveloperToolkitCapability("cli")).toMatchObject({
      id: "cli",
      state: "public-beta",
      publicVersion: "0.3.1",
      repositoryVersion: "0.3.1",
      command:
        "npx -y --prefer-online stylekit-cli@latest add synthwave",
      verifiedAt: "2026-10-07",
    });
    expect(getDeveloperToolkitCapability("core")).toMatchObject({
      publicVersion: "1.0.0-beta.7",
      repositoryVersion: "1.0.0-beta.7",
      command: "npm install stylekit-core@beta",
      verifiedAt: "2026-10-07",
    });
    expect(getDeveloperToolkitCapability("mcp")).toMatchObject({
      publicVersion: "0.4.1",
      repositoryVersion: "0.4.1",
      command: "npx -y --prefer-online stylekit-mcp@latest",
      verifiedAt: "2026-10-07",
    });
    expect(getDeveloperToolkitCapability("agent-skill")).toMatchObject({
      publicVersion: "0.8.0",
      repositoryVersion: "0.8.0",
      command: "npx skills@latest add AnxForever/stylekit-skill",
      verifiedAt: "2026-10-07",
    });
  });

  it("provides copy-ready MCP client JSON that matches the shell command", () => {
    const capability = getDeveloperToolkitCapability("mcp");
    const snippet = getDeveloperToolkitSetupSnippet("mcp");

    expect(snippet.format).toBe("json");
    expect(JSON.parse(snippet.content)).toEqual({
      mcpServers: {
        stylekit: {
          command: "npx",
          args: ["-y", "--prefer-online", "stylekit-mcp@latest"],
        },
      },
    });
    const parsed = JSON.parse(snippet.content) as {
      mcpServers: { stylekit: { args: string[] } };
    };
    expect(`npx ${parsed.mcpServers.stylekit.args.join(" ")}`).toBe(capability.command);
  });

  it("describes every delivery channel and the shared Core Package", () => {
    expect(
      listDeveloperToolkitCapabilities().map(({ id, state }) => ({ id, state })),
    ).toEqual([
      { id: "registry", state: "public-beta" },
      { id: "core", state: "public-beta" },
      { id: "cli", state: "public-beta" },
      { id: "mcp", state: "public-beta" },
      { id: "agent-skill", state: "public-beta" },
    ]);
  });
});
