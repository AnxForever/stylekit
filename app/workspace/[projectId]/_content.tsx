"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StylePicker, NO_STYLE, type PickerStyle } from "@/components/workspace/style-picker";
import { StyleAdvisor } from "@/components/bailian/style-advisor";
import {
  beginWorkspaceWrite,
  createWorkspaceWriteGate,
  finishWorkspaceWrite,
  ownsWorkspaceWrite,
  readWorkspaceResponse,
  WorkspaceRequestError,
  workspaceTransportError,
  type WorkspaceWriteKind,
  type WorkspaceWriteToken,
} from "@/lib/workspace/client-operations";

type StyleOption = PickerStyle;
type Project = {
  id: string; name: string; description: string; project_type: string; stack: string[];
  brief: { audience?: string; primaryGoal?: string; requiredPages?: string[]; requiredStates?: string[]; brandPersonality?: string[]; antiReferences?: string[]; notes?: string };
  selected_style_slug: string | null; status: "active" | "archived"; current_revision_number: number; updated_at: string;
};
type Revision = { id: string; revision_number: number; source: string; change_summary: string | null; created_at: string; content_sha256: string };
type ExportRow = { id: string; revision_number: number; artifact_sha256: string; file_count: number; status: string; verification: { filename?: string; target?: string }; created_at: string };

const stackOptions = [["nextjs","Next.js"],["react","React"],["typescript","TypeScript"],["tailwind","Tailwind CSS"],["shadcn","shadcn/ui"],["css-modules","CSS Modules"]] as const;
const requiredStates = [["loading","加载"],["empty","空状态"],["error","错误"],["success","成功"],["disabled","禁用"]] as const;

type LoadOptions = {
  showLoading?: boolean;
  applyServerDraft?: boolean;
  draftVersionAtStart?: number;
  preserveError?: boolean;
};

export function WorkspaceProjectEditor({ projectId, styles, supportedStyles }: { projectId: string; styles: StyleOption[]; supportedStyles: string[] }) {
  const [project, setProject] = useState<Project | null>(null);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [exports, setExports] = useState<ExportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeWrites, setActiveWrites] = useState<Map<string, WorkspaceWriteToken>>(() => new Map());
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedStyleSlug, setSelectedStyleSlug] = useState<string | null>(null);
  const [draftDirty, setDraftDirty] = useState(false);
  const [remoteConflict, setRemoteConflict] = useState(false);
  const [reconciliationRequired, setReconciliationRequired] = useState(false);
  const [formResetVersion, setFormResetVersion] = useState(0);
  // Mirrors the uncontrolled projectType select once the user changes it, so
  // the style picker recommends by the type currently chosen in the form.
  const [projectTypeHint, setProjectTypeHint] = useState<string | null>(null);
  const mountedRef = useRef(false);
  const projectIdRef = useRef(projectId);
  const loadRequestIdRef = useRef(0);
  const loadControllerRef = useRef<AbortController | null>(null);
  const initializedProjectIdRef = useRef<string | null>(null);
  const draftVersionRef = useRef(0);
  const draftDirtyRef = useRef(false);
  const draftBaseRevisionRef = useRef<number | null>(null);
  const remoteConflictRef = useRef(false);
  const reconciliationRequiredRef = useRef(false);
  const writeGateRef = useRef(createWorkspaceWriteGate());

  const load = useCallback(async (options: LoadOptions = {}) => {
    loadControllerRef.current?.abort();
    const controller = new AbortController();
    loadControllerRef.current = controller;
    const requestId = ++loadRequestIdRef.current;
    const requestedProjectId = projectId;
    const isCurrent = () =>
      mountedRef.current &&
      !controller.signal.aborted &&
      loadRequestIdRef.current === requestId &&
      projectIdRef.current === requestedProjectId;

    if (options.showLoading !== false) setLoading(true);
    if (!options.preserveError) setError(null);
    try {
      const [projectResponse, revisionsResponse, exportsResponse] = await Promise.all([
        fetch("/api/workspace/projects/" + requestedProjectId, { cache: "no-store", signal: controller.signal }),
        fetch("/api/workspace/projects/" + requestedProjectId + "/revisions", { cache: "no-store", signal: controller.signal }),
        fetch("/api/workspace/projects/" + requestedProjectId + "/exports", { cache: "no-store", signal: controller.signal }),
      ]);
      const [projectPayload, revisionsPayload, exportsPayload] = await Promise.all([
        readWorkspaceResponse<{ project?: unknown }>(projectResponse, "项目读取失败"),
        readWorkspaceResponse<{ revisions?: unknown }>(revisionsResponse, "版本读取失败"),
        readWorkspaceResponse<{ exports?: unknown }>(exportsResponse, "导出记录读取失败"),
      ]);
      if (!isCurrent()) return false;
      const nextProject = projectPayload.project as Project | undefined;
      if (!nextProject || nextProject.id !== requestedProjectId || !Number.isInteger(nextProject.current_revision_number)) {
        throw new WorkspaceRequestError("项目响应与当前地址不匹配，请重新读取。", {
          outcome: "rejected",
          code: "PROJECT_SCOPE_MISMATCH",
        });
      }
      if (!Array.isArray(revisionsPayload.revisions) || !Array.isArray(exportsPayload.exports)) {
        throw new WorkspaceRequestError("项目历史响应格式无效，请重新读取。", {
          outcome: "rejected",
          code: "INVALID_HISTORY_RESPONSE",
        });
      }

      const isFirstReadForProject = initializedProjectIdRef.current !== requestedProjectId;
      const mayApplyServerDraft = isFirstReadForProject || (
        options.applyServerDraft === true &&
        options.draftVersionAtStart === draftVersionRef.current
      );
      setProject(nextProject);
      setRevisions(revisionsPayload.revisions as Revision[]);
      setExports(exportsPayload.exports as ExportRow[]);
      if (mayApplyServerDraft) {
        if (isFirstReadForProject) draftVersionRef.current = 0;
        setSelectedStyleSlug(nextProject.selected_style_slug ?? null);
        setProjectTypeHint(null);
        draftBaseRevisionRef.current = nextProject.current_revision_number;
        draftDirtyRef.current = false;
        setDraftDirty(false);
        remoteConflictRef.current = false;
        setRemoteConflict(false);
        reconciliationRequiredRef.current = false;
        setReconciliationRequired(false);
        if (!isFirstReadForProject) setFormResetVersion((value) => value + 1);
        initializedProjectIdRef.current = requestedProjectId;
      } else if (
        draftDirtyRef.current &&
        draftBaseRevisionRef.current !== null &&
        nextProject.current_revision_number > draftBaseRevisionRef.current
      ) {
        remoteConflictRef.current = true;
        setRemoteConflict(true);
      }
      return true;
    } catch (loadError) {
      if (!isCurrent()) return false;
      setError(workspaceTransportError(loadError, "项目状态读取失败").message);
      return false;
    } finally {
      if (isCurrent()) {
        if (loadControllerRef.current === controller) loadControllerRef.current = null;
        if (options.showLoading !== false) setLoading(false);
      }
    }
  }, [projectId]);

  useEffect(() => {
    mountedRef.current = true;
    projectIdRef.current = projectId;
    setLoading(true);
    setMessage(null);
    setError(null);
    void load({ applyServerDraft: true, draftVersionAtStart: draftVersionRef.current });
    return () => {
      mountedRef.current = false;
      loadRequestIdRef.current += 1;
      loadControllerRef.current?.abort();
    };
  }, [load, projectId]);

  function markDraftChanged() {
    draftVersionRef.current += 1;
    draftDirtyRef.current = true;
    setDraftDirty(true);
  }

  function beginWrite(kind: WorkspaceWriteKind) {
    if (reconciliationRequiredRef.current || remoteConflictRef.current) return null;
    const token = beginWorkspaceWrite(writeGateRef.current, projectId, kind);
    if (!token) {
      const active = writeGateRef.current.active.get(projectId);
      if (active) setActiveWrites((current) => new Map(current).set(projectId, active));
      return null;
    }
    setActiveWrites((current) => new Map(current).set(projectId, token));
    setMessage(null);
    setError(null);
    return token;
  }

  function ownsWrite(token: WorkspaceWriteToken) {
    return ownsWorkspaceWrite(writeGateRef.current, token, projectIdRef.current);
  }

  function finishWrite(token: WorkspaceWriteToken) {
    if (finishWorkspaceWrite(writeGateRef.current, token)) {
      setActiveWrites((current) => {
        if (current.get(token.projectId)?.id !== token.id) return current;
        const next = new Map(current);
        next.delete(token.projectId);
        return next;
      });
    }
  }

  function markReconciliationRequired() {
    reconciliationRequiredRef.current = true;
    setReconciliationRequired(true);
  }

  async function refreshAndResolve() {
    const refreshed = await load({ showLoading: false, preserveError: true });
    if (!refreshed || projectIdRef.current !== projectId) return;
    reconciliationRequiredRef.current = false;
    setReconciliationRequired(false);
    setError(null);
    setMessage("项目状态已刷新。请查看版本历史或导出记录，再决定下一步操作。");
  }

  async function loadServerVersion() {
    if (draftDirtyRef.current && !window.confirm("载入服务器最新版本会替换当前未保存的表单内容。是否继续？")) return;
    const versionAtStart = draftVersionRef.current;
    await load({ applyServerDraft: true, draftVersionAtStart: versionAtStart });
  }

  function reportWriteFailure(writeError: unknown, fallback: string) {
    const failure = workspaceTransportError(writeError, fallback, true);
    setError(failure.message);
    if (failure.outcome === "unknown") markReconciliationRequired();
    if (failure.code === "PROJECT_REVISION_CONFLICT") {
      remoteConflictRef.current = true;
      setRemoteConflict(true);
      void load({ showLoading: false, preserveError: true });
    }
  }

  const readiness = useMemo(() => {
    if (!project || project.id !== projectId) return [];
    return [
      ["目标与受众", Boolean(project.brief?.audience && project.brief?.primaryGoal)],
      ["技术栈", project.stack.length > 0],
      ["页面清单", (project.brief?.requiredPages?.length ?? 0) > 0],
      ["必要状态", (project.brief?.requiredStates?.length ?? 0) >= 4],
      ["风格方向", Boolean(selectedStyleSlug)],
    ] as const;
  }, [project, projectId, selectedStyleSlug]);

  const canGenerate = Boolean(
    project?.id === projectId && project?.project_type === "dashboard" &&
    selectedStyleSlug &&
    supportedStyles.includes(selectedStyleSlug),
  );

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const currentProject = project?.id === projectId ? project : null;
    if (!currentProject) return;
    const form = new FormData(event.currentTarget);
    const draftVersionAtStart = draftVersionRef.current;
    const snapshot = {
      name: form.get("name"),
      description: form.get("description"),
      projectType: form.get("projectType"),
      stack: stackOptions.filter(([value]) => form.get("stack:" + value) === "on").map(([value]) => value),
      selectedStyleSlug: form.get("selectedStyleSlug") === NO_STYLE ? null : form.get("selectedStyleSlug") || null,
      status: currentProject.status,
      brief: {
        audience: form.get("audience"),
        primaryGoal: form.get("primaryGoal"),
        requiredPages: split(form.get("requiredPages")),
        requiredStates: requiredStates.filter(([value]) => form.get("state:" + value) === "on").map(([value]) => value),
        brandPersonality: split(form.get("brandPersonality")),
        antiReferences: split(form.get("antiReferences")),
        notes: form.get("notes"),
      },
    };
    const token = beginWrite("save");
    if (!token) return;

    try {
      const response = await fetch("/api/workspace/projects/" + token.projectId + "/revisions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          expectedRevisionNumber: currentProject.current_revision_number,
          snapshot,
          source: "manual_save",
          changeSummary: form.get("changeSummary") || null,
        }),
      });
      const payload = await readWorkspaceResponse<{ revision?: { revisionNumber?: unknown } }>(response, "版本保存失败", true);
      const revisionNumber = payload.revision?.revisionNumber;
      if (!Number.isInteger(revisionNumber) || (revisionNumber as number) <= currentProject.current_revision_number) {
        throw new WorkspaceRequestError("保存结果不完整。请刷新版本历史确认结果。", {
          outcome: "unknown",
          status: response.status,
          code: "INVALID_REVISION_RESULT",
        });
      }
      if (!ownsWrite(token)) return;

      const savedRevisionNumber = revisionNumber as number;
      const draftUnchanged = draftVersionRef.current === draftVersionAtStart;
      draftBaseRevisionRef.current = savedRevisionNumber;
      draftDirtyRef.current = !draftUnchanged;
      setDraftDirty(!draftUnchanged);
      setProject((current) => current?.id === token.projectId
        ? { ...current, current_revision_number: savedRevisionNumber }
        : current);
      setMessage("版本 v" + savedRevisionNumber + " 已保存");
      await load({
        showLoading: false,
        applyServerDraft: draftUnchanged,
        draftVersionAtStart,
        preserveError: true,
      });
    } catch (writeError) {
      if (ownsWrite(token)) reportWriteFailure(writeError, "版本保存失败");
    } finally {
      finishWrite(token);
    }
  }

  async function generate() {
    const currentProject = project?.id === projectId ? project : null;
    if (!currentProject) return;
    const token = beginWrite("generate");
    if (!token) return;

    try {
      const response = await fetch("/api/workspace/projects/" + token.projectId + "/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ expectedRevisionNumber: currentProject.current_revision_number, target: "nextjs" }),
      });
      const payload = await readWorkspaceResponse<{
        revision?: { revisionNumber?: unknown };
        generation?: { fileCount?: unknown };
      }>(response, "生成失败", true);
      const revisionNumber = payload.revision?.revisionNumber;
      const fileCount = payload.generation?.fileCount;
      if (!Number.isInteger(revisionNumber) || (revisionNumber as number) <= currentProject.current_revision_number || !Number.isInteger(fileCount)) {
        throw new WorkspaceRequestError("生成结果不完整。请刷新版本历史确认结果。", {
          outcome: "unknown",
          status: response.status,
          code: "INVALID_GENERATION_RESULT",
        });
      }
      if (!ownsWrite(token)) return;

      const generatedRevision = revisionNumber as number;
      if (!draftDirtyRef.current) draftBaseRevisionRef.current = generatedRevision;
      setProject((current) => current?.id === token.projectId
        ? { ...current, current_revision_number: generatedRevision }
        : current);
      setMessage("已生成 v" + generatedRevision + "：" + fileCount + " 个 Next.js 文件");
      await load({ showLoading: false, preserveError: true });
    } catch (writeError) {
      if (ownsWrite(token)) reportWriteFailure(writeError, "生成失败");
    } finally {
      finishWrite(token);
    }
  }

  async function restore(revisionNumber: number) {
    const currentProject = project?.id === projectId ? project : null;
    const warning = draftDirtyRef.current ? "当前未保存的表单内容会被替换。" : "";
    if (!currentProject || !window.confirm("确认从 v" + revisionNumber + " 恢复？历史不会被覆盖，系统会创建一个新的最新版本。" + warning)) return;
    const draftVersionAtStart = draftVersionRef.current;
    const token = beginWrite("restore");
    if (!token) return;

    try {
      const response = await fetch("/api/workspace/projects/" + token.projectId + "/restore", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revisionNumber, expectedRevisionNumber: currentProject.current_revision_number }),
      });
      const payload = await readWorkspaceResponse<{ revision?: { revisionNumber?: unknown } }>(response, "恢复失败", true);
      const restoredRevision = payload.revision?.revisionNumber;
      if (!Number.isInteger(restoredRevision) || (restoredRevision as number) <= currentProject.current_revision_number) {
        throw new WorkspaceRequestError("恢复结果不完整。请刷新版本历史确认结果。", {
          outcome: "unknown",
          status: response.status,
          code: "INVALID_RESTORE_RESULT",
        });
      }
      if (!ownsWrite(token)) return;

      const newRevisionNumber = restoredRevision as number;
      const draftUnchanged = draftVersionRef.current === draftVersionAtStart;
      draftBaseRevisionRef.current = newRevisionNumber;
      draftDirtyRef.current = !draftUnchanged;
      setDraftDirty(!draftUnchanged);
      setProject((current) => current?.id === token.projectId
        ? { ...current, current_revision_number: newRevisionNumber }
        : current);
      setMessage("已从 v" + revisionNumber + " 创建恢复版本 v" + newRevisionNumber);
      await load({
        showLoading: false,
        applyServerDraft: draftUnchanged,
        draftVersionAtStart,
        preserveError: true,
      });
    } catch (writeError) {
      if (ownsWrite(token)) reportWriteFailure(writeError, "恢复失败");
    } finally {
      finishWrite(token);
    }
  }

  async function createExport(revisionNumber: number) {
    if (project?.id !== projectId) return;
    const token = beginWrite("export");
    if (!token) return;

    try {
      const response = await fetch("/api/workspace/projects/" + token.projectId + "/exports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ revisionNumber }),
      });
      const payload = await readWorkspaceResponse<{
        export?: { artifact_sha256?: unknown };
        downloadUrl?: unknown;
      }>(response, "导出失败", true);
      if (
        typeof payload.export?.artifact_sha256 !== "string" ||
        typeof payload.downloadUrl !== "string" ||
        !payload.downloadUrl.startsWith("/api/workspace/exports/")
      ) {
        throw new WorkspaceRequestError("导出结果不完整。请刷新导出记录确认结果。", {
          outcome: "unknown",
          status: response.status,
          code: "INVALID_EXPORT_RESULT",
        });
      }
      if (!ownsWrite(token)) return;

      setMessage("ZIP 已生成并记录 SHA-256：" + payload.export.artifact_sha256);
      await load({ showLoading: false, preserveError: true });
      if (ownsWrite(token)) window.location.assign(payload.downloadUrl);
    } catch (writeError) {
      if (ownsWrite(token)) reportWriteFailure(writeError, "导出失败");
    } finally {
      finishWrite(token);
    }
  }

  const currentWrite = activeWrites.get(projectId) ?? null;
  const writeBusy = currentWrite !== null;
  if ((loading || !project || project.id !== projectId) && !error) return <main className="mx-auto max-w-6xl px-6 py-16"><p className="border border-border p-6 text-sm text-muted">正在读取项目…</p></main>;
  if (error && (!project || project.id !== projectId)) return <main className="mx-auto max-w-6xl px-6 py-16"><div role="alert" className="border border-red-300 bg-red-50 p-5 text-red-800"><p>{error}</p><button className="mt-3 underline" onClick={() => void load()}>重试</button></div></main>;
  if (!project || project.id !== projectId) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5"><div><Link href="/workspace" className="text-sm text-muted hover:text-foreground">← 项目工作区</Link><h1 className="mt-1 text-2xl font-semibold tracking-tight">{project.name}</h1></div><span className="text-xs text-muted">当前 v{project.current_revision_number}</span></div></header>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <section aria-label="交付准备轨" className="mb-8 grid gap-px border border-border bg-border sm:grid-cols-5">
          {readiness.map(([label, complete]) => <div key={label} className="bg-background p-4"><span className={`mr-2 inline-block h-2 w-2 rounded-full ${complete ? "bg-green-600" : "bg-amber-500"}`} /><span className="text-sm">{label}</span><p className="mt-1 text-xs text-muted">{complete ? "已具备" : "待补充"}</p></div>)}
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <form key={formResetVersion} onSubmit={save} onChange={markDraftChanged} className="grid gap-6 border border-border p-6">
            <div><h2 className="text-xl font-medium">项目规格</h2><p className="mt-1 text-sm text-muted">每次保存都会创建不可覆盖的新版本。{draftDirty ? "当前有未保存更改。" : ""}</p></div>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="项目名称"><input name="name" required defaultValue={project.name} className="workspace-input" /></Field><Field label="项目类型"><Select name="projectType" defaultValue={project.project_type} onValueChange={(value) => { setProjectTypeHint(value); markDraftChanged(); }}><SelectTrigger className="px-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dashboard">数据后台</SelectItem><SelectItem value="landing">落地页</SelectItem><SelectItem value="app">工具 App</SelectItem><SelectItem value="portfolio">作品集</SelectItem><SelectItem value="blog">博客</SelectItem><SelectItem value="other">其他</SelectItem></SelectContent></Select></Field></div>
            <Field label="项目说明"><textarea name="description" rows={2} defaultValue={project.description} className="workspace-input" /></Field>
            <Field label="目标用户"><input name="audience" defaultValue={project.brief?.audience ?? ""} className="workspace-input" /></Field>
            <Field label="主要目标"><textarea name="primaryGoal" rows={2} defaultValue={project.brief?.primaryGoal ?? ""} className="workspace-input" /></Field>
            <Field label="技术栈"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{stackOptions.map(([value,label]) => <label key={value} className="flex min-h-11 items-center gap-2 border border-border px-3 text-sm"><input type="checkbox" name={`stack:${value}`} defaultChecked={project.stack.includes(value)} />{label}</label>)}</div></Field>
            <Field label="页面清单"><input name="requiredPages" defaultValue={project.brief?.requiredPages?.join("，") ?? ""} className="workspace-input" /></Field>
            <Field label="必要状态"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{requiredStates.map(([value,label]) => <label key={value} className="flex min-h-11 items-center gap-2 border border-border px-3 text-sm"><input type="checkbox" name={`state:${value}`} defaultChecked={project.brief?.requiredStates?.includes(value)} />{label}</label>)}</div></Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="品牌调性"><input name="brandPersonality" defaultValue={project.brief?.brandPersonality?.join("，") ?? ""} className="workspace-input" /></Field><Field label="绝对不要"><input name="antiReferences" defaultValue={project.brief?.antiReferences?.join("，") ?? ""} className="workspace-input" /></Field></div>
            <Field label="风格方向"><StylePicker styles={styles} value={selectedStyleSlug} onValueChange={(value) => { setSelectedStyleSlug(value); markDraftChanged(); }} defaultValue={project.selected_style_slug} noneLabel="尚未选择" projectType={projectTypeHint ?? project.project_type} supportedSlugs={supportedStyles} /></Field>
            <Field label="其他约束"><textarea name="notes" rows={3} defaultValue={project.brief?.notes ?? ""} className="workspace-input" /></Field>
            <Field label="本次修改说明（可选）"><input name="changeSummary" maxLength={240} className="workspace-input" placeholder="例如：补充移动端状态和账户页面" /></Field>
            <div className="flex items-center gap-4"><button disabled={writeBusy || remoteConflict || reconciliationRequired || project.status === "archived"} className="h-11 bg-foreground px-5 text-sm font-medium text-background disabled:opacity-50">{currentWrite?.kind === "save" ? "正在保存…" : "保存新版本"}</button><span aria-live="polite" className="text-sm text-muted">{message}</span></div>
            {remoteConflict ? <div role="status" aria-live="polite" className="border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"><p>服务器版本已变化，当前草稿仍保留。请载入服务器版本后再继续写入。</p><button type="button" className="mt-2 underline" onClick={() => void loadServerVersion()}>载入服务器版本</button></div> : null}
            {reconciliationRequired ? <div role="status" aria-live="polite" className="border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"><p>写入结果尚未确认。先刷新项目状态，再检查版本历史或导出记录。</p><button type="button" className="mt-2 underline" onClick={() => void refreshAndResolve()}>刷新项目状态</button></div> : null}
            {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
          </form>

          <aside className="grid h-fit gap-6">
            <StyleAdvisor
              initialRequest={project.description || project.brief?.primaryGoal}
              onApplyStyle={(styleSlug) => {
                setSelectedStyleSlug(styleSlug);
                markDraftChanged();
                setMessage(`已应用 ${styleSlug}，保存版本后生效。`);
              }}
            />
            <section className="border border-border p-5"><h2 className="font-medium">风格参考</h2>{selectedStyleSlug ? <><p className="mt-2 text-sm text-muted">项目引用原风格，不复制或修改 Showcase。</p><Link className="mt-4 inline-block text-sm underline underline-offset-4" href={`/styles/${selectedStyleSlug}`}>查看风格详情</Link><br/><Link className="mt-2 inline-block text-sm underline underline-offset-4" href={`/styles/${selectedStyleSlug}/showcase`}>查看原 Showcase</Link></> : <p className="mt-2 text-sm text-muted">保存前可以选择一个现有风格方向。</p>}</section>
            <section className="border border-border p-5"><h2 className="font-medium">真实生成</h2><p className="mt-2 text-sm text-muted">当前仅开放通过干净生产构建的 Next.js 数据后台与 4 个专用风格。</p><button type="button" onClick={() => void generate()} disabled={!canGenerate || writeBusy || remoteConflict || reconciliationRequired || project.current_revision_number === 0} className="mt-4 min-h-11 w-full border border-foreground px-3 text-sm font-medium disabled:opacity-40">{currentWrite?.kind === "generate" ? "正在生成…" : "生成 Next.js 工程"}</button>{!canGenerate ? <p className="mt-2 text-xs text-amber-700">当前项目类型或风格尚未通过工程验证，不会降级生成。</p> : null}{project.current_revision_number === 0 ? <p className="mt-2 text-xs text-muted">请先保存第一个项目版本。</p> : null}</section>
            <section className="border border-border p-5"><h2 className="font-medium">版本历史</h2>{revisions.length === 0 ? <p className="mt-2 text-sm text-muted">保存后会生成第一个不可变版本。</p> : <ol className="mt-3 grid gap-3">{revisions.map((revision) => <li key={revision.id} className="border-t border-border pt-3"><div className="flex justify-between text-sm"><strong>v{revision.revision_number}</strong><span className="text-muted">{new Date(revision.created_at).toLocaleString("zh-CN")}</span></div><p className="mt-1 text-xs text-muted">{revision.change_summary || sourceLabel(revision.source)}</p><div className="mt-2 flex gap-3"><button type="button" className="text-xs underline disabled:opacity-40" disabled={writeBusy || remoteConflict || reconciliationRequired || revision.revision_number === project.current_revision_number} onClick={() => void restore(revision.revision_number)}>{currentWrite?.kind === "restore" ? "恢复中…" : "恢复为新版本"}</button>{revision.source === "generation" ? <button type="button" className="text-xs underline disabled:opacity-40" disabled={writeBusy || remoteConflict || reconciliationRequired} onClick={() => void createExport(revision.revision_number)}>{currentWrite?.kind === "export" ? "导出中…" : "创建并下载 ZIP"}</button> : null}</div></li>)}</ol>}</section>
            <section className="border border-border p-5"><h2 className="font-medium">导出记录</h2>{exports.length === 0 ? <p className="mt-2 text-sm text-muted">生成版本后才能创建可追溯导出。</p> : <ol className="mt-3 grid gap-3">{exports.map((item) => <li key={item.id} className="border-t border-border pt-3 text-xs"><div className="flex justify-between"><strong>v{item.revision_number} · {item.file_count} 文件</strong><span>{item.status}</span></div><code className="mt-1 block break-all text-muted">{item.artifact_sha256}</code><a className="mt-2 inline-block underline" href={`/api/workspace/exports/${item.id}/download`}>重新下载并校验</a></li>)}</ol>}</section>
          </aside>
        </div>
      </div>
      <style jsx global>{`.workspace-input{width:100%;border:1px solid var(--border);background:var(--background);padding:.625rem .75rem;font-size:.875rem;outline:none}.workspace-input:focus{border-color:var(--foreground)}`}</style>
    </main>
  );
}

function split(value: FormDataEntryValue | null) { return String(value ?? "").split(/[，,\n]/).map((item) => item.trim()).filter(Boolean); }
function sourceLabel(source: string) { return source === "restore" ? "从历史版本恢复" : source === "generation" ? "生成结果" : "手动保存"; }
function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="grid gap-1.5 text-sm"><span className="font-medium">{label}</span>{children}</label>; }
