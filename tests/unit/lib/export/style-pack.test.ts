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
});
