import { vi } from "vitest";
import type { EvalScenario, EvalTurn } from "./eval-scenarios";
import type { AgentMessage, AgentCodePrompt, AgentToolTrace } from "../types";
import type { TurnMetrics } from "../observability";

export interface EvalTurnResult {
  turnIndex: number;
  phase: string;
  assistantMessage: string;
  hasCodePrompt: boolean;
  slotsFilled: string[];
  toolTrace: Array<{ tool: string; ok: boolean }>;
  turnMetrics?: TurnMetrics;
}

export interface EvalResult {
  scenarioId: string;
  turns: EvalTurnResult[];
  passed: boolean;
  errors: string[];
}

function getFilledSlots(planner: EvalTurn["mockPlannerResult"]): string[] {
  const filled: string[] = [];
  if (planner.productType.trim()) filled.push("productType");
  if (planner.audience.trim()) filled.push("audience");
  if (planner.visualTone.trim()) filled.push("visualTone");
  if (planner.mustHave.some((item) => item.trim())) filled.push("mustHave");
  if (planner.constraints.some((item) => item.trim())) filled.push("constraints");
  return filled;
}

export async function runEvalScenario(
  scenario: EvalScenario
): Promise<EvalResult> {
  const errors: string[] = [];
  const turnResults: EvalTurnResult[] = [];

  /* Reset modules so mocks are clean per scenario */
  vi.resetModules();

  /* Disable LLM prompt composition inside eval: `requestAgentJson` is mocked
   * below with a responder-shaped response that doesn't carry a `prompt` field,
   * which would corrupt `codePrompt.prompt` on the composer path. Eval exercises
   * the deterministic `buildAgentCodePrompt` fallback instead. */
  process.env.AGENT_USE_COMPOSITION = "false";

  /* Build mock planner responses queue */
  let plannerCallIndex = 0;
  const plannerResponses = scenario.turns.map((turn) => turn.mockPlannerResult);
  const responderResponse = { assistantMessage: "Here is your design prompt summary." };

  /* Mock the reflector module (L5): pass-through wrapper.
   * Eval must be deterministic — we want to test planner output as-is,
   * not as modified by a reflection retry. Production keeps reflection active
   * via AGENT_USE_REFLECTION env var. */
  vi.doMock("../reflector", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../reflector")>();
    return {
      ...actual,
      runPlannerWithReflection: vi.fn().mockImplementation(async (reflectionArgs) => {
        /* Delegate directly to the mocked runPlannerWithTools */
        const { runPlannerWithTools: mockedPlanner } = await import("../planner-with-tools");
        return mockedPlanner(reflectionArgs);
      }),
    };
  });

  /* Mock the planner-with-tools module at the "seam":
   * the orchestrator treats runPlannerWithTools as a single planner call per turn,
   * so mocking there bypasses the entire tool loop + LLM layer. Keep the real
   * PlannerToolLoopError class so instanceof checks still work. */
  vi.doMock("../planner-with-tools", async (importOriginal) => {
    const actual = await importOriginal<typeof import("../planner-with-tools")>();
    return {
      ...actual,
      runPlannerWithTools: vi.fn().mockImplementation(() => {
        const planner = plannerResponses[plannerCallIndex];
        plannerCallIndex++;
        return Promise.resolve({
          planner,
          toolTraces: [
            {
              tool: "mockedPlannerLoop",
              ok: true,
              meta: { turn: plannerCallIndex - 1, scenarioDriven: true },
            },
          ],
          iterations: 1,
          systemPrompt: "(mocked system prompt)",
          userPrompt: "(mocked user prompt)",
        });
      }),
    };
  });

  /* Mock the provider module:
   * - requestAgentJson: used only for responder + follow-up paths (always returns responderResponse)
   * - requestAgentStream: returns a short ReadableStream
   * - requestAgentWithTools: stub; should NOT be invoked since runPlannerWithTools is mocked
   */
  vi.doMock("../provider", () => ({
    AgentProviderError: class AgentProviderError extends Error {
      code: string;
      status: number;
      constructor(message: string, code = "AGENT_PROVIDER_ERROR", status = 500) {
        super(message);
        this.code = code;
        this.status = status;
      }
    },
    requestAgentJson: vi.fn().mockImplementation(() => Promise.resolve(responderResponse)),
    requestAgentStream: vi.fn().mockImplementation(() =>
      Promise.resolve(
        new ReadableStream<string>({
          start(controller) {
            controller.enqueue("Here is your design prompt summary.");
            controller.close();
          },
        })
      )
    ),
    requestAgentWithTools: vi.fn().mockImplementation(() =>
      Promise.resolve({
        stopReason: "end_turn",
        content: null,
        toolCalls: [],
        rawAssistantMessage: { role: "assistant", content: null },
      })
    ),
    getAgentModelConfig: vi.fn().mockReturnValue({
      apiKey: "test-key",
      model: "test-model",
      baseUrl: "http://localhost",
    }),
    isAgentModelConfigured: vi.fn().mockReturnValue(true),
  }));

  /* Import orchestrator with mocked deps */
  const { runAgentTurn } = await import("../orchestrator");

  const conversation: AgentMessage[] = [];

  for (let index = 0; index < scenario.turns.length; index++) {
    const turn = scenario.turns[index];

    /* Add user message */
    const userMsg: AgentMessage = {
      id: `eval-user-${index}`,
      role: "user",
      content: turn.userMessage,
      createdAt: new Date().toISOString(),
      planner: null,
      codePrompt: null,
      toolTrace: [],
      promptSnapshot: null,
      decisionTrace: [],
    };
    conversation.push(userMsg);

    try {
      const result = await runAgentTurn({
        locale: scenario.locale,
        messages: [...conversation],
        pageContext: undefined,
      });

      const turnResult: EvalTurnResult = {
        turnIndex: index,
        phase: result.planner.phase,
        assistantMessage: result.assistantMessage,
        hasCodePrompt: result.codePrompt !== null,
        slotsFilled: getFilledSlots(result.planner),
        toolTrace: result.toolTrace.map((item) => ({
          tool: item.tool,
          ok: item.ok,
        })),
        turnMetrics: result.turnMetrics,
      };

      turnResults.push(turnResult);

      /* Verify phase */
      if (result.planner.phase !== turn.expectedPhase) {
        errors.push(
          `Turn ${index}: expected phase "${turn.expectedPhase}", got "${result.planner.phase}"`
        );
      }

      /* Verify slot filling */
      if (turn.expectedSlotsFilled) {
        const actual = getFilledSlots(result.planner).sort();
        const expected = [...turn.expectedSlotsFilled].sort();
        if (JSON.stringify(actual) !== JSON.stringify(expected)) {
          errors.push(
            `Turn ${index}: expected slots [${expected}], got [${actual}]`
          );
        }
      }

      /* Verify code prompt presence */
      if (turn.shouldProduceCodePrompt !== undefined) {
        if (turn.shouldProduceCodePrompt && !result.codePrompt) {
          errors.push(`Turn ${index}: expected codePrompt but got null`);
        }
        if (!turn.shouldProduceCodePrompt && result.codePrompt) {
          errors.push(`Turn ${index}: expected no codePrompt but got one`);
        }
      }

      /* Add assistant message to conversation */
      const assistantMsg: AgentMessage = {
        id: `eval-assistant-${index}`,
        role: "assistant",
        content: result.assistantMessage,
        createdAt: new Date().toISOString(),
        planner: result.planner,
        codePrompt: result.codePrompt,
        toolTrace: result.toolTrace,
        promptSnapshot: result.promptSnapshot,
        decisionTrace: result.decisionTrace,
      };
      conversation.push(assistantMsg);
    } catch (error) {
      errors.push(
        `Turn ${index}: threw error: ${error instanceof Error ? error.message : String(error)}`
      );
      turnResults.push({
        turnIndex: index,
        phase: "error",
        assistantMessage: "",
        hasCodePrompt: false,
        slotsFilled: [],
        toolTrace: [],
      });
    }
  }

  return {
    scenarioId: scenario.id,
    turns: turnResults,
    passed: errors.length === 0,
    errors,
  };
}
