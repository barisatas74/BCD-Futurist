import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: true, messages: [] });
  }
  await ensureSchema();
  const rows = await query(
    `SELECT * FROM messages ORDER BY created_at DESC, id DESC LIMIT 500`
  );
  return NextResponse.json({ ok: true, messages: rows });
}
