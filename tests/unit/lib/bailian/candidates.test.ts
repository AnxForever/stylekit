import { describe, expect, it } from "vitest";

import { buildStyleCandidates, styleCandidateCount } from "@/lib/bailian/candidates";
import { buildStyleIntentPrompt } from "@/lib/bailian/prompt";
import { stylesMeta } from "@/lib/styles/meta";

describe("style candidate pool", () => {
  it("offers the whole catalog, not a four-style sample", () => {
    const candidates = buildStyleCandidates();

    expect(candidates).toHaveLength(stylesMeta.length);
    expect(styleCandidateCount()).toBe(stylesMeta.length);
    expect(candidates.length).toBeGreaterThan(100);
  });

  it("carries the facets a planner needs to discriminate", () => {
    const candidate = buildStyleCandidates({ only: ["neo-brutalist"] })[0];

    expect(candidate).toMatchObject({
      slug: "neo-brutalist",
      category: "expressive",
    });
    expect(candidate.name).toBeTruthy();
    expect(candidate.description).toBeTruthy();
    expect(candidate.primaryColor).toMatch(/^#[0-9a-f]{3,8}$/i);
  });

  it("gives every candidate a non-empty description", () => {
    const blank = buildStyleCandidates().filter(
      (candidate) => !candidate.description.trim(),
    );

    expect(blank).toEqual([]);
  });

  it("drops slugs that are not in the catalog", () => {
    const candidates = buildStyleCandidates({
      only: ["glassmorphism", "definitely-not-a-style"],
    });

    expect(candidates.map((candidate) => candidate.slug)).toEqual([
      "glassmorphism",
    ]);
  });

  it("honours limit", () => {
    expect(buildStyleCandidates({ limit: 5 })).toHaveLength(5);
  });
});

describe("candidate rendering in the planner prompt", () => {
  it("renders facets for enriched candidates", () => {
    const prompt = buildStyleIntentPrompt(
      "Build a streetwear landing page.",
      buildStyleCandidates({ only: ["neo-brutalist"] }),
    );

    expect(prompt).toContain("neo-brutalist");
    expect(prompt).toContain("expressive");
    expect(prompt).toContain("#000000");
  });

  it("keeps the bare four-style shape when no facets are supplied", () => {
    const prompt = buildStyleIntentPrompt("Build a dashboard.", [
      { slug: "editorial", nameEn: "Editorial", description: "Editorial" },
    ]);

    const candidateLine = prompt
      .split("\n")
      .find((line) => line.startsWith("- editorial:"));

    expect(candidateLine).toBe("- editorial: Editorial — Editorial");
  });

  it("tells the model how many candidates there are", () => {
    const prompt = buildStyleIntentPrompt("Build a blog.", buildStyleCandidates());

    expect(prompt).toContain(`Candidate styles (${stylesMeta.length} total`);
  });
});
