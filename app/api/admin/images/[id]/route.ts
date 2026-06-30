import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "db_not_configured" },
      { status: 503 }
    );
  }
  await ensureSchema();
  const { id } = await params;
  await query(`DELETE FROM images WHERE id=?`, [Number(id)]);
  return NextResponse.json({ ok: true });
}
