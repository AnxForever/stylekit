"use client";

import { createAgent } from "@ui-sdk/react/agent";

// Probe only: proves the agent bridge reads the ui-sdk components on this
// page and can act on them without touching the DOM. Product surfaces should
// keep an allow callback that answers per action and mark destructive steps
// with data-agent-confirm; this page reads and writes two local states only,
// so it accepts every supported action.
const agent = createAgent();

declare global {
  interface Window {
    __uiAgent?: typeof agent;
  }
}

if (typeof window !== "undefined") {
  window.__uiAgent = agent;
}
