// @vitest-environment happy-dom

import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { prefetchAdminViewMock, routerPrefetchMock, linkProps } = vi.hoisted(() => ({
  prefetchAdminViewMock: vi.fn(),
  routerPrefetchMock: vi.fn(),
  linkProps: [] as Array<Record<string, unknown>>,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/admin/operations",
  useRouter: () => ({
    prefetch: routerPrefetchMock,
    push: vi.fn(),
    refresh: vi.fn(),
  }),
}));

vi.mock("next/link", () => ({
  default: ({ children, href, onClick, onFocus, onMouseEnter, prefetch, ...props }: Record<string, unknown>) => {
    linkProps.push({ href, prefetch });
    return (
      <a href={href as string} onClick={onClick as never} onFocus={onFocus as never} onMouseEnter={onMouseEnter as never} {...props}>
        {children as React.ReactNode}
      </a>
    );
  },
}));

vi.mock("@/lib/swr/admin-prefetch", () => ({
  prefetchAdminView: prefetchAdminViewMock,
}));

vi.mock("@/components/admin/admin-sidebar-provider", () => ({
  useAdminSidebar: () => ({ open: false, close: vi.fn() }),
}));

import { AdminSidebar } from "@/components/admin/admin-sidebar";

describe("admin sidebar data loading", () => {
  beforeEach(() => {
    prefetchAdminViewMock.mockReset();
    routerPrefetchMock.mockReset();
    linkProps.length = 0;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ total: 0 }),
    }));
  });

  afterEach(() => {
    cleanup();
    vi.unstubAllGlobals();
  });

  it("does not preload unrelated admin data on mount", () => {
    render(<AdminSidebar />);

    expect(prefetchAdminViewMock).not.toHaveBeenCalled();
    expect(routerPrefetchMock).not.toHaveBeenCalled();
  });

  it("preloads only the explicitly focused target without a second Next.js prefetch", () => {
    render(<AdminSidebar />);
    const target = screen.getByRole("link", { name: "数据分析" });
    const targetProps = linkProps.find((props) => props.href === "/admin/analytics");

    expect(targetProps?.prefetch).toBe(false);
    fireEvent.focus(target);

    expect(prefetchAdminViewMock).toHaveBeenCalledExactlyOnceWith("/admin/analytics");
    expect(routerPrefetchMock).not.toHaveBeenCalled();
  });
});
