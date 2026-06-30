import Link from "next/link";
import Reveal from "@/components/Reveal";
import ProjectsGrid, { type CardData } from "@/components/sections/ProjectsGrid";
import { ArrowUpRight } from "@/components/Icons";
import { getFeaturedProjects } from "@/lib/content";

export default async function Projects() {
  const projects = await getFeaturedProjects(4);
  const cards: CardData[] = projects.map((p) => ({
    slug: p.slug,
    title: p.title,
    category: p.category,
    year: p.year,
    gradient: p.gradient,
    accent: p.accent,
    initial: p.initial,
    coverImageId: p.cover_image_id,
  }));

  return (
    <section id="projeler" className="mx-auto max-w-6xl px-6 py-16 sm:py-36">
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Seçili Projeler{" "}
            <sup className="text-gradient text-xl font-bold sm:text-2xl">
              ({cards.length.toString().padStart(2, "0")})
            </sup>
          </h2>
          <p className="max-w-xs text-ink-soft">
            Her proje; strateji, tasarım ve teknolojinin aynı masada buluştuğu
            bir hikâye.
          </p>
        </div>
      </Reveal>

      <ProjectsGrid projects={cards} />

      <Reveal className="mt-12 flex justify-center sm:mt-16">
        <Link
          href="/projeler"
          className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border-2 border-ink bg-white/46 px-8 text-sm font-black text-ink shadow-[0_18px_42px_rgba(9,6,9,0.12)] backdrop-blur transition-colors duration-300 hover:bg-amber"
        >
          Tüm Projeler
          <span
            aria-hidden
            className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-45"
          >
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </Link>
      </Reveal>
    </section>
  );
}
