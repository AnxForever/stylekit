import { describe, expect, it } from "vitest";
import approvedPreviews from "@/tests/visual/approved-preview-baseline.json";
import {
  loadStylePreview,
  stylePreviewSlugs,
} from "@/lib/style-preview/delivery";

describe("style preview delivery", () => {
  it("exposes every approved preview through one delivery interface", async () => {
    expect([...stylePreviewSlugs].sort()).toEqual(
      [...approvedPreviews.slugs].sort()
    );

    const preview = await loadStylePreview("neo-brutalist");

    expect(preview?.button).toBeTypeOf("function");
    expect(preview?.card).toBeTypeOf("function");
    expect(preview?.input).toBeTypeOf("function");
    expect(preview?.coverPreview).toBeTypeOf("function");
  });

  it("returns null for a slug outside the approved registry", async () => {
    await expect(loadStylePreview("not-a-style")).resolves.toBeNull();
  });
});
