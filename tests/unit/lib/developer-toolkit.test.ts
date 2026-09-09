import { describe, expect, it } from "vitest";
import {
  getDeveloperToolkitCapability,
  listDeveloperToolkitCapabilities,
} from "@/lib/developer-toolkit";

describe("Developer Toolkit capability manifest", () => {
  it("describes the current public CLI beta", () => {
    expect(getDeveloperToolkitCapability("cli")).toMatchObject({
      id: "cli",
      state: "public-beta",
      publicVersion: "0.1.2",
      repositoryVersion: "0.1.2",
      command: "npx -y stylekit-cli@0.1.2 add synthwave",
      verifiedAt: "2026-08-16",
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
