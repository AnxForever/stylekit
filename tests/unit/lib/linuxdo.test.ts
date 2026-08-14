import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  exchangeCodeForToken,
  getLinuxDoUser,
  type LinuxDoUser,
} from "@/lib/auth/linuxdo";

function jsonResponse(body: unknown, init?: ResponseInit): Response {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
  });
}

function responseWithTrailingStreamError(
  body: string,
  error: Error,
): Response {
  const encoded = new TextEncoder().encode(body);
  let readCount = 0;
  const stream = new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        if (readCount === 0) {
          readCount += 1;
          controller.enqueue(encoded);
          return;
        }
        controller.error(error);
      },
    },
    { highWaterMark: 0 },
  );

  return new Response(stream, {
    status: 200,
    headers: {
      "content-type": "application/json",
      "x-deno-trace-id": "test-trace",
    },
  });
}

const linuxDoUser: LinuxDoUser = {
  id: 42,
  username: "tester",
  name: "Test User",
  avatar_url: "",
  email: null,
  active: true,
  trust_level: 2,
  silenced: false,
  api_key: "",
};

describe("LinuxDo OAuth transport", () => {
  const fetchMock = vi.fn<typeof fetch>();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("LINUXDO_CLIENT_ID", "client-id");
    vi.stubEnv("LINUXDO_CLIENT_SECRET", "client-secret");
    vi.stubEnv("LINUXDO_BASE_URL", "https://proxy.example/");
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("requests an uncompressed token response through the proxy", async () => {
    fetchMock.mockResolvedValue(
      jsonResponse({
        access_token: "access-token",
        token_type: "Bearer",
        expires_in: 3600,
      }),
    );

    await expect(
      exchangeCodeForToken(
        "authorization-code",
        "https://stylekit.top/api/auth/linuxdo/callback",
      ),
    ).resolves.toMatchObject({ access_token: "access-token" });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://proxy.example/oauth2/token");
    expect(new Headers(init?.headers).get("accept-encoding")).toBe("identity");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("recovers complete JSON when the proxy stream closes incorrectly", async () => {
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
    fetchMock.mockResolvedValue(
      responseWithTrailingStreamError(
        JSON.stringify({
          access_token: "recovered-token",
          token_type: "Bearer",
          expires_in: 3600,
        }),
        new TypeError("terminated"),
      ),
    );

    await expect(
      exchangeCodeForToken(
        "authorization-code",
        "https://stylekit.top/api/auth/linuxdo/callback",
      ),
    ).resolves.toMatchObject({ access_token: "recovered-token" });
    expect(warning).toHaveBeenCalledWith(
      expect.stringContaining("Recovered complete token-exchange JSON"),
      "terminated",
    );
  });

  it("does not accept truncated token JSON", async () => {
    fetchMock.mockResolvedValue(
      responseWithTrailingStreamError(
        '{"access_token":"partial',
        new TypeError("terminated"),
      ),
    );

    await expect(
      exchangeCodeForToken(
        "authorization-code",
        "https://stylekit.top/api/auth/linuxdo/callback",
      ),
    ).rejects.toThrow(
      "LinuxDo token-exchange failed: response stream failed: terminated",
    );
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("retries transient user profile fetch failures", async () => {
    fetchMock
      .mockRejectedValueOnce(new TypeError("fetch failed"))
      .mockResolvedValueOnce(jsonResponse(linuxDoUser));

    await expect(getLinuxDoUser("access-token")).resolves.toEqual(linuxDoUser);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("does not retry the one-time authorization code exchange", async () => {
    fetchMock.mockRejectedValue(new TypeError("fetch failed"));

    await expect(
      exchangeCodeForToken(
        "authorization-code",
        "https://stylekit.top/api/auth/linuxdo/callback",
      ),
    ).rejects.toThrow("LinuxDo token-exchange failed: fetch failed");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
