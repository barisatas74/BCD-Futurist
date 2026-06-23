import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

function guard() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "db_not_configured" },
      { status: 503 }
    );
  }
  return null;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = guard();
  if (g) return g;
  await ensureSchema();
  const { id } = await params;
  const body = await request.json();
  await query(`UPDATE messages SET is_read=? WHERE id=?`, [
    body.is_read ? 1 : 0,
    id,
  ]);
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const g = guard();
  if (g) return g;
  await ensureSchema();
  const { id } = await params;
  await query(`DELETE FROM messages WHERE id=?`, [id]);
  return NextResponse.json({ ok: true });
}
