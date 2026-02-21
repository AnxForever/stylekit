// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render } from "@testing-library/react";

const { useI18nMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { ComponentPreview } from "@/components/style-preview/component-preview";

describe("component preview", () => {
  beforeEach(() => {
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "zh",
      setLocale: vi.fn(),
    });
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
