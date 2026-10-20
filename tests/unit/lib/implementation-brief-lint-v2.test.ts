import { describe, expect, it } from "vitest";
import { createImplementationBrief, getImplementationBrief, serializeLintRules } from "@/lib/implementation-brief";
import { mergeRulesFromTokens } from "@/lib/styles/style-linter";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleRecipes } from "@/lib/recipes";
import type { StyleLintException } from "@/lib/styles/tokens";

describe("implementation brief scoped lint exceptions", () => {
  it("serializes scoped exceptions as lint-v2 and includes them in the full brief hash", () => {
    const base = getImplementationBrief("neo-brutalist")!;
    const style = getStyleBySlug(base.slug)!;
    const exception: StyleLintException = {
      className: "w-4",
      reason: "A small icon inside a button may use this fixed width.",
      variants: { all: ["hover"] },
      element: { tags: ["button"], classesAll: ["inline-flex"] },
    };
    const tokensWithException = {
      ...base.tokens!,
      forbidden: {
        ...base.tokens!.forbidden,
        exceptions: [exception],
      },
    };
    const rules = mergeRulesFromTokens(tokensWithException);
    const serialized = serializeLintRules(rules);
    const community = createImplementationBrief(style, {
      tokens: tokensWithException,
      recipes: getStyleRecipes(base.slug)!,
      readiness: base.readiness,
    }, "community");
    const communityWithoutException = createImplementationBrief(style, {
      tokens: base.tokens,
      recipes: getStyleRecipes(base.slug)!,
      readiness: base.readiness,
    }, "community");

    expect(serialized.schemaVersion).toBe("stylekit-lint-v2");
    expect(serialized.forbiddenExceptions).toEqual([exception]);
    expect(community.lintRules.schemaVersion).toBe("stylekit-lint-v2");
    expect(community.lintRules.forbiddenExceptions).toEqual([exception]);
    expect(community.provenance.contentHash).not.toBe(communityWithoutException.provenance.contentHash);
  });

  it("keeps lint-v1 for briefs with no scoped exceptions", () => {
    const rules = mergeRulesFromTokens(undefined);
    const serialized = serializeLintRules(rules);

    expect(serialized.schemaVersion).toBe("stylekit-lint-v1");
    expect(serialized).not.toHaveProperty("forbiddenExceptions");
  });
});
