import { submitCopy } from "@/lib/i18n/submit-copy";

function collectPaths(value: unknown, prefix = ""): string[] {
  if (Array.isArray(value)) {
    return value.flatMap((item, index) => collectPaths(item, `${prefix}[${index}]`));
  }
  if (typeof value !== "object" || value === null) {
    return [prefix];
  }

  return Object.entries(value as Record<string, unknown>).flatMap(([key, child]) => {
    const next = prefix ? `${prefix}.${key}` : key;
    return collectPaths(child, next);
  });
}

describe("submit copy", () => {
  it("has matching key paths between en and zh", () => {
    const enPaths = collectPaths(submitCopy.en).sort();
    const zhPaths = collectPaths(submitCopy.zh).sort();
    expect(zhPaths).toEqual(enPaths);
  });

  it("has non-empty locale toggle labels", () => {
    expect(submitCopy.en.localeSwitch.trim().length).toBeGreaterThan(0);
    expect(submitCopy.zh.localeSwitch.trim().length).toBeGreaterThan(0);
  });
});
