"use client";

import Reveal from "@/components/Reveal";
import { services } from "@/lib/site-data";

export default function Services() {
  return (
    <section
      id="hizmetler"
      className="bg-[radial-gradient(circle_at_88%_8%,rgba(255,47,155,0.28),transparent_28rem),radial-gradient(circle_at_12%_78%,rgba(255,235,112,0.22),transparent_24rem),linear-gradient(180deg,rgba(255,255,255,0.78),rgba(255,210,239,0.34))] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              Neler <span className="text-gradient">Yapıyoruz?</span>
            </h2>
            <p className="max-w-xs text-ink-soft">
              Fikirden lansmana, tek çatı altında uçtan uca dijital üretim.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-ink/10">
          {services.map((service, i) => (
            <Reveal key={service.no} delay={i * 0.05}>
              <div
                className={`group grid cursor-default gap-3 border-b border-ink/10 px-2 py-8 transition-colors duration-300 sm:grid-cols-[5rem_1fr_auto] sm:items-center sm:gap-8 sm:px-4 ${service.tint}`}
              >
                <span className="font-display text-sm font-bold text-ink-soft">
                  ({service.no})
                </span>
                <div>
                  <h3 className="flex items-center gap-3 font-display text-2xl font-bold tracking-tight sm:text-4xl">
                    <span
                      aria-hidden
                      className={`h-2.5 w-2.5 shrink-0 rounded-full ${service.dot} transition-transform duration-300 group-hover:scale-150`}
                    />
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-soft sm:pl-[1.375rem]">
                    {service.desc}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="hidden text-3xl text-ink-soft transition-all duration-300 group-hover:translate-x-1 group-hover:text-ink sm:block"
                >
                  →
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
