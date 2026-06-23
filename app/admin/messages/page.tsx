"use client";

import { useEffect, useState, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";

type Message = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  is_read: number;
  created_at: string;
};

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const r = await fetch("/api/admin/messages");
    const d = await r.json();
    setMessages(d.messages ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const toggleRead = async (m: Message) => {
    await fetch(`/api/admin/messages/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_read: m.is_read ? 0 : 1 }),
    });
    load();
  };

  const remove = async (id: number) => {
    if (!confirm("Bu mesajı silmek istediğine emin misin?")) return;
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <AdminShell title="Mesajlar">
      {loading ? (
        <p className="text-white/50">Yükleniyor…</p>
      ) : messages.length === 0 ? (
        <p className="text-white/50">Henüz mesaj yok.</p>
      ) : (
        <div className="grid gap-3">
          {messages.map((m) => (
            <article
              key={m.id}
              className={`rounded-2xl border p-5 ${
                m.is_read
                  ? "border-white/10 bg-white/[0.02]"
                  : "border-[#ff2f9b]/40 bg-[#ff2f9b]/[0.06]"
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <p className="font-bold">
                    {m.name}
                    {!m.is_read && (
                      <span className="ml-2 rounded-full bg-[#ff2f9b] px-2 py-0.5 text-[0.6rem] font-black uppercase text-white">
                        Yeni
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-white/50">
                    {new Date(m.created_at).toLocaleString("tr-TR")}
                  </p>
                </div>
                <div className="flex gap-2 text-xs">
                  <button
                    onClick={() => toggleRead(m)}
                    className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-white/70 hover:bg-white/10"
                  >
                    {m.is_read ? "Okunmadı yap" : "Okundu yap"}
                  </button>
                  <button
                    onClick={() => remove(m.id)}
                    className="rounded-full border border-white/15 px-3 py-1.5 font-bold text-[#ff7a8a] hover:bg-white/10"
                  >
                    Sil
                  </button>
                </div>
              </div>

              <p className="mt-3 whitespace-pre-wrap text-sm text-white/85">
                {m.message}
              </p>

              <div className="mt-4 flex flex-wrap gap-3 text-sm">
                {m.email && (
                  <a
                    href={`mailto:${m.email}`}
                    className="font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
                  >
                    ✉ {m.email}
                  </a>
                )}
                {m.phone && (
                  <>
                    <a
                      href={`tel:${m.phone.replace(/\s+/g, "")}`}
                      className="font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline"
                    >
                      ☎ {m.phone}
                    </a>
                    <a
                      href={`https://wa.me/${m.phone.replace(/[^0-9]/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[#25d366] underline-offset-4 hover:underline"
                    >
                      WhatsApp
                    </a>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
