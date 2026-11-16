import { describe, expect, it } from "vitest";

import replayContent from "@/lib/bailian/fixtures/workspace-content.json";
import {
  buildWorkspaceContentPrompt,
  normalizeWorkspaceContent,
  workspaceContentSignature,
} from "@/lib/workspace/content";
import {
  buildWorkspacePreview,
  createWorkspaceProjectSchema,
  generateWorkspaceProject,
} from "@/lib/workspace";

function fixture(): Record<string, Record<string, string>> {
  return JSON.parse(JSON.stringify(replayContent.sections)) as Record<string, Record<string, string>>;
}

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

describe("normalizeWorkspaceContent", () => {
  it("accepts the replay fixture and canonicalizes list spacing", () => {
    const input = fixture();
    input.sidebar.navItems = "概览,收入,账户, 风险,设置";

    const result = normalizeWorkspaceContent("dashboard", input);

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.content.sidebar.navItems).toBe("概览, 收入, 账户, 风险, 设置");
    expect(result.fieldCount).toBe(28);
    expect(result.summary.find((entry) => entry.fieldId === "chartTitle")?.label).toBe("图表标题");
  });

  it("trims values before storing them", () => {
    const result = normalizeWorkspaceContent("dashboard", {
      sidebar: { appName: "  收入控制台  " },
    });

    expect(result).toMatchObject({ ok: true, content: { sidebar: { appName: "收入控制台" } } });
  });

  it("rejects sections and fields the template does not have", () => {
    expect(normalizeWorkspaceContent("dashboard", { sidebar: { nope: "x" } })).toMatchObject({
      ok: false,
      error: expect.stringContaining("nope"),
    });
    expect(normalizeWorkspaceContent("dashboard", { hero: { title: "x" } })).toMatchObject({
      ok: false,
      error: expect.stringContaining("hero"),
    });
  });

  it("keeps the chart type a visual decision instead of model output", () => {
    const input = fixture();
    input.charts.chartType = "pie";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({ ok: false });
  });

  it("requires chart labels and both series to line up", () => {
    const partial = fixture();
    delete partial.charts.secondarySeriesValues;
    expect(normalizeWorkspaceContent("dashboard", partial)).toMatchObject({
      ok: false,
      error: expect.stringContaining("同时填写"),
    });

    const mismatched = fixture();
    mismatched.charts.secondarySeriesValues = "40, 45, 50";
    expect(normalizeWorkspaceContent("dashboard", mismatched)).toMatchObject({
      ok: false,
      error: expect.stringContaining("数量必须一致"),
    });
  });

  it("rejects non-numeric series values", () => {
    const input = fixture();
    input.charts.primarySeriesValues = "42, 48, 很多, 57, 66, 74";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({ ok: false });
  });

  it("keeps the active navigation item inside the navigation list", () => {
    const input = fixture();
    input.sidebar.activeItem = "报表";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({
      ok: false,
      error: expect.stringContaining("激活项"),
    });
  });

  it("caps the table row count", () => {
    const input = fixture();
    input.table.rowCount = "40";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({ ok: false });
  });

  it("refuses HTML and template control characters", () => {
    const input = fixture();
    input.kpi.sectionTitle = "<script>alert(1)</script>";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({ ok: false });
  });

  it("refuses an empty field instead of silently keeping the default", () => {
    const input = fixture();
    input.sidebar.appName = "";

    expect(normalizeWorkspaceContent("dashboard", input)).toMatchObject({ ok: false });
  });
});

describe("workspaceContentSignature", () => {
  it("ignores key order so a re-serialized draft is not reported as changed", () => {
    const first = { kpi: { sectionTitle: "A", kpi1Label: "B" } };
    const second = { kpi: { kpi1Label: "B", sectionTitle: "A" } };

    expect(workspaceContentSignature(first)).toBe(workspaceContentSignature(second));
    expect(workspaceContentSignature(first)).not.toBe(
      workspaceContentSignature({ kpi: { sectionTitle: "A" } })
    );
  });
});

describe("buildWorkspaceContentPrompt", () => {
  it("describes the project and every fillable field", () => {
    const prompt = buildWorkspaceContentPrompt({
      name: "收入控制台",
      description: "面向财务团队",
      projectType: "dashboard",
      brief: {
        audience: "财务运营",
        primaryGoal: "监控月度收入",
        requiredPages: ["概览"],
        brandPersonality: ["克制"],
        antiReferences: ["不要紫色"],
        notes: "数字要真实",
      },
    });

    expect(prompt).toContain("收入控制台");
    expect(prompt).toContain("财务运营");
    expect(prompt).toContain("不要紫色");
    expect(prompt).toContain("kpi1Label");
    expect(prompt).not.toContain("chartType");
  });
});

describe("saved workspace copy", () => {
  it("overrides template defaults in the preview", () => {
    const preview = buildWorkspacePreview(
      project({ content: replayContent.sections })
    );

    expect(preview.html).toContain("本季度收入概览");
    expect(preview.html).toContain("收入与目标");
    expect(preview.html).not.toContain("数据概览");
  });

  it("ships the copy in the generated Next.js project", () => {
    const generation = generateWorkspaceProject({
      ...project({ content: replayContent.sections }),
      target: "nextjs",
      generatedAt: "2026-11-16T00:00:00.000Z",
    });

    const sources = generation.files.map((file) => file.content).join("\n");
    expect(sources).toContain("本季度收入概览");
    expect(sources).toContain("待处理账户");
    expect(sources).not.toContain("数据概览");
  });

  it("falls back to template defaults for ids the template no longer has", () => {
    const preview = buildWorkspacePreview(
      project({ content: { retired: { title: "旧区块" }, kpi: { sectionTitle: "新概览" } } })
    );

    expect(preview.html).toContain("新概览");
    expect(preview.html).toContain("概览");
    expect(preview.html).not.toContain("旧区块");
  });
});
