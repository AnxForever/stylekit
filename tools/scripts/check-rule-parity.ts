/**
 * Rule parity checker.
 *
 * Each style ships AI rules in two languages. When one locale carries a full
 * design system and the other carries a paragraph, half the audience gets a
 * weaker prompt - and the gap is invisible from either page on its own. This
 * reports the imbalance and the facts a port must preserve.
 */
import { styles } from "@/lib/styles";

interface Row {
  slug: string;
  zh: number;
  en: number;
  zhCode: number;
  enCode: number;
  zhClasses: number;
  enClasses: number;
}

const CLASS_PATTERN =
  /\b(?:bg|text|border|rounded|shadow|p|px|py|gap|grid|flex|duration|ease|backdrop)-\[?[a-z0-9#[\]./%-]+/g;

function countCode(value: string): number {
  return (value.match(/```/g) ?? []).length / 2;
}

function countClasses(value: string): number {
  return new Set(value.match(CLASS_PATTERN) ?? []).size;
}

const rows: Row[] = styles.map((style) => {
  const zh = style.aiRules ?? "";
  const en = style.aiRulesEn ?? "";
  return {
    slug: style.slug,
    zh: zh.length,
    en: en.length,
    zhCode: countCode(zh),
    enCode: countCode(en),
    zhClasses: countClasses(zh),
    enClasses: countClasses(en),
  };
});

const imbalanced = rows
  .filter((row) => {
    const ratio = row.en === 0 ? Infinity : row.zh / row.en;
    return ratio > 1.6 || ratio < 1 / 1.6;
  })
  .sort((a, b) => Math.abs(b.en - b.zh) - Math.abs(a.en - a.zh));

const thin = rows.filter((row) => row.zh < 1300 && row.en < 1600);

console.log(`[rule-parity] ${rows.length} styles`);
console.log(`[rule-parity] locale imbalance (>60%): ${imbalanced.length}`);
for (const row of imbalanced) {
  const richer = row.en > row.zh ? "EN" : "ZH";
  console.log(
    `  ${row.slug.padEnd(24)} zh=${String(row.zh).padStart(4)} en=${String(row.en).padStart(4)}  ${richer} richer  code ${row.zhCode}/${row.enCode}  classes ${row.zhClasses}/${row.enClasses}`
  );
}
console.log(`\n[rule-parity] thin in both locales: ${thin.length}`);
console.log("  " + thin.map((row) => row.slug).join(", "));
