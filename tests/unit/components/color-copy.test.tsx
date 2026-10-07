// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ColorsExplorer } from "@/components/colors/colors-explorer";
import { CopyValueRow } from "@/components/colors/copy-value-row";
import type { StyleColorEntry } from "@/lib/styles/colors";

vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "zh" }) }));
vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const entries: StyleColorEntry[] = [{
  slug: "neo-brutalist", name: "新粗野主义", nameEn: "Neo Brutalist", category: "expressive",
  colors: { primary: "#000000", secondary: "#ffffff", accent: ["#ff0000"] },
  swatches: ["#000000", "#ffffff", "#ff0000"],
}];

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("live color copy flows", () => {
  it("keeps the failed swatch value available inside its palette", async () => {
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: undefined });
    render(<ColorsExplorer entries={entries} swatchCount={3} />);
    fireEvent.click(screen.getByRole("button", { name: "复制 #ff0000" }));
    const palette = screen.getByRole("region", { name: "Neo Brutalist palette" });
    await waitFor(() => expect(within(palette).getByRole("textbox")).toHaveValue("#ff0000"));
    expect(screen.queryByText("已复制到剪贴板。")).not.toBeInTheDocument();
    expect(within(palette).getByRole("link", { name: "#ff0000 色值详情" })).toHaveAttribute("href", "/colors/ff0000");
  });

  it("copies a searched palette value and announces success", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<ColorsExplorer entries={entries} swatchCount={3} />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "#FF0000" } });
    fireEvent.click(screen.getByRole("button", { name: "复制 #ff0000" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("已复制到剪贴板。"));
    expect(writeText).toHaveBeenCalledWith("#ff0000");
  });

  it("recovers a failed color-detail copy on retry", async () => {
    const writeText = vi.fn().mockRejectedValueOnce(new Error("denied")).mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<CopyValueRow label="RGB" value="rgb(255, 0, 0)" />);
    const copyButton = screen.getByRole("button");
    fireEvent.click(copyButton);
    await waitFor(() => expect(screen.getByRole("textbox")).toHaveValue("rgb(255, 0, 0)"));
    fireEvent.click(copyButton);
    await waitFor(() => expect(copyButton).toHaveTextContent("已复制"));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(writeText).toHaveBeenCalledTimes(2);
  });
});
