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
  featured: number;
  status: string;
  sort_order: number;
};

const GRADIENTS = [
  "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
  "from-[#8f4cf8] via-[#ff4fa3] to-[#ff7a1a]",
  "from-[#ff7a1a] via-[#ff2f9b] to-[#be55ff]",
  "from-[#ff2f9b] via-[#46cfff] to-[#ffeb70]",
];

const ACCENTS = ["text-pink", "text-amber", "text-orange", "text-violet"];

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
      accent: ACCENTS[0],
      initial: "",
      cover_image_id: null,
      featured: 1,
      status: "published",
      sort_order: 0,
    }
  );

  const set = <K extends keyof ProjectInput>(k: K, v: ProjectInput[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const upload = async (file: File) => {
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/admin/images", { method: "POST", body: fd });
    setUploading(false);
    if (r.ok) {
      const d = await r.json();
      set("cover_image_id", d.id);
    } else {
      setError("Görsel yüklenemedi (boyut/format kontrol et).");
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const url = isEdit
      ? `/api/admin/projects/${initial!.id}`
      : "/api/admin/projects";
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

      <div>
        <label className={label}>Kısa açıklama (kart altı)</label>
        <input className={input} value={form.description} onChange={(e) => set("description", e.target.value)} />
      </div>

      <div>
        <label className={label}>Detay metni (proje sayfası)</label>
        <textarea className={`${input} resize-none`} rows={4} value={form.body} onChange={(e) => set("body", e.target.value)} />
      </div>

      <div>
        <label className={label}>Kapak görseli</label>
        {form.cover_image_id && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={`/api/images/${form.cover_image_id}`}
            alt="kapak"
            className="mb-2 h-40 w-full rounded-2xl object-cover"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
          className="text-sm text-white/70 file:mr-3 file:rounded-full file:border-0 file:bg-[#ff2f9b] file:px-4 file:py-2 file:font-bold file:text-white"
        />
        {uploading && <p className="mt-1 text-xs text-white/50">Yükleniyor…</p>}
        <p className="mt-1 text-xs text-white/40">
          Görsel yoksa renkli gradyan kullanılır.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={label}>Gradyan (görsel yoksa)</label>
          <select className={input} value={form.gradient} onChange={(e) => set("gradient", e.target.value)}>
            {GRADIENTS.map((g, i) => (
              <option key={g} value={g}>{`Gradyan ${i + 1}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label}>Baş harf (görsel yoksa)</label>
          <input className={input} value={form.initial} onChange={(e) => set("initial", e.target.value)} maxLength={3} placeholder="Örn: S" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
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
        <div className="flex items-end pb-2">
          <label className="flex items-center gap-2 text-sm text-white/80">
            <input type="checkbox" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked ? 1 : 0)} />
            Ana sayfada öne çıkar
          </label>
        </div>
      </div>

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
