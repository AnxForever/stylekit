import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/lib/styles/community-runtime", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/styles/community-runtime")>();
  return {
    ...actual,
    resolveStyleBySlug: vi.fn(),
  };
});

import { resolveStyleDelivery } from "@/lib/style-delivery";
import { getStyleBySlug } from "@/lib/styles";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import type { DesignStyle } from "@/lib/styles";

const mockedResolveStyleBySlug = vi.mocked(resolveStyleBySlug);

const communityStyle: DesignStyle = {
  slug: "aurora-community",
  name: "极光社区风",
  nameEn: "Aurora Community",
  description: "Community-submitted aurora style.",
  cover: "/styles/aurora-community/opengraph-image",
  styleType: "visual",
  tags: ["retro"],
  category: "expressive",
  colors: {
    primary: "#2f3cff",
    secondary: "#f6f8ff",
    accent: ["#22d3ee", "#a855f7"],
  },
  keywords: ["aurora", "glow"],
  philosophy: "Blend soft glow with high readability.",
  doList: ["Keep glow effects subtle."],
  dontList: ["Avoid muddy gradients."],
  components: {
    button: {
      name: "Button",
      description: "Primary action",
      code: '<button className="px-4 py-2 rounded">Aurora</button>',
    },
    card: {
      name: "Card",
      description: "Content card",
      code: '<div className="p-4 rounded-xl">Card</div>',
    },
    input: {
      name: "Input",
      description: "Text input",
      code: '<input className="px-3 py-2 rounded" />',
    },
  },
  globalCss: "",
  aiRules: "Prefer layered gradients.",
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("style delivery interface", () => {
  it("assembles complete static capabilities", async () => {
    const style = getStyleBySlug("neo-brutalist");
    expect(style).toBeTruthy();
    mockedResolveStyleBySlug.mockResolvedValueOnce({
      source: "static",
      style: style!,
      tokens: getStyleTokens("neo-brutalist") ?? null,
    });

    const delivery = await resolveStyleDelivery("neo-brutalist");

    expect(delivery?.source).toBe("static");
    expect(delivery?.capabilities.tokens).toBeTruthy();
    expect(delivery?.capabilities.recipes?.styleSlug).toBe("neo-brutalist");
    expect(delivery?.capabilities.readiness.source).toBe("curated");
    expect(delivery?.capabilities.accessibility).toBeTruthy();
    expect(delivery?.capabilities.versioning?.current).toBeTruthy();
    expect(delivery?.capabilities.exports.ideConfigs).toBe(true);
  });

  it("assembles explicit community fallbacks without leaking source branching", async () => {
    mockedResolveStyleBySlug.mockResolvedValueOnce({
      source: "community",
      style: communityStyle,
      submissionId: "sub-community-1",
      tokens: null,
    });

    const delivery = await resolveStyleDelivery("aurora-community");

    expect(delivery?.source).toBe("community");
    expect(delivery?.submissionId).toBe("sub-community-1");
    expect(delivery?.capabilities.tokens).toBeNull();
    expect(delivery?.capabilities.recipes?.recipes.button.skeleton.structure).toContain(
      "Aurora",
    );
    expect(delivery?.capabilities.recipes?.recipes.button.variants.default).toBeTruthy();
    expect(delivery?.capabilities.readiness.source).toBe("fallback");
    expect(delivery?.capabilities.accessibility).toBeNull();
    expect(delivery?.capabilities.versioning).toBeNull();
    expect(delivery?.capabilities.exports.ideConfigs).toBe(false);
  });

  it("returns null when neither adapter resolves a style", async () => {
    mockedResolveStyleBySlug.mockResolvedValueOnce(null);

    await expect(resolveStyleDelivery("missing-style")).resolves.toBeNull();
  });
});
