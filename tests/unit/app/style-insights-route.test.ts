import { beforeEach, describe, expect, it, vi } from "vitest";

const { access, load } = vi.hoisted(() => ({ access: vi.fn(), load: vi.fn() }));
vi.mock("@/lib/auth/admin-api", () => ({ checkAdminApiAccess: access }));
vi.mock("@/lib/admin/style-insights-server", () => ({ getStyleInsightsSnapshot: load }));
import { GET } from "@/app/api/admin/analytics/style-insights/route";

const request = (range = "7d") => new Request(`https://stylekit.top/api/admin/analytics/style-insights?range=${range}`);

describe("GET style insights", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    access.mockResolvedValue({ allowed: true });
  });

  it("authorizes every request before reading cached or stored analytics", async () => {
    access.mockResolvedValue({ allowed: false, status: 401, error: "Unauthorized" });
    const response = await GET(request());
    expect(response.status).toBe(401);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(load).not.toHaveBeenCalled();
  });

  it("rejects unbounded date ranges", async () => {
    expect((await GET(request("all"))).status).toBe(400);
    expect(load).not.toHaveBeenCalled();
  });

  it("preserves unavailable errors and does not send an empty report", async () => {
    load.mockResolvedValue({ data: null, status: 503, code: "ANALYTICS_MIGRATION_REQUIRED", error: "Install migration 044." });
    const response = await GET(request());
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ code: "ANALYTICS_MIGRATION_REQUIRED", error: "Install migration 044." });
  });

  it("returns the requested report with private cache and freshness headers", async () => {
    const report = { version: 2, source: "first_party" };
    load.mockResolvedValue({ data: report, cache: "HIT" });
    const response = await GET(request("90d"));
    expect(load).toHaveBeenCalledWith("90d");
    expect(await response.json()).toEqual(report);
    expect(response.headers.get("Cache-Control")).toBe("private, no-store");
    expect(response.headers.get("X-StyleKit-Analytics-Cache")).toBe("HIT");
  });
});
