import { describe, expect, it } from "vitest";
import type { ComponentRecipe } from "@/lib/recipes/types";
import {
  alignRequiredClasses,
  enumerateRecipeClassSurfaces,
  enumerateRecipeExplicitStateClassSurfaces,
  enumerateRecipeParameterCombinations,
} from "@/tools/lib/align-recipe-required";
import {
  commitPlannedSourceEdits,
  rewriteCuratedRequiredArrays,
  rewriteTokenRequiredArrays,
} from "@/tools/lib/rewrite-required-arrays";
import { renderRecipe } from "@/lib/recipes/renderer";

describe("recipe required alignment", () => {
  it("enumerates every select and boolean parameter combination", () => {
    expect(enumerateRecipeParameterCombinations([
      { id: "size", label: "Size", labelZh: "尺寸", type: "select", options: [
        { value: "sm", label: "Small", labelZh: "小", classes: "" },
        { value: "lg", label: "Large", labelZh: "大", classes: "" },
      ], default: "sm" },
      { id: "wide", label: "Wide", labelZh: "宽", type: "boolean", default: false },
    ])).toEqual([
      { size: "sm", wide: false },
      { size: "sm", wide: true },
      { size: "lg", wide: false },
      { size: "lg", wide: true },
    ]);
  });

  it("keeps classes shared across all renders and replaces drift with one universal family match", () => {
    const aligned = alignRequiredClasses(
      ["bg-white/10", "font-serif", "hover:ring-2", "border border-border"],
      [
        { variant: "primary", params: {}, classes: ["bg-white/25", "font-sans", "hover:ring-2", "border", "border-white/20"] },
        { variant: "secondary", params: {}, classes: ["bg-white/25", "font-sans", "hover:ring-2", "border", "border-white/20"] },
      ],
    );

    expect(aligned.required).toEqual(["bg-white/25", "font-sans", "hover:ring-2", "border", "border-white/20"]);
    expect(aligned.decisions.map(({ action }) => action)).toEqual(["replace", "replace", "keep", "keep", "replace"]);
    expect(aligned.needsReview).toBe(false);
  });

  it("does not cross utility families or variant prefixes and reports ambiguous replacements", () => {
    const aligned = alignRequiredClasses(
      ["bg-gradient-to-r", "focus:ring-2", "rounded-lg"],
      [
        { variant: "primary", params: {}, classes: ["bg-white", "hover:ring-2", "rounded-sm", "rounded-xl"] },
        { variant: "secondary", params: {}, classes: ["bg-white", "hover:ring-2", "rounded-sm", "rounded-xl"] },
      ],
    );

    expect(aligned.required).toEqual([]);
    expect(aligned.decisions.map(({ reason }) => reason)).toEqual([
      "not emitted by any recipe variant, parameter, or named state",
      "not emitted by any recipe variant, parameter, or named state",
      "ambiguous: 2 universal utilities conflict with this requirement",
    ]);
    expect(aligned.needsReview).toBe(true);
  });

  it("drops malformed placeholders before matching or replacement", () => {
    const aligned = alignRequiredClasses(
      ["bg-white/", "focus:shadow-[0_0_)", "rounded-xl-"],
      [{ variant: "default", params: {}, classes: ["bg-white", "focus:shadow-md", "rounded-2xl"] }],
    );

    expect(aligned.required).toEqual([]);
    expect(aligned.decisions.map(({ reason }) => reason)).toEqual([
      "invalid or incomplete Tailwind utility",
      "invalid or incomplete Tailwind utility",
      "invalid or incomplete Tailwind utility",
    ]);
  });

  it("finds only classes universal to every variant and parameter combination", () => {
    const recipe: ComponentRecipe = {
      id: "button", name: "Button", nameZh: "按钮", description: "test",
      skeleton: { element: "button", baseClasses: ["rounded-lg"] },
      parameters: [{ id: "wide", label: "Wide", labelZh: "宽", type: "boolean", default: false, trueClasses: "w-full" }],
      variants: {
        primary: { id: "primary", label: "Primary", labelZh: "主要", classes: ["bg-black"] },
        outline: { id: "outline", label: "Outline", labelZh: "轮廓", classes: ["bg-transparent"] },
      },
      slots: [],
    };
    const surfaces = enumerateRecipeClassSurfaces(recipe, (_recipe, params) => ({
      className: ["rounded-lg", params.variant === "primary" ? "bg-black" : "bg-transparent", params.params.wide ? "w-full" : ""].join(" "),
    }));
    const aligned = alignRequiredClasses(["rounded-xl", "bg-red-500", "w-full"], surfaces);
    expect(surfaces).toHaveLength(4);
    expect(aligned.required).toEqual(["rounded-lg"]);
    expect(aligned.decisions[1].action).toBe("drop");
    expect(aligned.decisions[2].action).toBe("drop");
  });

  it("distinguishes explicit-state-only utilities from absent recipe classes", () => {
    const recipe: ComponentRecipe = {
      id: "input", name: "Input", nameZh: "输入框", description: "test",
      skeleton: { element: "input", baseClasses: ["border"] },
      parameters: [],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [],
      states: { focus: ["focus:ring-2", "focus:border-blue-500"] },
    };
    const surfaces = enumerateRecipeClassSurfaces(recipe, renderRecipe);
    const explicit = enumerateRecipeExplicitStateClassSurfaces(recipe, renderRecipe);
    const aligned = alignRequiredClasses(["focus:ring-2", "focus-visible:ring-2"], surfaces, explicit);

    expect(surfaces[0].classes).toContain("focus:ring-2");
    expect(aligned.required).toContain("focus:ring-2");
    expect(aligned.decisions[1].reason).toBe("not emitted by any recipe variant, parameter, or named state");
  });
});

describe("required array source rewriting", () => {
  it("changes only required token arrays and preserves unrelated source", () => {
    const source = `import { createStyleTokens } from "./token-defaults";\nexport const example = createStyleTokens({\n  colors: { background: { primary: "bg-black" } },\n  required: { button: ["rounded-xl"], card: [], input: ["focus:ring-2"] },\n});\n`;
    const next = rewriteTokenRequiredArrays(source, {
      button: ["rounded-lg"], card: ["border"], input: ["focus:ring-1"],
    }, "example-tokens.ts");

    expect(next).toContain('primary: "bg-black"');
    expect(next).toContain('button: [\n    "rounded-lg",\n  ]');
    expect(next).toContain('card: [\n    "border",\n  ]');
    expect(next).toContain('input: [\n    "focus:ring-1",\n  ]');
  });

  it("updates only the named curated rule entry", () => {
    const source = `export const styleLintRules = {\n  "alpha": { required: { button: ["rounded-xl"], card: ["border"], input: ["focus:ring-2"] } },\n  "beta": { required: { button: ["rounded-sm"], card: [], input: [] } },\n};\n`;
    const next = rewriteCuratedRequiredArrays(source, "alpha", {
      button: ["rounded-lg"], card: ["border-2"], input: ["focus:ring-1"],
    }, "lint-rules.ts");

    expect(next).toContain('"beta": { required: { button: ["rounded-sm"], card: [], input: [] } }');
    expect(next).toContain('"alpha": { required: { button: [\n    "rounded-lg",\n  ], card: [\n    "border-2",\n  ], input: [\n    "focus:ring-1",\n  ] } }');
  });

  it("inserts a missing component array without removing container rules", () => {
    const source = `export const styleLintRules = {\n  "editorial": { required: { button: ["font-serif"], card: ["border-b"], container: ["max-w-4xl"] } },\n};\n`;
    const next = rewriteCuratedRequiredArrays(source, "editorial", {
      button: ["font-sans"], card: ["border-b"], input: ["focus:ring-1"],
    }, "lint-rules.ts");

    expect(next).toContain('container: ["max-w-4xl"]');
    expect(next).toContain('input: [\n      "focus:ring-1",\n    ],');
  });

  it("aligns inserted component properties with existing multiline required arrays", () => {
    const source = `export const styleLintRules = {\n  "dark-mode": {\n    required: {\n      button: ["rounded-lg"],\n      card: ["border"],\n    },\n  },\n};\n`;
    const next = rewriteCuratedRequiredArrays(source, "dark-mode", {
      button: ["rounded-lg"], card: ["border"], input: ["focus:ring-1"],
    }, "lint-rules.ts");

    expect(next).toContain('\n      input: [\n        "focus:ring-1",\n      ],\n    },');
    expect(next).not.toContain('\n          input:');
  });

  it("fails closed when a required array has comments or dynamic entries", () => {
    const commented = `createStyleTokens({ required: { button: ["old" /* keep */], card: [], input: [] } })`;
    expect(() => rewriteTokenRequiredArrays(commented, {
      button: ["new"], card: [], input: [],
    })).toThrow(/containing comments/);

    const dynamic = `createStyleTokens({ required: { button: [value], card: [], input: [] } })`;
    expect(() => rewriteTokenRequiredArrays(dynamic, {
      button: ["new"], card: [], input: [],
    })).toThrow(/non-literal/);
  });
});

describe("planned source writes", () => {
  it("checks all inputs for concurrent changes before writing any file", () => {
    const contents = new Map([["first.ts", "first-original"], ["second.ts", "second-changed"]]);
    const writes: string[] = [];

    expect(() => commitPlannedSourceEdits([
      { file: "first.ts", original: "first-original", next: "first-next" },
      { file: "second.ts", original: "second-original", next: "second-next" },
    ], {
      readFile: (file) => contents.get(file) ?? "",
      writeFile: (file, value) => { writes.push(`${file}:${value}`); contents.set(file, value); },
    })).toThrow(/changed after planning; aborting before any writes/);
    expect(writes).toEqual([]);
    expect(contents.get("first.ts")).toBe("first-original");
  });

  it("restores prior and partially-written files if a later write fails", () => {
    const contents = new Map([["first.ts", "first-original"], ["second.ts", "second-original"]]);
    const writes: string[] = [];
    let failOnce = true;

    expect(() => commitPlannedSourceEdits([
      { file: "first.ts", original: "first-original", next: "first-next" },
      { file: "second.ts", original: "second-original", next: "second-next" },
    ], {
      readFile: (file) => contents.get(file) ?? "",
      writeFile: (file, value) => {
        writes.push(`${file}:${value}`);
        if (file === "second.ts" && value === "second-next" && failOnce) {
          failOnce = false;
          contents.set(file, "partial-second-write");
          throw new Error("simulated disk failure");
        }
        contents.set(file, value);
      },
    })).toThrow(/write failed for second\.ts: simulated disk failure; restored 2 touched file\(s\)/);

    expect(contents.get("first.ts")).toBe("first-original");
    expect(contents.get("second.ts")).toBe("second-original");
    expect(writes).toEqual([
      "first.ts:first-next",
      "second.ts:second-next",
      "second.ts:second-original",
      "first.ts:first-original",
    ]);
  });
});
