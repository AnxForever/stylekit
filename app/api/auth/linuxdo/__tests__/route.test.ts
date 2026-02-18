import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/auth/linuxdo", () => ({
  buildAuthorizationUrl: vi.fn(),
}));

import { buildAuthorizationUrl } from "@/lib/auth/linuxdo";
import { GET } from "@/app/api/auth/linuxdo/route";

const mockedBuildAuthorizationUrl = vi.mocked(buildAuthorizationUrl);

describe("GET /api/auth/linuxdo", () => {
  it("sanitizes invalid next values to root path", async () => {
    mockedBuildAuthorizationUrl.mockReturnValueOnce(
      "https://connect.linux.do/oauth2/authorize?state=test"
    );

    const response = await GET(
      new Request("https://www.stylekit.top/api/auth/linuxdo?next=dashboard") as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe(
      "https://connect.linux.do/oauth2/authorize?state=test"
    );
    expect(mockedBuildAuthorizationUrl).toHaveBeenCalledWith(
      "https://www.stylekit.top/api/auth/linuxdo/callback?next=%2F"
    );
  });

  it("falls back to home when auth url cannot be built", async () => {
    mockedBuildAuthorizationUrl.mockImplementationOnce(() => {
      throw new Error("missing credentials");
    });

    const response = await GET(
      new Request("https://www.stylekit.top/api/auth/linuxdo?next=%2Fprofile") as never
    );

    expect(response.status).toBe(307);
    expect(response.headers.get("location")).toBe("https://www.stylekit.top/");
  });
});
