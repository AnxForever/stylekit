// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prefetchAnalyticsViewMock, linkProps } = vi.hoisted(() => ({
  prefetchAnalyticsViewMock: vi.fn(),
  linkProps: [] as Array<Record<string, unknown>>,
}));

vi.mock("next/link", () => ({
  default: ({ children, href, onFocus, onMouseEnter, prefetch, ...props }: Record<string, unknown>) => {
    linkProps.push({ href, prefetch });
    return (
      <a href={href as string} onFocus={onFocus as never} onMouseEnter={onMouseEnter as never} {...props}>
        {children as React.ReactNode}
      </a>
    );
  },
}));

vi.mock("@/lib/swr/analytics-prefetch", () => ({
  prefetchAnalyticsView: prefetchAnalyticsViewMock,
}));

import { AnalyticsSectionNav } from "@/app/admin/analytics/_content";

describe("analytics section navigation prefetch", () => {
  beforeEach(() => {
    prefetchAnalyticsViewMock.mockReset();
    linkProps.length = 0;
  });

  afterEach(() => cleanup());

  it("avoids route prefetching and warms only the hovered report in the active range", () => {
    render(<AnalyticsSectionNav view="overview" range="30d" />);

    expect(prefetchAnalyticsViewMock).not.toHaveBeenCalled();
    expect(linkProps.every((props) => props.prefetch === false)).toBe(true);

    fireEvent.mouseEnter(screen.getByRole("link", { name: "内容" }));
    expect(prefetchAnalyticsViewMock).toHaveBeenCalledExactlyOnceWith("content", "30d");
  });
});
