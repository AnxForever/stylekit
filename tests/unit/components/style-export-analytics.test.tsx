/** @vitest-environment jsdom */

import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { AnchorHTMLAttributes } from "react";
import type { DesignStyle } from "@/lib/styles";

const { trackEventMock, copyMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  copyMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({ trackEvent: trackEventMock }));
vi.mock("@/lib/hooks/use-clipboard", () => ({ useClipboard: () => ({ copy: copyMock }) }));
vi.mock("@/lib/export/figma-tokens", () => ({ exportStyleTokens: () => "tokens" }));
vi.mock("@/lib/i18n/context", () => ({
  useI18n: () => ({ locale: "en", t: (key: string) => key }),
}));
vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: (props: AnchorHTMLAttributes<HTMLAnchorElement>) => <a {...props} />,
}));

import { TokenCopyButton } from "@/components/style-preview/token-copy-button";
import { ShowcaseDownloadButton } from "@/components/showcase/showcase-download-button";

beforeEach(() => {
  trackEventMock.mockReset();
  copyMock.mockReset();
});

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("successful style exports", () => {
  it("does not count a failed clipboard operation", async () => {
    copyMock.mockResolvedValue(false);
    render(<TokenCopyButton style={{ slug: "editorial" } as DesignStyle} format="css-variables" label="Copy tokens" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy tokens" }));
    await waitFor(() => expect(copyMock).toHaveBeenCalled());
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("counts a successful clipboard operation once", async () => {
    copyMock.mockResolvedValue(true);
    render(<TokenCopyButton style={{ slug: "editorial" } as DesignStyle} format="css-variables" label="Copy tokens" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy tokens" }));
    await waitFor(() => expect(trackEventMock).toHaveBeenCalledTimes(1));
    expect(trackEventMock).toHaveBeenCalledWith("style_export", { slug: "editorial", format: "css-variables" });
  });

  it("does not count a failed ZIP response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("unavailable", { status: 503 })));
    render(<ShowcaseDownloadButton slug="editorial" />);
    fireEvent.click(screen.getByRole("button", { name: "styleDetail.downloadShowcase" }));
    await screen.findByRole("button", { name: "styleDetail.showcaseDownloadError" });
    expect(trackEventMock).not.toHaveBeenCalled();
  });

  it("counts only after the delivered ZIP is handed to the browser", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("zip")));
    Object.defineProperty(URL, "createObjectURL", { value: vi.fn(() => "blob:style-export"), configurable: true });
    Object.defineProperty(URL, "revokeObjectURL", { value: vi.fn(), configurable: true });
    const click = vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {
      expect(trackEventMock).not.toHaveBeenCalled();
    });
    render(<ShowcaseDownloadButton slug="editorial" />);
    fireEvent.click(screen.getByRole("button", { name: "styleDetail.downloadShowcase" }));
    await screen.findByRole("button", { name: "styleDetail.showcaseDownloaded" });
    expect(click).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledTimes(1);
    expect(trackEventMock).toHaveBeenCalledWith("style_export", { slug: "editorial", format: "showcase-zip" });
  });
});
