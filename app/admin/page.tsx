"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AdminShell from "@/components/admin/AdminShell";

type Stats = {
  configured: boolean;
  messages?: number;
  unread?: number;
  projects?: number;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((d) => setStats(d))
      .catch(() => setStats({ configured: false }));
  }, []);

  return (
    <AdminShell title="Genel Bakış">
      {stats && !stats.configured && (
        <div className="mb-6 rounded-2xl border border-amber/40 bg-amber/10 p-5 text-sm text-amber">
          Veritabanı henüz bağlı değil. <code>DATABASE_URL</code> ortam
          değişkenini ekledikten sonra mesajlar ve projeler burada görünecek.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-3">
        <Card label="Toplam Mesaj" value={stats?.messages ?? "—"} href="/admin/messages" />
        <Card label="Okunmamış" value={stats?.unread ?? "—"} href="/admin/messages" accent />
        <Card label="Proje" value={stats?.projects ?? "—"} href="/admin/projects" />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin/projects/new"
          className="rounded-full bg-[#ff2f9b] px-6 py-3 text-sm font-black text-white transition-colors hover:bg-[#ff168b]"
        >
          + Yeni proje ekle
        </Link>
        <Link
          href="/admin/messages"
          className="rounded-full border border-white/15 px-6 py-3 text-sm font-black text-white/80 transition-colors hover:bg-white/10"
        >
          Mesajları gör
        </Link>
      </div>
    </AdminShell>
  );
}

function Card({
  label,
  value,
  href,
  accent,
}: {
  label: string;
  value: number | string;
  href: string;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`rounded-2xl border p-6 transition-colors ${
        accent
          ? "border-[#ff2f9b]/40 bg-[#ff2f9b]/10 hover:bg-[#ff2f9b]/15"
          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
      }`}
    >
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-2 font-display text-4xl font-black">{value}</p>
    </Link>
  );
}
