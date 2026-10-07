// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { GradientsContent } from "@/components/gradients/gradients-content";
import { gradients } from "@/lib/gradients";

vi.mock("@/lib/i18n/context", () => {
  const messages: Record<string, string> = {
    "gradients.subtitle": "渐变工具",
    "gradients.title": "渐变色库",
    "gradients.description": "渐变说明",
    "gradients.type": "类型",
    "gradients.type.allHint": "按类型筛选",
    "gradients.type.linear": "线性",
    "gradients.type.linearHint": "线性说明",
    "gradients.type.radial": "径向",
    "gradients.type.radialHint": "径向说明",
    "gradients.type.conic": "锥形",
    "gradients.type.conicHint": "锥形说明",
    "gradients.type.mesh": "网格",
    "gradients.type.meshHint": "网格说明",
    "gradients.tailwindNote": "Tailwind 说明",
    "gradients.copySwatch": "点击色块复制",
    "gradients.angle": "渐变角度",
    "gradients.resetAngle": "重置",
    "gradients.copied": "已复制",
    "gradients.copyCss": "复制 CSS",
    "gradients.copyTailwind": "Tailwind",
    "gradients.adjust": "调整",
    "gradients.colorFormat": "色值格式",
    "gradients.filterAll": "全部",
    "gradients.searchPlaceholder": "搜索渐变...",
    "gradients.showing": "共",
    "gradients.gradients": "个渐变",
    "gradients.noResults": "没有匹配结果",
  };

  return {
    useI18n: () => ({ locale: "zh", t: (key: string) => messages[key] ?? key }),
  };
});

vi.mock("@/lib/kit/context", () => ({
  useKit: () => ({ hasItem: () => false, toggleItem: () => undefined }),
}));

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, "clipboard");
const testGradient = gradients.find((gradient) => !gradient.type || gradient.type === "linear");

afterEach(() => {
  cleanup();
  if (clipboardDescriptor) Object.defineProperty(navigator, "clipboard", clipboardDescriptor);
  else Reflect.deleteProperty(navigator, "clipboard");
});

describe("gradient card controls", () => {
  it("keeps the two main actions visible and tucks exact adjustments into a disclosure", async () => {
    if (!testGradient) throw new Error("Expected at least one linear gradient");

    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(<GradientsContent />);

    const card = screen.getByRole("article", { name: testGradient.nameZh });
    expect(within(card).getByRole("button", { name: "复制 CSS" })).toBeVisible();
    expect(within(card).getByRole("button", { name: "+ Kit" })).toBeVisible();
    const disclosure = within(card).getByText("调整").closest("details");
    expect(disclosure).not.toHaveAttribute("open");
    expect(disclosure).toContainElement(within(card).getByRole("button", { name: "Tailwind" }));
    // Happy DOM does not implement the browser's native summary activation.
    // Keyboard activation and hidden controls are covered by browser verification.
    disclosure?.setAttribute("open", "");
    expect(disclosure).toHaveAttribute("open");

    const angle = within(card).getByRole("slider", { name: "渐变角度" });
    fireEvent.change(angle, { target: { value: "25" } });
    expect(angle).toHaveValue("25");
    fireEvent.click(within(card).getByRole("button", { name: "Tailwind" }));

    await waitFor(() => {
      expect(writeText).toHaveBeenCalledWith(
        "bg-[linear-gradient(25deg,_#ffffc4_0%,_#ff6164_50%,_#b00012_100%)]",
      );
    });
  });
});
