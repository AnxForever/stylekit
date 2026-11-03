// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { StyleRecipe } from "@/lib/styles/recipe-types";

const { trackEventMock, useI18nMock } = vi.hoisted(() => ({
  trackEventMock: vi.fn(),
  useI18nMock: vi.fn(),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/lib/analytics/events", () => ({
  trackEvent: trackEventMock,
}));

vi.mock("@/lib/styles/recipe-selectors", () => ({
  getRecipesByUseCase: vi.fn(() => []),
  getRecipesByVisualStyle: vi.fn(() => []),
}));

import { RecipeDetailContent } from "@/app/recipes/[id]/_content";

const recipe: StyleRecipe = {
  id: "neo-saas-landing",
  name: "Neo Brutalist SaaS Landing",
  nameZh: "新粗野主义 SaaS 落地页",
  description: "A bold landing page recipe.",
  descriptionZh: "一套醒目的落地页配方。",
  useCase: "saas-landing" as const,
  tags: ["modern", "bold"],
  visualStyle: "neo-brutalist",
  layout: "dashboard",
  reasoning: "Strong contrast makes the primary action clear.",
  reasoningZh: "高对比度让主要操作更清晰。",
};

describe("RecipeDetailContent prompt copy analytics", () => {
  const writeTextMock = vi.fn();

  beforeEach(() => {
    trackEventMock.mockReset();
    writeTextMock.mockReset();
    writeTextMock.mockResolvedValue(undefined);
    useI18nMock.mockReturnValue({ locale: "en", t: (key: string) => key, setLocale: vi.fn() });
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText: writeTextMock },
    });
  });

  it("counts one successful prompt copy against the recipe visual style", async () => {
    render(<RecipeDetailContent recipe={recipe} visualStyle={undefined} layoutStyle={undefined} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy AI Prompt" }));

    await waitFor(() => expect(writeTextMock).toHaveBeenCalledTimes(1));
    expect(writeTextMock.mock.calls[0]?.[0]).toContain("Design Style: neo-brutalist");
    await waitFor(() => expect(trackEventMock).toHaveBeenCalledTimes(1));
    expect(trackEventMock).toHaveBeenCalledWith("prompt_copy", {
      slug: "neo-brutalist",
      prompt_type: "recipe",
      source: "recipe",
      locale: "en",
    });
    expect(screen.getByRole("button", { name: "Prompt Copied" })).toBeInTheDocument();
  });

  it("shows manual-copy feedback and does not count a failed clipboard write", async () => {
    writeTextMock.mockRejectedValueOnce(new Error("clipboard denied"));
    render(<RecipeDetailContent recipe={recipe} visualStyle={undefined} layoutStyle={undefined} />);

    fireEvent.click(screen.getByRole("button", { name: "Copy AI Prompt" }));

    const manualCopy = await screen.findByRole("textbox", {
      name: "Code to copy manually",
    }) as HTMLTextAreaElement;
    expect(manualCopy.value).toContain("Design Style: neo-brutalist");
    expect(trackEventMock).not.toHaveBeenCalled();
    expect(screen.getByRole("button", { name: "Copy AI Prompt" })).toBeInTheDocument();
  });
});
