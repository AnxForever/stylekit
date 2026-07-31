import { describe, expect, it } from "vitest";
import { buildStyleFaq, generateFaqJsonLd } from "@/lib/seo/style-faq";
import { styles as designStyles } from "@/lib/styles";

describe("buildStyleFaq", () => {
  const glass = designStyles.find((s) => s.slug === "glassmorphism")!;

  it("builds English FAQs from real style fields", () => {
    const faqs = buildStyleFaq(glass, "en");
    expect(faqs.length).toBeGreaterThanOrEqual(4);
    expect(faqs[0].question).toContain(glass.nameEn);
    for (const faq of faqs) {
      expect(faq.question.length).toBeGreaterThan(8);
      expect(faq.answer.length).toBeGreaterThan(20);
      expect(faq.answer).not.toContain("undefined");
    }
  });

  it("builds Chinese FAQs with zh fields", () => {
    const faqs = buildStyleFaq(glass, "zh");
    expect(faqs[0].question).toContain(glass.name);
    for (const faq of faqs) {
      expect(faq.answer).not.toContain("undefined");
    }
  });

  it("includes the palette hex values in the colors answer when primary is hex", () => {
    const hexStyle = designStyles.find((s) =>
      /^#[0-9a-f]{6}$/i.test(s.colors.primary) && /^#[0-9a-f]{6}$/i.test(s.colors.secondary)
    )!;
    const faqs = buildStyleFaq(hexStyle, "en");
    const colorFaq = faqs.find((f) => f.question.includes("colors"));
    expect(colorFaq).toBeDefined();
    expect(colorFaq!.answer).toContain(hexStyle.colors.primary);
  });

  it("omits the colors FAQ when the palette is not plain hex", () => {
    const faqs = buildStyleFaq(glass, "en");
    expect(faqs.find((f) => f.question.includes("colors"))).toBeUndefined();
  });

  it("produces non-empty FAQs for every registered style in both locales", () => {
    for (const style of designStyles) {
      for (const locale of ["en", "zh"] as const) {
        const faqs = buildStyleFaq(style, locale);
        expect(faqs.length, `${style.slug} ${locale}`).toBeGreaterThanOrEqual(2);
        for (const faq of faqs) {
          expect(faq.answer, `${style.slug} ${locale}`).not.toContain("undefined");
          expect(faq.answer.trim().length, `${style.slug} ${locale}`).toBeGreaterThan(10);
        }
      }
    }
  });
});

describe("generateFaqJsonLd", () => {
  it("emits valid FAQPage structure", () => {
    const faqs = [{ question: "Q?", answer: "A." }];
    const schema = generateFaqJsonLd(faqs, "https://example.com/styles/x");
    expect(schema["@type"]).toBe("FAQPage");
    expect(schema.mainEntity).toHaveLength(1);
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });
});
