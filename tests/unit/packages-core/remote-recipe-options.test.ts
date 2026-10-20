import { afterEach, describe, expect, it, vi } from "vitest";
import {
  clearRemoteCache,
  getComponentRecipeLive,
} from "@/packages/core/src/discovery/remote";
import { getImplementationBrief } from "@/lib/implementation-brief";

afterEach(() => {
  clearRemoteCache();
  vi.unstubAllGlobals();
});

describe("live component recipe render options", () => {
  it("keeps the third argument as remote options and renders the live definition with the fourth", async () => {
    const brief = getImplementationBrief("broadcast-glitch")!;
    const fetchMock = vi.fn().mockResolvedValue(new Response(JSON.stringify(brief), {
      status: 200,
      headers: { "content-type": "application/json" },
    }));
    vi.stubGlobal("fetch", fetchMock);

    const result = await getComponentRecipeLive(
      "broadcast-glitch",
      "button",
      { baseUrl: "https://recipe-options.test" },
      { variant: "yellow", params: { size: "sm" }, slots: { label: "Go live" } },
    );

    expect(result.origin).toBe("live");
    expect(result.data?.className).toContain("bg-[#F5E000]");
    expect(result.data?.className).toContain("px-4 py-2 text-xs");
    expect(result.data?.code).toContain("Go live");
    expect(fetchMock.mock.calls[0]?.[0]).toBe("https://recipe-options.test/api/styles/broadcast-glitch/brief");
    await expect(getComponentRecipeLive(
      "broadcast-glitch",
      "button",
      { baseUrl: "https://recipe-options.test" },
      { variant: "missing" },
    )).rejects.toMatchObject({ name: "RecipeRenderInputError", code: "unknown_variant" });
  });

  it("applies the same options to the bundled recipe after a live failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify({ error: "offline" }), {
      status: 503,
      headers: { "content-type": "application/json" },
    })));

    const result = await getComponentRecipeLive(
      "broadcast-glitch",
      "button",
      { baseUrl: "https://recipe-offline.test" },
      { variant: "signal", params: { fullWidth: true }, slots: { label: "Retry" } },
    );

    expect(result.origin).toBe("bundled");
    expect(result.data?.className).toContain("bg-transparent");
    expect(result.data?.className).toContain("w-full");
    expect(result.data?.code).toContain("Retry");
  });

  it("does not accept a live select recipe that has no option definitions", async () => {
    const malformedBrief = structuredClone(getImplementationBrief("broadcast-glitch")!);
    const sizeParameter = malformedBrief.recipes.button.parameters.find((parameter) => parameter.type === "select")!;
    delete sizeParameter.options;
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(malformedBrief), {
      status: 200,
      headers: { "content-type": "application/json" },
    })));

    const result = await getComponentRecipeLive(
      "broadcast-glitch",
      "button",
      { baseUrl: "https://malformed-live-recipe.test" },
      { params: { size: "lg" } },
    );

    expect(result.origin).toBe("bundled");
    expect(result.fallbackReason).toContain("stylekit-brief-v1 contract");
    expect(result.data?.className).toContain("px-9 py-4 text-base");
  });

  it("does not accept live select defaults with a mismatched type or missing enum value", async () => {
    const sourceBrief = getImplementationBrief("broadcast-glitch")!;
    const invalidDefaults = [
      { name: "wrong-type", value: true },
      { name: "outside-enum", value: "xl" },
    ] as const;

    for (const invalidDefault of invalidDefaults) {
      const malformedBrief = structuredClone(sourceBrief);
      const sizeParameter = malformedBrief.recipes.button.parameters.find((parameter) => parameter.type === "select")!;
      sizeParameter.default = invalidDefault.value;
      vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(JSON.stringify(malformedBrief), {
        status: 200,
        headers: { "content-type": "application/json" },
      })));

      const result = await getComponentRecipeLive(
        "broadcast-glitch",
        "button",
        { baseUrl: `https://${invalidDefault.name}.test` },
      );

      expect(result.origin).toBe("bundled");
      expect(result.fallbackReason).toContain("stylekit-brief-v1 contract");
      expect(result.data?.className).toContain("px-7 py-3 text-sm");
      clearRemoteCache();
    }
  });
});
