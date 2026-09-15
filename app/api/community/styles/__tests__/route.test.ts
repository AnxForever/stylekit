import { beforeEach, describe, expect, it, vi } from "vitest";
const { listStyles } = vi.hoisted(() => ({ listStyles: vi.fn() }));
vi.mock("@/lib/styles/community-runtime", () => ({ listCommunityStylesMeta: listStyles }));
import { GET } from "@/app/api/community/styles/route";

beforeEach(() => vi.clearAllMocks());

describe("community catalog API availability", () => {
  it("keeps a truly empty catalog as a successful response", async () => {
    listStyles.mockResolvedValue([]);
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ total: 0, styles: [] });
  });

  it("returns a non-cacheable 503 rather than making an outage look like zero contributions", async () => {
    listStyles.mockRejectedValue(new Error("private database detail"));
    const response = await GET();
    expect(response.status).toBe(503);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    const body = await response.json();
    expect(body.error).toBe("Community styles are temporarily unavailable.");
    expect(body).not.toHaveProperty("styles");
  });
});
