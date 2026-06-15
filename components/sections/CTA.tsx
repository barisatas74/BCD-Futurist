"use client";

import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { contact } from "@/lib/site-data";

export default function CTA() {
  const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(
    contact.whatsappText
  )}`;

  return (
    <section id="iletisim" className="mx-auto max-w-6xl px-6 py-28 sm:py-36">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#090609] px-8 py-20 text-center text-white shadow-[0_30px_120px_rgba(255,47,155,0.28)] sm:rounded-[3rem] sm:px-16 sm:py-28">
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
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-white/80">
              ✦ Birlikte çalışalım
            </p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl md:text-7xl">
              Aklında bir proje mi var?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/85">
              Markanı sıradanlıktan çıkaracak ilk adımı birlikte atalım.
              Fikrini anlat, 24 saat içinde dönüş yapalım.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic strength={0.25}>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-9 py-4 font-semibold text-ink shadow-2xl shadow-ink/20 transition-transform hover:scale-[1.04]"
                >
                  WhatsApp ile konuşalım <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              <a
                href={`mailto:${contact.email}`}
                className="font-medium text-white/90 underline decoration-white/40 underline-offset-8 transition-colors hover:decoration-white"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
