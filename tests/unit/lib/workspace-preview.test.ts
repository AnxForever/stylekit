import { describe, expect, it } from "vitest";

import {
  buildWorkspacePreview,
  createWorkspaceProjectSchema,
  WorkspaceGenerationError,
} from "@/lib/workspace";

function project(overrides: Record<string, unknown> = {}) {
  return createWorkspaceProjectSchema.parse({
    name: "客户数据后台",
    description: "面向运营团队的 B2B SaaS",
    projectType: "dashboard",
    stack: ["nextjs", "typescript"],
    brief: {
      audience: "运营团队",
      primaryGoal: "查看收入和账户风险",
      requiredPages: ["概览"],
      requiredStates: ["loading", "empty", "error", "success"],
      brandPersonality: ["专业"],
      antiReferences: [],
      notes: "",
    },
    selectedStyleSlug: "neo-brutalist",
    ...overrides,
  });
}

describe("buildWorkspacePreview", () => {
  it("returns a self-contained document with no scripts", () => {
    const preview = buildWorkspacePreview(project());

    expect(preview.html.startsWith("<!DOCTYPE html>")).toBe(true);
    expect(preview.html).toContain("客户数据后台");
    expect(preview.html).toContain("dashboard-layout");
    expect(preview.html).not.toContain("<script");
    expect(preview).toMatchObject({
      styleSlug: "neo-brutalist",
      templateType: "dashboard",
      unsavedStyle: false,
    });
  });

  it("renders a style the user has not saved yet and says so", () => {
    const saved = buildWorkspacePreview(project());
    const draft = buildWorkspacePreview(project(), { styleSlug: "editorial" });

    expect(draft).toMatchObject({ styleSlug: "editorial", unsavedStyle: true });
    expect(draft.html).not.toBe(saved.html);
  });

  it("does not flag a style that matches the saved project", () => {
    const preview = buildWorkspacePreview(project(), { styleSlug: "neo-brutalist" });

    expect(preview.unsavedStyle).toBe(false);
  });

  it("refuses a style outside the validated set", () => {
    expect(() =>
      buildWorkspacePreview(project(), { styleSlug: "not-a-style" })
    ).toThrow(WorkspaceGenerationError);
    expect(() =>
      buildWorkspacePreview(project(), { styleSlug: "not-a-style" })
    ).toThrow(/当前只开放/);
  });

  it("refuses a project without a style", () => {
    expect(() =>
      buildWorkspacePreview(project({ selectedStyleSlug: null }))
    ).toThrow(WorkspaceGenerationError);
  });

  it("refuses a template the generator cannot build yet", () => {
    expect(() =>
      buildWorkspacePreview(project({ projectType: "landing" }))
    ).toThrow(WorkspaceGenerationError);
  });
});
