import { describe, expect, it } from "vitest";
import {
  parseStyleExperiencePack,
  styleExperiencePackSchema,
  type StyleExperiencePackInput,
} from "@/lib/experience-packs";

const commercialLicense = {
  id: "stylekit-pro-v1",
  name: "StyleKit Pro License v1",
  commercialUse: true,
  customerProjectUse: true,
  sourceRedistribution: "prohibited" as const,
  assetRedistribution: "prohibited" as const,
};

function createDraftPack(): StyleExperiencePackInput {
  return {
    slug: "cyberpunk-neon",
    version: "0.1.0",
    tier: "pro" as const,
    status: "draft" as const,
    preview: { mode: "curated" as const },
    assets: [],
    motion: [],
    interactions: [],
    blocks: [],
    templates: [],
    compatibility: {
      next: ">=16 <17",
      react: ">=19 <20",
      tailwind: ">=4 <5",
      shadcn: ">=3 <4",
      conflictPolicy: "fail",
      migrationPolicy: "Provide a migration note for every breaking release.",
      deprecationPolicy: "Support the previous minor release for 90 days.",
    },
    primaryDelivery: "registry",
    delivery: ["web", "registry"],
    license: commercialLicense,
  };
}

describe("styleExperiencePackSchema", () => {
  it("accepts a non-invasive draft pack linked by style slug", () => {
    const pack = parseStyleExperiencePack(createDraftPack());

    expect(pack.slug).toBe("cyberpunk-neon");
    expect(pack.preview.mode).toBe("curated");
  });

  it("requires generated previews to declare a scene archetype", () => {
    const pack = createDraftPack();
    pack.preview = { mode: "generated" };

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ["preview", "archetype"] }),
      ]),
    );
  });

  it("rejects paid distribution of an asset whose license prohibits redistribution", () => {
    const pack = createDraftPack();
    pack.assets = [{
      id: "hero-photo",
      kind: "image",
      role: "hero",
      src: "/experience-packs/cyberpunk-neon/hero.webp",
      distributable: true,
      decorative: false,
      alt: "Neon-lit city street",
      width: 1600,
      height: 900,
      creator: "Example Creator",
      sourceUrl: "https://example.com/hero",
      upstreamRights: {
        licenseId: "example-restricted",
        licenseName: "Example Restricted License",
        licensor: "Example Creator",
        commercialUse: true,
        stylekitRedistribution: "prohibited",
        customerProjectUse: true,
        customerAssetRedistribution: "prohibited",
        termsUrl: "https://example.com/license",
      },
      provenance: {
        originType: "licensed",
        provider: "example",
        acquiredAt: "2026-07-10T00:00:00.000Z",
        auditStatus: "pending",
      },
      modified: false,
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          path: ["assets", 0, "upstreamRights", "stylekitRedistribution"],
        }),
      ]),
    );
  });

  it("requires functional pointer interactions to support touch and keyboard", () => {
    const pack = createDraftPack();
    pack.interactions = [{
      id: "magnetic-cta",
      semantic: "functional",
      states: ["idle", "hover", "pressed"],
      inputs: ["pointer"],
      behavior: "Move the CTA toward the pointer before activation.",
      accessibilityNotes: [],
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: expect.stringContaining("touch equivalent") }),
        expect.objectContaining({ message: expect.stringContaining("keyboard support") }),
      ]),
    );
  });

  it("rejects installable blocks that reference missing pack resources", () => {
    const pack = createDraftPack();
    pack.blocks = [{
      id: "neon-hero",
      title: "Neon Hero",
      kind: "section",
      files: ["./blocks/neon-hero.tsx"],
      dependencies: [],
      registryDependencies: [],
      assetRefs: ["missing-hero"],
      motionRefs: ["missing-motion"],
      interactionRefs: [],
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Unknown assetRefs reference: missing-hero" }),
        expect.objectContaining({ message: "Unknown motionRefs reference: missing-motion" }),
      ]),
    );
  });

  it("requires published packs to contain an installable deliverable", () => {
    const pack = { ...createDraftPack(), status: "published" as const };

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: ["blocks"] }),
      ]),
    );
  });

  it("rejects installable file paths that escape the pack root", () => {
    const pack = createDraftPack();
    pack.blocks = [{
      id: "unsafe-block",
      title: "Unsafe Block",
      kind: "section",
      files: ["../../outside.tsx"],
      dependencies: [],
      registryDependencies: [],
      assetRefs: [],
      motionRefs: [],
      interactionRefs: [],
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: expect.stringContaining("cannot escape") }),
      ]),
    );
  });

  it("rejects unknown fields instead of silently discarding contract typos", () => {
    const pack = {
      ...createDraftPack(),
      blocks: [{
        id: "typed-block",
        title: "Typed Block",
        kind: "section",
        files: ["./blocks/typed-block.tsx"],
        dependencies: [],
        registryDependencies: [],
        assetsRefs: ["misspelled-field"],
        assetRefs: [],
        motionRefs: [],
        interactionRefs: [],
      }],
    };

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ code: "unrecognized_keys" }),
      ]),
    );
  });

  it("rejects duplicate resource identifiers", () => {
    const pack = createDraftPack();
    pack.motion = [
      {
        id: "neon-pulse",
        trigger: "load",
        targets: ["hero"],
        durationMs: 500,
        easing: "ease-out",
        intensity: "low",
        reducedMotion: { strategy: "static", description: "Show the final state." },
        performance: {
          preferredProperties: ["opacity"],
          layoutAnimation: false,
          continuous: false,
        },
      },
      {
        id: "neon-pulse",
        trigger: "focus",
        targets: ["cta"],
        durationMs: 150,
        easing: "ease-out",
        intensity: "low",
        reducedMotion: { strategy: "disable", description: "Use focus styling only." },
        performance: {
          preferredProperties: ["opacity"],
          layoutAnimation: false,
          continuous: false,
        },
      },
    ];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ message: "Duplicate motion id: neon-pulse" }),
      ]),
    );
  });
});
