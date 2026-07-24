// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { loadStylePreviewMock } = vi.hoisted(() => ({
  loadStylePreviewMock: vi.fn(),
}));

vi.mock("@/lib/style-preview/delivery", () => ({
  loadStylePreview: loadStylePreviewMock,
}));

import { StyleCoverPreview } from "@/components/style-preview/style-cover-preview";

class IntersectionObserverMock {
  static instances: IntersectionObserverMock[] = [];
  private readonly callback: IntersectionObserverCallback;

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    IntersectionObserverMock.instances.push(this);
  }

  observe() {}
  disconnect() {}

  trigger(isIntersecting: boolean) {
    this.callback(
      [{ isIntersecting } as IntersectionObserverEntry],
      this as unknown as IntersectionObserver,
    );
  }
}

describe("StyleCoverPreview delivery boundary", () => {
  beforeEach(() => {
    loadStylePreviewMock.mockReset();
    IntersectionObserverMock.instances = [];
    vi.stubGlobal("IntersectionObserver", IntersectionObserverMock);
  });

  it("does not load a cover until it is near the viewport", async () => {
    let resolvePreview: (value: { coverPreview: () => ReactNode }) => void;
    const previewPromise = new Promise<{ coverPreview: () => ReactNode }>((resolve) => {
      resolvePreview = resolve;
    });
    loadStylePreviewMock.mockReturnValue(previewPromise);

    render(<StyleCoverPreview styleSlug="neo-brutalist" />);

    expect(loadStylePreviewMock).not.toHaveBeenCalled();

    act(() => {
      IntersectionObserverMock.instances[0].trigger(true);
    });
    expect(loadStylePreviewMock).toHaveBeenCalledWith("neo-brutalist");

    resolvePreview!({
      coverPreview: () => <span data-testid="approved-cover">cover</span>,
    });

    await waitFor(() => {
      expect(screen.getByTestId("approved-cover")).toBeInTheDocument();
    });
  });
});
