import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/ai-generator", () => ({
  generateStyleCandidatesFromDescription: vi.fn(),
  getAvailableStyleSlugs: vi.fn(),
  getMoodKeywords: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(),
  getRequestClientKey: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/generator/api-events", () => ({
  hashGeneratorClientKey: vi.fn(() => "client-hash"),
  recordGeneratorApiEvent: vi.fn(),
}));

import { GET, POST } from "@/app/api/generate-style/route";
import {
  generateStyleCandidatesFromDescription,
  getAvailableStyleSlugs,
  getMoodKeywords,
} from "@/lib/ai-generator";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import {
  hashGeneratorClientKey,
  recordGeneratorApiEvent,
} from "@/lib/generator/api-events";

const mockedGenerateStyleCandidatesFromDescription = vi.mocked(
  generateStyleCandidatesFromDescription
);
const mockedGetAvailableStyleSlugs = vi.mocked(getAvailableStyleSlugs);
const mockedGetMoodKeywords = vi.mocked(getMoodKeywords);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedHashGeneratorClientKey = vi.mocked(hashGeneratorClientKey);
const mockedRecordGeneratorApiEvent = vi.mocked(recordGeneratorApiEvent);

afterEach(() => {
  vi.clearAllMocks();
});

function mockAllowedRequest(clientKey = "ip:style-generator") {
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedGetRequestClientKey.mockReturnValue(clientKey);
  mockedCheckRateLimit.mockReturnValue({
    allowed: true,
    limit: 30,
    remaining: 29,
    resetAt: Date.now() + 1_000,
    retryAfterSec: 1,
  });
}

describe("POST /api/generate-style", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
      }) as never
    );

    expect(response.status).toBe(403);
    expect(response.headers.get("x-stylekit-status")).toBe("403");
    expect(response.headers.get("x-stylekit-error-code")).toBe("ORIGIN_NOT_ALLOWED");
    expect(Number(response.headers.get("x-stylekit-duration-ms"))).toBeGreaterThanOrEqual(0);
    await expect(response.json()).resolves.toEqual({
      code: "ORIGIN_NOT_ALLOWED",
      error: "Cross-origin request denied",
    });
    expect(mockedHashGeneratorClientKey).toHaveBeenCalledTimes(1);
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        code: "ORIGIN_NOT_ALLOWED",
      })
    );
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:style-generator");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 30,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: "neo brutal with strong contrast" }),
      }) as never
    );

    expect(response.status).toBe(429);
    expect(response.headers.get("x-stylekit-status")).toBe("429");
    expect(response.headers.get("x-stylekit-error-code")).toBe("RATE_LIMITED");
    await expect(response.json()).resolves.toEqual({
      code: "RATE_LIMITED",
      error: "Too many style generation requests. Please try again later.",
    });
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        code: "RATE_LIMITED",
      })
    );
  });

  it("returns INVALID_REQUEST for malformed payload", async () => {
    mockAllowedRequest("ip:style-generator-invalid");

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: "" }),
      }) as never
    );

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.code).toBe("INVALID_REQUEST");
    expect(payload.error).toBe("Description is required.");
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        code: "INVALID_REQUEST",
      })
    );
  });

  it("returns INVALID_JSON when request body is not valid json", async () => {
    mockAllowedRequest("ip:style-generator-json");

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{invalid-json}",
      }) as never
    );

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      code: "INVALID_JSON",
      error: "Invalid JSON request body.",
    });
    expect(response.headers.get("x-stylekit-status")).toBe("400");
    expect(response.headers.get("x-stylekit-error-code")).toBe("INVALID_JSON");
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        code: "INVALID_JSON",
      })
    );
  });

  it("generates style when request is valid", async () => {
    mockAllowedRequest("ip:style-generator-ok");
    mockedGenerateStyleCandidatesFromDescription.mockReturnValue({
      result: {
        name: "Future Clean Fusion",
        description: "Generated from: Apple Style, Mecha.",
        tokens: { colors: { background: { primary: "bg-black", secondary: "bg-zinc-900", accent: [] }, text: { primary: "text-white", secondary: "text-zinc-300", muted: "text-zinc-500" }, button: { primary: "bg-white text-black", secondary: "bg-zinc-900 text-white" } }, typography: { heading: "font-sans", body: "font-sans", mono: "font-mono", sizes: { hero: "text-5xl", h1: "text-4xl", h2: "text-3xl", h3: "text-2xl", body: "text-base", small: "text-sm" } }, spacing: { section: "py-16", container: "max-w-6xl mx-auto", card: "p-6", gap: { sm: "gap-2", md: "gap-4", lg: "gap-8" } }, border: { width: "border", color: "border-zinc-700", radius: "rounded-xl", style: "border-solid" }, shadow: { sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg", none: "shadow-none", hover: "hover:shadow-xl", focus: "focus:ring-2", colored: false }, interaction: { transition: "transition-all duration-300", hoverScale: "hover:scale-105", hoverTranslate: "", active: "active:scale-95" }, forbidden: [], required: [] },
        sourceStyles: [{ slug: "apple-style", weight: 0.6 }],
        confidence: 84,
        reasoning: ["Anchored to Apple Style."],
        insights: {
          baseStyle: "apple-style",
          detectedStyles: ["apple-style"],
          avoidedStyles: ["neo-brutalist"],
          matchedKeywords: ["futuristic", "clean"],
          negativeKeywords: ["brutalist"],
        },
      },
      candidates: [
        {
          name: "Future Clean Fusion",
          description: "Generated from: Apple Style, Mecha.",
          tokens: { colors: { background: { primary: "bg-black", secondary: "bg-zinc-900", accent: [] }, text: { primary: "text-white", secondary: "text-zinc-300", muted: "text-zinc-500" }, button: { primary: "bg-white text-black", secondary: "bg-zinc-900 text-white" } }, typography: { heading: "font-sans", body: "font-sans", mono: "font-mono", sizes: { hero: "text-5xl", h1: "text-4xl", h2: "text-3xl", h3: "text-2xl", body: "text-base", small: "text-sm" } }, spacing: { section: "py-16", container: "max-w-6xl mx-auto", card: "p-6", gap: { sm: "gap-2", md: "gap-4", lg: "gap-8" } }, border: { width: "border", color: "border-zinc-700", radius: "rounded-xl", style: "border-solid" }, shadow: { sm: "shadow-sm", md: "shadow-md", lg: "shadow-lg", none: "shadow-none", hover: "hover:shadow-xl", focus: "focus:ring-2", colored: false }, interaction: { transition: "transition-all duration-300", hoverScale: "hover:scale-105", hoverTranslate: "", active: "active:scale-95" }, forbidden: [], required: [] },
          sourceStyles: [{ slug: "apple-style", weight: 0.6 }],
          confidence: 84,
        },
      ],
      meta: {
        variationCount: 1,
        creativity: 0.55,
        seed: 123,
      },
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: "neo brutal with editorial typography",
          baseStyle: "neo-brutalist",
        }),
      }) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-error-code")).toBeNull();
    expect(mockedGenerateStyleCandidatesFromDescription).toHaveBeenCalledWith({
      description: "neo brutal with editorial typography",
      baseStyle: "neo-brutalist",
      variationCount: undefined,
      creativity: undefined,
      seed: undefined,
    });
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({
        name: "Future Clean Fusion",
        sourceStyles: [{ slug: "apple-style", weight: 0.6 }],
        confidence: 84,
        meta: {
          variationCount: 1,
          creativity: 0.55,
          seed: 123,
        },
        reasoning: ["Anchored to Apple Style."],
        insights: {
          baseStyle: "apple-style",
          detectedStyles: ["apple-style"],
          avoidedStyles: ["neo-brutalist"],
          matchedKeywords: ["futuristic", "clean"],
          negativeKeywords: ["brutalist"],
        },
      })
    );
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "success",
        status: 200,
      })
    );
  });

  it("forwards variation settings to generator", async () => {
    mockAllowedRequest("ip:style-generator-options");
    mockedGenerateStyleCandidatesFromDescription.mockReturnValue({
      result: {
        name: "Future Clean Fusion",
        description: "Generated from: Apple Style.",
        tokens: {} as never,
        sourceStyles: [{ slug: "apple-style", weight: 1 }],
        confidence: 80,
      },
      candidates: [],
      meta: {
        variationCount: 3,
        creativity: 0.75,
        seed: 42,
      },
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          description: "futuristic, clean",
          variationCount: 3,
          creativity: 0.75,
          seed: 42,
        }),
      }) as never
    );

    expect(response.status).toBe(200);
    expect(mockedGenerateStyleCandidatesFromDescription).toHaveBeenCalledWith({
      description: "futuristic, clean",
      baseStyle: undefined,
      variationCount: 3,
      creativity: 0.75,
      seed: 42,
    });
  });

  it("returns GENERATION_FAILED when generator throws", async () => {
    mockAllowedRequest("ip:style-generator-fail");
    mockedGenerateStyleCandidatesFromDescription.mockImplementation(() => {
      throw new Error("boom");
    });

    const response = await POST(
      new Request("https://stylekit.top/api/generate-style", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ description: "dark futuristic UI" }),
      }) as never
    );

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      code: "GENERATION_FAILED",
      error: "Failed to generate style: boom",
    });
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-error-code")).toBe("GENERATION_FAILED");
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        code: "GENERATION_FAILED",
      })
    );
  });
});

describe("GET /api/generate-style", () => {
  function mockDiscoveryClientKey(clientKey = "ip:style-generator-discovery") {
    mockedGetRequestClientKey.mockReturnValue(clientKey);
  }

  it("returns available styles and mood keywords with cache headers", async () => {
    mockDiscoveryClientKey("ip:style-generator-discovery-hit");
    mockedGetAvailableStyleSlugs.mockReturnValue(["apple-style", "neo-brutalist"]);
    mockedGetMoodKeywords.mockReturnValue(["clean", "dark", "futuristic"]);

    const response = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
      }) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=300, stale-while-revalidate=3600"
    );
    expect(response.headers.get("etag")).toBeTruthy();
    expect(response.headers.get("x-stylekit-status")).toBe("200");
    expect(response.headers.get("x-stylekit-catalog-source")).toBe("network");
    expect(Number(response.headers.get("x-stylekit-duration-ms"))).toBeGreaterThanOrEqual(0);
    const payload = await response.json();
    expect(payload).toEqual({
      catalogVersion: expect.any(String),
      availableStyles: ["apple-style", "neo-brutalist"],
      moodKeywords: ["clean", "dark", "futuristic"],
    });
    expect(payload.catalogVersion).toHaveLength(8);
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "success",
        status: 200,
        code: "DISCOVERY_REFRESH",
      })
    );
  });

  it("returns 304 when if-none-match matches generated etag", async () => {
    mockDiscoveryClientKey("ip:style-generator-discovery-304");
    mockedGetAvailableStyleSlugs.mockReturnValue(["apple-style"]);
    mockedGetMoodKeywords.mockReturnValue(["clean"]);

    const first = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
      }) as never
    );
    const etag = first.headers.get("etag");
    expect(etag).toBeTruthy();

    const second = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
        headers: { "if-none-match": etag ?? "" },
      }) as never
    );

    expect(second.status).toBe(304);
    expect(second.headers.get("etag")).toBe(etag);
    expect(second.headers.get("cache-control")).toBe(
      "public, max-age=300, stale-while-revalidate=3600"
    );
    expect(second.headers.get("x-stylekit-status")).toBe("304");
    expect(second.headers.get("x-stylekit-catalog-source")).toBe("not-modified");
    await expect(second.text()).resolves.toBe("");
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "success",
        status: 304,
        code: "DISCOVERY_NOT_MODIFIED",
      })
    );
  });

  it("returns 304 when if-none-match includes strong etag token", async () => {
    mockDiscoveryClientKey("ip:style-generator-discovery-strong");
    mockedGetAvailableStyleSlugs.mockReturnValue(["apple-style"]);
    mockedGetMoodKeywords.mockReturnValue(["clean"]);

    const first = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
      }) as never
    );
    const etag = first.headers.get("etag");
    expect(etag).toBeTruthy();

    const strongTag = (etag ?? "").replace(/^W\//, "");
    const second = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
        headers: { "if-none-match": `"legacy", ${strongTag}` },
      }) as never
    );

    expect(second.status).toBe(304);
  });

  it("returns 304 when if-none-match wildcard is used", async () => {
    mockDiscoveryClientKey("ip:style-generator-discovery-wildcard");
    mockedGetAvailableStyleSlugs.mockReturnValue(["apple-style"]);
    mockedGetMoodKeywords.mockReturnValue(["clean"]);

    const response = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
        headers: { "if-none-match": "*" },
      }) as never
    );

    expect(response.status).toBe(304);
  });

  it("returns DISCOVERY_FAILED when metadata generation throws", async () => {
    mockDiscoveryClientKey("ip:style-generator-discovery-fail");
    mockedGetAvailableStyleSlugs.mockImplementation(() => {
      throw new Error("catalog exploded");
    });

    const response = await GET(
      new Request("https://stylekit.top/api/generate-style", {
        method: "GET",
      }) as never
    );

    expect(response.status).toBe(500);
    expect(response.headers.get("x-stylekit-status")).toBe("500");
    expect(response.headers.get("x-stylekit-catalog-source")).toBe("error");
    await expect(response.json()).resolves.toEqual({
      code: "DISCOVERY_FAILED",
      error: "Failed to load style discovery metadata: catalog exploded",
    });
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-style",
        outcome: "error",
        status: 500,
        code: "DISCOVERY_FAILED",
      })
    );
  });
});
