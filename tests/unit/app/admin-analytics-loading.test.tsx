// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import AnalyticsLoading from "@/app/admin/analytics/loading";

describe("analytics route loading boundary", () => {
  it("renders the analytics dashboard skeleton while server data loads", () => {
    render(<AnalyticsLoading />);

    expect(screen.getByRole("status")).toHaveAttribute("aria-busy", "true");
    expect(screen.getByText("正在加载分析数据…")).toBeInTheDocument();
  });
});
