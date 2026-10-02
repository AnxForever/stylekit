import { describe, expect, it } from "vitest";
import {
  getDeveloperToolkitCapability,
  listDeveloperToolkitCapabilities,
} from "@/lib/developer-toolkit";

describe("Developer Toolkit capability manifest", () => {
  it("matches the checked npm versions and repository release candidates", () => {
    expect(getDeveloperToolkitCapability("cli")).toMatchObject({
      id: "cli",
      state: "public-beta",
      publicVersion: "0.3.0",
      repositoryVersion: "0.3.0",
      command: "npx -y stylekit-cli@0.3.0 add synthwave",
      verifiedAt: "2026-10-02",
    });
    expect(getDeveloperToolkitCapability("core")).toMatchObject({
      publicVersion: "1.0.0-beta.6",
      repositoryVersion: "1.0.0-beta.6",
      command: "npm install stylekit-core@1.0.0-beta.6",
      verifiedAt: "2026-10-02",
    });
    expect(getDeveloperToolkitCapability("mcp")).toMatchObject({
      publicVersion: "0.4.0",
      repositoryVersion: "0.4.0",
      command: "npx -y stylekit-mcp@0.4.0",
      verifiedAt: "2026-10-02",
    });
    expect(getDeveloperToolkitCapability("agent-skill")).toMatchObject({
      publicVersion: "main@a5e42c87",
      repositoryVersion: "main@a5e42c87",
      command: "npx skills add AnxForever/stylekit-skill",
      verifiedAt: "2026-10-02",
    });
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
