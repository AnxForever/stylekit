// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { AnchorHTMLAttributes } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { ResourcesContent } from "@/components/resources/resources-content";

const { routerMock } = vi.hoisted(() => ({
  routerMock: {
    push: vi.fn(),
    replace: vi.fn(),
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => routerMock,
  useSearchParams: () => new URLSearchParams(window.location.search),
}));

vi.mock("next/dynamic", () => ({ default: () => function DynamicResourceStub() { return null; } }));
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "zh" }) }));
vi.mock("@/components/typography/typography-content", () => ({ TypographyContent: () => null }));
vi.mock("@/components/i18n/localized-link", () => ({
  LocalizedLink: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState({}, "", "/zh/resources");
  routerMock.push.mockImplementation((href: string) => window.history.pushState({}, "", href));
  routerMock.replace.mockImplementation((href: string) => window.history.replaceState({}, "", href));
});

afterEach(() => cleanup());

describe("ResourcesContent tab navigation", () => {
  it("uses query state for the selected tab and follows back/forward history", async () => {
    window.history.replaceState({}, "", "/zh/resources?campaign=launch&tab=gradients");
    const view = render(<ResourcesContent />);

    expect(screen.getByRole("button", { name: /渐变/ })).toHaveAttribute("aria-current", "true");
    fireEvent.click(screen.getByRole("button", { name: /阴影/ }));

    expect(routerMock.push).toHaveBeenCalledWith(
      "/zh/resources?campaign=launch&tab=shadows",
      { scroll: false },
    );

    // The active state follows the URL after App Router navigation and again
    // after the browser traverses back to the previous history entry.
    view.rerender(<ResourcesContent />);
    expect(screen.getByRole("button", { name: /阴影/ })).toHaveAttribute("aria-current", "true");

    window.history.back();
    await waitFor(() => {
      expect(new URL(window.location.href).searchParams.get("tab")).toBe("gradients");
    });
    view.rerender(<ResourcesContent />);
    expect(screen.getByRole("button", { name: /渐变/ })).toHaveAttribute("aria-current", "true");

    window.history.forward();
    await waitFor(() => {
      expect(new URL(window.location.href).searchParams.get("tab")).toBe("shadows");
    });
    view.rerender(<ResourcesContent />);
    expect(screen.getByRole("button", { name: /阴影/ })).toHaveAttribute("aria-current", "true");
  });

  it("replaces a legacy resource hash with a query tab while preserving other params", async () => {
    window.history.replaceState({}, "", "/zh/resources?campaign=launch#backgrounds");
    render(<ResourcesContent />);

    await waitFor(() => {
      expect(routerMock.replace).toHaveBeenCalledWith(
        "/zh/resources?campaign=launch&tab=backgrounds",
        { scroll: false },
      );
    });
  });

  it("migrates a legacy fragment reached after hydration", async () => {
    window.history.replaceState({}, "", "/zh/resources?campaign=launch");
    render(<ResourcesContent />);
    window.location.hash = "#shadows";

    await waitFor(() => {
      expect(routerMock.replace).toHaveBeenCalledWith(
        "/zh/resources?campaign=launch&tab=shadows",
        { scroll: false },
      );
    });
  });

  it("lets a valid query win over a stale section hash and leaves unrelated hashes alone", async () => {
    window.history.replaceState({}, "", "/zh/resources?tab=gradients#shadows");
    render(<ResourcesContent />);
    await waitFor(() => expect(routerMock.replace).toHaveBeenCalledWith(
      "/zh/resources?tab=gradients",
      { scroll: false },
    ));

    vi.clearAllMocks();
    window.history.replaceState({}, "", "/zh/resources?campaign=launch#overview");
    render(<ResourcesContent />);
    expect(routerMock.replace).not.toHaveBeenCalled();
  });
});
