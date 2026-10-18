import type { DownloadPack, DownloadStyle, DownloadTheme } from "./types";

export type DownloadFilterStyle = "all" | DownloadStyle;
export type DownloadFilterTheme = "all" | DownloadTheme;

function parseStyle(value: string | null): DownloadFilterStyle {
  switch (value) {
    case "low-poly":
    case "clay":
    case "voxel":
    case "futuristic":
    case "cartoon":
    case "toy":
      return value;
    default:
      return "all";
  }
}

function parseTheme(value: string | null): DownloadFilterTheme {
  switch (value) {
    case "props":
    case "creatures":
    case "architecture":
    case "scenes":
    case "furniture":
      return value;
    default:
      return "all";
  }
}

function normalizeQuery(value: string): string {
  return value.trim().slice(0, 120);
}

function parseSelected(value: string | null): string | null {
  return value && value.length <= 128 && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
    ? value
    : null;
}

export function parseDownloadFilters(search: string): {
  style: DownloadFilterStyle;
  theme: DownloadFilterTheme;
  query: string;
  selected: string | null;
} {
  const params = new URLSearchParams(search);
  return {
    style: parseStyle(params.get("style")),
    theme: parseTheme(params.get("theme")),
    query: normalizeQuery(params.get("q") ?? ""),
    selected: parseSelected(params.get("pack")),
  };
}

export function filterDownloadPacks(
  packs: DownloadPack[],
  style: DownloadFilterStyle,
  theme: DownloadFilterTheme,
  query: string,
): DownloadPack[] {
  const terms = normalizeQuery(query).toLowerCase().split(/\s+/).filter(Boolean);

  return packs.filter((pack) => {
    if (style !== "all" && pack.style !== style) return false;
    if (theme !== "all" && pack.theme !== theme) return false;
    if (terms.length === 0) return true;

    const searchable = [
      pack.name.zh,
      pack.name.en,
      pack.description.zh,
      pack.description.en,
      pack.style,
      pack.theme,
      ...pack.tags,
      ...pack.styleSlugs,
    ].join(" ").toLowerCase();

    return terms.every((term) => searchable.includes(term));
  });
}

export function getDownloadFilterHref(
  currentUrl: URL,
  updates: {
    style?: DownloadFilterStyle;
    theme?: DownloadFilterTheme;
    query?: string;
    selected?: string | null;
  },
): string {
  const destination = new URL(currentUrl.href);

  if (updates.style !== undefined) {
    if (updates.style === "all") destination.searchParams.delete("style");
    else destination.searchParams.set("style", updates.style);
  }

  if (updates.theme !== undefined) {
    if (updates.theme === "all") destination.searchParams.delete("theme");
    else destination.searchParams.set("theme", updates.theme);
  }

  if (updates.query !== undefined) {
    const query = normalizeQuery(updates.query);
    if (query) destination.searchParams.set("q", query);
    else destination.searchParams.delete("q");
  }

  if (updates.selected !== undefined) {
    const selected = parseSelected(updates.selected);
    if (selected) destination.searchParams.set("pack", selected);
    else destination.searchParams.delete("pack");
  }

  return `${destination.pathname}${destination.search}${destination.hash}`;
}
