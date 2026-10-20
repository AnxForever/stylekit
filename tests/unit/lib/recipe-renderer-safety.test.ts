// @vitest-environment happy-dom
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { getComponentRecipe, renderRecipeDefinition } from "@/lib/discovery";
import { getRecipe, renderRecipe, type ComponentRecipe } from "@/lib/recipes";

function expectValidTsx(element: string): string {
  const result = ts.transpileModule(`const Preview = () => (${element});`, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
    },
    reportDiagnostics: true,
  });
  const errors = (result.diagnostics ?? []).filter((diagnostic) => diagnostic.category === ts.DiagnosticCategory.Error);
  expect(errors.map((diagnostic) => ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"))).toEqual([]);
  return result.outputText;
}

describe("recipe renderer output escaping", () => {
  it("keeps text slot content as text in JSX and HTML consumers", () => {
    const text = 'Save < draft & {x} "quoted"';
    const result = getComponentRecipe("broadcast-glitch", "button", { slots: { label: text } })!;
    const recipe = getRecipe("broadcast-glitch", "button")!;
    const rendered = renderRecipe(recipe, {
      variant: "red",
      params: {},
      slots: { label: text },
    });

    const compiled = expectValidTsx(result.code);
    for (const fragment of ["Save < draft & ", "{", "x", "}", ' "quoted"']) {
      expect(compiled).toContain(JSON.stringify(fragment));
    }
    const button = new DOMParser().parseFromString(rendered.preview, "text/html").querySelector("button")!;
    expect(button.textContent).toBe(text);
    expect(button.children).toHaveLength(0);
  });

  it("encodes input type and placeholder without creating extra attributes", () => {
    const recipe: ComponentRecipe = {
      id: "input-escaping",
      name: "Input escaping",
      nameZh: "输入属性转义",
      description: "",
      skeleton: { element: "input", baseClasses: ["w-full"] },
      parameters: [{
        id: "type",
        label: "Input type",
        labelZh: "输入类型",
        type: "string",
        default: "text",
      }],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [{
        id: "placeholder",
        label: "Placeholder",
        labelZh: "占位提示",
        required: false,
        type: "text",
      }],
    };
    const inputType = 'text" autofocus="true < & {x}';
    const placeholder = 'A" onFocus="alert(1) < & {x}';
    const result = renderRecipeDefinition("test", "input-escaping", recipe, { params: { type: inputType }, slots: { placeholder } });
    const rendered = renderRecipe(recipe, {
      variant: "default",
      params: { type: inputType },
      slots: { placeholder },
    });

    const compiled = expectValidTsx(result.code);
    expect(compiled).toContain(JSON.stringify(inputType));
    expect(compiled).toContain(JSON.stringify(placeholder));
    const input = new DOMParser().parseFromString(rendered.preview, "text/html").querySelector("input")!;
    expect(input.getAttribute("type")).toBe(inputType);
    expect(input.getAttribute("placeholder")).toBe(placeholder);
    expect(input.hasAttribute("autofocus")).toBe(false);
    expect(input.hasAttribute("onfocus")).toBe(false);
  });

  it("emits dotted icon component names as valid JSX members", () => {
    const result = getComponentRecipe("broadcast-glitch", "button", {
      slots: { icon: "Icons.ArrowRight" },
    })!;

    expectValidTsx(result.code);
    expect(result.code).toContain("<Icons.ArrowRight className");
    const recipe = getRecipe("broadcast-glitch", "button")!;
    expect(() => renderRecipe(recipe, {
      variant: "red",
      params: {},
      slots: { icon: "<Icon />" },
    })).toThrow(/JSX component\/member name/);
  });

  it("keeps children and element slots as explicit trusted code slots", () => {
    const codeSlot = "<strong>Trusted child</strong>";
    const recipe: ComponentRecipe = {
      id: "trusted-code-slot",
      name: "Trusted code slot",
      nameZh: "代码插槽",
      description: "",
      skeleton: { element: "button", baseClasses: ["inline-flex"] },
      parameters: [],
      variants: { default: { id: "default", label: "Default", labelZh: "默认", classes: [] } },
      slots: [{
        id: "children",
        label: "Children",
        labelZh: "子内容",
        required: true,
        type: "children",
      }],
    };
    const result = renderRecipeDefinition("test", "trusted-code-slot", recipe, { slots: { children: codeSlot } });
    const rendered = renderRecipe(recipe, {
      variant: "default",
      params: {},
      slots: { children: codeSlot },
    });

    expect(result.code).toContain(codeSlot);
    expect(rendered.preview).toContain(codeSlot);
  });
});
