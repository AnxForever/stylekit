import { describe, expect, it } from "vitest";

import { checkCode, verdictLine, ComplianceError } from "../compliance/index";

describe("compliance check", () => {
  it("flags violations with fixes", () => {
    const report = checkCode({
      slug: "neo-brutalist",
      code: '<button className="rounded-xl bg-gradient-to-r shadow-lg">Buy</button>',
    });

    expect(report.ok).toBe(false);
    expect(report.violations.length).toBeGreaterThan(0);
    expect(report.violations.some((v) => v.className === "rounded-xl")).toBe(true);
    expect(report.violations.some((v) => v.fix)).toBe(true);
  });

  it("passes compliant code", () => {
    const report = checkCode({
      slug: "neo-brutalist",
      code: '<button className="bg-white text-black border-2 border-black shadow-[4px_4px_0_#000]">Buy</button>',
    });

    expect(report.ok).toBe(true);
    expect(report.violations).toEqual([]);
  });

  it("rejects an unknown slug before linting", () => {
    expect(() =>
      checkCode({ slug: "not-a-style", code: '<div className="x">y</div>' }),
    ).toThrow(ComplianceError);
  });

  it("writes a useful verdict line", () => {
    const bad = checkCode({
      slug: "neo-brutalist",
      code: '<button className="rounded-xl">Buy</button>',
    });
    expect(verdictLine(bad)).toContain("错误");

    const good = checkCode({
      slug: "neo-brutalist",
      code: '<button className="bg-white">Buy</button>',
    });
    expect(verdictLine(good)).toContain("通过");
  });
});
