"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hafif, kendi IntersectionObserver'ını kullanan giriş animasyonu.
 * Framer'ın whileInView'i mobilde bazen hiç tetiklenmiyordu (içerik
 * "yüklenmiyor" gibi görünüyordu). Burada CSS geçişi + güvenlik zaman
 * aşımı var: gözlemci tetiklenmese bile içerik kısa süre sonra mutlaka
 * görünür olur. Mobilde de performans için ucuzdur.
 */
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
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Zaten görünürse hemen göster
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 1.1) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Pozitif alt pay: öğe görünüme girmeden ~%18 önce tetiklenir →
      // aşağı kaydırınca içerik "geç geliyor / görünmüyor" hissi vermez.
      { rootMargin: "0px 0px 18% 0px" }
    );
    observer.observe(el);

    // Güvenlik ağı: gözlemci herhangi bir nedenle tetiklenmezse içerik
    // asla gizli kalmasın.
    const fallback = window.setTimeout(() => setShown(true), 1000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reducedMotion]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? "none" : `translateY(${y}px)`,
        transition: reducedMotion
          ? undefined
          : `opacity 0.6s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}s, transform 0.6s cubic-bezier(0.21,0.47,0.32,0.98) ${delay}s`,
        willChange: shown ? "auto" : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
