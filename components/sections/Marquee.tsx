"use client";

import VelocityMarquee from "@/components/VelocityMarquee";

const WORDS = [
  "Web Tasarım",
  "E-Ticaret",
  "Marka Kimliği",
  "UI/UX",
  "SEO",
  "Dijital Deneyim",
];

export default function Marquee() {
  return (
    <section
      aria-hidden
      className="overflow-hidden border-y border-ink/10 bg-ink py-10 text-cream sm:py-14"
    >
      <VelocityMarquee baseVelocity={4}>
        {WORDS.map((word) => (
          <span
            key={word}
            className="mx-8 inline-flex items-center gap-8 font-display text-5xl font-extrabold tracking-tight sm:text-7xl"
          >
            {word}
            <span className="text-gradient">✦</span>
          </span>
        ))}
      </VelocityMarquee>
    </section>
  );
}
