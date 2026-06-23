import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

function dbGuard() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "db_not_configured" },
      { status: 503 }
    );
  }
  return null;
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = dbGuard();
  if (guard) return guard;
  await ensureSchema();
  const { id } = await params;
  const body = await request.json();

  await query(
    `UPDATE projects SET
      title=?, category=?, year=?, description=?, body=?, gradient=?, accent=?,
      initial=?, cover_image_id=?, featured=?, status=?, sort_order=?
     WHERE id=?`,
    [
      body.title ?? "",
      body.category ?? null,
      body.year ?? null,
      body.description ?? null,
      body.body ?? null,
      body.gradient ?? null,
      body.accent ?? null,
      body.initial ?? null,
      body.cover_image_id ?? null,
      body.featured ? 1 : 0,
      body.status ?? "published",
      Number(body.sort_order) || 0,
      id,
    ]
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = dbGuard();
  if (guard) return guard;
  await ensureSchema();
  const { id } = await params;
  await query(`DELETE FROM images WHERE project_id=?`, [id]);
  await query(`DELETE FROM projects WHERE id=?`, [id]);
  return NextResponse.json({ ok: true });
}
