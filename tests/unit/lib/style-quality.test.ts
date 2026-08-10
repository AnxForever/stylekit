import { describe, expect, it } from "vitest";

import { getStyleDetail } from "@/lib/discovery";
import { styles } from "@/lib/styles";
import { getStyleQuality } from "@/lib/styles/quality";

describe("style quality metadata", () => {
  it("emits capability signals for every catalog style", () => {
    for (const style of styles) {
      const quality = getStyleQuality(style);

      expect(["curated", "baseline"]).toContain(quality.tier);
      expect(quality.capabilities.tokens).toBe("complete");
      expect(quality.capabilities.recipes).toBe("complete");
      expect(quality.capabilities.componentCode).toBe("complete");
      expect(quality.capabilities.accessibility).toBe("scored");
      expect(quality.accessibilityScore).toEqual(expect.any(Number));
    }
  });

  it("exposes quality metadata through discovery details", () => {
    const detail = getStyleDetail("neo-brutalist");

    expect(detail?.quality.tier).toBe("curated");
    expect(detail?.quality.capabilities.readiness).toBe("curated");
    expect(detail?.quality.flags).not.toContain("readiness-fallback");
  });
});
