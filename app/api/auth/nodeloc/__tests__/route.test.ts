import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/nodeloc", () => ({
  buildAuthorizationUrl: vi.fn(),
}));

import { buildAuthorizationUrl } from "@/lib/auth/nodeloc";
import {
  GET,
  NODELOC_NEXT_COOKIE,
  NODELOC_STATE_COOKIE,
} from "@/app/api/auth/nodeloc/route";

const mockedBuildAuthorizationUrl = vi.mocked(buildAuthorizationUrl);

describe("GET /api/auth/nodeloc", () => {
  it("creates a random state and stores the safe next path in HttpOnly cookies", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce(
      "https://www.nodeloc.com/oauth-provider/authorize?client_id=test",
    );

    const response = await GET(
      new Request("https://stylekit.top/api/auth/nodeloc?next=%2Fprofile") as never,
    );

    expect(response.status).toBe(307);
    expect(mockedBuildAuthorizationUrl).toHaveBeenCalledWith(
      "https://stylekit.top/api/auth/nodeloc/callback",
      expect.stringMatching(/^[a-f0-9]{64}$/),
    );
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(NODELOC_STATE_COOKIE);
    expect(setCookie).toContain(NODELOC_NEXT_COOKIE);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Path=/api/auth/nodeloc/callback");
  });

  it("falls back to styles instead of accepting an open redirect", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce("https://nodeloc.test/authorize");

    const response = await GET(
      new Request("https://stylekit.top/api/auth/nodeloc?next=%2F%2Fevil.example") as never,
    );

    expect(mockedBuildAuthorizationUrl).toHaveBeenCalledWith(
      "https://stylekit.top/api/auth/nodeloc/callback",
      expect.any(String),
    );
    const setCookie = response.headers.get("set-cookie") ?? "";
    expect(setCookie).toContain(`${NODELOC_NEXT_COOKIE}=%252Fstyles`);
  });
});
