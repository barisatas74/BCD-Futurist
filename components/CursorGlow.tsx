"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { useIsMobile } from "@/lib/hooks";

export default function CursorGlow() {
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  const x = useMotionValue(-400);
  const y = useMotionValue(-400);
  const springX = useSpring(x, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(y, { stiffness: 60, damping: 18, mass: 0.6 });

  useEffect(() => {
    if (isMobile || reducedMotion) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX - 240);
      y.set(e.clientY - 240);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [isMobile, reducedMotion, x, y]);

  if (isMobile || reducedMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[480px] w-[480px] rounded-full opacity-25 mix-blend-multiply blur-3xl"
      style={{
        x: springX,
        y: springY,
        background:
          "radial-gradient(circle at center, #ff2f9b 0%, #8f4cf8 45%, transparent 70%)",
      }}
    />
  );
}
