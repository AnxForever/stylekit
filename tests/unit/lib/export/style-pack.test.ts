import { describe, expect, it, vi } from "vitest";
import JSZip from "jszip";
import { generateStylePack, downloadAllAsZip } from "@/lib/export/style-pack";
import { getStyleBySlug } from "@/lib/styles/registry";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateSkillPack, getSkillPackFileInfo } from "@/lib/export/skill-pack";

describe("style pack metadata", () => {
  it("allows callers to handle ZIP generation failures", async () => {
    const style = getStyleBySlug("neo-brutalist")!;
    const generate = vi.spyOn(JSZip.prototype, "generateAsync").mockRejectedValue(new Error("ZIP failed"));
    try {
      await expect(downloadAllAsZip(style)).rejects.toThrow("ZIP failed");
    } finally {
      generate.mockRestore();
    }
  });

  it("uses the server-provided style version", () => {
    const style = getStyleBySlug("neo-brutalist");
    expect(style).toBeDefined();

    const files = generateStylePack(style!, undefined, { version: "2.4.1" });
    const metadata = files.find((file) => file.filename.endsWith("-meta.json"));

    expect(metadata).toBeDefined();
    expect(JSON.parse(metadata!.content)).toMatchObject({ version: "2.4.1" });
  });

  it("includes SKILL.md in the shared style-pack source used for listings and ZIPs", () => {
    const style = getStyleBySlug("neo-brutalist");
    expect(style).toBeDefined();
    if (!style) return;

    const tokens = getStyleTokens(style.slug);
    const files = generateStylePack(style, tokens, { version: "2.4.1" });
    const skillInfo = getSkillPackFileInfo(style);
    const skillFile = files.find((file) => file.filename === skillInfo.filename);

    expect(skillFile).toMatchObject({
      name: skillInfo.name,
      filename: skillInfo.filename,
      mimeType: "text/markdown",
      icon: "skill",
    });
    expect(skillFile?.content).toBe(generateSkillPack({ style, tokens }));
    expect(files.map((file) => file.filename)).toContain(`${style.slug}-SKILL.md`);
  });

  it("adds the Tailwind v4 stylesheet and uses one token override across the pack", () => {
    const style = getStyleBySlug("synthwave");
    expect(style).toBeDefined();
    if (!style) return;
    const tokens = structuredClone(getStyleTokens(style.slug)!);
    tokens.colors.background.primary = "bg-[#111827]";
    tokens.colors.text.primary = "text-white";
    tokens.border.radius = "rounded-[18px]";

    const files = generateStylePack(style, tokens);
    const bySuffix = (suffix: string) => files.find((file) => file.filename.endsWith(suffix));
    const figma = JSON.parse(bySuffix("-tokens.json")!.content);
    const presetModule = { exports: {} as unknown };
    new Function("module", bySuffix("-tailwind-preset.js")!.content)(presetModule);
    const preset = presetModule.exports as {
      theme: { extend: { colors: Record<string, string>; borderRadius: Record<string, string> } };
    };
    const tailwindCss = bySuffix("-tailwind-theme.css")!.content;
    const shadcn = JSON.parse(bySuffix("-shadcn-theme.json")!.content);
    const variablesCss = bySuffix("-variables.css")!.content;

    expect(figma.colors.background.value).toBe("#111827");
    expect(figma.borderRadius.default.value).toBe("18px");
    expect(preset.theme.extend.colors["background-primary"]).toBe("#111827");
    expect(preset.theme.extend.borderRadius.style).toBe("18px");
    expect(tailwindCss).toContain("--color-background-primary: #111827;");
    expect(tailwindCss).toContain("--radius-style: 18px;");
    expect(shadcn.cssVars.light.background).toBe("221 39% 11%");
    expect(shadcn.cssVars.light.radius).toBe("18px");
    expect(variablesCss).toContain("--background: 221 39% 11%;");
    expect(bySuffix("-export-diagnostics.json")).toBeDefined();
  });

  it("aggregates shadcn prefix failures and the applied fallback in diagnostics", () => {
    const style = getStyleBySlug("synthwave")!;
    const tokens = structuredClone(getStyleTokens(style.slug)!);
    tokens.colors.background.primary = "bg-[var(--brand-surface)]";

    const files = generateStylePack(style, tokens);
    const shadcn = JSON.parse(files.find((file) => file.filename.endsWith("-shadcn-theme.json"))!.content);
    const diagnostics = JSON.parse(files.find((file) => file.filename.endsWith("-export-diagnostics.json"))!.content);

    expect(shadcn.cssVars.light.background).toBe("0 0% 100%");
    expect(diagnostics.shadcnTheme.unsupported).toContainEqual(expect.objectContaining({
      path: "colors.background.primary",
      source: "bg-[var(--brand-surface)]",
    }));
    expect(diagnostics.shadcnTheme.fallbacks).toContainEqual(expect.objectContaining({
      path: "colors.background.primary",
      source: "bg-[var(--brand-surface)]",
    }));
  });
});
