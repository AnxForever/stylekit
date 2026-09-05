import { describe, expect, it } from "vitest";

import { parseCommand, buildHelpText } from "../flows/commands";
import { catalogCount, inspectStyle } from "../flows/catalog";

describe("command parsing", () => {
  it("parses every command name", () => {
    expect(parseCommand("帮助")).toBe("help");
    expect(parseCommand("help")).toBe("help");
    expect(parseCommand("风格列表")).toBe("styles");
    expect(parseCommand("多少个风格")).toBe("count");
    expect(parseCommand("查 glassmorphism")).toBe("inspect");
    expect(parseCommand("重置")).toBe("reset");
    expect(parseCommand("状态")).toBe("status");
  });

  it("does not misread a natural-language brief as a command", () => {
    expect(parseCommand("做一个潮牌电商落地页")).toBeNull();
    expect(parseCommand("帮我看看哪家风格适合咖啡品牌")).toBeNull();
  });

  it("help text mentions every command", () => {
    const help = buildHelpText();
    for (const hint of ["帮助", "风格列表", "多少个风格", "查 <slug>", "重置", "状态"]) {
      expect(help).toContain(hint);
    }
  });
});

describe("catalog helpers", () => {
  it("counts the full catalog", () => {
    expect(catalogCount()).toBeGreaterThan(100);
  });

  it("inspects a real style", () => {
    const detail = inspectStyle("glassmorphism");
    expect(detail).toBeTruthy();
    expect(detail).toContain("glassmorphism");
    expect(detail).toContain("#");
  });

  it("returns null for an unknown slug", () => {
    expect(inspectStyle("definitely-not-a-style")).toBeNull();
  });
});
