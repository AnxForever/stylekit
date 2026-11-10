// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ComponentPreview } from "@/components/style-preview/component-preview";
import { liquidGlass } from "@/lib/styles/liquid-glass";

describe("component preview", () => {
  beforeEach(() => {
    trackEventMock.mockReset();
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "zh",
      setLocale: vi.fn(),
    });
  });

  it("passes the style slug to code copy analytics", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });

    render(
      <ComponentPreview
        styleSlug="corporate-clean"
        components={{
          button: {
            name: "按钮",
            description: "测试按钮",
            code: "<button>Start</button>",
          },
        }}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "export.copyCode" }));

    await waitFor(() =>
      expect(trackEventMock).toHaveBeenCalledWith("code_copy", {
        slug: "corporate-clean",
        language: "tsx",
      })
    );
  });

  it("falls back to the translated heading and drops untranslated copy in English", () => {
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });

    const { container } = render(
      <ComponentPreview
        components={{
          button: {
            name: "按钮",
            description: "测试按钮",
            code: "<button>Start</button>",
          },
        }}
      />
    );

    expect(container.querySelector("h4")).toHaveTextContent("preview.tab.button");
    expect(screen.queryByText("测试按钮")).not.toBeInTheDocument();
  });

  it("prefers English component copy when the style provides it", () => {
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });

    const { container } = render(
      <ComponentPreview
        components={{
          button: {
            name: "按钮",
            nameEn: "Button",
            description: "测试按钮",
            descriptionEn: "A hard-edged button.",
            code: "<button>Start</button>",
          },
        }}
      />
    );

    expect(container.querySelector("h4")).toHaveTextContent("Button");
    expect(screen.getByText("A hard-edged button.")).toBeInTheDocument();
  });

  it("renders fixed-position nav snippets inside a transformed preview container", () => {
    const { container } = render(
      <ComponentPreview
        components={{
          nav: {
            name: "导航栏",
            description: "测试 fixed 导航预览",
            code: `<header className=\"fixed top-0 left-0 right-0 h-16 bg-[#F9F8F6]\">\n  <nav className=\"flex items-center px-4 h-full\">Editorial</nav>\n</header>`,
          },
        }}
      />
    );

    const containingBlock = container.querySelector(".transform-gpu");
    expect(containingBlock).toBeInTheDocument();
    expect(containingBlock).toHaveClass("min-h-[200px]");

    const renderedHeader = container.querySelector("header");
    expect(renderedHeader).toBeInTheDocument();
    expect(renderedHeader).toHaveClass("fixed");
  });

  it("renders Liquid Glass imports as real React controls while preserving copyable source", async () => {
    const { container } = render(
      <ComponentPreview styleSlug="liquid-glass" components={liquidGlass.components} />
    );

    const button = await screen.findByRole("button", { name: "查看光线" });
    const preview = () => container.querySelector("[data-liquid-glass-detail]");
    expect(preview()).toHaveAttribute("data-liquid-glass-detail", "button");
    expect(preview()?.querySelector("[data-liquid-optics]")).toBeInTheDocument();
    expect(preview()).not.toHaveTextContent("import {");
    expect(container.querySelector("pre code")).toHaveTextContent("import { LiquidGlass }");
    fireEvent.click(button);
    expect(screen.getByRole("button", { name: "收起光线" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "preview.tab.card" }));
    await screen.findByRole("heading", { name: "冰河湖的光" });
    expect(preview()?.querySelector("[data-liquid-optics]")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "preview.tab.input" }));
    const input = await screen.findByRole("searchbox", { name: "搜索地点" });
    fireEvent.change(input, { target: { value: "Iceland" } });
    expect(input).toHaveValue("Iceland");
    expect(preview()).not.toHaveTextContent("import {");
    expect(preview()?.querySelector("[data-liquid-optics]")).toBeInTheDocument();
  });

  it("keeps the Liquid Glass navigation, hero and footer tabs usable", async () => {
    const { container } = render(
      <ComponentPreview styleSlug="liquid-glass" components={liquidGlass.components} defaultShowCode={false} />
    );
    await screen.findByRole("button", { name: "查看光线" });
    fireEvent.click(screen.getByRole("button", { name: "preview.tab.nav" }));
    fireEvent.click(await screen.findByRole("button", { name: "倒影" }));
    expect(screen.getByRole("button", { name: "倒影" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "倒影" })).toBeInTheDocument();
    expect(container.querySelector("[data-liquid-optics]")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Hero" }));
    const action = await screen.findByRole("button", { name: "查看场景笔记" });
    fireEvent.click(action);
    expect(screen.getByRole("button", { name: "收起场景笔记" })).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/杰古沙龙冰河湖位于冰岛东南部/)).toBeVisible();
    expect(container.querySelector("[data-liquid-optics]")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "preview.tab.footer" }));
    expect(await screen.findByRole("link", { name: "打开完整场景" })).toHaveAttribute("href", "/zh/styles/liquid-glass/showcase");
    expect(container.querySelector("[data-liquid-glass-detail]")).not.toHaveTextContent("import {");
  });

  it("preserves the extracted preview-assets path even when the slug is liquid-glass", () => {
    const { container } = render(
      <ComponentPreview
        styleSlug="liquid-glass"
        defaultShowCode={false}
        previewAssets={{}}
        components={{ button: { name: "按钮", description: "资产预览", code: "<button>Extracted sample</button>" } }}
      />
    );
    expect(container.querySelector("[data-stylekit-preview]")).toHaveTextContent("Extracted sample");
    expect(container.querySelector("[data-liquid-glass-detail]")).not.toBeInTheDocument();
    expect(container.querySelector(".transform-gpu")).toBeInTheDocument();
  });
});
