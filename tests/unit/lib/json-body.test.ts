import { describe, expect, it } from "vitest";
import { parseJsonBodyWithLimit } from "@/lib/security/json-body";

describe("parseJsonBodyWithLimit", () => {
  it("parses valid JSON within size limit", async () => {
    const request = new Request("https://stylekit.top/api/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ok: true }),
    });

    const result = await parseJsonBodyWithLimit<{ ok: boolean }>(request, {
      maxBytes: 128,
    });

    expect(result).toEqual({ ok: true, data: { ok: true } });
  });

  it("rejects invalid JSON payload", async () => {
    const request = new Request("https://stylekit.top/api/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: "{invalid",
    });

    const result = await parseJsonBodyWithLimit(request, {
      invalidJsonMessage: "Invalid payload",
    });

    expect(result).toEqual({ ok: false, status: 400, error: "Invalid payload" });
  });

  it("rejects payload by content-length header before reading body", async () => {
    const request = new Request("https://stylekit.top/api/test", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "content-length": "9999",
      },
      body: JSON.stringify({ ok: true }),
    });

    const result = await parseJsonBodyWithLimit(request, {
      maxBytes: 100,
      tooLargeMessage: "Too large",
    });

    expect(result).toEqual({ ok: false, status: 413, error: "Too large" });
  });

  it("rejects payload when actual size exceeds limit", async () => {
    const request = new Request("https://stylekit.top/api/test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text: "a".repeat(500) }),
    });

    const result = await parseJsonBodyWithLimit(request, { maxBytes: 100 });
    expect(result).toEqual({
      ok: false,
      status: 413,
      error: "Request body too large.",
    });
  });
});
