// @vitest-environment happy-dom

import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { useSWRMock, cacheGetMock } = vi.hoisted(() => ({
  useSWRMock: vi.fn(),
  cacheGetMock: vi.fn(),
}));
vi.mock("swr", () => ({
  default: useSWRMock,
  useSWRConfig: () => ({ cache: { get: cacheGetMock } }),
}));

import {
  PromptCopyAnalyticsPanel,
} from "@/components/admin/prompt-copy-analytics-panel";
import {
  buildPromptCopyReportRows,
  createPromptCopyCsv,
  type PromptCopyStyleLabel,
} from "@/lib/admin/prompt-copy-report";
import type { PromptCopyAnalytics } from "@/lib/admin/prompt-copy-analytics";

const styles: PromptCopyStyleLabel[] = [
  { slug: "quiet-luxury", name: "静谧奢华", nameEn: "Quiet Luxury" },
  { slug: "other-style", name: "其他风格", nameEn: "Other Style" },
];

const report: PromptCopyAnalytics = {
  totalCopies: 4,
  generatedAt: "2026-10-29T00:00:00.000Z",
  styles: [
    {
      slug: "quiet-luxury",
      copies: 4,
      sessions: 2,
      hard: 1,
      soft: 1,
      designSpec: 0,
      creativeBrief: 0,
      examples: 0,
      projectBrief: 1,
      recipes: 0,
    },
  ],
};

function setReport(data?: PromptCopyAnalytics, error?: Error) {
  useSWRMock.mockReturnValue({
    data,
    error,
    isLoading: !data && !error,
    mutate: vi.fn(),
  });
}

describe("prompt copy analytics panel", () => {
  beforeEach(() => {
    useSWRMock.mockReset();
    cacheGetMock.mockReset().mockReturnValue(undefined);
  });

  it("exports community names as text rather than spreadsheet formulas", () => {
    const rows = buildPromptCopyReportRows([
      { slug: "community-style", name: "=1+1", nameEn: "@SUM(1,2)" },
    ], report);
    const csv = createPromptCopyCsv(rows);
    expect(csv).toContain("'=1+1");
    expect(csv).toContain("\"'@SUM(1,2)\"");
  });

  it("fills missing styles with zeroes and sorts every style by successful copies", () => {
    const rows = buildPromptCopyReportRows(styles, report);

    expect(rows.map((row) => [row.slug, row.copies, row.sessions])).toEqual([
      ["quiet-luxury", 4, 2],
      ["other-style", 0, 0],
    ]);
    expect(rows[1]).toMatchObject({
      hard: 0,
      soft: 0,
      designSpec: 0,
      creativeBrief: 0,
      examples: 0,
      projectBrief: 0,
      recipes: 0,
    });
  });

  it("keeps community style counts that are absent from static style metadata", () => {
    const communityStyle = {
      ...report.styles[0],
      slug: "community-style",
      copies: 2,
      sessions: 1,
      hard: 1,
      recipes: 1,
    };
    const rows = buildPromptCopyReportRows(styles, {
      ...report,
      totalCopies: 6,
      styles: [...report.styles, communityStyle],
    });

    expect(rows[0]).toMatchObject({
      slug: "quiet-luxury",
      name: "静谧奢华",
      copies: 4,
    });
    expect(rows[1]).toMatchObject({
      slug: "community-style",
      name: "community-style",
      nameEn: "community-style",
      copies: 2,
      recipes: 1,
    });
    expect(createPromptCopyCsv(rows)).toContain("community-style");
  });

  it("exports all style rows and safely quotes CSV fields", () => {
    const rows = buildPromptCopyReportRows(
      [{ slug: "a-style", name: '名字, "带引号"', nameEn: "Name\ncontinued" }],
      {
        ...report,
        styles: [
          {
            ...report.styles[0],
            slug: "a-style",
          },
        ],
      },
    );

    expect(createPromptCopyCsv(rows)).toContain('"名字, ""带引号"""');
    expect(createPromptCopyCsv(rows)).toContain('"Name\ncontinued"');
    expect(createPromptCopyCsv(rows)).toContain("recipe_prompt");
    expect(createPromptCopyCsv(buildPromptCopyReportRows(styles, report)).split("\r\n")).toHaveLength(3);
  });

  it("shows all known styles at zero while an empty report has no copies", () => {
    setReport({ totalCopies: 0, styles: [], generatedAt: "2026-10-29T00:00:00.000Z" });

    render(<PromptCopyAnalyticsPanel range="7d" styles={styles} />);

    expect(screen.getByText("0", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("columnheader", { name: "配方提示词" })).toBeInTheDocument();
    expect(screen.getByRole("row", { name: /quiet-luxury/ })).toHaveTextContent("0");
    expect(screen.getByRole("row", { name: /other-style/ })).toHaveTextContent("0");
  });

  it("shows backend or migration errors and offers a retry without a zero table", () => {
    const mutate = vi.fn();
    useSWRMock.mockReturnValue({
      data: undefined,
      error: new Error("Analytics aggregation migration is not installed."),
      isLoading: false,
      mutate,
    });

    render(<PromptCopyAnalyticsPanel range="7d" styles={styles} />);

    expect(screen.getByRole("alert")).toHaveTextContent("migration is not installed");
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "重试" }));
    expect(mutate).toHaveBeenCalledOnce();
  });

  it("requests the selected range and searches localized names and slugs", () => {
    setReport(report);

    render(<PromptCopyAnalyticsPanel range="30d" styles={styles} />);

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/admin/analytics/prompt-copies?range=30d",
      expect.objectContaining({ keepPreviousData: false }),
    );
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "other-style" } });
    expect(screen.getByRole("row", { name: /other-style/ })).toBeInTheDocument();
    expect(screen.queryByRole("row", { name: /quiet-luxury/ })).not.toBeInTheDocument();
  });

  it("uses matching server data without requesting the same range again", () => {
    setReport(report);
    render(
      <PromptCopyAnalyticsPanel
        range="7d"
        styles={styles}
        initialData={report}
      />,
    );

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/admin/analytics/prompt-copies?range=7d",
      expect.objectContaining({
        fallbackData: report,
        revalidateOnMount: false,
        keepPreviousData: false,
      }),
    );
  });

  it("revalidates matching SSR data when the browser cache has an older report", () => {
    cacheGetMock.mockReturnValue({ data: { ...report, totalCopies: 1 } });
    setReport(report);
    render(
      <PromptCopyAnalyticsPanel
        range="7d"
        styles={styles}
        initialData={report}
      />,
    );

    expect(useSWRMock).toHaveBeenCalledWith(
      "/api/admin/analytics/prompt-copies?range=7d",
      expect.objectContaining({
        fallbackData: report,
        revalidateOnMount: true,
        keepPreviousData: false,
      }),
    );
  });

  it("exports the complete current-range report, including filtered-out styles", () => {
    setReport(report);
    const createObjectURL = vi.fn(() => "blob:prompt-report");
    const revokeObjectURL = vi.fn();
    const priorCreate = Object.getOwnPropertyDescriptor(URL, "createObjectURL");
    const priorRevoke = Object.getOwnPropertyDescriptor(URL, "revokeObjectURL");
    Object.defineProperty(URL, "createObjectURL", { configurable: true, value: createObjectURL });
    Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: revokeObjectURL });
    const clickedAnchors: HTMLAnchorElement[] = [];
    const click = vi
      .spyOn(HTMLAnchorElement.prototype, "click")
      .mockImplementation(function (this: HTMLAnchorElement) {
        clickedAnchors.push(this);
      });

    try {
      render(<PromptCopyAnalyticsPanel range="7d" styles={styles} />);
      fireEvent.change(screen.getByRole("searchbox"), { target: { value: "quiet" } });
      fireEvent.click(screen.getByRole("button", { name: "导出当前范围 CSV" }));

      expect(createObjectURL).toHaveBeenCalledOnce();
      expect(click).toHaveBeenCalledOnce();
      expect(revokeObjectURL).toHaveBeenCalledWith("blob:prompt-report");
      expect(clickedAnchors[0]?.download).toBe("style-prompt-copies-7d.csv");
    } finally {
      click.mockRestore();
      if (priorCreate) Object.defineProperty(URL, "createObjectURL", priorCreate);
      else Reflect.deleteProperty(URL, "createObjectURL");
      if (priorRevoke) Object.defineProperty(URL, "revokeObjectURL", priorRevoke);
      else Reflect.deleteProperty(URL, "revokeObjectURL");
    }
  });
});
