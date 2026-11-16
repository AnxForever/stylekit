import { z } from "zod";

export const workspaceProjectTypeSchema = z.enum([
  "landing",
  "dashboard",
  "app",
  "portfolio",
  "blog",
  "other",
]);

export const workspaceStackItemSchema = z.enum([
  "nextjs",
  "react",
  "typescript",
  "tailwind",
  "shadcn",
  "css-modules",
  "other",
]);

export const workspaceBriefSchema = z
  .object({
    audience: z.string().trim().max(500).default(""),
    primaryGoal: z.string().trim().max(1000).default(""),
    requiredPages: z.array(z.string().trim().min(1).max(120)).max(40).default([]),
    requiredStates: z.array(z.enum(["loading", "empty", "error", "success", "disabled"])).max(5).default([]),
    brandPersonality: z.array(z.string().trim().min(1).max(60)).max(8).default([]),
    antiReferences: z.array(z.string().trim().min(1).max(120)).max(20).default([]),
    notes: z.string().trim().max(4000).default(""),
  })
  .strict();

export const createWorkspaceProjectSchema = z
  .object({
    name: z.string().trim().min(1).max(120),
    description: z.string().trim().max(2000).default(""),
    projectType: workspaceProjectTypeSchema,
    stack: z.array(workspaceStackItemSchema).max(12).default([]),
    brief: workspaceBriefSchema.default({
      audience: "",
      primaryGoal: "",
      requiredPages: [],
      requiredStates: [],
      brandPersonality: [],
      antiReferences: [],
      notes: "",
    }),
    selectedStyleSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).nullable().default(null),
  })
  .strict();

export const updateWorkspaceProjectSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(2000).optional(),
    projectType: workspaceProjectTypeSchema.optional(),
    stack: z.array(workspaceStackItemSchema).max(12).optional(),
    brief: workspaceBriefSchema.optional(),
    selectedStyleSlug: z.string().trim().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).nullable().optional(),
    status: z.enum(["active", "archived"]).optional(),
  })
  .strict()
  .refine((value) => Object.keys(value).length > 0, "At least one project field is required");

export const workspaceGeneratedFileSchema = z.object({
  name: z.string().min(1).max(240).refine((value) => !value.startsWith("/") && !value.includes("..") && !value.includes("\\")),
  type: z.enum(["html", "css", "js", "md", "json", "ts", "svg"]),
  content: z.string().max(200_000),
  sha256: z.string().regex(/^sha256:[0-9a-f]{64}$/),
}).strict();

export const workspaceGenerationSchema = z.object({
  engineVersion: z.literal("workspace-generator-v1"),
  target: z.enum(["nextjs", "react", "html"]),
  templateType: z.enum(["landing", "dashboard", "portfolio", "blog"]),
  styleSlug: z.enum(["neo-brutalist", "glassmorphism", "neumorphism", "editorial"]),
  files: z.array(workspaceGeneratedFileSchema).min(1).max(100),
  quality: z.object({ errors: z.array(z.string()).max(100), warnings: z.array(z.string()).max(100) }).strict(),
}).strict();

export const workspaceRevisionSnapshotSchema = createWorkspaceProjectSchema.extend({
  status: z.enum(["active", "archived"]).default("active"),
  generation: workspaceGenerationSchema.optional(),
});

const manualWorkspaceRevisionSnapshotSchema = workspaceRevisionSnapshotSchema.omit({ generation: true });

export const appendWorkspaceRevisionSchema = z
  .object({
    expectedRevisionNumber: z.number().int().min(0).max(10_000),
    snapshot: manualWorkspaceRevisionSnapshotSchema,
    source: z.literal("manual_save").default("manual_save"),
    parentRevisionNumber: z.number().int().min(1).max(10_000).nullable().default(null),
    changeSummary: z.string().trim().max(240).nullable().default(null),
  })
  .strict();

export type CreateWorkspaceProjectInput = z.infer<typeof createWorkspaceProjectSchema>;
