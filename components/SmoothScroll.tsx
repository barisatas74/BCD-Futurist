"use client";

import { useEffect, useRef, useState } from "react";
import { ReactLenis, type LenisRef } from "lenis/react";
import { useReducedMotion } from "framer-motion";

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const reducedMotion = useReducedMotion();
  const lenisRef = useRef<LenisRef>(null);
  // Lenis yalnızca masaüstünde; mobil/dokunmatikte HİÇ mount edilmez (native scroll = anlık)
  const [enableLenis, setEnableLenis] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setEnableLenis(!mq.matches && !reducedMotion);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [reducedMotion]);

  // Anchor (#bölüm) linklerini yumuşak kaydır — Lenis varsa onunla, yoksa native
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector<HTMLElement>(id);
      if (!el) return;
      e.preventDefault();
      const lenis = lenisRef.current?.lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: 0 });
      } else {
        window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!enableLenis) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.11, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
