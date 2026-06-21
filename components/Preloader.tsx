"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

const LETTERS = ["B", "C", "D"];

/**
 * CSS tabanlı açılış animasyonu — framer/rAF'a bağlı değil, böylece
 * her koşulda ekrandan kalkacağı garanti (asla sayfayı kilitlemez).
 */
export default function Preloader() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const [leaving, setLeaving] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const hold = reducedMotion ? 200 : isMobile ? 950 : 1600;
    const leaveTimer = setTimeout(() => setLeaving(true), hold);
    const removeTimer = setTimeout(() => setMounted(false), hold + 800);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, [reducedMotion, isMobile]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden
      className="fixed inset-0 z-[100] overflow-hidden bg-[#090609] text-white transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]"
      style={{ transform: leaving ? "translateY(-100%)" : "translateY(0)" }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(circle_at_65%_45%,rgba(255,47,155,0.86),transparent_30%),radial-gradient(circle_at_35%_58%,rgba(255,176,46,0.35),transparent_22%),radial-gradient(circle_at_56%_16%,rgba(143,76,248,0.48),transparent_30%)]"
        animate={
          reducedMotion
            ? undefined
            : { scale: [1, 1.14, 1.06], rotate: [0, 3, -2] }
        }
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      <div className="relative grid h-full place-items-center">
        <div className="text-center">
          <div className="mb-8 flex justify-center gap-3">
            {LETTERS.map((letter, index) => (
              <motion.span
                key={letter}
                className="grid h-20 w-20 place-items-center border-2 border-white bg-white font-display text-4xl font-black text-[#090609]"
                initial={
                  reducedMotion
                    ? false
                    : { y: 80, opacity: 0, rotate: -8 }
                }
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.12,
                  duration: 0.62,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          <motion.p
            className="text-sm font-black uppercase text-white/70"
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.48, duration: 0.5 }}
          >
            Pembe frekansta yeni ajans yüzü yükleniyor
          </motion.p>
        </div>
      </div>
    </div>
  );
}
