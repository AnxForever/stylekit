"use client";

import { useState } from "react";
import { Check, Copy, Download, ExternalLink, Send, AlertCircle } from "lucide-react";
import type { StyleCategory, StyleType, StyleTag } from "@/lib/styles/meta";
import { generateStyleScaffoldFiles, type StyleScaffoldInput } from "@/lib/scaffold/style-scaffold";

interface SubmitStepProps {
  formData: {
    name: string;
    nameEn: string;
    slug: string;
    description: string;
    category: StyleCategory;
    styleType: StyleType;
    tags: StyleTag[];
    primaryColor: string;
    secondaryColor: string;
    accentColors: string[];
    background: string;
    foreground: string;
    muted: string;
    keywords: string[];
    philosophy: string;
    doList: string[];
    dontList: string[];
    aiRules: string[];
    buttonCode: string;
    cardCode: string;
    inputCode: string;
    headingFont: string;
    bodyFont: string;
    fontSizeBase: string;
    fontSizeHeading: string;
    fontSizeSmall: string;
    fontWeightNormal: string;
    fontWeightBold: string;
    lineHeightNormal: string;
    lineHeightTight: string;
    borderRadius: string;
    spacingSm: string;
    spacingMd: string;
    spacingLg: string;
  };
  isAnimating: boolean;
  text: {
    downloadScaffold: string;
    downloadScaffoldLoading: string;
    copyJson: string;
    copied: string;
    submissionGuide: string;
    submissionGuideDesc: string;
    submissionSteps: readonly string[];
    submitOnGithub: string;
    step: string;
  };
}

export function SubmitStep({ formData, isAnimating, text }: SubmitStepProps) {
  const [copied, setCopied] = useState(false);
  const [copiedFile, setCopiedFile] = useState<string | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    id?: string;
    error?: string;
  } | null>(null);

  const submitToCommunity = async () => {
    setIsSubmitting(true);
    setSubmitResult(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitResult({ success: false, error: json.error ?? `HTTP ${res.status}` });
        return;
      }
      setSubmitResult({ success: true, id: json.id });
    } catch (err) {
      setSubmitResult({ success: false, error: (err as Error).message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scaffoldInput: StyleScaffoldInput = {
    name: formData.name,
    nameEn: formData.nameEn,
    slug: formData.slug,
    description: formData.description,
    category: formData.category,
    styleType: formData.styleType,
    tags: formData.tags,
    primaryColor: formData.primaryColor,
    secondaryColor: formData.secondaryColor,
    accentColors: formData.accentColors,
    keywords: formData.keywords,
    philosophy: formData.philosophy,
    doList: formData.doList.filter((i) => i.trim()),
    dontList: formData.dontList.filter((i) => i.trim()),
    buttonCode: formData.buttonCode,
    cardCode: formData.cardCode,
    inputCode: formData.inputCode,
  };

  const generateJson = () => {
    const output = {
      slug: formData.slug,
      name: formData.name,
      nameEn: formData.nameEn,
      description: formData.description,
      cover: `/styles/${formData.slug}.svg`,
      styleType: formData.styleType,
      tags: formData.tags,
      category: formData.category,
      colors: {
        primary: formData.primaryColor,
        secondary: formData.secondaryColor,
        accent: formData.accentColors,
      },
      extended: {
        background: formData.background,
        foreground: formData.foreground,
        muted: formData.muted,
      },
      typography: {
        headingFont: formData.headingFont,
        bodyFont: formData.bodyFont,
        fontSizeHeading: formData.fontSizeHeading,
        fontSizeBase: formData.fontSizeBase,
        fontSizeSmall: formData.fontSizeSmall,
        fontWeightNormal: formData.fontWeightNormal,
        fontWeightBold: formData.fontWeightBold,
        lineHeightNormal: formData.lineHeightNormal,
        lineHeightTight: formData.lineHeightTight,
      },
      spacing: {
        borderRadius: formData.borderRadius,
        sm: formData.spacingSm,
        md: formData.spacingMd,
        lg: formData.spacingLg,
      },
      keywords: formData.keywords,
      philosophy: formData.philosophy,
      doList: formData.doList.filter((i) => i.trim()),
      dontList: formData.dontList.filter((i) => i.trim()),
      aiRules: formData.aiRules.filter((i) => i.trim()),
      components: {
        button: { name: "Button", description: "Button component", code: formData.buttonCode },
        card: { name: "Card", description: "Card component", code: formData.cardCode },
        input: { name: "Input", description: "Input component", code: formData.inputCode },
      },
      globalCss: "",
    };
    return JSON.stringify(output, null, 2);
  };

  const copyJson = async () => {
    try {
      await navigator.clipboard.writeText(generateJson());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // silent
    }
  };

  const copyFileContent = async (content: string, fileName: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFile(fileName);
      setTimeout(() => setCopiedFile(null), 2000);
    } catch {
      // silent
    }
  };

  const downloadScaffold = async () => {
    setIsDownloading(true);
    try {
      const files = generateStyleScaffoldFiles(scaffoldInput);
      const { downloadZip } = await import("@/lib/generator/zip-builder");
      await downloadZip(files, `${formData.slug}-scaffold`);
    } catch {
      // silent
    } finally {
      setIsDownloading(false);
    }
  };

  let scaffoldFiles: ReturnType<typeof generateStyleScaffoldFiles> = [];
  try {
    scaffoldFiles = generateStyleScaffoldFiles(scaffoldInput);
  } catch {
    // slug may be empty
  }

  return (
    <div className={`space-y-6 transition-opacity duration-150 ${isAnimating ? "opacity-0" : "opacity-100"}`}>
      {/* Success Header */}
      <div className="p-6 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-center">
        <Check className="w-10 h-10 mx-auto mb-3 text-green-600 dark:text-green-400" />
        <h3 className="text-xl font-semibold mb-1">Style Definition Complete</h3>
        <p className="text-sm text-muted">Choose how to submit your style below.</p>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={downloadScaffold}
          disabled={isDownloading || !formData.slug.trim()}
          className="flex items-center justify-center gap-3 p-6 border-2 border-foreground bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Download className="w-5 h-5" />
          <div className="text-left">
            <p className="font-medium">{isDownloading ? text.downloadScaffoldLoading : text.downloadScaffold}</p>
            <p className="text-xs opacity-70">ZIP with style, tokens, cover SVG</p>
          </div>
        </button>

        <button
          type="button"
          onClick={copyJson}
          className="flex items-center justify-center gap-3 p-6 border-2 border-border hover:border-foreground transition-colors"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          <div className="text-left">
            <p className="font-medium">{copied ? text.copied : text.copyJson}</p>
            <p className="text-xs text-muted">Full JSON definition</p>
          </div>
        </button>
      </div>

      {/* Submit to Community */}
      <div className="border-2 border-dashed border-border p-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <Send className="w-6 h-6" />
          <div>
            <p className="font-medium mb-1">Submit to Community</p>
            <p className="text-sm text-muted">Save your style for review and inclusion in the gallery.</p>
          </div>
          <button
            type="button"
            onClick={submitToCommunity}
            disabled={isSubmitting || !formData.slug.trim() || submitResult?.success === true}
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
            {isSubmitting ? "Submitting..." : submitResult?.success ? "Submitted" : "Submit Style"}
          </button>
          {submitResult?.success && (
            <div className="w-full p-3 border border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/30 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                <span>Submission saved. ID: <code className="font-mono text-xs">{submitResult.id}</code></span>
              </div>
            </div>
          )}
          {submitResult && !submitResult.success && (
            <div className="w-full p-3 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-sm">
              <div className="flex items-center gap-2 justify-center">
                <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                <span>Submission failed: {submitResult.error}</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Generated Files */}
      {scaffoldFiles.length > 0 && (
        <div className="border border-border">
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
            <p className="text-sm font-medium">Generated Files</p>
          </div>
          <div className="divide-y divide-border">
            {scaffoldFiles.map((file) => (
              <div key={file.name} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <code className="text-sm font-mono">{file.name}</code>
                  <button
                    type="button"
                    onClick={() => copyFileContent(file.content, file.name)}
                    className="inline-flex items-center gap-1 px-2 py-1 text-xs border border-border hover:border-foreground transition-colors"
                  >
                    {copiedFile === file.name ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copiedFile === file.name ? "Copied" : "Copy"}
                  </button>
                </div>
                <pre className="text-xs font-mono bg-zinc-50 dark:bg-zinc-900 p-3 border border-border overflow-x-auto max-h-48">
                  {file.content.slice(0, 800)}{file.content.length > 800 ? "\n..." : ""}
                </pre>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Submission Guide */}
      <div className="border border-border">
        <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-border">
          <p className="text-sm font-medium">{text.submissionGuide}</p>
          <p className="text-xs text-muted mt-1">{text.submissionGuideDesc}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {text.submissionSteps.map((stepText, idx) => (
            <div key={idx} className="p-3 border border-border">
              <div className="text-xs text-muted mb-1">{text.step} {idx + 1}</div>
              <p className="text-sm">{stepText}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border">
          <a
            href="https://github.com/AnxForever/stylekit/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background hover:bg-foreground/90 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            {text.submitOnGithub}
          </a>
        </div>
      </div>
    </div>
  );
}
