import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";
import { slugify } from "@/lib/utils";

export const runtime = "nodejs";

type ResultSetHeader = { insertId: number; affectedRows: number };

function dbGuard() {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "db_not_configured" },
      { status: 503 }
    );
  }
  return null;
}

export async function GET() {
  const guard = dbGuard();
  if (guard) return guard;
  await ensureSchema();
  const rows = await query(
    `SELECT * FROM projects ORDER BY sort_order ASC, id ASC`
  );
  return NextResponse.json({ ok: true, projects: rows });
}

export async function POST(request: Request) {
  const guard = dbGuard();
  if (guard) return guard;
  await ensureSchema();

  const body = await request.json();
  const title = (body.title ?? "").trim();
  if (!title) {
    return NextResponse.json({ ok: false, error: "title_required" }, { status: 422 });
  }

  let slug = slugify(body.slug || title);
  // benzersizleştir
  const existing = await query<{ id: number }[]>(
    `SELECT id FROM projects WHERE slug=?`,
    [slug]
  );
  if (existing.length) slug = `${slug}-${Date.now().toString().slice(-4)}`;

  const res = (await query(
    `INSERT INTO projects
      (slug, title, category, year, description, body, gradient, accent, initial, cover_image_id, featured, status, sort_order)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      slug,
      title,
      body.category ?? null,
      body.year ?? null,
      body.description ?? null,
      body.body ?? null,
      body.gradient ?? "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
      body.accent ?? "text-pink",
      body.initial ?? title.slice(0, 1).toUpperCase(),
      body.cover_image_id ?? null,
      body.featured ? 1 : 0,
      body.status ?? "published",
      Number(body.sort_order) || 0,
    ]
  )) as unknown as ResultSetHeader;

  return NextResponse.json({ ok: true, id: res.insertId, slug });
}
