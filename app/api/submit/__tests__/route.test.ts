import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/security/request-origin", () => ({
  verifyTrustedOrigin: vi.fn(() => ({ ok: true })),
}));

vi.mock("@/lib/auth/supabase-server", () => ({
  getServerUser: vi.fn(),
}));

vi.mock("@/lib/submit/reviewer-supabase", () => ({
  isSupabaseConfigured: vi.fn(() => true),
  createSubmissionSupabase: vi.fn(),
  hasActiveSubmissionSlugSupabase: vi.fn(async () => false),
}));

vi.mock("@/lib/submit/reviewer", () => ({
  hasActiveSubmissionSlug: vi.fn(async () => false),
}));

import { POST as submit } from "@/app/api/submit/route";
import { POST as validate } from "@/app/api/submit/validate/route";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  createSubmissionSupabase,
  hasActiveSubmissionSlugSupabase,
  isSupabaseConfigured,
} from "@/lib/submit/reviewer-supabase";

const mockedGetServerUser = vi.mocked(getServerUser);
const mockedCreate = vi.mocked(createSubmissionSupabase);
const mockedSlugTaken = vi.mocked(hasActiveSubmissionSlugSupabase);
const mockedConfigured = vi.mocked(isSupabaseConfigured);

function validManifest() {
  return {
    schemaVersion: "1.0.0",
    generatedAt: "2026-08-18T00:00:00.000Z",
    source: { assistant: "claude", model: "claude-opus-5" },
    formData: {
      name: "路由夹具",
      nameEn: "Route Fixture",
      slug: "route-fixture-style",
      description: "Fixture used by the submit route tests.",
      category: "modern",
      styleType: "visual",
      tags: ["glassmorphic"],
      primaryColor: "#1b1b1f",
      secondaryColor: "#ffffff",
      accentColors: ["#2563eb"],
      background: "#ffffff",
      foreground: "#1b1b1f",
      muted: "#71717a",
      keywords: ["fixture"],
      philosophy: "Restraint first.",
      headingFont: "font-semibold",
      bodyFont: "font-sans",
      fontSizeBase: "text-base",
      fontSizeHeading: "text-3xl",
      fontSizeSmall: "text-sm",
      fontWeightNormal: "400",
      fontWeightBold: "700",
      lineHeightNormal: "1.5",
      lineHeightTight: "1.2",
      borderRadius: "0.5rem",
      spacingSm: "0.5rem",
      spacingMd: "1rem",
      spacingLg: "2rem",
      doList: ["Keep surfaces flat"],
      dontList: ["No double shadows"],
      aiRules: [
        "Use bg-[#ffffff] for surfaces.",
        "Reserve #2563eb for one primary action.",
        "Keep radius at 0.5rem.",
      ],
      buttonCode:
        '<button className="inline-flex items-center rounded-[0.5rem] bg-[#2563eb] px-4 py-2 text-[#ffffff] font-medium">Continue</button>',
      cardCode:
        '<div className="rounded-[0.5rem] border border-[#1b1b1f] bg-[#ffffff] p-4"><h3 className="text-base">Card</h3></div>',
      inputCode:
        '<input className="w-full rounded-[0.5rem] border border-[#71717a] bg-[#ffffff] px-3 py-2" placeholder="Email address" />',
    },
    assets: {
      coverSvg:
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#ffffff"/></svg>',
    },
    selfCheck: {
      schemaValid: true,
      requiredFilesPrepared: ["manifest.json", "cover.svg"],
      componentCoverage: ["buttonCode", "cardCode", "inputCode"],
      notes: "ok",
    },
  };
}

function post(url: string, body: unknown) {
  return new Request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

beforeEach(() => {
  mockedConfigured.mockReturnValue(true);
  mockedSlugTaken.mockResolvedValue(false);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/submit/validate", () => {
  it("returns a gate report without writing anything", async () => {
    const response = await validate(
      post("https://stylekit.top/api/submit/validate", { manifest: validManifest() }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.report.accepted).toBe(true);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("accepts a bare manifest, not just a wrapped one", async () => {
    const response = await validate(
      post("https://stylekit.top/api/submit/validate", validManifest()),
    );
    await expect(response.json()).resolves.toMatchObject({
      report: { accepted: true },
    });
  });

  it("requires no sign-in", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await validate(
      post("https://stylekit.top/api/submit/validate", { manifest: validManifest() }),
    );
    expect(response.status).toBe(200);
  });

  it("reports a slug already in flight", async () => {
    mockedSlugTaken.mockResolvedValue(true);
    const response = await validate(
      post("https://stylekit.top/api/submit/validate", { manifest: validManifest() }),
    );
    const payload = await response.json();

    expect(payload.report.accepted).toBe(false);
    expect(
      payload.report.gates.find((g: { id: string }) => g.id === "slug-available").passed,
    ).toBe(false);
  });

  it("rejects unparseable JSON", async () => {
    const response = await validate(
      new Request("https://stylekit.top/api/submit/validate", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: "{ not json",
      }),
    );
    expect(response.status).toBe(400);
  });
});

describe("POST /api/submit", () => {
  const signedIn = {
    id: "user-1",
    user_metadata: { user_name: "darling", avatar_url: "https://x/y.png" },
    app_metadata: { provider: "linuxdo" },
  };

  it("requires sign-in", async () => {
    mockedGetServerUser.mockResolvedValue(null);
    const response = await submit(
      post("https://stylekit.top/api/submit", {
        manifest: validManifest(),
        acceptedTerms: true,
      }),
    );

    expect(response.status).toBe(401);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("requires the contribution terms to be accepted", async () => {
    mockedGetServerUser.mockResolvedValue(signedIn as never);
    const response = await submit(
      post("https://stylekit.top/api/submit", { manifest: validManifest() }),
    );

    expect(response.status).toBe(400);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("refuses a manifest that fails a blocking gate", async () => {
    mockedGetServerUser.mockResolvedValue(signedIn as never);
    const manifest = validManifest();
    manifest.formData.inputCode = "<input />";

    const response = await submit(
      post("https://stylekit.top/api/submit", { manifest, acceptedTerms: true }),
    );
    const payload = await response.json();

    expect(response.status).toBe(422);
    expect(payload.failures.map((f: { id: string }) => f.id)).toContain("core-components");
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("re-runs the gates server-side even when the client skipped validate", async () => {
    mockedGetServerUser.mockResolvedValue(signedIn as never);
    const manifest = validManifest();
    manifest.formData.buttonCode += '<script>fetch("/x")</script>';

    const response = await submit(
      post("https://stylekit.top/api/submit", { manifest, acceptedTerms: true }),
    );

    expect(response.status).toBe(422);
    expect(mockedCreate).not.toHaveBeenCalled();
  });

  it("stores an accepted submission with author attribution", async () => {
    mockedGetServerUser.mockResolvedValue(signedIn as never);
    mockedCreate.mockResolvedValue({ id: "sub-1", slug: "route-fixture-style" });

    const response = await submit(
      post("https://stylekit.top/api/submit", {
        manifest: validManifest(),
        acceptedTerms: true,
      }),
    );
    const payload = await response.json();

    expect(response.status).toBe(200);
    expect(payload.submission).toEqual({ id: "sub-1", slug: "route-fixture-style" });

    const [slug, formData, tokens, designStyle, , userId, authorName] =
      mockedCreate.mock.calls[0];
    expect(slug).toBe("route-fixture-style");
    expect(userId).toBe("user-1");
    expect(authorName).toBe("darling");
    // Tokens and a renderable style are projected at intake so the community
    // layer never has to re-derive them from raw form fields.
    expect(tokens).toHaveProperty("colors.text.primary", "text-[#1b1b1f]");
    expect(designStyle).toHaveProperty("components.button.code");
    expect(formData).toHaveProperty("__gateReport.accepted", true);
  });

  it("reports a database that is not configured", async () => {
    mockedGetServerUser.mockResolvedValue(signedIn as never);
    mockedConfigured.mockReturnValue(false);

    const response = await submit(
      post("https://stylekit.top/api/submit", {
        manifest: validManifest(),
        acceptedTerms: true,
      }),
    );
    expect(response.status).toBe(503);
  });
});
