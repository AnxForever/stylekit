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

import { AiImplementationPanel } from "@/components/style-preview/ai-implementation-panel";

const baseProps = {
  styleName: "新野兽派",
  styleSlug: "neo-brutalist",
  description: "大胆的黑色粗边框、硬边缘阴影、无圆角、高对比度配色。",
  philosophy: "功能优先：每个元素都有明确的目的。",
  colors: {
    primary: "#000000",
    secondary: "#ffffff",
    accent: ["#ff006e", "#ccff00"],
  },
  aiRules: "RULES_ZH",
  aiRulesEn: "RULES_EN",
  enhancedRules: null,
  doList: ["使用纯黑边框", "保持直角"],
  doListEn: ["Use pure black borders", "Keep sharp corners"],
  dontList: ["禁止使用圆角", "禁止使用模糊阴影"],
  dontListEn: ["Do not use rounded corners", "Do not use blurred shadows"],
  keywords: ["粗边框", "硬阴影"],
  keywordsEn: ["thick borders", "hard shadows"],
};

describe("AiImplementationPanel", () => {
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

  it("renders hard prompt first and copies it", async () => {
    render(<AiImplementationPanel {...baseProps} />);

    expect(screen.getByRole("tab", { name: /硬性提示词/ })).toHaveAttribute(
      "aria-selected",
      "true"
    );
    expect(screen.getByText("默认使用它：复制后追加具体需求，让 AI 直接生成一致、可落地的前端。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "复制" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    const copied = writeTextMock.mock.calls[0]?.[0] ?? "";
    expect(copied).toContain("# Hard Prompt");
    expect(copied).toContain("style_slug: neo-brutalist");
    expect(copied).toContain("## 什么时候用");
    expect(copied).toContain("## 怎么用");
    expect(copied).toContain("RULES_ZH");
  });

  it("switches to design spec and shows the style standard", () => {
    render(<AiImplementationPanel {...baseProps} />);

    fireEvent.click(screen.getByRole("tab", { name: /Design Spec/ }));

    expect(screen.getByText((content) => content.includes("## 视觉系统"))).toBeInTheDocument();
    expect(screen.getByText("当你要理解、改写或审核风格时使用。它解释硬性提示词背后的规则。")).toBeInTheDocument();
  });

  it("switches to creative brief and downloads a deterministic file", () => {
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

    render(<AiImplementationPanel {...baseProps} />);

    fireEvent.click(screen.getByRole("tab", { name: /Creative Brief/ }));
    expect(
      screen.getByText((content) => content.includes("## 什么时候用"))
    ).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("方向探索"))).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "下载" }));

    expect(objectUrlSpy).toHaveBeenCalledTimes(1);
    expect(revokeSpy).toHaveBeenCalledWith("blob:mock");
    expect(anchorClicks[0]?.download).toBe("neo-brutalist-creative-brief.md");

    createElementSpy.mockRestore();
    objectUrlSpy.mockRestore();
    revokeSpy.mockRestore();
  });

  it("supports keyboard navigation across tabs", async () => {
    render(<AiImplementationPanel {...baseProps} />);

    const hardPromptTab = screen.getByRole("tab", { name: /硬性提示词/ });
    fireEvent.keyDown(hardPromptTab, { key: "ArrowRight" });

    const designSpecTab = screen.getByRole("tab", { name: /Design Spec/ });
    expect(designSpecTab).toHaveAttribute("aria-selected", "true");
    await waitFor(() => expect(designSpecTab).toHaveFocus());

    fireEvent.keyDown(designSpecTab, { key: "End" });
    const creativeBriefTab = screen.getByRole("tab", { name: /Creative Brief/ });
    expect(creativeBriefTab).toHaveAttribute("aria-selected", "true");
    await waitFor(() => expect(creativeBriefTab).toHaveFocus());
  });

  it("keeps English generated documents free of Chinese keyword fallback text", () => {
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });

    const propsWithoutEnglishKeywords = {
      ...baseProps,
      styleName: "Neo Brutalist",
      description: "Bold borders, hard shadows, sharp corners, and high contrast.",
      philosophy: "Function-first design with direct visual tension.",
      keywords: ["粗边框", "硬阴影", "bold"],
      keywordsEn: undefined,
    };

    const { container } = render(<AiImplementationPanel {...propsWithoutEnglishKeywords} />);

    fireEvent.click(screen.getByRole("tab", { name: /Design Spec/ }));
    const designSpec = container.querySelector("code")?.textContent ?? "";
    expect(designSpec).toContain("Signature cues: bold, pure black borders");
    expect(designSpec).not.toMatch(/[\u3400-\u9fff]/);

    fireEvent.click(screen.getByRole("tab", { name: /Creative Brief/ }));
    const creativeBrief = container.querySelector("code")?.textContent ?? "";
    expect(creativeBrief).toContain("## Style Signals");
    expect(creativeBrief).toContain("- bold");
    expect(creativeBrief).not.toMatch(/[\u3400-\u9fff]/);
  });

  it("requires three core fields before generating a project brief", () => {
    render(<AiImplementationPanel {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /项目实施简报/ }));
    fireEvent.click(screen.getByRole("button", { name: "生成实施简报" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "请完成项目类型、主要用户和核心任务"
    );
    expect(screen.getByText("请选择项目类型。")).toBeInTheDocument();
    expect(trackEventMock).not.toHaveBeenCalledWith(
      "project_brief_generated",
      expect.anything(),
    );
  });

  it("marks a generated project brief stale when the interface locale changes", async () => {
    const { rerender } = render(<AiImplementationPanel {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /项目实施简报/ }));
    fireEvent.click(screen.getByRole("combobox", { name: /项目类型/ }));
    fireEvent.click(await screen.findByRole("option", { name: "数据后台" }));
    fireEvent.change(screen.getByLabelText(/主要用户/), {
      target: { value: "小型物流团队的运营主管" },
    });
    fireEvent.change(screen.getByLabelText(/核心任务/), {
      target: { value: "查看延误订单并分配负责人" },
    });
    fireEvent.click(screen.getByRole("button", { name: "生成实施简报" }));

    expect(screen.queryByText(/Fields changed/)).not.toBeInTheDocument();

    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });
    rerender(<AiImplementationPanel {...baseProps} />);

    expect(
      screen.getByText("Fields changed. Update the brief before using it."),
    ).toBeInTheDocument();
    expect(screen.queryByText("实施简报已生成。")).not.toBeInTheDocument();
  });

  it("generates, copies, downloads, marks stale, and clears an aggregate-only project brief", async () => {
    const objectUrlSpy = vi.spyOn(URL, "createObjectURL").mockReturnValue("blob:brief");
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

    render(<AiImplementationPanel {...baseProps} />);

    fireEvent.click(screen.getByRole("button", { name: /项目实施简报/ }));
    const projectType = screen.getByRole("combobox", { name: /项目类型/ });
    fireEvent.click(projectType);
    fireEvent.click(await screen.findByRole("option", { name: "数据后台" }));

    fireEvent.change(screen.getByLabelText(/主要用户/), {
      target: { value: "小型物流团队的运营主管" },
    });
    fireEvent.change(screen.getByLabelText(/核心任务/), {
      target: { value: "查看延误订单并分配负责人" },
    });
    fireEvent.click(screen.getByRole("button", { name: "生成实施简报" }));

    expect(screen.getByText("实施简报已生成。")).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("## 核心任务"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("小型物流团队的运营主管"))).toBeInTheDocument();

    const generatedCall = trackEventMock.mock.calls.find(
      ([eventName]) => eventName === "project_brief_generated",
    );
    expect(generatedCall).toEqual([
      "project_brief_generated",
      {
        slug: "neo-brutalist",
        locale: "zh",
        project_type: "dashboard",
        stack_count: 0,
        required_item_count: 0,
        state_count: 0,
        optional_field_count: 0,
        completion_tier: "core",
        source: "style_detail",
      },
    ]);
    expect(JSON.stringify(generatedCall)).not.toContain("小型物流团队");
    expect(JSON.stringify(generatedCall)).not.toContain("查看延误订单");

    writeTextMock.mockClear();
    fireEvent.click(screen.getByRole("button", { name: "复制简报" }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0]?.[0]).toContain("# 项目实施简报");
    expect(trackEventMock).toHaveBeenCalledWith(
      "project_brief_copy",
      generatedCall?.[1],
    );

    fireEvent.click(screen.getByRole("button", { name: "下载简报" }));
    expect(anchorClicks.at(-1)?.download).toBe(
      "neo-brutalist-project-implementation-brief.md",
    );
    expect(revokeSpy).toHaveBeenCalledWith("blob:brief");
    expect(trackEventMock).toHaveBeenCalledWith(
      "project_brief_download",
      generatedCall?.[1],
    );

    fireEvent.change(screen.getByLabelText(/核心任务/), {
      target: { value: "查看延误订单、分配负责人并确认结果" },
    });
    expect(screen.getByText("字段已修改，请更新简报。")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "清空" }));
    expect(screen.getByText("项目上下文已清空。")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "复制简报" })).not.toBeInTheDocument();
    expect(screen.getByLabelText(/主要用户/)).toHaveValue("");
    expect(screen.getByLabelText(/核心任务/)).toHaveValue("");

    createElementSpy.mockRestore();
    objectUrlSpy.mockRestore();
    revokeSpy.mockRestore();
  });
});
