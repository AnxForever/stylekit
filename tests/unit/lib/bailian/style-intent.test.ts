import {
  parseDemoGenerationStyleIntent,
  parseStyleIntent,
} from "@/lib/bailian/style-intent";

const validIntent = {
  schemaVersion: "style-intent-v1",
  styleSlug: "glassmorphism",
  confidence: 0.87,
  rationale: ["适合 SaaS 工作台", "支持层次化信息展示"],
  projectType: "dashboard",
  brief: {
    audience: "B2B SaaS operators",
    primaryGoal: "Review account risk",
    requiredPages: ["Overview"],
    requiredStates: ["loading", "empty", "error", "success"],
    brandPersonality: ["clear", "reliable"],
    antiReferences: ["不要使用装饰性渐变"],
    notes: "保持桌面端和移动端都可读",
  },
  constraints: ["使用 StyleKit 的真实 tokens", "不要自造颜色值"],
};

describe("StyleIntent schema", () => {
  it("accepts the shared A/B contract", () => {
    expect(parseStyleIntent(validIntent)).toEqual(validIntent);
  });

  it("accepts only the verified dashboard demo styles for generation", () => {
    expect(parseDemoGenerationStyleIntent(validIntent).styleSlug).toBe(
      "glassmorphism",
    );
  });

  it("rejects model-authored tokens and unknown fields", () => {
    expect(() =>
      parseStyleIntent({ ...validIntent, tokens: { radius: "12px" } }),
    ).toThrow();
  });

  it("rejects a non-demo style from the generation path", () => {
    expect(() =>
      parseDemoGenerationStyleIntent({
        ...validIntent,
        styleSlug: "cyberpunk-neon",
      }),
    ).toThrow();
  });
});
