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

import { CodeBlock } from "@/components/style-preview/code-block";

describe("CodeBlock analytics", () => {
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

  it("tracks a code copy only when a real style slug is available", async () => {
    const onCopySuccess = vi.fn();
    render(
      <CodeBlock
        code="npm run example"
        language="bash"
        slug="corporate-clean"
        onCopySuccess={onCopySuccess}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "export.copyCode" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledWith("npm run example"));
    expect(trackEventMock).toHaveBeenCalledWith("code_copy", {
      slug: "corporate-clean",
      language: "bash",
    });
    expect(onCopySuccess).toHaveBeenCalledTimes(1);
  });

  it("does not create an unknown-slug analytics event for generic code", async () => {
    render(<CodeBlock code="const value = true" />);

    fireEvent.click(screen.getByRole("button", { name: "export.copyCode" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledWith("const value = true"));
    expect(trackEventMock).not.toHaveBeenCalled();
  });
});
