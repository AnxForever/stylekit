// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";

const { useI18nMock, exportBlendedTokensMock } = vi.hoisted(() => ({
  useI18nMock: vi.fn(),
  exportBlendedTokensMock: vi.fn(() => "{}"),
}));

vi.mock("@/lib/i18n/context", () => ({
  useI18n: useI18nMock,
}));

vi.mock("@/lib/styles/blend-engine", () => ({
  exportBlendedTokens: exportBlendedTokensMock,
}));

vi.mock("@/lib/styles/index", () => ({
  styles: [
    { slug: "apple-style", nameEn: "Apple Style" },
    { slug: "neo-brutalist", nameEn: "Neo Brutalist" },
  ],
}));

import { StyleGenResult } from "@/components/ai-generator/style-gen-result";
import type { GeneratedStyle } from "@/lib/ai-generator";

const sampleResult: GeneratedStyle = {
  name: "Futuristic Fusion",
  description: "Generated from: Apple Style, Neo Brutalist.",
  confidence: 82,
  sourceStyles: [
    { slug: "apple-style", weight: 0.65 },
    { slug: "neo-brutalist", weight: 0.02 },
  ],
  reasoning: [
    "Anchored to Apple Style.",
    "Applied negative constraints: brutalist.",
  ],
  insights: {
    baseStyle: "apple-style",
    detectedStyles: ["apple-style"],
    avoidedStyles: ["neo-brutalist"],
    matchedKeywords: ["clean", "futuristic"],
    negativeKeywords: ["brutalist"],
  },
  tokens: {
    colors: {
      background: {
        primary: "bg-zinc-950",
        secondary: "bg-zinc-900",
        accent: ["bg-cyan-500"],
      },
      text: {
        primary: "text-zinc-50",
        secondary: "text-zinc-200",
        muted: "text-zinc-400",
      },
      button: {
        primary: "bg-cyan-500 text-zinc-950",
        secondary: "bg-zinc-900 text-zinc-50",
      },
    },
    typography: {
      heading: "font-sans",
      body: "font-sans",
      mono: "font-mono",
      sizes: {
        hero: "text-6xl",
        h1: "text-4xl",
        h2: "text-3xl",
        h3: "text-2xl",
        body: "text-base",
        small: "text-sm",
      },
    },
    spacing: {
      section: "py-16",
      container: "max-w-6xl mx-auto px-6",
      card: "p-6",
      gap: {
        sm: "gap-2",
        md: "gap-4",
        lg: "gap-8",
      },
    },
    border: {
      width: "border",
      color: "border-zinc-800",
      radius: "rounded-xl",
      style: "border-solid",
    },
    shadow: {
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
      none: "shadow-none",
      hover: "hover:shadow-xl",
      focus: "focus:ring-2 focus:ring-cyan-500/50",
      colored: {
        primary: "shadow-cyan-500/40",
      },
    },
    interaction: {
      transition: "transition-all duration-300 ease-out",
      hoverScale: "hover:scale-[1.02]",
      hoverTranslate: "",
      active: "active:scale-[0.99]",
    },
    forbidden: {
      classes: [],
      patterns: [],
      reasons: {},
    },
    required: {
      button: ["inline-flex"],
      card: ["rounded-xl"],
      input: ["border"],
    },
  },
};

describe("StyleGenResult", () => {
  beforeEach(() => {
    useI18nMock.mockReturnValue({
      t: (key: string) => key,
      locale: "en",
      setLocale: vi.fn(),
    });
  });

  it("renders reasoning and detection signals", () => {
    render(<StyleGenResult result={sampleResult} />);

    expect(screen.getByText("aiGen.reasoning")).toBeInTheDocument();
    expect(screen.getByText("Anchored to Apple Style.")).toBeInTheDocument();
    expect(screen.getByText("Applied negative constraints: brutalist.")).toBeInTheDocument();

    expect(screen.getByText("aiGen.signals")).toBeInTheDocument();
    expect(screen.getByText("clean")).toBeInTheDocument();
    expect(screen.getByText("futuristic")).toBeInTheDocument();
    expect(screen.getByText("brutalist")).toBeInTheDocument();
  });

  it("renders source style influence bars with percentage floor", () => {
    render(<StyleGenResult result={sampleResult} />);

    expect(screen.getAllByText("Apple Style").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("Neo Brutalist").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText("65%")).toBeInTheDocument();
    expect(screen.getByText("2%")).toBeInTheDocument();

    expect(screen.getByLabelText("Apple Style influence 65%")).toHaveStyle({ width: "65%" });
    expect(screen.getByLabelText("Neo Brutalist influence 2%")).toHaveStyle({ width: "4%" });
  });
});
