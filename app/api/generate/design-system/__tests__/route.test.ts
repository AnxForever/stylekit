import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/knowledge", () => ({
  getDesignRecommendation: vi.fn(),
}));

vi.mock("@/lib/styles", () => ({
  getStyleBySlug: vi.fn(),
  styles: [],
}));

vi.mock("@/lib/styles/tokens-registry", () => ({
  getStyleTokens: vi.fn(),
}));

vi.mock("@/lib/recipes", () => ({
  getStyleRecipes: vi.fn(),
}));

vi.mock("@/lib/styles/style-mapping", () => ({
  mapStyleToSlug: vi.fn(),
  isDarkStyle: vi.fn(),
  resolveColorScheme: vi.fn(),
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

import { POST } from "@/app/api/generate/design-system/route";
import { getDesignRecommendation } from "@/lib/knowledge";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { getStyleRecipes } from "@/lib/recipes";
import {
  mapStyleToSlug,
  isDarkStyle,
  resolveColorScheme,
} from "@/lib/styles/style-mapping";
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

const mockedGetDesignRecommendation = vi.mocked(getDesignRecommendation);
const mockedGetStyleBySlug = vi.mocked(getStyleBySlug);
const mockedGetStyleTokens = vi.mocked(getStyleTokens);
const mockedGetStyleRecipes = vi.mocked(getStyleRecipes);
const mockedMapStyleToSlug = vi.mocked(mapStyleToSlug);
const mockedIsDarkStyle = vi.mocked(isDarkStyle);
const mockedResolveColorScheme = vi.mocked(resolveColorScheme);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedHashGeneratorClientKey = vi.mocked(hashGeneratorClientKey);
const mockedRecordGeneratorApiEvent = vi.mocked(recordGeneratorApiEvent);

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/generate/design-system", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/generate/design-system", {
        method: "POST",
      })
    );

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      code: "ORIGIN_NOT_ALLOWED",
      error: "Cross-origin request denied",
    });
    expect(mockedHashGeneratorClientKey).toHaveBeenCalledTimes(1);
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-design-system",
        outcome: "error",
        code: "ORIGIN_NOT_ALLOWED",
      })
    );
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:design-system");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 40,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(
      new Request("https://stylekit.top/api/generate/design-system", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ productType: "SaaS dashboard" }),
      })
    );

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      code: "RATE_LIMITED",
      error: "Too many design-system generation requests. Please try again later.",
    });
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-design-system",
        outcome: "error",
        code: "RATE_LIMITED",
      })
    );
  });

  it("returns INVALID_REQUEST when productType is missing", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:design-system-invalid");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 40,
      remaining: 39,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 1,
    });

    const response = await POST(
      new Request("https://stylekit.top/api/generate/design-system", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({}),
      })
    );

    expect(response.status).toBe(400);
    const payload = await response.json();
    expect(payload.code).toBe("INVALID_REQUEST");
    expect(typeof payload.error).toBe("string");
    expect(payload.error.length).toBeGreaterThan(0);
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-design-system",
        outcome: "error",
        code: "INVALID_REQUEST",
      })
    );
  });

  it("returns generated design system for valid requests", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:design-system-ok");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 40,
      remaining: 39,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 1,
    });

    mockedGetDesignRecommendation.mockReturnValue({
      style: { primary: "neo-brutalist" },
      colors: { primary: "#000000" },
      typography: { heading: "Inter" },
      landingPattern: "hero-first",
      uxGuidelines: ["Keep contrast high"],
      stackGuidelines: ["Use semantic HTML"],
      icons: ["lucide"],
      charts: ["bar"],
    } as never);
    mockedMapStyleToSlug.mockReturnValue("neo-brutalist");
    mockedIsDarkStyle.mockReturnValue(false);
    mockedResolveColorScheme.mockReturnValue("light");
    mockedGetStyleBySlug.mockReturnValue({
      slug: "neo-brutalist",
      nameEn: "Neo-Brutalist",
      description: "Bold and direct",
      philosophy: "Clarity first",
      doList: ["Use thick borders"],
      dontList: ["Avoid low-contrast"],
      aiRules: ["Always keep hard edges"],
      colors: {
        primary: "#111111",
        secondary: "#f6f6f6",
        accent: ["#ff0088"],
      },
      components: {
        button: {
          name: "Button",
          code: "<button class='btn'>Click</button>",
        },
      },
      globalCss: "body { margin: 0; }",
    } as never);
    mockedGetStyleTokens.mockReturnValue({
      typography: { heading: "Inter" },
    } as never);
    mockedGetStyleRecipes.mockReturnValue({
      styleSlug: "neo-brutalist",
      recipes: { button: {} },
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/generate/design-system", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productType: "SaaS dashboard",
          stylePreference: "auto",
          colorScheme: "light",
          includeComponents: ["button"],
        }),
      })
    );

    expect(response.status).toBe(200);
    const payload = await response.json();
    expect(payload.meta.generatedFor).toBe("SaaS dashboard");
    expect(payload.meta.styleSlug).toBe("neo-brutalist");
    expect(payload.components).toEqual({
      button: {
        name: "Button",
        code: "<button class='btn'>Click</button>",
      },
    });
    expect(payload.quickStart).toContain("Neo-Brutalist Quick Start");
    expect(mockedRecordGeneratorApiEvent).toHaveBeenCalledWith(
      expect.objectContaining({
        endpoint: "generate-design-system",
        outcome: "success",
        status: 200,
      })
    );
  });
});
