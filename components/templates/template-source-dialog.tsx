"use client";

import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { Code2, Copy, Download, Loader2, RotateCw, X } from "lucide-react";
import { useClipboard } from "@/lib/hooks/use-clipboard";
import {
  parseTemplateSourceProject,
  type TemplateSourceProject,
} from "@/lib/templates/source";
import { useI18n } from "@/lib/i18n/context";

type TemplateSourceDialogProps = {
  slug: string;
  name: string;
  onClose: () => void;
};

type SourceState = "loading" | "error" | "ready";

export function TemplateSourceDialog({ slug, name, onClose }: TemplateSourceDialogProps) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const requestIdRef = useRef(0);
  const titleId = useId();
  const descriptionId = useId();
  const fileListId = useId();
  const [project, setProject] = useState<TemplateSourceProject | null>(null);
  const [sourceState, setSourceState] = useState<SourceState>("loading");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [mobileFilesOpen, setMobileFilesOpen] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const { copy, isCopied, result: clipboardResult } = useClipboard();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    // React Strict Mode replays effects: a cleanup close event can arrive
    // after the same dialog has been shown again. Ignore that stale event.
    const handleNativeClose = () => {
      if (!dialog.open) onClose();
    };
    dialog.addEventListener("close", handleNativeClose);
    if (!dialog.open) dialog.showModal();

    return () => {
      dialog.removeEventListener("close", handleNativeClose);
      if (dialog.open) dialog.close();
    };
  }, [onClose]);

  useEffect(() => {
    const controller = new AbortController();
    const requestId = ++requestIdRef.current;

    const loadProject = async () => {
      try {
        const response = await fetch(
          "/api/templates/" + encodeURIComponent(slug) + "/source?view=project",
          { signal: controller.signal },
        );
        if (!response.ok) throw new Error("Template source request failed");

        const parsed = parseTemplateSourceProject(await response.json());
        if (!parsed || parsed.slug !== slug) {
          throw new Error("Template source response is invalid");
        }
        if (controller.signal.aborted || requestIdRef.current !== requestId) return;

        setProject(parsed);
        setSelectedPath(parsed.entryPath);
        setSourceState("ready");
      } catch {
        if (controller.signal.aborted || requestIdRef.current !== requestId) return;
        setSourceState("error");
      }
    };

    void loadProject();

    return () => {
      controller.abort();
      if (requestIdRef.current === requestId) requestIdRef.current += 1;
    };
  }, [retryCount, slug]);

  const selectedSource = project && selectedPath
    ? project.files[selectedPath] ?? null
    : null;
  const copyId = selectedPath ? slug + ":" + selectedPath : "";
  const copyResult =
    clipboardResult?.id === copyId && clipboardResult.text === selectedSource
      ? clipboardResult
      : null;
  const copied = isCopied(copyId, selectedSource ?? undefined);

  const handleCopy = useCallback(() => {
    if (selectedSource === null || !selectedPath) return;
    void copy(selectedSource, slug + ":" + selectedPath);
  }, [copy, selectedPath, selectedSource, slug]);

  const handleRetry = () => {
    setProject(null);
    setSelectedPath(null);
    setSourceState("loading");
    setRetryCount((count) => count + 1);
  };

  const closeDialog = () => dialogRef.current?.close();

  const renderFileButtons = () => {
    if (!project) return null;

    const paths = Object.keys(project.files).sort((left, right) => {
      if (left === project.entryPath) return -1;
      if (right === project.entryPath) return 1;
      return left.localeCompare(right);
    });

    return paths.map((path) => {
      const isSelected = path === selectedPath;

      return (
        <button
          key={path}
          type="button"
          aria-pressed={isSelected}
          onClick={() => setSelectedPath(path)}
          className={
            "flex w-full min-w-0 items-start gap-2 border-l-2 px-3 py-2 text-left text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent " +
            (isSelected
              ? "border-foreground bg-foreground/[0.06] text-foreground"
              : "border-transparent text-muted hover:bg-foreground/[0.04] hover:text-foreground")
          }
        >
          <Code2 className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span className="min-w-0 break-all font-mono">{path}</span>
        </button>
      );
    });
  };

  const renderAssets = () => {
    if (!project || project.binaryFiles.length === 0) return null;

    return (
      <section className="border-t border-border px-3 py-3" aria-label={t("templates.sourceAssets")}>
        <h3 className="mb-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          {t("templates.sourceAssets")} <span>({project.binaryFiles.length})</span>
        </h3>
        <p className="mb-2 text-xs leading-relaxed text-muted">
          {t("templates.sourceAssetHint")}
        </p>
        <ul className="space-y-1">
          {project.binaryFiles.map((path) => (
            <li key={path} className="break-all font-mono text-[11px] text-muted">
              {path}
            </li>
          ))}
        </ul>
      </section>
    );
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={(event) => {
        if (event.target === event.currentTarget) event.currentTarget.close();
      }}
      className="fixed inset-0 z-[10000] m-0 h-dvh w-screen max-h-none max-w-none border-0 bg-transparent p-2 backdrop:bg-black/60 md:p-8"
    >
      <div className="mx-auto flex h-full max-h-[calc(100dvh-1rem)] w-full max-w-6xl flex-col overflow-hidden border border-border bg-background text-foreground shadow-2xl md:max-h-[calc(100dvh-4rem)]">
        <header className="flex shrink-0 flex-col gap-3 border-b border-border px-3 py-3 sm:flex-row sm:items-start sm:justify-between sm:px-5">
          <div className="min-w-0">
            <h2 id={titleId} className="break-words text-base font-medium tracking-tight sm:text-lg">
              {t("templates.sourceTitle")}: {name}
            </h2>
            <p id={descriptionId} className="mt-1 max-w-2xl text-xs leading-relaxed text-muted sm:text-sm">
              {t("templates.sourceDescription")}
            </p>
          </div>
          <div className="flex shrink-0 items-center justify-between gap-2 sm:justify-end">
            <a
              href={"/api/templates/" + encodeURIComponent(slug) + "/download"}
              download
              className="inline-flex min-h-9 items-center gap-2 border border-foreground px-3 py-2 text-xs font-medium text-foreground transition-colors hover:bg-foreground hover:text-background focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <Download className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              {t("templates.download")}
            </a>
            <button
              type="button"
              autoFocus
              aria-label={t("templates.closeSource")}
              onClick={closeDialog}
              className="inline-flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          {sourceState === "ready" && project ? (
            <>
              <aside className="hidden min-h-0 w-64 shrink-0 flex-col border-r border-border md:flex">
                <div className="shrink-0 border-b border-border px-4 py-3">
                  <h3 className="text-xs font-medium uppercase tracking-[0.14em] text-muted">
                    {t("templates.sourceFiles")} <span>({Object.keys(project.files).length})</span>
                  </h3>
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
                  <nav aria-label={t("templates.sourceFiles")} className="py-2">
                    {renderFileButtons()}
                  </nav>
                  {renderAssets()}
                </div>
              </aside>

              <div className="flex min-h-0 min-w-0 flex-1 flex-col">
                <div className="shrink-0 border-b border-border md:hidden">
                  <div className="flex items-center justify-between gap-2 px-3 py-2">
                    <button
                      type="button"
                      aria-expanded={mobileFilesOpen}
                      aria-controls={fileListId}
                      onClick={() => setMobileFilesOpen((open) => !open)}
                      className="min-h-9 flex-1 border border-border px-3 py-2 text-left text-xs text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      {mobileFilesOpen ? t("templates.hideFiles") : t("templates.showFiles")}
                      <span className="ml-2 text-muted">({Object.keys(project.files).length})</span>
                    </button>
                  </div>
                  <div
                    id={fileListId}
                    hidden={!mobileFilesOpen}
                    className="max-h-48 overflow-y-auto overscroll-contain border-t border-border py-2"
                  >
                    <nav aria-label={t("templates.sourceFiles")}>{renderFileButtons()}</nav>
                    {renderAssets()}
                  </div>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border px-3 py-2 sm:px-4">
                  <p className="min-w-0 break-all font-mono text-xs text-muted">
                    <span className="sr-only">{t("templates.sourceFiles")}: </span>
                    {selectedPath}
                  </p>
                  <button
                    type="button"
                    onClick={handleCopy}
                    disabled={selectedSource === null}
                    className="inline-flex min-h-9 shrink-0 items-center gap-2 border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
                    {copied ? t("templates.copied") : t("templates.copyFile")}
                  </button>
                </div>

                {copyResult?.state === "failed" && selectedSource !== null && (
                  <div className="shrink-0 border-b border-amber-500/40 bg-amber-500/[0.06] px-3 py-2 sm:px-4" role="status" aria-live="polite">
                    <p className="mb-2 text-xs text-foreground">{t("templates.copyFailed")}</p>
                    <textarea
                      readOnly
                      rows={3}
                      value={selectedSource}
                      onFocus={(event) => event.currentTarget.select()}
                      aria-label={t("templates.copyFile")}
                      className="block max-h-36 min-h-16 w-full resize-y select-text border border-border bg-background px-2 py-2 font-mono text-xs leading-relaxed text-foreground focus-visible:outline-2 focus-visible:outline-accent"
                    />
                  </div>
                )}
                {copyResult?.state === "copied" && (
                  <p className="sr-only" role="status" aria-live="polite">
                    {t("templates.copied")}
                  </p>
                )}

                <div className="min-h-0 flex-1 overflow-auto overscroll-contain bg-zinc-950 text-zinc-100">
                  <pre className="min-h-full min-w-max p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-sm">
                    <code>{selectedSource ?? ""}</code>
                  </pre>
                </div>
              </div>
            </>
          ) : sourceState === "loading" ? (
            <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-16 text-sm text-muted" role="status" aria-live="polite">
              <Loader2 className="mr-2 h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" />
              {t("templates.loadingSource")}
            </div>
          ) : (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-4 px-5 py-16 text-center">
              <p className="text-sm text-muted" role="status" aria-live="polite">{t("templates.sourceNotFound")}</p>
              <button
                type="button"
                onClick={handleRetry}
                className="inline-flex min-h-9 items-center gap-2 border border-border px-3 py-2 text-xs font-medium transition-colors hover:border-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                {t("templates.retrySource")}
              </button>
            </div>
          )}
        </div>
      </div>
    </dialog>
  );
}
