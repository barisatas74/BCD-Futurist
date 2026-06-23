import { NextResponse } from "next/server";
import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

type ResultSetHeader = { insertId: number };

const MAX_BYTES = 6 * 1024 * 1024; // 6MB
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

export async function POST(request: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "db_not_configured" },
      { status: 503 }
    );
  }
  await ensureSchema();

  const form = await request.formData();
  const file = form.get("file");
  const projectId = form.get("project_id");

  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: "no_file" }, { status: 422 });
  }
  if (!ALLOWED.includes(file.type)) {
    return NextResponse.json({ ok: false, error: "bad_type" }, { status: 415 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: "too_large" }, { status: 413 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  const res = (await query(
    `INSERT INTO images (project_id, data, mime, sort_order) VALUES (?,?,?,?)`,
    [projectId ? Number(projectId) : null, buf, file.type, 0]
  )) as unknown as ResultSetHeader;

  return NextResponse.json({ ok: true, id: res.insertId });
}
