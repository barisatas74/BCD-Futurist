"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export type ProjectInput = {
  id?: number;
  title: string;
  category: string;
  year: string;
  description: string;
  body: string;
  gradient: string;
  accent: string;
  initial: string;
  cover_image_id: number | null;
  live_url: string;
  client: string;
  tags: string;
  results: string;
  featured: number;
  status: string;
  sort_order: number;
  image_ids: number[];
};

const GRADIENTS = [
  "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
  "from-[#8f4cf8] via-[#ff4fa3] to-[#ff7a1a]",
  "from-[#ff7a1a] via-[#ff2f9b] to-[#be55ff]",
  "from-[#ff2f9b] via-[#46cfff] to-[#ffeb70]",
];

const input =
  "w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-[#ff2f9b]";
const label = "mb-1.5 block text-xs font-bold uppercase tracking-wide text-white/50";

export default function ProjectForm({ initial }: { initial?: ProjectInput }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<ProjectInput>(
    initial ?? {
      title: "",
      category: "",
      year: new Date().getFullYear().toString(),
      description: "",
      body: "",
      gradient: GRADIENTS[0],
      accent: "text-pink",
      initial: "",
      cover_image_id: null,
      live_url: "",
      client: "",
      tags: "",
      results: "",
      featured: 1,
      status: "published",
      sort_order: 0,
      image_ids: [],
    }
  );

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const uploadOne = async (file: File): Promise<number | null> => {
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/images", { method: "POST", body: fd });
    if (r.ok) return (await r.json()).id as number;
    setError("Bir görsel yüklenemedi (boyut/format).");
    return null;
  };

  const uploadCover = async (file: File) => {
    setUploading(true);
    setError("");
    const id = await uploadOne(file);
    setUploading(false);
    if (id) set("cover_image_id", id);
  };

  const uploadGallery = async (files: FileList) => {
    setUploading(true);
    setError("");
    const ids: number[] = [];
    for (const f of Array.from(files)) {
      const id = await uploadOne(f);
      if (id) ids.push(id);
    }
    setUploading(false);
    setForm((f) => ({ ...f, image_ids: [...f.image_ids, ...ids] }));
  };

  const removeGalleryImage = async (id: number) => {
    await fetch(`/api/admin/images/${id}`, { method: "DELETE" });
    setForm((f) => ({ ...f, image_ids: f.image_ids.filter((x) => x !== id) }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit ? `/api/admin/projects/${initial!.id}` : "/api/admin/projects";
    const r = await fetch(url, {
      method: isEdit ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (r.ok) {
      router.push("/admin/projects");
      router.refresh();
    } else {
      const d = await r.json().catch(() => ({}));
      setError(d.error === "db_not_configured" ? "Veritabanı bağlı değil." : "Kaydedilemedi.");
    }
  };

  return (
    <form onSubmit={submit} className="grid max-w-2xl gap-4">
      <div>
        <label className={label}>Başlık *</label>
        <input className={input} value={form.title} onChange={(e) => set("title", e.target.value)} required />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Kategori</label>
          <input className={input} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Örn: E-Ticaret Platformu" />
        </div>
        <div>
          <label className={label}>Yıl</label>
          <input className={input} value={form.year} onChange={(e) => set("year", e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Müşteri / Marka</label>
          <input className={input} value={form.client} onChange={(e) => set("client", e.target.value)} placeholder="Örn: Serev Tedarik" />
        </div>
        <div>
          <label className={label}>Canlı site linki</label>
          <input className={input} value={form.live_url} onChange={(e) => set("live_url", e.target.value)} placeholder="https://..." />
        </div>
      </div>

      <div>
        <label className={label}>Etiketler (virgülle)</label>
        <input className={input} value={form.tags} onChange={(e) => set("tags", e.target.value)} placeholder="Web Tasarım, Next.js, E-Ticaret" />
      </div>

      <div>
        <label className={label}>Kısa açıklama (kart altı)</label>
        <input className={input} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div>
        <label className={label}>Detay metni (proje sayfası)</label>
        <textarea className={`${input} resize-none`} rows={5} value={form.body} onChange={(e) => set("body", e.target.value)} />
      </div>

      <div>
        <label className={label}>Sonuçlar (her satır: Etiket | Değer)</label>
        <textarea
          className={`${input} resize-none`}
          rows={3}
          value={form.results}
          onChange={(e) => set("results", e.target.value)}
          placeholder={"Dönüşüm | +%40\nYayın süresi | 2 hafta"}
        />
      </div>

      <div>
        <label className={label}>Kapak görseli</label>
        {form.cover_image_id && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/api/images/${form.cover_image_id}`} alt="kapak" className="mb-2 h-40 w-full rounded-2xl object-cover" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && uploadCover(e.target.files[0])}
          className="text-sm text-white/70 file:mr-3 file:rounded-full file:border-0 file:bg-[#ff2f9b] file:px-4 file:py-2 file:font-bold file:text-white"
        />
        <p className="mt-1 text-xs text-white/40">Görsel yoksa renkli gradyan kullanılır.</p>
      </div>

      <div>
        <label className={label}>Galeri görselleri (çoklu)</label>
        {form.image_ids.length > 0 && (
          <div className="mb-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
            {form.image_ids.map((id) => (
              <div key={id} className="group relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/api/images/${id}`} alt="" className="h-20 w-full rounded-xl object-cover" />
                <button
                  type="button"
                  onClick={() => removeGalleryImage(id)}
                  className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/70 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files?.length && uploadGallery(e.target.files)}
          className="text-sm text-white/70 file:mr-3 file:rounded-full file:border-0 file:bg-white/10 file:px-4 file:py-2 file:font-bold file:text-white"
        />
      </div>

      {uploading && <p className="text-xs text-white/50">Görsel yükleniyor…</p>}

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className={label}>Gradyan (görsel yoksa)</label>
          <select className={input} value={form.gradient} onChange={(e) => set("gradient", e.target.value)}>
            {GRADIENTS.map((g, i) => (
              <option key={g} value={g}>{`Gradyan ${i + 1}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Durum</label>
          <select className={input} value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
        <div>
          <label className={label}>Sıra</label>
          <input type="number" className={input} value={form.sort_order} onChange={(e) => set("sort_order", Number(e.target.value))} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm text-white/80">
        <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked ? 1 : 0)} />
        Ana sayfada öne çıkar (ilk 4)
      </label>

      {error && <p className="text-sm text-[#ff7a8a]">{error}</p>}

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="rounded-full bg-[#ff2f9b] px-7 py-3 font-black text-white hover:bg-[#ff168b] disabled:opacity-60">
          {saving ? "Kaydediliyor…" : isEdit ? "Güncelle" : "Oluştur"}
        </button>
        <button type="button" onClick={() => router.push("/admin/projects")} className="rounded-full border border-white/15 px-7 py-3 font-black text-white/70 hover:bg-white/10">
          Vazgeç
        </button>
      </div>
    </form>
  );
}
