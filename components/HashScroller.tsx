"use client";

import { useEffect } from "react";

/**
 * Ana sayfaya bir hash ile gelindiğinde (ör. /#iletisim) preloader ve içerik
 * yerleştikten sonra hedef bölüme güvenle kaydırır. Birkaç kez dener çünkü
 * preloader ~1sn ekranı kaplıyor ve font/yerleşim sonradan oturuyor.
 */
export default function HashScroller() {
  useEffect(() => {
    let hash = "";
    try {
      hash = decodeURIComponent(window.location.hash);
    } catch {
      hash = window.location.hash;
    }
    if (!hash || hash.length < 2) return;

    const el = document.querySelector<HTMLElement>(hash);
    if (!el) return;

    const html = document.documentElement;
    const prevBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto"; // tekrar denemeler akıcı animasyonla çakışmasın

    let tries = 0;
    let timer = 0;
    const tick = () => {
      const target = document.querySelector<HTMLElement>(hash);
      if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - 72;
        window.scrollTo(0, Math.max(0, top));
      }
      tries += 1;
      if (tries < 12) {
        timer = window.setTimeout(tick, 350);
      } else {
        html.style.scrollBehavior = prevBehavior;
      }
    };
    timer = window.setTimeout(tick, 250);

    return () => {
      window.clearTimeout(timer);
      html.style.scrollBehavior = prevBehavior;
    };
  }, []);

  return null;
}
