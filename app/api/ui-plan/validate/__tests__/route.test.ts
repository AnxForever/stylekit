import { POST } from "@/app/api/ui-plan/validate/route";

describe("POST /api/ui-plan/validate", () => {
  it("rejects cross-origin requests", async () => {
    const response = await POST(
      new Request("http://localhost/api/ui-plan/validate", {
        method: "POST",
        headers: {
          origin: "https://evil.example",
          "content-type": "application/json",
        },
        body: JSON.stringify({}),
      })
    );

    expect(response.status).toBe(403);
    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("Cross-origin request denied");
  });

  it("rejects oversized request body", async () => {
    const response = await POST(
      new Request("http://localhost/api/ui-plan/validate", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ padding: "x".repeat(300_000) }),
      })
    );

    expect(response.status).toBe(413);
    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("too large");
  });
});
