import { describe, expect, it } from "vitest";
import {
  generateDashboardChartsHtml,
  generateDashboardTableHtml,
} from "@/lib/generator/templates/dashboard";

describe("dashboard template rendering", () => {
  it("renders chart content based on provided series", () => {
    const html = generateDashboardChartsHtml({
      chartTitle: "Pipeline Health",
      chartType: "line",
      chartSummary: "Quarterly trend and target comparison.",
      chartLabels: "Q1, Q2, Q3, Q4",
      primarySeriesLabel: "Actual",
      primarySeriesValues: "32, 48, 61, 77",
      secondarySeriesLabel: "Plan",
      secondarySeriesValues: "28, 44, 58, 70",
    });

    expect(html).toContain("Pipeline Health");
    expect(html).toContain("Quarterly trend and target comparison.");
    expect(html).toContain("Trend analysis");
    expect(html).toContain("polyline");
    expect(html).toContain("Actual");
    expect(html).toContain("Plan");
  });

  it("supports pie chart rendering", () => {
    const html = generateDashboardChartsHtml({
      chartType: "pie",
      chartLabels: "Enterprise, Mid-Market, SMB",
      primarySeriesValues: "55, 28, 17",
    });

    expect(html).toContain("dashboard-pie-layout");
    expect(html).toContain("conic-gradient(");
    expect(html).toContain("Segment distribution");
  });

  it("clamps table rows and applies status badges by semantic columns", () => {
    const html = generateDashboardTableHtml({
      tableTitle: "Deal Pipeline",
      columns: "ID, Customer, Amount, Status, Updated",
      rowCount: "27",
    });

    const rowMatches = html.match(/<tr class=\"dashboard-table-row/g) ?? [];
    expect(rowMatches).toHaveLength(20);
    expect(html).toContain("Deal Pipeline");
    expect(html).toContain("dashboard-table-action");
    expect(html).toContain("dashboard-status--completed");
    expect(html).toContain("dashboard-status--pending");
    expect(html).toContain("dashboard-status--critical");
  });
});
