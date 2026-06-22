"use client";

import Reveal from "@/components/Reveal";
import { faqs } from "@/lib/site-data";

export default function FAQ() {
  return (
    <section className="mobile-flat bg-[radial-gradient(circle_at_15%_20%,rgba(70,207,255,0.18),transparent_24rem),radial-gradient(circle_at_88%_35%,rgba(255,47,155,0.24),transparent_28rem),linear-gradient(180deg,rgba(255,248,242,0.86),rgba(255,210,239,0.32))] py-16 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6 sm:mb-12">
            <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
              Sık Sorulan <span className="text-gradient">Sorular</span>
            </h2>
            <p className="max-w-sm text-ink-soft">
              Çoğu yeni müşterinin aklındaki ilk soruları topladım. Aradığını
              bulamazsan direkt yaz, birkaç saat içinde dönerim.
            </p>
          </div>
        </Reveal>

        <div className="border-t border-ink/10">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 0.05}>
              <details className="group border-b border-ink/10 py-6">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  <span>{faq.question}</span>
                  <span className="mt-1 text-2xl text-fuchsia transition-transform duration-300 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 max-w-3xl leading-relaxed text-ink-soft">
                  {faq.answer}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
