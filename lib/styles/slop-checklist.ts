/**
 * Self-check checklist generator for AI style prompts.
 *
 * Universal rules are derived from common AI design anti-patterns
 * (inspired by impeccable's detector rules). Style-specific rules
 * are derived from the style's dontList.
 *
 * The checklist is appended to the end of the Hard Prompt so the
 * AI self-validates before delivering output.
 */

const universalChecks = {
  zh: [
    "没有紫色到蓝色的渐变",
    "没有使用 Inter / Roboto / Geist 等过度使用的字体",
    "没有嵌套卡片（卡片里面套卡片）",
    "没有在彩色背景上放灰色文字",
    "正文对比度满足 WCAG AA（≥4.5:1）",
    "没有 bounce / elastic 缓动曲线",
    "动效有 prefers-reduced-motion 备选方案",
    "正文行宽不超过 65-75 个字符",
    "没有单侧粗边框装饰（border-left/right accent stripe）",
    "没有渐变文字（background-clip: text）",
    "没有把玻璃态（glassmorphism）当作默认风格",
    "没有 tiny uppercase tracked eyebrow 放在每个 section 标题上面",
  ],
  en: [
    "No purple-to-blue gradients",
    "No overused fonts (Inter, Roboto, Geist, Fraunces, Plus Jakarta Sans)",
    "No nested cards (cards inside cards)",
    "No gray text on colored backgrounds",
    "Body text contrast meets WCAG AA (>= 4.5:1)",
    "No bounce or elastic easing curves",
    "Animations have a prefers-reduced-motion fallback",
    "Body text line length capped at 65-75 characters",
    "No side-stripe accent borders (border-left/right > 1px)",
    "No gradient text (background-clip: text)",
    "No glassmorphism used as the default surface treatment",
    "No tiny uppercase tracked eyebrow labels above every section heading",
  ],
} as const;

export const NEGATIVE_PREFIX_RE =
  /^(不要|禁止|避免|杜绝|不许|绝不|do\s+not\s+|don'?t\s+|never\s+|avoid\s+|no\s+(?!.*contrast|.*small|.*tiny)|forbid\s+|must\s+not\s+|refrain\s+from\s+)/i;

function isAlreadyNegative(item: string): boolean {
  return NEGATIVE_PREFIX_RE.test(item.trim());
}

function deriveStyleChecks(
  dontList: string[],
  locale: "zh" | "en"
): string[] {
  if (!dontList || dontList.length === 0) return [];

  const prefix = locale === "zh" ? "没有" : "No";

  return dontList
    .slice(0, 5)
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      if (isAlreadyNegative(item)) {
        // Already a negative statement — use as-is, lowercase first char
        return item.charAt(0).toLowerCase() + item.slice(1);
      }
      // Strip leading negative words to avoid double negation, then prefix
      const cleaned = item
        .replace(NEGATIVE_PREFIX_RE, "")
        .trim();
      return `${prefix} ${cleaned.charAt(0).toLowerCase()}${cleaned.slice(1)}`;
    });
}

export interface SlopChecklistInput {
  dontList: string[];
  locale?: "zh" | "en";
}

export function buildSlopChecklist(input: SlopChecklistInput): string {
  const locale = input.locale === "en" ? "en" : "zh";
  const universal = universalChecks[locale];
  const styleSpecific = deriveStyleChecks(input.dontList, locale);

  const allChecks: string[] = [...universal];

  // Insert style-specific checks after the first 4 universal checks
  // so they feel contextual rather than appended
  for (const check of styleSpecific) {
    if (!allChecks.includes(check)) {
      allChecks.push(check);
    }
  }

  const title =
    locale === "zh"
      ? "## 自检清单（交付前逐条确认）"
      : "## Self-Check (Verify Before Shipping)";

  const intro =
    locale === "zh"
      ? "如果任何一条不通过，说明风格漂移了——修改后再交付。"
      : "If any item fails, the style has drifted — fix before shipping.";

  const items = allChecks.map((check) => `- [ ] ${check}`).join("\n");

  return `${title}\n\n${intro}\n\n${items}`;
}
