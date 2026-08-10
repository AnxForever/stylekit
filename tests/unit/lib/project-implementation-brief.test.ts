import { describe, expect, it } from "vitest";
import {
  ProjectBriefValidationError,
  buildProjectImplementationBrief,
  getProjectBriefAnalyticsMetadata,
  normalizeProjectBriefList,
  validateProjectImplementationBriefInput,
  type ProjectImplementationBriefInput,
} from "@/lib/styles/project-implementation-brief";

const style = {
  styleName: "Neo Brutalist",
  styleSlug: "neo-brutalist",
  aiRules: "使用粗边框和硬阴影。",
  aiRulesEn: "Use thick borders and hard shadows.",
  enhancedRules: null,
  doList: ["使用纯黑粗边框", "保持直角"],
  doListEn: ["Use pure black thick borders", "Keep sharp corners"],
  dontList: ["禁止圆角", "禁止模糊阴影"],
  dontListEn: ["Do not use rounded corners", "Do not use blurred shadows"],
  keywords: ["粗边框", "硬阴影"],
  keywordsEn: ["thick borders", "hard shadows"],
};

function makeInput(
  overrides: Partial<ProjectImplementationBriefInput> = {},
): ProjectImplementationBriefInput {
  return {
    locale: "en",
    style,
    projectType: "dashboard",
    audience: "Operations managers at small logistics teams",
    primaryGoal: "Review delayed shipments and assign an owner without leaving the queue",
    stacks: ["nextjs", "typescript", "tailwind"],
    requiredItems: ["Delay queue", "Shipment detail", "Owner assignment flow"],
    requiredStates: ["loading", "empty", "error", "success", "disabled"],
    brandPersonality: ["direct", "dependable", "focused"],
    antiReferences: ["No glassmorphism", "No purple gradients"],
    additionalConstraints: "Preserve the existing route and data-fetching conventions.",
    ...overrides,
  };
}

describe("project implementation brief", () => {
  it("generates deterministic English Markdown with scope, style rules, states, and acceptance checks", () => {
    const input = makeInput();
    const first = buildProjectImplementationBrief(input);
    const second = buildProjectImplementationBrief(input);

    expect(first).toBe(second);
    expect(first).toContain("# Project Implementation Brief");
    expect(first).toContain("style_slug: neo-brutalist");
    expect(first).toContain("/en/styles/neo-brutalist");
    expect(first).toContain("Operations managers at small logistics teams");
    expect(first).toContain("Owner assignment flow");
    expect(first).toContain("Use pure black thick borders");
    expect(first).toContain("Do not use rounded corners");
    expect(first).toContain("Loading");
    expect(first).toContain("## Implementation Sequence");
    expect(first).toContain("## Acceptance Checklist");
    expect(first).toContain("Inspect the repository");
    expect(first).toContain("Review the final diff");
    expect(first).toContain("keyboard");
    expect(first).toContain("reduced-motion");
    expect(first).not.toMatch(/[\u3400-\u9fff]/);
    expect(first).not.toContain("undefined");
    expect(first).not.toContain("[object Object]");
    expect(first).not.toMatch(/production[- ]ready/i);
  });

  it("generates a coherent Chinese brief and explicitly handles omitted optional states", () => {
    const brief = buildProjectImplementationBrief(
      makeInput({
        locale: "zh",
        style: { ...style, styleName: "新野兽派" },
        projectType: "app",
        audience: "需要快速整理访谈记录的产品经理",
        primaryGoal: "把一段访谈整理成可追踪的需求项",
        stacks: [],
        requiredItems: [],
        requiredStates: [],
        brandPersonality: [],
        antiReferences: [],
        additionalConstraints: "",
      }),
    );

    expect(brief).toContain("# 项目实施简报");
    expect(brief).toContain("## 核心任务");
    expect(brief).toContain("/styles/neo-brutalist");
    expect(brief).toContain("使用纯黑粗边框");
    expect(brief).toContain("识别适用的加载、空、错误、成功和禁用状态");
    expect(brief).toContain("## 验收清单");
    expect(brief).toContain("检查最终 diff");
  });

  it("normalizes list text without silently dropping distinct items", () => {
    expect(
      normalizeProjectBriefList(" Dashboard, Settings\nDashboard； Billing ，Settings "),
    ).toEqual(["Dashboard", "Settings", "Billing"]);
  });

  it("rejects missing required fields and out-of-bounds lists", () => {
    const input = makeInput({
      projectType: "" as ProjectImplementationBriefInput["projectType"],
      audience: " ",
      primaryGoal: "",
      requiredItems: Array.from({ length: 13 }, (_, index) => `Page ${index + 1}`),
    });
    const validation = validateProjectImplementationBriefInput(input);

    expect(validation.valid).toBe(false);
    expect(validation.issues).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ field: "projectType", code: "required" }),
        expect.objectContaining({ field: "audience", code: "required" }),
        expect.objectContaining({ field: "primaryGoal", code: "required" }),
        expect.objectContaining({ field: "requiredItems", code: "too_many" }),
      ]),
    );
    expect(() => buildProjectImplementationBrief(input)).toThrow(
      ProjectBriefValidationError,
    );
  });

  it("returns analytics metadata containing enums and counts only", () => {
    const input = makeInput();
    const metadata = getProjectBriefAnalyticsMetadata(input);

    expect(metadata).toEqual({
      slug: "neo-brutalist",
      locale: "en",
      project_type: "dashboard",
      stack_count: 3,
      required_item_count: 3,
      state_count: 5,
      optional_field_count: 6,
      completion_tier: "complete",
      source: "style_detail",
    });

    const serialized = JSON.stringify(metadata);
    expect(serialized).not.toContain(input.audience);
    expect(serialized).not.toContain(input.primaryGoal);
    expect(serialized).not.toContain(input.requiredItems[0]);
    expect(serialized).not.toContain(input.brandPersonality[0]);
    expect(serialized).not.toContain(input.antiReferences[0]);
    expect(serialized).not.toContain(input.additionalConstraints);
  });
});
