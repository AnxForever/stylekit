import { z } from "zod";

const identifierSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case identifier");

const semverSchema = z
  .string()
  .regex(
    /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/,
    "Use a semantic version such as 1.0.0",
  );

const contentHashSchema = z
  .string()
  .regex(/^sha256:[0-9a-f]{64}$/, "Use a sha256:<64 lowercase hex> content hash");

function hasUnsafePathSegment(value: string): boolean {
  return (
    value.includes("\0") ||
    value.includes("\\") ||
    value.split("/").some((segment) => segment === "..")
  );
}

const publicAssetPathSchema = z
  .string()
  .min(2)
  .startsWith("/", "Asset paths must be absolute public paths")
  .refine((value) => !hasUnsafePathSegment(value), "Asset paths cannot escape the public root");

const packRelativeFileSchema = z
  .string()
  .min(1)
  .refine((value) => !value.startsWith("/"), "Installable files must be relative to the pack root")
  .refine((value) => !hasUnsafePathSegment(value), "Installable files cannot escape the pack root");

const packageSpecSchema = z
  .string()
  .min(1)
  .regex(
    /^(?:@[a-z0-9][a-z0-9._-]*\/[a-z0-9][a-z0-9._-]*|[a-z0-9][a-z0-9._-]*)(?:@[^\s]+)?$/i,
    "Use a package name or package@version spec",
  );

const routeSchema = z
  .string()
  .startsWith("/", "Template routes must start with /")
  .refine((value) => !hasUnsafePathSegment(value), "Template routes cannot contain unsafe segments");

export const assetUpstreamRightsSchema = z
  .object({
    licenseId: z.string().min(1),
    licenseName: z.string().min(1),
    licensor: z.string().min(1),
    commercialUse: z.boolean(),
    stylekitRedistribution: z.enum(["allowed", "with-attribution", "prohibited"]),
    customerProjectUse: z.boolean(),
    customerAssetRedistribution: z.enum(["allowed", "with-attribution", "prohibited"]),
    attributionText: z.string().optional(),
    termsUrl: z.url(),
    notes: z.string().optional(),
  })
  .strict();

export const packCustomerLicenseSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    commercialUse: z.boolean(),
    customerProjectUse: z.boolean(),
    sourceRedistribution: z.enum(["allowed", "prohibited"]),
    assetRedistribution: z.enum(["allowed", "with-attribution", "prohibited"]),
    termsUrl: z.url().optional(),
    notes: z.string().optional(),
  })
  .strict();

export const assetProvenanceSchema = z
  .object({
    originType: z.enum(["owned", "commissioned", "licensed", "ai-generated"]),
    provider: z.string().min(1),
    acquiredAt: z.iso.datetime(),
    auditStatus: z.enum(["pending", "approved", "rejected"]),
    auditedBy: z.string().min(1).optional(),
    auditedAt: z.iso.datetime().optional(),
    evidenceUrl: z.url().optional(),
    sourceSnapshot: publicAssetPathSchema.optional(),
    aiGeneration: z
      .object({
        model: z.string().min(1),
        generatedAt: z.iso.datetime(),
        termsUrl: z.url(),
        promptEvidence: z.string().min(1),
        trademarkReview: z.boolean(),
        likenessReview: z.boolean(),
        artistImitationReview: z.boolean(),
      })
      .strict()
      .optional(),
  })
  .strict()
  .superRefine((provenance, ctx) => {
    if (provenance.auditStatus === "approved") {
      if (!provenance.auditedBy) {
        ctx.addIssue({
          code: "custom",
          path: ["auditedBy"],
          message: "Approved provenance requires an auditor",
        });
      }
      if (!provenance.auditedAt) {
        ctx.addIssue({
          code: "custom",
          path: ["auditedAt"],
          message: "Approved provenance requires an audit timestamp",
        });
      }
      if (!provenance.evidenceUrl && !provenance.sourceSnapshot) {
        ctx.addIssue({
          code: "custom",
          path: ["evidenceUrl"],
          message: "Approved provenance requires preserved evidence",
        });
      }
    }

    if (provenance.originType === "ai-generated" && !provenance.aiGeneration) {
      ctx.addIssue({
        code: "custom",
        path: ["aiGeneration"],
        message: "AI-generated assets require generation and review metadata",
      });
    }
    if (provenance.originType !== "ai-generated" && provenance.aiGeneration) {
      ctx.addIssue({
        code: "custom",
        path: ["aiGeneration"],
        message: "AI generation metadata is only valid for AI-generated assets",
      });
    }
  });

export const experienceAssetSchema = z
  .object({
    id: identifierSchema,
    kind: z.enum(["image", "video", "svg", "texture", "icon", "illustration", "audio"]),
    role: z.enum([
      "hero",
      "background",
      "card",
      "avatar",
      "texture",
      "illustration",
      "icon",
      "demo",
      "audio",
    ]),
    src: publicAssetPathSchema,
    distributable: z.boolean(),
    decorative: z.boolean().default(false),
    alt: z.string().default(""),
    width: z.number().int().positive().optional(),
    height: z.number().int().positive().optional(),
    contentHash: contentHashSchema.optional(),
    creator: z.string().min(1),
    sourceUrl: z.url(),
    upstreamRights: assetUpstreamRightsSchema,
    provenance: assetProvenanceSchema,
    modified: z.boolean(),
    modificationNotes: z.string().optional(),
  })
  .strict()
  .superRefine((asset, ctx) => {
    if (!asset.decorative && asset.kind !== "audio" && asset.alt.trim().length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["alt"],
        message: "Non-decorative visual assets require alt text",
      });
    }

    if (asset.distributable) {
      if (!asset.upstreamRights.commercialUse || !asset.upstreamRights.customerProjectUse) {
        ctx.addIssue({
          code: "custom",
          path: ["upstreamRights"],
          message: "Distributable assets must permit commercial customer project use",
        });
      }
      if (asset.upstreamRights.stylekitRedistribution === "prohibited") {
        ctx.addIssue({
          code: "custom",
          path: ["upstreamRights", "stylekitRedistribution"],
          message: "StyleKit must have upstream redistribution rights for distributable assets",
        });
      }
    }

    const needsDimensions = ["image", "video", "svg", "illustration"].includes(asset.kind);
    if (needsDimensions && (!asset.width || !asset.height)) {
      ctx.addIssue({
        code: "custom",
        path: ["width"],
        message: "Visual assets require width and height metadata",
      });
    }

    const needsAttribution =
      asset.upstreamRights.stylekitRedistribution === "with-attribution" ||
      asset.upstreamRights.customerAssetRedistribution === "with-attribution";
    if (needsAttribution && !asset.upstreamRights.attributionText?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["upstreamRights", "attributionText"],
        message: "Attribution text is required by the upstream license",
      });
    }

    if (asset.modified && !asset.modificationNotes?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["modificationNotes"],
        message: "Modified assets require modification notes",
      });
    }
  });

export const motionRecipeSchema = z
  .object({
    id: identifierSchema,
    trigger: z.enum([
      "load",
      "in-view",
      "hover",
      "focus",
      "press",
      "scroll",
      "pointer",
      "drag",
      "state-change",
    ]),
    targets: z.array(z.string().min(1)).min(1),
    durationMs: z.number().int().min(0).max(60_000),
    delayMs: z.number().int().min(0).max(60_000).default(0),
    easing: z.string().min(1),
    intensity: z.enum(["low", "medium", "high"]),
    repeat: z.union([z.number().int().min(0), z.literal("infinite")]).default(0),
    dependencies: z.array(packageSpecSchema).default([]),
    reducedMotion: z
      .object({
        strategy: z.enum(["disable", "static", "simplify"]),
        description: z.string().min(1),
      })
      .strict(),
    performance: z
      .object({
        preferredProperties: z.array(z.enum(["transform", "opacity", "filter"])).min(1),
        layoutAnimation: z.boolean(),
        continuous: z.boolean(),
        notes: z.string().optional(),
      })
      .strict(),
  })
  .strict();

export const interactionPatternSchema = z
  .object({
    id: identifierSchema,
    semantic: z.enum(["decorative", "functional"]),
    states: z.array(z.string().min(1)).min(1),
    inputs: z.array(z.enum(["pointer", "touch", "keyboard", "assistive-technology"])).min(1),
    behavior: z.string().min(1),
    keyboardContract: z.string().optional(),
    touchContract: z.string().optional(),
    accessibilityNotes: z.array(z.string().min(1)).default([]),
  })
  .strict()
  .superRefine((interaction, ctx) => {
    if (interaction.semantic !== "functional") return;

    if (interaction.inputs.includes("pointer") && !interaction.inputs.includes("touch")) {
      ctx.addIssue({
        code: "custom",
        path: ["inputs"],
        message: "Functional pointer interactions require a touch equivalent",
      });
    }
    if (!interaction.inputs.includes("keyboard")) {
      ctx.addIssue({
        code: "custom",
        path: ["inputs"],
        message: "Functional interactions require keyboard support",
      });
    }
    if (interaction.inputs.includes("keyboard") && !interaction.keyboardContract?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["keyboardContract"],
        message: "Keyboard-supported interactions require a keyboard contract",
      });
    }
    if (interaction.inputs.includes("touch") && !interaction.touchContract?.trim()) {
      ctx.addIssue({
        code: "custom",
        path: ["touchContract"],
        message: "Touch-supported interactions require a touch contract",
      });
    }
  });

const installableSchema = z
  .object({
    id: identifierSchema,
    title: z.string().min(1),
    files: z.array(packRelativeFileSchema).min(1),
    dependencies: z.array(packageSpecSchema).default([]),
    registryDependencies: z.array(identifierSchema).default([]),
    assetRefs: z.array(identifierSchema).default([]),
    motionRefs: z.array(identifierSchema).default([]),
    interactionRefs: z.array(identifierSchema).default([]),
  })
  .strict();

export const experienceBlockSchema = installableSchema.extend({
  kind: z.enum(["primitive", "component", "section"]),
});

export const experienceTemplateSchema = installableSchema.extend({
  kind: z.literal("page"),
  route: routeSchema,
});

function addDuplicateIssues(
  values: string[],
  path: Array<string | number>,
  label: string,
  ctx: z.RefinementCtx,
): void {
  const seen = new Set<string>();
  values.forEach((value, index) => {
    if (seen.has(value)) {
      ctx.addIssue({
        code: "custom",
        path: [...path, index],
        message: `Duplicate ${label}: ${value}`,
      });
    }
    seen.add(value);
  });
}

export const styleExperiencePackSchema = z
  .object({
    slug: identifierSchema,
    version: semverSchema,
    tier: z.enum(["free", "pro"]),
    status: z.enum(["draft", "preview", "published", "retired"]),
    preview: z
      .object({
        mode: z.enum(["curated", "generated"]),
        archetype: z.enum(["marketing", "app", "editorial"]).optional(),
        generatedApprovedForPublic: z.boolean().default(false),
      })
      .strict(),
    assets: z.array(experienceAssetSchema).default([]),
    motion: z.array(motionRecipeSchema).default([]),
    interactions: z.array(interactionPatternSchema).default([]),
    blocks: z.array(experienceBlockSchema).default([]),
    templates: z.array(experienceTemplateSchema).default([]),
    compatibility: z
      .object({
        next: z.string().min(1),
        react: z.string().min(1),
        tailwind: z.string().min(1),
        shadcn: z.string().min(1),
        conflictPolicy: z.enum(["fail", "prompt", "merge", "overwrite"]),
        migrationPolicy: z.string().min(1),
        deprecationPolicy: z.string().min(1),
      })
      .strict(),
    primaryDelivery: z.enum(["web", "registry", "cli", "mcp", "skill"]),
    delivery: z.array(z.enum(["web", "registry", "cli", "mcp", "skill"])).min(1),
    license: packCustomerLicenseSchema,
  })
  .strict()
  .superRefine((pack, ctx) => {
    if (pack.preview.mode === "generated" && !pack.preview.archetype) {
      ctx.addIssue({
        code: "custom",
        path: ["preview", "archetype"],
        message: "Generated previews require an explicit scene archetype",
      });
    }
    if (!pack.delivery.includes(pack.primaryDelivery)) {
      ctx.addIssue({
        code: "custom",
        path: ["primaryDelivery"],
        message: "The primary delivery target must be included in delivery",
      });
    }
    if (
      pack.status === "published" &&
      pack.preview.mode === "generated" &&
      !pack.preview.generatedApprovedForPublic
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["preview", "generatedApprovedForPublic"],
        message: "Published generated previews require explicit public approval",
      });
    }

    if (
      pack.status === "published" &&
      pack.tier === "pro" &&
      (!pack.license.commercialUse || !pack.license.customerProjectUse)
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["license"],
        message: "Published Pro packs must permit commercial customer project use",
      });
    }

    if (pack.status === "published" && pack.blocks.length + pack.templates.length === 0) {
      ctx.addIssue({
        code: "custom",
        path: ["blocks"],
        message: "Published packs require at least one installable block or template",
      });
    }

    if (pack.status === "published") {
      pack.assets.forEach((asset, index) => {
        if (asset.distributable && asset.provenance.auditStatus !== "approved") {
          ctx.addIssue({
            code: "custom",
            path: ["assets", index, "provenance", "auditStatus"],
            message: "Published distributable assets require approved provenance",
          });
        }
        if (asset.distributable && !asset.contentHash) {
          ctx.addIssue({
            code: "custom",
            path: ["assets", index, "contentHash"],
            message: "Published distributable assets require a content hash",
          });
        }
      });
    }

    addDuplicateIssues(pack.assets.map((item) => item.id), ["assets"], "asset id", ctx);
    addDuplicateIssues(pack.motion.map((item) => item.id), ["motion"], "motion id", ctx);
    addDuplicateIssues(
      pack.interactions.map((item) => item.id),
      ["interactions"],
      "interaction id",
      ctx,
    );
    addDuplicateIssues(
      [...pack.blocks, ...pack.templates].map((item) => item.id),
      ["installables"],
      "installable id",
      ctx,
    );
    addDuplicateIssues(pack.delivery, ["delivery"], "delivery target", ctx);

    const allFiles = [...pack.blocks, ...pack.templates].flatMap((item) => item.files);
    addDuplicateIssues(allFiles, ["installables", "files"], "output file", ctx);

    const assetIds = new Set(pack.assets.map((asset) => asset.id));
    const motionIds = new Set(pack.motion.map((motion) => motion.id));
    const interactionIds = new Set(pack.interactions.map((interaction) => interaction.id));

    const installables = [...pack.blocks, ...pack.templates];
    installables.forEach((item, itemIndex) => {
      const collection = itemIndex < pack.blocks.length ? "blocks" : "templates";
      const index = itemIndex < pack.blocks.length ? itemIndex : itemIndex - pack.blocks.length;

      addDuplicateIssues(item.files, [collection, index, "files"], "file", ctx);
      addDuplicateIssues(item.dependencies, [collection, index, "dependencies"], "dependency", ctx);
      addDuplicateIssues(item.assetRefs, [collection, index, "assetRefs"], "asset reference", ctx);
      addDuplicateIssues(item.motionRefs, [collection, index, "motionRefs"], "motion reference", ctx);
      addDuplicateIssues(
        item.interactionRefs,
        [collection, index, "interactionRefs"],
        "interaction reference",
        ctx,
      );

      const checkRefs = (refs: string[], ids: Set<string>, field: string) => {
        refs.forEach((ref, refIndex) => {
          if (!ids.has(ref)) {
            ctx.addIssue({
              code: "custom",
              path: [collection, index, field, refIndex],
              message: `Unknown ${field} reference: ${ref}`,
            });
          }
        });
      };

      checkRefs(item.assetRefs, assetIds, "assetRefs");
      checkRefs(item.motionRefs, motionIds, "motionRefs");
      checkRefs(item.interactionRefs, interactionIds, "interactionRefs");
    });
  });

export type AssetUpstreamRights = z.infer<typeof assetUpstreamRightsSchema>;
export type PackCustomerLicense = z.infer<typeof packCustomerLicenseSchema>;
export type ExperienceAsset = z.infer<typeof experienceAssetSchema>;
export type MotionRecipe = z.infer<typeof motionRecipeSchema>;
export type InteractionPattern = z.infer<typeof interactionPatternSchema>;
export type ExperienceBlock = z.infer<typeof experienceBlockSchema>;
export type ExperienceTemplate = z.infer<typeof experienceTemplateSchema>;
export type StyleExperiencePack = z.infer<typeof styleExperiencePackSchema>;
export type StyleExperiencePackInput = z.input<typeof styleExperiencePackSchema>;

export function parseStyleExperiencePack(input: unknown): StyleExperiencePack {
  return styleExperiencePackSchema.parse(input);
}
