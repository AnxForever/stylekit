import { beforeEach, describe, expect, it, vi } from "vitest";
import type { PipelineRun } from "@/lib/pipeline/types";

const {
  updatePipelineRunMock,
  runExtractStageMock,
  runAnalyzeStageMock,
  runMatchStageMock,
  runMigrateStageMock,
  runGenerateStageMock,
  runExportStageMock,
  trackPipelineStartedMock,
  trackPipelineStageCompletedMock,
  trackPipelineCompletedMock,
  trackPipelineFailedMock,
} = vi.hoisted(() => ({
  updatePipelineRunMock: vi.fn(),
  runExtractStageMock: vi.fn(),
  runAnalyzeStageMock: vi.fn(),
  runMatchStageMock: vi.fn(),
  runMigrateStageMock: vi.fn(),
  runGenerateStageMock: vi.fn(),
  runExportStageMock: vi.fn(),
  trackPipelineStartedMock: vi.fn(),
  trackPipelineStageCompletedMock: vi.fn(),
  trackPipelineCompletedMock: vi.fn(),
  trackPipelineFailedMock: vi.fn(),
}));

vi.mock("@/lib/pipeline/store", () => ({
  updatePipelineRun: updatePipelineRunMock,
}));

vi.mock("@/lib/pipeline/adapters", () => ({
  runExtractStage: runExtractStageMock,
  runAnalyzeStage: runAnalyzeStageMock,
  runMatchStage: runMatchStageMock,
  runMigrateStage: runMigrateStageMock,
  runGenerateStage: runGenerateStageMock,
  runExportStage: runExportStageMock,
}));

vi.mock("@/lib/pipeline/events", () => ({
  trackPipelineStarted: trackPipelineStartedMock,
  trackPipelineStageCompleted: trackPipelineStageCompletedMock,
  trackPipelineCompleted: trackPipelineCompletedMock,
  trackPipelineFailed: trackPipelineFailedMock,
}));

import { executePipeline } from "@/lib/pipeline/orchestrator";

let currentRun: PipelineRun;

function createRunFixture(): PipelineRun {
  return {
    id: "pl_test_orch",
    status: "pending",
    sourceUrl: "https://example.com",
    target: { framework: "react", styleSlug: "neo-brutalist" },
    output: { format: "zip" },
    options: { autoMapTokens: true },
    stages: [
      { name: "extract", status: "pending", durationMs: 0 },
      { name: "analyze", status: "pending", durationMs: 0 },
      { name: "match", status: "pending", durationMs: 0 },
      { name: "migrate", status: "pending", durationMs: 0 },
      { name: "generate", status: "pending", durationMs: 0 },
      { name: "export", status: "pending", durationMs: 0 },
    ],
    artifacts: {},
    createdAt: "2026-02-18T00:00:00.000Z",
    updatedAt: "2026-02-18T00:00:00.000Z",
  };
}

function bindRunState(run: PipelineRun) {
  currentRun = structuredClone(run);
  updatePipelineRunMock.mockImplementation(
    (id: string, patch: Partial<PipelineRun>): PipelineRun => {
      if (id !== currentRun.id) {
        throw new Error(`unexpected run id ${id}`);
      }
      currentRun = {
        ...currentRun,
        ...patch,
        stages: patch.stages ?? currentRun.stages,
        artifacts: patch.artifacts ?? currentRun.artifacts,
        updatedAt: "2026-02-18T00:00:01.000Z",
      };
      return currentRun;
    }
  );
}

beforeEach(() => {
  vi.clearAllMocks();

  runExtractStageMock.mockResolvedValue({
    draft: {
      description: "Futuristic dashboard",
      philosophy: "Focus on clarity",
      keywords: ["futuristic", "clean"],
    },
    evidence: {},
    rawMarkdown: "# extracted",
  });

  runAnalyzeStageMock.mockResolvedValue({
    topMatches: [],
    classesFound: [],
    dominantPatterns: [],
  });

  runMatchStageMock.mockResolvedValue({
    matches: [{ slug: "apple-style", confidence: 88 }],
    migration: { coverage: 91 },
  });

  runMigrateStageMock.mockResolvedValue({ coverage: 91 });

  runGenerateStageMock.mockResolvedValue({
    name: "Future Clean Fusion",
    description: "Generated from: Apple Style, Mecha.",
    tokens: {},
    sourceStyles: [{ slug: "apple-style", weight: 0.6 }],
    confidence: 84,
    reasoning: ["Anchored to Apple Style."],
    insights: {
      baseStyle: "apple-style",
      detectedStyles: ["apple-style"],
      avoidedStyles: ["neo-brutalist"],
      matchedKeywords: ["futuristic", "clean"],
      negativeKeywords: ["brutalist"],
    },
  });

  runExportStageMock.mockResolvedValue({
    files: [{ path: "style.json", content: "{}" }],
    downloadUrl: "/api/pipeline/run/pl_test_orch/download",
  });
});

describe("executePipeline", () => {
  it("propagates generated insights into final artifacts", async () => {
    const run = createRunFixture();
    bindRunState(run);

    const result = await executePipeline(run);

    expect(result.status).toBe("completed");
    expect(result.artifacts.generated?.insights?.avoidedStyles).toContain(
      "neo-brutalist"
    );
    expect(result.artifacts.downloadUrl).toBe("/api/pipeline/run/pl_test_orch/download");
    expect(runGenerateStageMock).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Futuristic dashboard" }),
      "apple-style",
      expect.objectContaining({ framework: "react", styleSlug: "neo-brutalist" }),
      expect.objectContaining({ run: expect.any(Object) })
    );
    expect(trackPipelineStartedMock).toHaveBeenCalledWith("pl_test_orch");
    expect(trackPipelineCompletedMock).toHaveBeenCalledWith(
      "pl_test_orch",
      expect.any(Number)
    );
  });

  it("marks run as failed and reports failed stage when generate throws", async () => {
    const run = createRunFixture();
    bindRunState(run);
    runGenerateStageMock.mockRejectedValue(new Error("generate boom"));

    const result = await executePipeline(run);

    expect(result.status).toBe("failed");
    expect(result.error).toBe("generate boom");
    expect(
      result.stages.find((stage) => stage.name === "generate")?.status
    ).toBe("failed");
    expect(trackPipelineFailedMock).toHaveBeenCalledWith(
      "pl_test_orch",
      "generate",
      "generate boom"
    );
  });

  it("can resume from generate and skips earlier pending stages", async () => {
    const run = createRunFixture();
    run.artifacts = {
      draft: {
        description: "Existing draft",
      },
      matches: [{ slug: "material-design", confidence: 70 }] as never,
    };
    bindRunState(run);

    const result = await executePipeline(run, "generate");

    expect(result.status).toBe("completed");
    expect(runExtractStageMock).not.toHaveBeenCalled();
    expect(runAnalyzeStageMock).not.toHaveBeenCalled();
    expect(runMatchStageMock).not.toHaveBeenCalled();
    expect(runMigrateStageMock).not.toHaveBeenCalled();
    expect(runGenerateStageMock).toHaveBeenCalledWith(
      expect.objectContaining({ description: "Existing draft" }),
      "material-design",
      expect.objectContaining({ framework: "react" }),
      expect.objectContaining({ run: expect.any(Object) })
    );

    expect(result.stages.find((stage) => stage.name === "extract")?.status).toBe(
      "skipped"
    );
    expect(result.stages.find((stage) => stage.name === "analyze")?.status).toBe(
      "skipped"
    );
    expect(result.stages.find((stage) => stage.name === "match")?.status).toBe(
      "skipped"
    );
    expect(result.stages.find((stage) => stage.name === "migrate")?.status).toBe(
      "skipped"
    );
  });
});
