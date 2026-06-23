import { ensureSchema, query, isDbConfigured } from "@/lib/db";

export const runtime = "nodejs";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isDbConfigured()) return new Response("Not found", { status: 404 });
  await ensureSchema();
  const { id } = await params;

  const rows = await query<{ data: Buffer; mime: string }[]>(
    `SELECT data, mime FROM images WHERE id=? LIMIT 1`,
    [Number(id)]
  );
  if (!rows.length) return new Response("Not found", { status: 404 });

  const img = rows[0];
  return new Response(new Uint8Array(img.data), {
    headers: {
      "Content-Type": img.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
