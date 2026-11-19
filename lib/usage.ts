import { createHash } from "node:crypto";
import { getDb } from "@/lib/db";

export type UsageKind = "chat" | "image" | "automation";

const LIMITS = {
  guest: { chat: 8, image: 3, automation: 3 },
  starter: { chat: 500, image: 50, automation: 3 },
} as const;

export function guestSubject(ip: string) {
  const hash = createHash("sha256").update(`guest:${ip}`).digest("base64url");
  return `guest:${hash}`;
}

function periodFor(plan: string, now = new Date()) {
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return plan === "guest" ? `${y}-${m}-${d}` : `${y}-${m}`;
}

function limitFor(plan: string, kind: UsageKind) {
  if (plan === "guest") return LIMITS.guest[kind];
  return LIMITS.starter[kind];
}

export function consumeUsage(subjectKey: string, plan: string, kind: UsageKind) {
  const db = getDb();
  const period = periodFor(plan === "guest" ? "guest" : "starter");
  const limit = limitFor(plan === "guest" ? "guest" : "starter", kind);
  const current = db
    .prepare("SELECT count FROM usage_counters WHERE subject_key = ? AND period = ? AND kind = ?")
    .get(subjectKey, period, kind) as { count: number } | undefined;
  const used = current?.count ?? 0;
  if (used >= limit) {
    return { ok: false as const, used, limit, remaining: 0, plan: plan === "guest" ? "guest" : "starter" };
  }
  db.prepare(
    `INSERT INTO usage_counters (subject_key, period, kind, count) VALUES (?, ?, ?, 1)
     ON CONFLICT(subject_key, period, kind) DO UPDATE SET count = count + 1`,
  ).run(subjectKey, period, kind);
  return {
    ok: true as const,
    used: used + 1,
    limit,
    remaining: limit - used - 1,
    plan: plan === "guest" ? "guest" : "starter",
  };
}
