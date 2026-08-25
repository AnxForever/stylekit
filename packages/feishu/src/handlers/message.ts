/**
 * Inbound message routing.
 *
 * Code gets the compliance check; everything else is treated as a design
 * brief. The heuristic is deliberately conservative: a brief in Chinese
 * asking for a landing page will never match, and a pasted component always
 * will.
 */

import type { NormalizedMessage } from "@larksuite/channel";
import type { BotContext } from "../bot.js";
import { runComplianceFlow } from "../flows/compliance.js";
import { runRecommendFlow } from "../flows/recommend.js";

const CODE_MARKERS = [
  /className=/,
  /class="/,
  /<\/[a-z]+>/,
  /^import\s/m,
  /^export\s/m,
  /tailwind/i,
  /@media\s/,
  /font-(sans|serif|mono)/,
];

function looksLikeCode(content: string): boolean {
  return CODE_MARKERS.some((marker) => marker.test(content));
}

export async function handleMessage(
  ctx: BotContext,
  msg: NormalizedMessage,
): Promise<void> {
  // "@bot" with no text is a nudge, not a request.
  if (msg.mentionedBot && !msg.content.trim()) {
    await ctx.channel.reply(msg, {
      markdown: "在的。@我一句话描述需求，我来选风格；代码写完贴回群里，我来体检。",
    });
    return;
  }

  const content = msg.content.trim();
  if (!content) return;

  if (looksLikeCode(content)) {
    await runComplianceFlow(ctx, msg.chatId, content);
    return;
  }

  await runRecommendFlow(ctx, msg.chatId, content);
}
