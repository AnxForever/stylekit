// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  downloadAllAsZip: vi.fn(),
  getStyleTokens: vi.fn(),
}));

vi.mock("@/lib/export/style-pack", () => ({
  downloadAllAsZip: mocks.downloadAllAsZip,
}));

vi.mock("@/lib/styles/tokens-registry", () => ({
  getStyleTokens: mocks.getStyleTokens,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({
    locale: "zh",
    t: (key: string) => key === "stylePack.downloadAll" ? "下载全部" : key,
  }),
}));

import { StylePackDownloadButton } from "@/components/style-preview/style-pack-download-button";
import type { DesignStyle } from "@/lib/styles";

const style = { slug: "neo-brutalist" } as DesignStyle;
const tokens = { source: "registry" };

describe("StylePackDownloadButton", () => {
  beforeEach(() => {
    mocks.downloadAllAsZip.mockReset();
    mocks.getStyleTokens.mockReset();
    mocks.getStyleTokens.mockReturnValue(tokens);
  });

  it("loads the style tokens on demand and reports when the complete ZIP starts", async () => {
    let finishDownload: (() => void) | undefined;
    mocks.downloadAllAsZip.mockImplementationOnce(
      () => new Promise<void>((resolve) => { finishDownload = resolve; }),
    );
    const onDownloaded = vi.fn();

    render(
      <StylePackDownloadButton
        style={style}
        version="1.2.3"
        label="下载完整风格包"
        variant="secondary"
        onDownloaded={onDownloaded}
      />,
    );

    const button = screen.getByRole("button", { name: "下载完整风格包" });
    fireEvent.click(button);

    await waitFor(() => expect(button).toHaveTextContent("正在打包…"));
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    expect(mocks.getStyleTokens).toHaveBeenCalledWith("neo-brutalist");
    expect(mocks.downloadAllAsZip).toHaveBeenCalledWith(style, tokens, { version: "1.2.3" });

    finishDownload?.();
    await waitFor(() => expect(button).toHaveTextContent("下载已开始"));
    expect(button).toBeEnabled();
    expect(button).toHaveAttribute("aria-busy", "false");
    expect(onDownloaded).toHaveBeenCalledTimes(1);
  });

  it("shows a useful failure message and permits retrying", async () => {
    mocks.downloadAllAsZip
      .mockRejectedValueOnce(new Error("ZIP generation failed"))
      .mockResolvedValueOnce(undefined);

    render(<StylePackDownloadButton style={style} label="下载完整风格包" />);

    const button = screen.getByRole("button", { name: "下载完整风格包" });
    fireEvent.click(button);

    expect(await screen.findByRole("alert")).toHaveTextContent("打包失败，请重试");
    expect(button).toBeEnabled();

    fireEvent.click(button);
    await waitFor(() => expect(button).toHaveTextContent("下载已开始"));
    expect(mocks.downloadAllAsZip).toHaveBeenCalledTimes(2);
  });
});