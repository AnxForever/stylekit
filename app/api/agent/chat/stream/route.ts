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
import { runAgentTurnStreaming } from "@/lib/agent/orchestrator";
import type { AgentMessage, AgentSessionSummary } from "@/lib/agent/types";

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
  atomOverrides: z
    .object({
      philosophy: z.string().trim().optional(),
      layout: z.string().trim().optional(),
      motion: z.string().trim().optional(),
      color: z.string().trim().optional(),
      typography: z.string().trim().optional(),
    })
    .partial()
    .optional(),
});

function sseEvent(event: string, data: unknown): string {
  return `event: ${event}\ndata: ${JSON.stringify(data)}\n\n`;
}

function asSessionSummary(session: AgentSessionSummary): AgentSessionSummary {
  return session;
}

export async function POST(request: Request) {
  const originCheck = verifyTrustedOrigin(request);
  if (!originCheck.ok) {
    return new Response(
      sseEvent("error", { error: originCheck.error }),
      {
        status: originCheck.status ?? 403,
        headers: { "Content-Type": "text/event-stream" },
      }
    );
  }

  if (!isAgentStorageConfigured()) {
    return new Response(
      sseEvent("error", { error: "Agent storage is not configured." }),
      { status: 503, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  if (!isAgentModelConfigured()) {
    return new Response(
      sseEvent("error", { error: "Agent model is not configured." }),
      { status: 503, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  const user = await getServerUser();
  if (!user) {
    return new Response(
      sseEvent("error", { error: "Authentication required" }),
      { status: 401, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  let body: z.infer<typeof requestSchema>;
  try {
    body = requestSchema.parse(await request.json());
  } catch (error) {
    const message =
      error instanceof z.ZodError
        ? error.issues[0]?.message ?? "Invalid request"
        : "Invalid request";
    return new Response(
      sseEvent("error", { error: message }),
      { status: 400, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  try {
    let session = body.sessionId
      ? await getAgentSessionDetail(user.id, body.sessionId)
      : null;

    if (body.sessionId && !session) {
      return new Response(
        sseEvent("error", { error: "Session not found" }),
        { status: 404, headers: { "Content-Type": "text/event-stream" } }
      );
    }

    if (!session) {
      const created = await createAgentSessionForUser({
        userId: user.id,
        locale: body.locale,
        titleSeed: body.message,
      });
      session = { ...created, messages: [] };
    }

    const userMessage = await appendAgentMessage({
      sessionId: session.id,
      role: "user",
      content: body.message,
    });

    const conversation: AgentMessage[] = [...session.messages, userMessage];
    const turn = await runAgentTurnStreaming({
      locale: body.locale,
      messages: conversation,
      pageContext: body.pageContext,
      atomOverrides: body.atomOverrides,
    });

    /* --- Non-streaming result (consulting phases) --- */
    if (!turn.streaming) {
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
        (await listAgentSessionsForUser(user.id)).find(
          (item) => item.id === session?.id
        ) ?? asSessionSummary(session);

      const output =
        sseEvent("metadata", {
          sessionId: session.id,
          userMessage,
          assistantMessage: turn.assistantMessage,
          followUpNeeded: turn.followUpNeeded,
          workflowState: turn.workflowState,
          workflow: turn.workflow,
          planner: turn.planner,
          codePrompt: turn.codePrompt,
          suggestedOptions: turn.suggestedOptions,
          toolTrace: turn.toolTrace,
          promptSnapshot: turn.promptSnapshot,
          decisionTrace: turn.decisionTrace,
          assistant,
          session: refreshedSession,
        }) + sseEvent("done", { assistantMessage: turn.assistantMessage });

      return new Response(output, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      });
    }

    /* --- Streaming result (done phase) --- */
    const sessionId = session.id;
    const userId = user.id;
    const encoder = new TextEncoder();

    const sseStream = new ReadableStream({
      async start(controller) {
        /* Emit metadata first */
        controller.enqueue(
          encoder.encode(
            sseEvent("metadata", {
              sessionId,
              userMessage,
              followUpNeeded: false,
              workflowState: turn.workflowState,
              workflow: turn.workflow,
              planner: turn.planner,
              codePrompt: turn.codePrompt,
              suggestedOptions: turn.suggestedOptions,
              toolTrace: turn.toolTrace,
              citations: turn.citations,
              promptSnapshot: turn.promptSnapshot,
              decisionTrace: turn.decisionTrace,
            })
          )
        );

        /* Stream text deltas */
        let fullText = "";
        const reader = turn.stream.getReader();
        try {
          for (;;) {
            const { done, value } = await reader.read();
            if (done) break;
            fullText += value;
            controller.enqueue(
              encoder.encode(sseEvent("delta", { content: value }))
            );
          }
        } catch (streamError) {
          const errorMessage =
            streamError instanceof Error
              ? streamError.message
              : "Stream interrupted";
          controller.enqueue(
            encoder.encode(sseEvent("error", { error: errorMessage }))
          );
          controller.close();
          return;
        }

        /* Persist the complete assistant message */
        try {
          const assistant = await appendAgentMessage({
            sessionId,
            role: "assistant",
            content: fullText,
            planner: turn.planner,
            codePrompt: turn.codePrompt,
            toolTrace: turn.toolTrace,
            citations: turn.citations,
            promptSnapshot: turn.promptSnapshot,
            decisionTrace: turn.decisionTrace,
            sessionStatus: turn.workflowState,
          });

          const refreshedSession =
            (await listAgentSessionsForUser(userId)).find(
              (item) => item.id === sessionId
            ) ?? asSessionSummary(session!);

          controller.enqueue(
            encoder.encode(
              sseEvent("done", {
                assistantMessage: fullText,
                assistant,
                session: refreshedSession,
              })
            )
          );
        } catch {
          controller.enqueue(
            encoder.encode(
              sseEvent("done", { assistantMessage: fullText })
            )
          );
        }

        controller.close();
      },
    });

    return new Response(sseStream, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("[agent/chat/stream] Error:", error);
    const message =
      error instanceof AgentProviderError
        ? error.message
        : "Failed to process agent turn";
    const status = error instanceof AgentProviderError ? error.status : 500;
    return new Response(
      sseEvent("error", { error: message }),
      { status, headers: { "Content-Type": "text/event-stream" } }
    );
  }
}
