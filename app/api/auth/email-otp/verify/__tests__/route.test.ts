import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("next/headers", () => ({
  cookies: vi.fn(),
}));

vi.mock("@supabase/ssr", () => ({
  createServerClient: vi.fn(),
}));

vi.mock("@supabase/supabase-js", () => ({
  createClient: vi.fn(),
}));

vi.mock("@/lib/auth/email-otp", async () => {
  const actual = await vi.importActual<typeof import("@/lib/auth/email-otp")>(
    "@/lib/auth/email-otp",
  );
  return {
    ...actual,
    clearOtpCookie: vi.fn(),
    verifyOtpChallenge: vi.fn(),
  };
});

vi.mock("@/lib/auth/seq-id", () => ({
  getOrAssignSeqId: vi.fn(),
}));

import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { verifyOtpChallenge } from "@/lib/auth/email-otp";
import { getOrAssignSeqId } from "@/lib/auth/seq-id";
import { POST } from "@/app/api/auth/email-otp/verify/route";

const mockedCookies = vi.mocked(cookies);
const mockedCreateServerClient = vi.mocked(createServerClient);
const mockedCreateClient = vi.mocked(createClient);
const mockedVerifyOtpChallenge = vi.mocked(verifyOtpChallenge);
const mockedGetOrAssignSeqId = vi.mocked(getOrAssignSeqId);

describe("POST /api/auth/email-otp/verify", () => {
  beforeEach(() => {
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_URL", "https://example.supabase.co");
    vi.stubEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY", "anon");
    vi.stubEnv("SUPABASE_SERVICE_ROLE_KEY", "service");

    mockedCookies.mockResolvedValue({
      get: vi.fn().mockReturnValue({ value: "challenge" }),
      getAll: vi.fn().mockReturnValue([]),
      set: vi.fn(),
    } as unknown as Awaited<ReturnType<typeof cookies>>);
    mockedVerifyOtpChallenge.mockResolvedValue({ valid: true });
    mockedGetOrAssignSeqId.mockRejectedValue(new Error("not configured"));
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
  });

  it("reuses a Google account for email login and preserves its provider", async () => {
    const createUser = vi.fn().mockResolvedValue({
      data: { user: null },
      error: new Error("User already registered"),
    });
    const listUsers = vi.fn().mockResolvedValue({
      data: {
        users: [
          {
            id: "google-user-1",
            email: "Google.User@Example.COM",
            user_metadata: {
              provider: "google",
              full_name: "Google User",
            },
            app_metadata: { provider: "google" },
          },
        ],
      },
      error: null,
    });
    const updateUserById = vi.fn().mockResolvedValue({ error: null });
    const generateLink = vi.fn().mockResolvedValue({
      data: { properties: { hashed_token: "hashed-token" } },
      error: null,
    });
    mockedCreateClient.mockReturnValue({
      auth: { admin: { createUser, listUsers, updateUserById, generateLink } },
    } as unknown as ReturnType<typeof createClient>);

    const verifyOtp = vi.fn().mockResolvedValue({ error: null });
    mockedCreateServerClient.mockReturnValue({
      auth: { verifyOtp },
    } as unknown as ReturnType<typeof createServerClient>);

    const response = await POST(
      new Request("https://www.stylekit.top/api/auth/email-otp/verify", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email: "google.user@example.com", code: "123456" }),
      }),
    );

    expect(response.status).toBe(200);
    expect(listUsers).toHaveBeenCalledWith({ page: 1, perPage: 1000 });
    expect(updateUserById).toHaveBeenCalledWith(
      "google-user-1",
      expect.objectContaining({
        user_metadata: expect.objectContaining({
          provider: "google",
          full_name: "Google User",
          email_verified: true,
        }),
      }),
    );
    expect(generateLink).toHaveBeenCalledWith({
      type: "magiclink",
      email: "google.user@example.com",
    });
    expect(verifyOtp).toHaveBeenCalledWith({
      type: "magiclink",
      token_hash: "hashed-token",
    });
  });
});
