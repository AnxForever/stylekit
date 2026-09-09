import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  clearRemoteCache,
  getStyleDetailLive,
  getTokensLive,
  knownSlugLive,
  searchStylesLive,
} from "@/packages/core/src/discovery/remote";

const catalogue = (styles: unknown[]) =>
  new Response(JSON.stringify({ total: styles.length, styles }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });

const style = (slug: string, category = "modern") => ({
  slug,
  name: `${slug} 中文`,
  nameEn: slug,
  description: `${slug} description`,
  descriptionEn: `${slug} description`,
  category,
  tags: ["live"],
  keywords: [slug],
  colors: {
    primary: "#111111",
    secondary: "#ffffff",
    accent: ["#ff006e"],
  },
});

function responseFor(url: string, body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

beforeEach(() => {
  clearRemoteCache();
  vi.useRealTimers();
});

afterEach(() => {
  clearRemoteCache();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("remote discovery", () => {
  it("falls back with a reason on HTTP and network failures", async () => {
    const fetchMock = vi.fn().mockResolvedValue(responseFor("", {}, 503));
    vi.stubGlobal("fetch", fetchMock);

    const httpFailure = await searchStylesLive({}, { baseUrl: "https://http.test" });
    expect(httpFailure.origin).toBe("bundled");
    expect(httpFailure.fallbackReason).toBe("HTTP 503");

    clearRemoteCache();
    fetchMock.mockRejectedValueOnce(new Error("DNS unavailable"));
    const networkFailure = await searchStylesLive({}, { baseUrl: "https://network.test" });
    expect(networkFailure.origin).toBe("bundled");
    expect(networkFailure.fallbackReason).toBe("DNS unavailable");
  });

  it("uses the timeout budget and reports a stable fallback reason", async () => {
    vi.useFakeTimers();
    const fetchMock = vi.fn((_url: string, init?: RequestInit) =>
      new Promise<Response>((_, reject) => {
        init?.signal?.addEventListener("abort", () => reject(new Error("aborted")));
      }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const pending = searchStylesLive(
      {},
      { baseUrl: "https://timeout.test", timeoutMs: 25 },
    );
    await vi.advanceTimersByTimeAsync(25);
    const result = await pending;

    expect(result.origin).toBe("bundled");
    expect(result.fallbackReason).toBe("timed out after 25ms");
  });

  it("isolates caches and circuit breakers by normalized base URL", async () => {
    const fetchMock = vi.fn((url: string) => {
      if (url.startsWith("https://one.test")) {
        return Promise.resolve(responseFor(url, { styles: [style("one-only")] }));
      }
      if (url.startsWith("https://failing.test")) {
        return Promise.reject(new Error("offline"));
      }
      return Promise.resolve(responseFor(url, { styles: [style("two-only")] }));
    });
    vi.stubGlobal("fetch", fetchMock);

    const one = await searchStylesLive({}, { baseUrl: "https://one.test/" });
    const oneAgain = await searchStylesLive({}, { baseUrl: "https://one.test" });
    const two = await searchStylesLive({}, { baseUrl: "https://two.test" });

    expect(one.origin).toBe("live");
    expect(oneAgain.origin).toBe("live");
    expect(one.data.results[0]?.slug).toBe("one-only");
    expect(two.origin).toBe("live");
    expect(two.data.results[0]?.slug).toBe("two-only");
    expect(fetchMock).toHaveBeenCalledTimes(2);

    const failed = await searchStylesLive({}, { baseUrl: "https://failing.test" });
    const backedOff = await searchStylesLive({}, { baseUrl: "https://failing.test" });
    const recoveredOtherHost = await searchStylesLive({}, { baseUrl: "https://two.test" });

    expect(failed.fallbackReason).toBe("offline");
    expect(backedOff.fallbackReason).toBe("live source unreachable, backing off");
    expect(recoveredOtherHost.origin).toBe("live");
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("coalesces concurrent requests for the same endpoint", async () => {
    let resolveResponse: ((response: Response) => void) | undefined;
    const fetchMock = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveResponse = resolve;
        }),
    );
    vi.stubGlobal("fetch", fetchMock);

    const first = searchStylesLive({}, { baseUrl: "https://coalesce.test" });
    const second = searchStylesLive({}, { baseUrl: "https://coalesce.test/" });
    await Promise.resolve();
    expect(fetchMock).toHaveBeenCalledOnce();

    resolveResponse?.(catalogue([style("coalesced")]));
    await expect(first).resolves.toMatchObject({ origin: "live" });
    await expect(second).resolves.toMatchObject({ origin: "live" });
  });

  it("falls back when styles is not an array or contains no usable records", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(responseFor("", { styles: null }))
      .mockResolvedValueOnce(responseFor("", { styles: [{ name: "missing slug" }] }));
    vi.stubGlobal("fetch", fetchMock);

    const malformed = await searchStylesLive({}, { baseUrl: "https://malformed.test" });
    expect(malformed.origin).toBe("bundled");
    expect(malformed.fallbackReason).toContain("malformed styles payload");

    clearRemoteCache();
    const unusable = await searchStylesLive({}, { baseUrl: "https://unusable.test" });
    expect(unusable.origin).toBe("bundled");
    expect(unusable.fallbackReason).toContain("no usable styles");
  });

  it("keeps category, existence, and detail data aligned for live-only styles", async () => {
    const liveStyle = style("live-only", "retro");
    const fetchMock = vi.fn((url: string) => {
      if (url.endsWith("/api/styles/live-only")) {
        return Promise.resolve(
          responseFor(url, {
            slug: "live-only",
            name: "仅在线",
            nameEn: "Live Only",
            description: "Remote detail",
            philosophy: "Remote philosophy",
            keywords: ["retro", "live"],
            colors: liveStyle.colors,
            tokens: null,
            recipes: null,
            readiness: { source: "fallback" },
          }),
        );
      }
      if (url.endsWith("/api/styles/live-only/tokens")) {
        return Promise.resolve(responseFor(url, null));
      }
      return Promise.resolve(catalogue([liveStyle]));
    });
    vi.stubGlobal("fetch", fetchMock);

    const search = await searchStylesLive(
      { category: "retro" },
      { baseUrl: "https://self-hosted.test/" },
    );
    const known = await knownSlugLive("live-only", {
      baseUrl: "https://self-hosted.test",
    });
    const detail = await getStyleDetailLive("live-only", {
      baseUrl: "https://self-hosted.test",
    });
    const tokens = await getTokensLive("live-only", {
      baseUrl: "https://self-hosted.test",
    });

    expect(search.origin).toBe("live");
    expect(search.data.total).toBe(1);
    expect(known).toMatchObject({ data: true, origin: "live" });
    expect(detail).toMatchObject({ origin: "live", data: { category: "retro" } });
    expect(detail.data?.url).toBe("https://self-hosted.test/styles/live-only");
    expect(tokens.origin).toBe("bundled");
    expect(tokens.fallbackReason).toContain("malformed payload");
  });

  it("does not throw for primitive detail payloads", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(responseFor("", "not an object")),
    );

    const result = await getStyleDetailLive("remote-primitive", {
      baseUrl: "https://primitive.test",
    });
    expect(result.data).toBeNull();
    expect(result.origin).toBe("bundled");
    expect(result.fallbackReason).toContain("malformed payload");
  });

  it("expires cached responses and clearRemoteCache resets state", async () => {
    vi.useFakeTimers();
    const fetchMock = vi
      .fn()
      .mockResolvedValue(catalogue([style("cached")]));
    vi.stubGlobal("fetch", fetchMock);

    await searchStylesLive({}, { baseUrl: "https://ttl.test", cacheTtlMs: 100 });
    await searchStylesLive({}, { baseUrl: "https://ttl.test", cacheTtlMs: 100 });
    expect(fetchMock).toHaveBeenCalledOnce();

    await vi.advanceTimersByTimeAsync(101);
    await searchStylesLive({}, { baseUrl: "https://ttl.test", cacheTtlMs: 100 });
    expect(fetchMock).toHaveBeenCalledTimes(2);

    clearRemoteCache();
    await searchStylesLive({}, { baseUrl: "https://ttl.test", cacheTtlMs: 100 });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
