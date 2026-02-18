import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/analytics", () => ({
  trackStyleUsage: vi.fn(),
}));

import { GET as getStyleDetail } from "@/app/api/styles/[slug]/route";
import { GET as getStyleTokens } from "@/app/api/styles/[slug]/tokens/route";
import { GET as getStyleRecipes } from "@/app/api/styles/[slug]/recipes/route";
import { GET as getStyleMarkdown } from "@/app/api/styles/[slug]/md/route";
import { GET as getClaudeRules } from "@/app/api/styles/[slug]/claude-rules/route";
import { GET as getCursorRules } from "@/app/api/styles/[slug]/cursorrules/route";
import { GET as getSkillPack } from "@/app/api/styles/[slug]/skill-pack/route";
import { GET as getVersions } from "@/app/api/styles/[slug]/versions/route";

const params = (slug: string) => Promise.resolve({ slug });

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
    const body = (await response.json()) as { slug: string; tokens: unknown };
    expect(body.slug).toBe("neo-brutalist");
    expect(body.tokens).toBeTruthy();
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
