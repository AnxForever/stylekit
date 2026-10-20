import { afterEach, describe, expect, it, vi } from "vitest";
import { createImplementationBrief, getImplementationBrief } from "@/lib/implementation-brief";
import {
  clearRemoteCache,
  getImplementationBriefLive,
  getTokensLive,
} from "@/packages/core/src/discovery/remote";
import { projectImplementationBrief } from "@/lib/implementation-brief-projection";
import { getTokens } from "@/lib/discovery";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";
import { rulesFromBrief } from "@/packages/core/src/discovery/live-lint";

afterEach(() => {
  clearRemoteCache();
  vi.unstubAllGlobals();
});

describe("live implementation brief projection cache", () => {
  it("keeps the cached full brief intact after a consumer changes a projected recipe", async () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const originalClass = brief.recipes.button.skeleton.baseClasses[0];
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(brief), {
      status: 200,
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchMock);
    const options = { baseUrl: "https://brief-projection-cache.test" };

    const first = await getImplementationBriefLive("neo-brutalist", options);
    const projected = projectImplementationBrief(first.data!, {
      sections: ["recipes"],
      componentIds: ["button"],
    });
    projected.recipes!.button.skeleton.baseClasses[0] = "consumer mutation";

    const cached = await getImplementationBriefLive("neo-brutalist", options);

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(Object.keys(cached.data!.recipes)).toEqual(expect.arrayContaining(["button", "card", "input"]));
    expect(cached.data!.recipes.button.skeleton.baseClasses[0]).toBe(originalClass);
  });

  it("accepts valid lint-v2 exceptions and rejects malformed exceptions in briefs and tokens", async () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const exception = {
      className: "w-4",
      reason: "A small icon may use a fixed width.",
      variants: { all: ["hover"] },
    };
    const validV2 = {
      ...brief,
      lintRules: {
        ...brief.lintRules,
        schemaVersion: "stylekit-lint-v2",
        forbiddenExceptions: [exception],
      },
    };
    const invalidV2 = {
      ...validV2,
      lintRules: {
        ...validV2.lintRules,
        forbiddenExceptions: [{ ...exception, unexpected: true }],
      },
    };
    const validResponse = vi.fn().mockResolvedValue(new Response(JSON.stringify(validV2), {
      status: 200,
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", validResponse);

    const accepted = await getImplementationBriefLive("neo-brutalist", { baseUrl: "https://valid-lint-v2.test" });

    expect(accepted.origin).toBe("live");
    expect(accepted.data?.lintRules.schemaVersion).toBe("stylekit-lint-v2");

    clearRemoteCache();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(invalidV2), {
      status: 200,
      headers: { "content-type": "application/json" },
    })));

    const rejectedBrief = await getImplementationBriefLive("neo-brutalist", { baseUrl: "https://invalid-lint-v2.test" });

    expect(rejectedBrief.origin).toBe("bundled");
    expect(rejectedBrief.fallbackReason).toContain("stylekit-brief-v1 contract");

    const localTokens = getTokens("neo-brutalist")!;
    const invalidTokens = {
      ...localTokens,
      forbidden: {
        ...localTokens.forbidden,
        exceptions: [{ className: "w-4", reason: "Empty scope", variants: { all: [] } }],
      },
    };
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({
      styleSlug: "neo-brutalist",
      tokens: invalidTokens,
    }), {
      status: 200,
      headers: { "content-type": "application/json" },
    })));

    const rejectedTokens = await getTokensLive("neo-brutalist", { baseUrl: "https://invalid-token-exception.test" });

    expect(rejectedTokens.origin).toBe("bundled");
    expect(rejectedTokens.fallbackReason).toContain("malformed payload");
  });

  it("requires every token exception in the v2 lint contract regardless of object key order", async () => {
    const base = getImplementationBrief("neo-brutalist")!;
    const style = getStyleBySlug(base.slug)!;
    const tokenException = {
      element: { classesAll: ["inline-flex"], tags: ["button"] },
      variants: { all: ["hover"] },
      reason: "A fixed-width icon is allowed on hover.",
      className: "w-4",
    };
    const tokens = {
      ...base.tokens!,
      forbidden: { ...base.tokens!.forbidden, exceptions: [tokenException] },
    };
    const consistent = createImplementationBrief(style, {
      tokens,
      recipes: getStyleRecipes(base.slug)!,
      readiness: base.readiness,
    }, "community");

    expect(consistent.lintRules.schemaVersion).toBe("stylekit-lint-v2");
    expect(rulesFromBrief(consistent)).not.toBeNull();

    const validResponse = vi.fn().mockResolvedValue(new Response(JSON.stringify(consistent), {
      status: 200,
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", validResponse);
    const accepted = await getImplementationBriefLive("neo-brutalist", { baseUrl: "https://reordered-exception.test" });
    expect(accepted.origin).toBe("live");

    const mixedV1 = structuredClone(consistent);
    const mixedLintRules = mixedV1.lintRules as unknown as Record<string, unknown>;
    mixedLintRules.schemaVersion = "stylekit-lint-v1";
    delete mixedLintRules.forbiddenExceptions;
    expect(rulesFromBrief(mixedV1)).toBeNull();

    const missingV2 = structuredClone(consistent);
    const missingLintRules = missingV2.lintRules as unknown as Record<string, unknown>;
    missingLintRules.forbiddenExceptions = [];
    expect(rulesFromBrief(missingV2)).toBeNull();

    for (const [baseUrl, invalid] of [
      ["https://mixed-v1-token-exception.test", mixedV1],
      ["https://missing-v2-token-exception.test", missingV2],
    ] as const) {
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(invalid), {
        status: 200,
        headers: { "content-type": "application/json" },
      })));
      const rejected = await getImplementationBriefLive("neo-brutalist", { baseUrl });
      expect(rejected.origin).toBe("bundled");
      expect(rejected.fallbackReason).toContain("stylekit-brief-v1 contract");
      clearRemoteCache();
    }
  });
});
