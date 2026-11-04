import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

describe("style detail server boundary", () => {
  it("keeps large profiles and token payloads out of the client component", () => {
    const clientContent = readFileSync(
      path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
      "utf8",
    );

    // The readiness profile and the token bundle used to cross into the client
    // tree as props. The page now ships a rendered DESIGN.md string instead, so
    // both payloads must stay off this boundary.
    expect(clientContent).not.toContain("readiness: FrontendReadinessProfile");
    expect(clientContent).not.toContain("specTokens");
    expect(clientContent).toContain("designMarkdown: string");
  });

  it("hands the document over as a plain string, not as a spec object", () => {
    const clientContent = readFileSync(
      path.join(process.cwd(), "app/styles/[slug]/_content.tsx"),
      "utf8",
    );

    // A boolean and a pre-rendered string are the whole contract. Importing the
    // spec type or the registry here would drag the renderer into the bundle.
    expect(clientContent).not.toContain("@/lib/design-spec/types");
    expect(clientContent).not.toContain("@/lib/design-spec/registry");
    expect(clientContent).toContain("hasDesignSpec: boolean");
  });
});
