import { describe, it, expect, beforeEach, vi } from "vitest";
import { evalScenarios } from "./eval-scenarios";
import { runEvalScenario } from "./eval-harness";

beforeEach(() => {
  vi.restoreAllMocks();
});

describe("agent eval", () => {
  for (const scenario of evalScenarios) {
    describe(scenario.name, () => {
      it("completes all turns with correct phase progression", async () => {
        const result = await runEvalScenario(scenario);

        for (let index = 0; index < scenario.turns.length; index++) {
          const expected = scenario.turns[index].expectedPhase;
          const actual = result.turns[index]?.phase;
          expect(actual, `Turn ${index} phase`).toBe(expected);
        }
      });

      it("reaches done phase on final turn", async () => {
        const result = await runEvalScenario(scenario);
        const lastTurn = result.turns[result.turns.length - 1];
        expect(lastTurn.phase).toBe("done");
      });

      it("produces codePrompt only on the done turn", async () => {
        const result = await runEvalScenario(scenario);

        for (let index = 0; index < result.turns.length; index++) {
          const turn = result.turns[index];
          const expected = scenario.turns[index].shouldProduceCodePrompt;
          if (expected !== undefined) {
            expect(
              turn.hasCodePrompt,
              `Turn ${index}: codePrompt presence`
            ).toBe(expected);
          }
        }
      });

      it("fills expected slots at each turn", async () => {
        const result = await runEvalScenario(scenario);

        for (let index = 0; index < scenario.turns.length; index++) {
          const expected = scenario.turns[index].expectedSlotsFilled;
          if (!expected) continue;

          const actual = result.turns[index]?.slotsFilled ?? [];
          expect(
            [...actual].sort(),
            `Turn ${index} slots`
          ).toEqual([...expected].sort());
        }
      });

      it("passes all assertions without errors", async () => {
        const result = await runEvalScenario(scenario);
        expect(result.errors).toEqual([]);
        expect(result.passed).toBe(true);
      });
    });
  }

  describe("scenario-specific checks", () => {
    it("happy-path has exactly 5 turns", () => {
      const scenario = evalScenarios.find((item) => item.id === "happy-path");
      expect(scenario).toBeDefined();
      expect(scenario!.turns).toHaveLength(5);
    });

    it("quick-skip has exactly 3 turns", () => {
      const scenario = evalScenarios.find((item) => item.id === "quick-skip");
      expect(scenario).toBeDefined();
      expect(scenario!.turns).toHaveLength(3);
    });

    it("revise-loop has exactly 6 turns", () => {
      const scenario = evalScenarios.find((item) => item.id === "revise-loop");
      expect(scenario).toBeDefined();
      expect(scenario!.turns).toHaveLength(6);
    });

    it("revise-loop includes a revise phase", () => {
      const scenario = evalScenarios.find((item) => item.id === "revise-loop");
      expect(scenario).toBeDefined();
      const revisePhases = scenario!.turns.filter(
        (turn) => turn.expectedPhase === "revise"
      );
      expect(revisePhases.length).toBeGreaterThanOrEqual(1);
    });

    it("chinese-locale uses zh locale", () => {
      const scenario = evalScenarios.find((item) => item.id === "chinese-locale");
      expect(scenario).toBeDefined();
      expect(scenario!.locale).toBe("zh");
    });

    it("snapshot-integrity final turn has all 5 slots filled", () => {
      const scenario = evalScenarios.find((item) => item.id === "snapshot-integrity");
      expect(scenario).toBeDefined();
      const lastTurn = scenario!.turns[scenario!.turns.length - 1];
      expect(lastTurn.expectedSlotsFilled).toEqual(
        expect.arrayContaining([
          "productType",
          "audience",
          "visualTone",
          "mustHave",
          "constraints",
        ])
      );
    });
  });
});
