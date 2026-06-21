"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Magnetic from "@/components/Magnetic";
import { ArrowUpRight } from "@/components/Icons";
import { useIsMobile } from "@/lib/hooks";

const HERO_LINES = [
  { text: "Markaları", className: "lg:ml-10" },
  { text: "dijitalde", className: "lg:ml-[26rem]" },
  { text: "sıradanlıktan", className: "hero-long-line lg:ml-28" },
  { text: "çıkarıyoruz.", className: "lg:ml-[18rem]" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const parallaxOff = reducedMotion || isMobile;

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const auroraY = useTransform(scrollYProgress, [0, 1], ["0%", "26%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const bottomRevealOpacity = useTransform(scrollY, [0, 48, 140], [0, 0, 1]);
  const bottomRevealY = useTransform(scrollY, [0, 140], [28, 0]);

  // Mouse'a çok hafif tepki veren gradyan ışıklar
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 22, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 45, damping: 22, mass: 0.6 });
  const glowX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const glowY = useTransform(sy, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (parallaxOff) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  return (
    <section
      ref={ref}
      onMouseMove={handleMouseMove}
      className="relative isolate min-h-svh overflow-hidden bg-cream px-4 pb-8 pt-28 sm:px-6 lg:pt-32"
    >
      <motion.div
        aria-hidden
        className="hero-ink-field"
        style={parallaxOff ? undefined : { y: auroraY, x: glowX }}
      />
      <div aria-hidden className="hero-paper-glow" />
      <div aria-hidden className="grain-layer" />

      {/* Eski BCD Futurist paletindeki canlı ışık sahnesi */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={parallaxOff ? undefined : { y: auroraY }}
      >
        <motion.div
          className="absolute inset-0"
          style={parallaxOff ? undefined : { x: glowX, y: glowY }}
        >
          <div className="absolute -right-[10%] top-[6%] h-[42rem] w-[42rem] rounded-full bg-[radial-gradient(circle_at_center,#ff2f9b_0%,transparent_64%)] opacity-35 blur-[120px] sm:h-[52rem] sm:w-[52rem]" />
          <div className="absolute right-[18%] top-[38%] h-[25rem] w-[25rem] rounded-full bg-[radial-gradient(circle_at_center,#46cfff_0%,transparent_66%)] opacity-20 blur-[100px]" />
          <div className="absolute bottom-[4%] left-[10%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle_at_center,#ffeb70_0%,transparent_68%)] opacity-22 blur-[105px]" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative mx-auto flex min-h-[calc(100svh-9rem)] w-full max-w-[92rem] flex-col justify-between"
        style={parallaxOff ? undefined : { y: contentY }}
      >
        <div className="flex flex-wrap items-start justify-between gap-5">
          <p
            style={{
              animation: reducedMotion
                ? undefined
                : "fadeDown 0.6s ease-out 1.7s both",
            }}
            className="small-bold max-w-sm text-ink"
          >
            Web tasarım, e-ticaret ve marka deneyimiyle dijitalde hatırlanan
            yüzler.
          </p>
          <p
            style={{
              animation: reducedMotion
                ? undefined
                : "fadeDown 0.6s ease-out 1.82s both",
            }}
            className="side-copy max-w-xs text-ink-soft"
          >
            İstanbul çıkışlı, hızlı düşünen, renkli ve performans odaklı
            yaratıcı dijital stüdyo.
          </p>
        </div>

        <div className="relative py-4 sm:py-7">
          <h1
            aria-label="Markaları dijitalde sıradanlıktan çıkarıyoruz."
            className="hero-bcd-title text-ink"
          >
            {HERO_LINES.map((line, index) => (
              <span
                key={line.text}
                className={`hero-title-mask ${
                  index === HERO_LINES.length - 1 ? "hero-title-mask-tail" : ""
                }`}
              >
                <motion.span
                  aria-hidden
                  className={`block ${line.className}`}
                  initial={
                    reducedMotion
                      ? false
                      : { y: "110%", rotate: index % 2 ? 2 : -2 }
                  }
                  animate={{ y: 0, rotate: 0 }}
                  transition={{
                    delay: 1.82 + index * 0.1,
                    duration: 0.78,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {line.text}
                </motion.span>
              </span>
            ))}
          </h1>
        </div>

        <motion.div
          style={
            parallaxOff
              ? undefined
              : { opacity: bottomRevealOpacity, y: bottomRevealY }
          }
          className="grid gap-8 pb-2 lg:grid-cols-[1fr_0.9fr] lg:items-end"
        >
          <div className="nav-text flex flex-wrap items-center gap-4 text-ink">
            {["Awwwards tarzı enerji", "Premium arayüz", "Akıcı hareket"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full border border-ink/15 bg-white/52 px-4 py-3 backdrop-blur"
                >
                  {item}
                </span>
              ),
            )}
          </div>

          <div className="max-w-xl justify-self-end">
            <p className="text-xl font-semibold leading-8 text-ink sm:text-2xl">
              Web tasarım, e-ticaret ve marka deneyimleriyle işletmeler için
              modern, hızlı ve akılda kalan dijital yüzler tasarlıyoruz.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Magnetic strength={0.22}>
                <a
                  href="#iletisim"
                  className="group relative inline-flex min-h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-ink px-7 text-sm font-black text-cream shadow-[0_18px_42px_rgba(9,6,9,0.18)] transition-transform duration-300 hover:scale-[1.02]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[#ff2f9b] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                  <span className="relative">Projeni Başlat</span>
                  <span
                    aria-hidden
                    className="relative grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href="#projeler"
                  className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border-2 border-ink bg-white/46 px-7 text-sm font-black text-ink shadow-[0_18px_42px_rgba(9,6,9,0.18)] backdrop-blur transition-colors duration-300 hover:bg-amber"
                >
                  Çalışmaları Gör
                  <span
                    aria-hidden
                    className="grid h-8 w-8 place-items-center rounded-full bg-white text-ink transition-transform duration-300 group-hover:rotate-45"
                  >
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </a>
              </Magnetic>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
