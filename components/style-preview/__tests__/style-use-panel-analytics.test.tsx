// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({ children, ...props }: React.ComponentProps<"a">) => (
    <a {...props}>{children}</a>
  ),
}));

import { StyleUsePanel } from "@/components/style-preview/style-use-panel";

describe("StyleUsePanel analytics", () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    trackEventMock.mockReset();
    writeTextMock.mockReset();
    writeTextMock.mockResolvedValue(undefined);
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });

    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: writeTextMock },
      configurable: true,
    });
  });

  it("tracks only the shadcn command as a shadcn conversion event", async () => {
    render(
      <StyleUsePanel
        slug="corporate-clean"
        name="企业简洁"
        nameEn="Corporate Clean"
      />
    );

    const copyButtons = screen.getAllByRole("button", { name: "export.copyCode" });
    fireEvent.click(copyButtons[0]);

    await waitFor(() =>
      expect(trackEventMock).toHaveBeenCalledWith("shadcn_command_copy", {
        slug: "corporate-clean",
        source: "style_use_panel",
      })
    );

    trackEventMock.mockClear();
    fireEvent.click(copyButtons[1]);
    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(2));

    expect(trackEventMock).toHaveBeenCalledWith("code_copy", {
      slug: "corporate-clean",
      language: "bash",
    });
    expect(trackEventMock).not.toHaveBeenCalledWith(
      "shadcn_command_copy",
      expect.anything()
    );
  });
});
