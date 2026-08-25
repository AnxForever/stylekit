/**
 * The compliance flow: code pasted back in → verdict card.
 *
 * The style a chat is working in comes from the last recommendation it
 * accepted. When the chat has none yet, the bot asks for one instead of
 * guessing.
 */

import type { BotContext } from "../bot.js";
import { complianceCard } from "../cards.js";
import { checkCode, ComplianceError, verdictLine } from "../compliance/index.js";
import { larkCli } from "../lark-cli.js";

export async function runComplianceFlow(
  ctx: BotContext,
  chatId: string,
  code: string,
): Promise<void> {
  const memory = ctx.store.get(chatId);
  const slug = memory?.lastSlug;

  if (!slug) {
    await ctx.channel.send(chatId, {
      markdown: "我还不确定这个群在按哪个风格写。先 @我 描述一句需求，选定风格后再把代码贴回来。",
    });
    return;
  }

  try {
    const report = checkCode({ slug, code });
    await ctx.channel.send(chatId, { card: complianceCard(report) });

    // Write the verdict back to the Base record when one exists, so the
    // table becomes the project's live compliance log.
    const recordId = memory?.lastRecordId;
    const baseToken = process.env.FEISHU_BASE_TOKEN?.trim() || memory?.baseToken;
    const tableId = process.env.FEISHU_BASE_TABLE_ID?.trim() || memory?.tableId;
    if (recordId && baseToken && tableId) {
      try {
        await larkCli.baseBatchUpdate({
          baseToken,
          tableId,
          updates: { [recordId]: { 体检结果: verdictLine(report) } },
        });
      } catch (error) {
        console.error(
          "[stylekit-feishu] compliance write-back failed:",
          error instanceof Error ? error.message : error,
        );
      }
    }
  } catch (error) {
    if (error instanceof ComplianceError) {
      await ctx.channel.send(chatId, { markdown: `体检失败：${error.message}` });
      return;
    }
    await ctx.channel.send(chatId, {
      markdown: `体检失败：${error instanceof Error ? error.message : "未知错误"}`,
    });
  }
}
