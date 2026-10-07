// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PhonePreview } from "@/components/mobile/phone-preview";

describe("PhonePreview", () => {
  it("saves a reading and shows it on the reading list", () => {
    render(<PhonePreview scenario="reading" locale="zh" />);

    fireEvent.click(screen.getByRole("button", { name: "收藏文章" }));
    expect(screen.getByRole("button", { name: "移除收藏" })).toHaveAttribute("aria-pressed", "true");

    fireEvent.click(screen.getByRole("button", { name: "书架" }));
    expect(screen.getByRole("heading", { name: "稍后再读" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "把一场雨读完" })).toBeInTheDocument();
  });

  it("selects a product size, closes the sheet with Escape, and confirms bag quantity", async () => {
    render(<PhonePreview scenario="commerce" locale="zh" />);
    const trigger = screen.getByRole("button", { name: "规格：280 ml" });

    fireEvent.click(trigger);
    const dialog = await screen.findByRole("dialog", { name: "选择容量" });
    const largeSize = screen.getByRole("button", { name: /360 ml/ });
    fireEvent.click(largeSize);
    expect(largeSize).toHaveAttribute("aria-pressed", "true");

    fireEvent.keyDown(dialog, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());
    expect(trigger).toHaveFocus();
    expect(screen.getByRole("button", { name: "规格：360 ml" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "加入购物袋" }));
    expect(screen.getByText("已加入购物袋 · 1")).toBeInTheDocument();
    expect(screen.getByLabelText("购物袋，1 件")).toBeInTheDocument();
  });

  it("updates the task checkbox and completion progress together", () => {
    render(<PhonePreview scenario="workspace" locale="zh" />);

    const checkbox = screen.getByRole("checkbox", { name: /确认首页文案/ });
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
    expect(screen.getByRole("progressbar", { name: "今日任务完成进度" })).toHaveAttribute("aria-valuenow", "2");
    expect(screen.getByText("已完成 2 / 3 项")).toBeInTheDocument();
  });
});
