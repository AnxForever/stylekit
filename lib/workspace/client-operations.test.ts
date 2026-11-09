import { describe, expect, it } from "vitest";
import {
  beginWorkspaceWrite,
  createWorkspaceWriteGate,
  finishWorkspaceWrite,
  ownsWorkspaceWrite,
  readWorkspaceResponse,
  workspaceTransportError,
  WorkspaceRequestError,
} from "@/lib/workspace/client-operations";

describe("workspace client operation boundaries", () => {
  it("classifies a rejected write request as unknown and permits retry after it settles", () => {
    const networkError = workspaceTransportError(new TypeError("Failed to fetch"), "版本保存失败", true);
    expect(networkError).toMatchObject({
      outcome: "unknown",
      code: "NETWORK_ERROR",
      message: expect.stringContaining("结果尚未确认"),
    });

    const gate = createWorkspaceWriteGate();
    const first = beginWorkspaceWrite(gate, "project-a", "save");
    expect(first).not.toBeNull();
    expect(beginWorkspaceWrite(gate, "project-a", "generate")).toBeNull();
    expect(finishWorkspaceWrite(gate, first!)).toBe(true);
    expect(beginWorkspaceWrite(gate, "project-a", "save")).not.toBeNull();
  });

  it("treats an unreadable successful mutation response as unknown", async () => {
    const response = {
      ok: true,
      status: 201,
      json: () => Promise.reject(new SyntaxError("Unexpected end of JSON input")),
    } as unknown as Response;

    await expect(readWorkspaceResponse(response, "生成失败", true)).rejects.toMatchObject({
      name: "WorkspaceRequestError",
      outcome: "unknown",
      code: "INVALID_RESPONSE",
      status: 201,
    });
  });

  it("keeps a structured revision conflict rejected and exposes its recovery code", async () => {
    const response = new Response(JSON.stringify({
      success: false,
      error: "项目已在其他窗口更新，请刷新后再保存。",
      code: "PROJECT_REVISION_CONFLICT",
    }), { status: 409, headers: { "Content-Type": "application/json" } });

    await expect(readWorkspaceResponse(response, "版本保存失败", true)).rejects.toMatchObject({
      outcome: "rejected",
      code: "PROJECT_REVISION_CONFLICT",
      status: 409,
    });
  });

  it("keeps write ownership independent across projects", () => {
    const gate = createWorkspaceWriteGate();
    const oldWrite = beginWorkspaceWrite(gate, "project-a", "save");
    const currentWrite = beginWorkspaceWrite(gate, "project-b", "restore");

    expect(oldWrite).not.toBeNull();
    expect(currentWrite).not.toBeNull();
    expect(finishWorkspaceWrite(gate, oldWrite!)).toBe(true);
    expect(ownsWorkspaceWrite(gate, currentWrite!, "project-b")).toBe(true);
    expect(finishWorkspaceWrite(gate, currentWrite!)).toBe(true);
    expect(ownsWorkspaceWrite(gate, currentWrite!, "project-b")).toBe(false);
  });

  it("blocks a second project A write after starting B and returning to A", () => {
    const gate = createWorkspaceWriteGate();
    const firstA = beginWorkspaceWrite(gate, "project-a", "save");
    const writeB = beginWorkspaceWrite(gate, "project-b", "generate");

    expect(firstA).not.toBeNull();
    expect(writeB).not.toBeNull();
    expect(beginWorkspaceWrite(gate, "project-a", "restore")).toBeNull();
    expect(ownsWorkspaceWrite(gate, firstA!, "project-a")).toBe(true);

    expect(finishWorkspaceWrite(gate, firstA!)).toBe(true);
    expect(ownsWorkspaceWrite(gate, writeB!, "project-b")).toBe(true);
    expect(beginWorkspaceWrite(gate, "project-a", "save")).not.toBeNull();
  });

  it("rejects invalid response payload shapes without crashing callers", async () => {
    const response = new Response("[]", { status: 200 });

    await expect(readWorkspaceResponse(response, "项目读取失败")).rejects.toBeInstanceOf(WorkspaceRequestError);
  });
});
