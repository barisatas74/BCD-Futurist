"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import BrandLogo from "@/components/BrandLogo";
import { ArrowUpRight } from "@/components/Icons";
import { contact } from "@/lib/site-data";
import { useIsMobile } from "@/lib/hooks";

const navItems = [
  { label: "Projeler", href: "#projeler" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Paketler", href: "#paketler" },
  { label: "Neden Biz?", href: "#neden-biz" },
  { label: "İletişim", href: "#iletisim" },
];

const whatsappHref = `${contact.whatsapp}?text=${encodeURIComponent(
  contact.whatsappText
)}`;

export default function Navbar() {
  const shouldReduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 150], [1, 0.94]);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü açıkken sayfa kaymasını kilitle
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed left-0 right-0 top-0 z-50 px-4 py-4 sm:px-6"
        style={shouldReduceMotion || isMobile ? undefined : { scale: navScale }}
      >
        <nav
          className={`mx-auto flex max-w-[92rem] items-center justify-between gap-4 rounded-full border px-4 transition-all duration-300 sm:px-5 ${
            scrolled
              ? "h-14 border-[#090609]/10 bg-[#fbf4ec]/74 shadow-[0_18px_70px_rgba(9,6,9,0.08)] backdrop-blur-xl"
              : "h-16 border-transparent bg-white/30 backdrop-blur-md"
          }`}
        >
          <a
            href="#"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-4"
          >
            <BrandLogo textClassName="nav-text hidden sm:block" />
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
            <div className="hidden sm:block">
              <MagneticButton href="#iletisim" size="sm">
                Projeni Başlat
              </MagneticButton>
            </div>

            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="grid h-12 w-12 place-items-center rounded-full border-2 border-[#090609] bg-white/30 transition hover:bg-[#ffeb70] xl:hidden"
            >
              <span className="flex h-3 w-6 flex-col justify-between">
                <span
                  className={`h-0.5 w-full bg-[#090609] transition-transform duration-300 ${
                    menuOpen ? "translate-y-[5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[#090609] transition-opacity duration-300 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 w-full bg-[#090609] transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Tam ekran mobil menü — CSS tabanlı görünürlük (JS animasyonuna bağlı
          değil; framer takılsa bile menü her zaman açılır ve tıklanır) */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090609] text-cream xl:hidden">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_82%_12%,rgba(255,47,155,0.42),transparent_46%),radial-gradient(circle_at_12%_88%,rgba(143,76,248,0.32),transparent_48%)]"
          />
          <div className="relative flex h-full flex-col px-6 pb-10 pt-28">
            <ul className="flex flex-1 flex-col justify-center gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="block py-2 font-display text-[2.6rem] font-black leading-tight tracking-tight transition-colors duration-200 hover:text-[#ff2f9b]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="relative flex flex-col gap-3">
              <a
                href="#iletisim"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 rounded-full bg-[#ff2f9b] px-7 py-4 font-black text-white transition-colors hover:bg-[#ff168b]"
              >
                Projeni Başlat <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-3 rounded-full border border-cream/25 px-7 py-4 font-black text-cream transition-colors hover:bg-cream/10"
              >
                WhatsApp ile yaz <ArrowUpRight className="h-4 w-4" />
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="mt-1 text-center text-sm font-semibold text-cream/60 transition-colors hover:text-cream"
              >
                {contact.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function MagneticButton({
  href,
  children,
  variant = "dark",
  size = "md",
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light" | "pink";
  size?: "sm" | "md";
  className?: string;
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
      className={`group inline-flex items-center justify-center gap-3 rounded-full font-black shadow-[0_18px_42px_rgba(9,6,9,0.18)] transition ${variants[variant]} ${sizes[size]} ${className}`}
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
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </motion.a>
  );
}
