"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";
import ProjectForm, { type ProjectInput } from "@/components/admin/ProjectForm";

export default function EditProject() {
  const params = useParams<{ id: string }>();
  const [project, setProject] = useState<ProjectInput | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) => {
        const p = (d.projects ?? []).find(
          (x: { id: number }) => String(x.id) === params.id
        );
        if (p) {
          setProject({
            id: p.id,
            title: p.title ?? "",
            category: p.category ?? "",
            year: p.year ?? "",
            description: p.description ?? "",
            body: p.body ?? "",
            gradient: p.gradient ?? "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
            accent: p.accent ?? "text-pink",
            initial: p.initial ?? "",
            cover_image_id: p.cover_image_id ?? null,
            featured: p.featured ?? 0,
            status: p.status ?? "published",
            sort_order: p.sort_order ?? 0,
          });
        } else {
          setMissing(true);
        }
      })
      .catch(() => setMissing(true));
  }, [params.id]);

  return (
    <AdminShell title="Projeyi Düzenle">
      {missing ? (
        <p className="text-white/50">Proje bulunamadı.</p>
      ) : project ? (
        <ProjectForm initial={project} />
      ) : (
        <p className="text-white/50">Yükleniyor…</p>
      )}
    </AdminShell>
  );
}
