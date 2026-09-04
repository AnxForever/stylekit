import { describe, expect, it } from "vitest";

import { runGates } from "@/lib/submission";
import { styles } from "@/lib/styles/registry";
import { STYLE_TAGS } from "@/lib/styles/meta-types";

/** A manifest that clears every blocking gate. */
function validManifest() {
  return {
    schemaVersion: "1.0.0" as const,
    generatedAt: "2026-08-18T00:00:00.000Z",
    source: { assistant: "claude" as const, model: "claude-opus-5" },
    formData: {
      name: "测试风格",
      nameEn: "Test Style",
      slug: "gate-fixture-style",
      description: "A fixture style used to exercise submission gates.",
      category: "modern" as const,
      styleType: "visual" as const,
      tags: ["glassmorphic", "responsive"],
      primaryColor: "#1b1b1f",
      secondaryColor: "#ffffff",
      accentColors: ["#2563eb"],
      background: "#ffffff",
      foreground: "#1b1b1f",
      muted: "#71717a",
      keywords: ["test", "fixture", "gates"],
      philosophy: "Restraint first, ornament never.",
      headingFont: "font-semibold tracking-tight",
      bodyFont: "font-sans",
      fontSizeBase: "text-base",
      fontSizeHeading: "text-3xl",
      fontSizeSmall: "text-sm",
      fontWeightNormal: "400",
      fontWeightBold: "700",
      lineHeightNormal: "1.5",
      lineHeightTight: "1.2",
      borderRadius: "0.5rem",
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "2rem",
      doList: ["Keep surfaces flat", "Use one accent per view"],
      dontList: ["Never stack more than two shadows"],
      aiRules: [
        "Use bg-[#ffffff] for surfaces and text-[#1b1b1f] for body copy.",
        "Reserve #2563eb for a single primary action per screen.",
        "Keep border radius at 0.5rem across all components.",
      ],
      buttonCode:
        '<button className="inline-flex items-center rounded-[0.5rem] bg-[#2563eb] px-4 py-2 text-[#ffffff] font-medium">Continue</button>',
      cardCode:
        '<div className="rounded-[0.5rem] border border-[#1b1b1f] bg-[#ffffff] p-4"><h3 className="text-base text-[#1b1b1f]">Card title</h3><p className="text-sm text-[#71717a]">Supporting copy.</p></div>',
      inputCode:
        '<input className="w-full rounded-[0.5rem] border border-[#71717a] bg-[#ffffff] px-3 py-2 text-[#1b1b1f]" placeholder="Email address" />',
    },
    assets: {
      coverSvg:
        '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#ffffff"/><rect x="96" y="96" width="1008" height="438" rx="24" fill="#2563eb" opacity="0.15"/></svg>',
    },
    selfCheck: {
      schemaValid: true,
      requiredFilesPrepared: ["manifest.json" as const, "cover.svg" as const],
      componentCoverage: ["buttonCode" as const, "cardCode" as const, "inputCode" as const],
      notes: "qualityRisks: none known. maintainerReviewFocus: palette restraint.",
    },
  };
}

function gate(report: Awaited<ReturnType<typeof runGates>>, id: string) {
  const found = report.gates.find((entry) => entry.id === id);
  if (!found) throw new Error(`gate ${id} missing from report`);
  return found;
}

describe("style submission gates", () => {
  it("accepts a complete manifest", async () => {
    const report = await runGates("style", validManifest());
    expect(report.accepted).toBe(true);
    expect(report.gates.filter((entry) => !entry.passed)).toEqual([]);
  });

  it("stops at the schema gate instead of cascading failures", async () => {
    const report = await runGates("style", { schemaVersion: "0.9.0" });
    expect(report.accepted).toBe(false);
    expect(report.gates).toHaveLength(1);
    expect(report.gates[0].id).toBe("schema");
  });

  it("rejects a slug that is already a curated style", async () => {
    const manifest = validManifest();
    manifest.formData.slug = styles[0].slug;
    const report = await runGates("style", manifest);
    expect(gate(report, "slug-available").passed).toBe(false);
    expect(report.accepted).toBe(false);
  });

  it("rejects a slug that already has a submission in flight", async () => {
    const report = await runGates("style", validManifest(), { slugTaken: true });
    expect(gate(report, "slug-available").passed).toBe(false);
  });

  it("rejects an empty-shell component", async () => {
    const manifest = validManifest();
    manifest.formData.inputCode = "<input />";
    const report = await runGates("style", manifest);
    expect(gate(report, "core-components").passed).toBe(false);
    expect(gate(report, "core-components").detail).toContain("inputCode");
  });

  it("rejects placeholder content", async () => {
    const manifest = validManifest();
    manifest.formData.cardCode = manifest.formData.cardCode.replace(
      "Supporting copy.",
      "TODO write copy",
    );
    const report = await runGates("style", manifest);
    expect(gate(report, "no-placeholders").passed).toBe(false);
  });

  it("rejects a cover that draws nothing", async () => {
    const manifest = validManifest();
    manifest.assets.coverSvg =
      '<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><text x="600" y="315">Test Style</text></svg>';
    const report = await runGates("style", manifest);
    expect(gate(report, "cover-svg").passed).toBe(false);
  });

  it("rejects thin aiRules", async () => {
    const manifest = validManifest();
    manifest.formData.aiRules = ["Use blue.", "  "];
    const report = await runGates("style", manifest);
    expect(gate(report, "ai-rules").passed).toBe(false);
  });

  it.each([
    ["script tag", '<div><script>fetch("/steal")</script></div>'],
    ["inline handler", '<button onclick="alert(1)" className="px-4 py-2">Go</button>'],
    ["javascript URL", '<a href="javascript:alert(1)" className="px-4 py-2">Go</a>'],
  ])("rejects executable content: %s", async (_label, payload) => {
    const manifest = validManifest();
    manifest.formData.buttonCode = `${manifest.formData.buttonCode}${payload}`;
    const report = await runGates("style", manifest);
    expect(gate(report, "content-safety").passed).toBe(false);
  });

  it("rejects tags retired from the vocabulary", async () => {
    const manifest = validManifest();
    manifest.formData.tags = ["modern"];
    const report = await runGates("style", manifest);
    expect(gate(report, "schema").passed).toBe(false);
  });

  it("accepts every tag in the shared vocabulary", async () => {
    const manifest = validManifest();
    manifest.formData.tags = [...STYLE_TAGS];
    const report = await runGates("style", manifest);
    expect(gate(report, "schema").passed).toBe(true);
  });

  describe("advisory signals", () => {
    it("scores accessibility without the style being registered", async () => {
      const report = await runGates("style", validManifest());
      const a11y = report.signals.find((signal) => signal.id === "a11y");
      expect(a11y?.value).toMatch(/^\d+ \/ 100 \([ABCDF]\)$/);
    });

    it("never blocks on a low accessibility score", async () => {
      const manifest = validManifest();
      // Grey on grey: deliberately awful contrast, the way soft-ui scores 46.
      manifest.formData.foreground = "#aaaaaa";
      manifest.formData.background = "#bbbbbb";
      manifest.formData.muted = "#b5b5b5";
      const report = await runGates("style", manifest);
      expect(report.accepted).toBe(true);
    });

    it("reports colors used outside the declared palette without blocking", async () => {
      const manifest = validManifest();
      manifest.formData.buttonCode = manifest.formData.buttonCode.replace(
        "#2563eb",
        "#ff00ff",
      );
      const report = await runGates("style", manifest);
      const signal = report.signals.find((s) => s.id === "palette-consistency");
      expect(signal?.value).toBe("1");
      expect(signal?.comparison).toContain("#ff00ff");
      expect(report.accepted).toBe(true);
    });

    it("counts extended components", async () => {
      const report = await runGates("style", validManifest());
      const signal = report.signals.find((s) => s.id === "extended-components");
      expect(signal?.value).toBe("0 of 3");
    });
  });

  it("refuses kinds that are not implemented", async () => {
    await expect(runGates("template", {})).rejects.toThrow(/not implemented/i);
  });
});
