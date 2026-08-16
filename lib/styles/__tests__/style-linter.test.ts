import { describe, expect, it } from "vitest";

import { knownSlug } from "@/lib/discovery";
import { getStylesWithLintRules } from "@/lib/styles/lint-rules";
import {
  extractClassNames,
  hasLintableRules,
  lintStyleCode,
  mergeStyleRules,
  stripVariants,
} from "@/lib/styles/style-linter";

describe("lint-rules registry integrity", () => {
  it("only carries rules for styles that actually exist", () => {
    // Guard: `neubrutalism` and `minimalism` used to sit here pointing at slugs
    // the registry never had, so their rules could never fire.
    const dead = getStylesWithLintRules().filter((slug) => !knownSlug(slug));
    expect(dead).toEqual([]);
  });
});

describe("stripVariants", () => {
  it("strips single and stacked variant prefixes", () => {
    expect(stripVariants("dark:shadow-lg")).toBe("shadow-lg");
    expect(stripVariants("md:hover:rounded-full")).toBe("rounded-full");
  });

  it("keeps colons inside bracketed variants", () => {
    expect(stripVariants("data-[state=open]:bg-red-500")).toBe("bg-red-500");
    expect(stripVariants("[&>*]:p-4")).toBe("p-4");
  });

  it("drops the important prefix but preserves opacity and negatives", () => {
    expect(stripVariants("!p-4")).toBe("p-4");
    // bg-white and bg-white/50 are different rules to a style, so opacity stays.
    expect(stripVariants("bg-white/50")).toBe("bg-white/50");
    expect(stripVariants("-mt-4")).toBe("-mt-4");
  });

  it("leaves bare utilities untouched", () => {
    expect(stripVariants("p-4")).toBe("p-4");
    expect(stripVariants("shadow-[4px_4px_0_#000]")).toBe("shadow-[4px_4px_0_#000]");
  });
});

describe("extractClassNames", () => {
  it("reads a plain className attribute", () => {
    const found = extractClassNames('<div className="p-4 bg-white" />');
    expect(found.map((f) => f.raw)).toEqual(["p-4", "bg-white"]);
  });

  it("reads the HTML class attribute", () => {
    const found = extractClassNames('<div class="p-4 rounded-none" />');
    expect(found.map((f) => f.raw)).toEqual(["p-4", "rounded-none"]);
  });

  it("reads classes out of cn()/clsx() helper calls", () => {
    const code = '<button className={cn("rounded-full", isActive && "shadow-lg")} />';
    expect(extractClassNames(code).map((f) => f.raw)).toEqual([
      "rounded-full",
      "shadow-lg",
    ]);
  });

  it("reads template literals and drops interpolations", () => {
    const code = "<span className={`text-sm ${dynamic} backdrop-blur`} />";
    expect(extractClassNames(code).map((f) => f.raw)).toEqual([
      "text-sm",
      "backdrop-blur",
    ]);
  });

  it("keeps tokens separated across an interpolation boundary", () => {
    const code = "<span className={`p-2${gap}m-2`} />";
    const raws = extractClassNames(code).map((f) => f.raw);
    expect(raws).toContain("p-2");
    expect(raws).toContain("m-2");
    expect(raws).not.toContain("p-2m-2");
  });

  it("skips values it cannot resolve statically instead of guessing", () => {
    expect(extractClassNames("<i className={styles.icon} />")).toEqual([]);
    expect(extractClassNames("<i className={clsx(base)} />")).toEqual([]);
  });

  it("ignores strings outside class attributes", () => {
    const code = 'const label = "shadow-lg"; return <div className="p-4" />;';
    expect(extractClassNames(code).map((f) => f.raw)).toEqual(["p-4"]);
  });

  it("reports 1-indexed line numbers", () => {
    const code = ['<div', '  className="p-4', '    shadow-lg"', "/>"].join("\n");
    const found = extractClassNames(code);
    expect(found.find((f) => f.raw === "p-4")?.line).toBe(2);
    expect(found.find((f) => f.raw === "shadow-lg")?.line).toBe(3);
  });

  it("handles multiple attributes in one file", () => {
    const code = '<div className="p-4"><b className="m-2" /></div>';
    expect(extractClassNames(code).map((f) => f.raw)).toEqual(["p-4", "m-2"]);
  });
});

describe("mergeStyleRules", () => {
  it("unions both rule sources for a curated style", () => {
    const merged = mergeStyleRules("neo-brutalist");
    expect(merged.sources).toContain("curated");
    expect(merged.sources).toContain("tokens");
    expect(merged.forbiddenClasses.size).toBeGreaterThan(0);
  });

  it("prefers the hand-written curated reason on overlap", () => {
    const merged = mergeStyleRules("neo-brutalist");
    const entry = merged.forbiddenClasses.get("rounded-lg");
    expect(entry?.source).toBe("curated");
  });

  it("splits multi-class required entries into individual classes", () => {
    const merged = mergeStyleRules("neo-brutalist");
    const button = merged.required.get("button");
    // Source entry is "border-2 border-black" as one string.
    expect(button?.classes).toContain("border-2");
    expect(button?.classes).toContain("border-black");
  });

  it("still returns token rules for styles without curated rules", () => {
    const merged = mergeStyleRules("bauhaus");
    expect(merged.sources).toEqual(["tokens"]);
  });

  it("returns an empty rule set for an unknown slug", () => {
    const merged = mergeStyleRules("definitely-not-a-style");
    expect(merged.sources).toEqual([]);
    expect(merged.forbiddenClasses.size).toBe(0);
  });
});

describe("lintStyleCode", () => {
  it("flags a forbidden class with a reason", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="rounded-lg" />',
    );
    expect(report.ok).toBe(false);
    expect(report.violations).toHaveLength(1);
    expect(report.violations[0].baseClassName).toBe("rounded-lg");
    expect(report.violations[0].reason).toMatch(/sharp corners/i);
  });

  it("suggests a concrete fix", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="shadow-lg" />',
    );
    expect(report.violations[0].fix).toBeTruthy();
  });

  it("never echoes the reason back as the fix", () => {
    // The reason is already rendered next to the violation; repeating it as the
    // fix is noise. A fix must be a real class value or absent.
    const report = lintStyleCode(
      "glassmorphism",
      '<div className="rounded-none bg-white shadow-none border-4" />',
    );
    expect(report.violations.length).toBeGreaterThan(0);
    for (const violation of report.violations) {
      if (violation.fix) expect(violation.fix).not.toBe(violation.reason);
    }
  });

  it("catches a forbidden utility hidden behind a variant prefix", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="dark:rounded-lg" />',
    );
    expect(report.ok).toBe(false);
    expect(report.violations[0].className).toBe("dark:rounded-lg");
    expect(report.violations[0].baseClassName).toBe("rounded-lg");
  });

  it("accepts classes the style explicitly requires", () => {
    // neo-brutalist requires hard offset shadows and square corners.
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="rounded-none shadow-[4px_4px_0_#000] border-2 border-black" />',
    );
    expect(report.violations).toEqual([]);
  });

  it("does not misfire on ordinary responsive utilities", () => {
    // Regression guard: `hidden md:block` is a normal responsive pattern and
    // must never be reported. Breaking this exact case previously took a
    // preview pane down in production.
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="hidden md:block p-4 flex items-center" />',
    );
    expect(report.violations).toEqual([]);
  });

  it("never reports a class the style itself requires", () => {
    // neo-brutalist lists `transition-all` as forbidden, yet its own
    // required.button is "transition-all duration-200". The requirement wins,
    // otherwise the linter fires on the style's own canonical showcase.
    const report = lintStyleCode(
      "neo-brutalist",
      '<div className="transition-all" />',
    );
    expect(report.violations).toEqual([]);
  });

  it("still reports genuinely forbidden classes after exemptions", () => {
    // Guard against the exemption swallowing real violations.
    const report = lintStyleCode("neo-brutalist", '<div className="rounded-xl" />');
    expect(report.violations).toHaveLength(1);
  });

  it("reports missing required classes only when asked", () => {
    const code = '<button className="px-4" />';
    expect(lintStyleCode("neo-brutalist", code).missingRequired).toEqual([]);

    const checked = lintStyleCode("neo-brutalist", code, {
      checkRequired: ["button"],
    });
    expect(checked.missingRequired[0]?.component).toBe("button");
    expect(checked.missingRequired[0]?.missing).toContain("border-black");
  });

  it("treats a satisfied requirement as satisfied", () => {
    const report = lintStyleCode(
      "neo-brutalist",
      '<button className="border-2 border-black shadow-[4px_4px_0_#000] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all duration-200 cursor-pointer" />',
      { checkRequired: ["button"] },
    );
    expect(report.missingRequired).toEqual([]);
  });

  it("returns a clean report for an unknown slug rather than throwing", () => {
    const report = lintStyleCode("definitely-not-a-style", '<div className="rounded-lg" />');
    expect(report.ok).toBe(true);
    expect(report.ruleSources).toEqual([]);
  });

  it("counts the classes it actually checked", () => {
    const report = lintStyleCode("neo-brutalist", '<div className="p-4 m-2 flex" />');
    expect(report.checkedClasses).toBe(3);
  });

  it("reports the line a violation sits on", () => {
    const code = ["<div", '  className="p-4', '    rounded-lg"', "/>"].join("\n");
    const report = lintStyleCode("neo-brutalist", code);
    expect(report.violations[0].line).toBe(3);
  });
});

describe("hasLintableRules", () => {
  it("is true for registered styles and false otherwise", () => {
    expect(hasLintableRules("neo-brutalist")).toBe(true);
    expect(hasLintableRules("definitely-not-a-style")).toBe(false);
  });
});
