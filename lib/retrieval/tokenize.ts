/**
 * Word segmentation for the retrieval layer.
 *
 * `lib/knowledge/catalog.ts` splits on `[^\p{L}\p{N}]+`. Han characters are
 * letters, and written Chinese does not put spaces between words, so that
 * pattern turns a whole Chinese sentence into a single token - which then can
 * never equal a token from a document. This module replaces that with
 * `Intl.Segmenter` (word granularity), available in Node 18+ and every browser
 * we target, and keeps the legacy split only as an explicit fallback.
 *
 * The segmenter is dictionary based and deterministic, but its boundaries are
 * context sensitive: the same run of characters can split differently inside a
 * longer string. `tokenizeForSearch` therefore also emits character bigrams for
 * long CJK tokens, so a query term still overlaps a document that was cut a
 * different way.
 */

/** Locale handed to `Intl.Segmenter`. Word segmentation of Latin runs works the same under zh-CN. */
export const DEFAULT_SEGMENTER_LOCALE = "zh-CN";

/** CJK share of a string above which we call it a Chinese query. */
export const CJK_LOCALE_THRESHOLD = 0.15;

export type TextLocale = "zh-CN" | "en-US";

// CJK Unified Ideographs (+ Extension A) and the Compatibility Ideographs block.
const CJK_PATTERN = /[㐀-䶿一-鿿豈-﫿]/u;
const CJK_GLOBAL_PATTERN = /[㐀-䶿一-鿿豈-﫿]/gu;
const NON_CJK_PATTERN = /[^㐀-䶿一-鿿豈-﫿]/u;

/**
 * Function words that carry no retrieval signal in either language.
 *
 * These are removed from both the index and the query, so the two sides stay
 * consistent. Nothing domain specific belongs here - a term such as "风格" is
 * common but meaningful, and BM25's IDF already discounts it.
 */
const STOPWORDS = new Set([
  // Chinese
  "的", "了", "是", "在", "和", "与", "或", "有", "就", "都", "也", "很", "更", "最",
  "把", "被", "让", "给", "对", "从", "到", "为", "之", "其", "这", "那", "们", "不", "没",
  "这个", "那个", "一个", "一些", "一下", "什么", "怎么", "如何", "可以", "需要", "想要",
  "我要", "帮我", "请", "吗", "呢", "吧", "啊", "我", "你", "他", "她", "它", "来", "去",
  "没有", "要", "想", "用",
  // English
  "a", "an", "the", "of", "to", "in", "on", "at", "for", "and", "or", "is", "are", "was",
  "were", "be", "been", "with", "without", "that", "this", "these", "those", "it", "its",
  "as", "by", "from", "you", "your", "we", "our", "i", "me", "my", "do", "does", "did",
  "can", "could", "would", "should", "will", "please", "want", "need", "like", "about",
  "into", "over", "under",
]);

export interface TokenizeOptions {
  /** BCP-47 tag for `Intl.Segmenter`. Defaults to `zh-CN`. */
  locale?: string;
  /** Drop primary tokens shorter than this. Generated bigrams are exempt. Defaults to 1. */
  minLength?: number;
  /** Also emit character bigrams for CJK tokens of 3+ characters. Defaults to false. */
  cjkBigrams?: boolean;
  /** Drop `STOPWORDS`. Defaults to false. */
  dropStopwords?: boolean;
  /** Skip `Intl.Segmenter` and use `legacySplitTokens`. Only for reproducing the old behaviour. */
  forceFallback?: boolean;
}

const segmenterCache = new Map<string, Intl.Segmenter>();

/** True when the runtime ships `Intl.Segmenter` (Node 18+, all current browsers). */
export function hasIntlSegmenter(): boolean {
  return typeof Intl !== "undefined" && typeof Intl.Segmenter === "function";
}

function getSegmenter(locale: string): Intl.Segmenter | null {
  if (!hasIntlSegmenter()) return null;

  const cached = segmenterCache.get(locale);
  if (cached) return cached;

  try {
    const segmenter = new Intl.Segmenter(locale, { granularity: "word" });
    segmenterCache.set(locale, segmenter);
    return segmenter;
  } catch {
    // An unknown tag throws RangeError; fall back to the runtime default.
    return null;
  }
}

export function normalizeText(value: string): string {
  return value.normalize("NFC").replace(/\s+/gu, " ").trim();
}

/**
 * Exact replica of the matcher this module replaces.
 *
 * Kept so the baseline measurement can reproduce the defect from the same code
 * path, and as the fallback when `Intl.Segmenter` is unavailable. Do not "fix"
 * this function - its whole purpose is to behave the old way.
 */
export function legacySplitTokens(value: string): string[] {
  return value
    .toLocaleLowerCase()
    .split(/[^\p{L}\p{N}]+/u)
    .map((token) => token.trim())
    .filter(Boolean);
}

/**
 * Word-like segments, lowercased.
 *
 * Falls back to `legacySplitTokens` when `Intl.Segmenter` is missing, which
 * reintroduces the Chinese defect - callers that must know can check
 * `hasIntlSegmenter()`.
 */
export function segmentWords(value: string, locale: string = DEFAULT_SEGMENTER_LOCALE): string[] {
  const text = normalizeText(value);
  if (!text) return [];

  const segmenter = getSegmenter(locale);
  if (!segmenter) return legacySplitTokens(text);

  const tokens: string[] = [];
  for (const part of segmenter.segment(text)) {
    if (!part.isWordLike) continue;
    const token = part.segment.trim().toLocaleLowerCase();
    if (token) tokens.push(token);
  }

  return tokens;
}

/** True when every character of the token is a CJK ideograph. */
function isCjkOnly(token: string): boolean {
  return token.length > 0 && !NON_CJK_PATTERN.test(token);
}

function charBigrams(token: string): string[] {
  const bigrams: string[] = [];
  for (let index = 0; index + 2 <= token.length; index += 1) {
    bigrams.push(token.slice(index, index + 2));
  }
  return bigrams;
}

export function tokenize(value: string, options: TokenizeOptions = {}): string[] {
  const {
    locale = DEFAULT_SEGMENTER_LOCALE,
    minLength = 1,
    cjkBigrams = false,
    dropStopwords = false,
    forceFallback = false,
  } = options;

  const primary = forceFallback
    ? legacySplitTokens(normalizeText(value))
    : segmentWords(value, locale);

  const tokens: string[] = [];
  const seen = new Set<string>();
  const push = (token: string) => {
    if (seen.has(token)) return;
    seen.add(token);
    tokens.push(token);
  };

  for (const token of primary) {
    if (token.length < minLength) continue;
    if (dropStopwords && STOPWORDS.has(token)) continue;
    push(token);

    if (cjkBigrams && token.length >= 3 && isCjkOnly(token)) {
      for (const bigram of charBigrams(token)) push(bigram);
    }
  }

  return tokens;
}

/**
 * The tokenizer shared by the keyword index and the query side.
 *
 * Both sides must call this same function, otherwise the term sets stop lining
 * up and BM25 silently scores zero.
 */
export function tokenizeForSearch(value: string): string[] {
  return tokenize(value, { cjkBigrams: true, dropStopwords: true });
}

/** True when the text contains at least one CJK character. */
export function hasCjk(value: string): boolean {
  return CJK_PATTERN.test(value);
}

/**
 * Guess the language a query was written in, used to favour same-language
 * chunks. Chunks in the other language are still retrieved - the design keeps
 * cross-language recall rather than filtering on locale.
 */
export function detectLocale(value: string): TextLocale {
  const text = normalizeText(value);
  if (!text) return "en-US";

  const total = text.replace(/\s+/gu, "").length;
  if (total === 0) return "en-US";

  const cjk = (text.match(CJK_GLOBAL_PATTERN) ?? []).length;
  return cjk / total >= CJK_LOCALE_THRESHOLD ? "zh-CN" : "en-US";
}
