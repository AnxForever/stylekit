// Knowledge Base - BM25 Search Engine
// TypeScript port of Python BM25 implementation from ui-ux-pro-max

/**
 * Lightweight BM25 (Best Matching 25) search algorithm
 * Used for ranking text documents by relevance to a search query
 */
export class BM25<T> {
  private k1: number;
  private b: number;
  private corpus: string[][];
  private items: T[];
  private docLengths: number[];
  private avgdl: number;
  private idf: Map<string, number>;
  private docFreqs: Map<string, number>;
  private N: number;
  private getSearchText: (item: T) => string;

  constructor(items: T[], getSearchText: (item: T) => string, k1 = 1.5, b = 0.75) {
    this.k1 = k1;
    this.b = b;
    this.items = items;
    this.getSearchText = getSearchText;
    this.corpus = [];
    this.docLengths = [];
    this.avgdl = 0;
    this.idf = new Map();
    this.docFreqs = new Map();
    this.N = 0;

    this.fit();
  }

  /**
   * Tokenize text: lowercase, split, remove punctuation, filter short words
   */
  private tokenize(text: string): string[] {
    const cleaned = String(text)
      .toLowerCase()
      .replace(/[^\w\s]/g, " ");
    return cleaned.split(/\s+/).filter((w) => w.length > 2);
  }

  /**
   * Build BM25 index from items
   */
  private fit(): void {
    // Build documents from items
    const documents = this.items.map((item) => this.getSearchText(item));
    this.corpus = documents.map((doc) => this.tokenize(doc));
    this.N = this.corpus.length;

    if (this.N === 0) return;

    this.docLengths = this.corpus.map((doc) => doc.length);
    this.avgdl = this.docLengths.reduce((a, b) => a + b, 0) / this.N;

    // Calculate document frequencies
    for (const doc of this.corpus) {
      const seen = new Set<string>();
      for (const word of doc) {
        if (!seen.has(word)) {
          this.docFreqs.set(word, (this.docFreqs.get(word) || 0) + 1);
          seen.add(word);
        }
      }
    }

    // Calculate IDF for each term
    for (const [word, freq] of this.docFreqs) {
      const idfScore = Math.log((this.N - freq + 0.5) / (freq + 0.5) + 1);
      this.idf.set(word, idfScore);
    }
  }

  /**
   * Score all documents against query and return sorted results
   */
  search(query: string, maxResults = 10): T[] {
    const queryTokens = this.tokenize(query);
    const scores: Array<{ index: number; score: number }> = [];

    for (let idx = 0; idx < this.corpus.length; idx++) {
      const doc = this.corpus[idx];
      const docLen = this.docLengths[idx];

      // Calculate term frequencies for this document
      const termFreqs = new Map<string, number>();
      for (const word of doc) {
        termFreqs.set(word, (termFreqs.get(word) || 0) + 1);
      }

      // Calculate BM25 score
      let score = 0;
      for (const token of queryTokens) {
        const idf = this.idf.get(token);
        if (idf !== undefined) {
          const tf = termFreqs.get(token) || 0;
          const numerator = tf * (this.k1 + 1);
          const denominator =
            tf + this.k1 * (1 - this.b + (this.b * docLen) / this.avgdl);
          score += idf * (numerator / denominator);
        }
      }

      scores.push({ index: idx, score });
    }

    // Sort by score descending and filter out zero scores
    return scores
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults)
      .map((s) => this.items[s.index]);
  }

  /**
   * Get all items (unfiltered)
   */
  getAll(): T[] {
    return this.items;
  }

  /**
   * Get item count
   */
  get length(): number {
    return this.items.length;
  }
}

/**
 * Simple search for exact/partial matches (fallback when BM25 overkill)
 */
export function simpleSearch<T>(
  items: T[],
  query: string,
  getSearchText: (item: T) => string,
  maxResults = 10
): T[] {
  const queryLower = query.toLowerCase();
  const queryTerms = queryLower.split(/\s+/).filter((t) => t.length > 1);

  const scored = items.map((item) => {
    const text = getSearchText(item).toLowerCase();
    let score = 0;

    // Exact phrase match
    if (text.includes(queryLower)) {
      score += 10;
    }

    // Individual term matches
    for (const term of queryTerms) {
      if (text.includes(term)) {
        score += 1;
      }
    }

    return { item, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults)
    .map((s) => s.item);
}

/**
 * Domain detection based on query keywords
 */
export function detectDomain(query: string): string {
  const queryLower = query.toLowerCase();

  const domainKeywords: Record<string, string[]> = {
    color: ["color", "palette", "hex", "#", "rgb", "theme"],
    chart: [
      "chart",
      "graph",
      "visualization",
      "trend",
      "bar",
      "pie",
      "scatter",
      "heatmap",
      "funnel",
    ],
    landing: [
      "landing",
      "page",
      "cta",
      "conversion",
      "hero",
      "testimonial",
      "pricing",
      "section",
    ],
    product: [
      "saas",
      "ecommerce",
      "e-commerce",
      "fintech",
      "healthcare",
      "gaming",
      "portfolio",
      "crypto",
      "dashboard",
    ],
    ux: [
      "ux",
      "usability",
      "accessibility",
      "wcag",
      "touch",
      "scroll",
      "animation",
      "keyboard",
      "navigation",
      "mobile",
    ],
    typography: ["font", "typography", "heading", "serif", "sans", "pairing"],
    icon: [
      "icon",
      "icons",
      "lucide",
      "heroicons",
      "symbol",
      "glyph",
      "pictogram",
    ],
    react: [
      "react",
      "next.js",
      "nextjs",
      "suspense",
      "memo",
      "usecallback",
      "useeffect",
      "rerender",
      "bundle",
      "waterfall",
    ],
    web: [
      "aria",
      "focus",
      "outline",
      "semantic",
      "virtualize",
      "autocomplete",
      "form",
      "input type",
    ],
  };

  const scores: Record<string, number> = {};
  for (const [domain, keywords] of Object.entries(domainKeywords)) {
    scores[domain] = keywords.filter((kw) => queryLower.includes(kw)).length;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  return best && best[1] > 0 ? best[0] : "product";
}
