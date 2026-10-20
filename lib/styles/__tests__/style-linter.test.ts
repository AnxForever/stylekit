import { describe, expect, it } from "vitest";

import { getComponentRecipe, knownSlug } from "@/lib/discovery";
import { styles } from "@/lib/styles/registry";
import { getStylesWithLintRules } from "@/lib/styles/lint-rules";
import {
  extractClassNames,
  hasLintableRules,
  lintCodeWithRules,
  lintStyleCode,
  mergeRulesFromTokens,
  mergeStyleRules,
  stripVariants,
} from "@/lib/styles/style-linter";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { validateClasses } from "@/lib/styles/tokens";

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

  it("attaches complete class and JSX tag context to each token", () => {
    const found = extractClassNames('<span className="w-2 h-2 rounded-full" />');
    expect(found[0].element).toEqual({
      tagName: "span",
      classes: ["w-2", "h-2", "rounded-full"],
      complete: true,
    });

    const dynamic = extractClassNames('<div className={cn("w-2 h-2", active && "rounded-full")} />');
    expect(dynamic.find((entry) => entry.raw === "rounded-full")?.element?.complete).toBe(false);

    const quoted = '<span title=\'className="w-2 h-2 rounded-full"\' />';
    const quotedClass = extractClassNames(quoted).find((entry) => entry.raw === "rounded-full");
    expect(quotedClass).toBeUndefined();
    expect(lintStyleCode("bauhaus", quoted).status).toBe("inconclusive");

    const regex = String.raw`const value = /<span className="w-2 h-2 rounded-full" \/>/;`;
    const regexClass = extractClassNames(regex).find((entry) => entry.raw === "rounded-full");
    expect(regexClass).toBeUndefined();
    expect(lintStyleCode("warm-organic", regex).status).toBe("inconclusive");

    const stateRegex = String.raw`const value = /<button className="active:bg-white" \/>/;`;
    expect(extractClassNames(stateRegex)).toEqual([]);
    const stateRegexReport = lintStyleCode("synthwave", stateRegex);
    expect(stateRegexReport.status).toBe("inconclusive");
    expect(stateRegexReport.coverage.classAttributes).toBe(0);

    const controlHeaderRegex = String.raw`if (ready) /<span className="w-2 h-2 rounded-full" \/>/.test(value);`;
    expect(extractClassNames(controlHeaderRegex)).toEqual([]);
    const controlHeaderRegexReport = lintStyleCode("warm-organic", controlHeaderRegex);
    expect(controlHeaderRegexReport.status).toBe("inconclusive");
    expect(controlHeaderRegexReport.coverage.classAttributes).toBe(0);

    const divisionAfterCall = String.raw`if (ready) render() / <span className="rounded-full" />;`;
    expect(extractClassNames(divisionAfterCall).map((entry) => entry.raw)).toContain("rounded-full");

    const regexAfterElse = String.raw`if (ready) {} else /<button className="rounded-full" \/>/.test(value);`;
    const regexAfterDo = String.raw`do /<button className="rounded-full" \/>/.test(value); while (ready);`;
    for (const controlRegex of [regexAfterElse, regexAfterDo]) {
      expect(extractClassNames(controlRegex)).toEqual([]);
      const report = lintStyleCode("warm-organic", controlRegex);
      expect(report.status).toBe("inconclusive");
      expect(report.coverage.classAttributes).toBe(0);
    }
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

  it("returns an inconclusive report for an unknown slug rather than throwing", () => {
    const report = lintStyleCode("definitely-not-a-style", '<div className="rounded-lg" />');
    expect(report.ok).toBe(false);
    expect(report.status).toBe("inconclusive");
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

  it("allows Synthwave's active overvoltage colors but still bans them elsewhere", () => {
    const active = lintStyleCode(
      "synthwave",
      '<button className="active:bg-white active:text-black" />',
    );
    expect(active.status).toBe("pass");
    expect(active.violations).toEqual([]);
    expect(lintStyleCode("synthwave", '<button className="active:!bg-white" />').status).toBe("pass");

    const base = lintStyleCode("synthwave", '<button className="bg-white text-black" />');
    expect(base.status).toBe("fail");
    expect(base.violations.map((item) => item.baseClassName)).toEqual(["bg-white", "text-black"]);
    expect(lintStyleCode("synthwave", '<button className="!bg-white" />').status).toBe("fail");

    const hover = lintStyleCode("synthwave", '<button className="hover:bg-white hover:text-black" />');
    expect(hover.status).toBe("fail");
  });

  it("limits full-circle allowances to explicit circular elements", () => {
    const circle = lintStyleCode("bauhaus", '<div className="w-12 h-12 rounded-full" />');
    expect(circle.status).toBe("pass");

    const button = lintStyleCode("bauhaus", '<button className="w-12 h-12 rounded-full" />');
    expect(button.status).toBe("fail");

    const oval = lintStyleCode("bauhaus", '<div className="w-12 h-8 rounded-full" />');
    expect(oval.status).toBe("fail");

    const unknown = lintStyleCode("bauhaus", '<div className="rounded-full" />');
    expect(unknown.status).toBe("inconclusive");
    expect(unknown.warnings.join(" ")).toMatch(/complete.*element context/i);
  });

  it("requires unconditional utility evidence and a named Magic Circle role", () => {
    const magicTokens = getStyleTokens("magic-circle")!;
    expect(validateClasses(
      magicTokens,
      "sk-magic-circle-plate aspect-square rounded-full",
      { elementTag: "div" },
    ).status).toBe("pass");
    expect(validateClasses(
      magicTokens,
      "sk-magic-circle-plate md:aspect-square rounded-full",
      { elementTag: "div" },
    ).status).toBe("fail");
    expect(validateClasses(
      magicTokens,
      "w-full aspect-square rounded-full",
      { elementTag: "div" },
    ).status).toBe("fail");

    const magicCard = styles.find((style) => style.slug === "magic-circle")?.components?.card?.code;
    expect(magicCard).toContain("sk-magic-circle-plate");
    expect(lintStyleCode("magic-circle", magicCard!).status).toBe("pass");
    const magicHero = styles.find((style) => style.slug === "magic-circle")?.components?.hero?.code;
    expect(magicHero).toContain("sk-magic-circle-orbit");
    expect(lintStyleCode("magic-circle", magicHero!).status).toBe("pass");
    expect(lintStyleCode(
      "magic-circle",
      '<div className="sk-magic-circle-ring absolute inset-2 border rounded-full" />',
    ).status).toBe("pass");
    expect(lintStyleCode(
      "magic-circle",
      '<div className="absolute inset-2 border rounded-full" />',
    ).status).toBe("fail");
    expect(lintStyleCode(
      "magic-circle",
      '<div className="sk-magic-circle-ring absolute inset-x-2 inset-y-6 border rounded-full" />',
    ).status).toBe("fail");

    const runeGlyph = getComponentRecipe("magic-circle", "runeGlyph");
    expect(runeGlyph).not.toBeNull();
    expect(runeGlyph?.code).toContain("sk-magic-circle-glyph");
    expect(lintStyleCode("magic-circle", runeGlyph!.code).status).toBe("pass");
  });

  it("does not use a responsive utility as an unconditional prefix predicate", () => {
    const tokens = getStyleTokens("bauhaus")!;
    const prefixScoped = {
      ...tokens,
      forbidden: {
        ...tokens.forbidden,
        exceptions: [{
          className: "rounded-full",
          reason: "Only an unconditional width marker permits a circular decoration.",
          element: { tags: ["div"], classPrefixesAll: ["w-"] },
        }],
      },
    };

    expect(validateClasses(prefixScoped, "w-12 rounded-full", { elementTag: "div" }).status).toBe("pass");
    expect(validateClasses(prefixScoped, "md:w-12 rounded-full", { elementTag: "div" }).status).toBe("fail");
    expect(validateClasses(prefixScoped, "!w-12 rounded-full", { elementTag: "div" }).status).toBe("fail");
  });

  it("enforces small-dot bounds and treats responsive sizes as unknown", () => {
    const small = lintStyleCode("warm-organic", '<span className="w-3 h-3 rounded-full" />');
    expect(small.status).toBe("pass");

    const large = lintStyleCode("warm-organic", '<span className="w-4 h-4 rounded-full" />');
    expect(large.status).toBe("fail");

    const responsive = lintStyleCode(
      "warm-organic",
      '<span className="w-2 h-2 sm:w-3 sm:h-3 rounded-full" />',
    );
    expect(responsive.status).toBe("inconclusive");

    expect(lintStyleCode("warm-organic", '<span className="size-2 rounded-full" />').status).toBe("pass");
    expect(lintStyleCode("warm-organic", '<span className="w-[12px] h-[12px] rounded-full" />').status).toBe("pass");
    expect(lintStyleCode("warm-organic", '<span className="w-[1rem] h-[1rem] rounded-full" />').status).toBe("fail");
    expect(lintStyleCode("warm-organic", '<span className="size-2 w-4 h-4 rounded-full" />').status).toBe("inconclusive");
    expect(lintStyleCode("warm-organic", '<div className="w-12 h-12 rounded-full bg-[#D4BFA5]/30" />').status).toBe("pass");
    expect(lintStyleCode("warm-organic", '<div className="w-16 h-16 rounded-full bg-[#D4BFA5]/30" />').status).toBe("fail");
  });

  it("allows pill corners on GitHub text labels, not interactive controls", () => {
    const label = lintStyleCode(
      "github-style",
      '<span className="px-1.5 py-0.5 text-xs rounded-full">Public</span>',
    );
    expect(label.status).toBe("pass");

    const languageSwatch = lintStyleCode(
      "github-style",
      '<span className="w-3 h-3 rounded-full bg-[#3178c6]" />',
    );
    expect(languageSwatch.status).toBe("pass");

    const button = lintStyleCode(
      "github-style",
      '<button className="px-1.5 py-0.5 text-xs rounded-full">Public</button>',
    );
    expect(button.status).toBe("fail");
  });

  it("returns inconclusive from the token helper when an element exception lacks a tag", () => {
    const result = validateClasses(getStyleTokens("bauhaus")!, "w-12 h-12 rounded-full");
    expect(result.valid).toBe(false);
    expect(result.status).toBe("inconclusive");
    expect(result.violations).toEqual([]);

    expect(validateClasses(getStyleTokens("bauhaus")!, "w-12 h-12 rounded-full", { elementTag: "div" }).status).toBe("pass");
    expect(validateClasses(getStyleTokens("synthwave")!, "active:bg-white active:text-black").status).toBe("pass");
    expect(validateClasses(getStyleTokens("synthwave")!, "bg-white text-black").status).toBe("fail");

    const tokens = getStyleTokens("bauhaus")!;
    const unscoped = {
      ...tokens,
      forbidden: { ...tokens.forbidden, exceptions: [{ className: "rounded-full", reason: "missing predicate" }] },
    };
    expect(validateClasses(unscoped, "rounded-full").status).toBe("inconclusive");
    expect(lintCodeWithRules(mergeRulesFromTokens(unscoped), '<div className="rounded-full" />').status).toBe("inconclusive");
  });

  it("keeps every registered button, card, and input template free of forbidden utilities", () => {
    const failures: string[] = [];
    let templates = 0;
    for (const style of styles) {
      for (const component of ["button", "card", "input"] as const) {
        const code = style.components?.[component]?.code;
        if (!code) continue;
        templates += 1;
        const report = lintStyleCode(style.slug, code);
        for (const violation of report.violations) {
          failures.push(`${style.slug}/${component}: ${violation.className}`);
        }
      }
    }
    expect(templates).toBe(444);
    expect(failures).toEqual([]);
  });
});

describe("hasLintableRules", () => {
  it("is true for registered styles and false otherwise", () => {
    expect(hasLintableRules("neo-brutalist")).toBe(true);
    expect(hasLintableRules("definitely-not-a-style")).toBe(false);
  });
});

// Submissions are not in the registry yet, so slug-keyed lookups find nothing
// for them. These cover the data-driven entry points that let an unregistered
// style be linted against the tokens it declares itself.
describe("linting without the registry", () => {
  const borrowedTokens = getStyleTokens("neo-brutalist")!;

  it("builds rules from tokens passed in directly", () => {
    const rules = mergeRulesFromTokens(borrowedTokens);
    expect(rules.sources).toContain("tokens");
    expect(rules.forbiddenClasses.size).toBeGreaterThan(0);
  });

  it("finds no rules when no tokens are supplied", () => {
    expect(mergeRulesFromTokens(undefined).sources).toEqual([]);
  });

  it("flags code that violates the tokens it was given", () => {
    const rules = mergeRulesFromTokens(borrowedTokens);
    const banned = [...rules.forbiddenClasses.keys()][0];
    const report = lintCodeWithRules(
      rules,
      `<button className="px-4 ${banned}">Go</button>`,
      { slug: "unregistered-submission" },
    );

    expect(report.ok).toBe(false);
    expect(report.slug).toBe("unregistered-submission");
    expect(report.violations.map((v) => v.baseClassName)).toContain(banned);
  });

  it("passes code that respects the tokens it was given", () => {
    const rules = mergeRulesFromTokens(borrowedTokens);
    const report = lintCodeWithRules(rules, '<div className="p-4 flex" />');
    expect(report.ok).toBe(true);
  });

  it("matches the slug-keyed path for a registered style", () => {
    const code = '<div className="p-4 rounded-lg" />';
    const viaSlug = lintStyleCode("neo-brutalist", code);
    const viaRules = lintCodeWithRules(mergeStyleRules("neo-brutalist"), code, {
      slug: "neo-brutalist",
    });
    expect(viaRules).toEqual(viaSlug);
  });
});
