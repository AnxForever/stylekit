import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyTrustedOrigin } from "@/lib/security/request-origin";
import { getServerUser } from "@/lib/auth/supabase-server";
import {
  appendAgentMessage,
  createAgentSessionForUser,
  getAgentSessionDetail,
  isAgentStorageConfigured,
  listAgentSessionsForUser,
} from "@/lib/agent/storage";
import { isAgentModelConfigured, AgentProviderError } from "@/lib/agent/provider";
import { runAgentTurn } from "@/lib/agent/orchestrator";
import type { AgentChatRequest, AgentMessage, AgentSessionSummary } from "@/lib/agent/types";

const requestSchema = z.object({
  sessionId: z.string().trim().optional(),
  message: z.string().trim().min(1).max(2000),
  locale: z.enum(["en", "zh"]),
  pageContext: z
    .object({
      path: z.string().trim().optional(),
      styleSlug: z.string().trim().optional(),
      templateSlug: z.string().trim().optional(),
    })
    .optional(),
});

function asSessionSummary(session: AgentSessionSummary): AgentSessionSummary {
  return session;
}

function ensureAgentFeatureAvailable() {
  if (!isAgentStorageConfigured()) {
    return NextResponse.json(
      { success: false, error: "Agent storage is not configured." },
      { status: 503 }
    );
  }

  if (!isAgentModelConfigured()) {
    return NextResponse.json(
      { success: false, error: "Agent model is not configured." },
      { status: 503 }
    );
  }

  return null;
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return NextResponse.json(
      { success: false, error: originCheck.error },
      { status: originCheck.status ?? 403 }
    );
  }

  const unavailableResponse = ensureAgentFeatureAvailable();
  if (unavailableResponse) {
    return unavailableResponse;
  }

  const user = await getServerUser();
  if (!user) {
    return NextResponse.json(
      { success: false, error: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const body = requestSchema.parse(await request.json()) as AgentChatRequest;

    let session = body.sessionId
      ? await getAgentSessionDetail(user.id, body.sessionId)
      : null;

    if (body.sessionId && !session) {
      return NextResponse.json(
        { success: false, error: "Session not found" },
        { status: 404 }
      );
    }

    if (!session) {
      const created = await createAgentSessionForUser({
        userId: user.id,
        locale: body.locale,
        titleSeed: body.message,
      });
      session = {
        ...created,
        messages: [],
      };
    }

    const userMessage = await appendAgentMessage({
      sessionId: session.id,
      role: "user",
      content: body.message,
    });

    const conversation: AgentMessage[] = [...session.messages, userMessage];
    const turn = await runAgentTurn({
      locale: body.locale,
      messages: conversation,
      pageContext: body.pageContext,
    });

    const assistant = await appendAgentMessage({
      sessionId: session.id,
      role: "assistant",
      content: turn.assistantMessage,
      planner: turn.planner,
      codePrompt: turn.codePrompt,
      toolTrace: turn.toolTrace,
      promptSnapshot: turn.promptSnapshot,
      decisionTrace: turn.decisionTrace,
      sessionStatus: turn.workflowState,
    });

    const refreshedSession =
      (await listAgentSessionsForUser(user.id)).find((item) => item.id === session?.id) ??
      asSessionSummary(session);

    return NextResponse.json({
      success: true,
      sessionId: session.id,
      assistantMessage: turn.assistantMessage,
      followUpNeeded: turn.followUpNeeded,
      workflowState: turn.workflowState,
      workflow: turn.workflow,
      planner: turn.planner,
      codePrompt: turn.codePrompt,
      toolTrace: turn.toolTrace,
      promptSnapshot: turn.promptSnapshot,
      decisionTrace: turn.decisionTrace,
      assistant,
      session: refreshedSession,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: error.issues[0]?.message ?? "Invalid request" },
        { status: 400 }
      );
    }

    if (error instanceof AgentProviderError) {
      return NextResponse.json(
        { success: false, error: error.message, code: error.code },
        { status: error.status }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to process agent turn" },
      { status: 500 }
    );
  }
}
