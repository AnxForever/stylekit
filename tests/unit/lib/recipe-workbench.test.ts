// @vitest-environment happy-dom
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { minimalistFlatRecipes } from "@/lib/recipes/minimalist-flat";
import { buildWorkbenchArtifact, getWorkbenchDefaults, isWorkbenchRecipe } from "@/lib/recipes/workbench";
import type { ComponentRecipe } from "@/lib/recipes/types";

function makeRecipe(overrides: Partial<ComponentRecipe> = {}): ComponentRecipe {
  return {
    id: "sample-button",
    name: "Sample button",
    nameZh: "示例按钮",
    description: "A workbench fixture",
    skeleton: { element: "button", baseClasses: ["inline-flex", "transition"] },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        options: [
          { value: "sm", label: "Small", labelZh: "小", classes: "px-2 py-1" },
          { value: "lg", label: "Large", labelZh: "大", classes: "px-6 py-3" },
        ],
        default: "sm",
      },
      {
        id: "fullWidth",
        label: "Full width",
        labelZh: "全宽",
        type: "boolean",
        default: false,
        trueClasses: "w-full",
        falseClasses: "w-auto",
      },
    ],
    variants: {
      default: { id: "default", label: "Default", labelZh: "默认", classes: ["bg-blue-600"] },
      outline: { id: "outline", label: "Outline", labelZh: "描边", classes: ["border", "bg-transparent"] },
    },
    slots: [
      { id: "icon", label: "Icon", labelZh: "图标", required: false, type: "icon" },
      { id: "label", label: "Label", labelZh: "文字", required: true, default: "Save", type: "text" },
    ],
    states: {
      hover: ["hover:bg-blue-700 hover:-translate-y-1 motion-reduce:transition-none"],
      focus: ["focus-visible:ring-2 focus-visible:ring-current"],
      active: ["active:scale-95"],
      disabled: ["opacity-50", "cursor-not-allowed"],
      loading: ["animate-spin"],
    },
    ...overrides,
  };
}

function expectValidTsx(source: string): void {
  const result = ts.transpileModule(source, {
    compilerOptions: { jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  expect(errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))).toEqual([]);
}

function getClassesFromTsx(source: string): string[] {
  const file = ts.createSourceFile("artifact.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  let className = "";
  const visit = (node: ts.Node): void => {
    if (ts.isJsxAttribute(node) && node.name.getText(file) === "className" && node.initializer && ts.isJsxExpression(node.initializer)) {
      const expression = node.initializer.expression;
      if (expression && ts.isStringLiteral(expression)) className = expression.text;
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  expect(className).not.toBe("");
  return className.split(/\s+/).filter(Boolean);
}

function expectNoImageElement(source: string): void {
  const file = ts.createSourceFile("artifact.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const imageElements: string[] = [];
  const visit = (node: ts.Node): void => {
    if ((ts.isJsxElement(node) && node.openingElement.tagName.getText(file) === "img") ||
      (ts.isJsxSelfClosingElement(node) && node.tagName.getText(file) === "img")) {
      imageElements.push(node.getText(file));
    }
    ts.forEachChild(node, visit);
  };
  visit(file);
  expect(imageElements).toEqual([]);
}

describe("recipe workbench", () => {
  it("provides defaults and emits a self-contained component plus compilable usage", () => {
    const recipe = makeRecipe();
    const defaults = getWorkbenchDefaults(recipe);
    const artifact = buildWorkbenchArtifact(recipe, defaults);

    expect(defaults).toEqual({
      variant: "default",
      params: { size: "sm", fullWidth: false },
      slots: { icon: "", label: "Save" },
      state: "default",
    });
    expect(artifact.fileName).toBe("sample-button.tsx");
    expect(artifact.componentName).toBe("SampleButton");
    expect(artifact.usage).toContain('import SampleButton from "./sample-button";');
    expect(artifact.dependencies).toEqual([]);
    expect(artifact.requiresClient).toBe(false);
    expect(artifact.code).toContain("export default function SampleButton()");
    expect(artifact.code).toContain('type="button"');
    expect(artifact.preview).toContain('type="button"');
    expect(artifact.code).not.toContain("undefined");
    expectValidTsx(artifact.code);
    expectValidTsx(artifact.usage);

    const previewButton = new DOMParser().parseFromString(artifact.preview, "text/html").querySelector("button")!;
    expect(previewButton.getAttribute("type")).toBe("button");
    expect(previewButton.textContent).toBe("Save");
  });

  it("keeps variants, parameters, interaction and reduced-motion classes consistent", () => {
    const recipe = makeRecipe();
    const defaults = getWorkbenchDefaults(recipe);
    const artifact = buildWorkbenchArtifact(recipe, {
      ...defaults,
      variant: "outline",
      params: { size: "lg", fullWidth: true },
    });
    const previewButton = new DOMParser().parseFromString(artifact.preview, "text/html").querySelector("button")!;
    const previewClasses = previewButton.className.split(/\s+/).filter(Boolean);

    expect(previewClasses).toEqual(getClassesFromTsx(artifact.code));
    expect(previewClasses).toEqual(expect.arrayContaining([
      "inline-flex",
      "transition",
      "border",
      "bg-transparent",
      "px-6",
      "py-3",
      "w-full",
      "hover:bg-blue-700",
      "hover:-translate-y-1",
      "focus-visible:ring-2",
      "active:scale-95",
      "motion-reduce:transition-none",
      "motion-reduce:animate-none",
      "motion-reduce:transform-none",
    ]));
    expect(previewClasses.filter((className) => className === "hover:bg-blue-700")).toHaveLength(1);
    expectValidTsx(artifact.code);
  });

  it("applies disabled/loading only when selected", () => {
    const recipe = makeRecipe();
    const defaults = getWorkbenchDefaults(recipe);
    const getClasses = (preview: string) =>
      new DOMParser().parseFromString(preview, "text/html").querySelector("button")!.className.split(/\s+/);

    expect(getClasses(buildWorkbenchArtifact(recipe, defaults).preview)).not.toContain("opacity-50");
    expect(getClasses(buildWorkbenchArtifact(recipe, defaults).preview)).not.toContain("animate-spin");
    expect(getClasses(buildWorkbenchArtifact(recipe, { ...defaults, state: "disabled" }).preview)).toContain("opacity-50");
    expect(getClasses(buildWorkbenchArtifact(recipe, { ...defaults, state: "loading" }).preview)).toContain("animate-spin");
  });

  it("adds a visible focus fallback when focus classes are absent or only disable the outline", () => {
    for (const focus of [undefined, ["focus:outline-none"]]) {
      const recipe = makeRecipe({ states: { focus } });
      const artifact = buildWorkbenchArtifact(recipe, getWorkbenchDefaults(recipe));
      const button = new DOMParser().parseFromString(artifact.preview, "text/html").querySelector("button")!;
      expect(button.className).toContain("focus-visible:ring-2");
      expect(button.className).toContain("focus-visible:ring-blue-500");
    }
  });

  it("merges real minimalist-flat card and input conflicts so variants win", () => {
    const cardRecipe = minimalistFlatRecipes.recipes.card;
    const cardArtifact = buildWorkbenchArtifact(cardRecipe, {
      ...getWorkbenchDefaults(cardRecipe),
      variant: "inverted",
    });
    const card = new DOMParser().parseFromString(cardArtifact.preview, "text/html").querySelector("div")!;
    const cardClasses = card.className.split(/\s+/).filter(Boolean);

    expect(cardClasses).toContain("bg-black");
    expect(cardClasses).not.toContain("bg-white");
    expect(cardClasses).toContain("text-white");
    expect(cardClasses).toEqual(getClassesFromTsx(cardArtifact.code));
    expectValidTsx(cardArtifact.code);

    const inputRecipe = minimalistFlatRecipes.recipes.input;
    const inputArtifact = buildWorkbenchArtifact(inputRecipe, {
      ...getWorkbenchDefaults(inputRecipe),
      variant: "boxed",
      params: { size: "lg" },
    });
    const input = new DOMParser().parseFromString(inputArtifact.preview, "text/html").querySelector("input")!;
    const inputClasses = input.className.split(/\s+/).filter(Boolean);

    expect(inputClasses).toContain("border-2");
    expect(inputClasses).not.toContain("border-0");
    expect(inputClasses).toContain("px-4");
    expect(inputClasses).not.toContain("px-0");
    expect(inputClasses).toContain("focus:border-[#ff3366]");
    expect(inputClasses).not.toContain("focus-visible:ring-2");
    expect(inputClasses).toEqual(getClassesFromTsx(inputArtifact.code));
    expectValidTsx(inputArtifact.code);
  });

  it("treats children and element slots as text, not executable markup", () => {
    const recipe = makeRecipe({
      id: "safe-card",
      skeleton: { element: "div", baseClasses: ["rounded-lg"] },
      parameters: [],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [{ id: "children", label: "Content", labelZh: "内容", required: true, type: "children" }],
      states: undefined,
    });
    const text = '<img src=x onerror="run()"> & {draft}';
    const artifact = buildWorkbenchArtifact(recipe, {
      ...getWorkbenchDefaults(recipe),
      slots: { children: text },
    });
    const root = new DOMParser().parseFromString(artifact.preview, "text/html").querySelector("div")!;

    expect(isWorkbenchRecipe(recipe)).toBe(true);
    expect(root.textContent).toBe(text);
    expect(root.querySelector("img")).toBeNull();
    expectNoImageElement(artifact.code);
    expectValidTsx(artifact.code);
  });

  it("adds a real input label and escapes editable label and placeholder values", () => {
    const recipe = makeRecipe({
      id: "search-input",
      skeleton: { element: "input", baseClasses: ["w-full", "border"] },
      parameters: [],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [{ id: "placeholder", label: "Placeholder", labelZh: "占位", required: false, type: "text", default: "Search" }],
      states: undefined,
    });
    const defaults = getWorkbenchDefaults(recipe);
    const artifact = buildWorkbenchArtifact(recipe, defaults);
    const document = new DOMParser().parseFromString(artifact.preview, "text/html");
    const label = document.querySelector("label")!;

    expect(defaults.slots.label).toBe("Label");
    expect(label.textContent).toBe("Label");
    expect(label.querySelector("input")?.getAttribute("placeholder")).toBe("Search");
    expectValidTsx(artifact.code);

    const labelText = '<svg onload="run()">Name & {query}';
    const placeholderText = 'Search" autofocus="true & <term>';
    const customArtifact = buildWorkbenchArtifact(recipe, {
      ...defaults,
      slots: { placeholder: placeholderText, label: labelText },
    });
    const customDocument = new DOMParser().parseFromString(customArtifact.preview, "text/html");
    const input = customDocument.querySelector("input")!;

    expect(customDocument.querySelector("label")?.textContent).toBe(labelText);
    expect(customDocument.querySelector("label svg")).toBeNull();
    expect(input.getAttribute("placeholder")).toBe(placeholderText);
    expect(input.hasAttribute("autofocus")).toBe(false);
    expectValidTsx(customArtifact.code);
  });

  it("leaves optional icons empty and rejects invalid or unimported icon values", () => {
    const recipe = makeRecipe();
    const defaults = getWorkbenchDefaults(recipe);
    const artifact = buildWorkbenchArtifact(recipe, defaults);

    expect(defaults.slots.icon).toBe("");
    expect(artifact.code).not.toContain("<undefined");
    expect(artifact.dependencies).toEqual([]);
    expect(() => buildWorkbenchArtifact(recipe, {
      ...defaults,
      slots: { ...defaults.slots, icon: "<ArrowRight />" },
    })).toThrow(/must be empty or a valid component name/);
    expect(() => buildWorkbenchArtifact(recipe, {
      ...defaults,
      slots: { ...defaults.slots, icon: "ArrowRight" },
    })).toThrow(/has no generated import/);
  });

  it("reports missing slots, unknown variants, parameter values, slots and states", () => {
    const recipe = makeRecipe({ states: { hover: ["hover:bg-blue-700"] } });
    const defaults = getWorkbenchDefaults(recipe);

    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, variant: "missing" })).toThrow(/Unknown variant "missing"/);
    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, params: { size: "xl", fullWidth: false } })).toThrow(/Unknown value "xl"/);
    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, params: { size: "sm", fullWidth: false, debug: true } })).toThrow(/Unknown parameter "debug"/);
    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, slots: { ...defaults.slots, label: "" } })).toThrow(/Missing required slot "label"/);
    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, state: "loading" })).toThrow(/State "loading" is not defined/);
    expect(() => buildWorkbenchArtifact(recipe, { ...defaults, slots: { ...defaults.slots, random: "text" } })).toThrow(/Unknown slot "random"/);
  });

  it("excludes custom skeletons and unsupported parameter types", () => {
    const customStructure = makeRecipe({ skeleton: { element: "button", baseClasses: [], structure: "<span>{label}</span>" } });
    const customChildren = makeRecipe({ skeleton: { element: "button", baseClasses: [], children: [] } });
    const stringParameter = makeRecipe({
      parameters: [{ id: "label", label: "Label", labelZh: "文字", type: "string", default: "Text" }],
    });
    const numericParameter = makeRecipe({
      parameters: [{ id: "count", label: "Count", labelZh: "数量", type: "number", default: 2 }],
    });

    expect(isWorkbenchRecipe(customStructure)).toBe(false);
    expect(isWorkbenchRecipe(customChildren)).toBe(false);
    expect(isWorkbenchRecipe(stringParameter)).toBe(false);
    expect(isWorkbenchRecipe(numericParameter)).toBe(false);
    expect(() => getWorkbenchDefaults(customStructure)).toThrow(/custom skeleton structure/);
    expect(() => getWorkbenchDefaults(stringParameter)).toThrow(/uses unsupported type "string"/);
  });
});
