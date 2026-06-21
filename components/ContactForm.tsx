"use client";

import { useState } from "react";
import { ArrowUpRight } from "@/components/Icons";

type Status = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      phone: String(formData.get("phone") || ""),
      message: String(formData.get("message") || ""),
      company: String(formData.get("company") || ""), // honeypot
    };

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("request_failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-3.5 text-sm text-white placeholder:text-white/40 outline-none transition-colors focus:border-fuchsia focus:bg-white/[0.08]";

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 grid max-w-2xl gap-3 text-left"
    >
      {/* Honeypot — ekranda gizli */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          type="text"
          required
          placeholder="Adın *"
          autoComplete="name"
          className={inputClass}
        />
        <input
          name="email"
          type="email"
          placeholder="E-posta"
          autoComplete="email"
          className={inputClass}
        />
      </div>

      <input
        name="phone"
        type="tel"
        placeholder="Telefon (opsiyonel)"
        autoComplete="tel"
        className={inputClass}
      />

      <textarea
        name="message"
        required
        rows={4}
        placeholder="Projenden bahset — ne yapmak istiyorsun? *"
        className={`${inputClass} resize-none`}
      />

      <div className="mt-1 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p
          className={`text-sm ${
            status === "error" ? "text-[#ff7a8a]" : "text-white/50"
          }`}
          role="status"
          aria-live="polite"
        >
          {status === "success"
            ? "Teşekkürler! Talebin bize ulaştı, 24 saat içinde dönüyoruz."
            : status === "error"
              ? "Bir sorun oldu. WhatsApp'tan da yazabilirsin."
              : "* İsim, mesaj ve en az bir iletişim bilgisi yeterli."}
        </p>

        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-[#ff2f9b] px-7 py-3.5 font-black text-white transition-colors hover:bg-[#ff168b] disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? "Gönderiliyor…" : "Gönder"}
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
