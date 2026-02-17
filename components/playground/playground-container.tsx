"use client";

import { useState, useCallback, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { useI18n } from "@/lib/i18n/context";
import { stylesMeta } from "@/lib/styles/meta";
import { styleTokensRegistry } from "@/lib/styles/tokens-registry";
import { getAllArchetypes } from "@/lib/archetypes";
import type { StyleTokens } from "@/lib/styles/tokens";

import { getTemplateCode } from "@/lib/playground/template-code";
import { PlaygroundPreview } from "./playground-preview";
import { PlaygroundToolbar } from "./playground-toolbar";
import { StyleSwitcher } from "./style-switcher";
import { TemplateSelector } from "./template-selector";

const PlaygroundEditor = dynamic(
  () =>
    import("./playground-editor").then((mod) => mod.PlaygroundEditor),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs text-muted">Loading editor...</p>
      </div>
    ),
  }
);

const PlaygroundLintPanel = dynamic(
  () =>
    import("./playground-lint-panel").then((mod) => mod.PlaygroundLintPanel),
  {
    ssr: false,
    loading: () => (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-xs text-muted">Loading linter...</p>
      </div>
    ),
  }
);

type DeviceSize = "desktop" | "tablet" | "mobile";
type EditorTab = "code" | "lint";

const deviceWidths: Record<DeviceSize, number | undefined> = {
  desktop: undefined,
  tablet: 768,
  mobile: 390,
};

const DEFAULT_STYLE = "neo-brutalist";
const DEFAULT_TEMPLATE = "landing-hero-centered";

function getDefaultCode(): string {
  return `<section class="min-h-screen flex items-center justify-center px-4 py-16 bg-white">
  <div class="max-w-4xl mx-auto text-center">
    <span class="inline-block px-4 py-1 mb-6 text-sm font-bold uppercase tracking-wider border-2 border-black bg-yellow-300">
      StyleKit
    </span>

    <h1 class="text-4xl md:text-6xl lg:text-8xl font-black tracking-tight mb-6">
      Build Beautiful
      <br />
      <span class="text-pink-500">Websites</span>
    </h1>

    <p class="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 font-mono">
      AI-friendly design system toolkit with 75+ styles,
      component recipes, and exportable rules.
    </p>

    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="px-8 py-3 text-lg font-bold border-4 border-black bg-pink-500 text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Get Started
      </button>
      <button class="px-8 py-3 text-lg font-bold border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all">
        Learn More
      </button>
    </div>
  </div>
</section>

<section class="px-4 py-16 md:py-24 bg-gray-50">
  <div class="max-w-6xl mx-auto">
    <h2 class="text-3xl md:text-5xl font-black text-center mb-12">Features</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div class="w-12 h-12 bg-cyan-300 border-2 border-black mb-4 flex items-center justify-center font-bold text-xl">1</div>
        <h3 class="text-xl font-black mb-2">Design Tokens</h3>
        <p class="text-gray-600 font-mono text-sm">Precise CSS class mappings for AI consistency across all styles.</p>
      </div>
      <div class="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div class="w-12 h-12 bg-pink-300 border-2 border-black mb-4 flex items-center justify-center font-bold text-xl">2</div>
        <h3 class="text-xl font-black mb-2">Component Recipes</h3>
        <p class="text-gray-600 font-mono text-sm">Pre-built component patterns with variants, slots, and states.</p>
      </div>
      <div class="p-6 border-4 border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <div class="w-12 h-12 bg-yellow-300 border-2 border-black mb-4 flex items-center justify-center font-bold text-xl">3</div>
        <h3 class="text-xl font-black mb-2">AI Rules Export</h3>
        <p class="text-gray-600 font-mono text-sm">Export rules for Cursor, Claude Code, and other AI coding tools.</p>
      </div>
    </div>
  </div>
</section>`;
}

/**
 * Convert StyleTokens into a CSS string that can be injected into the iframe.
 * Extracts key color values from Tailwind class references.
 */
function tokensToCSS(tokens: StyleTokens): string {
  const lines: string[] = [];

  // Extract background colors
  const bgPrimary = tokens.colors.background.primary;
  const bgSecondary = tokens.colors.background.secondary;

  // Extract text colors
  const textPrimary = tokens.colors.text.primary;

  // Build a basic CSS based on token info
  lines.push("/* StyleKit Token Overrides */");

  // Typography
  if (tokens.typography.heading.includes("font-serif")) {
    lines.push("h1, h2, h3, h4, h5, h6 { font-family: Georgia, 'Times New Roman', serif; }");
  }
  if (tokens.typography.body.includes("font-mono")) {
    lines.push("body, p { font-family: 'JetBrains Mono', 'Fira Code', monospace; }");
  }
  if (tokens.typography.body.includes("font-sans")) {
    lines.push("body, p { font-family: system-ui, -apple-system, sans-serif; }");
  }

  // Border radius
  if (tokens.border.radius.includes("rounded-none")) {
    lines.push("* { --tw-border-radius: 0; }");
    lines.push("button, input, .card, [class*='rounded'] { border-radius: 0 !important; }");
  } else if (tokens.border.radius.includes("rounded-full")) {
    lines.push("button { border-radius: 9999px; }");
  } else if (tokens.border.radius.includes("rounded-2xl") || tokens.border.radius.includes("rounded-3xl")) {
    lines.push("button, .card { border-radius: 1rem; }");
  }

  // Additional styling hints from token color classes
  if (bgPrimary.includes("bg-black") || bgPrimary.includes("bg-zinc-950") || bgPrimary.includes("bg-gray-950")) {
    lines.push("body { background-color: #09090b; color: #fafafa; }");
  }
  if (textPrimary.includes("text-white")) {
    lines.push("body { color: #ffffff; }");
  }
  if (bgSecondary.includes("bg-zinc-900")) {
    lines.push(".card, section:nth-child(even) { background-color: #18181b; }");
  }

  return lines.join("\n");
}

export function PlaygroundContainer() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const { t } = useI18n();
  const darkMode = resolvedTheme === "dark";

  // Parse initial state from URL
  const initialState = useMemo(() => {
    const stateParam = searchParams.get("state");
    if (stateParam) {
      try {
        const decoded = decodeURIComponent(escape(atob(stateParam)));
        const parsed = JSON.parse(decoded);
        return {
          style: parsed.style || DEFAULT_STYLE,
          template: parsed.template || DEFAULT_TEMPLATE,
          code: parsed.code || getDefaultCode(),
        };
      } catch {
        // Invalid state, use defaults
      }
    }
    return {
      style: searchParams.get("style") || DEFAULT_STYLE,
      template: searchParams.get("template") || DEFAULT_TEMPLATE,
      code: getDefaultCode(),
    };
  }, [searchParams]);

  const [code, setCode] = useState(initialState.code);
  const [styleSlug, setStyleSlug] = useState(initialState.style);
  const [templateId, setTemplateId] = useState(initialState.template);
  const [deviceSize, setDeviceSize] = useState<DeviceSize>("desktop");
  const [editorVisible, setEditorVisible] = useState(true);
  const [templatesVisible, setTemplatesVisible] = useState(false);
  const [editorTab, setEditorTab] = useState<EditorTab>("code");

  // Get style metadata for switcher
  const stylesForSwitcher = useMemo(
    () =>
      stylesMeta.map((s) => ({
        slug: s.slug,
        name: s.name,
        nameEn: s.nameEn,
        category: s.category,
      })),
    []
  );

  // Get archetypes for template selector
  const archetypes = useMemo(() => {
    const all = getAllArchetypes();
    return all.map((a) => ({
      id: a.id,
      name: a.name,
      nameZh: a.nameZh,
      category: a.category,
      description: a.description,
    }));
  }, []);

  // Compute token CSS for current style
  const tokenCss = useMemo(() => {
    const tokens = styleTokensRegistry[styleSlug];
    if (!tokens) return "";
    return tokensToCSS(tokens);
  }, [styleSlug]);

  // Update URL when style changes
  const handleStyleChange = useCallback(
    (slug: string) => {
      setStyleSlug(slug);
      const params = new URLSearchParams(searchParams.toString());
      params.set("style", slug);
      params.delete("state");
      router.replace(`/playground?${params.toString()}`, { scroll: false });
    },
    [searchParams, router]
  );

  // Handle template selection
  const handleTemplateChange = useCallback(
    (id: string) => {
      setTemplateId(id);
      const templateCode = getTemplateCode(id);
      if (templateCode) {
        setCode(templateCode);
      }
      setTemplatesVisible(false);
    },
    []
  );

  // Reset to defaults
  const handleReset = useCallback(() => {
    setCode(getDefaultCode());
    setStyleSlug(DEFAULT_STYLE);
    setTemplateId(DEFAULT_TEMPLATE);
    setDeviceSize("desktop");
    router.replace("/playground", { scroll: false });
  }, [router]);

  // Handle editor change
  const handleCodeChange = useCallback((newCode: string) => {
    setCode(newCode);
  }, []);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      {/* Toolbar */}
      <PlaygroundToolbar
        code={code}
        styleSlug={styleSlug}
        templateId={templateId}
        onReset={handleReset}
        deviceSize={deviceSize}
        onDeviceSizeChange={setDeviceSize}
        editorVisible={editorVisible}
        onToggleEditor={() => setEditorVisible((v) => !v)}
        onToggleTemplates={() => setTemplatesVisible((v) => !v)}
        templatesVisible={templatesVisible}
      />

      {/* Style switcher bar */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-border bg-zinc-50 dark:bg-zinc-900">
        <span className="text-xs text-muted uppercase tracking-wider">
          {t("playground.style")}
        </span>
        <StyleSwitcher
          styles={stylesForSwitcher}
          value={styleSlug}
          onChange={handleStyleChange}
        />
      </div>

      {/* Template panel (collapsible) */}
      {templatesVisible && (
        <div className="border-b border-border bg-background">
          <div className="px-3 py-2 border-b border-border">
            <span className="text-xs text-muted uppercase tracking-wider">
              {t("playground.templates")}
            </span>
          </div>
          <TemplateSelector
            templates={archetypes}
            value={templateId}
            onChange={handleTemplateChange}
          />
        </div>
      )}

      {/* Main content: Editor + Preview */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor panel */}
        {editorVisible && (
          <div className="w-[40%] min-w-[300px] border-r border-border flex flex-col">
            <div className="px-3 py-1.5 border-b border-border bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setEditorTab("code")}
                  className={`text-xs uppercase tracking-wider px-1 pb-0.5 transition-colors ${
                    editorTab === "code"
                      ? "text-foreground border-b border-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  HTML
                </button>
                <button
                  onClick={() => setEditorTab("lint")}
                  className={`text-xs uppercase tracking-wider px-1 pb-0.5 transition-colors ${
                    editorTab === "lint"
                      ? "text-foreground border-b border-foreground font-medium"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  Lint
                </button>
              </div>
              {editorTab === "code" && (
                <span className="text-[10px] text-muted">
                  {t("playground.liveEditing")}
                </span>
              )}
            </div>
            <div className="flex-1 overflow-hidden">
              {editorTab === "code" ? (
                <PlaygroundEditor
                  value={code}
                  onChange={handleCodeChange}
                  language="html"
                  darkMode={darkMode}
                />
              ) : (
                <PlaygroundLintPanel code={code} styleSlug={styleSlug} />
              )}
            </div>
          </div>
        )}

        {/* Preview panel */}
        <div className="flex-1 flex flex-col">
          <div className="px-3 py-1.5 border-b border-border bg-zinc-50 dark:bg-zinc-900">
            <span className="text-xs text-muted uppercase tracking-wider">
              {t("playground.preview")}
            </span>
          </div>
          <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-950 flex items-start justify-center p-4">
            <div
              className="bg-white dark:bg-zinc-900 shadow-lg overflow-hidden transition-all duration-300"
              style={{
                width: deviceWidths[deviceSize] ? `${deviceWidths[deviceSize]}px` : "100%",
                height: "100%",
                maxWidth: "100%",
              }}
            >
              <PlaygroundPreview
                code={code}
                styleSlug={styleSlug}
                tokenCss={tokenCss}
                deviceWidth={deviceWidths[deviceSize]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
