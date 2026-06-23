"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";

type Project = {
  id: number;
  title: string;
  category: string | null;
  year: string | null;
  featured: number;
  status: string;
  cover_image_id: number | null;
};

export default function ProjectsAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [notConfigured, setNotConfigured] = useState(false);

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/projects");
    if (r.status === 503) {
      setNotConfigured(true);
      setLoading(false);
      return;
    }
    const d = await r.json();
    setProjects(d.projects ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const remove = async (id: number) => {
    if (!confirm("Bu projeyi silmek istediğine emin misin?")) return;
    await fetch(`/api/admin/projects/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminShell title="Projeler">
      <div className="mb-5">
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-[#ff2f9b] px-6 py-3 text-sm font-black text-white hover:bg-[#ff168b]"
        >
          + Yeni proje
        </Link>
      </div>

      {notConfigured ? (
        <p className="rounded-2xl border border-amber/40 bg-amber/10 p-5 text-sm text-amber">
          Veritabanı bağlı değil. <code>DATABASE_URL</code> eklendikten sonra
          projeler buradan yönetilebilir.
        </p>
      ) : loading ? (
        <p className="text-white/50">Yükleniyor…</p>
      ) : projects.length === 0 ? (
        <p className="text-white/50">Henüz proje yok.</p>
      ) : (
        <div className="grid gap-3">
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
            >
              <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-white/10">
                {p.cover_image_id && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={`/api/images/${p.cover_image_id}`} alt="" className="h-full w-full object-cover" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold">
                  {p.title}
                  {p.status === "draft" && (
                    <span className="ml-2 rounded-full bg-white/10 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-white/60">
                      Taslak
                    </span>
                  )}
                  {!!p.featured && (
                    <span className="ml-2 rounded-full bg-[#ff2f9b]/20 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-[#ff2f9b]">
                      Öne çıkan
                    </span>
                  )}
                </p>
                <p className="truncate text-xs text-white/50">
                  {p.category} · {p.year}
                </p>
              </div>
              <div className="flex shrink-0 gap-2 text-xs">
                <Link href={`/admin/projects/${p.id}`} className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-white/80 hover:bg-white/10">
                  Düzenle
                </Link>
                <button onClick={() => remove(p.id)} className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-[#ff7a8a] hover:bg-white/10">
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
