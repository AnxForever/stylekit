import { translations } from "@/lib/i18n/translations";

function sortedKeys(input: Record<string, string>): string[] {
  return Object.keys(input).sort();
}

describe("translations consistency", () => {
  it("keeps zh and en key sets aligned", () => {
    const zh = translations.zh as Record<string, string>;
    const en = translations.en as Record<string, string>;

    expect(sortedKeys(en)).toEqual(sortedKeys(zh));
  });

  it("keeps all translation values non-empty", () => {
    const locales = [translations.zh, translations.en] as const;

    for (const localeMap of locales) {
      for (const [key, value] of Object.entries(localeMap as Record<string, string>)) {
        expect(value.trim().length, `empty translation at key: ${key}`).toBeGreaterThan(0);
      }
    }
  });

  it("contains developers page keys in both locales", () => {
    const requiredKeys = [
      "developers.badge",
      "developers.title",
      "developers.tabs.cli",
      "developers.tabs.mcp",
      "developers.tabs.api",
      "developers.workflow.pathA.title",
      "developers.workflow.pathB.title",
      "developers.mcp.tools.search_knowledge",
      "developers.mcp.tools.lint_code",
      "developers.api.endpoints.styleExtract",
    ];

    const zh = translations.zh as Record<string, string>;
    const en = translations.en as Record<string, string>;

    for (const key of requiredKeys) {
      expect(zh[key]).toBeTruthy();
      expect(en[key]).toBeTruthy();
    }
  });
});
