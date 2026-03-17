import { afterEach, describe, expect, it } from "vitest";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";

const ORIGINAL_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const ORIGINAL_TRUSTED_ORIGINS = process.env.CSRF_TRUSTED_ORIGINS;

afterEach(() => {
  if (ORIGINAL_BASE_URL === undefined) {
    delete process.env.NEXT_PUBLIC_BASE_URL;
  } else {
    process.env.NEXT_PUBLIC_BASE_URL = ORIGINAL_BASE_URL;
  }

  if (ORIGINAL_TRUSTED_ORIGINS === undefined) {
    delete process.env.CSRF_TRUSTED_ORIGINS;
  } else {
    process.env.CSRF_TRUSTED_ORIGINS = ORIGINAL_TRUSTED_ORIGINS;
  }
});

describe("verifyTrustedOrigin", () => {
  it("allows safe methods", () => {
    const request = new Request("https://stylekit.top/api/styles");
    expect(verifyTrustedOrigin(request)).toEqual({ ok: true });
  });

  it("allows same-origin POST requests", () => {
    const request = new Request("https://stylekit.top/api/submit", {
      method: "POST",
      headers: {
        origin: "https://stylekit.top",
      },
    });

    expect(verifyTrustedOrigin(request)).toEqual({ ok: true });
  });

  it("rejects cross-origin POST requests", () => {
    const request = new Request("https://stylekit.top/api/submit", {
      method: "POST",
      headers: {
        origin: "https://evil.example",
      },
    });

    expect(verifyTrustedOrigin(request)).toEqual({
      ok: false,
      status: 403,
      error: "Cross-origin request denied.",
    });
  });

  it("allows configured trusted origins", () => {
    process.env.CSRF_TRUSTED_ORIGINS = "https://admin.stylekit.top";
    const request = new Request("https://stylekit.top/api/submit", {
      method: "POST",
      headers: {
        origin: "https://admin.stylekit.top",
      },
    });

    expect(verifyTrustedOrigin(request)).toEqual({ ok: true });
  });

  it("rejects invalid origin header values", () => {
    const request = new Request("https://stylekit.top/api/submit", {
      method: "POST",
      headers: {
        origin: "not-a-valid-origin",
      },
    });

    expect(verifyTrustedOrigin(request)).toEqual({
      ok: false,
      status: 403,
      error: "Invalid request origin.",
    });
  });
});
