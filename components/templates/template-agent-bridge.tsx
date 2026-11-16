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

function AgentCheckPanel({
  report,
  running,
  onRun,
}: {
  report: AgentScenarioReport;
  running: boolean;
  onRun: () => Promise<unknown>;
}) {
  return (
    <aside
      data-testid="agent-check-panel"
      className="fixed bottom-4 right-4 z-[60] w-[22rem] max-w-[calc(100vw-2rem)] rounded-xl border border-gray-200 bg-white/95 p-4 text-xs text-gray-700 shadow-xl backdrop-blur"
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
        {report.name}
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
      <button
        type="button"
        onClick={() => {
          void onRun();
        }}
        disabled={running}
        className="mt-3 rounded-md border border-gray-200 px-3 py-1.5 text-[11px] font-medium transition-colors hover:border-gray-400 disabled:opacity-50"
      >
        {running ? "运行中" : "重新运行"}
      </button>
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
// scenario runner behind ?agent-check=1 is the same loop as a visible report.
export function TemplateAgentBridge() {
  const [report, setReport] = useState<AgentScenarioReport | null>(null);
  const [running, setRunning] = useState(false);

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

  return <AgentCheckPanel report={report} running={running} onRun={runCheck} />;
}
