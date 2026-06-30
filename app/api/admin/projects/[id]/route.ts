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

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const guard = dbGuard();
  if (guard) return guard;
  await ensureSchema();
  const { id } = await params;
  const rows = await query(`SELECT * FROM projects WHERE id=? LIMIT 1`, [id]);
  const project = (rows as unknown[])[0];
  if (!project) {
    return NextResponse.json({ ok: false, error: "not_found" }, { status: 404 });
  }
  const images = await query<{ id: number }[]>(
    `SELECT id FROM images WHERE project_id=? ORDER BY sort_order ASC, id ASC`,
    [id]
  );
  return NextResponse.json({
    ok: true,
    project,
    image_ids: images.map((r) => r.id),
  });
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
      initial=?, cover_image_id=?, live_url=?, client=?, tags=?, results=?,
      featured=?, status=?, sort_order=?
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
      body.live_url ?? null,
      body.client ?? null,
      body.tags ?? null,
      body.results ?? null,
      body.featured ? 1 : 0,
      body.status ?? "published",
      Number(body.sort_order) || 0,
      id,
    ]
  );

  // Galeri bağlama (yeni yüklenenler)
  if (Array.isArray(body.image_ids)) {
    const ids = body.image_ids.map((n: unknown) => Number(n)).filter(Boolean);
    for (const imgId of ids) {
      await query(`UPDATE images SET project_id=? WHERE id=?`, [id, imgId]);
    }
  }

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
