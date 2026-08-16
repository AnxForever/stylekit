// Smoke test: spawn the built server over stdio and exercise every tool.
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({
  command: "node",
  args: ["dist/index.js"],
});
const client = new Client({ name: "stylekit-mcp-smoke", version: "1.0.0" });

let failures = 0;
function check(cond, label) {
  console.log(`${cond ? "PASS" : "FAIL"}: ${label}`);
  if (!cond) failures++;
}

await client.connect(transport);

const { tools } = await client.listTools();
const names = tools.map((t) => t.name).sort();
check(tools.length === 6, `6 tools registered (${names.join(", ")})`);
check(
  tools.every((t) => t.annotations?.readOnlyHint === true),
  "all tools annotated readOnlyHint",
);

const search = await client.callTool({
  name: "stylekit_search_styles",
  arguments: { query: "glass" },
});
check(/glass/i.test(search.content[0].text), "search 'glass' finds glass styles");
check(
  Array.isArray(search.structuredContent?.results) &&
    search.structuredContent.results.length > 0,
  "search returns structuredContent.results",
);
check(
  typeof search.structuredContent?.has_more === "boolean" &&
    search.structuredContent?.offset === 0,
  "search returns pagination (offset + has_more)",
);

const detail = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "neo-brutalist" },
});
check(/neo-brutalist/i.test(detail.content[0].text), "get_style neo-brutalist");
check(
  detail.structuredContent?.shadcnInstall?.includes("/r/neo-brutalist.json"),
  "get_style includes shadcn install command",
);
check(
  Array.isArray(detail.structuredContent?.keywords) &&
    typeof detail.structuredContent?.hasRecipes === "boolean",
  "get_style returns keywords + hasRecipes",
);
check(
  detail.structuredContent?.quality?.capabilities?.readiness === "curated" &&
    Array.isArray(detail.structuredContent?.quality?.flags),
  "get_style returns quality capabilities",
);

const tokens = await client.callTool({
  name: "stylekit_get_style_tokens",
  arguments: { slug: "neo-brutalist" },
});
check(/radius|border/i.test(tokens.content[0].text), "get_style_tokens returns tokens");
check(
  typeof tokens.structuredContent?.colors?.background?.primary === "string",
  "get_style_tokens returns typed structured tokens",
);

const recipe = await client.callTool({
  name: "stylekit_get_component_recipe",
  arguments: { slug: "glassmorphism", component: "button" },
});
check(
  recipe.structuredContent?.className?.length > 0,
  "get_component_recipe returns a className",
);

const install = await client.callTool({
  name: "stylekit_get_shadcn_install",
  arguments: { slug: "synthwave" },
});
check(
  /npx shadcn add .*synthwave\.json/.test(install.content[0].text),
  "get_shadcn_install returns the command",
);

const unknown = await client.callTool({
  name: "stylekit_get_style",
  arguments: { slug: "does-not-exist-xyz" },
});
check(unknown.isError === true, "unknown slug returns isError");

// lint_code must catch a real violation and hand back a usable fix.
const lintBad = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<div className="rounded-xl shadow-lg" />',
  },
});
check(
  lintBad.structuredContent?.ok === false &&
    lintBad.structuredContent?.violations?.length >= 2,
  "lint_code flags forbidden classes",
);
check(
  lintBad.structuredContent?.violations?.every((v) => typeof v.reason === "string") &&
    lintBad.structuredContent?.violations?.some((v) => typeof v.fix === "string"),
  "lint_code returns reasons and at least one concrete fix",
);

// The style's own canonical classes must never be reported.
const lintGood = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<div className="rounded-none border-2 border-black hidden md:block" />',
  },
});
check(lintGood.structuredContent?.ok === true, "lint_code passes conforming code");

const lintMissing = await client.callTool({
  name: "stylekit_lint_code",
  arguments: {
    slug: "neo-brutalist",
    code: '<button className="px-4" />',
    checkRequired: ["button"],
  },
});
check(
  lintMissing.structuredContent?.missingRequired?.[0]?.missing?.length > 0,
  "lint_code reports missing required classes when asked",
);

await client.close();
console.log(
  failures === 0
    ? "\nALL SMOKE TESTS PASSED"
    : `\n${failures} FAILURE(S)`,
);
process.exit(failures === 0 ? 0 : 1);
