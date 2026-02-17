import fs from "node:fs";
import path from "node:path";
import { beforeEach, describe, expect, it } from "vitest";

const REGISTRY_SCRIPT = fs.readFileSync(
  path.join(process.cwd(), "style-extractor-dev", "scripts", "registry.js"),
  "utf8",
);

const REGISTRY_GLOBALS = [
  "__seRegistry",
  "extractStyle",
  "__seUtils",
  "__seStructure",
  "__seCSS",
  "__seComponents",
  "__seStateCapture",
  "__seAISemantic",
  "__seBlueprint",
  "__seA11y",
  "__seStyleKit",
  "__seFormat",
  "__seCodeGen",
  "__seExport",
  "__seTheme",
  "__seMotion",
  "__seMotionEnhanced",
  "__seMotionAssoc",
  "__seScreenshot",
  "__seMultiPage",
  "__seIncremental",
  "__seResponsive",
  "__seLibs",
  "__sePatternDetect",
];

function resetRegistryGlobals() {
  const w = window as any;
  for (const key of REGISTRY_GLOBALS) {
    try {
      delete w[key];
    } catch {
      w[key] = undefined;
    }
  }
}

function installRegistry() {
  (0, eval)(REGISTRY_SCRIPT);
  const w = window as any;
  expect(w.__seRegistry?.installed).toBe(true);
  expect(typeof w.extractStyle).toBe("function");
}

describe("style-extractor registry automation", () => {
  beforeEach(() => {
    resetRegistryGlobals();
  });

  it("awaits async module extractors and option hooks", async () => {
    const w = window as any;

    w.__seStructure = {
      installed: true,
      extract: () => ({ summary: { nodeCount: 5 } }),
    };
    w.__seTheme = {
      installed: true,
      detect: async () => ({ current: "light", supportsToggle: true }),
      extractBothThemes: async () => ({
        current: { mode: "light" },
        opposite: { mode: "dark" },
      }),
    };

    installRegistry();

    const result = await w.extractStyle({
      modules: ["structure", "theme"],
      includeTheme: true,
    });

    expect(result.data.structure?.summary?.nodeCount).toBe(5);
    expect(result.data.theme?.current).toBe("light");
    expect(result.data.themes?.current?.mode).toBe("light");
    expect(typeof result.data.theme?.then).toBe("undefined");
    expect(result.meta.modules).toEqual(expect.arrayContaining(["structure", "theme"]));
    expect(result.meta.status).toBe("ok");
    expect(result.meta.errorCount).toBe(0);
  });

  it("returns machine-readable warning codes when modules are unavailable", async () => {
    const w = window as any;
    installRegistry();

    const result = await w.extractStyle({
      modules: ["stylekit"],
      includeRecipes: true,
      includePrompt: true,
      includeConfidence: true,
      format: "json",
    });

    const warningCodes = result.warnings.map((item: any) => item.code);

    expect(result.meta.status).toBe("empty");
    expect(result.meta.warningCount).toBeGreaterThan(0);
    expect(warningCodes).toContain("MODULE_NOT_AVAILABLE");
    expect(warningCodes).toContain("NO_MODULES_TO_RUN");
    expect(result.errors).toHaveLength(0);
  });

  it("surfaces dependency + extractor failures with stable error codes", async () => {
    const w = window as any;
    w.__seCodeGen = {
      installed: true,
      generate: () => {
        throw new Error("boom");
      },
    };

    installRegistry();

    const result = await w.extractStyle({
      modules: ["codegen"],
    });

    const warningCodes = result.warnings.map((item: any) => item.code);
    const errorCodes = result.errors.map((item: any) => item.code);

    expect(result.meta.status).toBe("error");
    expect(warningCodes).toContain("DEPENDENCY_MISSING");
    expect(errorCodes).toContain("MODULE_EXTRACT_FAILED");
    expect(result.meta.errorCount).toBeGreaterThan(0);
  });
});
