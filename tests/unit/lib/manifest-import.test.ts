import { describe, expect, it } from "vitest";
import { parseManifestImportText } from "@/lib/submit/manifest-import";

function asRecord(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return {};
  }
  return value as Record<string, unknown>;
}

describe("manifest import parser", () => {
  it("parses plain valid JSON", () => {
    const payload = { formData: { name: "Vaporwave" } };
    const result = parseManifestImportText(JSON.stringify(payload));

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.repaired).toBe(false);
    expect(result.data).toEqual(payload);
  });

  it("extracts JSON from fenced code blocks", () => {
    const raw = [
      "Use this manifest:",
      "```json",
      '{"formData":{"name":"Glitch"}}',
      "```",
      "Done.",
    ].join("\n");

    const result = parseManifestImportText(raw);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.repaired).toBe(false);
    expect(result.normalizedText).toContain('"name":"Glitch"');
  });

  it("extracts the first JSON object from mixed text", () => {
    const raw = 'prefix text {"formData":{"slug":"editorial"}} suffix text';
    const result = parseManifestImportText(raw);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    const root = asRecord(result.data);
    const formData = asRecord(root.formData);
    expect(formData.slug).toBe("editorial");
  });

  it("repairs trailing commas", () => {
    const raw = '{"formData":{"name":"Neo",},"assets":{"coverSvg":"<svg></svg>",},}';
    const result = parseManifestImportText(raw);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.repaired).toBe(true);
    const root = asRecord(result.data);
    const formData = asRecord(root.formData);
    expect(formData.name).toBe("Neo");
  });

  it("repairs accidental newlines inside long JSON strings", () => {
    const raw =
      '{"formData":{"buttonCode":"<button className=\\"border-\n  white/50\\">A</button>"}}';
    const result = parseManifestImportText(raw);

    expect(result.ok).toBe(true);
    if (!result.ok) return;

    expect(result.repaired).toBe(true);
    const root = asRecord(result.data);
    const formData = asRecord(root.formData);
    expect(formData.buttonCode).toBe('<button className="border-white/50">A</button>');
  });
});
