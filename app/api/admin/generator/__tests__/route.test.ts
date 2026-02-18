import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/admin-api", () => ({
  checkAdminApiAccess: vi.fn(),
}));

vi.mock("@/lib/generator/api-events", () => ({
  getGeneratorApiEvents: vi.fn(),
}));

import { GET } from "@/app/api/admin/generator/route";
import { checkAdminApiAccess } from "@/lib/auth/admin-api";
import {
  getGeneratorApiEvents,
  type GeneratorApiEvent,
} from "@/lib/generator/api-events";

const mockedCheckAdminApiAccess = vi.mocked(checkAdminApiAccess);
const mockedGetGeneratorApiEvents = vi.mocked(getGeneratorApiEvents);

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("GET /api/admin/generator", () => {
  it("rejects unauthorized access", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: false,
      status: 403,
      error: "Forbidden",
    });

    const response = await GET(new Request("https://stylekit.top/api/admin/generator"));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      error: "Forbidden",
    });
  });

  it("returns paginated telemetry data, summary and daily trend", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-02-18T12:00:00.000Z"));

    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
    });

    mockedGetGeneratorApiEvents.mockReturnValue([
      {
        endpoint: "generate-style",
        outcome: "success",
        status: 200,
        durationMs: 90,
        timestamp: "2026-02-18T10:00:00.000Z",
        clientHash: "aaaa",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 400,
        code: "INVALID_REQUEST",
        durationMs: 40,
        timestamp: "2026-02-18T10:01:00.000Z",
        clientHash: "bbbb",
      },
      {
        endpoint: "generate-design-system",
        outcome: "success",
        status: 200,
        durationMs: 180,
        timestamp: "2026-02-18T10:02:00.000Z",
        clientHash: "cccc",
      },
    ] as never);

    const response = await GET(
      new Request(
        "https://stylekit.top/api/admin/generator?limit=2&offset=0&trendDays=2"
      )
    );

    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.events).toHaveLength(2);
    expect(payload.total).toBe(3);
    expect(payload.limit).toBe(2);
    expect(payload.hasMore).toBe(true);
    expect(payload.summary.totalRequests).toBe(3);
    expect(payload.summary.successCount).toBe(2);
    expect(payload.summary.errorCount).toBe(1);
    expect(payload.summary.successRate).toBeCloseTo(66.67, 2);
    expect(payload.summary.topErrorCodes).toEqual([
      { code: "INVALID_REQUEST", count: 1 },
    ]);
    expect(payload.summary.fallbackReports).toEqual({
      total: 0,
      network: 0,
      invalidPayload: 0,
      unexpectedStatus: 0,
      notModifiedWithoutCache: 0,
    });
    expect(payload.summary.byEndpoint["generate-style"].total).toBe(2);
    expect(payload.summary.byEndpoint["generate-design-system"].total).toBe(1);
    expect(payload.groupBy).toBe("none");
    expect(payload.groups).toBeNull();
    expect(payload.summary.daily).toEqual([
      {
        date: "2026-02-17",
        total: 0,
        success: 0,
        error: 0,
        avgDurationMs: 0,
        p95DurationMs: 0,
        fallback: {
          total: 0,
          network: 0,
          invalidPayload: 0,
          unexpectedStatus: 0,
          notModifiedWithoutCache: 0,
        },
      },
      {
        date: "2026-02-18",
        total: 3,
        success: 2,
        error: 1,
        avgDurationMs: 103.33,
        p95DurationMs: 180,
        fallback: {
          total: 0,
          network: 0,
          invalidPayload: 0,
          unexpectedStatus: 0,
          notModifiedWithoutCache: 0,
        },
      },
    ]);
  });

  it("exports CSV and marks truncation when record count exceeds limit", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
    });

    mockedGetGeneratorApiEvents.mockReturnValue(createEvents(1005) as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/generator?format=csv")
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/csv");
    expect(response.headers.get("x-export-limit")).toBe("1000");
    expect(response.headers.get("x-export-truncated")).toBe("true");

    const csv = await response.text();
    const rows = csv.trim().split("\n");
    expect(rows).toHaveLength(1001);
    expect(rows[0]).toBe(
      "timestamp,endpoint,outcome,status,code,duration_ms,client_hash"
    );
  });

  it("summarizes client fallback report categories", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
    });

    mockedGetGeneratorApiEvents.mockReturnValue([
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
        durationMs: 12,
        timestamp: "2026-02-18T10:00:00.000Z",
        clientHash: "aaaa",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 503,
        code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503",
        durationMs: 13,
        timestamp: "2026-02-18T10:01:00.000Z",
        clientHash: "bbbb",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NOT_MODIFIED_WITHOUT_CACHE",
        durationMs: 11,
        timestamp: "2026-02-18T10:02:00.000Z",
        clientHash: "cccc",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_INVALID_PAYLOAD",
        durationMs: 9,
        timestamp: "2026-02-18T10:03:00.000Z",
        clientHash: "dddd",
      },
      {
        endpoint: "generate-design-system",
        outcome: "error",
        status: 400,
        code: "INVALID_REQUEST",
        durationMs: 25,
        timestamp: "2026-02-18T10:04:00.000Z",
        clientHash: "eeee",
      },
    ] as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/generator?limit=20&offset=0")
    );

    expect(response.status).toBe(200);
    const payload = await response.json();

    expect(payload.summary.fallbackReports).toEqual({
      total: 4,
      network: 1,
      invalidPayload: 1,
      unexpectedStatus: 1,
      notModifiedWithoutCache: 1,
    });
  });

  it("filters telemetry by fallbackReason query", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
    });

    mockedGetGeneratorApiEvents.mockReturnValue([
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
        durationMs: 12,
        timestamp: "2026-02-18T10:00:00.000Z",
        clientHash: "aaaa",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 503,
        code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503",
        durationMs: 13,
        timestamp: "2026-02-18T10:01:00.000Z",
        clientHash: "bbbb",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_INVALID_PAYLOAD",
        durationMs: 9,
        timestamp: "2026-02-18T10:03:00.000Z",
        clientHash: "dddd",
      },
    ] as never);

    const response = await GET(
      new Request(
        "https://stylekit.top/api/admin/generator?fallbackReason=unexpected-status"
      )
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.total).toBe(1);
    expect(payload.events).toHaveLength(1);
    expect(payload.events[0].code).toBe("DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503");
  });

  it("returns fallback reason groups when groupBy=fallback-reason", async () => {
    mockedCheckAdminApiAccess.mockResolvedValue({
      allowed: true,
    });

    mockedGetGeneratorApiEvents.mockReturnValue([
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
        durationMs: 10,
        timestamp: "2026-02-18T10:00:00.000Z",
        clientHash: "a",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 202,
        code: "DISCOVERY_CLIENT_FALLBACK_NETWORK",
        durationMs: 12,
        timestamp: "2026-02-18T10:01:00.000Z",
        clientHash: "b",
      },
      {
        endpoint: "generate-style",
        outcome: "error",
        status: 503,
        code: "DISCOVERY_CLIENT_FALLBACK_UNEXPECTED_STATUS_503",
        durationMs: 15,
        timestamp: "2026-02-18T10:02:00.000Z",
        clientHash: "c",
      },
      {
        endpoint: "generate-design-system",
        outcome: "error",
        status: 400,
        code: "INVALID_REQUEST",
        durationMs: 20,
        timestamp: "2026-02-18T10:03:00.000Z",
        clientHash: "d",
      },
    ] as never);

    const response = await GET(
      new Request("https://stylekit.top/api/admin/generator?groupBy=fallback-reason")
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.groupBy).toBe("fallback-reason");
    expect(payload.groups).toEqual({
      fallbackReason: [
        { reason: "network-error", count: 2 },
        { reason: "unexpected-status", count: 1 },
      ],
    });
  });
});

function createEvents(count: number): GeneratorApiEvent[] {
  const start = Date.parse("2026-02-18T00:00:00.000Z");
  return Array.from({ length: count }, (_, index) => {
    const error = index % 5 === 0;
    return {
      endpoint: index % 2 === 0 ? "generate-style" : "generate-design-system",
      outcome: error ? "error" : "success",
      status: error ? 400 : 200,
      code: error ? "INVALID_REQUEST" : undefined,
      durationMs: 50 + (index % 60),
      timestamp: new Date(start + index * 1000).toISOString(),
      clientHash: `client-${index}`,
    };
  });
}
