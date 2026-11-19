import { randomUUID } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { getDb, type LeadRow } from "@/lib/db";
import { clientIp, jsonError, readJson } from "@/lib/http";
import { notifyLead } from "@/lib/leads/notify";
import { rateLimit } from "@/lib/rate-limit";
import { asObject, cleanString, isEmail } from "@/lib/validation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TYPES = new Set(["quote", "sales", "trial", "other"]);

export async function POST(request: NextRequest) {
  const limited = rateLimit(`lead:${clientIp(request)}`, 8);
  if (!limited.ok) {
    return jsonError(429, "rate_limited", "Too many inquiries. Try again shortly.", {
      retryAfter: limited.retryAfter,
    });
  }

  const body = asObject(await readJson(request));
  const name = cleanString(body?.name, 80);
  const company = cleanString(body?.company, 120);
  const email = cleanString(body?.email, 254).toLowerCase();
  const inquiryType = cleanString(body?.inquiryType, 40);
  const message = cleanString(body?.message, 2000);
  const locale = body?.locale === "en" ? "en" : "ko";

  if (!name || !company || !isEmail(email) || !TYPES.has(inquiryType) || message.length < 8) {
    return jsonError(
      400,
      "invalid_input",
      "Name, company, email, inquiry type, and a message of at least 8 characters are required.",
    );
  }

  const lead: LeadRow = {
    id: randomUUID(),
    name,
    company,
    email,
    inquiry_type: inquiryType,
    message,
    locale,
    created_at: Date.now(),
  };
  getDb()
    .prepare(
      `INSERT INTO leads (id, name, company, email, inquiry_type, message, locale, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(lead.id, lead.name, lead.company, lead.email, lead.inquiry_type, lead.message, lead.locale, lead.created_at);

  const notice = await notifyLead(lead);
  return NextResponse.json({ ok: true, id: lead.id, notice });
}
