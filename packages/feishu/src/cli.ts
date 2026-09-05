/**
 * Entry point.
 *
 * Connects the channel over WebSocket — no public URL, no tunnel — and routes
 * every event to the handler. Group messages only fire when someone @-mentions
 * the bot; that keeps the bot quiet in unrelated chatter and is also the
 * convention the winning "digital employee" entries followed.
 */

import { createLarkChannel } from "@larksuite/channel";
import { loadFeishuConfig } from "./config.js";
import { loadLlmClient, LlmError } from "./llm/index.js";
import { ChatStore } from "./state.js";
import { acquireSingletonLock } from "./singleton.js";
import type { BotContext } from "./bot.js";
import { handleMessage } from "./handlers/message.js";
import { handleCardAction } from "./handlers/card-action.js";

async function main(): Promise<void> {
  acquireSingletonLock();
  const { appId, appSecret } = loadFeishuConfig();

  const channel = createLarkChannel({
    appId,
    appSecret,
    policy: {
      requireMention: true,
      dmMode: "open",
      groupAllowlist: (process.env.FEISHU_ALLOWED_GROUPS ?? "")
        .split(",")
        .map((id) => id.trim())
        .filter(Boolean),
      respondToMentionAll: true,
    },
  });

  let cachedLlm: ReturnType<typeof loadLlmClient> | null = null;
  const ctx: BotContext = {
    channel,
    getLlm: () => {
      // Lazy: the compliance flow and the nudge reply work without an LLM,
      // so a missing key should not stop the bot from connecting.
      if (!cachedLlm) cachedLlm = loadLlmClient();
      return cachedLlm;
    },
    store: new ChatStore(),
  };

  channel.on("message", (msg) => handleMessage(ctx, msg));
  channel.on("cardAction", (event) => handleCardAction(ctx, event));
  channel.on("error", (error) => {
    console.error("[stylekit-feishu] channel error:", error.message);
  });

  await channel.connect();
  const bot = channel.getBotIdentity();
  console.log(
    `[stylekit-feishu] connected as ${bot.name} (${bot.openId}). ` +
      `@-mention me in a group to start.`,
  );

  try {
    ctx.getLlm();
    console.log("[stylekit-feishu] LLM configured.");
  } catch (error) {
    if (error instanceof LlmError) {
      console.warn(`[stylekit-feishu] LLM not configured: ${error.message}`);
    } else {
      throw error;
    }
  }
}

main().catch((error: unknown) => {
  console.error(
    "[stylekit-feishu] fatal:",
    error instanceof Error ? error.message : error,
  );
  process.exitCode = 1;
});
