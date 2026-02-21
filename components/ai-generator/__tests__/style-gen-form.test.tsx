// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

const {
  getAllStylesMetaMock,
  hasStyleTokensMock,
  useI18nMock,
} = vi.hoisted(() => ({
  getAllStylesMetaMock: vi.fn(),
  hasStyleTokensMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/styles/meta", () => ({
  getAllStylesMeta: getAllStylesMetaMock,
}));

vi.mock("@/lib/styles/tokens-registry", () => ({
  hasStyleTokens: hasStyleTokensMock,
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

import { StyleGenForm } from "@/components/ai-generator/style-gen-form";

const STYLE_CATALOG_CACHE_KEY = "stylekit-ai-gen-catalog-v1";
const STYLE_CATALOG_ETAG_KEY = "stylekit-ai-gen-catalog-etag-v1";

const baseStylesMeta = [
  {
    slug: "apple-style",
    name: "Apple",
    nameEn: "Apple Style",
    description: "",
    cover: "",
    category: "modern",
    styleType: "visual",
    tags: ["modern"],
    keywords: ["clean"],
    colors: { primary: "#000", secondary: "#fff", accent: ["#f00"] },
  },
  {
    slug: "neo-brutalist",
    name: "Neo",
    nameEn: "Neo Brutalist",
    description: "",
    cover: "",
    category: "expressive",
    styleType: "visual",
    tags: ["expressive"],
    keywords: ["bold"],
    colors: { primary: "#000", secondary: "#fff", accent: ["#0f0"] },
  },
  {
    slug: "editorial",
    name: "Editorial",
    nameEn: "Editorial",
    description: "",
    cover: "",
    category: "minimal",
    styleType: "visual",
    tags: ["minimal"],
    keywords: ["typography"],
    colors: { primary: "#000", secondary: "#fff", accent: ["#00f"] },
  },
] as const;

describe("StyleGenForm", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock as unknown as typeof fetch);
    localStorage.clear();

    getAllStylesMetaMock.mockReturnValue(baseStylesMeta);
    hasStyleTokensMock.mockReturnValue(true);
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("hydrates catalog from cache and revalidates with If-None-Match", async () => {
    localStorage.setItem(
      STYLE_CATALOG_CACHE_KEY,
      JSON.stringify({
        catalogVersion: "11111111",
        availableStyles: ["apple-style"],
        moodKeywords: ["clean"],
      })
    );
    localStorage.setItem(STYLE_CATALOG_ETAG_KEY, 'W/"cached-etag"');

    fetchMock.mockResolvedValue(
      new Response(null, {
        status: 304,
        headers: { ETag: 'W/"cached-etag"' },
      })
    );

    render(<StyleGenForm onGenerate={vi.fn()} />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/generate-style",
      expect.objectContaining({
        method: "GET",
        headers: { "If-None-Match": 'W/"cached-etag"' },
        cache: "no-store",
      })
    );

    expect(screen.getByRole("option", { name: "Apple Style (Apple)" })).toBeInTheDocument();
    expect(
      screen.queryByRole("option", { name: "Neo Brutalist (Neo)" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "clean" })).toBeInTheDocument();
    expect(
      screen.getByText("aiGen.catalogSource: aiGen.catalogSourceCache")
    ).toBeInTheDocument();
  });

  it("updates local catalog from server response", async () => {
    fetchMock.mockResolvedValue(
      new Response(
        JSON.stringify({
          catalogVersion: "22222222",
          availableStyles: ["neo-brutalist", "editorial"],
          moodKeywords: ["dark", "bold"],
        }),
        {
          status: 200,
          headers: { ETag: 'W/"fresh-etag"' },
        }
      )
    );

    render(<StyleGenForm onGenerate={vi.fn()} />);

    await waitFor(() =>
      expect(screen.getByRole("option", { name: "Neo Brutalist (Neo)" })).toBeInTheDocument()
    );

    expect(
      screen.queryByRole("option", { name: "Apple Style (Apple)" })
    ).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "dark" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "bold" })).toBeInTheDocument();
    expect(
      screen.getByText("aiGen.catalogSource: aiGen.catalogSourceNetwork")
    ).toBeInTheDocument();

    const cachedCatalog = localStorage.getItem(STYLE_CATALOG_CACHE_KEY);
    expect(cachedCatalog).toContain("22222222");
    expect(localStorage.getItem(STYLE_CATALOG_ETAG_KEY)).toBe('W/"fresh-etag"');
  });

  it("falls back to local catalog when discovery request fails", async () => {
    fetchMock.mockImplementation(async (url: string) => {
      if (url === "/api/generate-style") {
        throw new Error("network failed");
      }
      return new Response(JSON.stringify({ ok: true }), { status: 202 });
    });

    render(<StyleGenForm onGenerate={vi.fn()} />);

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(
      screen.getByText("aiGen.catalogSource: aiGen.catalogSourceFallback")
    ).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Apple Style (Apple)" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Neo Brutalist (Neo)" })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenNthCalledWith(
      2,
      "/api/generate-style/report-fallback",
      expect.objectContaining({
        method: "POST",
        keepalive: true,
      })
    );

    const reportPayload = JSON.parse(
      ((fetchMock.mock.calls[1]?.[1] as RequestInit).body as string) || "{}"
    );
    expect(reportPayload).toEqual({
      reason: "network-error",
    });
  });

  it("appends keyword chip once without duplicates", async () => {
    localStorage.setItem(
      STYLE_CATALOG_CACHE_KEY,
      JSON.stringify({
        catalogVersion: "11111111",
        availableStyles: ["apple-style", "neo-brutalist"],
        moodKeywords: ["dark"],
      })
    );

    fetchMock.mockResolvedValue(new Response(null, { status: 304 }));

    render(<StyleGenForm onGenerate={vi.fn()} />);

    const textarea = screen.getByLabelText("aiGen.descriptionLabel") as HTMLTextAreaElement;
    const chip = await screen.findByRole("button", { name: "dark" });

    fireEvent.click(chip);
    fireEvent.click(chip);

    await waitFor(() => {
      expect(textarea.value).toBe("dark");
    });
  });

  it("submits trimmed description and selected base style", async () => {
    const generated = { name: "X", sourceStyles: [], confidence: 90, tokens: {} };

    localStorage.setItem(
      STYLE_CATALOG_CACHE_KEY,
      JSON.stringify({
        catalogVersion: "11111111",
        availableStyles: ["apple-style", "neo-brutalist", "editorial"],
        moodKeywords: ["clean"],
      })
    );
    localStorage.setItem(STYLE_CATALOG_ETAG_KEY, 'W/"cached-etag"');

    fetchMock.mockImplementation(async (_url: string, init?: RequestInit) => {
      if (init?.method === "POST") {
        return new Response(JSON.stringify(generated), { status: 200 });
      }
      return new Response(null, { status: 304 });
    });

    const onGenerate = vi.fn();
    render(<StyleGenForm onGenerate={onGenerate} />);

    const textarea = screen.getByLabelText("aiGen.descriptionLabel");
    fireEvent.change(textarea, { target: { value: "  clean dashboard  " } });

    const select = screen.getByLabelText("aiGen.baseStyleLabel");
    fireEvent.change(select, { target: { value: "neo-brutalist" } });

    fireEvent.click(screen.getByRole("button", { name: "aiGen.generate" }));

    await waitFor(() => expect(onGenerate).toHaveBeenCalledTimes(1));

    const postCall = fetchMock.mock.calls.find(
      ([url, init]) =>
        url === "/api/generate-style" && (init as RequestInit)?.method === "POST"
    );
    expect(postCall).toBeDefined();

    const payload = JSON.parse(((postCall?.[1] as RequestInit).body as string) || "{}");
    expect(payload).toEqual({
      description: "clean dashboard",
      baseStyle: "neo-brutalist",
      variationCount: 3,
      creativity: 0.6,
    });
  });
});
