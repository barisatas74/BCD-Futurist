"use client";

import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";
import { packages } from "@/lib/site-data";

export default function Packages() {
  return (
    <section
      id="paketler"
      className="relative overflow-hidden bg-ink py-16 text-cream sm:py-32"
    >
      {/* Koyu arka plan — iletişim bölümüyle aynı his */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(143,76,248,0.2),transparent_42%),radial-gradient(circle_at_88%_92%,rgba(255,47,155,0.22),transparent_44%)]"
      />
      <div
        aria-hidden
        className="animate-blob-slow absolute -right-[8%] top-[14%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,#ff2f9b_0%,#8f4cf8_55%,transparent_75%)] opacity-20 blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              Proje <span className="text-gradient">Paketleri</span>
            </h2>
            <p className="max-w-sm text-cream/70">
              Kapsamı baştan net olan, sürpriz maliyet çıkarmayan ve yayına kadar
              ritimli ilerleyen proje seçenekleri.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {packages.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.08}>
              <article className="group flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-7 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia/50 hover:bg-white/[0.08]">
                <div>
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-white/50">
                    {item.eyebrow}
                  </p>
                  <h3 className="font-display text-3xl font-extrabold leading-none tracking-tight text-cream">
                    {item.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-cream/70">
                    {item.desc}
                  </p>
                </div>

                <div>
                  <ul className="mt-8 space-y-3">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-center gap-3 text-sm text-cream/85"
                      >
                        <span
                          aria-hidden
                          className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-orange to-fuchsia transition-transform duration-300 group-hover:scale-150"
                        />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#iletisim"
                    className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-black text-ink transition-colors duration-300 group-hover:bg-[#ff2f9b] group-hover:text-white"
                  >
                    Bu paketi seç
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
