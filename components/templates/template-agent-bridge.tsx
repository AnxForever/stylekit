"use client";

import { useCallback, useEffect, useState } from "react";
import { createAgent } from "@ui-sdk/react/agent";

import {
  expectValue,
  findEntry,
  runAgentScenario,
  type AgentProbe,
  type AgentScenario,
  type AgentScenarioReport,
} from "@/lib/agent/scenario";

type UiSdkAgent = ReturnType<typeof createAgent>;

type PlanStep = { ref: string; action: string; args: unknown[] };

type PlanPayload = {
  source: string;
  model: string;
  plan: { steps: PlanStep[]; note: string | null };
};

type AiState =
  | { status: "idle" }
  | { status: "running" }
  | {
      status: "done";
      report: AgentScenarioReport;
      steps: number;
      source: string;
      model: string;
      note: string | null;
      elapsedMs: number;
    }
  | { status: "error"; message: string };

declare global {
  interface Window {
    __uiAgent?: UiSdkAgent;
    __stylekitAgentCheck?: () => Promise<AgentScenarioReport>;
  }
}

// One bridge per tab. createAgent() has no destroy(), so a module-level
// singleton keeps layout remounts from stacking bridges.
let bridge: UiSdkAgent | null = null;

function getBridge(): UiSdkAgent {
  bridge ??= createAgent();
  return bridge;
}

function wait(ms: number) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, ms);
  });
}

function expectUserRows(count: number): AgentProbe {
  return () => {
    const rows = document.querySelectorAll("tbody tr").length;
    return rows === count ? null : `用户表格行数是 ${rows}，期望 ${count}`;
  };
}

function clickNativeButton(text: string): string | null {
  const button = [...document.querySelectorAll("button")].find(
    (element) => element.textContent?.trim() === text
  );
  if (!button) return `找不到按钮「${text}」`;
  button.click();
  return null;
}

const filterTrigger = () =>
  document.querySelector('button[aria-label="Filter by status"]');

// This scenario is written for the admin-panel demo, which is the site's
// reference rendering of a generated frontend, so it doubles as the reference
// for what an agent can verify: bridge state, the visible result, and the one
// step the bridge cannot see (a native button that opens a dialog).
const ADMIN_PANEL_SCENARIO: AgentScenario = {
  name: "admin-panel 交互自检",
  steps: [
    {
      title: "状态筛选切到 Active，表格只剩 4 行",
      target: "Filter by status",
      action: "setValue",
      args: ["Active"],
      expect: expectValue("Filter by status", "Active"),
      probe: expectUserRows(4),
    },
    {
      title: "恢复 All，表格回到 6 行",
      target: "Filter by status",
      action: "setValue",
      args: ["All"],
      expect: expectValue("Filter by status", "All"),
      probe: expectUserRows(6),
    },
    {
      title: "打开新增用户弹窗（原生按钮不在桥里，需要一次 DOM 点击）",
      probe: async (agent) => {
        const clickError = clickNativeButton("+ Add User");
        if (clickError) return clickError;
        for (let attempt = 0; attempt < 20; attempt += 1) {
          if (findEntry(agent.snapshot(), "Role")) return null;
          await wait(50);
        }
        return "弹窗打开后 Role 没有出现在 snapshot 里";
      },
    },
    {
      title: "在弹窗里把 Role 设为 Editor",
      target: "Role",
      action: "setValue",
      args: ["Editor"],
      expect: expectValue("Role", "Editor"),
    },
    {
      title: "关闭弹窗",
      probe: async () => {
        const closeButton = document.querySelector<HTMLButtonElement>(
          'button[aria-label="Close modal"]'
        );
        if (!closeButton) return "弹窗没有打开";
        closeButton.click();
        await wait(150);
        return document.querySelector('button[aria-label="Close modal"]')
          ? "弹窗没有关闭"
          : null;
      },
    },
  ],
};

const AI_GOAL =
  "把用户表格的状态筛选设为 Suspended（挂起），让表格只显示挂起的用户。";

const AI_GOAL_PROBE: AgentProbe = () => {
  const filterText = filterTrigger()?.textContent ?? "";
  if (!filterText.includes("Suspended")) return "筛选没有切到 Suspended";
  const rows = document.querySelectorAll("tbody tr").length;
  return rows === 1 ? null : `用户表格行数是 ${rows}，期望 1`;
};

const RESET_SCENARIO: AgentScenario = {
  name: "恢复默认状态",
  steps: [
    {
      title: "恢复 All",
      target: "Filter by status",
      action: "setValue",
      args: ["All"],
      expect: expectValue("Filter by status", "All"),
      probe: expectUserRows(6),
    },
  ],
};

function planValue(value: unknown): string | number | boolean | null | undefined {
  return typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean" ||
    value === null
    ? value
    : undefined;
}

async function requestPlan(
  snapshot: unknown,
  mode: "live" | "replay"
): Promise<{ response: Response; payload: PlanPayload & { error?: string } }> {
  const response = await fetch("/api/ai/agent-plan", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ goal: AI_GOAL, snapshot, mode }),
  });
  const payload = (await response.json()) as PlanPayload & { error?: string };
  return { response, payload };
}

function runPlan(
  agent: UiSdkAgent,
  steps: PlanStep[]
): Promise<AgentScenarioReport> {
  const scenario: AgentScenario = {
    name: "AI 规划",
    steps: [
      ...steps.map((step, index) => ({
        title: `AI 步骤 ${index + 1}：${step.action}`,
        target: step.ref,
        action: step.action,
        args: step.args,
      })),
      { title: "目标达成：筛选 Suspended，表格 1 行", probe: AI_GOAL_PROBE },
    ],
  };
  return runAgentScenario(agent, scenario);
}

function AgentCheckPanel({
  report,
  running,
  onRun,
  ai,
  onRunAi,
}: {
  report: AgentScenarioReport;
  running: boolean;
  onRun: () => Promise<unknown>;
  ai: AiState;
  onRunAi: () => Promise<unknown>;
}) {
  const aiBusy = ai.status === "running";

  return (
    <aside
      data-testid="agent-check-panel"
      className="fixed bottom-4 right-4 z-[60] w-[23rem] max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white/95 p-4 text-xs text-gray-700 shadow-xl backdrop-blur"
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium">Agent 自检</span>
        <span
          data-testid="agent-check-status"
          className={`font-mono text-[11px] tracking-wide ${
            report.ok ? "text-emerald-600" : "text-red-600"
          }`}
        >
          {report.ok ? "PASS" : "FAIL"}
        </span>
      </div>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-gray-400">
        {report.name} · 人写 {report.steps.length} 步
      </p>
      <ul className="mt-3 space-y-2">
        {report.steps.map((step, index) => (
          <li key={index} className="flex gap-2">
            <span
              className={`shrink-0 font-mono text-[10px] ${
                step.ok ? "text-emerald-600" : "text-red-500"
              }`}
            >
              {step.ok ? "PASS" : "FAIL"}
            </span>
            <span className="flex-1 leading-5">
              {step.title}
              {step.detail ? (
                <span className="mt-0.5 block text-[11px] text-red-500">
                  {step.detail}
                </span>
              ) : null}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-3 border-t border-gray-200 pt-3">
        <div className="flex items-center justify-between gap-2">
          <span className="font-medium">AI 规划</span>
          <span
            data-testid="agent-ai-status"
            className={`font-mono text-[11px] tracking-wide ${
              ai.status === "done"
                ? ai.report.ok
                  ? "text-emerald-600"
                  : "text-red-600"
                : ai.status === "error"
                  ? "text-red-600"
                  : "text-gray-400"
            }`}
          >
            {ai.status === "done"
              ? ai.report.ok
                ? "PASS"
                : "FAIL"
              : ai.status === "error"
                ? "ERROR"
                : aiBusy
                  ? "运行中"
                  : "未运行"}
          </span>
        </div>

        {ai.status === "done" ? (
          <div className="mt-2 space-y-1 leading-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-gray-400">
              {ai.source} / {ai.model} · AI {ai.steps} 步 / 人写{" "}
              {report.steps.length} 步 · {ai.elapsedMs}ms
            </p>
            {ai.note ? <p className="text-gray-500">模型备注：{ai.note}</p> : null}
            {ai.report.steps
              .filter((step) => !step.ok)
              .map((step, index) => (
                <p key={index} className="text-red-500">
                  {step.title}：{step.detail}
                </p>
              ))}
          </div>
        ) : null}

        {ai.status === "error" ? (
          <p className="mt-2 text-red-500">{ai.message}</p>
        ) : null}

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => {
              void onRun();
            }}
            disabled={running || aiBusy}
            className="rounded-md border border-gray-200 px-3 py-1.5 text-[11px] font-medium transition-colors hover:border-gray-400 disabled:opacity-50"
          >
            {running ? "运行中" : "重新自检"}
          </button>
          <button
            type="button"
            data-testid="agent-ai-run"
            onClick={() => {
              void onRunAi();
            }}
            disabled={aiBusy || running}
            className="rounded-md border border-gray-300 bg-gray-900 px-3 py-1.5 text-[11px] font-medium text-white transition-colors hover:bg-gray-700 disabled:opacity-50"
          >
            {aiBusy ? "AI 规划中" : "AI 规划并执行"}
          </button>
        </div>
      </div>
    </aside>
  );
}

// Template demos are the site's rendering of a generated frontend, so they are
// also where an agent is most useful: every ui-sdk control on the page reports
// its state and actions through the bridge, and an agent can drive it by ref
// instead of guessing selectors. The bridge runs with no allow callback, which
// is the safe default: steps marked with data-agent-confirm stay unanswerable,
// and everything else is a local UI state change. Exposing it on window lets an
// in-page tool or a browser agent call snapshot() and act() directly; the
// scenario runner behind ?agent-check=1 is the same loop as a visible report,
// and the AI button puts a model in that loop: snapshot -> plan -> act -> check.
export function TemplateAgentBridge() {
  const [report, setReport] = useState<AgentScenarioReport | null>(null);
  const [running, setRunning] = useState(false);
  const [ai, setAi] = useState<AiState>({ status: "idle" });

  const runCheck = useCallback(async () => {
    setRunning(true);
    try {
      const next = await runAgentScenario(getBridge(), ADMIN_PANEL_SCENARIO);
      setReport(next);
      return next;
    } finally {
      setRunning(false);
    }
  }, []);

  const runAi = useCallback(async () => {
    setAi({ status: "running" });
    const agent = getBridge();
    const startedAt = Date.now();
    const snapshot = agent.snapshot().map((entry) => ({
      ref: entry.ref,
      component: entry.component,
      ...(entry.label ? { label: entry.label } : {}),
      ...(entry.actions ? { actions: entry.actions } : {}),
      ...(planValue(entry.value) !== undefined
        ? { value: planValue(entry.value) }
        : {}),
      ...(typeof entry.checked === "boolean" ? { checked: entry.checked } : {}),
    }));

    try {
      let { response, payload } = await requestPlan(snapshot, "live");
      if (response.status === 503) {
        ({ response, payload } = await requestPlan(snapshot, "replay"));
      }
      if (!response.ok) {
        throw new Error(payload.error ?? `规划请求失败（HTTP ${response.status}）`);
      }
      if (!Array.isArray(payload.plan?.steps) || payload.plan.steps.length === 0) {
        throw new Error("模型没有返回可执行步骤");
      }

      const planReport = await runPlan(agent, payload.plan.steps);
      await runAgentScenario(agent, RESET_SCENARIO);
      setAi({
        status: "done",
        report: planReport,
        steps: payload.plan.steps.length,
        source: payload.source,
        model: payload.model,
        note: payload.plan.note,
        elapsedMs: Date.now() - startedAt,
      });
    } catch (error) {
      await runAgentScenario(agent, RESET_SCENARIO);
      setAi({
        status: "error",
        message: error instanceof Error ? error.message : "规划请求失败",
      });
    }
  }, []);

  useEffect(() => {
    window.__uiAgent = getBridge();
    window.__stylekitAgentCheck = runCheck;
    const autoRun =
      new URLSearchParams(window.location.search).get("agent-check") === "1";
    // Deferred so the first paint is not held up and the check starts after
    // the page has mounted its controls.
    const timer = autoRun
      ? window.setTimeout(() => {
          void runCheck();
        }, 0)
      : null;
    return () => {
      if (timer !== null) window.clearTimeout(timer);
      delete window.__uiAgent;
      delete window.__stylekitAgentCheck;
    };
  }, [runCheck]);

  if (!report) return null;

  return (
    <AgentCheckPanel
      report={report}
      running={running}
      onRun={runCheck}
      ai={ai}
      onRunAi={runAi}
    />
  );
}
