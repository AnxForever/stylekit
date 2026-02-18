"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { styleTokensRegistry } from "@/lib/styles/tokens-registry";
import type { StyleTokens } from "@/lib/styles/tokens";
import type { TranslationKey } from "@/lib/i18n/translations";

interface ComponentCompareProps {
  styleA: string;
  styleB: string;
  styleC?: string;
  styleAName: string;
  styleBName: string;
  styleCName?: string;
}

interface Snippet {
  id: string;
  labelKey: TranslationKey;
  html: string;
}

const SNIPPETS: Snippet[] = [
  {
    id: "button",
    labelKey: "compare.snippetButton",
    html: `<div class="flex flex-wrap gap-3 p-6">
  <button class="px-6 py-2.5 font-semibold text-white bg-blue-600 rounded-lg shadow hover:bg-blue-700 transition">Primary</button>
  <button class="px-6 py-2.5 font-semibold border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition">Secondary</button>
</div>`,
  },
  {
    id: "card",
    labelKey: "compare.snippetCard",
    html: `<div class="max-w-xs mx-auto p-6">
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
    <div class="h-28 bg-gradient-to-br from-blue-500 to-purple-600"></div>
    <div class="p-4">
      <h3 class="text-lg font-bold mb-1">Card Title</h3>
      <p class="text-sm text-gray-500 mb-3">Description text goes here.</p>
      <button class="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg">Action</button>
    </div>
  </div>
</div>`,
  },
  {
    id: "form",
    labelKey: "compare.snippetForm",
    html: `<div class="max-w-xs mx-auto p-6 space-y-3">
  <div><label class="block text-sm font-medium mb-1">Email</label>
  <input type="email" placeholder="you@example.com" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
  <div><label class="block text-sm font-medium mb-1">Password</label>
  <input type="password" placeholder="Password" class="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" /></div>
  <button class="w-full px-4 py-2.5 font-semibold text-white bg-blue-600 rounded-lg">Sign In</button>
</div>`,
  },
];

function tokensToCSS(tokens: StyleTokens): string {
  const l: string[] = [];
  if (tokens.typography.heading.includes("font-serif"))
    l.push("h1,h2,h3{font-family:Georgia,serif}");
  if (tokens.typography.body.includes("font-mono"))
    l.push("body,p,span,label{font-family:'JetBrains Mono',monospace}");
  if (tokens.border.radius.includes("rounded-none"))
    l.push("button,input,[class*='rounded']{border-radius:0!important}");
  else if (tokens.border.radius.includes("rounded-full"))
    l.push("button{border-radius:9999px}");
  else if (tokens.border.radius.includes("rounded-2xl"))
    l.push("button,[class*='rounded']{border-radius:1rem}");
  const bg = tokens.colors.background.primary;
  if (bg.includes("bg-black") || bg.includes("bg-zinc-950"))
    l.push("body{background:#09090b;color:#fafafa}");
  if (tokens.shadow.md.includes("shadow-none"))
    l.push("[class*='shadow']{box-shadow:none!important}");
  if (tokens.border.width.includes("border-4"))
    l.push("button,input,[class*='border']{border-width:3px}");
  return l.join("\n");
}

function StyleFrame({ html, styleSlug, label }: { html: string; styleSlug: string; label: string }) {
  const ref = useRef<HTMLIFrameElement>(null);
  const srcdoc = useMemo(() => {
    const tokens = styleTokensRegistry[styleSlug];
    const css = tokens ? tokensToCSS(tokens) : "";
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/><script src="https://cdn.tailwindcss.com"><\/script><style>${css}</style></head><body class="bg-white">${html}</body></html>`;
  }, [html, styleSlug]);

  const [height, setHeight] = useState(200);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return;
    const onLoad = () => {
      try {
        const h = iframe.contentDocument?.body?.scrollHeight;
        if (h && h > 50) setHeight(Math.min(h + 16, 400));
      } catch { /* cross-origin */ }
    };
    iframe.addEventListener("load", onLoad);
    return () => iframe.removeEventListener("load", onLoad);
  }, [srcdoc]);

  return (
    <div className="flex-1 min-w-0">
      <div className="text-xs font-medium text-muted mb-1.5 truncate">{label}</div>
      <div className="border border-border overflow-hidden bg-white">
        <iframe
          ref={ref}
          srcDoc={srcdoc}
          sandbox="allow-scripts"
          className="w-full border-0"
          style={{ height }}
          title={`${label} preview`}
        />
      </div>
    </div>
  );
}

export function ComponentCompare({
  styleA, styleB, styleC,
  styleAName, styleBName, styleCName,
}: ComponentCompareProps) {
  const { t } = useI18n();
  const [snippetId, setSnippetId] = useState("button");
  const snippet = SNIPPETS.find((s) => s.id === snippetId) ?? SNIPPETS[0];

  const styles = [
    { slug: styleA, name: styleAName },
    { slug: styleB, name: styleBName },
    ...(styleC && styleCName ? [{ slug: styleC, name: styleCName }] : []),
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">{t("compare.componentCompare")}</h3>
      <div className="flex items-center gap-2">
        {SNIPPETS.map((s) => (
          <button
            key={s.id}
            onClick={() => setSnippetId(s.id)}
            className={`px-3 py-1 text-xs transition-colors ${
              snippetId === s.id
                ? "bg-foreground text-background font-medium"
                : "text-muted hover:text-foreground border border-border"
            }`}
          >
            {t(s.labelKey)}
          </button>
        ))}
      </div>
      <div className="flex gap-4">
        {styles.map((s) => (
          <StyleFrame key={s.slug} html={snippet.html} styleSlug={s.slug} label={s.name} />
        ))}
      </div>
    </div>
  );
}
