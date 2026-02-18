import { POST } from "@/app/api/style-extract/route";

function buildRequest(payload: unknown, origin?: string) {
  const headers: HeadersInit = { "content-type": "application/json" };
  if (origin) {
    headers.origin = origin;
  }

  return new Request("http://localhost/api/style-extract", {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
}

describe("POST /api/style-extract", () => {
  it("rejects cross-origin requests", async () => {
    const response = await POST(
      buildRequest({ url: "https://example.com" }, "https://evil.example")
    );
    expect(response.status).toBe(403);

    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("Cross-origin request denied");
  });

  it("rejects oversized request body", async () => {
    const response = await POST(
      buildRequest({
        url: "https://example.com",
        padding: "x".repeat(12_000),
      })
    );
    expect(response.status).toBe(413);

    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("too large");
  });

  it("rejects missing url", async () => {
    const response = await POST(buildRequest({}));
    expect(response.status).toBe(400);

    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("Missing required field");
  });

  it("rejects non-http protocols", async () => {
    const response = await POST(buildRequest({ url: "file:///tmp/demo.html" }));
    expect(response.status).toBe(400);

    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("Only http/https");
  });

  it("rejects local/private targets", async () => {
    const response = await POST(buildRequest({ url: "http://127.0.0.1:8080" }));
    expect(response.status).toBe(400);

    const body = (await response.json()) as { error?: string };
    expect(body.error).toContain("private network");
  });

  it("rejects redirects to local/private targets", async () => {
    const originalFetch = globalThis.fetch;

    const fetchMock = vi.fn().mockResolvedValueOnce(
      new Response(null, {
        status: 302,
        headers: {
          location: "http://127.0.0.1:8080",
        },
      })
    );

    (globalThis as unknown as { fetch: typeof fetch }).fetch =
      fetchMock as unknown as typeof fetch;

    try {
      const response = await POST(buildRequest({ url: "https://example.com" }));
      expect(response.status).toBe(400);

      const body = (await response.json()) as { error?: string };
      expect(body.error).toContain("private network");
    } finally {
      (globalThis as unknown as { fetch: typeof fetch }).fetch = originalFetch;
    }
  });
});
