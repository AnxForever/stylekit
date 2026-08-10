import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/linuxdo", () => ({
  buildAuthorizationUrl: vi.fn(),
}));

import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";
import { GET } from "@/app/api/auth/linuxdo/route";

const mockedBuildAuthorizationUrl = vi.mocked(buildAuthorizationUrl);

describe("GET /api/auth/linuxdo", () => {
  it("stores the post-login path in oauth state", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce(
      "https://connect.linux.do/oauth2/authorize?client_id=test"
    );

    const response = await GET(
      new Request("https://stylekit.top/api/auth/linuxdo?next=dashboard") as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://connect.linux.do/oauth2/authorize?client_id=test&state=%2F"
    );
    expect(mockedBuildAuthorizationUrl).toHaveBeenCalledWith(
      "https://stylekit.top/api/auth/linuxdo/callback"
    );
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
