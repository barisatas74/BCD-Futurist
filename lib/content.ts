import "server-only";
import { isDbConfigured, ensureSchema, query } from "./db";
import { seedProjects } from "./seed";

export type Project = {
  id: number | null;
  slug: string;
  title: string;
  category: string | null;
  year: string | null;
  description: string | null;
  body: string | null;
  gradient: string | null;
  accent: string | null;
  initial: string | null;
  cover_image_id: number | null;
  featured: number;
  status: string;
  sort_order: number;
};

function fallbackProjects(): Project[] {
  return seedProjects.map((p) => ({
    id: null,
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    description: p.description,
    body: null,
    gradient: p.gradient,
    accent: p.accent,
    initial: p.initial,
    cover_image_id: null,
    featured: 1,
    status: "published",
    sort_order: p.sort_order,
  }));
}

/** DB varsa oradan, yoksa/erişilemezse statik veriden döner. */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!isDbConfigured()) return fallback;
  try {
    await ensureSchema();
    return await fn();
  } catch (err) {
    console.error("[content] DB hatası, statik içeriğe düşülüyor:", err);
    return fallback;
  }
}

export async function getFeaturedProjects(limit = 4): Promise<Project[]> {
  return safe(async () => {
    const rows = await query<Project[]>(
      `SELECT * FROM projects WHERE status='published' AND featured=1
       ORDER BY sort_order ASC, id ASC LIMIT ?`,
      [limit]
    );
    return rows.length ? rows : fallbackProjects().slice(0, limit);
  }, fallbackProjects().slice(0, limit));
}

export async function getAllProjects(): Promise<Project[]> {
  return safe(async () => {
    const rows = await query<Project[]>(
      `SELECT * FROM projects WHERE status='published'
       ORDER BY sort_order ASC, id ASC`
    );
    return rows.length ? rows : fallbackProjects();
  }, fallbackProjects());
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return safe(async () => {
    const rows = await query<Project[]>(
      `SELECT * FROM projects WHERE slug=? LIMIT 1`,
      [slug]
    );
    return rows[0] ?? fallbackProjects().find((p) => p.slug === slug) ?? null;
  }, fallbackProjects().find((p) => p.slug === slug) ?? null);
}

export async function getProjectImageIds(projectId: number): Promise<number[]> {
  return safe(async () => {
    const rows = await query<{ id: number }[]>(
      `SELECT id FROM images WHERE project_id=? ORDER BY sort_order ASC, id ASC`,
      [projectId]
    );
    return rows.map((r) => r.id);
  }, []);
}
