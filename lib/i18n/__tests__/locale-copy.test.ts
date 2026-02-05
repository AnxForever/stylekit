import {
  formatLocaleDateTime,
  pickLocale,
  pickOptionDescription,
  pickOptionLabel,
} from "@/lib/i18n/locale-copy";

describe("locale-copy helpers", () => {
  it("pickLocale returns values by locale", () => {
    const copy = {
      zh: { title: "Chinese" },
      en: { title: "English" },
    } as const;

    expect(pickLocale("zh", copy)).toEqual({ title: "Chinese" });
    expect(pickLocale("en", copy)).toEqual({ title: "English" });
  });

  it("pickOptionLabel returns localized label", () => {
    const option = { labelZh: "Label Zh", labelEn: "Label En" };

    expect(pickOptionLabel("zh", option)).toBe("Label Zh");
    expect(pickOptionLabel("en", option)).toBe("Label En");
  });

  it("pickOptionDescription returns localized description", () => {
    const option = {
      labelZh: "Label Zh",
      labelEn: "Label En",
      descriptionZh: "Desc Zh",
      descriptionEn: "Desc En",
    };

    expect(pickOptionDescription("zh", option)).toBe("Desc Zh");
    expect(pickOptionDescription("en", option)).toBe("Desc En");
  });

  it("formatLocaleDateTime returns fallback for invalid dates", () => {
    expect(formatLocaleDateTime("invalid-date", "en", "fallback-value")).toBe("fallback-value");
  });

  it("formatLocaleDateTime formats valid dates", () => {
    const value = "2026-01-01T12:34:56";
    const zh = formatLocaleDateTime(value, "zh");
    const en = formatLocaleDateTime(value, "en");

    expect(zh).toBeTruthy();
    expect(en).toBeTruthy();
    expect(zh).not.toBe("unknown time");
    expect(en).not.toBe("unknown time");
  });
});

