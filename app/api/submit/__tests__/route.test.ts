import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/submit/validator", () => ({
  wizardFormSchema: { safeParse: vi.fn() },
}));

vi.mock("@/lib/submit/converter", () => ({
  convertToStyleTokens: vi.fn(),
  convertToDesignStyle: vi.fn(),
}));

vi.mock("@/lib/submit/manifest-validator", () => ({
  validateStyleSubmissionManifest: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(),
  createSubmissionSupabase: vi.fn(),
  hasActiveSubmissionSlugSupabase: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  hasActiveSubmissionSlug: vi.fn(),
}));

vi.mock("@/lib/styles", () => ({
  getStyleBySlug: vi.fn(),
}));

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/security/rate-limit", () => ({
  checkRateLimit: vi.fn(),
  createRateLimitHeaders: vi.fn(),
  getRequestClientKey: vi.fn(),
}));

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(),
}));

vi.mock("@/lib/security/json-body", () => ({
  parseJsonBodyWithLimit: vi.fn(),
}));

import { POST } from "@/app/api/submit/route";
import { wizardFormSchema } from "@/lib/submit/validator";
import { convertToStyleTokens, convertToDesignStyle } from "@/lib/submit/converter";
import { validateStyleSubmissionManifest } from "@/lib/submit/manifest-validator";
import {
  isSupabaseConfigured,
  createSubmissionSupabase,
  hasActiveSubmissionSlugSupabase,
} from "@/lib/submit/reviewer-supabase";
import { hasActiveSubmissionSlug } from "@/lib/submit/reviewer";
import { getStyleBySlug } from "@/lib/styles";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  checkRateLimit,
  createRateLimitHeaders,
  getRequestClientKey,
} from "@/lib/security/rate-limit";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

const mockedWizardSchema = vi.mocked(wizardFormSchema);
const mockedConvertToStyleTokens = vi.mocked(convertToStyleTokens);
const mockedConvertToDesignStyle = vi.mocked(convertToDesignStyle);
const mockedValidateStyleSubmissionManifest = vi.mocked(validateStyleSubmissionManifest);
const mockedIsSupabaseConfigured = vi.mocked(isSupabaseConfigured);
const mockedCreateSubmissionSupabase = vi.mocked(createSubmissionSupabase);
const mockedHasActiveSubmissionSlugSupabase = vi.mocked(hasActiveSubmissionSlugSupabase);
const mockedHasActiveSubmissionSlug = vi.mocked(hasActiveSubmissionSlug);
const mockedGetStyleBySlug = vi.mocked(getStyleBySlug);
const mockedGetServerUser = vi.mocked(getServerUser);
const mockedCheckRateLimit = vi.mocked(checkRateLimit);
const mockedCreateRateLimitHeaders = vi.mocked(createRateLimitHeaders);
const mockedGetRequestClientKey = vi.mocked(getRequestClientKey);
const mockedVerifyTrustedOrigin = vi.mocked(verifyTrustedOrigin);
const mockedParseJsonBodyWithLimit = vi.mocked(parseJsonBodyWithLimit);

afterEach(() => {
  vi.clearAllMocks();
});

function buildValidFormData(slug: string = "neo-brutalist") {
  return {
    name: "Neo Brutalist",
    nameEn: "Neo Brutalist",
    slug,
    description: "High-contrast blocks for editorial-style UI systems.",
    category: "modern",
    styleType: "visual",
    tags: ["modern", "high-contrast"],
    primaryColor: "#111111",
    secondaryColor: "#ffffff",
    accentColors: ["#ff3b30"],
    background: "#ffffff",
    foreground: "#111111",
    muted: "#666666",
    keywords: ["brutalist", "high-contrast"],
    philosophy: "Function first with bold visual hierarchy.",
    headingFont: "Inter, sans-serif",
    bodyFont: "Inter, sans-serif",
    fontSizeBase: "1rem",
    fontSizeHeading: "2rem",
    fontSizeSmall: "0.875rem",
    fontWeightNormal: "400",
    fontWeightBold: "700",
    lineHeightNormal: "1.5",
    lineHeightTight: "1.25",
    borderRadius: "0.5rem",
    spacingSm: "0.5rem",
    spacingMd: "1rem",
    spacingLg: "2rem",
    doList: ["Use strong borders"],
    dontList: ["Avoid soft shadows"],
    aiRules: [
      "Keep high contrast between foreground and background.",
      "Prefer block-level layout primitives with clear spacing.",
      "Preserve consistent typography hierarchy.",
    ],
    buttonCode: "<button className='px-4 py-2 border-2 border-black'>Action</button>",
    cardCode: "<div className='p-4 border-2 border-black'><h3>Card</h3><p>Body</p></div>",
    inputCode: "<input className='px-3 py-2 border-2 border-black' placeholder='Type here' />",
    navCode: "<nav className='flex items-center justify-between border-b-2 border-black p-4'>Nav</nav>",
    heroCode: "<section className='border-2 border-black p-8'><h1>Hero</h1><p>Value prop</p></section>",
    footerCode:
      "<footer className='border-t-2 border-black p-4 text-sm'>Footer links and metadata</footer>",
  };
}

function mockValidSupabaseSubmissionPayload(slug: string = "neo-brutalist"): void {
  const formData = buildValidFormData(slug);
  mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
  mockedGetRequestClientKey.mockReturnValue("ip:test");
  mockedCheckRateLimit.mockReturnValue({
    allowed: true,
    limit: 15,
    remaining: 14,
    resetAt: Date.now() + 1_000,
    retryAfterSec: 0,
  });
  mockedParseJsonBodyWithLimit.mockResolvedValue({
    ok: true,
    data: formData,
  });
  mockedWizardSchema.safeParse.mockReturnValue({
    success: true,
    data: formData,
  } as never);
  mockedGetStyleBySlug.mockReturnValue(undefined);
  mockedConvertToStyleTokens.mockReturnValue({ tokens: true } as never);
  mockedConvertToDesignStyle.mockReturnValue({ design: true } as never);
  mockedIsSupabaseConfigured.mockReturnValue(true);
  mockedHasActiveSubmissionSlugSupabase.mockResolvedValue(false);
  mockedHasActiveSubmissionSlug.mockResolvedValue(false);
  mockedGetServerUser.mockResolvedValue({
    id: "user-1",
    user_metadata: { user_name: "anx" },
  } as never);
}

describe("POST /api/submit", () => {
  it("rejects untrusted origins", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({
      ok: false,
      error: "Cross-origin request denied",
      status: 403,
    });

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(403);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Cross-origin request denied",
    });
  });

  it("returns 429 when rate limit is exceeded", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:1");
    mockedCheckRateLimit.mockReturnValue({
      allowed: false,
      limit: 15,
      remaining: 0,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 60,
    });
    mockedCreateRateLimitHeaders.mockReturnValue({ "x-ratelimit-remaining": "0" });

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(429);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Too many submissions from this client. Please try again later.",
    });
  });

  it("requires authentication before accepting submission payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:auth");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue(null);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Sign in to submit styles",
    });
  });

  it("returns validation details for invalid payload", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:2");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: { slug: "" },
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: false,
      error: {
        flatten: () => ({ fieldErrors: { slug: ["Required"] } }),
      },
    } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Validation failed",
      details: { slug: ["Required"] },
    });
  });

  it("rejects submission when slug matches a built-in style", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:dup-static");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: buildValidFormData("apple-style"),
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: true,
      data: buildValidFormData("apple-style"),
    } as never);
    mockedGetStyleBySlug.mockReturnValue({ slug: "apple-style" } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "This slug is already used by a built-in style.",
    });
  });

  it("rejects submission when slug already exists in pending/approved queue", async () => {
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:dup-community");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: buildValidFormData("aurora-community"),
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: true,
      data: buildValidFormData("aurora-community"),
    } as never);
    mockedGetStyleBySlug.mockReturnValue(undefined);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedHasActiveSubmissionSlugSupabase.mockResolvedValue(true);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(409);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "This slug is already pending review or approved.",
    });
  });

  it("creates submission through Supabase when payload is valid", async () => {
    mockValidSupabaseSubmissionPayload("neo-brutalist");
    mockedCreateSubmissionSupabase.mockResolvedValue({
      id: "sub_1",
      slug: "neo-brutalist",
    } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(200);
    expect(mockedCreateSubmissionSupabase).toHaveBeenCalledWith(
      "neo-brutalist",
      expect.objectContaining({
        slug: "neo-brutalist",
        __author: {
          userId: "user-1",
          handle: "anx",
          avatarUrl: null,
          provider: "github",
        },
      }),
      { tokens: true },
      { design: true },
      null,
      "user-1",
      "anx",
      null,
      "github",
    );
    await expect(response.json()).resolves.toEqual({
      success: true,
      id: "sub_1",
      slug: "neo-brutalist",
    });
  });

  it("normalizes forwarded IPv4 address with port before Supabase insert", async () => {
    mockValidSupabaseSubmissionPayload("chaos-lab");
    mockedCreateSubmissionSupabase.mockResolvedValue({
      id: "sub_2",
      slug: "chaos-lab",
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/submit", {
        method: "POST",
        headers: {
          "x-forwarded-for": "127.0.0.1:7897, 10.0.0.2",
        },
      })
    );

    expect(response.status).toBe(200);
    expect(mockedCreateSubmissionSupabase.mock.calls.at(-1)?.[4]).toBe("127.0.0.1");
  });

  it("drops invalid forwarded IP values instead of crashing on inet insert", async () => {
    mockValidSupabaseSubmissionPayload("chaos-lab");
    mockedCreateSubmissionSupabase.mockResolvedValue({
      id: "sub_3",
      slug: "chaos-lab",
    } as never);

    const response = await POST(
      new Request("https://stylekit.top/api/submit", {
        method: "POST",
        headers: {
          "x-forwarded-for": "unknown",
        },
      })
    );

    expect(response.status).toBe(200);
    expect(mockedCreateSubmissionSupabase.mock.calls.at(-1)?.[4]).toBeNull();
  });

  it("returns schema mismatch diagnostics when submissions table is outdated", async () => {
    mockValidSupabaseSubmissionPayload("chaos-lab");
    mockedCreateSubmissionSupabase.mockRejectedValue(
      Object.assign(new Error("Insert failed: column user_id does not exist"), {
        code: "42703",
      }) as never
    );

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toEqual({
      success: false,
      code: "DB_SCHEMA_MISMATCH",
      error: "Submissions schema is outdated. Apply Supabase migration 003 (user binding).",
    });
  });

  it("rejects low-quality submissions with insufficient aiRules", async () => {
    const weakPayload = {
      ...buildValidFormData("weak-style"),
      aiRules: ["Only one rule"],
    };

    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:quality");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: weakPayload,
    });
    mockedWizardSchema.safeParse.mockReturnValue({
      success: true,
      data: weakPayload,
    } as never);
    mockedGetStyleBySlug.mockReturnValue(undefined);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedHasActiveSubmissionSlugSupabase.mockResolvedValue(false);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      success: false,
      error: "Submission quality validation failed",
      details: {
        aiRules: [
          "Provide at least 3 non-empty AI rules for consistent generation quality.",
        ],
      },
    });
  });

  it("accepts manifest payloads and persists coverSvg in submission form data", async () => {
    const manifestPayload = buildValidFormData("manifest-style");
    mockedVerifyTrustedOrigin.mockReturnValue({ ok: true });
    mockedGetRequestClientKey.mockReturnValue("ip:manifest");
    mockedCheckRateLimit.mockReturnValue({
      allowed: true,
      limit: 15,
      remaining: 14,
      resetAt: Date.now() + 1_000,
      retryAfterSec: 0,
    });
    mockedGetServerUser.mockResolvedValue({
      id: "user-1",
      user_metadata: { user_name: "anx" },
    } as never);
    mockedParseJsonBodyWithLimit.mockResolvedValue({
      ok: true,
      data: {
        manifest: {
          schemaVersion: "1.0.0",
        },
      },
    });
    mockedValidateStyleSubmissionManifest.mockReturnValue({
      ok: true,
      data: {
        formData: manifestPayload,
        assets: {
          coverSvg: "<svg viewBox='0 0 10 10'><rect width='10' height='10' /></svg>",
        },
      },
      issues: [],
    } as never);
    mockedGetStyleBySlug.mockReturnValue(undefined);
    mockedConvertToStyleTokens.mockReturnValue({ tokens: true } as never);
    mockedConvertToDesignStyle.mockReturnValue({ design: true } as never);
    mockedIsSupabaseConfigured.mockReturnValue(true);
    mockedHasActiveSubmissionSlugSupabase.mockResolvedValue(false);
    mockedCreateSubmissionSupabase.mockResolvedValue({
      id: "sub_manifest",
      slug: "manifest-style",
    } as never);

    const response = await POST(new Request("https://stylekit.top/api/submit", { method: "POST" }));

    expect(response.status).toBe(200);
    expect(mockedWizardSchema.safeParse).not.toHaveBeenCalled();
    expect(mockedCreateSubmissionSupabase).toHaveBeenCalledWith(
      "manifest-style",
      expect.objectContaining({
        slug: "manifest-style",
        __assets: {
          coverSvg: "<svg viewBox='0 0 10 10'><rect width='10' height='10' /></svg>",
        },
      }),
      { tokens: true },
      { design: true },
      null,
      "user-1",
      "anx",
      null,
      "github",
    );
  });
});
