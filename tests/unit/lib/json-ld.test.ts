import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/lib/security/json-ld";

describe("serializeJsonLd", () => {
  it("escapes html-significant characters", () => {
    const serialized = serializeJsonLd({
      name: "</script><script>alert(1)</script>",
      text: "A&B<C>D",
    });

    expect(serialized).toContain("\\u003c/script\\u003e");
    expect(serialized).toContain("\\u0026");
    expect(serialized).not.toContain("</script>");
  });

  it("produces valid json payload", () => {
    const serialized = serializeJsonLd({ hello: "world" });
    expect(JSON.parse(serialized)).toEqual({ hello: "world" });
  });
});
