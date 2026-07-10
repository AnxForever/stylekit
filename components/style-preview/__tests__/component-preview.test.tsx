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
});
