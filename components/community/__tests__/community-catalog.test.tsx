// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import type { ComponentProps } from "react";
import type { StyleMeta } from "@/lib/styles/meta";

const { stats, retry } = vi.hoisted(() => ({ stats: vi.fn(), retry: vi.fn() }));
vi.mock("next/navigation", () => ({ useSearchParams: () => new URLSearchParams(window.location.search) }));
vi.mock("@/lib/i18n/context", () => ({ useI18n: () => ({ locale: "en" }) }));
vi.mock("next/link", () => ({ default: (props: ComponentProps<"a">) => <a {...props} /> }));
vi.mock("@/lib/swr", () => ({ useStyleStats: stats }));
vi.mock("@/components/home/style-card", () => ({
  StyleCard: ({ style, basePath, badge }: { style: StyleMeta; basePath: string; badge?: string }) => (
    <div>
      <a href={`/en${basePath}/${style.slug}`}>{style.nameEn}</a>
      {badge ? <span>{badge}</span> : null}
    </div>
  ),
}));

import { CommunityCatalog } from "@/components/community/community-catalog";
import { getStyleMetaBySlug } from "@/lib/styles/meta";

const copy = {
  submit: "Submit a style", emptyTitle: "No contributions yet", emptyBody: "Share original work.",
  sortLabel: "Sort", promoted: "Promoted", curated: "In curated library",
  searchLabel: "Search community styles", searchPlaceholder: "Search styles",
  categoryLabel: "Category", tagLabel: "Tag", all: "All", clearFilters: "Clear filters",
  filteredEmptyTitle: "No matching styles", filteredEmptyBody: "Try a broader query.",
};
const sourceStyles = [getStyleMetaBySlug("dark-mode"), getStyleMetaBySlug("glassmorphism")];
const styles = sourceStyles.filter((style): style is StyleMeta => Boolean(style)).map((style) => ({
  ...style, authorName: "Public creator", publishedAt: "2026-09-10T12:00:00Z",
}));

beforeEach(() => {
  vi.clearAllMocks();
  window.history.replaceState(null, "", "/en/community");
  stats.mockReturnValue({ data: undefined, error: undefined, isLoading: false, mutate: retry });
});
afterEach(cleanup);

describe("community browsing continuity", () => {
  it("hydrates a shared query and displays creator attribution", () => {
    window.history.replaceState(null, "", "/en/community?q=dark");
    render(<CommunityCatalog styles={styles} locale="en" copy={copy} />);
    expect(screen.getByRole("searchbox")).toHaveValue("dark");
    expect(screen.getByRole("link", { name: "Dark Mode" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Glassmorphism" })).not.toBeInTheDocument();
    expect(screen.getByText("Public creator")).toBeInTheDocument();
    expect(screen.getByRole("status")).toHaveTextContent("1 result");
  });

  it("keeps creator credit when a contribution now resolves to the curated library", () => {
    render(
      <CommunityCatalog
        styles={[{ ...styles[0], curated: true }]}
        locale="en"
        copy={copy}
      />
    );
    expect(screen.getByRole("link", { name: "Dark Mode" })).toHaveAttribute(
      "href",
      "/en/styles/dark-mode"
    );
    expect(screen.getByText("In curated library")).toBeInTheDocument();
    expect(screen.getByText("Public creator")).toBeInTheDocument();
  });

  it("changes query state without losing the path, locale, hash, or attribution parameters", () => {
    window.history.replaceState(null, "", "/zh/community?utm_source=share#contributions");
    render(<CommunityCatalog styles={styles} locale="en" copy={copy} />);
    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "glass" } });
    expect(window.location.pathname).toBe("/zh/community");
    expect(window.location.hash).toBe("#contributions");
    expect(new URLSearchParams(window.location.search).get("utm_source")).toBe("share");
    expect(new URLSearchParams(window.location.search).get("q")).toBe("glass");
  });

  it("gives an actionable empty result instead of erasing the catalog", () => {
    window.history.replaceState(null, "", "/en/community?q=not-found&utm_source=share");
    render(<CommunityCatalog styles={styles} locale="en" copy={copy} />);
    expect(screen.getByText("No matching styles")).toBeInTheDocument();
    fireEvent.click(screen.getAllByRole("button", { name: "Clear filters" }).at(-1)!);
    expect(new URLSearchParams(window.location.search).has("q")).toBe(false);
    expect(new URLSearchParams(window.location.search).get("utm_source")).toBe("share");
  });

  it("does not imply a meaningful ranking when statistics fail", () => {
    window.history.replaceState(null, "", "/en/community?sort=popular");
    stats.mockReturnValue({ data: undefined, error: new Error("offline"), isLoading: false, mutate: retry });
    render(<CommunityCatalog styles={styles} locale="en" copy={copy} />);
    expect(screen.getByText(/does not represent popularity or ratings/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry" }));
    expect(retry).toHaveBeenCalledOnce();
  });
});
