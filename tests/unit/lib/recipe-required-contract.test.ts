import { describe, expect, it } from "vitest";
import { getRecipe, generateExample } from "@/lib/recipes";
import { lintStyleCode } from "@/lib/styles/style-linter";

describe("recipe-authoritative required contracts", () => {
  it.each(["neo-brutalist", "glassmorphism"])("accepts %s outline without imposing the primary background or shadow", (slug) => {
    const code = generateExample(getRecipe(slug, "button")!, "outline").code;
    expect(lintStyleCode(slug, code, { checkRequired: ["button"], strict: true }).status).toBe("pass");
  });

  it("requires Editorial's actual button font and still rejects a different value", () => {
    const code = generateExample(getRecipe("editorial", "button")!).code;
    expect(lintStyleCode("editorial", code, { checkRequired: ["button"], strict: true }).status).toBe("pass");
    const changed = lintStyleCode("editorial", code.replace("font-sans", "font-serif"), { checkRequired: ["button"], strict: true });
    expect(changed.status).toBe("fail");
    expect(changed.missingRequired[0].missing).toContain("font-sans");
  });

  it("does not accept a Notion input that removes the outline and loses its replacement focus border", () => {
    const code = generateExample(getRecipe("notion-style", "input")!).code;
    expect(code).toContain("focus:border-b-2");
    expect(lintStyleCode("notion-style", code, { checkRequired: ["input"], strict: true }).status).toBe("pass");
    const changed = lintStyleCode("notion-style", code.replace("focus:border-b-2", ""), { checkRequired: ["input"], strict: true });
    expect(changed.status).toBe("fail");
    expect(changed.missingRequired[0].missing).toContain("focus:border-b-2");
  });

  it("allows authored dark button text while keeping bright surfaces forbidden", () => {
    const code = generateExample(getRecipe("dark-mode", "button")!).code;
    expect(code).toContain("text-white");
    expect(lintStyleCode("dark-mode", code, { checkRequired: ["button"], strict: true }).status).toBe("pass");
    expect(lintStyleCode("dark-mode", '<div className="bg-white" />').status).toBe("fail");
  });
});
