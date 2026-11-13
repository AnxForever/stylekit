import { describe, expect, it } from "vitest";
import { applyRequestMetadata, localizeMetadata } from "@/lib/i18n/metadata";
import { getLocaleDocumentContext } from "@/lib/i18n/request";
import {
  getIndexableLocalesForPath,
  getLocaleRouteStrategy,
} from "@/lib/i18n/routing";
import { getLegalMetadata, type LegalDocument } from "@/lib/legal/content";

describe("localized legal page metadata", () => {
  it.each([
    ["privacy", "en", "Privacy Policy"],
    ["privacy", "zh", "隐私政策"],
    ["terms", "en", "Terms of Use"],
    ["terms", "zh", "使用条款"],
  ] as const)(
    "builds localized metadata and alternates for %s in %s",
    (document: LegalDocument, locale, expectedTitle) => {
      const metadata = localizeMetadata(
        getLegalMetadata(document, locale),
        locale,
        `/${document}`
      );
      const localePath = locale === "zh" ? "/zh" : "/en";

      expect(metadata.title).toBe(expectedTitle);
      expect(metadata.alternates?.canonical).toBe(
        `https://www.stylekit.top${localePath}/${document}`
      );
      expect(metadata.alternates?.languages).toMatchObject({
        en: `https://www.stylekit.top/en/${document}`,
        "zh-CN": `https://www.stylekit.top/zh/${document}`,
        "x-default": `https://www.stylekit.top/en/${document}`,
      });
      expect(metadata.openGraph?.locale).toBe(locale === "zh" ? "zh_CN" : "en_US");
    }
  );

  it.each(["privacy", "terms"] as const)(
    "keeps the root %s alias localized for a Chinese request",
    (document) => {
      const context = getLocaleDocumentContext("zh", `/${document}`);
      const metadata = applyRequestMetadata(
        getLegalMetadata(document, "zh"),
        context
      );

      expect(getLocaleRouteStrategy(`/${document}`)).toBe("filesystem");
      expect(getIndexableLocalesForPath(`/${document}`)).toEqual(["en", "zh"]);
      expect(metadata.alternates?.canonical).toBe(
        `https://www.stylekit.top/zh/${document}`
      );
      expect(metadata.alternates?.languages).toMatchObject({
        en: `https://www.stylekit.top/en/${document}`,
        "zh-CN": `https://www.stylekit.top/zh/${document}`,
      });
    }
  );
});
