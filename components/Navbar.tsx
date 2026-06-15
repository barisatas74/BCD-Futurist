"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const navItems = [
  { label: "Projeler", href: "#projeler" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Süreç", href: "#surec" },
  { label: "Neden Biz?", href: "#neden-biz" },
];

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 150], [1, 0.94]);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-40 px-4 py-4 sm:px-6"
      style={shouldReduceMotion ? undefined : { scale: navScale }}
    >
      <nav
        className={`mx-auto flex max-w-[92rem] items-center justify-between gap-4 rounded-full border px-4 transition-all duration-300 sm:px-5 ${
          scrolled
            ? "h-14 border-[#090609]/10 bg-[#fbf4ec]/74 shadow-[0_18px_70px_rgba(9,6,9,0.08)] backdrop-blur-xl"
            : "h-16 border-transparent bg-white/30 backdrop-blur-md"
        }`}
      >
        <a href="#" className="flex items-center gap-4">
          <span className="logo grid place-items-center font-black">
            <span>
              B<br />C<br />D
            </span>
          </span>
          <span className="nav-text hidden sm:block">
            BARIŞ CREATIVE DESIGN : 2026
          </span>
        </a>

        <div className="nav-text hidden items-center gap-7 xl:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-[#ff2f9b] after:transition-all hover:after:w-full"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <MagneticButton href="#iletisim" size="sm">
            Projeni Başlat
          </MagneticButton>
          <a
            href="#hizmetler"
            aria-label="Hizmetleri gör"
            className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#090609] bg-white/30 transition hover:bg-[#ffeb70]"
          >
            <span className="h-3 w-6 border-y-2 border-[#090609]" />
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function MagneticButton({
  href,
  children,
  variant = "dark",
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "pink";
  size?: "sm" | "md";
}) {
  const shouldReduceMotion = useReducedMotion();
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const variants = {
    dark: "bg-[#090609] text-white hover:bg-[#251622]",
    light:
      "border-2 border-[#090609] bg-white/46 text-[#090609] hover:bg-[#ffeb70]",
    pink: "bg-[#ff2f9b] text-white hover:bg-[#ff168b]",
  };
  const sizes = {
    sm: "button-text min-h-11 px-5",
    md: "min-h-14 px-7 text-sm",
  };

  return (
    <motion.a
      href={href}
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-black shadow-[0_18px_42px_rgba(9,6,9,0.18)] transition ${variants[variant]} ${sizes[size]}`}
      animate={offset}
      transition={{ type: "spring", stiffness: 260, damping: 18, mass: 0.55 }}
      onMouseMove={(event) => {
        if (shouldReduceMotion) {
          return;
        }

        const bounds = event.currentTarget.getBoundingClientRect();
        setOffset({
          x: (event.clientX - bounds.left - bounds.width / 2) * 0.18,
          y: (event.clientY - bounds.top - bounds.height / 2) * 0.25,
        });
      }}
      onMouseLeave={() => setOffset({ x: 0, y: 0 })}
    >
      <span>{children}</span>
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-[#090609] transition group-hover:rotate-45">
        ↗
      </span>
    </motion.a>
  );
}
