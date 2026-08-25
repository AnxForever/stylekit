import { describe, expect, it } from "vitest";

import { coerceIntent, inferProjectType } from "../planner/coerce";
import { parseStyleIntent } from "../planner/intent";

describe("inferProjectType", () => {
  it("detects a dashboard brief", () => {
    expect(
      inferProjectType({ brief: { primaryGoal: "做一个运营数据看板" } }),
    ).toBe("dashboard");
  });

  it("detects a blog brief", () => {
    expect(
      inferProjectType({ brief: { audience: "杂志读者", primaryGoal: "发布文章" } }),
    ).toBe("blog");
  });

  it("defaults to landing when nothing matches", () => {
    expect(
      inferProjectType({ brief: { primaryGoal: "卖限量球鞋" } }),
    ).toBe("landing");
  });
});

describe("coerceIntent", () => {
  const fullIntent = {
    schemaVersion: "style-intent-v1",
    styleSlug: "neo-brutalist",
    confidence: 0.9,
    rationale: ["bold look"],
    projectType: "landing",
    brief: {
      audience: "Z 世代",
      primaryGoal: "潮牌首发",
      requiredPages: ["Home"],
      requiredStates: ["loading"],
      brandPersonality: ["张扬"],
      antiReferences: ["不要圆角"],
      notes: "",
    },
    constraints: [],
  };

  it("leaves a complete intent untouched", () => {
    expect(coerceIntent(fullIntent)).toEqual(fullIntent);
  });

  it("fills schemaVersion and constraints when the model drops them", () => {
    const { schemaVersion, constraints, ...rest } = fullIntent;
    const coerced = coerceIntent(rest) as Record<string, unknown>;

    expect(coerced.schemaVersion).toBe("style-intent-v1");
    expect(coerced.constraints).toEqual([]);
  });

  it("infers projectType from the brief when the model drops it", () => {
    const { projectType, ...rest } = fullIntent;
    const coerced = coerceIntent({
      ...rest,
      brief: { ...fullIntent.brief, primaryGoal: "运营数据看板" },
    }) as Record<string, unknown>;

    expect(coerced.projectType).toBe("dashboard");
  });

  it("makes the coerced output parse as a full StyleIntent", () => {
    const { schemaVersion, constraints, projectType, ...rest } = fullIntent;
    const coerced = coerceIntent(rest);

    expect(() => parseStyleIntent(coerced)).not.toThrow();
    expect(parseStyleIntent(coerced).projectType).toBe("landing");
  });
});
