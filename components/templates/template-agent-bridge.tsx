"use client";

import { useEffect } from "react";
import { createAgent } from "@ui-sdk/react/agent";

type UiSdkAgent = ReturnType<typeof createAgent>;

declare global {
  interface Window {
    __uiAgent?: UiSdkAgent;
  }
}

// One bridge per tab. createAgent() has no destroy(), so a module-level
// singleton keeps layout remounts from stacking bridges.
let bridge: UiSdkAgent | null = null;

function getBridge(): UiSdkAgent {
  bridge ??= createAgent();
  return bridge;
}

// Template demos are the site's rendering of a generated frontend, so they are
// also where an agent is most useful: every ui-sdk control on the page reports
// its state and actions through the bridge, and an agent can drive it by ref
// instead of guessing selectors. The bridge runs with no allow callback, which
// is the safe default: steps marked with data-agent-confirm stay unanswerable,
// and everything else is a local UI state change. Exposing it on window lets an
// in-page tool or a browser agent call snapshot() and act() directly.
export function TemplateAgentBridge() {
  useEffect(() => {
    window.__uiAgent = getBridge();
    return () => {
      delete window.__uiAgent;
    };
  }, []);

  return null;
}
