// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ExportDialog } from "@/components/export-dialog";
import type { DesignStyle } from "@/lib/styles";

vi.mock("@/lib/export/figma-tokens", () => ({
  exportStyleTokens: (_style: unknown, format: string) => `tokens:${format}`,
  downloadTokens: vi.fn(),
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const style = { name: "Test", nameEn: "Test" } as unknown as DesignStyle;

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("ExportDialog clipboard feedback", () => {
  it("offers a manual copy fallback and clears feedback when the format changes", async () => {
    const writeText = vi.fn()
      .mockRejectedValueOnce(new Error("Permission denied"))
      .mockResolvedValueOnce(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<ExportDialog style={style} isOpen onClose={vi.fn()} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => {
      expect(screen.getByRole("textbox", { name: "Code to copy manually" })).toHaveValue(
        "tokens:figma-tokens",
      );
    });

    fireEvent.click(screen.getByRole("button", { name: "Style Dictionary" }));
    expect(screen.queryByRole("textbox", { name: "Code to copy manually" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied!" })).toBeInTheDocument());
    fireEvent.click(screen.getByRole("button", { name: "CSS Variables" }));

    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(screen.queryByText("Copied to clipboard.")).not.toBeInTheDocument();
  });
});
