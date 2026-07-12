import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/avatar/route";

describe("GET /api/avatar", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("rejects missing avatar urls", async () => {
    const response = await GET(
      new Request("https://stylekit.top/api/avatar") as never
    );

    expect(response.status).toBe(400);
    expect(await response.text()).toBe("Missing avatar url");
  });

  it("rejects disallowed hosts", async () => {
    const response = await GET(
      new Request(
        "https://stylekit.top/api/avatar?url=https%3A%2F%2Fexample.com%2Favatar.png"
      ) as never
    );

    expect(response.status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("proxies allowed avatar images", async () => {
    fetchMock.mockResolvedValue(
      new Response("avatar-binary", {
        status: 200,
        headers: {
          "content-type": "image/png",
          "content-length": "13",
        },
      })
    );

    const response = await GET(
      new Request(
        "https://stylekit.top/api/avatar?url=https%3A%2F%2Favatars.githubusercontent.com%2Fu%2F1%3Fv%3D4"
      ) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe(
      "public, max-age=86400, stale-while-revalidate=604800"
    );
    expect(await response.text()).toBe("avatar-binary");
    expect(fetchMock).toHaveBeenCalledWith(
      new URL("https://avatars.githubusercontent.com/u/1?v=4"),
      expect.objectContaining({
        headers: expect.objectContaining({
          "User-Agent": "StyleKitAvatarProxy/1.0",
        }),
      })
    );
  });

  it("proxies Linux DO CDN avatars", async () => {
    fetchMock.mockResolvedValue(
      new Response("linuxdo-avatar", {
        status: 200,
        headers: { "content-type": "image/jpeg" },
      })
    );

    const response = await GET(
      new Request(
        "https://stylekit.top/api/avatar?url=https%3A%2F%2Fcdn.ldstatic.com%2Fuser_avatar%2Flinux.do%2Fanxforever%2F288%2F1837622_2.png"
      ) as never
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/jpeg");
  });
});
