"use client";

import BrandLogo from "@/components/BrandLogo";
import { ArrowUpRight } from "@/components/Icons";
import { brand, contact, socialLinks } from "@/lib/site-data";

const NAV = [
  { label: "Projeler", href: "#projeler" },
  { label: "Hizmetler", href: "#hizmetler" },
  { label: "Süreç", href: "#surec" },
  { label: "Neden Biz?", href: "#neden-biz" },
  { label: "İletişim", href: "#iletisim" },
];

export default function Footer() {
  return (
    <footer className="-mt-px bg-ink pb-10 pt-16 text-cream">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <a href="#">
              <BrandLogo theme="light" />
            </a>
            <p className="mt-4 max-w-xs leading-relaxed text-cream/60">
              {brand.description}
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-5 inline-block text-sm font-semibold text-cream/80 underline decoration-cream/20 underline-offset-8 transition-colors hover:text-cream hover:decoration-cream"
            >
              {contact.email}
            </a>
            <p className="mt-2 text-sm text-cream/50">{contact.phone}</p>
          </div>

          <nav aria-label="Site haritası">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cream/40">
              Menü
            </h3>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-cream/75 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sosyal medya">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-cream/40">
              Sosyal
            </h3>
            <ul className="space-y-2.5">
              {socialLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-cream/75 transition-colors hover:text-cream"
                  >
                    {item.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden
          className="text-gradient mx-auto mt-16 max-w-full select-none overflow-visible pb-5 text-center font-display text-[clamp(4.5rem,11.2vw,13rem)] font-extrabold leading-[1.05] tracking-tight opacity-90"
        >
          barış creative
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-cream/10 pt-8 text-sm text-cream/50">
          <p>© 2026 {brand.name}. Tüm hakları saklıdır.</p>
          <p>İstanbul’dan sevgilerle ✦</p>
        </div>
      </div>
    </footer>
  );
}
