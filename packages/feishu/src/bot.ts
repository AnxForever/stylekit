/**
 * Bot context: what every flow needs, built once at startup.
 */

import type { LarkChannel } from "@larksuite/channel";
import type { LlmClient } from "./llm/index.js";
import { ChatStore } from "./state.js";

export interface BotContext {
  channel: LarkChannel;
  /** Lazily built; the compliance flow works without an LLM. */
  getLlm: () => LlmClient;
  store: ChatStore;
}
