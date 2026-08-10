import { requestStyleIntent, type StyleIntentProvider } from "@/lib/bailian";

async function main() {
  const provider: StyleIntentProvider = process.env.STYLE_ADVISOR_PROVIDER === "deepseek"
    ? "deepseek"
    : "dashscope";
  const isDeepSeek = provider === "deepseek";
  const apiKey = process.env[isDeepSeek ? "DEEPSEEK_API_KEY" : "DASHSCOPE_API_KEY"]?.trim();
  const model = process.env[isDeepSeek ? "DEEPSEEK_MODEL" : "DASHSCOPE_MODEL"];
  const baseUrl = process.env[isDeepSeek ? "DEEPSEEK_BASE_URL" : "DASHSCOPE_BASE_URL"];
  const request = process.env.STYLE_ADVISOR_REQUEST?.trim() || "B2B 风控数据后台，需要清晰层级、加载、空数据、错误和成功状态。";

  if (!apiKey) {
    throw new Error(`${isDeepSeek ? "DEEPSEEK_API_KEY" : "DASHSCOPE_API_KEY"} is not configured.`);
  }

  const intent = await requestStyleIntent({ provider, apiKey, model, baseUrl, request });
  console.log(JSON.stringify({
    ok: true,
    provider,
    model: model ?? (isDeepSeek ? "deepseek-chat" : "qwen3.7-max"),
    styleSlug: intent.styleSlug,
    confidence: intent.confidence,
    projectType: intent.projectType,
    rationale: intent.rationale,
  }, null, 2));
}

void main().catch((error) => {
  console.error(error instanceof Error ? error.message : "Style advisor live test failed.");
  process.exitCode = 1;
});
