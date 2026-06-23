"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        password: fd.get("password"),
      }),
    });
    setLoading(false);
    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else if (res.status === 503) {
      setError("Admin henüz yapılandırılmadı (ortam değişkenleri eksik).");
    } else {
      setError("E-posta veya şifre hatalı.");
    }
  };

  const input =
    "w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-[#ff2f9b]";

  return (
    <div className="grid min-h-svh place-items-center bg-[#0c0810] px-5 text-cream">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-sm rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-7"
      >
        <p className="font-display text-2xl font-black tracking-tight">
          BCD <span className="text-[#ff2f9b]">Panel</span>
        </p>
        <p className="mb-6 mt-1 text-sm text-white/50">Yönetici girişi</p>

        <div className="grid gap-3">
          <input name="email" type="email" required placeholder="E-posta" className={input} />
          <input name="password" type="password" required placeholder="Şifre" className={input} />
        </div>

        {error && <p className="mt-3 text-sm text-[#ff7a8a]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-[#ff2f9b] px-6 py-3.5 font-black text-white transition-colors hover:bg-[#ff168b] disabled:opacity-60"
        >
          {loading ? "Giriş yapılıyor…" : "Giriş yap"}
        </button>
      </form>
    </div>
  );
}
