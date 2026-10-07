// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ClipboardFeedback } from "@/components/ui/clipboard-feedback";
import { useClipboard } from "@/lib/hooks/use-clipboard";

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("useClipboard", () => {
  it("reports unavailable clipboard access and preserves text for manual copying", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    const { result } = renderHook(() => useClipboard());
    let copied = true;

    await act(async () => {
      copied = await result.current.copy(".card { color: red; }", "card-css");
    });

    expect(copied).toBe(false);
    expect(result.current.result).toEqual({
      id: "card-css",
      state: "failed",
      text: ".card { color: red; }",
    });
  });

  it("reports permission failures and renders a selectable localized fallback", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockRejectedValue(new Error("Permission denied")) },
    });
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy("pnpm add example", "install");
    });

    render(<ClipboardFeedback result={result.current.result} locale="zh" />);
    expect(screen.getByText("无法访问剪贴板，请选中下方代码并手动复制。")).toBeInTheDocument();
    const textarea = screen.getByRole("textbox", { name: "需要手动复制的代码" });
    expect(textarea).toHaveValue("pnpm add example");
    fireEvent.focus(textarea);
    expect(textarea).toHaveProperty("selectionStart", 0);
    expect(textarea).toHaveProperty("selectionEnd", "pnpm add example".length);
  });

  it("does not let a late older request replace the latest copy result", async () => {
    let rejectOlder!: (reason?: unknown) => void;
    let resolveNewer!: () => void;
    const olderWrite = new Promise<void>((_resolve, reject) => {
      rejectOlder = reject;
    });
    const newerWrite = new Promise<void>((resolve) => {
      resolveNewer = resolve;
    });
    const writeText = vi.fn((text: string) => text === "older" ? olderWrite : newerWrite);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    const { result } = renderHook(() => useClipboard());
    let olderCopy!: Promise<boolean>;
    let newerCopy!: Promise<boolean>;

    act(() => {
      olderCopy = result.current.copy("older", "old-id");
    });
    act(() => {
      newerCopy = result.current.copy("newer", "new-id");
    });

    await act(async () => {
      resolveNewer();
      await newerCopy;
    });
    await act(async () => {
      rejectOlder(new Error("Late failure"));
      await olderCopy;
    });

    expect(result.current.result).toEqual({ id: "new-id", state: "copied", text: "newer" });
  });

  it("keeps a newer copied state until its own expiry timer", async () => {
    vi.useFakeTimers();
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { result } = renderHook(() => useClipboard({ copiedDuration: 1000 }));

    await act(async () => {
      await result.current.copy("first", "first-id");
    });
    act(() => {
      vi.advanceTimersByTime(800);
    });
    await act(async () => {
      await result.current.copy("second", "second-id");
    });
    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.result).toEqual({ id: "second-id", state: "copied", text: "second" });

    act(() => {
      vi.advanceTimersByTime(800);
    });
    expect(result.current.result).toBeNull();
  });

  it("does not label changed generated text as copied", async () => {
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: vi.fn().mockResolvedValue(undefined) },
    });
    const { result } = renderHook(() => useClipboard());

    await act(async () => {
      await result.current.copy("linear-gradient(0deg, red, blue)", "gradient-css");
    });

    expect(result.current.isCopied("gradient-css", "linear-gradient(0deg, red, blue)")).toBe(true);
    expect(result.current.isCopied("gradient-css", "linear-gradient(90deg, red, blue)")).toBe(false);
    const view = render(
      <ClipboardFeedback
        result={result.current.result}
        locale="en"
        currentText="linear-gradient(90deg, red, blue)"
      />,
    );
    expect(view.container).toBeEmptyDOMElement();
  });
});
