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
    styleSlug: "cyberpunk-neon",
    version: "0.1.0",
    tier: "pro" as const,
    status: "draft" as const,
    preview: { mode: "curated" as const },
    presentation: {
      title: "Cyberpunk Neon Pack",
      summary: "A draft pack used to validate the commercial contract.",
      categories: ["cyberpunk", "landing"],
    },
    assets: [],
    motion: [],
    interactions: [],
    evidence: [],
    claims: [],
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
    expect(pack.styleSlug).toBe("cyberpunk-neon");
    expect(pack.preview.mode).toBe("curated");
  });

  it("keeps the commercial pack id separate from its source style", () => {
    const pack = createDraftPack();
    pack.slug = "corporate-clean-saas";
    pack.styleSlug = "corporate-clean";

    const parsed = parseStyleExperiencePack(pack);

    expect(parsed.slug).toBe("corporate-clean-saas");
    expect(parsed.styleSlug).toBe("corporate-clean");
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
      performance: {
        budgetBytes: 200_000,
        loading: "eager",
        responsive: true,
        animated: false,
      },
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

  it("requires functional interactions to expose focus and assistive-technology behavior", () => {
    const pack = createDraftPack();
    pack.interactions = [{
      id: "keyboard-only-menu",
      semantic: "functional",
      states: ["idle", "open"],
      inputs: ["pointer", "touch", "keyboard"],
      behavior: "Open a menu.",
      keyboardContract: "Enter opens the menu.",
      touchContract: "Tap opens the menu.",
      accessibilityNotes: [],
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ message: expect.stringContaining("assistive-technology contract") }),
      expect.objectContaining({ message: expect.stringContaining("explicit focus state") }),
    ]));
  });

  it("requires every published marketing asset to have approved provenance and a content hash", () => {
    const pack = createDraftPack();
    pack.status = "published";
    pack.blocks = [{
      id: "proof-block",
      title: "Proof block",
      kind: "section",
      files: ["README.md", "LICENSE.md", "THIRD_PARTY_NOTICES.md"],
      dependencies: [],
      registryDependencies: [],
      assetRefs: ["marketing-proof"],
      motionRefs: [],
      interactionRefs: [],
    }];
    pack.assets = [{
      id: "marketing-proof",
      kind: "image",
      role: "demo",
      src: "/experience-packs/cyberpunk-neon/proof.webp",
      distributable: false,
      decorative: false,
      alt: "Product proof",
      width: 1280,
      height: 720,
      performance: {
        budgetBytes: 160_000,
        loading: "lazy",
        responsive: true,
        animated: false,
      },
      creator: "StyleKit",
      sourceUrl: "https://example.com/proof",
      upstreamRights: {
        licenseId: "owned",
        licenseName: "Owned",
        licensor: "StyleKit",
        commercialUse: true,
        stylekitRedistribution: "allowed",
        customerProjectUse: true,
        customerAssetRedistribution: "prohibited",
        termsUrl: "https://example.com/license",
      },
      provenance: {
        originType: "owned",
        provider: "StyleKit",
        acquiredAt: "2026-07-11T00:00:00.000Z",
        auditStatus: "pending",
      },
      modified: false,
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ path: ["assets", 0, "provenance", "auditStatus"] }),
      expect.objectContaining({ path: ["assets", 0, "contentHash"] }),
    ]));
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

  it("rejects commercial evidence and claims that point to unknown resources", () => {
    const pack = createDraftPack();
    pack.evidence = [{
      id: "missing-screen",
      assetRef: "unknown-asset",
      kind: "overview",
      device: "desktop",
      theme: "light",
      state: "overview",
      caption: "Missing evidence",
    }];
    pack.claims = [{
      id: "unsupported-claim",
      statement: "This claim has no real proof.",
      evidenceRefs: ["unknown-evidence"],
      installableRefs: ["unknown-installable"],
      motionRefs: [],
      interactionRefs: [],
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ message: "Unknown evidence asset reference: unknown-asset" }),
      expect.objectContaining({ message: "Unknown evidenceRefs reference: unknown-evidence" }),
      expect.objectContaining({ message: "Unknown installableRefs reference: unknown-installable" }),
    ]));
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
          pausesWhenOffscreen: true,
          pausesWhenPageHidden: true,
        },
        controls: { userCanPause: false, userCanReplay: false },
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
          pausesWhenOffscreen: true,
          pausesWhenPageHidden: true,
        },
        controls: { userCanPause: false, userCanReplay: false },
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

  it("rejects continuous motion without pause and lifecycle controls", () => {
    const pack = createDraftPack();
    pack.motion = [{
      id: "ambient-drift",
      trigger: "load",
      targets: ["hero media"],
      durationMs: 12_000,
      easing: "linear",
      intensity: "low",
      repeat: "infinite",
      reducedMotion: { strategy: "static", description: "Use the poster frame." },
      performance: {
        preferredProperties: ["transform"],
        layoutAnimation: false,
        continuous: true,
        pausesWhenOffscreen: false,
        pausesWhenPageHidden: false,
      },
      controls: { userCanPause: false, userCanReplay: false },
    }];

    const result = styleExperiencePackSchema.safeParse(pack);

    expect(result.success).toBe(false);
    expect(result.error?.issues).toEqual(expect.arrayContaining([
      expect.objectContaining({ message: expect.stringContaining("requires a pause control") }),
      expect.objectContaining({ message: expect.stringContaining("must pause offscreen") }),
    ]));
  });
});
