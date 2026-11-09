// @vitest-environment happy-dom
import "@testing-library/jest-dom/vitest";
import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ push: vi.fn() }));

vi.mock("next/navigation", () => ({ useRouter: () => ({ push: state.push }) }));
vi.mock("next/link", () => ({
  default: ({ href, children, ...props }: { href: string; children: ReactNode; [key: string]: unknown }) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
vi.mock("@/components/ui/select", () => ({
  Select: ({ name, defaultValue, children }: { name?: string; defaultValue?: string; children: ReactNode }) => (
    <div>{name ? <input type="hidden" name={name} value={defaultValue ?? ""} readOnly /> : null}{children}</div>
  ),
  SelectTrigger: ({ children }: { children: ReactNode }) => <button type="button">{children}</button>,
  SelectValue: () => <span>选择</span>,
  SelectContent: ({ children }: { children: ReactNode }) => <>{children}</>,
  SelectItem: ({ children }: { children: ReactNode }) => <span>{children}</span>,
}));
vi.mock("@/components/workspace/style-picker", () => ({
  NO_STYLE: "none",
  StylePicker: ({ value, defaultValue }: { value?: string | null; defaultValue?: string | null }) => (
    <input type="hidden" name="selectedStyleSlug" value={value ?? defaultValue ?? ""} readOnly />
  ),
}));
vi.mock("@/components/bailian/style-advisor", () => ({ StyleAdvisor: () => null }));

import { WorkspaceHome } from "@/app/workspace/_content";
import { WorkspaceProjectEditor } from "@/app/workspace/[projectId]/_content";

const projectIdA = "11111111-1111-4111-8111-111111111111";
const projectIdB = "22222222-2222-4222-8222-222222222222";

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function project(id: string, name: string, currentRevision = 1) {
  return {
    id,
    name,
    description: "",
    project_type: "landing",
    stack: [],
    brief: {},
    selected_style_slug: null,
    status: "active",
    current_revision_number: currentRevision,
    updated_at: "2026-01-01T00:00:00.000Z",
  };
}

function detailResponse(url: string, name = "Project") {
  if (url.endsWith("/revisions")) return jsonResponse({ success: true, revisions: [] });
  if (url.endsWith("/exports")) return jsonResponse({ success: true, exports: [] });
  return jsonResponse({ success: true, project: project(url.split("/").at(-1) ?? projectIdA, name) });
}

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  state.push.mockReset();
  fetchMock = vi.fn();
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Workspace request recovery", () => {
  it("unlocks create after a network rejection and permits retry after list reconciliation", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const method = init?.method ?? "GET";
      if (String(input) !== "/api/workspace/projects") return Promise.reject(new Error("Unexpected URL"));
      if (method === "GET") return Promise.resolve(jsonResponse({ success: true, projects: [] }));
      const postCount = fetchMock.mock.calls.filter((call) => call[1]?.method === "POST").length;
      if (postCount === 1) return Promise.reject(new TypeError("Failed to fetch"));
      return Promise.resolve(jsonResponse({ success: false, error: "项目资料不完整。" }, 422));
    });

    const { container } = render(<WorkspaceHome styles={[]} />);
    await screen.findByText("还没有项目");
    fireEvent.change(screen.getByPlaceholderText("例如：客户数据后台"), { target: { value: "Retry workspace" } });
    fireEvent.submit(container.querySelector("form")!);

    expect(await screen.findByRole("status")).toHaveTextContent("创建请求结果尚未确认");
    expect(screen.getByRole("button", { name: "请先确认创建结果" })).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "刷新项目列表" }));
    await waitFor(() => expect(screen.queryByRole("status")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "创建并进入项目" })).toBeEnabled();

    fireEvent.submit(container.querySelector("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("项目资料不完整。");
    expect(fetchMock.mock.calls.filter((call) => call[1]?.method === "POST")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "创建并进入项目" })).toBeEnabled();
    expect(state.push).not.toHaveBeenCalled();
  });

  it("ends a save after malformed JSON and enables the action after refresh", async () => {
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      if (init?.method === "POST") return Promise.resolve(new Response("{", { status: 201 }));
      return Promise.resolve(detailResponse(String(input)));
    });

    const { container } = render(<WorkspaceProjectEditor projectId={projectIdA} styles={[]} supportedStyles={[]} />);
    const saveButton = await screen.findByRole("button", { name: "保存新版本" });
    fireEvent.submit(container.querySelector("form")!);

    expect(await screen.findByRole("alert")).toHaveTextContent("无法读取的响应");
    expect(screen.getByRole("status")).toHaveTextContent("写入结果尚未确认");
    expect(saveButton).toBeDisabled();
    fireEvent.click(screen.getByRole("button", { name: "刷新项目状态" }));
    await waitFor(() => expect(screen.queryByText("写入结果尚未确认")).not.toBeInTheDocument());
    expect(screen.getByRole("button", { name: "保存新版本" })).toBeEnabled();
  });

  it("keeps edits made while a save is pending after the server refresh", async () => {
    let resolveSave: ((response: Response) => void) | undefined;
    let projectReads = 0;
    fetchMock.mockImplementation((input: RequestInfo | URL, init?: RequestInit) => {
      const url = String(input);
      if (init?.method === "POST") {
        return new Promise<Response>((resolve) => { resolveSave = resolve; });
      }
      if (url.endsWith("/revisions")) return Promise.resolve(jsonResponse({ success: true, revisions: [] }));
      if (url.endsWith("/exports")) return Promise.resolve(jsonResponse({ success: true, exports: [] }));
      projectReads += 1;
      return Promise.resolve(jsonResponse({
        success: true,
        project: project(projectIdA, projectReads === 1 ? "Initial project" : "Submitted name", projectReads === 1 ? 1 : 2),
      }));
    });

    const { container } = render(<WorkspaceProjectEditor projectId={projectIdA} styles={[]} supportedStyles={[]} />);
    const nameField = await screen.findByRole("textbox", { name: "项目名称" });
    fireEvent.change(nameField, { target: { value: "Submitted name" } });
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(resolveSave).toBeTypeOf("function"));

    fireEvent.change(nameField, { target: { value: "Later edit" } });
    await act(async () => {
      resolveSave?.(jsonResponse({ success: true, revision: { revisionNumber: 2 } }, 201));
    });

    await screen.findByText("版本 v2 已保存");
    await waitFor(() => expect(screen.getByRole("textbox", { name: "项目名称" })).toHaveValue("Later edit"));
  });

  it("ignores delayed project A reads after the route changes to project B", async () => {
    const pending = new Map<string, { resolve: (response: Response) => void }>();
    fetchMock.mockImplementation((input: RequestInfo | URL) => new Promise<Response>((resolve) => {
      pending.set(String(input), { resolve });
    }));

    const view = render(<WorkspaceProjectEditor projectId={projectIdA} styles={[]} supportedStyles={[]} />);
    await waitFor(() => expect(pending.size).toBe(3));
    view.rerender(<WorkspaceProjectEditor projectId={projectIdB} styles={[]} supportedStyles={[]} />);
    await waitFor(() => expect(pending.size).toBe(6));

    await act(async () => {
      for (const [url, request] of pending) {
        if (url.includes(projectIdB)) request.resolve(detailResponse(url, "Project B"));
      }
    });
    expect(await screen.findByRole("heading", { name: "Project B" })).toBeInTheDocument();

    await act(async () => {
      for (const [url, request] of pending) {
        if (url.includes(projectIdA)) request.resolve(detailResponse(url, "Project A"));
      }
    });
    expect(screen.getByRole("heading", { name: "Project B" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Project A" })).not.toBeInTheDocument();
  });
});
