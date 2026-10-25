import { describe, expect, it } from "vitest";
import { canonicalRequiredClass, lintStyleCode } from "@/lib/styles/style-linter";

/**
 * The curated required rules and the canonical recipes spell the same look
 * differently (shadow-[4px_4px_0_#000] vs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).
 * A class must not be reported missing over its spelling.
 */
describe("canonical required-class matching", () => {
  it("treats equivalent arbitrary-value spellings as the same class", () => {
    expect(canonicalRequiredClass("shadow-[4px_4px_0_#000]"))
      .toBe(canonicalRequiredClass("shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"));
    expect(canonicalRequiredClass("bg-[#FFFFFF]/20")).toBe(canonicalRequiredClass("bg-[#ffffff]/20"));
    expect(canonicalRequiredClass("text-[rgb(255_0_0)]")).toBe(canonicalRequiredClass("text-[#ff0000]"));
    expect(canonicalRequiredClass("bg-[#00000000]")).toBe(canonicalRequiredClass("bg-[rgba(0,0,0,0)]"));
  });

  it("keeps different values different", () => {
    expect(canonicalRequiredClass("shadow-[4px_4px_0_#000]"))
      .not.toBe(canonicalRequiredClass("shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"));
    expect(canonicalRequiredClass("bg-white/10")).not.toBe(canonicalRequiredClass("bg-white/15"));
    expect(canonicalRequiredClass("shadow-[4px_4px_0_#000]"))
      .not.toBe(canonicalRequiredClass("shadow-[4px_4px_0_#fff]"));
  });

  it("stops reporting a required class the code spells differently", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      `<button class="rounded-none border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold uppercase">Hi</button>`,
      { checkRequired: ["button"] },
    );
    const missing = report.missingRequired.flatMap((entry) => entry.missing);
    expect(missing).not.toContain("shadow-[4px_4px_0_#000]");
    // Truly absent classes are still reported.
    expect(missing).toContain("hover:shadow-none");
  });

  it("still reports the class when the value genuinely differs", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      `<button class="rounded-none border-2 border-black shadow-[6px_6px_0_#000] font-bold uppercase">Hi</button>`,
      { checkRequired: ["button"] },
    );
    expect(report.missingRequired.flatMap((entry) => entry.missing)).toContain("shadow-[4px_4px_0_#000]");
  });
});
