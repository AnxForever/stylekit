// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  AnalyticsMeasurementNote,
  getVisitorMetricLabel,
} from "@/components/admin/analytics-measurement-note";
import type { AnalyticsMeasurement } from "@/lib/admin/analytics-api-contract";

const measurement: AnalyticsMeasurement = {
  source: "umami_api",
  visitorMetric: "anonymous_identifiers",
  freshness: "stale",
  fallback: false,
  filtering: "applied",
  policyVersion: "events-v2",
  rawPageViews: 100,
  excludedPageViews: 15,
  exclusions: [
    { reason: "internal", pageViews: 5 },
    { reason: "automation", pageViews: 10 },
  ],
  history: {
    status: "mixed_legacy",
    cutoff: "2026-08-16T02:00:00+08:00",
    reportedImportedEvents: 232380,
  },
};

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ excluded: false }), {
        status: 200,
        headers: { "content-type": "application/json" },
      })
    )
  );
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("analytics measurement note", () => {
  it("explains source, freshness, anonymous measurement, filtering, and mixed history", async () => {
    render(
      <AnalyticsMeasurementNote
        measurement={measurement}
        qualityStatus="stale"
        showBreakdownSource
      />
    );
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByText("Umami 实时 API")).toBeInTheDocument();
    expect(screen.getByText("过期缓存")).toBeInTheDocument();
    expect(screen.getByText("数据质量：缓存过期")).toBeInTheDocument();
    expect(screen.getByText(/访客指标表示/)).toHaveTextContent("匿名访客标识");
    expect(screen.getByText(/不代表真人数量/)).toBeInTheDocument();
    expect(screen.getByText(/原始页面浏览 100 次/)).toBeInTheDocument();
    expect(screen.getByText(/已排除 15 次页面浏览/)).toBeInTheDocument();
    expect(screen.getByText(/内部测试 5 次、自动化访问 10 次/)).toBeInTheDocument();
    expect(screen.getByText(/历史回填记录/)).toBeInTheDocument();
    expect(screen.getByText(/不能据此认定该时间前的记录全部来自回填/)).toBeInTheDocument();
    expect(screen.getByText(/分项可能来自独立来源/)).toBeInTheDocument();
    expect(await screen.findByText(/本浏览器当前仍参与统计/)).toBeInTheDocument();
  });

  it("labels missing measurement metadata as unverified instead of claiming a source", async () => {
    render(<AnalyticsMeasurementNote />);
    await act(async () => {
      await Promise.resolve();
      await Promise.resolve();
    });

    expect(screen.getByText("来源待核验")).toBeInTheDocument();
    expect(screen.getByText("新鲜度待核验")).toBeInTheDocument();
    expect(screen.getByText(/访客指标表示/)).toHaveTextContent("访客口径待核验");
    expect(screen.getByText(/不能据此判断访客识别方式/)).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "排除本浏览器的测试访问" })).toBeEnabled());
  });

  it("uses the explicit visitor metric supplied by each data source", () => {
    expect(getVisitorMetricLabel(measurement)).toBe("匿名访客标识");
    expect(
      getVisitorMetricLabel({ ...measurement, source: "internal_events", visitorMetric: "tab_sessions" })
    ).toBe("标签页会话");
    expect(
      getVisitorMetricLabel({ ...measurement, visitorMetric: "unknown" })
    ).toBe("访客口径待核验");
    expect(getVisitorMetricLabel(undefined)).toBe("访客口径待核验");
  });
});
