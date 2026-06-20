"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

export default function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Mobilde: küçük hareket, hızlı süre, erken tetikleme → içerik "geç yüklenmiş" hissi vermez
  const offset = reducedMotion ? 0 : isMobile ? Math.min(y, 16) : y;
  const duration = isMobile ? 0.45 : 0.7;
  const effectiveDelay = reducedMotion
    ? 0
    : isMobile
      ? Math.min(delay, 0.12)
      : delay;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        margin: isMobile ? "0px 0px 160px 0px" : "-80px",
      }}
      transition={{
        duration,
        delay: effectiveDelay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      {children}
    </motion.div>
  );
}
