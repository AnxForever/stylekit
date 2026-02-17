import { describe, it, expect } from "vitest";
import {
  searchKnowledge,
  detectDomain,
  BM25,
  getDomains,
  getDomainDescription,
  getDesignRecommendation,
  getSmartRecommendation,
  compareStyles,
  suggestStyleByConstraints,
  getStack,
  getStackIds,
  getCriticalGuidelines,
  searchStackGuidelines,
  getStacksByCategory,
} from "@/lib/knowledge";

// ---------------------------------------------------------------------------
// detectDomain
// ---------------------------------------------------------------------------

describe("detectDomain", () => {
  it("detects color domain from color-related keywords", () => {
    expect(detectDomain("color palette for SaaS")).toBe("color");
  });

  it("detects chart domain from chart keyword", () => {
    expect(detectDomain("best chart for trend data")).toBe("chart");
  });

  it("detects product domain from saas keyword", () => {
    expect(detectDomain("saas dashboard design")).toBe("product");
  });

  it("detects ux domain from accessibility keyword", () => {
    expect(detectDomain("accessibility guidelines")).toBe("ux");
  });

  it("detects typography domain from font keyword", () => {
    expect(detectDomain("font pairing recommendations")).toBe("typography");
  });

  it("detects react domain from nextjs keyword", () => {
    expect(detectDomain("nextjs performance tips")).toBe("react");
  });

  it("defaults to product for unrecognized queries", () => {
    expect(detectDomain("how to build something awesome")).toBe("product");
  });
});

// ---------------------------------------------------------------------------
// BM25
// ---------------------------------------------------------------------------

describe("BM25", () => {
  const items = [
    { id: 1, text: "SaaS dashboard design patterns" },
    { id: 2, text: "E-commerce product page layout" },
    { id: 3, text: "Mobile app onboarding flow" },
    { id: 4, text: "Dashboard analytics visualization" },
  ];

  const index = new BM25(items, (item) => item.text);

  it("returns relevant results for a matching query", () => {
    const results = index.search("dashboard");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].text.toLowerCase()).toContain("dashboard");
  });

  it("returns empty array for nonsense query", () => {
    const results = index.search("xyzzyplugh");
    expect(results).toHaveLength(0);
  });

  it("respects maxResults parameter", () => {
    const results = index.search("design", 1);
    expect(results.length).toBeLessThanOrEqual(1);
  });

  it("getAll returns all items", () => {
    expect(index.getAll()).toHaveLength(4);
  });

  it("length returns item count", () => {
    expect(index.length).toBe(4);
  });

  it("handles empty corpus", () => {
    const empty = new BM25([], (item: string) => item);
    expect(empty.search("anything")).toHaveLength(0);
    expect(empty.length).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// searchKnowledge
// ---------------------------------------------------------------------------

describe("searchKnowledge", () => {
  it("returns results with correct structure", () => {
    const result = searchKnowledge("SaaS dashboard");
    expect(result).toHaveProperty("domain");
    expect(result).toHaveProperty("query", "SaaS dashboard");
    expect(result).toHaveProperty("count");
    expect(result).toHaveProperty("results");
    expect(Array.isArray(result.results)).toBe(true);
  });

  it("auto-detects domain when not specified", () => {
    const result = searchKnowledge("color palette");
    expect(result.domain).toBe("color");
  });

  it("respects explicit domain parameter", () => {
    const result = searchKnowledge("anything", "typography");
    expect(result.domain).toBe("typography");
  });

  it("respects maxResults parameter", () => {
    const result = searchKnowledge("dashboard design patterns", undefined, 2);
    expect(result.results.length).toBeLessThanOrEqual(2);
  });

  it("searches product domain", () => {
    const result = searchKnowledge("SaaS", "product");
    expect(result.domain).toBe("product");
    expect(result.count).toBeGreaterThan(0);
  });

  it("searches color domain", () => {
    const result = searchKnowledge("vibrant palette", "color");
    expect(result.domain).toBe("color");
  });

  it("searches landing domain", () => {
    const result = searchKnowledge("hero section", "landing");
    expect(result.domain).toBe("landing");
  });

  it("searches icon domain", () => {
    const result = searchKnowledge("navigation icons", "icon");
    expect(result.domain).toBe("icon");
  });

  it("searches ux domain", () => {
    const result = searchKnowledge("mobile usability", "ux");
    expect(result.domain).toBe("ux");
  });

  it("searches web domain", () => {
    const result = searchKnowledge("form accessibility", "web");
    expect(result.domain).toBe("web");
  });

  it("searches react domain", () => {
    const result = searchKnowledge("react performance", "react");
    expect(result.domain).toBe("react");
  });

  it("searches reasoning domain", () => {
    const result = searchKnowledge("saas reasoning", "reasoning");
    expect(result.domain).toBe("reasoning");
  });

  it("searches chart domain", () => {
    const result = searchKnowledge("bar chart", "chart");
    expect(result.domain).toBe("chart");
  });

  it("searches stack domain", () => {
    const result = searchKnowledge("nextjs routing", "stack");
    expect(result.domain).toBe("stack");
  });
});

// ---------------------------------------------------------------------------
// getDomains / getDomainDescription
// ---------------------------------------------------------------------------

describe("getDomains", () => {
  it("returns all expected domains", () => {
    const domains = getDomains();
    expect(domains).toContain("product");
    expect(domains).toContain("color");
    expect(domains).toContain("typography");
    expect(domains).toContain("stack");
    expect(domains.length).toBeGreaterThanOrEqual(10);
  });
});

describe("getDomainDescription", () => {
  it("returns a description string for each domain", () => {
    for (const domain of getDomains()) {
      const desc = getDomainDescription(domain);
      expect(typeof desc).toBe("string");
      expect(desc.length).toBeGreaterThan(0);
    }
  });
});

// ---------------------------------------------------------------------------
// getDesignRecommendation
// ---------------------------------------------------------------------------

describe("getDesignRecommendation", () => {
  it("returns a structured recommendation for SaaS dashboard", () => {
    const rec = getDesignRecommendation("SaaS dashboard");
    expect(rec).toHaveProperty("productType");
    expect(rec).toHaveProperty("style");
    expect(rec.style).toHaveProperty("primary");
    expect(rec).toHaveProperty("colors");
    expect(rec).toHaveProperty("typography");
    expect(rec).toHaveProperty("uxGuidelines");
    expect(Array.isArray(rec.uxGuidelines)).toBe(true);
  });

  it("returns stack guidelines when stackId is provided", () => {
    const rec = getDesignRecommendation("SaaS dashboard", {
      stackId: "nextjs",
    });
    expect(Array.isArray(rec.stackGuidelines)).toBe(true);
  });

  it("returns empty stackGuidelines when no stackId", () => {
    const rec = getDesignRecommendation("SaaS dashboard");
    expect(rec.stackGuidelines).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// getSmartRecommendation
// ---------------------------------------------------------------------------

describe("getSmartRecommendation", () => {
  it("returns a SmartRecommendation with required fields", () => {
    const rec = getSmartRecommendation("SaaS dashboard");
    expect(rec).toHaveProperty("style");
    expect(rec.style).toHaveProperty("item");
    expect(rec.style).toHaveProperty("score");
    expect(rec.style).toHaveProperty("reasons");
    expect(rec.style).toHaveProperty("alternatives");
    expect(rec).toHaveProperty("colors");
    expect(rec).toHaveProperty("typography");
    expect(rec).toHaveProperty("styleScores");
    expect(rec).toHaveProperty("compatibility");
    expect(rec).toHaveProperty("summary");
    expect(rec.summary).toHaveProperty("confidence");
    expect(rec.summary).toHaveProperty("headline");
  });

  it("style scores are sorted descending", () => {
    const rec = getSmartRecommendation("E-commerce");
    for (let i = 1; i < rec.styleScores.length; i++) {
      expect(rec.styleScores[i - 1].score).toBeGreaterThanOrEqual(
        rec.styleScores[i].score
      );
    }
  });

  it("applies context adjustments for accessibility priority", () => {
    const rec = getSmartRecommendation("SaaS dashboard", {
      accessibilityPriority: true,
    });
    expect(rec.contextAdjustments.length).toBeGreaterThan(0);
    expect(
      rec.contextAdjustments.some((a) => a.toLowerCase().includes("accessibility"))
    ).toBe(true);
  });

  it("applies context adjustments for mobile device", () => {
    const rec = getSmartRecommendation("SaaS dashboard", {
      primaryDevice: "mobile",
    });
    expect(
      rec.contextAdjustments.some((a) => a.toLowerCase().includes("mobile"))
    ).toBe(true);
  });

  it("provides alternatives in style recommendation", () => {
    const rec = getSmartRecommendation("SaaS dashboard");
    expect(rec.style.alternatives.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// compareStyles
// ---------------------------------------------------------------------------

describe("compareStyles", () => {
  it("returns a comparison with winner and categories", () => {
    const result = compareStyles(
      "SaaS dashboard",
      "neo-brutalist",
      "glassmorphism"
    );
    expect(result).toHaveProperty("winner");
    expect(result).toHaveProperty("comparison");
    expect(result).toHaveProperty("recommendation");
    expect(Array.isArray(result.comparison)).toBe(true);
    expect(result.comparison.length).toBe(5);
  });

  it("each comparison entry has category and scores", () => {
    const result = compareStyles(
      "E-commerce",
      "minimalist-flat",
      "neo-brutalist"
    );
    for (const entry of result.comparison) {
      expect(entry).toHaveProperty("category");
      expect(entry).toHaveProperty("style1Score");
      expect(entry).toHaveProperty("style2Score");
      expect(entry).toHaveProperty("winner");
    }
  });

  it("winner is one of the two input styles", () => {
    const result = compareStyles(
      "portfolio",
      "editorial",
      "glassmorphism"
    );
    expect(["editorial", "glassmorphism"]).toContain(result.winner);
  });
});

// ---------------------------------------------------------------------------
// suggestStyleByConstraints
// ---------------------------------------------------------------------------

describe("suggestStyleByConstraints", () => {
  it("returns scored styles sorted by score descending", () => {
    const results = suggestStyleByConstraints({
      mustHave: ["high-contrast"],
      priorities: ["accessibility"],
    });
    expect(results.length).toBeGreaterThan(0);
    for (let i = 1; i < results.length; i++) {
      expect(results[i - 1].score).toBeGreaterThanOrEqual(results[i].score);
    }
  });

  it("favors styles with mustHave features", () => {
    const results = suggestStyleByConstraints({
      mustHave: ["gradients"],
    });
    // Styles with gradients should score higher
    const top3Slugs = results.slice(0, 3).map((s) => s.slug);
    // glassmorphism is in the gradients feature map
    expect(
      top3Slugs.some(
        (s) =>
          s === "glassmorphism" ||
          s === "modern-gradient" ||
          s === "cyberpunk-neon"
      )
    ).toBe(true);
  });

  it("returns reasons for recommendations", () => {
    const results = suggestStyleByConstraints({
      mustHave: ["bold"],
      priorities: ["visual-impact"],
    });
    const topResult = results[0];
    expect(topResult.reasons.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Stack functions
// ---------------------------------------------------------------------------

describe("getStackIds", () => {
  it("returns an array of stack IDs including nextjs", () => {
    const ids = getStackIds();
    expect(Array.isArray(ids)).toBe(true);
    expect(ids).toContain("nextjs");
  });
});

describe("getStack", () => {
  it("returns stack info for nextjs", () => {
    const stack = getStack("nextjs");
    expect(stack).toBeDefined();
    expect(stack?.id).toBe("nextjs");
  });

  it("returns undefined for invalid stack ID", () => {
    const stack = getStack("nonexistent" as never);
    expect(stack).toBeUndefined();
  });
});

describe("getCriticalGuidelines", () => {
  it("returns critical guidelines for nextjs", () => {
    const guidelines = getCriticalGuidelines("nextjs");
    expect(Array.isArray(guidelines)).toBe(true);
  });
});

describe("searchStackGuidelines", () => {
  it("returns guidelines matching a query", () => {
    const results = searchStackGuidelines("nextjs", "routing");
    expect(Array.isArray(results)).toBe(true);
  });
});

describe("getStacksByCategory", () => {
  it("returns stacks for web category", () => {
    const webStacks = getStacksByCategory("web");
    expect(Array.isArray(webStacks)).toBe(true);
    expect(webStacks.length).toBeGreaterThan(0);
  });

  it("returns an array for mobile category", () => {
    const mobileStacks = getStacksByCategory("mobile");
    expect(Array.isArray(mobileStacks)).toBe(true);
  });
});
