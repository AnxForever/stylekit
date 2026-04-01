"use client";

import { useState } from "react";
import { Download, Copy, Check, FolderGit2, FileCode, Package } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { getStyleBySlug } from "@/lib/styles";

interface ProjectExportProps {
  code: string;
  styleSlug: string;
  templateId: string;
  onClose: () => void;
}

type ExportFormat = "nextjs" | "vite" | "html";

export function ProjectExport({ code, styleSlug, templateId, onClose }: ProjectExportProps) {
  const { locale } = useI18n();
  const [format, setFormat] = useState<ExportFormat>("nextjs");
  const [copied, setCopied] = useState<string | null>(null);

  const style = getStyleBySlug(styleSlug);

  const copyToClipboard = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // Generate project files based on format
  const generateFiles = (): Record<string, string> => {
    const globalCss = style?.globalCss || "";
    
    if (format === "nextjs") {
      return {
        "app/page.tsx": generateNextJsPage(code),
        "app/globals.css": generateGlobalsCss(globalCss),
        "app/layout.tsx": generateNextJsLayout(style?.nameEn || styleSlug),
        "package.json": generatePackageJson("nextjs", styleSlug),
        "tailwind.config.ts": generateTailwindConfig(),
      };
    }
    
    if (format === "vite") {
      return {
        "src/App.tsx": generateViteApp(code),
        "src/index.css": generateGlobalsCss(globalCss),
        "src/main.tsx": generateViteMain(),
        "package.json": generatePackageJson("vite", styleSlug),
        "tailwind.config.js": generateTailwindConfig(),
        "index.html": generateViteHtml(style?.nameEn || styleSlug),
      };
    }
    
    // HTML
    return {
      "index.html": generateStandaloneHtml(code, globalCss, style?.nameEn || styleSlug),
      "styles.css": generateGlobalsCss(globalCss),
    };
  };

  const files = generateFiles();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background border border-border w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div className="flex items-center gap-3">
            <FolderGit2 className="w-5 h-5" />
            <h2 className="text-lg font-medium">
              {locale === "zh" ? "导出项目" : "Export Project"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-muted hover:text-foreground transition-colors"
          >
            <span className="sr-only">Close</span>
            &times;
          </button>
        </div>

        {/* Format selector */}
        <div className="px-6 py-4 border-b border-border bg-zinc-50 dark:bg-zinc-900">
          <p className="text-xs uppercase tracking-widest text-muted mb-3">
            {locale === "zh" ? "项目模板" : "Project Template"}
          </p>
          <div className="flex gap-3">
            <FormatButton
              format="nextjs"
              currentFormat={format}
              onClick={() => setFormat("nextjs")}
              label="Next.js"
              description={locale === "zh" ? "App Router + Tailwind" : "App Router + Tailwind"}
            />
            <FormatButton
              format="vite"
              currentFormat={format}
              onClick={() => setFormat("vite")}
              label="Vite + React"
              description={locale === "zh" ? "轻量快速启动" : "Lightweight starter"}
            />
            <FormatButton
              format="html"
              currentFormat={format}
              onClick={() => setFormat("html")}
              label="Static HTML"
              description={locale === "zh" ? "纯 HTML + CSS" : "Plain HTML + CSS"}
            />
          </div>
        </div>

        {/* Files list */}
        <div className="flex-1 overflow-auto p-6">
          <p className="text-xs uppercase tracking-widest text-muted mb-4">
            {locale === "zh" ? "生成的文件" : "Generated Files"}
          </p>
          <div className="space-y-4">
            {Object.entries(files).map(([filename, content]) => (
              <div key={filename} className="border border-border">
                <div className="flex items-center justify-between px-4 py-2 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
                  <div className="flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-muted" />
                    <span className="text-sm font-mono">{filename}</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(content, filename)}
                    className="flex items-center gap-1.5 text-xs text-muted hover:text-foreground transition-colors"
                  >
                    {copied === filename ? (
                      <>
                        <Check className="w-3 h-3" />
                        {locale === "zh" ? "已复制" : "Copied"}
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        {locale === "zh" ? "复制" : "Copy"}
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono overflow-x-auto max-h-48 overflow-y-auto bg-zinc-950 text-zinc-100">
                  {content}
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-zinc-50 dark:bg-zinc-900 flex items-center justify-between">
          <p className="text-xs text-muted">
            {locale === "zh"
              ? `风格: ${style?.name || styleSlug} | 模板: ${templateId}`
              : `Style: ${style?.nameEn || styleSlug} | Template: ${templateId}`}
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-border hover:border-foreground transition-colors"
            >
              {locale === "zh" ? "关闭" : "Close"}
            </button>
            <button
              onClick={() => downloadZip(files, styleSlug)}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-foreground text-background hover:bg-foreground/90 transition-colors"
            >
              <Download className="w-4 h-4" />
              {locale === "zh" ? "下载 ZIP" : "Download ZIP"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormatButton({
  format,
  currentFormat,
  onClick,
  label,
  description,
}: {
  format: ExportFormat;
  currentFormat: ExportFormat;
  onClick: () => void;
  label: string;
  description: string;
}) {
  const isActive = format === currentFormat;
  return (
    <button
      onClick={onClick}
      className={`flex-1 p-4 border text-left transition-colors ${
        isActive
          ? "border-foreground bg-background"
          : "border-border hover:border-foreground/50"
      }`}
    >
      <div className="flex items-center gap-2 mb-1">
        <Package className="w-4 h-4" />
        <span className="font-medium text-sm">{label}</span>
      </div>
      <p className="text-xs text-muted">{description}</p>
    </button>
  );
}

// File generators
function generateNextJsPage(code: string): string {
  // Convert HTML to JSX-compatible format
  const jsxCode = code
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=");

  return `export default function Home() {
  return (
    <main>
      ${jsxCode}
    </main>
  );
}`;
}

function generateNextJsLayout(styleName: string): string {
  return `import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "${styleName} - Built with StyleKit",
  description: "A beautiful website built with StyleKit design system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}`;
}

function generateGlobalsCss(styleCss: string): string {
  return `@tailwind base;
@tailwind components;
@tailwind utilities;

${styleCss}`;
}

function generatePackageJson(template: "nextjs" | "vite", styleSlug: string): string {
  if (template === "nextjs") {
    return JSON.stringify(
      {
        name: `stylekit-${styleSlug}`,
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "next lint",
        },
        dependencies: {
          next: "^14.2.0",
          react: "^18.3.0",
          "react-dom": "^18.3.0",
        },
        devDependencies: {
          "@types/node": "^20.0.0",
          "@types/react": "^18.3.0",
          "@types/react-dom": "^18.3.0",
          autoprefixer: "^10.4.0",
          postcss: "^8.4.0",
          tailwindcss: "^3.4.0",
          typescript: "^5.0.0",
        },
      },
      null,
      2
    );
  }

  return JSON.stringify(
    {
      name: `stylekit-${styleSlug}`,
      private: true,
      version: "0.1.0",
      type: "module",
      scripts: {
        dev: "vite",
        build: "tsc && vite build",
        preview: "vite preview",
      },
      dependencies: {
        react: "^18.3.0",
        "react-dom": "^18.3.0",
      },
      devDependencies: {
        "@types/react": "^18.3.0",
        "@types/react-dom": "^18.3.0",
        "@vitejs/plugin-react": "^4.3.0",
        autoprefixer: "^10.4.0",
        postcss: "^8.4.0",
        tailwindcss: "^3.4.0",
        typescript: "^5.0.0",
        vite: "^5.4.0",
      },
    },
    null,
    2
  );
}

function generateTailwindConfig(): string {
  return `/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};`;
}

function generateViteApp(code: string): string {
  const jsxCode = code
    .replace(/class=/g, "className=")
    .replace(/for=/g, "htmlFor=");

  return `import "./index.css";

function App() {
  return (
    <>
      ${jsxCode}
    </>
  );
}

export default App;`;
}

function generateViteMain(): string {
  return `import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`;
}

function generateViteHtml(styleName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${styleName} - Built with StyleKit</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
}

function generateStandaloneHtml(code: string, css: string, styleName: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${styleName} - Built with StyleKit</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
${css}
  </style>
</head>
<body>
${code}
</body>
</html>`;
}

async function downloadZip(files: Record<string, string>, styleSlug: string) {
  // Create a simple text-based download for now
  // In production, you'd use a library like JSZip
  const content = Object.entries(files)
    .map(([filename, fileContent]) => `// ===== ${filename} =====\n\n${fileContent}`)
    .join("\n\n");

  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `stylekit-${styleSlug}-project.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
