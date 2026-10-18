import { describe, expect, it } from "vitest";

import { POST as repair } from "@/app/api/styles/[slug]/repair/route";

const params = (slug: string) => Promise.resolve({ slug });

function request(body: unknown, slug = "neo-brutalist") {
  return new Request(`https://stylekit.top/api/styles/${slug}/repair`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://stylekit.top" },
    body: JSON.stringify(body),
  });
}

describe("styles [slug] repair route", () => {
  it("returns 404 for a style that does not exist", async () => {
    const response = await repair(request({ code: '<div className="p-4" />' }, "not-exist"), {
      params: params("not-exist"),
    });

    expect(response.status).toBe(404);
  });

  it("returns the repaired source and what it changed", async () => {
    const response = await repair(request({ code: '<div className="rounded-lg" />' }), {
      params: params("neo-brutalist"),
    });
    expect(response.status).toBe(200);

    const body = (await response.json()) as {
      code: string;
      edits: Array<{ from: string; to: string }>;
      before: { status: string };
      report: { status: string; violations: unknown[] };
    };
    expect(body.code).toBe('<div className="rounded-none" />');
    expect(body.edits).toEqual([{ from: "rounded-lg", to: "rounded-none", line: 1 }]);
    expect(body.before.status).toBe("fail");
    expect(body.report.violations).toHaveLength(0);
  });

  it("rejects a body without code", async () => {
    const response = await repair(request({}), { params: params("neo-brutalist") });

    expect(response.status).toBe(400);
  });

  it("rejects requests from an untrusted origin", async () => {
    const response = await repair(
      new Request("https://stylekit.top/api/styles/neo-brutalist/repair", {
        method: "POST",
        headers: { "content-type": "application/json", origin: "https://evil.example" },
        body: JSON.stringify({ code: '<div className="p-4" />' }),
      }),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(403);
  });
});
