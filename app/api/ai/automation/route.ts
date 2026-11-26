import { NextRequest } from "next/server";
import { runAutomation } from "@/lib/ai/handle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return runAutomation(request);
}
