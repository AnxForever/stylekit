// @vitest-environment happy-dom
import { cleanup, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { UmamiAnalytics, beforeUmamiSend } from "@/components/analytics/umami-analytics";
import { canCollectClientAnalytics } from "@/lib/analytics/collection-policy";

let pathname = "/en/styles";
vi.mock("next/navigation", () => ({ usePathname: () => pathname }));
vi.mock("@/lib/analytics/collection-policy", async (importOriginal) => ({
  ...await importOriginal<typeof import("@/lib/analytics/collection-policy")>(),
  canCollectClientAnalytics: vi.fn(),
}));

beforeEach(() => {
  vi.mocked(canCollectClientAnalytics).mockReturnValue(true);
  pathname = "/en/styles";
  const appendChild = document.head.appendChild.bind(document.head);
  vi.spyOn(document.head, "appendChild").mockImplementation(<T extends Node>(node: T): T => {
    // Exercise DOM insertion and attributes without loading an external script.
    if (node instanceof HTMLScriptElement) node.type = "application/json";
    return appendChild(node);
  });
});
afterEach(() => {
  cleanup();
  document.getElementById("umami-analytics")?.remove();
  delete window.stylekitBeforeUmamiSend;
  vi.restoreAllMocks();
});

describe("Umami collection gate", () => {
  it("defines the documented before-send callback before loading the tracker", () => {
    render(<UmamiAnalytics src="/umami/script.js" websiteId="site" />);
    const script = document.getElementById("umami-analytics")!;
    expect(script.getAttribute("data-before-send")).toBe("stylekitBeforeUmamiSend");
    expect(window.stylekitBeforeUmamiSend).toBe(beforeUmamiSend);
    expect(script.getAttribute("data-exclude-search")).toBe("true");
  });

  it("keeps enforcing exclusions after a public-to-admin SPA transition", () => {
    const view = render(<UmamiAnalytics src="/umami/script.js" websiteId="site" />);
    const payload = { url: "/en/styles" };
    expect(beforeUmamiSend("event", payload)).toBe(payload);
    pathname = "/admin";
    vi.mocked(canCollectClientAnalytics).mockReturnValue(false);
    view.rerender(<UmamiAnalytics src="/umami/script.js" websiteId="site" />);
    expect(window.stylekitBeforeUmamiSend?.("event", payload)).toBe(false);
    expect(document.querySelectorAll("#umami-analytics")).toHaveLength(1);
  });

  it("does not download the script for excluded traffic", () => {
    vi.mocked(canCollectClientAnalytics).mockReturnValue(false);
    render(<UmamiAnalytics src="/umami/script.js" websiteId="site" />);
    expect(document.getElementById("umami-analytics")).toBeNull();
  });

  it("rejects delayed payloads for excluded routes", () => {
    expect(beforeUmamiSend("event", { url: "/zh/admin/analytics" })).toBe(false);
  });
});
