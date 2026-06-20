"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
} from "framer-motion";

type Step = {
  no: string;
  title: string;
  desc: string;
  panel: string;
};

const STEPS: Step[] = [
  {
    no: "01",
    title: "Keşif",
    desc: "Markanızı, hedeflerinizi ve kullanıcılarınızı tanıyoruz.",
    panel: "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
  },
  {
    no: "02",
    title: "Strateji",
    desc: "Doğru kullanıcı deneyimi ve dönüşüm odaklı plan oluşturuyoruz.",
    panel: "from-[#8f4cf8] via-[#ff4fa3] to-[#ff7a1a]",
  },
  {
    no: "03",
    title: "Tasarım",
    desc: "Modern, hızlı ve premium arayüzler tasarlıyoruz.",
    panel: "from-[#ff7a1a] via-[#ff2f9b] to-[#be55ff]",
  },
  {
    no: "04",
    title: "Geliştirme",
    desc: "Performanslı ve ölçeklenebilir altyapı kuruyoruz.",
    panel: "from-[#ff2f9b] via-[#46cfff] to-[#ffeb70]",
  },
  {
    no: "05",
    title: "Teslim ve Destek",
    desc: "Projeyi yayına alıyor ve destek sağlamaya devam ediyoruz.",
    panel: "from-[#ffeb70] via-[#ff7a1a] to-[#ff2f9b]",
  },
];

function Card({ step }: { step: Step }) {
  return (
    <div
      className={`relative flex h-[62vh] max-h-[540px] min-h-[420px] w-[80vw] max-w-[400px] shrink-0 flex-col justify-between overflow-hidden rounded-[2.25rem] bg-gradient-to-br p-8 text-white sm:w-[26rem] ${step.panel}`}
    >
      {/* Devasa hayalet numara */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -right-6 select-none font-display text-[18rem] font-extrabold leading-none text-white/20"
      >
        {step.no}
      </span>
      <span
        aria-hidden
        className="absolute left-8 top-8 h-20 w-20 rounded-full bg-white/20 blur-2xl"
      />

      <span className="relative text-sm font-bold uppercase tracking-[0.28em] text-white/80">
        Adım {step.no}
      </span>

      <div className="relative">
        <h3 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl">
          {step.title}
        </h3>
        <p className="mt-4 max-w-xs text-lg leading-relaxed text-white/85">
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function Process() {
  const reducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const maxDragRef = useRef(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const [active, setActive] = useState(0);

  const x = useMotionValue(0);
  // x → 0..1 ilerleme (her zaman güncel maxDrag'i okur)
  const progress = useTransform(x, (v) => {
    const m = maxDragRef.current;
    return m > 0 ? Math.min(1, Math.max(0, -v / m)) : 0;
  });
  const barScaleX = useTransform(progress, (p) =>
    Math.max(1 / STEPS.length, p)
  );

  useMotionValueEvent(progress, "change", (p) => {
    setActive(Math.round(p * (STEPS.length - 1)));
  });

  // Sürüklenebilir mesafeyi ölç (içerik genişliği - görünür alan)
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      if (!track || !container) return;
      const dist = Math.max(0, track.scrollWidth - container.clientWidth);
      maxDragRef.current = dist;
      setMaxDrag(dist);
      // Sınır dışına taşmışsa geri çek
      if (x.get() < -dist) x.set(-dist);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [x]);

  // Belirli bir karta yumuşak geçiş (gösterge tıklaması)
  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const to = -Math.min(
      maxDragRef.current,
      (track.scrollWidth / STEPS.length) * index
    );
    const from = x.get();
    const start = performance.now();
    const dur = 600;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      x.set(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  return (
    <section id="surec" className="overflow-hidden py-16 sm:py-32">
      <div className="mx-auto mb-8 flex max-w-6xl flex-wrap items-end justify-between gap-6 px-6 sm:mb-12">
        <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
          Nasıl <span className="text-gradient">Çalışıyoruz?</span>
        </h2>
        <p className="flex items-center gap-2 text-sm font-medium text-ink-soft">
          <span aria-hidden className="text-lg">
            ↔
          </span>
          Kartları tutup sürükleyin
        </p>
      </div>

      {/* Sürüklenebilir carousel */}
      <div
        ref={containerRef}
        className="cursor-grab overflow-hidden px-6 active:cursor-grabbing"
      >
        <motion.div
          ref={trackRef}
          className="flex w-max touch-pan-y gap-5 sm:gap-6"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -maxDrag, right: 0 }}
          dragElastic={0.14}
          dragMomentum={!reducedMotion}
          dragTransition={{ power: 0.28, timeConstant: 360 }}
        >
          {STEPS.map((step) => (
            <Card key={step.no} step={step} />
          ))}
        </motion.div>
      </div>

      {/* Gösterge + ilerleme çubuğu */}
      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-5 px-6">
        <div className="flex items-center gap-3">
          {STEPS.map((s, i) => (
            <button
              key={s.no}
              onClick={() => goTo(i)}
              aria-label={`Adım ${s.no}`}
              className={`font-display text-sm font-bold transition-colors duration-300 ${
                i === active ? "text-ink" : "text-ink/25 hover:text-ink/50"
              }`}
            >
              {s.no}
            </button>
          ))}
        </div>
        <div className="h-1 w-full overflow-hidden rounded-full bg-ink/10">
          <motion.div
            style={{ scaleX: barScaleX, originX: 0 }}
            className="h-full rounded-full bg-gradient-to-r from-orange via-fuchsia to-violet"
          />
        </div>
      </div>
    </section>
  );
}
