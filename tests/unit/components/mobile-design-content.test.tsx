// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MobileDesignContent } from "@/components/mobile/mobile-design-content";

vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "zh" }) }));
vi.mock("@/components/mobile/phone-preview", () => ({
  PhonePreview: ({ scenario }: { scenario: string }) => <div data-testid="phone-preview">{scenario}</div>,
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("mobile design page", () => {
  it("filters libraries by platform and resets an empty search", () => {
    render(<MobileDesignContent />);
    fireEvent.click(within(screen.getByRole("group", { name: "组件技术栈" })).getByRole("button", { name: "SwiftUI / iOS" }));
    expect(screen.getByRole("heading", { name: "ChunUI" })).toBeInTheDocument();
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索组件库" }), { target: { value: "no-such-component-xyz" } });
    expect(screen.getByRole("heading", { name: "没有找到匹配的组件库" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "重置筛选" }));
    expect(screen.getByRole("searchbox", { name: "搜索组件库" })).toHaveValue("");
    expect(screen.getByRole("button", { name: "全部平台" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("heading", { name: "ChunUI" })).toBeInTheDocument();
  });

  it("copies the currently selected scenario and platform", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<MobileDesignContent />);
    fireEvent.click(screen.getByRole("button", { name: "商品购买" }));
    fireEvent.click(screen.getByRole("button", { name: "SwiftUI / iOS" }));
    expect(screen.getByTestId("phone-preview")).toHaveTextContent("commerce");
    fireEvent.click(screen.getByRole("button", { name: "复制开发要求" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "已复制" })).toBeInTheDocument());
    expect(writeText).toHaveBeenCalledOnce();
    expect(writeText.mock.calls[0][0]).toContain("商品购买");
    expect(writeText.mock.calls[0][0]).toContain("ChunUI");
    expect(writeText.mock.calls[0][0]).not.toContain("ant-design-mobile");
    fireEvent.click(screen.getByRole("button", { name: "任务管理" }));
    expect(screen.getByRole("button", { name: "复制开发要求" })).toBeInTheDocument();
  });

  it("keeps the brief readable when clipboard access fails", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Permission denied")) },
    });
    render(<MobileDesignContent />);
    fireEvent.click(screen.getByRole("button", { name: "复制开发要求" }));
    await waitFor(() => expect(screen.getByText("剪贴板不可用，请选中下方文本手动复制。")).toBeInTheDocument());
    expect(screen.getByText("查看完整开发要求")).toBeInTheDocument();
    expect(screen.getByText("查看完整开发要求").closest("details")).toHaveAttribute("open");
    expect(screen.queryByRole("button", { name: "已复制" })).not.toBeInTheDocument();
  });
});
