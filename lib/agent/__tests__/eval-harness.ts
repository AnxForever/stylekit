import { vi } from "vitest";
import type { EvalScenario, EvalTurn } from "./eval-scenarios";
import type { AgentMessage, AgentCodePrompt, AgentToolTrace } from "../types";

export interface EvalTurnResult {
  turnIndex: number;
  phase: string;
  assistantMessage: string;
  hasCodePrompt: boolean;
  slotsFilled: string[];
  toolTrace: Array<{ tool: string; ok: boolean }>;
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

  /* Build mock planner responses queue */
  let plannerCallIndex = 0;
  const plannerResponses = scenario.turns.map((turn) => turn.mockPlannerResult);

  const responderResponse = { assistantMessage: "Here is your design prompt summary." };

  /* Mock the provider module */
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
    requestAgentJson: vi.fn().mockImplementation(() => {
      const result = plannerResponses[plannerCallIndex];
      if (result) {
        /* If this is a done-phase planner, the next call will be the responder */
        if (result.phase === "done" && result.ready) {
          plannerCallIndex++;
          /* Return planner result first, then responder on second call */
          let callCount = 0;
          const currentPlanner = result;
          return new Promise((resolve) => {
            /* First call: planner */
            resolve(currentPlanner);
          });
        }
        plannerCallIndex++;
        return Promise.resolve(result);
      }
      return Promise.resolve(responderResponse);
    }),
    requestAgentStream: vi.fn().mockImplementation(() => {
      return Promise.resolve(
        new ReadableStream({
          start(controller) {
            controller.enqueue("Here is your design prompt summary.");
            controller.close();
          },
        })
      );
    }),
    getAgentModelConfig: vi.fn().mockReturnValue({
      apiKey: "test-key",
      model: "test-model",
      baseUrl: "http://localhost",
    }),
    isAgentModelConfigured: vi.fn().mockReturnValue(true),
  }));

  /* Import orchestrator with mocked provider */
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

    /* For done-phase turns, the mock needs to handle both planner + responder calls.
       Reset the mock to return planner first, then responder. */
    if (turn.mockPlannerResult.phase === "done" && turn.mockPlannerResult.ready) {
      const { requestAgentJson } = await import("../provider");
      const mockFn = requestAgentJson as ReturnType<typeof vi.fn>;
      let doneCallCount = 0;
      mockFn.mockImplementation(() => {
        doneCallCount++;
        if (doneCallCount === 1) {
          return Promise.resolve(turn.mockPlannerResult);
        }
        return Promise.resolve(responderResponse);
      });
    }

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
