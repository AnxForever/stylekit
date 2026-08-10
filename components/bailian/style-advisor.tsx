"use client";

import { useEffect, useMemo, useState } from "react";

type AdvisorIntent = {
  styleSlug: string;
  confidence: number;
  rationale: string[];
};

type StyleSummary = {
  slug: string;
  name: string;
  nameEn: string;
  description: string;
  colors: { primary: string; secondary: string; accent: string[] };
  componentIds: string[];
  recipes: { available: boolean; ids: string[] };
  readinessCoverage: { overall?: number; accessibility?: number; states?: number } | null;
};

type AdvisorStatus = {
  provider: "dashscope" | "deepseek";
  model: string;
  liveAvailable: boolean;
  replayAvailable: boolean;
  supportedStyles: string[];
};

type AdvisorResponse = {
  source: "live" | "replay" | "dashscope" | "deepseek" | "fixture";
  provider: string;
  model: string;
  intent: AdvisorIntent;
  style: StyleSummary | null;
  knowledge?: KnowledgeReferenceContext;
  generatorKnowledge?: KnowledgeReference[];
};

type KnowledgeReference = {
  id: string;
  name: string;
  summary: string;
  sourceUrl: string;
  usagePolicy: string;
};

type KnowledgeReferenceContext = {
  references: KnowledgeReference[];
  retrieved: boolean;
};

const SAMPLE_REQUESTS = [
  "B2B 风控数据后台，强调清晰层级，需要加载、空数据、错误和成功状态。",
  "面向创意团队的项目管理工作区，要有高级感、柔和层次和轻量动效。",
  "一个移动优先的个人作品集，留白充足，内容像一本现代杂志。",
];

function providerLabel(provider: AdvisorStatus["provider"] | "fixture") {
  if (provider === "deepseek") return "DeepSeek";
  if (provider === "dashscope") return "百炼 / Qwen";
  return "离线回放";
}

export function StyleAdvisor({
  initialRequest = "Build a clear B2B account-risk dashboard with loading, empty, error, and success states.",
  onApplyStyle,
}: {
  initialRequest?: string;
  onApplyStyle: (styleSlug: string) => void;
}) {
  const [request, setRequest] = useState(initialRequest);
  const [intent, setIntent] = useState<AdvisorIntent | null>(null);
  const [style, setStyle] = useState<StyleSummary | null>(null);
  const [status, setStatus] = useState<AdvisorStatus | null>(null);
  const [mode, setMode] = useState<"live" | "replay" | null>(null);
  const [source, setSource] = useState<AdvisorResponse["source"] | null>(null);
  const [knowledge, setKnowledge] = useState<KnowledgeReferenceContext | null>(null);
  const [generatorKnowledge, setGeneratorKnowledge] = useState<KnowledgeReference[]>([]);
  const [working, setWorking] = useState(false);
  const [statusLoading, setStatusLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/ai/style-advisor", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("状态读取失败");
        return (await response.json()) as AdvisorStatus;
      })
      .then((payload) => {
        if (active) setStatus(payload);
      })
      .catch(() => {
        if (active) setStatus(null);
      })
      .finally(() => {
        if (active) setStatusLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const liveLabel = useMemo(() => {
    if (statusLoading) return "检查模型状态…";
    if (!status) return "模型状态未知";
    return status.liveAvailable
      ? `${providerLabel(status.provider)} · 可实时推荐`
      : `${providerLabel(status.provider)} · 未配置 Key`;
  }, [status, statusLoading]);

  async function recommend(nextMode: "live" | "replay") {
    setWorking(true);
    setMode(nextMode);
    setIntent(null);
    setStyle(null);
    setSource(null);
    setKnowledge(null);
    setGeneratorKnowledge([]);
    setError(null);
    try {
      const response = await fetch("/api/ai/style-advisor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ request: request.trim(), mode: nextMode }),
      });
      const payload = (await response.json()) as Partial<AdvisorResponse> & { error?: string };
      if (!response.ok || !payload.intent) {
        throw new Error(payload.error ?? "风格分析失败，请稍后重试。");
      }
      setIntent(payload.intent);
      setStyle(payload.style ?? null);
      setSource(payload.source ?? (nextMode === "replay" ? "replay" : "live"));
      setKnowledge(payload.knowledge ?? { references: [], retrieved: false });
      setGeneratorKnowledge(payload.generatorKnowledge ?? []);
    } catch (advisorError) {
      setError(advisorError instanceof Error ? advisorError.message : "风格分析失败，请稍后重试。");
    } finally {
      setWorking(false);
    }
  }

  const confidence = intent ? Math.round(intent.confidence * 100) : 0;
  const readiness = style?.readinessCoverage?.overall;

  return (
    <section
      className="relative overflow-hidden border border-border bg-background p-5 shadow-[0_14px_40px_-32px_rgba(0,0,0,.55)]"
      aria-labelledby="style-advisor-title"
    >
      <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full border border-border/70" aria-hidden="true" />
      <div className="relative">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">StyleKit / Intent Router</p>
            <h2 id="style-advisor-title" className="mt-2 text-lg font-medium tracking-tight">AI Style Advisor</h2>
            <p className="mt-2 max-w-[34rem] text-sm leading-6 text-muted">
              先理解需求，再从已验证的 StyleKit 风格中做一个可解释的选择。
            </p>
          </div>
          <span className="shrink-0 border border-border px-2 py-1 font-mono text-[10px] tracking-[0.14em] text-muted">V1</span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 border-y border-border py-2 text-[11px] text-muted" role="status" aria-live="polite">
          <span className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${status?.liveAvailable ? "bg-emerald-600" : "bg-amber-500"}`} aria-hidden="true" />
            {liveLabel}
          </span>
          <span>{status?.supportedStyles.length ?? 4} 个已验证风格</span>
        </div>

        <div className="mt-4">
          <label htmlFor="style-advisor-request" className="flex items-center justify-between gap-3 text-sm font-medium">
            <span>项目需求</span>
            <span className="font-mono text-[10px] font-normal text-muted">{request.length}/2000</span>
          </label>
          <textarea
            id="style-advisor-request"
            value={request}
            onChange={(event) => setRequest(event.target.value)}
            rows={5}
            maxLength={2_000}
            className="workspace-input mt-2 min-h-28 resize-y leading-6 focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            aria-describedby="style-advisor-help"
          />
          <p id="style-advisor-help" className="mt-2 text-xs leading-5 text-muted">
            描述用户、目标、页面类型、状态和你不想要的视觉效果。模型只返回风格意图，不直接写最终代码。
          </p>
        </div>

        <div className="mt-3 flex flex-wrap gap-2" aria-label="需求示例">
          {SAMPLE_REQUESTS.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => setRequest(sample)}
              className="border border-border px-2.5 py-1.5 text-left text-[11px] leading-4 text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              {sample.slice(0, 18)}…
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => void recommend("live")}
            disabled={working || !request.trim() || statusLoading || !status?.liveAvailable}
            aria-busy={working && mode === "live"}
            className="min-h-11 bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {working && mode === "live" ? "分析中…" : "实时推荐"}
          </button>
          <button
            type="button"
            onClick={() => void recommend("replay")}
            disabled={working || !request.trim()}
            aria-busy={working && mode === "replay"}
            className="min-h-11 border border-border px-3 text-sm font-medium transition-colors hover:border-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {working && mode === "replay" ? "加载中…" : "离线回放"}
          </button>
        </div>

        {error ? (
          <div className="mt-4 border border-red-300 bg-red-50 p-3 text-xs leading-5 text-red-800" role="alert">
            <p className="font-medium">无法完成推荐</p>
            <p className="mt-1">{error}</p>
            {!status?.liveAvailable ? <p className="mt-1">可以先使用“离线回放”验证整个工作流。</p> : null}
          </div>
        ) : null}

        {intent ? (
          <div className="mt-5 border-t border-border pt-5" aria-live="polite" aria-labelledby="style-advisor-result-title">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-muted">{source === "replay" || source === "fixture" ? "离线推荐结果" : `${providerLabel(source === "deepseek" || source === "dashscope" ? source : "fixture")} 推荐结果`}</p>
                <h3 id="style-advisor-result-title" className="mt-1 font-mono text-base">{style?.nameEn ?? intent.styleSlug}</h3>
                {style?.name ? <p className="mt-1 text-sm text-muted">{style.name}</p> : null}
              </div>
              <div className="text-right">
                <p className="font-mono text-lg">{confidence}%</p>
                <p className="text-[10px] uppercase tracking-[0.14em] text-muted">confidence</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden bg-border" role="progressbar" aria-label="推荐置信度" aria-valuemin={0} aria-valuemax={100} aria-valuenow={confidence}>
              <div className="h-full bg-foreground transition-[width] duration-500 motion-reduce:transition-none" style={{ width: `${confidence}%` }} />
            </div>

            {style?.description ? <p className="mt-4 text-sm leading-6 text-muted">{style.description}</p> : null}
            <ul className="mt-4 grid gap-2 text-xs leading-5 text-muted">
              {intent.rationale.map((reason) => <li key={reason} className="flex gap-2"><span aria-hidden="true">↳</span><span>{reason}</span></li>)}
            </ul>

            {style ? (
              <div className="mt-4 grid grid-cols-3 border-y border-border py-3 text-[10px] text-muted">
                <div><p className="font-mono text-sm text-foreground">{style.componentIds.length}</p><p className="mt-1">组件配方</p></div>
                <div><p className="font-mono text-sm text-foreground">{style.recipes.ids.length}</p><p className="mt-1">Recipes</p></div>
                <div><p className="font-mono text-sm text-foreground">{readiness == null ? "—" : `${Math.round(readiness * 100)}%`}</p><p className="mt-1">就绪度</p></div>
              </div>
            ) : null}

            <button
              type="button"
              onClick={() => onApplyStyle(intent.styleSlug)}
              className="mt-4 min-h-11 w-full bg-foreground px-3 text-sm font-medium text-background transition-opacity hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2"
            >
              应用 {style?.nameEn ?? intent.styleSlug} 到项目
            </button>
            <p className="mt-2 text-center text-[11px] text-muted">应用后仍需点击“保存新版本”，再开始生成工程。</p>
            <div className="mt-5 grid gap-3 border-t border-border pt-5 sm:grid-cols-2" aria-label="Knowledge sources">
              <KnowledgeSourceGroup
                title="Advisor context"
                description="Published references used to ground the recommendation."
                references={knowledge?.references ?? []}
              />
              <KnowledgeSourceGroup
                title="Generator allowlist"
                description="Only approved, published, hash-complete resources can appear here."
                references={generatorKnowledge}
              />
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function KnowledgeSourceGroup({
  title,
  description,
  references,
}: {
  title: string;
  description: string;
  references: KnowledgeReference[];
}) {
  return (
    <section className="min-w-0 border border-border bg-background/50 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{title}</p>
          <p className="mt-1 text-[11px] leading-4 text-muted">{description}</p>
        </div>
        <span className="font-mono text-xs text-foreground">{references.length.toString().padStart(2, "0")}</span>
      </div>
      {references.length > 0 ? (
        <div className="mt-3 space-y-2">
          {references.slice(0, 3).map((reference) => (
            <a
              key={reference.id}
              href={reference.sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="block border-t border-border pt-2 transition-colors hover:text-foreground"
            >
              <span className="block truncate text-xs font-medium">{reference.name}</span>
              <span className="mt-1 block line-clamp-2 text-[11px] leading-4 text-muted">{reference.summary}</span>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-3 border-t border-dashed border-border pt-2 text-[11px] leading-4 text-muted">
          No eligible resources yet. The catalog is fail-closed until review and publication are complete.
        </p>
      )}
    </section>
  );
}
