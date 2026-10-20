import { describe, expect, it } from "vitest";
import { getImplementationBrief } from "@/lib/implementation-brief";
import {
  ImplementationBriefProjectionError,
  projectImplementationBrief,
  type ImplementationBriefProjectionErrorCode,
} from "@/lib/implementation-brief-projection";

function expectProjectionError(run: () => unknown, code: ImplementationBriefProjectionErrorCode): void {
  let thrown: unknown;
  try {
    run();
  } catch (error) {
    thrown = error;
  }
  expect(thrown).toBeInstanceOf(ImplementationBriefProjectionError);
  expect(thrown).toMatchObject({ name: "ImplementationBriefProjectionError", code });
}

describe("implementation brief projection", () => {
  it("keeps the full brief and its provenance intact in full mode", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const projected = projectImplementationBrief(brief);
    const { projection, ...payload } = projected;

    expect(payload).toEqual(brief);
    expect(projection).toMatchObject({
      complete: true,
      mode: "full",
      excludedSections: [],
      componentFilter: null,
      lintRulesIncluded: true,
      lintRulesComplete: true,
    });
    expect(projectImplementationBrief(brief).provenance.contentHash).toBe(brief.provenance.contentHash);
  });

  it("projects selected sections and component IDs without mutating the cached source", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const originalComponents = brief.components;
    const originalHash = brief.provenance.contentHash;
    const briefWithTransport = { ...brief, transport: { origin: "live" } };
    const projected = projectImplementationBrief(briefWithTransport, {
      sections: ["identity", "components"],
      componentIds: ["button"],
    });

    expect(projected.schemaVersion).toBe(brief.schemaVersion);
    expect(projected.slug).toBe(brief.slug);
    expect(projected.provenance).toEqual(brief.provenance);
    expect(projected.provenance.contentHash).toBe(originalHash);
    expect(projected.components).toEqual({ button: brief.components.button });
    expect(projected).toHaveProperty("transport", { origin: "live" });
    expect(projected).not.toHaveProperty("recipes");
    expect(projected).not.toHaveProperty("lintRules");
    expect(projected.projection).toMatchObject({
      complete: false,
      mode: "partial",
      includedSections: ["identity", "components"],
      componentFilter: ["button"],
      lintRulesIncluded: false,
      lintRulesComplete: false,
    });
    expect(brief.components).toBe(originalComponents);
    expect(brief.provenance.contentHash).toBe(originalHash);

    projected.components!.button.code = "Changed by projection consumer";
    expect(brief.components.button.code).not.toBe("Changed by projection consumer");
  });

  it("marks a selected lint contract explicitly even when the whole brief is partial", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const projected = projectImplementationBrief(brief, { sections: ["identity", "lintRules"] });

    expect(projected.lintRules).toEqual(brief.lintRules);
    expect(projected.projection).toMatchObject({
      complete: false,
      lintRulesIncluded: true,
      lintRulesComplete: true,
    });
    expect(projected.projection.notice).toContain("Partial implementation brief excerpt");
  });

  it("filters recipe IDs when only the recipes section is selected", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    const originalClass = brief.recipes.button.skeleton.baseClasses[0];
    const projected = projectImplementationBrief(brief, {
      sections: ["tokens", "recipes"],
      componentIds: ["button"],
    });

    expect(projected.recipes).toEqual({ button: brief.recipes.button });
    expect(projected).not.toHaveProperty("components");
    expect(projected.projection.complete).toBe(false);
    projected.recipes!.button.skeleton.baseClasses[0] = "consumer mutation";
    expect(brief.recipes.button.skeleton.baseClasses[0]).toBe(originalClass);
  });

  it("rejects empty and unknown sections and invalid component selections", () => {
    const brief = getImplementationBrief("neo-brutalist")!;
    expectProjectionError(
      () => projectImplementationBrief(brief, { sections: [] }),
      "empty_sections",
    );
    expectProjectionError(
      () => projectImplementationBrief(brief, { sections: ["unknown" as "identity"] }),
      "unknown_section",
    );
    expectProjectionError(
      () => projectImplementationBrief(brief, { sections: ["identity"], componentIds: ["button"] }),
      "component_ids_require_components",
    );
    expectProjectionError(
      () => projectImplementationBrief(brief, { sections: ["components"], componentIds: ["toast"] }),
      "unknown_component",
    );
    expectProjectionError(
      () => projectImplementationBrief(brief, { sections: ["components"], componentIds: [] }),
      "empty_component_ids",
    );
  });
});
