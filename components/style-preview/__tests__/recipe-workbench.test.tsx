// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ComponentRecipe } from "@/lib/recipes/types";

const { i18nState, useI18nMock } = vi.hoisted(() => ({
  i18nState: { locale: "zh" },
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/components/style-preview/component-usage-guide", () => ({
  ComponentUsageGuide: () => <aside data-testid="component-usage-guide" />,
}));

import { RecipeWorkbench } from "@/components/style-preview/recipe-workbench";

function makeRecipe({ id = "button", defaultLabel = "Continue" } = {}): ComponentRecipe {
  return {
    id,
    name: "Button",
    nameZh: "按钮",
    description: "A button recipe",
    skeleton: { element: "button", baseClasses: ["rounded-md", "px-4"] },
    parameters: [
      {
        id: "size",
        label: "Size",
        labelZh: "尺寸",
        type: "select",
        default: "md",
        options: [
          { value: "sm", label: "Small", labelZh: "小号", classes: "size-sm" },
          { value: "md", label: "Medium", labelZh: "中号", classes: "size-md" },
          { value: "lg", label: "Large", labelZh: "大号", classes: "size-lg" },
        ],
      },
      {
        id: "fullWidth",
        label: "Full width",
        labelZh: "全宽",
        type: "boolean",
        default: false,
        trueClasses: "w-full",
      },
    ],
    variants: {
      solid: {
        id: "solid",
        label: "Solid",
        labelZh: "实心",
        classes: ["variant-solid"],
      },
      outline: {
        id: "outline",
        label: "Outline",
        labelZh: "描边",
        classes: ["variant-outline"],
      },
    },
    slots: [
      {
        id: "label",
        label: "Button label",
        labelZh: "按钮文字",
        required: true,
        default: defaultLabel,
        type: "text",
      },
      {
        id: "caption",
        label: "Supporting text",
        labelZh: "辅助文本",
        required: false,
        default: "More info",
        type: "element",
      },
      {
        id: "icon",
        label: "Icon",
        labelZh: "图标",
        required: false,
        type: "icon",
      },
    ],
  };
}

function makeInputRecipe(): ComponentRecipe {
  return {
    ...makeRecipe({ id: "input" }),
    name: "Input",
    nameZh: "输入框",
    skeleton: { element: "input", baseClasses: ["border", "px-3", "py-2"] },
    slots: [
      {
        id: "placeholder",
        label: "Placeholder",
        labelZh: "占位符",
        required: false,
        default: "Email address",
        type: "text",
      },
    ],
  };
}

function previewRegion() {
  return screen.getByRole("region", { name: i18nState.locale === "zh" ? "实时预览" : "Live preview" });
}

describe("RecipeWorkbench", () => {
  beforeEach(() => {
    i18nState.locale = "zh";
    useI18nMock.mockImplementation(() => ({
      locale: i18nState.locale,
      t: (key: string) => key,
      setLocale: vi.fn(),
    }));
  });

  it("updates preview and full code from the same parameter and text values", () => {
    const { container } = render(<RecipeWorkbench recipe={makeRecipe()} styleSlug="test-style" />);
    const codeDetails = container.querySelector("details");
    expect(codeDetails?.open).toBe(false);

    fireEvent.click(screen.getByRole("button", { name: "描边" }));
    fireEvent.click(screen.getByRole("button", { name: "大号" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "全宽" }));
    fireEvent.change(screen.getByRole("textbox", { name: "按钮文字" }), { target: { value: "继续" } });
    fireEvent.change(screen.getByRole("textbox", { name: "辅助文本" }), { target: { value: "细节" } });

    const previewButton = within(previewRegion()).getByRole("button", { name: /继续\s+细节/ });
    expect(previewButton).toHaveClass("variant-outline", "size-lg", "w-full");

    fireEvent.click(screen.getByText("完整 TSX"));
    expect(codeDetails?.open).toBe(true);
    const code = container.querySelector("details")?.querySelector("pre code")?.textContent ?? "";
    expect(code).toContain("variant-outline");
    expect(code).toContain("size-lg");
    expect(code).toContain("w-full");
    expect(code).toContain("继续");
    expect(code).toContain("细节");
    expect(screen.getByRole("button", { name: "export.copyCode" })).toBeInTheDocument();
    expect(screen.getByTestId("component-usage-guide")).toBeInTheDocument();
    expect(screen.queryByRole("textbox", { name: "图标" })).not.toBeInTheDocument();
  });

  it("treats every non-icon slot as text and does not render its markup", () => {
    const { container } = render(<RecipeWorkbench recipe={makeRecipe()} />);
    const hostileText = "<script>alert(1)</script>";
    fireEvent.change(screen.getByRole("textbox", { name: "辅助文本" }), { target: { value: hostileText } });

    const preview = previewRegion();
    const previewButton = within(preview).getByRole("button");
    expect(previewButton).toHaveTextContent("Continue");
    expect(previewButton).toHaveTextContent(hostileText);
    expect(preview.querySelector("script")).toBeNull();
    fireEvent.click(screen.getByText("完整 TSX"));
    expect(container.querySelector("details")?.querySelector("pre code")?.textContent).toContain(hostileText);
  });

  it("restores defaults, keeps focus indicators, and never uses a native select", () => {
    const { container } = render(<RecipeWorkbench recipe={makeRecipe()} />);

    fireEvent.click(screen.getByRole("button", { name: "描边" }));
    fireEvent.click(screen.getByRole("button", { name: "大号" }));
    fireEvent.click(screen.getByRole("checkbox", { name: "全宽" }));
    fireEvent.change(screen.getByRole("textbox", { name: "按钮文字" }), { target: { value: "改过的文字" } });
    fireEvent.click(screen.getByRole("button", { name: "重置" }));

    expect(screen.getByRole("button", { name: "实心" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "中号" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("checkbox", { name: "全宽" })).not.toBeChecked();
    expect(screen.getByRole("textbox", { name: "按钮文字" })).toHaveValue("Continue");
    expect(within(previewRegion()).getByRole("button")).toHaveClass("variant-solid", "size-md");
    expect(container.querySelector("select")).toBeNull();
    expect(screen.getByRole("button", { name: "实心" })).toHaveClass("focus-visible:outline-2");
    expect(screen.getByRole("textbox", { name: "按钮文字" })).toHaveClass("focus-visible:outline-2");
    expect(screen.getByRole("checkbox", { name: "全宽" })).toHaveClass("focus-visible:outline-2");
  });

  it("starts with fresh values when the recipe changes", () => {
    const firstRecipe = makeRecipe({ id: "button", defaultLabel: "First default" });
    const nextRecipe = makeRecipe({ id: "button", defaultLabel: "Second default" });
    const { rerender } = render(<RecipeWorkbench recipe={firstRecipe} styleSlug="first-style" />);

    fireEvent.change(screen.getByRole("textbox", { name: "按钮文字" }), { target: { value: "Edited first" } });
    rerender(<RecipeWorkbench recipe={nextRecipe} styleSlug="second-style" />);

    expect(screen.getByRole("textbox", { name: "按钮文字" })).toHaveValue("Second default");
    expect(within(previewRegion()).getByRole("button")).toHaveTextContent("Second default");
    expect(screen.queryByText("Edited first")).not.toBeInTheDocument();
  });

  it("shows a friendly error for an empty required text slot", () => {
    const { container } = render(<RecipeWorkbench recipe={makeRecipe()} />);

    fireEvent.change(screen.getByRole("textbox", { name: "按钮文字" }), { target: { value: "" } });

    expect(screen.getByRole("alert")).toHaveTextContent("请填写必填内容");
    expect(screen.getByRole("textbox", { name: "按钮文字" })).toHaveAttribute("aria-invalid", "true");
    expect(container.querySelector("pre code")).toBeNull();
  });

  it("renders a virtual editable label for input recipes without a label slot", () => {
    render(<RecipeWorkbench recipe={makeInputRecipe()} />);

    const labelField = screen.getByRole("textbox", { name: "字段名称" });
    expect(labelField).toHaveValue("Label");
    fireEvent.change(labelField, { target: { value: "邮箱" } });
    expect(within(previewRegion()).getByRole("textbox", { name: "邮箱" })).toBeInTheDocument();
    expect(within(previewRegion()).getByText("邮箱")).toBeInTheDocument();
  });

  it("shows a friendly unsupported message for a recipe with an invalid required icon slot", () => {
    const recipe = makeRecipe();
    recipe.slots.push({ id: "required-icon", label: "Icon", labelZh: "图标", required: true, type: "icon" });

    render(<RecipeWorkbench recipe={recipe} />);

    expect(screen.getByRole("status")).toHaveTextContent("暂不支持在线调参");
  });

  it("uses English labels when the active locale is English", () => {
    i18nState.locale = "en";
    const { container } = render(<RecipeWorkbench recipe={makeRecipe()} />);

    expect(screen.queryByRole("heading", { name: "Component workbench" })).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Outline" })).toHaveAttribute("aria-pressed", "false");
    expect(screen.getByRole("textbox", { name: "Button label" })).toHaveValue("Continue");
    expect(screen.getByRole("button", { name: "Reset" })).toBeInTheDocument();
    expect(screen.getByText("Full TSX")).toBeInTheDocument();
    expect(container.querySelector("details")).not.toHaveAttribute("open");
  });

  it("uses unique label control ids when multiple workbenches render together", () => {
    const { container } = render(
      <>
        <RecipeWorkbench key="first" recipe={makeRecipe()} />
        <RecipeWorkbench key="second" recipe={makeRecipe()} />
      </>
    );
    const ids = [...container.querySelectorAll("input[type='text']")].map((input) => input.id);

    expect(new Set(ids).size).toBe(ids.length);
  });
});
