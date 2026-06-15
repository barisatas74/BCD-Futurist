"use client";

import { useEffect, useRef } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);

  // Anchor (#bölüm) linklerini Lenis ile yumuşak kaydır
  useEffect(() => {
    if (reducedMotion) return;
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      // Bölüm tam tepeden başlasın; üstte önceki bölüm görünmesin
      lenisRef.current?.lenis?.scrollTo(el as HTMLElement, { offset: 0 });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [reducedMotion]);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.11, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
