import { describe, expect, it } from "vitest";

import { repairCodeWithRules, repairStyleCode } from "@/lib/styles/style-repair";
import { lintStyleCode, mergeRulesFromTokens } from "@/lib/styles/style-linter";

describe("repairStyleCode", () => {
  it("rewrites a forbidden class to the style's own replacement", () => {
    const result = repairStyleCode("neo-brutalist", '<div className="rounded-lg p-4">x</div>');

    expect(result.code).toBe('<div className="rounded-none p-4">x</div>');
    expect(result.edits).toEqual([{ from: "rounded-lg", to: "rounded-none", line: 1 }]);
    expect(result.before.status).toBe("fail");
    expect(result.report.status).toBe("pass");
  });

  it("keeps the variant prefix on the replacement", () => {
    const result = repairStyleCode("neo-brutalist", '<a className="hover:rounded-md" />');

    expect(result.code).toBe('<a className="hover:rounded-none" />');
  });

  it("applies a multi-class replacement without duplicating shared classes", () => {
    const result = repairStyleCode("glassmorphism", '<div className="bg-black/80 border-2" />');

    // Whole tokens: the surrounding class attribute also mentions "border" in
    // "glassmorphism-ish" prose, so only the class list is counted.
    const classes = result.code.match(/className="([^"]*)"/)?.[1].split(/\s+/) ?? [];
    expect(classes).toContain("border");
    expect(classes).toContain("border-white/15");
    expect(classes.filter((token) => token === "border")).toHaveLength(1);
  });

  it("rewrites every occurrence of the same class", () => {
    const code = '<div className="rounded-lg" /><span className="rounded-lg" />';
    const result = repairStyleCode("neo-brutalist", code);

    expect(result.code).not.toContain("rounded-lg");
    expect(result.report.violations).toHaveLength(0);
  });

  it("rewrites string literals inside expressions but leaves variables alone", () => {
    const code = '<div className={cn("rounded-lg", active && styles.card)} />';
    const result = repairStyleCode("neo-brutalist", code);

    expect(result.code).toBe('<div className={cn("rounded-none", active && styles.card)} />');
  });

  it("rewrites nested call expressions", () => {
    const code = '<div className={cn(outer("rounded-lg"), styles.x)} />';
    const result = repairStyleCode("neo-brutalist", code);

    expect(result.code).toBe('<div className={cn(outer("rounded-none"), styles.x)} />');
  });

  it("leaves code with no violations byte-identical", () => {
    const code = '<section className="rounded-none border-2">ok</section>';
    const result = repairStyleCode("neo-brutalist", code);

    expect(result.code).toBe(code);
    expect(result.edits).toEqual([]);
  });

  it("reports a violation it cannot rewrite instead of guessing", () => {
    const rules = mergeRulesFromTokens(
      {
        colors: { primary: "#000000", secondary: "#111111", background: { primary: "#ffffff" }, text: { primary: "#000000" } },
        border: { radius: "rounded-none", width: "border", color: "border-black" },
        shadow: { md: "shadow-none" },
        spacing: { card: "p-4" },
        interaction: { transition: "transition-none" },
        forbidden: { classes: ["opacity-50"], patterns: [], reasons: { "opacity-50": "no transparency" } },
        required: { button: "", card: "", input: "" },
      } as never,
      undefined,
    );

    const result = repairCodeWithRules("probe", '<div className="opacity-50" />', rules);

    expect(result.edits).toEqual([]);
    expect(result.code).toBe('<div className="opacity-50" />');
    expect(result.unfixed).toEqual([
      { className: "opacity-50", line: 1, reason: "no transparency" },
    ]);
  });

  it("agrees with the linter about the repaired code", () => {
    const before = lintStyleCode("corporate-clean", '<div className="rounded-full shadow-2xl" />');
    expect(before.status).toBe("fail");

    const after = repairStyleCode("corporate-clean", '<div className="rounded-full shadow-2xl" />');
    expect(after.report.violations).toHaveLength(0);
  });
});
