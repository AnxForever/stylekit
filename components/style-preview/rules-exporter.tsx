"use client";

import { useState } from "react";

interface RulesExporterProps {
  aiRules: string;
  globalCss: string;
  styleName: string;
}

type ExportFormat = "trae" | "cursor" | "prompt";

export function RulesExporter({
  aiRules,
  globalCss,
  styleName,
}: RulesExporterProps) {
  const [format, setFormat] = useState<ExportFormat>("trae");
  const [copied, setCopied] = useState(false);

  const getContent = () => {
    switch (format) {
      case "trae":
        return aiRules;
      case "cursor":
        return `# ${styleName} Design Style Rules\n\n${aiRules}`;
      case "prompt":
        return `请按照以下设计风格生成代码：\n\n风格：${styleName}\n\n${aiRules}\n\n## 全局 CSS\n\n\`\`\`css\n${globalCss}\n\`\`\``;
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getContent());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement("textarea");
      textArea.value = getContent();
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const content = getContent();
    const filename =
      format === "trae"
        ? "trae-rules.md"
        : format === "cursor"
          ? ".cursorrules"
          : `${styleName.toLowerCase().replace(/\s+/g, "-")}-prompt.md`;

    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="border border-border">
      {/* Format Tabs */}
      <div className="flex border-b border-border">
        {(
          [
            { key: "trae", label: "Trae Rules" },
            { key: "cursor", label: "Cursor Rules" },
            { key: "prompt", label: "Prompt" },
          ] as { key: ExportFormat; label: string }[]
        ).map((f) => (
          <button
            key={f.key}
            onClick={() => setFormat(f.key)}
            className={`px-4 py-3 text-sm tracking-wide transition-colors ${
              format === f.key
                ? "bg-foreground text-background"
                : "text-muted hover:text-foreground hover:bg-zinc-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Preview */}
      <div className="p-4 md:p-6 max-h-[400px] overflow-y-auto bg-zinc-50">
        <pre className="!bg-transparent !p-0 text-sm whitespace-pre-wrap text-foreground">
          <code className="text-zinc-800">{getContent()}</code>
        </pre>
      </div>

      {/* Actions */}
      <div className="flex border-t border-border">
        <button
          onClick={handleCopy}
          className="flex-1 px-4 py-3 text-sm tracking-wide hover:bg-zinc-50 transition-colors border-r border-border"
        >
          {copied ? "已复制到剪贴板" : "复制到剪贴板"}
        </button>
        <button
          onClick={handleDownload}
          className="flex-1 px-4 py-3 text-sm tracking-wide hover:bg-zinc-50 transition-colors"
        >
          下载文件
        </button>
      </div>
    </div>
  );
}
