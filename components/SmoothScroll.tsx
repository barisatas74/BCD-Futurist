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
        // Sabit menü payı + her cihazda çalışan iki argümanlı scrollTo
        // (eski iOS'ta {behavior} nesne formu sayıya çevrilip 0'a kayıyordu)
        const top =
          el.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo(0, Math.max(0, top));
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Sayfaya bir hash ile gelindiğinde (ör. /#iletisim) hedefe kaydır.
  // Preloader/yerleşim oturana kadar birkaç kez dener; Lenis aktifse onun
  // scrollTo'sunu kullanır (yoksa Lenis konumu geri çeker).
  useEffect(() => {
    let hash = "";
    try {
      hash = decodeURIComponent(window.location.hash);
    } catch {
      hash = window.location.hash;
    }
    if (!hash || hash.length < 2) return;

    let tries = 0;
    let timer = 0;
    const tick = () => {
      const el = document.querySelector<HTMLElement>(hash);
      if (el) {
        const lenis = lenisRef.current?.lenis;
        if (lenis) {
          lenis.scrollTo(el, { offset: -72, immediate: true });
        } else {
          const htmlEl = document.documentElement;
          const prev = htmlEl.style.scrollBehavior;
          htmlEl.style.scrollBehavior = "auto";
          const top = el.getBoundingClientRect().top + window.scrollY - 72;
          window.scrollTo(0, Math.max(0, top));
          htmlEl.style.scrollBehavior = prev;
        }
      }
      tries += 1;
      if (tries < 14) timer = window.setTimeout(tick, 320);
    };
    timer = window.setTimeout(tick, 300);
    return () => window.clearTimeout(timer);
  }, [enableLenis]);

  if (!enableLenis) return <>{children}</>;

  return (
    <ReactLenis root ref={lenisRef} options={{ lerp: 0.11, smoothWheel: true }}>
      {children}
    </ReactLenis>
  );
}
