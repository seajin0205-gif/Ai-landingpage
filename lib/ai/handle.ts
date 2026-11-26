import { NextRequest } from "next/server";
import { SESSION_COOKIE, readSession } from "@/lib/auth";
import { generateAutomation, generateChat, generateImage } from "@/lib/ai/provider";
import { clientIp, jsonError, readJson } from "@/lib/http";
import { rateLimit } from "@/lib/rate-limit";
import { consumeUsage, guestSubject, type UsageKind } from "@/lib/usage";
import { asObject, cleanString } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const LIMITS: Record<UsageKind, number> = { chat: 2000, image: 500, automation: 1000 };

export async function prepareAi(request: NextRequest, kind: UsageKind) {
  const limited = rateLimit(`ai:${clientIp(request)}`, 20);
  if (!limited.ok) {
    return {
      error: jsonError(429, "rate_limited", "Too many requests. Try again shortly.", {
        retryAfter: limited.retryAfter,
      }),
    };
  }

  const body = asObject(await readJson(request));
  const prompt = cleanString(body?.prompt, LIMITS[kind]);
  if (prompt.length < 1) {
    return { error: jsonError(400, "invalid_prompt", "Enter a prompt.") };
  }

  const user = readSession(request.cookies.get(SESSION_COOKIE)?.value);
  const subject = user ? user.id : guestSubject(clientIp(request));
  const plan = user?.plan ?? "guest";

  return { prompt, subject, plan };
}

function takeUsage(subject: string, plan: string, kind: UsageKind) {
  const usage = consumeUsage(subject, plan, kind);
  if (!usage.ok) {
    return { error: jsonError(403, "quota_exceeded", "This period's limit for this action has been reached.", { usage }) };
  }
  return { usage };
}

export async function runChat(request: NextRequest) {
  const prepared = await prepareAi(request, "chat");
  if ("error" in prepared) return prepared.error;
  let result;
  try {
    result = await generateChat(prepared.prompt);
  } catch {
    return jsonError(502, "ai_unavailable", "The model request failed.");
  }
  const taken = takeUsage(prepared.subject, prepared.plan, "chat");
  if ("error" in taken) return taken.error;
  const encoder = new TextEncoder();
  const text = result.text;
  const provider = result.provider;
  const usage = taken.usage;
  const stream = new ReadableStream({
    async start(controller) {
      for (const delta of text.split(/(\s+)/)) {
        if (!delta) continue;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ delta })}\n\n`));
      }
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ done: true, provider, usage })}\n\n`));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
    },
  });
}

export async function runImage(request: NextRequest) {
  const prepared = await prepareAi(request, "image");
  if ("error" in prepared) return prepared.error;
  try {
    const result = await generateImage(prepared.prompt);
    const taken = takeUsage(prepared.subject, prepared.plan, "image");
    if ("error" in taken) return taken.error;
    return Response.json({ status: "complete", prompt: prepared.prompt, ...result, usage: taken.usage });
  } catch {
    return jsonError(502, "ai_unavailable", "The image request failed.");
  }
}

export async function runAutomation(request: NextRequest) {
  const prepared = await prepareAi(request, "automation");
  if ("error" in prepared) return prepared.error;
  try {
    const result = await generateAutomation(prepared.prompt);
    const taken = takeUsage(prepared.subject, prepared.plan, "automation");
    if ("error" in taken) return taken.error;
    return Response.json({ status: "complete", prompt: prepared.prompt, ...result, usage: taken.usage });
  } catch {
    return jsonError(502, "ai_unavailable", "The automation request failed.");
  }
}
