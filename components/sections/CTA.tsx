"use client";

import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { contact, socialLinks } from "@/lib/site-data";

export default function CTA() {
  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappText
  )}`;
  const telHref = `tel:${contact.phone.replace(/\s+/g, "")}`;

  const channels = [
    {
      label: "WhatsApp",
      value: "Hemen yaz, hızlı dönelim",
      href: whatsappHref,
      external: true,
      accent: true,
      breakAll: false,
    },
    {
      label: "E-posta",
      value: contact.email,
      href: `mailto:${contact.email}`,
      external: false,
      accent: false,
      breakAll: true,
    },
    {
      label: "Telefon",
      value: contact.phone,
      href: telHref,
      external: false,
      accent: false,
      breakAll: false,
    },
  ];

  return (
    <section
      id="iletisim"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink px-4 py-20 text-cream sm:px-6"
    >
      {/* Tam ekran koyu arka plan — Neden Biz bölümüyle aynı his */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_15%_12%,rgba(143,76,248,0.2),transparent_42%),radial-gradient(circle_at_85%_88%,rgba(255,47,155,0.2),transparent_44%)]"
      />
      <div
        aria-hidden
        className="animate-blob-slow absolute -left-[8%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,#ff2f9b_0%,#8f4cf8_55%,transparent_75%)] opacity-20 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl">
        <Reveal className="w-full">
          <div className="relative flex min-h-[80svh] w-full flex-col justify-center overflow-hidden rounded-[2.25rem] border border-white/[0.07] bg-[#0c0810] px-6 py-14 text-white shadow-[0_30px_120px_rgba(255,47,155,0.3)] sm:rounded-[3rem] sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_76%_22%,rgba(255,47,155,0.62),transparent_32%),radial-gradient(circle_at_30%_80%,rgba(255,176,46,0.24),transparent_28%),radial-gradient(circle_at_58%_54%,rgba(143,76,248,0.38),transparent_34%)]"
          />
          <div
            aria-hidden
            className="animate-blob absolute -left-[10%] -top-[20%] h-[22rem] w-[22rem] rounded-full bg-white/15 blur-3xl"
          />
          <div
            aria-hidden
            className="animate-blob-slow absolute -bottom-[25%] -right-[8%] h-[26rem] w-[26rem] rounded-full bg-amber/30 blur-3xl"
          />

          <div className="relative">
            <p className="flex items-center justify-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              <span aria-hidden className="text-[#ff2f9b]">
                ✦
              </span>
              Birlikte Çalışalım
            </p>

            <h2 className="mx-auto mt-6 max-w-3xl text-center font-display text-[clamp(2.4rem,7vw,4.75rem)] font-extrabold leading-[0.98] tracking-tight">
              Aklında bir proje mi var?
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-center text-base text-white/80 sm:text-lg">
              Markanı sıradanlıktan çıkaracak ilk adımı birlikte atalım. Fikrini
              anlat, 24 saat içinde dönüş yapalım.
            </p>

            {/* İletişim kanalları */}
            <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-3">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className={`group flex min-w-0 flex-col gap-1 rounded-2xl border p-5 text-left transition-all duration-300 hover:-translate-y-1 ${
                    ch.accent
                      ? "border-transparent bg-[#ff2f9b] hover:bg-[#ff168b]"
                      : "border-white/15 bg-white/[0.04] hover:border-white/35 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
                    {ch.label}
                    <span
                      aria-hidden
                      className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    >
                      ↗
                    </span>
                  </span>
                  <span
                    className={`text-sm font-semibold text-white sm:text-[0.95rem] ${
                      ch.breakAll ? "break-all" : "break-words"
                    }`}
                  >
                    {ch.value}
                  </span>
                </a>
              ))}
            </div>

            {/* Birincil aksiyon + sosyal */}
            <div className="relative mt-10 flex flex-col items-center gap-6">
              <Magnetic strength={0.25}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 font-black text-ink shadow-2xl shadow-ink/20 transition-transform hover:scale-[1.04]"
                >
                  WhatsApp ile konuşalım <span aria-hidden>↗</span>
                </a>
              </Magnetic>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-white/70 transition-colors hover:text-white"
                  >
                    {s.label} ↗
                  </a>
                ))}
              </div>

              <p className="text-xs uppercase tracking-[0.25em] text-white/40">
                Ortalama yanıt süresi · 24 saat
              </p>
            </div>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
