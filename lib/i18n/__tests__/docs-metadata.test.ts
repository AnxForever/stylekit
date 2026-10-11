import { describe, expect, it, vi } from "vitest";
import { generateMetadata } from "@/app/[locale]/docs/page";

vi.mock("@/app/docs/page", () => ({ default: () => null }));

describe("docs route metadata", () => {
  it("publishes the English route with its own canonical and language alternates", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "en" }) });

    expect(metadata.title).toBe("Documentation");
    expect(metadata.description).toContain("design tokens");
    expect(metadata.alternates?.canonical).toMatch(/\/en\/docs$/);
    expect(metadata.alternates?.languages).toMatchObject({
      en: expect.stringMatching(/\/en\/docs$/),
      "zh-CN": expect.stringMatching(/\/zh\/docs$/),
    });
  });

  it("publishes Chinese text and canonical metadata on the Chinese route", async () => {
    const metadata = await generateMetadata({ params: Promise.resolve({ locale: "zh" }) });

    expect(metadata.title).toContain("文档");
    expect(metadata.description).toContain("设计令牌");
    expect(metadata.alternates?.canonical).toMatch(/\/zh\/docs$/);
    expect(metadata.openGraph).toMatchObject({ locale: "zh_CN" });
  });
});
