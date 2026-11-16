// A scenario turns the ui-sdk agent bridge into a repeatable check: read the
// page, act on a component by label, then assert both the component state and
// the visible result. Tools and tests share this runner, so "the agent checked
// its own output" is a function call instead of a bespoke script per page.

export type AgentSnapshotEntry = {
  ref: string;
  component: string;
  label?: string;
  value?: unknown;
  checked?: unknown;
  actions: string[];
};

export type AgentStepInput = {
  ref: string;
  action: string;
  args: unknown[];
};

export type AgentActResult = {
  ok: boolean;
  error?: string | { message?: string };
  steps?: Array<{ step?: number; error?: string }>;
};

export type AgentBridgeLike = {
  snapshot: () => AgentSnapshotEntry[];
  act: (input: { steps: AgentStepInput[] }) => Promise<AgentActResult>;
};

// Returns null when the expectation holds, or the reason it failed.
export type AgentExpectation = (snapshot: AgentSnapshotEntry[]) => string | null;

// Checks the page itself, for outcomes the bridge cannot see (a filtered table,
// a dialog that opened). Runs after the action and the state expectation.
export type AgentProbe = (
  bridge: AgentBridgeLike
) => Promise<string | null> | string | null;

export type AgentScenarioStep = {
  title: string;
  target?: string;
  action?: string;
  args?: unknown[];
  expect?: AgentExpectation;
  probe?: AgentProbe;
};

export type AgentScenario = { name: string; steps: AgentScenarioStep[] };

export type AgentScenarioStepResult = {
  title: string;
  ok: boolean;
  detail?: string;
};

export type AgentScenarioReport = {
  name: string;
  ok: boolean;
  steps: AgentScenarioStepResult[];
};

export function findEntry(
  snapshot: AgentSnapshotEntry[],
  target: string
): AgentSnapshotEntry | undefined {
  return (
    snapshot.find((entry) => entry.ref === target) ??
    snapshot.find((entry) => entry.label === target)
  );
}

function formatValue(value: unknown): string {
  return typeof value === "string" ? `"${value}"` : String(value);
}

function describeError(error: AgentActResult["error"]): string | undefined {
  if (!error) return undefined;
  return typeof error === "string" ? error : error.message;
}

export function expectValue(target: string, value: unknown): AgentExpectation {
  return (snapshot) => {
    const entry = findEntry(snapshot, target);
    if (!entry) return `"${target}" 不在页面 snapshot 里`;
    return Object.is(entry.value, value)
      ? null
      : `"${target}" 的值是 ${formatValue(entry.value)}，期望 ${formatValue(value)}`;
  };
}

export function expectChecked(target: string, checked: boolean): AgentExpectation {
  return (snapshot) => {
    const entry = findEntry(snapshot, target);
    if (!entry) return `"${target}" 不在页面 snapshot 里`;
    return entry.checked === checked
      ? null
      : `"${target}" 的选中状态是 ${String(entry.checked)}，期望 ${String(checked)}`;
  };
}

export async function runAgentScenario(
  bridge: AgentBridgeLike,
  scenario: AgentScenario
): Promise<AgentScenarioReport> {
  const passed: AgentScenarioStepResult[] = [];

  function fail(title: string, detail: string): AgentScenarioReport {
    return {
      name: scenario.name,
      ok: false,
      steps: [...passed, { title, ok: false, detail }],
    };
  }

  for (const step of scenario.steps) {
    let targetRef: string | undefined;

    if (step.target) {
      const entry = findEntry(bridge.snapshot(), step.target);
      if (!entry) return fail(step.title, `"${step.target}" 不在页面 snapshot 里`);
      if (step.action && !entry.actions.includes(step.action)) {
        return fail(
          step.title,
          `"${step.target}" 不支持 ${step.action}（可用：${entry.actions.join(", ")}）`
        );
      }
      targetRef = entry.ref;
    }

    if (step.action) {
      if (!targetRef) return fail(step.title, "动作缺少 target");
      const result = await bridge.act({
        steps: [{ ref: targetRef, action: step.action, args: step.args ?? [] }],
      });
      if (!result.ok) {
        const stepError = result.steps?.find((item) => item.error)?.error;
        return fail(
          step.title,
          stepError ?? describeError(result.error) ?? "动作执行失败"
        );
      }
    }

    const expectationError = step.expect?.(bridge.snapshot()) ?? null;
    if (expectationError) return fail(step.title, expectationError);

    const probeError = step.probe ? await step.probe(bridge) : null;
    if (probeError) return fail(step.title, probeError);

    passed.push({ title: step.title, ok: true });
  }

  return { name: scenario.name, ok: true, steps: passed };
}
