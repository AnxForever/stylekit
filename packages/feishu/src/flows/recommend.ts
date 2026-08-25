/**
 * The recommendation flow: brief → plan → streaming card.
 *
 * The card starts as a staged "thinking" state and is updated in place as the
 * planner works, then lands on the final recommendation with one button per
 * candidate. The planner itself is a single LLM call over the whole 146-style
 * catalog; the alternatives come from the catalog by category, so every
 * button a user can click points at a real style.
 */

import { stylesMeta } from "stylekit-core/styles";
import type { BotContext } from "../bot.js";
import { recommendCard, thinkingCard } from "../cards.js";
import { planStyle } from "../planner/index.js";
import { LlmError, LlmClient } from "../llm/index.js";

function pickAlternatives(primarySlug: string): string[] {
  const primary = stylesMeta.find((meta) => meta.slug === primarySlug);
  if (!primary) return [];

  return stylesMeta
    .filter((meta) => meta.slug !== primarySlug && meta.category === primary.category)
    .slice(0, 2)
    .map((meta) => meta.slug);
}

/** Fallback model for when the primary one errors out or times out. */
const FALLBACK_MODEL = "step-overture-preview";

export async function runRecommendFlow(
  ctx: BotContext,
  chatId: string,
  brief: string,
): Promise<void> {
  let primary;
  try {
    primary = ctx.getLlm();
  } catch (error) {
    await ctx.channel.send(chatId, {
      markdown: `LLM 还没配置。把 \`LLM_BASE_URL\` / \`LLM_MODEL\` / \`LLM_API_KEY\` 写进 \`packages/feishu/.env\` 后重启即可。${error instanceof Error ? `\n\n（${error.message}）` : ""}`,
    });
    return;
  }

  const plan = async (llm: LlmClient) => {
    const intent = await planStyle(llm, { brief });
    ctx.store.remember(chatId, {
      lastSlug: intent.styleSlug,
      lastBrief: brief,
      lastIntent: intent,
    });
    return intent;
  };

  await ctx.channel.stream(chatId, {
    card: {
      initial: thinkingCard(1),
      producer: async (controller) => {
        await controller.update(thinkingCard(2));

        let intent;
        try {
          intent = await plan(primary);
        } catch (primaryError) {
          console.warn(
            "[stylekit-feishu] primary model failed, falling back:",
            primaryError instanceof Error ? primaryError.message : primaryError,
          );
          const fallback = new LlmClient({
            baseUrl: process.env.LLM_BASE_URL ?? primary.baseUrl,
            model: FALLBACK_MODEL,
            apiKey: primary.apiKey,
          });
          intent = await plan(fallback);
        }

        await controller.update(thinkingCard(3));
        const alternatives = pickAlternatives(intent.styleSlug);
        await controller.update(recommendCard(intent, alternatives));
      },
    },
  }).catch(async (error: unknown) => {
    const message = error instanceof LlmError
      ? `选型失败：${error.message}`
      : `选型失败：${error instanceof Error ? error.message : "未知错误"}`;
    await ctx.channel.send(chatId, { markdown: message });
  });
}
