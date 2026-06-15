"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import Reveal from "@/components/Reveal";

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
            className="absolute -bottom-[12%] -right-[4%] select-none font-display text-[14rem] font-extrabold leading-none text-white/15 transition-transform duration-700 group-hover:-translate-y-4 sm:text-[18rem]"
          >
            {project.initial}
          </motion.span>
          <span
            aria-hidden
            className="absolute left-[8%] top-[12%] h-24 w-24 rounded-full bg-white/20 blur-2xl"
          />
        </div>

        <div className="absolute left-5 top-5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-white backdrop-blur-md">
          {project.year}
        </div>

        <div
          aria-hidden
          className="absolute bottom-5 right-5 flex h-12 w-12 items-center justify-center rounded-full bg-white text-lg text-ink opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 translate-y-3"
        >
          ↗
        </div>
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4 px-1">
        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-ink-soft">{project.category}</p>
        </div>
        <span
          aria-hidden
          className={`text-2xl ${project.accent} transition-transform duration-500 group-hover:rotate-45`}
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
      className="mx-auto max-w-6xl px-6 py-28 sm:py-36"
    >
      <Reveal>
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
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

      <div className="grid gap-10 sm:gap-14 lg:grid-cols-2">
        {PROJECTS.map((project, i) => (
          <Reveal
            key={project.title}
            delay={0.1}
            className={i % 2 === 1 ? "lg:mt-24" : ""}
          >
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
