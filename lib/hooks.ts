"use client";

import { useEffect, useState } from "react";

/**
 * Mobil / dokunmatik cihaz tespiti — animasyonları hafifletmek için.
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px), (pointer: coarse)");
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return isMobile;
}
