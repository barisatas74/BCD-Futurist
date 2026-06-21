"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/Reveal";
import { ArrowUpRight } from "@/components/Icons";

type Project = {
  title: string;
  category: string;
  year: string;
  gradient: string;
  initial: string;
  accent: string;
};

const PROJECTS: Project[] = [
  {
    title: "Serev Tedarik",
    category: "B2B E-Ticaret Platformu",
    year: "2026",
    gradient: "from-[#ff4fa3] via-[#a855f7] to-[#ffb02e]",
    initial: "S",
    accent: "text-pink",
  },
  {
    title: "Serap Ercan",
    category: "Premium E-Ticaret Deneyimi",
    year: "2026",
    gradient: "from-[#8f4cf8] via-[#ff4fa3] to-[#ff7a1a]",
    initial: "SE",
    accent: "text-amber",
  },
  {
    title: "Mono Mobilya",
    category: "Marka Kimliği & Web Sitesi",
    year: "2025",
    gradient: "from-[#ff7a1a] via-[#ff2f9b] to-[#be55ff]",
    initial: "M",
    accent: "text-orange",
  },
  {
    title: "Ritim Festivali",
    category: "Etkinlik & Dijital Deneyim",
    year: "2025",
    gradient: "from-[#ff2f9b] via-[#46cfff] to-[#ffeb70]",
    initial: "R",
    accent: "text-violet",
  },
];

function ProjectCard({ project }: { project: Project }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // Kart kaydırılırken büyük harf hafifçe parallax kayar
  const initialY = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <a href="#iletisim" className="group block" ref={ref}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient} transition-transform duration-700 ease-out group-hover:scale-[1.06]`}
        >
          <motion.span
            aria-hidden
            style={reducedMotion ? undefined : { y: initialY }}
            className="absolute -bottom-[12%] -right-[4%] select-none font-display text-[7rem] font-extrabold leading-none text-white/15 transition-transform duration-700 group-hover:-translate-y-4 sm:text-[18rem]"
          >
            {project.initial}
          </motion.span>
          <span
            aria-hidden
            className="absolute left-[8%] top-[12%] h-16 w-16 rounded-full bg-white/20 blur-2xl sm:h-24 sm:w-24"
          />
        </div>

        <div className="absolute left-3 top-3 rounded-full bg-white/15 px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-white backdrop-blur-md sm:left-5 sm:top-5 sm:px-4 sm:py-1.5 sm:text-xs">
          {project.year}
        </div>

        <div
          aria-hidden
          className="absolute bottom-5 right-5 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full bg-white text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <ArrowUpRight className="h-5 w-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2 px-0.5 sm:mt-5 sm:gap-4 sm:px-1">
        <div className="min-w-0">
          <h3 className="truncate font-display text-base font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-0.5 truncate text-xs text-ink-soft sm:mt-1 sm:text-base">
            {project.category}
          </p>
        </div>
        <span
          aria-hidden
          className={`text-lg ${project.accent} transition-transform duration-500 group-hover:rotate-45 sm:text-2xl`}
        >
          ✦
        </span>
      </div>
    </a>
  );
}

export default function Projects() {
  return (
    <section
      id="projeler"
      className="mx-auto max-w-6xl px-6 py-16 sm:py-36"
    >
      <Reveal>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6 sm:mb-14">
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Seçili Projeler{" "}
            <sup className="text-gradient text-xl font-bold sm:text-2xl">
              (04)
            </sup>
          </h2>
          <p className="max-w-xs text-ink-soft">
            Her proje; strateji, tasarım ve teknolojinin aynı masada
            buluştuğu bir hikâye.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4 sm:gap-14">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.title}
            delay={0.1}
            className={i % 2 === 1 ? "mt-8 sm:mt-24" : ""}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
