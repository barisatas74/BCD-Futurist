"use client";

import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { ArrowUpRight } from "@/components/Icons";
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

      <div className="relative mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
        {/* Sol: başlık + iletişim kanalları */}
        <Reveal>
          <div>
            <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-white/70 sm:text-sm">
              <span aria-hidden className="text-[#ff2f9b]">
                ✦
              </span>
              Birlikte Çalışalım
            </p>

            <h2 className="mt-6 font-display text-[clamp(2.4rem,7vw,4.25rem)] font-extrabold leading-[0.98] tracking-tight">
              Aklında bir proje mi var?
            </h2>

            <p className="mt-6 max-w-md text-base text-white/80 sm:text-lg">
              Markanı sıradanlıktan çıkaracak ilk adımı birlikte atalım. Fikrini
              anlat, 24 saat içinde dönüş yapalım.
            </p>

            {/* İletişim kanalları */}
            <div className="mt-9 grid max-w-md gap-3 sm:grid-cols-2">
              {channels.map((ch) => (
                <a
                  key={ch.label}
                  href={ch.href}
                  target={ch.external ? "_blank" : undefined}
                  rel={ch.external ? "noopener noreferrer" : undefined}
                  className={`group flex min-w-0 flex-col gap-1 rounded-2xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 ${
                    ch.accent
                      ? "border-transparent bg-[#ff2f9b] hover:bg-[#ff168b] sm:col-span-2"
                      : "border-white/15 bg-white/[0.04] hover:border-white/35 hover:bg-white/[0.08]"
                  }`}
                >
                  <span className="flex items-center justify-between gap-2 text-xs font-black uppercase tracking-[0.18em] text-white/70">
                    {ch.label}
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span
                    className={`text-sm font-semibold text-white ${
                      ch.breakAll ? "break-all" : "break-words"
                    }`}
                  >
                    {ch.value}
                  </span>
                </a>
              ))}
            </div>

            {/* Sosyal + yanıt süresi */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-semibold text-white/70 transition-colors hover:text-white"
                >
                  {s.label} <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
              <span className="text-xs uppercase tracking-[0.25em] text-white/40">
                Yanıt süresi · 24 saat
              </span>
            </div>
          </div>
        </Reveal>

        {/* Sağ: iletişim formu */}
        <Reveal delay={0.08}>
          <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm sm:p-8">
            <p className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-white/60">
              Proje talebini yaz
            </p>
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
