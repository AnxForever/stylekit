import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({
  trackStyleUsage: vi.fn(),
}));

vi.mock("@/lib/styles/community-runtime", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/styles/community-runtime")>();
  return {
    ...actual,
    resolveStyleBySlug: vi.fn(actual.resolveStyleBySlug),
  };
});

vi.mock("@/lib/style-delivery", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/style-delivery")>();
  return {
    ...actual,
    resolveStyleDelivery: vi.fn(actual.resolveStyleDelivery),
  };
});

import { GET as getStyleDetail } from "@/app/api/styles/[slug]/route";
import { GET as getStyleTokens } from "@/app/api/styles/[slug]/tokens/route";
import { GET as getStyleRecipes } from "@/app/api/styles/[slug]/recipes/route";
import { GET as getStyleMarkdown } from "@/app/api/styles/[slug]/md/route";
import { GET as getClaudeRules } from "@/app/api/styles/[slug]/claude-rules/route";
import { GET as getCursorRules } from "@/app/api/styles/[slug]/cursorrules/route";
import { GET as getSkillPack } from "@/app/api/styles/[slug]/skill-pack/route";
import { GET as getVersions } from "@/app/api/styles/[slug]/versions/route";
import { resolveStyleBySlug } from "@/lib/styles/community-runtime";
import { resolveStyleDelivery } from "@/lib/style-delivery";
import type { DesignStyle } from "@/lib/styles";

const params = (slug: string) => Promise.resolve({ slug });
const mockedResolveStyleBySlug = vi.mocked(resolveStyleBySlug);
const mockedResolveStyleDelivery = vi.mocked(resolveStyleDelivery);

describe("styles [slug] core routes", () => {
  it("style detail returns 404 for missing slug", async () => {
    const response = await getStyleDetail(
      new Request("https://stylekit.top/api/styles/not-exist"),
      { params: params("not-exist") },
    );
    expect(response.status).toBe(404);
  });

  it("style detail returns expanded style payload", async () => {
    const response = await getStyleDetail(
      new Request("https://stylekit.top/api/styles/neo-brutalist"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      slug: string;
      tokens: unknown;
      readiness: {
        source: string;
        coverage: { overall: number; darkMode: number; states: number };
        darkMode: { support: string };
        states: { loading: { support: string }; error: { support: string } };
      };
    };
    expect(body.slug).toBe("neo-brutalist");
    expect(body.tokens).toBeTruthy();
    expect(body.readiness.source).toBe("curated");
    expect(body.readiness.coverage.overall).toBeGreaterThan(0);
    expect(body.readiness.coverage.darkMode).toBeGreaterThan(0);
    expect(body.readiness.coverage.states).toBeGreaterThan(0);
    expect(body.readiness.darkMode.support).toBe("partial");
    expect(body.readiness.states.loading.support).toBeTruthy();
    expect(body.readiness.states.error.support).toBeTruthy();
  });

  it("tokens route handles missing and valid style", async () => {
    const missing = await getStyleTokens(
      new Request("https://stylekit.top/api/styles/not-exist/tokens"),
      { params: params("not-exist") },
    );
    expect(missing.status).toBe(404);

    const ok = await getStyleTokens(
      new Request("https://stylekit.top/api/styles/neo-brutalist/tokens"),
      { params: params("neo-brutalist") },
    );
    expect(ok.status).toBe(200);
    const body = (await ok.json()) as { styleSlug: string; tokens: unknown };
    expect(body.styleSlug).toBe("neo-brutalist");
    expect(body.tokens).toBeTruthy();
  });

  it("recipes route handles missing and valid style", async () => {
    const missing = await getStyleRecipes(
      new Request("https://stylekit.top/api/styles/not-exist/recipes"),
      { params: params("not-exist") },
    );
    expect(missing.status).toBe(404);

    const ok = await getStyleRecipes(
      new Request("https://stylekit.top/api/styles/neo-brutalist/recipes"),
      { params: params("neo-brutalist") },
    );
    expect(ok.status).toBe(200);
    const body = (await ok.json()) as { styleSlug: string; recipes: unknown };
    expect(body.styleSlug).toBe("neo-brutalist");
    expect(body.recipes).toBeTruthy();
  });

  it("recipes route returns synthesized recipes for community style", async () => {
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
          code: "<button className=\"px-4 py-2 rounded\">Aurora</button>",
        },
        card: {
          name: "Card",
          description: "Content card",
          code: "<div className=\"p-4 rounded-xl\">Card</div>",
        },
        input: {
          name: "Input",
          description: "Text input",
          code: "<input className=\"px-3 py-2 rounded\" />",
        },
      },
      globalCss: "",
      aiRules: "Prefer layered gradients.",
    };

    mockedResolveStyleBySlug.mockResolvedValueOnce({
      source: "community",
      style: communityStyle,
      submissionId: "sub-community-1",
      tokens: null,
    });

    const response = await getStyleRecipes(
      new Request("https://stylekit.top/api/styles/aurora-community/recipes"),
      { params: params("aurora-community") },
    );

    expect(response.status).toBe(200);
    const body = (await response.json()) as {
      styleSlug: string;
      recipes: Record<string, { variants: Record<string, unknown>; skeleton: { structure?: string } }>;
    };
    expect(body.styleSlug).toBe("aurora-community");
    expect(body.recipes.button).toBeTruthy();
    expect(body.recipes.button.variants.default).toBeTruthy();
    expect(body.recipes.button.skeleton.structure).toContain("Aurora");
    expect(mockedResolveStyleDelivery).toHaveBeenCalledWith("aurora-community");
  });

  it("markdown route returns markdown content", async () => {
    const response = await getStyleMarkdown(
      new Request("https://stylekit.top/api/styles/neo-brutalist/md"),
      { params: params("neo-brutalist") },
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toContain("text/markdown");
    const text = await response.text();
    expect(text).toContain("**Slug**: `neo-brutalist`");
  });

  it("rules and skill-pack exports return downloadable content", async () => {
    const claude = await getClaudeRules(
      new Request("https://stylekit.top/api/styles/neo-brutalist/claude-rules"),
      { params: params("neo-brutalist") },
    );
    expect(claude.status).toBe(200);
    expect(claude.headers.get("content-disposition")).toContain("neo-brutalist.md");

    const cursor = await getCursorRules(
      new Request("https://stylekit.top/api/styles/neo-brutalist/cursorrules"),
      { params: params("neo-brutalist") },
    );
    expect(cursor.status).toBe(200);
    expect(cursor.headers.get("content-disposition")).toContain(".cursorrules");

    const skill = await getSkillPack(
      new Request("https://stylekit.top/api/styles/neo-brutalist/skill-pack"),
      { params: params("neo-brutalist") },
    );
    expect(skill.status).toBe(200);
    expect(skill.headers.get("content-disposition")).toContain("neo-brutalist-SKILL.md");
  });

  it("versions route returns history and specific version data", async () => {
    const historyResponse = await getVersions(
      {
        nextUrl: new URL("https://stylekit.top/api/styles/neo-brutalist/versions"),
      } as never,
      { params: params("neo-brutalist") },
    );
    expect(historyResponse.status).toBe(200);
    const history = (await historyResponse.json()) as {
      current: string;
      versions: Array<{ version: string }>;
    };
    expect(history.current).toBeTruthy();
    expect(history.versions.length).toBeGreaterThan(0);

    const targetVersion = history.versions[0]?.version;
    const versionResponse = await getVersions(
      {
        nextUrl: new URL(
          `https://stylekit.top/api/styles/neo-brutalist/versions?version=${targetVersion}`,
        ),
      } as never,
      { params: params("neo-brutalist") },
    );
    expect(versionResponse.status).toBe(200);
    const payload = (await versionResponse.json()) as { version: string; tokens: unknown };
    expect(payload.version).toBe(targetVersion);
    expect(payload.tokens).toBeTruthy();
  });
});
