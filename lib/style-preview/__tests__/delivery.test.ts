import { describe, expect, it } from "vitest";
import approvedPreviews from "@/tests/visual/approved-preview-baseline.json";
import {
  loadStylePreview,
  stylePreviewSlugs,
} from "@/lib/style-preview/delivery";
import { isPendingStyleSlug } from "@/lib/styles/review-status";

describe("style preview delivery", () => {
  it("exposes every approved preview through one delivery interface", async () => {
    expect(stylePreviewSlugs.filter((slug) => !isPendingStyleSlug(slug)).sort()).toEqual(
      [...approvedPreviews.slugs].sort()
    );

    const preview = await loadStylePreview("neo-brutalist");

    expect(preview?.button).toBeTypeOf("function");
    expect(preview?.card).toBeTypeOf("function");
    expect(preview?.input).toBeTypeOf("function");
    expect(preview?.coverPreview).toBeTypeOf("function");
  });

  it("keeps pending previews loadable without treating them as approved", async () => {
    expect(isPendingStyleSlug("pastel-ui")).toBe(true);
    await expect(loadStylePreview("pastel-ui")).resolves.toMatchObject({
      coverPreview: expect.any(Function),
    });
  });

  it("returns null for a slug outside the approved registry", async () => {
    await expect(loadStylePreview("not-a-style")).resolves.toBeNull();
  });
});
