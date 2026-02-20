// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ExamplePrompts } from "@/components/style-preview/example-prompts";
import { QuickStartGuide } from "@/components/style-preview/quick-start-guide";
import { RulesExporter } from "@/components/style-preview/rules-exporter";

describe("style preview copy payload identity", () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    writeTextMock.mockReset();
    writeTextMock.mockResolvedValue(undefined);

    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "zh",
      setLocale: vi.fn(),
    });

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });
  });

  it("includes style identity in quick-start copy payload", async () => {
    render(
      <QuickStartGuide
        aiRules="EDITORIAL_RULES"
        styleName="编辑杂志"
        styleSlug="editorial"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "quickStart.step1.button" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    const copied = writeTextMock.mock.calls[0]?.[0] ?? "";

    expect(copied).toContain("STYLEKIT_STYLE_REFERENCE");
    expect(copied).toContain("style_name: 编辑杂志");
    expect(copied).toContain("style_slug: editorial");
    expect(copied).toContain("style_source: /styles/editorial");
    expect(copied).toContain("EDITORIAL_RULES");
  });

  it("updates identity metadata after switching styles", async () => {
    const prompt = {
      title: "生成页面",
      titleEn: "Generate page",
      description: "测试",
      descriptionEn: "test",
      prompt: "Build a landing page.",
    };

    const { rerender } = render(
      <ExamplePrompts
        prompts={[prompt]}
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="RULES_A"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /export\.(copy|copied)/ }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0]?.[0]).toContain("style_slug: editorial");

    rerender(
      <ExamplePrompts
        prompts={[prompt]}
        styleName="新粗野主义"
        styleSlug="neo-brutalist"
        aiRules="RULES_B"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: /export\.(copy|copied)/ }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(2));

    const copied = writeTextMock.mock.calls[1]?.[0] ?? "";
    expect(copied).toContain("style_name: 新粗野主义");
    expect(copied).toContain("style_slug: neo-brutalist");
    expect(copied).not.toContain("style_slug: editorial");
  });

  it("includes style identity in exporter prompt copy", async () => {
    render(
      <RulesExporter
        aiRules="PROMPT_RULES"
        globalCss=".card { border: 1px solid; }"
        styleName="Editorial"
        styleSlug="editorial"
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Prompt" }));
    fireEvent.click(screen.getByRole("button", { name: "export.copy" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    const copied = writeTextMock.mock.calls[0]?.[0] ?? "";

    expect(copied).toContain("style_name: Editorial");
    expect(copied).toContain("style_slug: editorial");
    expect(copied).toContain("style_source: /styles/editorial");
    expect(copied).toContain("PROMPT_RULES");
  });
});
