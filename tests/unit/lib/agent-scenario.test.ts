import { describe, expect, it } from "vitest";
import {
  expectChecked,
  expectValue,
  findEntry,
  runAgentScenario,
  type AgentActResult,
  type AgentBridgeLike,
  type AgentSnapshotEntry,
  type AgentScenario,
} from "@/lib/agent/scenario";

type FakeState = { value?: unknown; checked?: unknown; actions?: string[] };

function fakeBridge(
  initial: Record<string, FakeState>,
  actResult: AgentActResult = { ok: true },
  options: { apply?: boolean } = {}
) {
  const apply = options.apply ?? true;
  const state = new Map(Object.entries(initial));
  const calls: Array<{ ref: string; action: string; args: unknown[] }> = [];

  const bridge: AgentBridgeLike = {
    snapshot: (): AgentSnapshotEntry[] =>
      [...state.entries()].map(([label, entry]) => ({
        ref: label,
        component: "select",
        label,
        value: entry.value,
        checked: entry.checked,
        actions: entry.actions ?? ["setValue"],
      })),
    act: async (input) => {
      calls.push(input.steps[0]);
      if (!actResult.ok || !apply) return actResult;
      for (const step of input.steps) {
        const entry = state.get(step.ref);
        if (!entry) continue;
        if (step.action === "setValue") entry.value = step.args[0];
        if (step.action === "setChecked") entry.checked = step.args[0];
      }
      return actResult;
    },
  };

  return { bridge, state, calls };
}

describe("findEntry", () => {
  it("prefers an exact ref over a label match", () => {
    const snapshot: AgentSnapshotEntry[] = [
      { ref: "c1", component: "select", label: "Role", actions: [] },
      { ref: "c2", component: "select", label: "c1", actions: [] },
    ];
    expect(findEntry(snapshot, "c1")?.component).toBe("select");
    expect(findEntry(snapshot, "c1")?.label).toBe("Role");
  });
});

describe("runAgentScenario", () => {
  it("acts, then asserts state and probe", async () => {
    const { bridge, calls } = fakeBridge({ "Filter by status": { value: "All" } });
    const probes: string[] = [];
    const scenario: AgentScenario = {
      name: "status filter",
      steps: [
        {
          title: "set Active",
          target: "Filter by status",
          action: "setValue",
          args: ["Active"],
          expect: expectValue("Filter by status", "Active"),
          probe: () => {
            probes.push("rows");
            return null;
          },
        },
      ],
    };

    const report = await runAgentScenario(bridge, scenario);

    expect(report.ok).toBe(true);
    expect(report.steps).toEqual([{ title: "set Active", ok: true }]);
    expect(calls).toEqual([{ ref: "Filter by status", action: "setValue", args: ["Active"] }]);
    expect(probes).toEqual(["rows"]);
  });

  it("stops at a failed expectation and reports the actual value", async () => {
    const { bridge } = fakeBridge({ Role: { value: "Viewer" } }, { ok: true }, { apply: false });
    const report = await runAgentScenario(bridge, {
      name: "role",
      steps: [
        {
          title: "set Editor",
          target: "Role",
          action: "setValue",
          args: ["Editor"],
          expect: expectValue("Role", "Editor"),
        },
        { title: "never reached", target: "Role", action: "setValue", args: ["Admin"] },
      ],
    });

    expect(report.ok).toBe(false);
    expect(report.steps).toHaveLength(1);
    expect(report.steps[0].ok).toBe(false);
    expect(report.steps[0].detail).toContain("Viewer");
  });

  it("reports a missing target without acting", async () => {
    const { bridge, calls } = fakeBridge({ Role: { value: "Viewer" } });
    const report = await runAgentScenario(bridge, {
      name: "missing",
      steps: [{ title: "set", target: "Timezone", action: "setValue", args: ["UTC"] }],
    });

    expect(report.ok).toBe(false);
    expect(report.steps[0].detail).toContain("Timezone");
    expect(calls).toEqual([]);
  });

  it("rejects an action the component does not expose", async () => {
    const { bridge } = fakeBridge({ Switch: { checked: true, actions: ["setChecked"] } });
    const report = await runAgentScenario(bridge, {
      name: "unsupported",
      steps: [{ title: "press", target: "Switch", action: "press" }],
    });

    expect(report.ok).toBe(false);
    expect(report.steps[0].detail).toContain("setChecked");
  });

  it("surfaces the bridge's own step error", async () => {
    const { bridge } = fakeBridge(
      { Role: { value: "Viewer" } },
      { ok: false, steps: [{ step: 0, error: "Needs a person" }] }
    );
    const report = await runAgentScenario(bridge, {
      name: "refused",
      steps: [{ title: "set", target: "Role", action: "setValue", args: ["Admin"] }],
    });

    expect(report.ok).toBe(false);
    expect(report.steps[0].detail).toBe("Needs a person");
  });

  it("fails the step when the probe fails even if the state matches", async () => {
    const { bridge } = fakeBridge({ Role: { value: "Viewer" } });
    const report = await runAgentScenario(bridge, {
      name: "probe",
      steps: [
        {
          title: "set",
          target: "Role",
          action: "setValue",
          args: ["Viewer"],
          expect: expectValue("Role", "Viewer"),
          probe: () => "表格行数是 0",
        },
      ],
    });

    expect(report.ok).toBe(false);
    expect(report.steps[0].detail).toContain("表格行数");
  });

  it("checks boolean state with expectChecked", async () => {
    const { bridge } = fakeBridge({ Switch: { checked: true, actions: ["setChecked"] } });
    const passing = await runAgentScenario(bridge, {
      name: "checked",
      steps: [
        {
          title: "turn off",
          target: "Switch",
          action: "setChecked",
          args: [false],
          expect: expectChecked("Switch", false),
        },
      ],
    });
    expect(passing.ok).toBe(true);
  });

  it("runs a probe-only step so a scenario can wait for a new component", async () => {
    const { bridge } = fakeBridge({ Role: { value: "Viewer" } });
    const report = await runAgentScenario(bridge, {
      name: "probe only",
      steps: [{ title: "open dialog", probe: () => (findEntry(bridge.snapshot(), "Role") ? null : "missing") }],
    });

    expect(report.ok).toBe(true);
  });
});
