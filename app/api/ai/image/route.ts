import { NextRequest } from "next/server";
import { runImage } from "@/lib/ai/handle";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  return runImage(request);
}
