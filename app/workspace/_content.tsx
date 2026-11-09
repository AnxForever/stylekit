"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { StylePicker, NO_STYLE, type PickerStyle } from "@/components/workspace/style-picker";
import { readWorkspaceResponse, WorkspaceRequestError, workspaceTransportError } from "@/lib/workspace/client-operations";

type StyleOption = PickerStyle;
type ProjectRow = {
  id: string;
  name: string;
  description: string;
  project_type: string;
  stack: string[];
  selected_style_slug: string | null;
  status: "active" | "archived";
  current_revision_number: number;
  updated_at: string;
};

const stackOptions = [
  ["nextjs", "Next.js"],
  ["react", "React"],
  ["typescript", "TypeScript"],
  ["tailwind", "Tailwind CSS"],
  ["shadcn", "shadcn/ui"],
  ["css-modules", "CSS Modules"],
] as const;

export function WorkspaceHome({ styles }: { styles: StyleOption[] }) {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [createResultUnknown, setCreateResultUnknown] = useState(false);
  // Mirrors the uncontrolled projectType select so the style picker can
  // pre-filter recommendations by the type currently chosen in the form.
  const [projectTypeHint, setProjectTypeHint] = useState("dashboard");
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const mountedRef = useRef(false);
  const listRequestIdRef = useRef(0);
  const listLoadControllerRef = useRef<AbortController | null>(null);
  const createRequestIdRef = useRef(0);
  const createPendingRef = useRef(false);

  const loadProjects = useCallback(async () => {
    listLoadControllerRef.current?.abort();
    const controller = new AbortController();
    listLoadControllerRef.current = controller;
    const requestId = ++listRequestIdRef.current;
    const isCurrent = () => mountedRef.current && listRequestIdRef.current === requestId && !controller.signal.aborted;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/workspace/projects", { cache: "no-store", signal: controller.signal });
      const payload = await readWorkspaceResponse<{ projects?: unknown }>(response, "项目读取失败");
      if (!Array.isArray(payload.projects)) {
        throw new WorkspaceRequestError("项目列表响应格式无效。", {
          outcome: "rejected",
          code: "INVALID_PROJECT_LIST",
          status: response.status,
        });
      }
      if (!isCurrent()) return;
      setProjects(payload.projects as ProjectRow[]);
      setCreateResultUnknown(false);
    } catch (loadError) {
      if (isCurrent()) setError(workspaceTransportError(loadError, "项目读取失败").message);
    } finally {
      if (isCurrent()) {
        setLoading(false);
        if (listLoadControllerRef.current === controller) listLoadControllerRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void loadProjects();
    return () => {
      mountedRef.current = false;
      listRequestIdRef.current += 1;
      createRequestIdRef.current += 1;
      listLoadControllerRef.current?.abort();
    };
  }, [loadProjects]);

  const visibleProjects = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return projects.filter((project) =>
      !normalized || `${project.name} ${project.description}`.toLowerCase().includes(normalized),
    );
  }, [projects, query]);

  async function createProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (createPendingRef.current || createResultUnknown) return;
    createPendingRef.current = true;
    const requestId = ++createRequestIdRef.current;
    const isCurrent = () => mountedRef.current && createRequestIdRef.current === requestId;
    setCreating(true);
    setError(null);
    const form = new FormData(event.currentTarget);
    const project = {
      name: form.get("name"),
      description: form.get("description"),
      projectType: form.get("projectType"),
      selectedStyleSlug: form.get("selectedStyleSlug") === NO_STYLE ? null : form.get("selectedStyleSlug") || null,
      stack: stackOptions.filter(([value]) => form.get(`stack:${value}`) === "on").map(([value]) => value),
      brief: {
        audience: form.get("audience"),
        primaryGoal: form.get("primaryGoal"),
        requiredPages: String(form.get("requiredPages") ?? "").split(/[，,\n]/).map((value) => value.trim()).filter(Boolean),
        requiredStates: ["loading", "empty", "error", "success"],
        brandPersonality: String(form.get("brandPersonality") ?? "").split(/[，,]/).map((value) => value.trim()).filter(Boolean),
        antiReferences: String(form.get("antiReferences") ?? "").split(/[，,]/).map((value) => value.trim()).filter(Boolean),
        notes: form.get("notes"),
      },
    };
    try {
      const response = await fetch("/api/workspace/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project),
      });
      const payload = await readWorkspaceResponse<{ project?: { id?: unknown } }>(response, "项目创建失败", true);
      if (typeof payload.project?.id !== "string" || !payload.project.id) {
        throw new WorkspaceRequestError("项目创建结果不完整。请先刷新项目列表确认结果。", {
          outcome: "unknown",
          status: response.status,
          code: "PROJECT_CREATE_RESULT_UNKNOWN",
        });
      }
      if (isCurrent()) router.push("/workspace/" + payload.project.id);
    } catch (createError) {
      if (!isCurrent()) return;
      const failure = workspaceTransportError(createError, "项目创建", true);
      setError(failure.message);
      setCreateResultUnknown(failure.outcome === "unknown");
    } finally {
      createPendingRef.current = false;
      if (isCurrent()) setCreating(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <Link href="/" className="text-sm text-muted hover:text-foreground">StyleKit</Link>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">项目工作区</h1>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/style-advisor" className="border border-border px-3 py-2 text-xs text-muted transition-colors hover:border-foreground hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">AI 风格顾问</Link>
            <span className="rounded-full border border-border px-3 py-1 text-xs text-muted">SaaS 核心 · 免费构建中</span>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-10 lg:grid-cols-[minmax(0,1fr)_420px]">
        <section aria-labelledby="projects-title">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div><h2 id="projects-title" className="text-xl font-medium">你的项目</h2><p className="mt-1 text-sm text-muted">项目会保存在账号下，不再只存在当前浏览器。</p></div>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索项目" className="h-10 border border-border bg-background px-3 text-sm outline-none focus:border-foreground" />
          </div>
          {loading ? <p className="border border-border p-6 text-sm text-muted">正在读取项目…</p> : null}
          {error ? <div role="alert" className="mb-4 border border-red-300 bg-red-50 p-4 text-sm text-red-800"><p>{error}</p><button className="mt-2 underline" onClick={() => void loadProjects()}>重试</button></div> : null}
          {createResultUnknown ? <div role="status" aria-live="polite" className="mb-4 border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900"><p>创建请求结果尚未确认。先刷新项目列表检查是否已创建，再继续操作。</p><button className="mt-2 underline" onClick={() => void loadProjects()}>刷新项目列表</button></div> : null}
          {!loading && !error && visibleProjects.length === 0 ? (
            <div className="border border-dashed border-border p-10 text-center"><h3 className="font-medium">还没有项目</h3><p className="mt-2 text-sm text-muted">从右侧填写真实需求，创建第一个可保存的 StyleKit 项目。</p></div>
          ) : null}
          <div className="grid gap-3">
            {visibleProjects.map((project) => (
              <Link key={project.id} href={`/workspace/${project.id}`} className="block border border-border p-5 transition-colors hover:bg-muted/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">
                <div className="flex items-start justify-between gap-4"><div><h3 className="font-medium">{project.name}</h3><p className="mt-1 line-clamp-2 text-sm text-muted">{project.description || "暂无描述"}</p></div><span className="text-xs text-muted">v{project.current_revision_number}</span></div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-muted"><span>{project.project_type}</span>{project.selected_style_slug ? <span>· {project.selected_style_slug}</span> : null}<span>· {new Date(project.updated_at).toLocaleDateString("zh-CN")}</span></div>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="create-title" className="h-fit border border-border p-6 lg:sticky lg:top-6">
          <h2 id="create-title" className="text-xl font-medium">创建项目</h2>
          <p className="mt-1 text-sm text-muted">先记录真实产品约束，后续生成和导出都以它为唯一来源。</p>
          <form className="mt-6 grid gap-4" onSubmit={createProject}>
            <Field label="项目名称"><input name="name" required maxLength={120} className="workspace-input" placeholder="例如：客户数据后台" /></Field>
            <Field label="一句话说明"><textarea name="description" maxLength={2000} rows={2} className="workspace-input" placeholder="这个产品解决什么问题" /></Field>
            <Field label="项目类型"><Select name="projectType" defaultValue="dashboard" onValueChange={setProjectTypeHint} required><SelectTrigger className="px-3"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="dashboard">数据后台</SelectItem><SelectItem value="landing">落地页</SelectItem><SelectItem value="app">工具 App</SelectItem><SelectItem value="portfolio">作品集</SelectItem><SelectItem value="blog">博客</SelectItem><SelectItem value="other">其他</SelectItem></SelectContent></Select></Field>
            <Field label="技术栈"><div className="grid grid-cols-2 gap-2">{stackOptions.map(([value, label]) => <label key={value} className="flex items-center gap-2 border border-border px-3 py-2 text-sm"><input type="checkbox" name={`stack:${value}`} defaultChecked={["nextjs", "typescript", "tailwind"].includes(value)} />{label}</label>)}</div></Field>
            <Field label="目标用户"><input name="audience" className="workspace-input" placeholder="谁会使用它" /></Field>
            <Field label="主要目标"><textarea name="primaryGoal" rows={2} className="workspace-input" placeholder="用户进入产品后最重要的任务" /></Field>
            <Field label="需要的页面"><input name="requiredPages" className="workspace-input" placeholder="概览，账户，设置" /></Field>
            <Field label="品牌调性"><input name="brandPersonality" className="workspace-input" placeholder="专业，克制，可信" /></Field>
            <Field label="绝对不要"><input name="antiReferences" className="workspace-input" placeholder="不要紫色渐变，不要玻璃拟态" /></Field>
            <Field label="选择现有风格"><StylePicker styles={styles} noneLabel="稍后选择" projectType={projectTypeHint} /></Field>
            <Field label="其他约束"><textarea name="notes" rows={3} className="workspace-input" placeholder="移动端、无障碍、数据密度等要求" /></Field>
            <button disabled={creating || createResultUnknown} className="h-11 bg-foreground px-4 text-sm font-medium text-background disabled:opacity-50">{creating ? "正在创建…" : createResultUnknown ? "请先确认创建结果" : "创建并进入项目"}</button>
          </form>
        </section>
      </div>
      <style jsx global>{`.workspace-input{width:100%;border:1px solid var(--border);background:var(--background);padding:.625rem .75rem;font-size:.875rem;outline:none}.workspace-input:focus{border-color:var(--foreground)}`}</style>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="grid gap-1.5 text-sm"><span className="font-medium">{label}</span>{children}</label>;
}
