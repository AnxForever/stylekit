// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

import { PromptPairExporter } from "@/components/style-preview/prompt-pair-exporter";

describe("PromptPairExporter", () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    trackEventMock.mockReset();
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

  it("copies hard prompt with style identity, authored rules and generated spec", async () => {
    render(
      <PromptPairExporter
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="BASE_RULES"
        enhancedRules="ENHANCED_RULES"
        doList={["留白"]}
        dontList={["厚边框"]}
        keywords={["editorial"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "promptPair.copy" })[0]);

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    const copied = writeTextMock.mock.calls[0]?.[0] ?? "";

    expect(copied).toContain("STYLEKIT_STYLE_REFERENCE");
    expect(copied).toContain("style_name: 编辑杂志");
    expect(copied).toContain("style_slug: editorial");
    expect(copied).toContain("# Hard Prompt");
    expect(copied).toContain("ENHANCED_RULES");
    // Both sources ship: the authored rules explain composition, the generated
    // spec pins the classes.
    expect(copied).toContain("BASE_RULES");
    expect(trackEventMock).toHaveBeenCalledWith("prompt_copy", {
      slug: "editorial",
      prompt_type: "hard",
      source: "prompt-pair",
      locale: "zh",
    });
    expect(trackEventMock).not.toHaveBeenCalledWith("code_copy", expect.anything());
  });

  it("updates soft prompt identity after rerendering a different style", async () => {
    const { rerender } = render(
      <PromptPairExporter
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="RULES_A"
        doList={["留白"]}
        dontList={["厚边框"]}
        keywords={["editorial", "typography"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "promptPair.copy" })[1]);
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0]?.[0]).toContain("style_slug: editorial");

    rerender(
      <PromptPairExporter
        styleName="新粗野主义"
        styleSlug="neo-brutalist"
        aiRules="RULES_B"
        doList={["强对比"]}
        dontList={["柔和阴影"]}
        keywords={["neo-brutalist", "contrast"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: /promptPair\.(copy|copied)/ })[1]);
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(2));

    const copied = writeTextMock.mock.calls[1]?.[0] ?? "";
    expect(copied).toContain("style_name: 新粗野主义");
    expect(copied).toContain("style_slug: neo-brutalist");
    expect(copied).not.toContain("style_slug: editorial");
    expect(trackEventMock).toHaveBeenLastCalledWith("prompt_copy", {
      slug: "neo-brutalist",
      prompt_type: "soft",
      source: "prompt-pair",
      locale: "zh",
    });
  });

  it("downloads hard prompt with deterministic filename", () => {
    const objectUrlSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:mock");
    const revokeSpy = vi.spyOn(URL, "revokeObjectURL").mockImplementation(() => {});
    const originalCreateElement = document.createElement.bind(document);
    const anchorClicks: HTMLAnchorElement[] = [];

    const createElementSpy = vi
      .spyOn(document, "createElement")
      .mockImplementation((tagName: string) => {
        const element = originalCreateElement(tagName);
        if (tagName === "a") {
          Object.defineProperty(element, "click", {
            value: vi.fn(),
            configurable: true,
          });
          anchorClicks.push(element as HTMLAnchorElement);
        }
        return element;
      });

    render(
      <PromptPairExporter
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="RULES_A"
        doList={["留白"]}
        dontList={["厚边框"]}
        keywords={["editorial"]}
      />
    );

    fireEvent.click(screen.getAllByRole("button", { name: "promptPair.download" })[0]);

    expect(objectUrlSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).toHaveBeenCalledWith("blob:mock");
    expect(anchorClicks[0]?.download).toBe("editorial-hard-prompt.md");
    expect(trackEventMock).not.toHaveBeenCalledWith("prompt_copy", expect.anything());

    createElementSpy.mockRestore();
    objectUrlSpy.mockRestore();
    revokeSpy.mockRestore();
  });

  it("does not count when both clipboard APIs fail", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("clipboard denied"));
    const execCommandMock = vi.fn().mockReturnValue(false);
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommandMock,
    });

    render(
      <PromptPairExporter
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="RULES"
        doList={[]}
        dontList={[]}
        keywords={[]}
      />
    );
    const copyButton = screen.getAllByRole("button", { name: "promptPair.copy" })[0];
    fireEvent.click(copyButton);

    await waitFor(() => expect(execCommandMock).toHaveBeenCalledWith("copy"));
    expect(trackEventMock).not.toHaveBeenCalled();
    expect(copyButton).toHaveTextContent("promptPair.copy");
  });

  it("counts a successful legacy clipboard fallback", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("clipboard denied"));
    const execCommandMock = vi.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", {
      configurable: true,
      value: execCommandMock,
    });

    render(
      <PromptPairExporter
        styleName="编辑杂志"
        styleSlug="editorial"
        aiRules="RULES"
        doList={[]}
        dontList={[]}
        keywords={[]}
      />
    );
    fireEvent.click(screen.getAllByRole("button", { name: "promptPair.copy" })[1]);

    await waitFor(() => expect(trackEventMock).toHaveBeenCalledWith("prompt_copy", {
      slug: "editorial",
      prompt_type: "soft",
      source: "prompt-pair",
      locale: "zh",
    }));
    expect(execCommandMock).toHaveBeenCalledWith("copy");
  });
});
