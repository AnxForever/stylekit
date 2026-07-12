import { describe, expect, it } from "vitest";
import { generateStylePack } from "@/lib/export/style-pack";
import { getStyleBySlug } from "@/lib/styles/registry";

describe("style pack metadata", () => {
  it("uses the server-provided style version", () => {
    const style = getStyleBySlug("neo-brutalist");
    expect(style).toBeDefined();

    const files = generateStylePack(style!, undefined, { version: "2.4.1" });
    const metadata = files.find((file) => file.filename.endsWith("-meta.json"));

    expect(metadata).toBeDefined();
    expect(JSON.parse(metadata!.content)).toMatchObject({ version: "2.4.1" });
  });
});
