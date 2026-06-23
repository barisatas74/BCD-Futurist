import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function GET() {
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: true, configured: false });
  }
  await ensureSchema();
  const [m] = await query<{ c: number }[]>(`SELECT COUNT(*) AS c FROM messages`);
  const [mu] = await query<{ c: number }[]>(
    `SELECT COUNT(*) AS c FROM messages WHERE is_read=0`
  );
  const [p] = await query<{ c: number }[]>(`SELECT COUNT(*) AS c FROM projects`);
  return NextResponse.json({
    ok: true,
    configured: true,
    messages: m.c,
    unread: mu.c,
    projects: p.c,
  });
}
