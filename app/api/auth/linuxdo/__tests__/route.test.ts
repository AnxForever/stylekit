import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/linuxdo", () => ({
  buildAuthorizationUrl: vi.fn(),
}));

import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";
import { GET } from "@/app/api/auth/linuxdo/route";

const mockedBuildAuthorizationUrl = vi.mocked(buildAuthorizationUrl);

describe("GET /api/auth/linuxdo", () => {
  it("sends an unguessable state nonce and mirrors it into an httpOnly cookie", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce(
      "https://connect.linux.do/oauth2/authorize?client_id=test"
    );

    const response = await GET(
      new Request("https://stylekit.top/api/auth/linuxdo?next=dashboard") as never
    );

    expect(response.status).toBe(307);
    expect(mockedBuildAuthorizationUrl).toHaveBeenCalledWith(
      "https://stylekit.top/api/auth/linuxdo/callback"
    );

    const location = new URL(response.headers.get("location") ?? "");
    const state = location.searchParams.get("state") ?? "";
    // A random nonce, never the redirect path — that is what makes the
    // callback able to reject flows it did not start.
    expect(state).toMatch(/^[0-9a-f]{64}$/);

    expect(response.cookies.get("stylekit-linuxdo-oauth-state")?.value).toBe(state);
    expect(response.cookies.get("stylekit-linuxdo-oauth-state")?.httpOnly).toBe(true);
    // `next=dashboard` has no leading slash, so it falls back to "/".
    expect(response.cookies.get("stylekit-linuxdo-oauth-next")?.value).toBe("%2F");
  });

  it("rejects a protocol-relative next path", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce(
      "https://connect.linux.do/oauth2/authorize?client_id=test"
    );

    const response = await GET(
      new Request("https://stylekit.top/api/auth/linuxdo?next=%2F%2Fevil.com") as never
    );

    expect(response.cookies.get("stylekit-linuxdo-oauth-next")?.value).toBe("%2F");
  });

  it("returns to login when auth url cannot be built", async () => {
    mockedBuildAuthorizationUrl.mockImplementationOnce(() => {
      throw new Error("missing credentials");
    });

    const response = await GET(
      new Request("https://stylekit.top/api/auth/linuxdo?next=%2Fprofile") as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://stylekit.top/login?auth_error=linuxdo&next=%2Fprofile"
    );
  });
});
