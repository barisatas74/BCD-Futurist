"use client";

import Reveal from "@/components/Reveal";
import Counter from "@/components/Counter";

const STATS = [
  { to: 50, suffix: "+", label: "Tamamlanan Proje" },
  { to: 98, prefix: "%", label: "Müşteri Memnuniyeti" },
  { to: 6, suffix: "+", label: "Yıllık Deneyim" },
  { to: 24, suffix: "s", label: "İçinde Yanıt" },
];

const REASONS = [
  {
    title: "Şablon değil, karakter",
    desc: "Her marka için sıfırdan düşünülmüş, özgün tasarım dili.",
    dot: "bg-pink",
  },
  {
    title: "Hız bir özellik değil, standart",
    desc: "Performans bütçesiyle tasarlar, saliseleri ciddiye alırız.",
    dot: "bg-fuchsia",
  },
  {
    title: "Şeffaf süreç",
    desc: "Ne zaman, ne teslim edilecek — baştan bellidir, sürpriz yoktur.",
    dot: "bg-violet",
  },
  {
    title: "Lansman sonrası yanınızdayız",
    desc: "Bakım, iyileştirme ve büyüme için uzun soluklu ortaklık.",
    dot: "bg-orange",
  },
];

export default function WhyUs() {
  return (
    <section
      id="neden-biz"
      className="relative flex min-h-svh items-center overflow-hidden bg-ink py-28 text-cream sm:py-36"
    >
      <div
        aria-hidden
        className="animate-blob-slow absolute -right-[10%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle_at_40%_40%,#ff2f9b_0%,#8f4cf8_55%,transparent_75%)] opacity-40 blur-3xl"
      />
      <div
        aria-hidden
        className="animate-blob absolute -left-[10%] bottom-[5%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,#ffeb70_0%,#ff2f9b_55%,transparent_78%)] opacity-35 blur-3xl"
      />

      <div className="relative mx-auto grid w-full max-w-6xl gap-16 px-6 lg:grid-cols-2">
        <div>
          <Reveal>
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              Neden <span className="text-gradient">Biz?</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-cream/70">
              Çünkü işimiz sadece site yapmak değil; markanızın dijitaldeki
              karakterini inşa etmek. Küçük bir stüdyonun özeni, büyük bir
              ajansın disipliniyle.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-8">
            {STATS.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 0.08}>
                <div>
                  <p className="font-display text-5xl font-extrabold sm:text-6xl">
                    <Counter
                      to={stat.to}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      className="text-gradient"
                    />
                  </p>
                  <p className="mt-2 text-sm uppercase tracking-widest text-cream/60">
                    {stat.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-4">
          {REASONS.map((reason, i) => (
            <Reveal key={reason.title} delay={i * 0.08}>
              <div className="group rounded-[1.75rem] border border-cream/10 bg-cream/[0.04] p-6 backdrop-blur transition-colors duration-300 hover:bg-cream/[0.08]">
                <h3 className="flex items-center gap-3 font-display text-xl font-bold">
                  <span
                    aria-hidden
                    className={`h-2.5 w-2.5 shrink-0 rounded-full ${reason.dot} transition-transform duration-300 group-hover:scale-150`}
                  />
                  {reason.title}
                </h3>
                <p className="mt-2 pl-[1.375rem] text-cream/65">
                  {reason.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
