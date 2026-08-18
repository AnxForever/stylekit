import { describe, expect, it } from "vitest";
import { getStyleBySlug } from "@/lib/styles";
import { getStyleTokens } from "@/lib/styles/tokens-registry";
import { generateIdeConfig } from "@/lib/export/ide-configs";

/**
 * Every distribution surface is somebody's only view of a style: the agent that
 * reads .cursorrules never opens the website. These lock the token facts that
 * an agent cannot guess - the type scale in particular, which was missing from
 * the IDE rule files while radius and shadow were present.
 */
const SLUGS = ["glassmorphism", "neo-brutalist", "editorial"];

describe("IDE rule exports carry the full token spec", () => {
  for (const slug of SLUGS) {
    it(`${slug} ships type scale, spacing, and interaction states`, () => {
      const style = getStyleBySlug(slug);
      const tokens = getStyleTokens(slug);
      expect(style, slug).toBeDefined();
      expect(tokens, slug).toBeDefined();
      if (!style || !tokens) return;

      for (const target of ["cursorrules", "claude-rules", "windsurf-rules", "generic"] as const) {
        const config = generateIdeConfig(slug, target);
        expect(config, `${slug}/${target}`).toBeTruthy();
        const content = config ?? "";

        expect(content, `${slug}/${target} hero size`).toContain(
          tokens.typography.sizes.hero
        );
        expect(content, `${slug}/${target} body size`).toContain(
          tokens.typography.sizes.body
        );
        expect(content, `${slug}/${target} radius`).toContain(tokens.border.radius);
        expect(content, `${slug}/${target} section spacing`).toContain(
          tokens.spacing.section
        );
        expect(content, `${slug}/${target} gap`).toContain(tokens.spacing.gap.md);
        expect(content, `${slug}/${target} transition`).toContain(
          tokens.interaction.transition
        );
      }
    });
  }
});
