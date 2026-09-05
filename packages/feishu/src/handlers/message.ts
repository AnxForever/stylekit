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
import { parseCommand, buildHelpText } from "../flows/commands.js";
import { catalogCount, catalogByCategory, inspectStyle } from "../flows/catalog.js";

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

  const command = parseCommand(content);
  switch (command) {
    case "help":
      await ctx.channel.reply(msg, { markdown: buildHelpText() });
      return;
    case "count":
      await ctx.channel.reply(msg, {
        markdown: `目录里有 **${catalogCount()}** 个风格。说一句需求，我来帮你选。`,
      });
      return;
    case "styles":
      await ctx.channel.reply(msg, { markdown: catalogByCategory() });
      return;
    case "inspect": {
      const slugMatch = content.match(/^(?:查|看看|了解|inspect)\s+(?:风格\s+)?(\S+)/i);
      const slug = slugMatch?.[1];
      if (!slug) {
        await ctx.channel.reply(msg, { markdown: "用法：`查 <slug>`，比如 `查 glassmorphism`" });
        return;
      }
      const detail = inspectStyle(slug);
      await ctx.channel.reply(msg, {
        markdown: detail ?? `没找到 \`${slug}\`。发「风格列表」浏览全部。`,
      });
      return;
    }
    case "reset":
      ctx.store.forgetStyle(msg.chatId);
      await ctx.channel.reply(msg, {
        markdown: "已忘掉这个群的风格记忆。下次 @我 描述需求，重新选型。",
      });
      return;
    case "status":
      await ctx.channel.reply(msg, {
        markdown: "在线。@我 描述一句需求开始选型；代码贴回来我做体检。",
      });
      return;
    default:
      break;
  }

  await runRecommendFlow(ctx, msg.chatId, content);
}
