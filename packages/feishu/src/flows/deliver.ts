/**
 * The delivery flow: accepted style → artifacts → Feishu write-backs.
 *
 * Two write-backs land here, both through the official lark-cli:
 * 1. A record in the Base table (project brief, style, palette, prompt
 *    length, links) — the structured, queryable half.
 * 2. The 设计规范交付单 imported into Drive as a docx — the readable,
 *    commentable, shareable half.
 *
 * Both degrade gracefully: if the Base is not configured the doc import still
 * happens, and either failing never strands the user — the card reports
 * exactly what landed where.
 */

import { mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { getStyleBySlug } from "stylekit-core/styles";
import type { BotContext } from "../bot.js";
import { deliverCard } from "../cards.js";
import {
  generateArtifacts,
  artifactsSize,
  intentToPromptContext,
} from "../artifacts/index.js";
import { larkCli } from "../lark-cli.js";
import type { StyleIntent } from "../planner/index.js";
import { buildDeliveryDoc } from "./delivery-doc.js";

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export async function runDeliverFlow(
  ctx: BotContext,
  chatId: string,
  intent: StyleIntent,
  chosenSlug: string,
): Promise<void> {
  // Re-plan around the chosen slug so the context matches what the user picked.
  const effectiveIntent: StyleIntent =
    chosenSlug === intent.styleSlug
      ? intent
      : { ...intent, styleSlug: chosenSlug, confidence: 1 };

  const artifacts = generateArtifacts(
    effectiveIntent.styleSlug,
    intentToPromptContext(effectiveIntent),
  );
  const style = getStyleBySlug(effectiveIntent.styleSlug);
  if (!style) {
    await ctx.channel.send(chatId, { markdown: `风格 ${effectiveIntent.styleSlug} 不在目录里。` });
    return;
  }

  const doc = buildDeliveryDoc(effectiveIntent, artifacts);

  let docUrl: string | undefined;
  let recordIds: string[] = [];
  let baseNote: string | undefined;

  // 1. Import the delivery doc into Drive.
  const dir = mkdtempSync(join(tmpdir(), "stylekit-deliver-"));
  try {
    const docPath = join(dir, "设计规范交付单.md");
    writeFileSync(docPath, doc, "utf8");
    try {
      docUrl = await larkCli.driveImportMarkdown({ filePath: docPath });
    } catch (error) {
      baseNote = `文档导入失败：${error instanceof Error ? error.message : String(error)}`;
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  // 2. Write the Base record.
  const baseToken = env("FEISHU_BASE_TOKEN");
  const tableId = env("FEISHU_BASE_TABLE_ID");
  if (baseToken && tableId) {
    try {
      recordIds = await larkCli.baseBatchCreate({
        baseToken,
        tableId,
        fields: [
          {
            需求: effectiveIntent.brief.primaryGoal,
            受众: effectiveIntent.brief.audience,
            风格: style.name,
            风格英文名: style.nameEn,
            Slug: effectiveIntent.styleSlug,
            主色: style.colors.primary,
            提示词字符数: artifacts
              .find((a) => a.name.endsWith("AI-PROMPT.md"))
              ?.content.length ?? 0,
            工程包产物数: artifacts.length,
            ...(docUrl ? { 规范文档: { text: "设计规范交付单", link: docUrl } } : {}),
            风格主页: {
              text: "StyleKit 风格页",
              link: `https://www.stylekit.top/styles/${effectiveIntent.styleSlug}`,
            },
          },
        ],
      });
    } catch (error) {
      baseNote = [baseNote, `多维表格写入失败：${error instanceof Error ? error.message : String(error)}`]
        .filter(Boolean)
        .join("；");
    }
  }

  const recordId = recordIds[0];
  ctx.store.remember(chatId, {
    lastSlug: effectiveIntent.styleSlug,
    lastBrief: intent.brief.primaryGoal,
    lastIntent: effectiveIntent,
    lastRecordId: recordId,
  });

  await ctx.channel.send(chatId, {
    card: deliverCard({
      slug: effectiveIntent.styleSlug,
      artifacts: artifacts.length,
      totalChars: artifactsSize(artifacts),
      docUrl,
      baseUrl: recordId
        ? `https://www.feishu.cn/base/${baseToken}?table=${tableId}&view=vewDefault`
        : undefined,
    }),
  });

  if (baseNote) {
    await ctx.channel.send(chatId, { markdown: `⚠️ ${baseNote}` });
  }
}
