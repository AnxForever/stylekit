import { describe, expect, it } from "vitest";
import { appendWorkspaceRevisionSchema, createWorkspaceProjectSchema, hashWorkspaceSnapshot, updateWorkspaceProjectSchema } from "@/lib/workspace";

describe("StyleKit workspace project contract", () => {
  it("accepts a complete production project brief", () => {
    const parsed = createWorkspaceProjectSchema.parse({
      name: "客户数据后台",
      description: "面向运营团队的 B2B SaaS",
      projectType: "dashboard",
      stack: ["nextjs", "typescript", "tailwind", "shadcn"],
      selectedStyleSlug: "corporate-clean",
      brief: {
        audience: "中小企业运营人员",
        primaryGoal: "查看转化、收入和异常账户",
        requiredPages: ["概览", "账户", "设置"],
        requiredStates: ["loading", "empty", "error", "success"],
        brandPersonality: ["专业", "克制", "可信"],
        antiReferences: ["不要紫色渐变"],
        notes: "移动端优先保证关键指标可读。",
      },
    });
    expect(parsed.selectedStyleSlug).toBe("corporate-clean");
    expect(parsed.brief.requiredStates).toContain("error");
  });

  it("rejects unknown fields and empty updates", () => {
    expect(createWorkspaceProjectSchema.safeParse({ name: "X", projectType: "dashboard", secret: "leak" }).success).toBe(false);
    expect(updateWorkspaceProjectSchema.safeParse({}).success).toBe(false);
  });

  it("builds deterministic immutable revision snapshots", () => {
    const base = {
      name: "A",
      projectType: "app" as const,
      stack: ["react" as const],
      selectedStyleSlug: null,
    };
    const revision = appendWorkspaceRevisionSchema.parse({
      expectedRevisionNumber: 0,
      snapshot: base,
    });
    expect(revision.source).toBe("manual_save");
    expect(hashWorkspaceSnapshot({ b: 2, a: 1 })).toBe(hashWorkspaceSnapshot({ a: 1, b: 2 }));
  });

  it("does not let a manual revision impersonate server generation", () => {
    const result = appendWorkspaceRevisionSchema.safeParse({
      expectedRevisionNumber: 0,
      source: "generation",
      snapshot: {
        name: "伪造生成",
        projectType: "dashboard",
        stack: ["nextjs"],
        selectedStyleSlug: "editorial",
        generation: {
          engineVersion: "workspace-generator-v1",
          target: "nextjs",
          templateType: "dashboard",
          styleSlug: "editorial",
          files: [],
          quality: { errors: [], warnings: [] },
        },
      },
    });
    expect(result.success).toBe(false);
  });
});
