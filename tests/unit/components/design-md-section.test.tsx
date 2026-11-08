// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ComponentProps } from "react";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({ href, children, ...props }: ComponentProps<"a">) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

vi.mock("@/components/ai/connect-ai-button", () => ({
  ConnectAiButton: () => <button type="button">Connect AI</button>,
}));

import { DesignMdSection } from "@/components/style-preview/design-md-section";

describe("DesignMdSection", () => {
  const writeTextMock = vi.fn();
  const createObjectUrlMock = vi.fn<(blob: Blob) => string>();
  const originalClipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
  const originalCreateObjectUrlDescriptor = Object.getOwnPropertyDescriptor(URL, "createObjectURL");
  let downloadedBlob: Blob | undefined;
  let downloadedFilename: string | undefined;

  beforeEach(() => {
    trackEventMock.mockReset();
    useI18nMock.mockReturnValue({ locale: "en" });
    writeTextMock.mockReset().mockResolvedValue(undefined);
    downloadedBlob = undefined;
    downloadedFilename = undefined;

    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: writeTextMock },
    });

    createObjectUrlMock.mockClear();
    createObjectUrlMock.mockImplementation((blob: Blob) => {
      downloadedBlob = blob;
      return "blob:design-md-test";
    });
    Object.defineProperty(URL, "createObjectURL", {
      configurable: true,
      value: createObjectUrlMock,
    });
    vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(function (this: HTMLAnchorElement) {
      downloadedFilename = this.download;
    });
  });

  it("previews, copies, and downloads the same markdown under the fixed filename", async () => {
    const markdown = "# Editorial system\n\nUse ocean blue for primary actions.";
    render(
      <DesignMdSection
        styleName="Editorial"
        hasSpec
        markdown={markdown}
      />,
    );

    expect(screen.getByRole("heading", { name: "Editorial system" })).toBeVisible();
    expect(screen.getByText("Use ocean blue for primary actions.")).toBeVisible();
    expect(screen.queryByRole("button", { name: /compact|extended/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledWith(markdown));
    await waitFor(() => expect(screen.getByRole("button", { name: "Copied" })).toBeVisible());

    fireEvent.click(screen.getByRole("button", { name: "Download" }));
    expect(createObjectUrlMock).toHaveBeenCalledTimes(1);
    expect(downloadedFilename).toBe("design.md");
    expect(downloadedBlob).toBeInstanceOf(Blob);
    expect(downloadedBlob?.type).toBe("text/markdown;charset=utf-8");
    await expect((downloadedBlob as Blob).text()).resolves.toBe(markdown);
    expect(trackEventMock).toHaveBeenCalledWith("cta_click", {
      label: "design_md_download",
      location: "style_detail",
    });
  });

  it("uses updated markdown for both preview and copy", async () => {
    const firstMarkdown = "# First version\n\nOld guidance.";
    const revisedMarkdown = "# Revised system\n\nNew guidance.";
    const { rerender } = render(
      <DesignMdSection
        styleName="Editorial"
        hasSpec
        markdown={firstMarkdown}
      />,
    );

    rerender(
      <DesignMdSection
        styleName="Editorial"
        hasSpec
        markdown={revisedMarkdown}
      />,
    );

    expect(screen.getByRole("heading", { name: "Revised system" })).toBeVisible();
    expect(screen.queryByRole("heading", { name: "First version" })).not.toBeInTheDocument();
    expect(screen.getByText("New guidance.")).toBeVisible();
    expect(screen.queryByText("Old guidance.")).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledWith(revisedMarkdown));
  });

  it("hides preview actions when no design spec is available", () => {
    render(
      <DesignMdSection
        styleName="Editorial"
        hasSpec={false}
        markdown="# Editorial system"
      />,
    );

    expect(screen.queryByRole("button", { name: "Copy" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Download" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Connect AI" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Editorial system" })).not.toBeInTheDocument();
    expect(writeTextMock).not.toHaveBeenCalled();
    expect(createObjectUrlMock).not.toHaveBeenCalled();
  });

  it("does not show a successful copy state when clipboard writing fails", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("Clipboard unavailable"));
    render(
      <DesignMdSection
        styleName="Editorial"
        hasSpec
        markdown="# Editorial system"
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: "Copy" }));

    await act(async () => {
      await Promise.resolve();
    });
    expect(writeTextMock).toHaveBeenCalledWith("# Editorial system");
    expect(screen.getByRole("button", { name: "Copy" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Copied" })).not.toBeInTheDocument();
    expect(screen.getByRole("status")).toBeEmptyDOMElement();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    if (originalClipboardDescriptor) {
      Object.defineProperty(navigator, "clipboard", originalClipboardDescriptor);
    } else {
      Reflect.deleteProperty(navigator, "clipboard");
    }
    if (originalCreateObjectUrlDescriptor) {
      Object.defineProperty(URL, "createObjectURL", originalCreateObjectUrlDescriptor);
    } else {
      Reflect.deleteProperty(URL, "createObjectURL");
    }
  });
});
