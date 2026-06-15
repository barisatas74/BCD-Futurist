"use client";

import Reveal from "@/components/Reveal";
import { packages } from "@/lib/site-data";

export default function Packages() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Proje <span className="text-gradient">Paketleri</span>
          </h2>
          <p className="max-w-sm text-ink-soft">
            Kapsamı baştan net olan, sürpriz maliyet çıkarmayan ve yayına kadar
            ritimli ilerleyen proje seçenekleri.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-3">
        {packages.map((item, index) => (
          <Reveal key={item.title} delay={index * 0.08}>
            <article className="group flex min-h-[28rem] flex-col justify-between overflow-hidden rounded-[1.75rem] border border-ink/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.92),rgba(255,210,239,0.56))] p-7 shadow-[0_24px_90px_rgba(255,47,155,0.14)] backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia/50 hover:bg-white">
              <div>
                <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-ink-soft">
                  {item.eyebrow}
                </p>
                <h3 className="font-display text-3xl font-extrabold leading-none tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-5 leading-relaxed text-ink-soft">
                  {item.desc}
                </p>
              </div>

              <ul className="mt-8 space-y-3">
                {item.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 text-sm">
                    <span
                      aria-hidden
                      className="h-2 w-2 shrink-0 rounded-full bg-gradient-to-r from-orange to-fuchsia transition-transform duration-300 group-hover:scale-150"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
