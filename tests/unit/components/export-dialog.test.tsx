// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ExportDialog } from "@/components/export-dialog";
import { downloadTokens } from "@/lib/export/figma-tokens";
import type { DesignStyle } from "@/lib/styles";

const localeMock = vi.hoisted(() => ({ value: "en" as "en" | "zh" }));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: localeMock.value }),
}));

vi.mock("@/lib/export/figma-tokens", () => ({
  exportStyleTokens: (_style: unknown, format: string) => `tokens:${format}`,
  downloadTokens: vi.fn(),
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const style = { name: "测试风格", nameEn: "Test" } as unknown as DesignStyle;

function ExportDialogHarness({
  initiallyOpen = true,
}: {
  initiallyOpen?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(initiallyOpen);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button type="button">Open token export</button>
      </Dialog.Trigger>
      {isOpen ? <ExportDialog style={style} /> : null}
    </Dialog.Root>
  );
}

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) {
    Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  } else {
    Reflect.deleteProperty(navigator, "clipboard");
  }
});

beforeEach(() => {
  localeMock.value = "en";
  vi.clearAllMocks();
});

describe("ExportDialog", () => {
  it("offers a manual copy fallback and clears feedback when the format changes", async () => {
    const writeText = vi
      .fn()
      .mockRejectedValueOnce(new Error("Permission denied"))
      .mockResolvedValueOnce(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<ExportDialogHarness />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => {
      expect(
        screen.getByRole("textbox", { name: "Code to copy manually" }),
      ).toHaveValue("tokens:figma-tokens");
    });

    fireEvent.click(screen.getByRole("button", { name: "Style Dictionary" }));
    expect(
      screen.queryByRole("textbox", { name: "Code to copy manually" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Copied!" }),
      ).toBeInTheDocument();
    });
    fireEvent.click(screen.getByRole("button", { name: "CSS Variables" }));

    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();
  });

  it("traps focus, closes on Escape, and restores focus to the opener", async () => {
    render(<ExportDialogHarness initiallyOpen={false} />);
    const trigger = screen.getByRole("button", { name: "Open token export" });
    trigger.focus();
    fireEvent.click(trigger);

    const dialog = await screen.findByRole("dialog", { name: "Design Tokens" });
    const closeButton = screen.getByRole("button", { name: "Close token export" });

    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAccessibleDescription("测试风格 · Test");
    await waitFor(() => expect(closeButton).toHaveFocus());

    trigger.focus();
    await waitFor(() => {
      expect(dialog).toContainElement(document.activeElement as HTMLElement);
    });

    fireEvent.keyDown(document.activeElement ?? dialog, { key: "Escape" });
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
    expect(trigger).toHaveFocus();
  });

  it("keeps token download working and localizes dialog controls", () => {
    localeMock.value = "zh";
    render(<ExportDialogHarness />);

    expect(screen.getByRole("dialog", { name: "设计令牌" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "关闭令牌导出" }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "CSS Variables" }));
    fireEvent.click(screen.getByRole("button", { name: "下载" }));

    expect(downloadTokens).toHaveBeenCalledWith(style, "css-variables");
    expect(screen.getByRole("button", { name: "复制" })).toBeInTheDocument();
  });
});