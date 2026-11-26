import { createHash } from "node:crypto";
import { getDb } from "@/lib/db";

const WINDOW_MS = 10 * 60 * 1000;

export function rateLimit(bucket: string, limit: number) {
  const db = getDb();
  const now = Date.now();
  const key = createHash("sha256").update(bucket).digest("base64url");
  const row = db.prepare("SELECT window_start, count FROM rate_limits WHERE bucket = ?").get(key) as
    | { window_start: number; count: number }
    | undefined;

  if (!row || now - row.window_start >= WINDOW_MS) {
    db.prepare(
      "INSERT INTO rate_limits (bucket, window_start, count) VALUES (?, ?, 1) ON CONFLICT(bucket) DO UPDATE SET window_start = excluded.window_start, count = 1",
    ).run(key, now);
    return { ok: true as const, remaining: limit - 1, retryAfter: 0 };
  }

  if (row.count >= limit) {
    const retryAfter = Math.ceil((row.window_start + WINDOW_MS - now) / 1000);
    return { ok: false as const, remaining: 0, retryAfter };
  }

  db.prepare("UPDATE rate_limits SET count = count + 1 WHERE bucket = ?").run(key);
  return { ok: true as const, remaining: limit - row.count - 1, retryAfter: 0 };
}
