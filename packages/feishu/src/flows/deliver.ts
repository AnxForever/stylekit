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
import { zipArtifacts, cleanupZip } from "../artifacts/zip.js";

function env(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

/** Field schema for a fresh StyleKit Base, created on first delivery. */
export function baseFieldSchema(): Array<Record<string, unknown>> {
  return [
    { name: "需求", type: "text" },
    { name: "受众", type: "text" },
    { name: "风格", type: "text" },
    { name: "风格英文名", type: "text" },
    { name: "Slug", type: "text" },
    { name: "主色", type: "text" },
    { name: "提示词字符数", type: "number" },
    { name: "工程包产物数", type: "number" },
    { name: "规范文档", type: "url" },
    { name: "风格主页", type: "url" },
    { name: "工程包", type: "url" },
    { name: "体检结果", type: "text" },
  ];
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
  let kitUrl: string | undefined;
  let recordIds: string[] = [];
  let baseNote: string | undefined;

  // 0. Pack the artifact kit into a ZIP and upload it to Drive.
  let zipPath: string | undefined;
  try {
    zipPath = await zipArtifacts(effectiveIntent.styleSlug, artifacts);
    try {
      kitUrl = await larkCli.driveUpload({
        filePath: zipPath,
        name: `${effectiveIntent.styleSlug}-stylekit.zip`,
      });
    } catch (error) {
      baseNote = [baseNote, `工程包上传失败：${error instanceof Error ? error.message : String(error)}`]
        .filter(Boolean)
        .join("；");
    }
  } catch (error) {
    baseNote = `工程包打包失败：${error instanceof Error ? error.message : String(error)}`;
  }

  // 1. Import the delivery doc into Drive.
  const dir = mkdtempSync(join(tmpdir(), "stylekit-deliver-"));
  try {
    const docPath = join(dir, "设计规范交付单.md");
    writeFileSync(docPath, doc, "utf8");
    try {
      docUrl = await larkCli.driveImportMarkdown({ filePath: docPath });
    } catch (error) {
      baseNote = [baseNote, `文档导入失败：${error instanceof Error ? error.message : String(error)}`]
        .filter(Boolean)
        .join("；");
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  // 2. Resolve or provision the Base, then write the record.
  let baseToken = env("FEISHU_BASE_TOKEN");
  let tableId = env("FEISHU_BASE_TABLE_ID");
  const chatIdForEnv = chatId;
  if (!baseToken || !tableId) {
    try {
      const created = await larkCli.baseCreateWithTable({
        name: "StyleKit 风格台账",
        tableName: "交付记录",
        fields: baseFieldSchema(),
      });
      baseToken = created.baseToken;
      tableId = created.tableId;
      if (baseToken && tableId) {
        ctx.store.rememberBase(chatIdForEnv, baseToken, tableId);
        baseNote = [baseNote, `已自动创建多维表格（token ${baseToken.slice(0, 8)}…）`]
          .filter(Boolean)
          .join("；");
      }
    } catch (error) {
      baseNote = [baseNote, `多维表格未配置且自动创建失败：${error instanceof Error ? error.message : String(error)}`]
        .filter(Boolean)
        .join("；");
    }
  } else {
    ctx.store.rememberBase(chatIdForEnv, baseToken, tableId);
  }

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
            ...(kitUrl ? { 工程包: { text: "工程包 ZIP", link: kitUrl } } : {}),
          },
        ],
      });
    } catch (error) {
      baseNote = [baseNote, `多维表格写入失败：${error instanceof Error ? error.message : String(error)}`]
        .filter(Boolean)
        .join("；");
    }
  }

  if (zipPath) cleanupZip(zipPath);

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
      kitUrl,
      baseUrl: recordId && baseToken
        ? `https://www.feishu.cn/base/${baseToken}?table=${tableId}&view=vewDefault`
        : baseToken
          ? `https://www.feishu.cn/base/${baseToken}`
          : undefined,
    }),
  });

  if (baseNote) {
    await ctx.channel.send(chatId, { markdown: `⚠️ ${baseNote}` });
  }
}
