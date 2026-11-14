// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { useSWRMock } = vi.hoisted(() => ({ useSWRMock: vi.fn() }));
vi.mock("swr", () => ({ default: useSWRMock }));

import { FirstPartyTrafficPanel, StyleInsightsPanel } from "@/components/admin/style-insights-panel";
import type { StyleInsights } from "@/lib/admin/style-insights";

const labels = [
  { slug: "quiet-luxury", name: "静谧奢华", nameEn: "Quiet Luxury" },
  { slug: "unseen-style", name: "未浏览风格", nameEn: "Unseen Style" },
];

const report: StyleInsights = {
  version: 2,
  source: "first_party",
  retentionDays: 90,
  range: { start: "2026-11-07T00:00:00.000Z", end: "2026-11-14T00:00:00.000Z", timezone: "Asia/Shanghai" },
  generatedAt: "2026-11-14T00:00:01.000Z",
  firstCollectedAt: "2026-11-10T00:00:00.000Z",
  traffic: { pageViews: 100, visitors: 12, visits: 19, unidentifiedPageViews: 20 },
  styles: [{
    slug: "quiet-luxury", impressions: 100, exposedVisitors: 10, clicks: 40, clickVisitors: 9,
    detailViews: 30, detailVisitors: 8, showcaseViews: 25, showcaseVisitors: 6, viewVisitors: 10,
    copies: 20, copyVisitors: 7, exports: 10, exportVisitors: 4, activeMs: 65_000,
    favoriteAdds: 5, favoriteRemoves: 1, favoriteVisitors: 3, accountFavoriteAdds: 2, localFavoriteAdds: 3,
    engagedVisitors: 6, maxScrollPercent: 80, matchedClickVisitors: 4, matchedUseVisitors: 3,
    unidentifiedEvents: 2,
  }],
  sources: [{ slug: "quiet-luxury", surface: "home", impressions: 20, exposedVisitors: 5, clicks: 7, clickVisitors: 3, averageRank: 2.5 }],
};

function mockReport(data?: StyleInsights, error?: Error) {
  useSWRMock.mockReturnValue({ data, error, isLoading: !data && !error, mutate: vi.fn() });
}

describe("style insights panels", () => {
  beforeEach(() => useSWRMock.mockReset());
  afterEach(cleanup);

  it("distinguishes browser UV, sessions and identified pageview coverage", () => {
    mockReport(report);
    render(<FirstPartyTrafficPanel range="7d" />);
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("19")).toBeInTheDocument();
    expect(screen.getByText("80.0%")).toBeInTheDocument();
    expect(screen.getByText("20 次浏览缺少标识，不推算 UV")).toBeInTheDocument();
    expect(screen.getByText(/UV 不等同自然人数/)).toBeInTheDocument();
    expect(screen.getByText(/覆盖率仅针对已收到的浏览记录/)).toBeInTheDocument();
  });

  it("shows missing migration as unavailable rather than zero traffic", () => {
    const mutate = vi.fn();
    useSWRMock.mockReturnValue({ data: undefined, error: Object.assign(new Error("Missing RPC"), { code: "ANALYTICS_MIGRATION_REQUIRED" }), isLoading: false, mutate });
    render(<StyleInsightsPanel range="7d" styles={labels} />);
    expect(screen.getByRole("alert")).toHaveTextContent("安装 044");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "导出风格分析 CSV" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(mutate).toHaveBeenCalledOnce();
  });

  it("renders a valid empty report without inventing identity coverage", () => {
    mockReport({ ...report, firstCollectedAt: null, traffic: { pageViews: 0, visitors: 0, visits: 0, unidentifiedPageViews: 0 }, styles: [], sources: [] });
    const { rerender } = render(<FirstPartyTrafficPanel range="7d" />);
    expect(screen.getByText("—")).toBeInTheDocument();
    expect(screen.getByText(/尚无新口径记录/)).toBeInTheDocument();
    rerender(<StyleInsightsPanel range="7d" styles={labels} />);
    expect(screen.getByRole("row", { name: /未浏览风格/ })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /静谧奢华/ })).toHaveTextContent("0");
  });

  it("uses matched visitor rates and shows missing denominators as unavailable", () => {
    mockReport(report);
    render(<StyleInsightsPanel range="7d" styles={labels} />);
    const measured = screen.getByRole("row", { name: /静谧奢华/ });
    expect(within(measured).getByText("40.0%")).toBeInTheDocument();
    expect(within(measured).getByText("30.0%")).toBeInTheDocument();
    expect(within(measured).getByText("4 / 10 UV")).toBeInTheDocument();
    expect(within(measured).getByText("1 分 5 秒")).toBeInTheDocument();
    expect(within(measured).getByText("+5 / −1")).toBeInTheDocument();
    expect(within(measured).getByText("账号 2 · 本地 3")).toBeInTheDocument();
    expect(within(screen.getByRole("row", { name: /未浏览风格/ })).getAllByText("—")).toHaveLength(3);
    expect(screen.getByText("首页")).toBeInTheDocument();
  });

  it("requests each selected range independently, searches names, and sorts without native selects", () => {
    mockReport(report);
    render(<StyleInsightsPanel range="30d" styles={labels} />);
    expect(useSWRMock).toHaveBeenCalledWith("/api/admin/analytics/style-insights?range=30d", expect.objectContaining({ keepPreviousData: false }));
    fireEvent.change(screen.getByRole("searchbox", { name: "搜索风格表现" }), { target: { value: "Unseen" } });
    expect(screen.queryByRole("row", { name: /静谧奢华/ })).not.toBeInTheDocument();
    expect(screen.getByRole("row", { name: /未浏览风格/ })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "浏览 UV" }));
    expect(screen.getByRole("button", { name: "浏览 UV" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
  });

  it("labels retained data when refresh fails", () => {
    mockReport(report, new Error("network unavailable"));
    render(<FirstPartyTrafficPanel range="7d" />);
    expect(screen.getByRole("alert")).toHaveTextContent("刷新失败，以下保留上次结果");
    expect(screen.getByText("12")).toBeInTheDocument();
  });
});
