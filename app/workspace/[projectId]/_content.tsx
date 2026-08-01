"use client";

import Link from "next/link";
import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Radix Select forbids empty-string item values; this sentinel maps to null on submit.
const NO_STYLE = "__none__";

type StyleOption = { slug: string; name: string; nameEn: string };
type Project = {
  id: string; name: string; description: string; project_type: string; stack: string[];
  brief: { audience?: string; primaryGoal?: string; requiredPages?: string[]; requiredStates?: string[]; brandPersonality?: string[]; antiReferences?: string[]; notes?: string };
  selected_style_slug: string | null; status: "active" | "archived"; current_revision_number: number; updated_at: string;
};
type Revision = { id: string; revision_number: number; source: string; change_summary: string | null; created_at: string; content_sha256: string };
type ExportRow = { id: string; revision_number: number; artifact_sha256: string; file_count: number; status: string; verification: { filename?: string; target?: string }; created_at: string };

const stackOptions = [["nextjs","Next.js"],["react","React"],["typescript","TypeScript"],["tailwind","Tailwind CSS"],["shadcn","shadcn/ui"],["css-modules","CSS Modules"]] as const;
const requiredStates = [["loading","加载"],["empty","空状态"],["error","错误"],["success","成功"],["disabled","禁用"]] as const;

export function WorkspaceProjectEditor({ projectId, styles, supportedStyles }: { projectId: string; styles: StyleOption[]; supportedStyles: string[] }) {
  const [project, setProject] = useState<Project | null>(null);
  const [revisions, setRevisions] = useState<Revision[]>([]);
  const [exports, setExports] = useState<ExportRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [workingAction, setWorkingAction] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const [projectResponse, revisionsResponse, exportsResponse] = await Promise.all([
        fetch(`/api/workspace/projects/${projectId}`, { cache: "no-store" }),
        fetch(`/api/workspace/projects/${projectId}/revisions`, { cache: "no-store" }),
        fetch(`/api/workspace/projects/${projectId}/exports`, { cache: "no-store" }),
      ]);
      const projectPayload = await projectResponse.json();
      const revisionsPayload = await revisionsResponse.json();
      const exportsPayload = await exportsResponse.json();
      if (!projectResponse.ok) throw new Error(projectPayload.error ?? "项目读取失败");
      if (!revisionsResponse.ok) throw new Error(revisionsPayload.error ?? "版本读取失败");
      if (!exportsResponse.ok) throw new Error(exportsPayload.error ?? "导出记录读取失败");
      setProject(projectPayload.project);
      setRevisions(revisionsPayload.revisions ?? []);
      setExports(exportsPayload.exports ?? []);
    } catch (loadError) { setError(loadError instanceof Error ? loadError.message : "项目读取失败"); }
    finally { setLoading(false); }
  }, [projectId]);

  useEffect(() => { void load(); }, [load]);

  const readiness = useMemo(() => {
    if (!project) return [];
    return [
      ["目标与受众", Boolean(project.brief?.audience && project.brief?.primaryGoal)],
      ["技术栈", project.stack.length > 0],
      ["页面清单", (project.brief?.requiredPages?.length ?? 0) > 0],
      ["必要状态", (project.brief?.requiredStates?.length ?? 0) >= 4],
      ["风格方向", Boolean(project.selected_style_slug)],
    ] as const;
  }, [project]);

  const canGenerate = Boolean(
    project?.project_type === "dashboard" &&
    project.selected_style_slug &&
    supportedStyles.includes(project.selected_style_slug),
  );

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (!project) return;
    setSaving(true); setMessage(null); setError(null);
    const form = new FormData(event.currentTarget);
    const snapshot = {
      name: form.get("name"), description: form.get("description"), projectType: form.get("projectType"),
      stack: stackOptions.filter(([value]) => form.get(`stack:${value}`) === "on").map(([value]) => value),
      selectedStyleSlug: form.get("selectedStyleSlug") === NO_STYLE ? null : form.get("selectedStyleSlug") || null, status: project.status,
      brief: {
        audience: form.get("audience"), primaryGoal: form.get("primaryGoal"),
        requiredPages: split(form.get("requiredPages")),
        requiredStates: requiredStates.filter(([value]) => form.get(`state:${value}`) === "on").map(([value]) => value),
        brandPersonality: split(form.get("brandPersonality")), antiReferences: split(form.get("antiReferences")), notes: form.get("notes"),
      },
    };
    const response = await fetch(`/api/workspace/projects/${projectId}/revisions`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expectedRevisionNumber: project.current_revision_number, snapshot, source: "manual_save", changeSummary: form.get("changeSummary") || null }),
    });
    const payload = await response.json(); setSaving(false);
    if (!response.ok) { setError(payload.error ?? "版本保存失败"); return; }
    setMessage(`版本 v${payload.revision.revisionNumber} 已保存`);
    await load();
  }

  async function generate() {
    if (!project) return;
    setWorkingAction("generate"); setMessage(null); setError(null);
    const response = await fetch(`/api/workspace/projects/${projectId}/generate`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ expectedRevisionNumber: project.current_revision_number, target: "nextjs" }),
    });
    const payload = await response.json(); setWorkingAction(null);
    if (!response.ok) { setError(payload.error ?? "生成失败"); return; }
    setMessage(`已生成 v${payload.revision.revisionNumber}：${payload.generation.fileCount} 个 Next.js 文件`);
    await load();
  }

  async function restore(revisionNumber: number) {
    if (!project || !window.confirm(`确认从 v${revisionNumber} 恢复？历史不会被覆盖，系统会创建一个新的最新版本。`)) return;
    setWorkingAction(`restore:${revisionNumber}`); setMessage(null); setError(null);
    const response = await fetch(`/api/workspace/projects/${projectId}/restore`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ revisionNumber, expectedRevisionNumber: project.current_revision_number }),
    });
    const payload = await response.json(); setWorkingAction(null);
    if (!response.ok) { setError(payload.error ?? "恢复失败"); return; }
    setMessage(`已从 v${revisionNumber} 创建恢复版本 v${payload.revision.revisionNumber}`);
    await load();
  }

  async function createExport(revisionNumber: number) {
    setWorkingAction(`export:${revisionNumber}`); setMessage(null); setError(null);
    const response = await fetch(`/api/workspace/projects/${projectId}/exports`, {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ revisionNumber }),
    });
    const payload = await response.json(); setWorkingAction(null);
    if (!response.ok) { setError(payload.error ?? "导出失败"); return; }
    setMessage(`ZIP 已生成并记录 SHA-256：${payload.export.artifact_sha256}`);
    await load();
    window.location.href = payload.downloadUrl;
  }

  if (loading) return <main className="mx-auto max-w-6xl px-6 py-16"><p className="border border-border p-6 text-sm text-muted">正在读取项目…</p></main>;
  if (error && !project) return <main className="mx-auto max-w-6xl px-6 py-16"><div role="alert" className="border border-red-300 bg-red-50 p-5 text-red-800"><p>{error}</p><button className="mt-3 underline" onClick={() => void load()}>重试</button></div></main>;
  if (!project) return null;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border"><div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5"><div><Link href="/workspace" className="text-sm text-muted hover:text-foreground">← 项目工作区</Link><h1 className="mt-1 text-2xl font-semibold tracking-tight">{project.name}</h1></div><span className="text-xs text-muted">当前 v{project.current_revision_number}</span></div></header>
      <div className="mx-auto max-w-6xl px-6 py-8">
        <section aria-label="交付准备轨" className="mb-8 grid gap-px border border-border bg-border sm:grid-cols-5">
          {readiness.map(([label, complete]) => <div key={label} className="bg-background p-4"><span className={`mr-2 inline-block h-2 w-2 rounded-full ${complete ? "bg-green-600" : "bg-amber-500"}`} /><span className="text-sm">{label}</span><p className="mt-1 text-xs text-muted">{complete ? "已具备" : "待补充"}</p></div>)}
        </section>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
          <form onSubmit={save} className="grid gap-6 border border-border p-6">
            <div><h2 className="text-xl font-medium">项目规格</h2><p className="mt-1 text-sm text-muted">每次保存都会创建不可覆盖的新版本。</p></div>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="项目名称"><input name="name" required defaultValue={project.name} className="workspace-input" /></Field><Field label="项目类型"><Select name="projectType" defaultValue={project.project_type}><SelectTrigger className="px-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dashboard">数据后台</SelectItem><SelectItem value="landing">落地页</SelectItem><SelectItem value="app">工具 App</SelectItem><SelectItem value="portfolio">作品集</SelectItem><SelectItem value="blog">博客</SelectItem><SelectItem value="other">其他</SelectItem></SelectContent></Select></Field></div>
            <Field label="项目说明"><textarea name="description" rows={2} defaultValue={project.description} className="workspace-input" /></Field>
            <Field label="目标用户"><input name="audience" defaultValue={project.brief?.audience ?? ""} className="workspace-input" /></Field>
            <Field label="主要目标"><textarea name="primaryGoal" rows={2} defaultValue={project.brief?.primaryGoal ?? ""} className="workspace-input" /></Field>
            <Field label="技术栈"><div className="grid grid-cols-2 gap-2 sm:grid-cols-3">{stackOptions.map(([value,label]) => <label key={value} className="flex min-h-11 items-center gap-2 border border-border px-3 text-sm"><input type="checkbox" name={`stack:${value}`} defaultChecked={project.stack.includes(value)} />{label}</label>)}</div></Field>
            <Field label="页面清单"><input name="requiredPages" defaultValue={project.brief?.requiredPages?.join("，") ?? ""} className="workspace-input" /></Field>
            <Field label="必要状态"><div className="grid grid-cols-2 gap-2 sm:grid-cols-5">{requiredStates.map(([value,label]) => <label key={value} className="flex min-h-11 items-center gap-2 border border-border px-3 text-sm"><input type="checkbox" name={`state:${value}`} defaultChecked={project.brief?.requiredStates?.includes(value)} />{label}</label>)}</div></Field>
            <div className="grid gap-4 sm:grid-cols-2"><Field label="品牌调性"><input name="brandPersonality" defaultValue={project.brief?.brandPersonality?.join("，") ?? ""} className="workspace-input" /></Field><Field label="绝对不要"><input name="antiReferences" defaultValue={project.brief?.antiReferences?.join("，") ?? ""} className="workspace-input" /></Field></div>
            <Field label="风格方向"><Select name="selectedStyleSlug" defaultValue={project.selected_style_slug ?? NO_STYLE}><SelectTrigger className="px-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value={NO_STYLE}>尚未选择</SelectItem>{styles.map((style) => <SelectItem key={style.slug} value={style.slug}>{style.name} / {style.nameEn}</SelectItem>)}</SelectContent></Select></Field>
            <Field label="其他约束"><textarea name="notes" rows={3} defaultValue={project.brief?.notes ?? ""} className="workspace-input" /></Field>
            <Field label="本次修改说明（可选）"><input name="changeSummary" maxLength={240} className="workspace-input" placeholder="例如：补充移动端状态和账户页面" /></Field>
            <div className="flex items-center gap-4"><button disabled={saving || project.status === "archived"} className="h-11 bg-foreground px-5 text-sm font-medium text-background disabled:opacity-50">{saving ? "正在保存…" : "保存新版本"}</button><span aria-live="polite" className="text-sm text-muted">{message}</span></div>
            {error ? <p role="alert" className="text-sm text-red-700">{error}</p> : null}
          </form>

          <aside className="grid h-fit gap-6">
            <section className="border border-border p-5"><h2 className="font-medium">风格参考</h2>{project.selected_style_slug ? <><p className="mt-2 text-sm text-muted">项目引用原风格，不复制或修改 Showcase。</p><Link className="mt-4 inline-block text-sm underline underline-offset-4" href={`/styles/${project.selected_style_slug}`}>查看风格详情</Link><br/><Link className="mt-2 inline-block text-sm underline underline-offset-4" href={`/styles/${project.selected_style_slug}/showcase`}>查看原 Showcase</Link></> : <p className="mt-2 text-sm text-muted">保存前可以选择一个现有风格方向。</p>}</section>
            <section className="border border-border p-5"><h2 className="font-medium">真实生成</h2><p className="mt-2 text-sm text-muted">当前仅开放通过干净生产构建的 Next.js 数据后台与 4 个专用风格。</p><button type="button" onClick={() => void generate()} disabled={!canGenerate || workingAction !== null || project.current_revision_number === 0} className="mt-4 min-h-11 w-full border border-foreground px-3 text-sm font-medium disabled:opacity-40">{workingAction === "generate" ? "正在生成…" : "生成 Next.js 工程"}</button>{!canGenerate ? <p className="mt-2 text-xs text-amber-700">当前项目类型或风格尚未通过工程验证，不会降级生成。</p> : null}{project.current_revision_number === 0 ? <p className="mt-2 text-xs text-muted">请先保存第一个项目版本。</p> : null}</section>
            <section className="border border-border p-5"><h2 className="font-medium">版本历史</h2>{revisions.length === 0 ? <p className="mt-2 text-sm text-muted">保存后会生成第一个不可变版本。</p> : <ol className="mt-3 grid gap-3">{revisions.map((revision) => <li key={revision.id} className="border-t border-border pt-3"><div className="flex justify-between text-sm"><strong>v{revision.revision_number}</strong><span className="text-muted">{new Date(revision.created_at).toLocaleString("zh-CN")}</span></div><p className="mt-1 text-xs text-muted">{revision.change_summary || sourceLabel(revision.source)}</p><div className="mt-2 flex gap-3"><button type="button" className="text-xs underline disabled:opacity-40" disabled={workingAction !== null || revision.revision_number === project.current_revision_number} onClick={() => void restore(revision.revision_number)}>{workingAction === `restore:${revision.revision_number}` ? "恢复中…" : "恢复为新版本"}</button>{revision.source === "generation" ? <button type="button" className="text-xs underline disabled:opacity-40" disabled={workingAction !== null} onClick={() => void createExport(revision.revision_number)}>{workingAction === `export:${revision.revision_number}` ? "导出中…" : "创建并下载 ZIP"}</button> : null}</div></li>)}</ol>}</section>
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
